import React, { useState, useEffect } from 'react';
import {
  Github,
  Clock,
  Calendar,
  Users,
  BookOpen,
  FolderGit2,
  Quote,
  CloudSun,
  Code2,
  Rss,
  Activity,
  Flame,
  Award
} from 'lucide-react';
import { db, WidgetItem, useDbUpdate } from '../../lib/db';

export const WidgetEngine: React.FC = () => {
  useDbUpdate();
  const widgets = db.getWidgets().filter((w) => w.enabled);
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (widgets.length === 0) return null;

  return (
    <div className="py-12 bg-surface/50 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Live Interactive Hub
          </span>
          <h2 className="text-3xl font-extrabold text-foreground">Activity & Real-Time Widgets</h2>
          <p className="text-xs text-muted-foreground">Live GitHub activity, coding statistics, visitor counts, and system metrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((w) => {
            switch (w.type) {
              case 'github_contributions':
                return (
                  <div key={w.id} className="glass-card rounded-3xl p-6 border border-border space-y-4 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Github className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-sm text-foreground">GitHub Contributions Matrix</h3>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        482 Contributions this year
                      </span>
                    </div>

                    {/* Simulated Github Contribution Grid */}
                    <div className="grid grid-cols-12 gap-1.5 pt-2">
                      {Array.from({ length: 48 }).map((_, i) => {
                        const intensity = (i % 4);
                        const colors = ['bg-surface-2', 'bg-emerald-950', 'bg-emerald-700', 'bg-emerald-400'];
                        return (
                          <div key={i} className={`h-4 rounded-sm ${colors[intensity]}`} title={`Day ${i+1}`} />
                        );
                      })}
                    </div>
                  </div>
                );

              case 'coding_stats':
                return (
                  <div key={w.id} className="glass-card rounded-3xl p-6 border border-border space-y-4">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Code2 className="w-5 h-5" />
                      <h3 className="font-bold text-sm text-foreground">LeetCode Stats</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 rounded-2xl bg-surface-2 border border-border">
                        <div className="text-lg font-black text-emerald-400">142</div>
                        <div className="text-[10px] text-muted-foreground">Easy</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-surface-2 border border-border">
                        <div className="text-lg font-black text-amber-400">188</div>
                        <div className="text-[10px] text-muted-foreground">Medium</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-surface-2 border border-border">
                        <div className="text-lg font-black text-rose-400">45</div>
                        <div className="text-[10px] text-muted-foreground">Hard</div>
                      </div>
                    </div>
                  </div>
                );

              case 'clock':
                return (
                  <div key={w.id} className="glass-card rounded-3xl p-6 border border-border space-y-2 text-center">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <Clock className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Local Time (IST)</span>
                    </div>
                    <div className="text-3xl font-black text-foreground font-mono">{time}</div>
                    <p className="text-[10px] text-muted-foreground">Karnataka, India (GMT +5:30)</p>
                  </div>
                );

              case 'calendar':
                return (
                  <div key={w.id} className="glass-card rounded-3xl p-6 border border-border space-y-3">
                    <div className="flex items-center gap-2 text-accent">
                      <Calendar className="w-5 h-5" />
                      <h3 className="font-bold text-sm text-foreground">Availability Calendar</h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-between">
                      <span>Q3 2026 Contract Booking</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white font-bold text-[10px]">Open</span>
                    </div>
                  </div>
                );

              case 'visitor_count':
                return (
                  <div key={w.id} className="glass-card rounded-3xl p-6 border border-border space-y-2">
                    <div className="flex items-center gap-2 text-sky-400">
                      <Users className="w-5 h-5" />
                      <h3 className="font-bold text-sm text-foreground">Visitor Stats</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-foreground">14,290</span>
                      <span className="text-xs text-emerald-400 font-semibold">+18% this month</span>
                    </div>
                  </div>
                );

              case 'quote':
                return (
                  <div key={w.id} className="glass-card rounded-3xl p-6 border border-border space-y-2">
                    <Quote className="w-5 h-5 text-primary opacity-60" />
                    <p className="text-xs italic text-foreground font-medium">"Simplicity is prerequisite for reliability."</p>
                    <span className="text-[10px] text-muted-foreground font-bold">— Edsger W. Dijkstra</span>
                  </div>
                );

              case 'weather':
                return (
                  <div key={w.id} className="glass-card rounded-3xl p-6 border border-border flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-amber-400">
                        <CloudSun className="w-5 h-5" />
                        <span className="font-bold text-sm text-foreground">Karnataka</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Partly Cloudy • 28°C</p>
                    </div>
                    <span className="text-2xl font-black text-foreground">28°</span>
                  </div>
                );

              default:
                return (
                  <div key={w.id} className="glass-card rounded-3xl p-6 border border-border space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Activity className="w-5 h-5" />
                      <h3 className="font-bold text-sm text-foreground">{w.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Interactive module actively synced with portfolio backend.</p>
                  </div>
                );
            }
          })}
        </div>

      </div>
    </div>
  );
};
