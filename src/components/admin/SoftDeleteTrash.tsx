import React, { useState } from 'react';
import { Trash2, RotateCcw, ShieldAlert, AlertOctagon, Sparkles } from 'lucide-react';
import { db, TrashItem } from '../../lib/db';
import { toast } from 'sonner';

export const SoftDeleteTrash: React.FC = () => {
  const [trash, setTrash] = useState<TrashItem[]>(db.getTrash());

  const handleRestore = (id: string) => {
    const item = db.restoreFromTrash(id);
    if (item) {
      if (item.entityType === 'project') db.saveProject(item.data);
      else if (item.entityType === 'skill') db.saveSkill(item.data);
      else if (item.entityType === 'service') db.saveService(item.data);
      
      setTrash(db.getTrash());
      db.logActivity('Record Restored', `Restored ${item.entityType}: ${item.entityTitle}`, 'success');
      toast.success(`Restored "${item.entityTitle}" successfully!`);
    }
  };

  const handleEmptyTrash = () => {
    db.emptyTrash();
    setTrash([]);
    db.logActivity('Trash Purged', 'Permanently purged all soft-deleted records', 'warning');
    toast.success('Trash emptied completely!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-rose-400" />
            Soft Delete Trash & Recycle Bin
          </h2>
          <p className="text-xs text-muted-foreground">
            Safely inspect soft-deleted records before permanent purge. Auto-retention active for 30 days.
          </p>
        </div>

        {trash.length > 0 && (
          <button
            onClick={handleEmptyTrash}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 flex items-center gap-2"
          >
            <AlertOctagon className="w-4 h-4" /> Permanently Empty Trash
          </button>
        )}
      </div>

      {trash.length === 0 ? (
        <div className="p-12 rounded-3xl bg-surface-2 border border-dashed border-border text-center space-y-2">
          <Trash2 className="w-8 h-8 text-muted-foreground mx-auto opacity-40" />
          <h3 className="text-sm font-bold text-foreground">Trash Bin is Empty</h3>
          <p className="text-xs text-muted-foreground">When items are deleted, they will appear here and can be restored anytime.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {trash.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{item.entityTitle}</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface border border-border text-[10px] uppercase font-mono text-muted-foreground">
                    {item.entityType}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">Deleted on {new Date(item.deletedAt).toLocaleString()}</p>
              </div>

              <button
                onClick={() => handleRestore(item.id)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restore
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
