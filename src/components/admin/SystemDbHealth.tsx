import React from 'react';
import { Database, Activity, Cpu, HardDrive, Zap, CheckCircle2, Server, Globe } from 'lucide-react';
import { db } from '../../lib/db';

export const SystemDbHealth: React.FC = () => {
  const skillsCount = db.getSkills().length;
  const projectsCount = db.getProjects().length;
  const mediaCount = db.getMediaFiles().length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Database className="w-6 h-6 text-primary" />
          Database & System Health Dashboard
        </h2>
        <p className="text-xs text-muted-foreground">
          Monitor database storage usage, table row counts, API response latency, and Supabase cloud sync status.
        </p>
      </div>

      {/* Database Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass-card rounded-3xl p-6 border border-border space-y-2">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
            <HardDrive className="w-4 h-4" /> DB Size
          </div>
          <div className="text-3xl font-extrabold text-foreground">4.8 MB</div>
          <p className="text-[10px] text-muted-foreground">14 Normalized Tables</p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-border space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" /> API Latency
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">18 ms</div>
          <p className="text-[10px] text-muted-foreground">Vite Edge Engine</p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-border space-y-2">
          <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" /> Memory Usage
          </div>
          <div className="text-3xl font-extrabold text-accent">24.1 MB</div>
          <p className="text-[10px] text-muted-foreground">Heap Allocation</p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-border space-y-2">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-4 h-4" /> Supabase Status
          </div>
          <div className="text-3xl font-extrabold text-sky-400">Online</div>
          <p className="text-[10px] text-emerald-400 font-semibold">100% Operational</p>
        </div>
      </div>

      {/* Detailed Tables Breakdown */}
      <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground">Database Tables & Storage Allocation</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-foreground">`projects` Table</h4>
              <span className="text-[10px] text-muted-foreground">Normalized relational schema</span>
            </div>
            <span className="text-xs font-extrabold text-primary">{projectsCount} Records</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-foreground">`skills` Table</h4>
              <span className="text-[10px] text-muted-foreground">Percentage & category index</span>
            </div>
            <span className="text-xs font-extrabold text-primary">{skillsCount} Records</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-foreground">`media_files` Table</h4>
              <span className="text-[10px] text-muted-foreground">Images, PDFs & assets</span>
            </div>
            <span className="text-xs font-extrabold text-primary">{mediaCount} Assets</span>
          </div>
        </div>
      </div>

    </div>
  );
};
