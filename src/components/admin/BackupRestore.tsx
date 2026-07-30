import React, { useState } from 'react';
import { Download, Upload, Database, Cloud, CloudOff, CheckCircle } from 'lucide-react';
import { db } from '../../lib/db';
import { isSupabaseConfigured } from '../../lib/supabase';
import { toast } from 'sonner';

export const BackupRestore: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const handleExportJSON = () => {
    const jsonStr = db.exportFullBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_backup_${Date.now()}.json`;
    a.click();
    toast.success('Full database backup exported to JSON!');
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const success = db.restoreBackup(reader.result as string);
      if (success) {
        toast.success('Database successfully restored from backup! Refreshing...');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleSyncToSupabase = async () => {
    if (!isSupabaseConfigured) {
      toast.error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY env vars.');
      return;
    }
    setSyncing(true);
    setSynced(false);
    try {
      await db.syncAllToSupabase();
      setSynced(true);
      toast.success('✅ All portfolio data pushed to Supabase cloud! Visitors will now see your latest content.');
    } catch {
      toast.error('Sync failed. Check your Supabase connection.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Database className="w-6 h-6 text-primary" />
          Backup & Data Restore
        </h2>
        <p className="text-xs text-muted-foreground">
          Export full portfolio database backups or restore content from a saved file.
        </p>
      </div>

      {/* Supabase Cloud Sync — PRIMARY ACTION */}
      <div className={`p-6 rounded-3xl border-2 space-y-4 text-center ${
        isSupabaseConfigured
          ? 'glass-card border-primary/40 bg-primary/5'
          : 'glass-card border-border opacity-60'
      }`}>
        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          {synced ? <CheckCircle className="w-6 h-6 text-green-400" /> : isSupabaseConfigured ? <Cloud className="w-6 h-6" /> : <CloudOff className="w-6 h-6" />}
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground flex items-center justify-center gap-2">
            Push All Data to Cloud
            {isSupabaseConfigured && (
              <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                SUPABASE CONNECTED
              </span>
            )}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            {isSupabaseConfigured
              ? 'Upload all your current admin data to Supabase so every visitor sees your latest portfolio content.'
              : 'Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to Cloudflare build settings.'}
          </p>
        </div>
        <button
          onClick={handleSyncToSupabase}
          disabled={!isSupabaseConfigured || syncing}
          className="w-full py-2.5 rounded-xl font-bold text-xs text-primary-foreground bg-primary hover:opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {syncing ? (
            <><span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full" /> Syncing to Cloud...</>
          ) : synced ? (
            <><CheckCircle className="w-3 h-3" /> Synced Successfully!</>
          ) : (
            <><Cloud className="w-3 h-3" /> Push All Data to Cloud</>
          )}
        </button>
        <p className="text-[10px] text-muted-foreground">
          💡 After saving anything in admin panel, changes auto-sync to cloud. Use this button only for the first time setup.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Export Box */}
        <div className="p-6 rounded-3xl glass-card border border-border space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Export JSON Backup</h4>
            <p className="text-xs text-muted-foreground">Download all portfolio content, skills, projects, and settings.</p>
          </div>
          <button
            onClick={handleExportJSON}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-primary-foreground bg-primary hover:opacity-90 transition-all shadow-md"
          >
            Download Backup JSON
          </button>
        </div>

        {/* Restore Box */}
        <div className="p-6 rounded-3xl glass-card border border-border space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Restore from Backup</h4>
            <p className="text-xs text-muted-foreground">Upload a previously saved `.json` backup file to restore data.</p>
          </div>
          <div>
            <input
              type="file"
              accept=".json"
              onChange={handleRestoreFile}
              className="hidden"
              id="restore-json-input"
            />
            <label
              htmlFor="restore-json-input"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-accent-foreground bg-accent hover:opacity-90 transition-all shadow-md block cursor-pointer"
            >
              Upload & Restore File
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};
