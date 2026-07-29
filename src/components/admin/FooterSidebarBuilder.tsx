import React, { useState } from 'react';
import { Layout, Sidebar, Save, Plus, Trash2, Globe, Shield, Sparkles } from 'lucide-react';
import { db, FooterConfig, SidebarConfig } from '../../lib/db';
import { toast } from 'sonner';

export const FooterSidebarBuilder: React.FC = () => {
  const [footer, setFooter] = useState<FooterConfig>(db.getFooterConfig());
  const [sidebar, setSidebar] = useState<SidebarConfig>(db.getSidebarConfig());

  const handleSaveFooter = () => {
    db.saveFooterConfig(footer);
    db.logActivity('Footer Config Updated', 'Saved custom footer columns and copyright', 'info');
    toast.success('Footer layout configuration saved!');
  };

  const handleSaveSidebar = () => {
    db.saveSidebarConfig(sidebar);
    db.logActivity('Sidebar Config Updated', 'Saved sidebar widgets and ads', 'info');
    toast.success('Sidebar configuration saved!');
  };

  const handleAddFooterColumn = () => {
    const newCols = [
      ...footer.columns,
      {
        title: `Custom Column ${footer.columns.length + 1}`,
        links: [
          { label: 'New Link 1', url: '#' },
          { label: 'New Link 2', url: '#' },
        ],
      },
    ];
    setFooter({ ...footer, columns: newCols });
  };

  const handleDeleteFooterColumn = (index: number) => {
    const copy = [...footer.columns];
    copy.splice(index, 1);
    setFooter({ ...footer, columns: copy });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {/* Footer Builder Section */}
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Layout className="w-6 h-6 text-primary" />
            Dynamic Footer Builder
          </h2>
          <p className="text-xs text-muted-foreground">Customize footer brand logo, navigation columns, social links, and legal notices.</p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-border space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Footer Logo Text</label>
              <input
                type="text"
                value={footer.logoText}
                onChange={(e) => setFooter({ ...footer, logoText: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Footer Background Theme</label>
              <select
                value={footer.backgroundColor}
                onChange={(e) => setFooter({ ...footer, backgroundColor: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
              >
                <option value="surface">Surface Match</option>
                <option value="dark">Pure Dark</option>
                <option value="glass">Glassmorphic Blur</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Footer Description</label>
            <textarea
              rows={2}
              value={footer.description}
              onChange={(e) => setFooter({ ...footer, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Copyright Notice</label>
            <input
              type="text"
              value={footer.copyrightText}
              onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
            />
          </div>

          {/* Footer Columns */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-foreground">Footer Navigation Columns ({footer.columns.length})</h4>
              <button
                onClick={handleAddFooterColumn}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add Column
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {footer.columns.map((col, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-surface-2 border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={col.title}
                      onChange={(e) => {
                        const copy = [...footer.columns];
                        copy[idx].title = e.target.value;
                        setFooter({ ...footer, columns: copy });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-surface border border-border text-xs font-bold text-foreground"
                    />
                    <button
                      onClick={() => handleDeleteFooterColumn(idx)}
                      className="p-1 rounded-lg bg-rose-500/10 text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {col.links.map((link, lIdx) => (
                      <div key={lIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => {
                            const copy = [...footer.columns];
                            copy[idx].links[lIdx].label = e.target.value;
                            setFooter({ ...footer, columns: copy });
                          }}
                          className="w-1/2 px-2.5 py-1 rounded-lg bg-surface border border-border text-[11px]"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => {
                            const copy = [...footer.columns];
                            copy[idx].links[lIdx].url = e.target.value;
                            setFooter({ ...footer, columns: copy });
                          }}
                          className="w-1/2 px-2.5 py-1 rounded-lg bg-surface border border-border text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveFooter}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground shadow-md"
          >
            <Save className="w-4 h-4 inline mr-1.5" /> Save Footer Settings
          </button>
        </div>
      </div>

      {/* Sidebar Builder Section */}
      <div className="space-y-6 max-w-4xl pt-6 border-t border-border">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sidebar className="w-6 h-6 text-primary" />
            Dynamic Sidebar Builder
          </h2>
          <p className="text-xs text-muted-foreground">Configure sidebar widgets (Search, Categories, Tags, Recent Projects, Ads, GitHub stats).</p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-border space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { key: 'showSearch', label: 'Search Input' },
              { key: 'showCategories', label: 'Categories List' },
              { key: 'showTags', label: 'Tags Cloud' },
              { key: 'showArchives', label: 'Archives Selector' },
              { key: 'showPopularPosts', label: 'Popular Posts' },
              { key: 'showRecentPosts', label: 'Recent Posts' },
              { key: 'showAd', label: 'Advertisement Card' },
              { key: 'showNewsletter', label: 'Newsletter Signup' },
              { key: 'showGithubStats', label: 'GitHub Stats Widget' },
            ].map(({ key, label }) => {
              const val = (sidebar as any)[key];
              return (
                <label
                  key={key}
                  className="p-3.5 rounded-2xl bg-surface-2 border border-border flex items-center justify-between cursor-pointer"
                >
                  <span className="text-xs font-bold text-foreground">{label}</span>
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={(e) => setSidebar({ ...sidebar, [key]: e.target.checked })}
                    className="w-4 h-4 rounded text-primary border-border bg-surface"
                  />
                </label>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Advertisement / Announcement Banner Text</label>
            <input
              type="text"
              value={sidebar.adText}
              onChange={(e) => setSidebar({ ...sidebar, adText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
            />
          </div>

          <button
            onClick={handleSaveSidebar}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground shadow-md"
          >
            <Save className="w-4 h-4 inline mr-1.5" /> Save Sidebar Settings
          </button>
        </div>
      </div>

    </div>
  );
};
