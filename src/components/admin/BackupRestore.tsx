import React from 'react';
import { Download, Upload, Database, RefreshCw, FileCode } from 'lucide-react';
import { db } from '../../lib/db';
import { toast } from 'sonner';

export const BackupRestore: React.FC = () => {
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
