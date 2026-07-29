import React from 'react';
import { Users, Eye, Download, Smartphone, Monitor, Globe, Activity } from 'lucide-react';
import { getAnalyticsData } from '../../lib/analytics';
import { db } from '../../lib/db';

export const AnalyticsDashboard: React.FC = () => {
  const analytics = getAnalyticsData();
  const resumes = db.getResumes();
  const totalDownloads = resumes.reduce((acc, r) => acc + r.downloadCount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Advanced Analytics</h2>
        <p className="text-xs text-muted-foreground">Real-time visitor logs, traffic sources, and resume analytics.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-border space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Total Visitors</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">{analytics.totalVisitors}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">+14% this week</span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-border space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Live Active Visitors</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{analytics.liveVisitors}</div>
          <span className="text-[11px] text-muted-foreground">Active in real-time</span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-border space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Resume Downloads</span>
            <Download className="w-4 h-4 text-accent" />
          </div>
          <div className="text-3xl font-extrabold text-accent">{totalDownloads}</div>
          <span className="text-[11px] text-muted-foreground">Across all resume formats</span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-border space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Bounce Rate</span>
            <Globe className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">{analytics.bounceRate}%</div>
          <span className="text-[11px] text-emerald-400 font-semibold">Optimal engagement</span>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Device Stats */}
        <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Monitor className="w-5 h-5 text-primary" />
            Device Breakdown
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>Desktop</span>
                <span className="font-bold">{analytics.devices.desktop}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${analytics.devices.desktop}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Mobile</span>
                <span className="font-bold">{analytics.devices.mobile}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${analytics.devices.mobile}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Browser Stats */}
        <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent" />
            Browser Distribution
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>Chrome</span>
                <span className="font-bold">{analytics.browsers.chrome}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: `${analytics.browsers.chrome}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Safari</span>
                <span className="font-bold">{analytics.browsers.safari}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: `${analytics.browsers.safari}%` }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
