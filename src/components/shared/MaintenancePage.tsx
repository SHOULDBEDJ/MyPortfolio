import React from 'react';
import { ShieldAlert, Clock, Sparkles } from 'lucide-react';
import { db } from '../../lib/db';

export const MaintenancePage: React.FC = () => {
  const config = db.getMaintenance();

  return (
    <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-xl">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold uppercase tracking-wider text-accent inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          Scheduled Upgrade
        </span>
        <h1 className="text-3xl font-extrabold text-foreground">
          Portfolio Under Maintenance
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {config.message}
        </p>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-foreground">
        <Clock className="w-4 h-4 text-primary" />
        Estimated Return: {config.estimatedReturn}
      </div>
    </div>
  );
};
