import React, { useState } from 'react';
import { LayoutGrid, Eye, EyeOff, Save, ArrowUp, ArrowDown, Sparkles, Move } from 'lucide-react';
import { db, WidgetItem } from '../../lib/db';
import { toast } from 'sonner';

export const WidgetManager: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetItem[]>(db.getWidgets());

  const handleToggle = (id: string) => {
    const updated = widgets.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w));
    setWidgets(updated);
    db.saveWidgets(updated);
    toast.success('Widget visibility updated!');
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= widgets.length) return;
    const copy = [...widgets];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    copy.forEach((w, i) => (w.position = i + 1));
    setWidgets(copy);
    db.saveWidgets(copy);
  };

  const handleSpanChange = (id: string, colSpan: 1 | 2 | 3) => {
    const updated = widgets.map((w) => (w.id === id ? { ...w, colSpan } : w));
    setWidgets(updated);
    db.saveWidgets(updated);
    toast.success('Widget column span updated!');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
      
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-primary" />
          Interactive Widget System Manager
        </h2>
        <p className="text-xs text-muted-foreground">
          Control display order, grid layout span, and active visibility for all 16 interactive widgets.
        </p>
      </div>

      <div className="space-y-3">
        {widgets.map((widget, index) => (
          <div
            key={widget.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              widget.enabled ? 'bg-surface-2 border-border' : 'bg-surface/50 border-border/50 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-surface border border-border text-muted-foreground cursor-grab">
                <Move className="w-4 h-4" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
                  {widget.title}
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase font-mono">
                    {widget.type}
                  </span>
                </h4>
                <p className="text-[11px] text-muted-foreground">Position #{index + 1} • Grid Width: {widget.colSpan} Column(s)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center gap-1 border border-border rounded-xl p-1 bg-surface">
                <button
                  onClick={() => handleSpanChange(widget.id, 1)}
                  className={`px-2 py-1 text-[10px] font-bold rounded-lg ${widget.colSpan === 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                >
                  1 Col
                </button>
                <button
                  onClick={() => handleSpanChange(widget.id, 2)}
                  className={`px-2 py-1 text-[10px] font-bold rounded-lg ${widget.colSpan === 2 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                >
                  2 Col
                </button>
                <button
                  onClick={() => handleSpanChange(widget.id, 3)}
                  className={`px-2 py-1 text-[10px] font-bold rounded-lg ${widget.colSpan === 3 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                >
                  3 Col
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg bg-surface border border-border text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === widgets.length - 1}
                  className="p-1.5 rounded-lg bg-surface border border-border text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => handleToggle(widget.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  widget.enabled
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {widget.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {widget.enabled ? 'Active' : 'Disabled'}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
