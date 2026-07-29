import React, { useState } from 'react';
import { Network, Plus, Trash2, Download, Upload, CheckCircle2, ToggleLeft, ToggleRight } from 'lucide-react';
import { db, RedirectRule } from '../../lib/db';
import { toast } from 'sonner';

export const RedirectManager: React.FC = () => {
  const [redirects, setRedirects] = useState<RedirectRule[]>(db.getRedirects());
  const [newRule, setNewRule] = useState<{ sourceUrl: string; targetUrl: string; type: RedirectRule['type'] }>({
    sourceUrl: '',
    targetUrl: '',
    type: '301',
  });

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRule.sourceUrl || !newRule.targetUrl) return;

    const rule: RedirectRule = {
      id: Date.now().toString(),
      sourceUrl: newRule.sourceUrl.startsWith('/') ? newRule.sourceUrl : `/${newRule.sourceUrl}`,
      targetUrl: newRule.targetUrl,
      type: newRule.type,
      active: true,
      hits: 0,
    };

    db.saveRedirect(rule);
    setRedirects(db.getRedirects());
    setNewRule({ sourceUrl: '', targetUrl: '', type: '301' });
    toast.success('Redirect rule created!');
  };

  const handleDelete = (id: string) => {
    db.deleteRedirect(id);
    setRedirects(db.getRedirects());
    toast.success('Redirect rule removed.');
  };

  const handleExportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + ['Source,Target,Type,Active,Hits', ...redirects.map(r => `"${r.sourceUrl}","${r.targetUrl}","${r.type}",${r.active},${r.hits}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `redirect_rules_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Redirect rules exported to CSV!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Network className="w-6 h-6 text-primary" />
            URL Redirect Manager
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure HTTP 301, 302, permanent, temporary, and 404 URL rewrites and aliases.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface-2 hover:bg-surface border border-border text-foreground flex items-center gap-2"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV Rules
        </button>
      </div>

      {/* New Redirect Rule Form */}
      <form onSubmit={handleAddRule} className="glass-card rounded-3xl p-6 border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground">Add New Redirect Rule</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Source Path (Old URL)</label>
            <input
              type="text"
              required
              placeholder="/old-link"
              value={newRule.sourceUrl}
              onChange={(e) => setNewRule({ ...newRule, sourceUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Target Destination URL</label>
            <input
              type="text"
              required
              placeholder="https://... or /new-link"
              value={newRule.targetUrl}
              onChange={(e) => setNewRule({ ...newRule, targetUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">HTTP Status Code</label>
            <select
              value={newRule.type}
              onChange={(e) => setNewRule({ ...newRule, type: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
            >
              <option value="301">301 Permanent Redirect</option>
              <option value="302">302 Temporary Redirect</option>
              <option value="Permanent">Permanent Alias</option>
              <option value="Temporary">Temporary Override</option>
              <option value="404">404 Custom Fallback</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Redirect Rule
        </button>
      </form>

      {/* Rules Table */}
      <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground">Active Redirect Rules ({redirects.length})</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold uppercase text-muted-foreground">
                <th className="py-2.5 px-3">Source URL</th>
                <th className="py-2.5 px-3">Destination</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Total Hits</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-xs">
              {redirects.map((rule) => (
                <tr key={rule.id} className="hover:bg-surface-2/50">
                  <td className="py-3 px-3 font-mono font-bold text-primary">{rule.sourceUrl}</td>
                  <td className="py-3 px-3 font-mono text-muted-foreground truncate max-w-[200px]">{rule.targetUrl}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-surface border border-border text-[10px] font-bold">
                      {rule.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-foreground">{rule.hits}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleDelete(rule.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
