import React, { useState } from 'react';
import { History, Info, CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';
import { db, ActivityLog } from '../../lib/db';

export const ActivityLogTimeline: React.FC = () => {
  const [logs] = useState<ActivityLog[]>(db.getActivityLogs());

  const getIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'error': return <XCircle className="w-4 h-4 text-rose-400" />;
      default: return <Info className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <History className="w-6 h-6 text-primary" />
          System Activity Timeline & Audit Logs
        </h2>
        <p className="text-xs text-muted-foreground">
          Real-time record of all administrative logins, content updates, theme modifications, and exports.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 border border-border space-y-6">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
          {logs.map((log) => (
            <div key={log.id} className="relative flex items-start justify-between gap-4">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                {getIcon(log.type)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{log.action}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface border border-border text-muted-foreground font-mono">
                    By {log.user}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{log.details}</p>
              </div>

              <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
