import React, { useState } from 'react';
import { Layers, Plus, Trash2, Code2, Copy, Check, Sparkles } from 'lucide-react';
import { db, ComponentBlock } from '../../lib/db';
import { toast } from 'sonner';

export const ComponentLibrary: React.FC = () => {
  const [blocks, setBlocks] = useState<ComponentBlock[]>(db.getComponentBlocks());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newBlock, setNewBlock] = useState<{
    name: string;
    type: ComponentBlock['type'];
    headline: string;
    subtext: string;
    ctaText: string;
    ctaUrl: string;
  }>({
    name: '',
    type: 'CTA',
    headline: '',
    subtext: '',
    ctaText: 'Get Started',
    ctaUrl: '#contact',
  });

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlock.name) return;

    const item: ComponentBlock = {
      id: Date.now().toString(),
      name: newBlock.name,
      type: newBlock.type,
      content: {
        headline: newBlock.headline || newBlock.name,
        subtext: newBlock.subtext || 'Reusable enterprise block content',
        ctaText: newBlock.ctaText,
        ctaUrl: newBlock.ctaUrl,
        items: [
          { title: 'Feature Item 1', desc: 'Item description text' },
          { title: 'Feature Item 2', desc: 'Second item description text' },
        ],
      },
      created_at: new Date().toISOString(),
    };

    db.saveComponentBlock(item);
    setBlocks(db.getComponentBlocks());
    setNewBlock({ name: '', type: 'CTA', headline: '', subtext: '', ctaText: 'Get Started', ctaUrl: '#contact' });
    toast.success(`Component block "${item.name}" created!`);
  };

  const handleDelete = (id: string) => {
    db.deleteComponentBlock(id);
    setBlocks(db.getComponentBlocks());
    toast.success('Block deleted from library.');
  };

  const handleCopyTag = (id: string) => {
    navigator.clipboard.writeText(`<ComponentBlock id="${id}" />`);
    setCopiedId(id);
    toast.success('Shortcode copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const typesList: ComponentBlock['type'][] = [
    'CTA',
    'FeatureCards',
    'TimelineCards',
    'PricingCards',
    'Stats',
    'HeroBanner',
    'Alert',
    'ImageGallery',
    'CodeBlock',
    'Buttons',
    'Testimonials',
    'Newsletter',
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Layers className="w-6 h-6 text-primary" />
          Reusable Component Library
        </h2>
        <p className="text-xs text-muted-foreground">
          Create modular UI blocks (CTA, Pricing, Code Blocks) that can be rendered anywhere across your platform.
        </p>
      </div>

      {/* Block Creator Form */}
      <form onSubmit={handleCreateBlock} className="glass-card rounded-3xl p-6 border border-border space-y-4 max-w-3xl">
        <h3 className="text-sm font-bold text-foreground">Create Reusable UI Block</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Block Internal Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Enterprise Pricing CTA"
              value={newBlock.name}
              onChange={(e) => setNewBlock({ ...newBlock, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Component Type</label>
            <select
              value={newBlock.type}
              onChange={(e) => setNewBlock({ ...newBlock, type: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
            >
              {typesList.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Headline Text</label>
            <input
              type="text"
              placeholder="e.g. Scale your software development"
              value={newBlock.headline}
              onChange={(e) => setNewBlock({ ...newBlock, headline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Button Label & URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newBlock.ctaText}
                onChange={(e) => setNewBlock({ ...newBlock, ctaText: e.target.value })}
                className="w-1/2 px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-xs"
              />
              <input
                type="text"
                value={newBlock.ctaUrl}
                onChange={(e) => setNewBlock({ ...newBlock, ctaUrl: e.target.value })}
                className="w-1/2 px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-xs"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Save Component Block
        </button>
      </form>

      {/* Library Grid */}
      <div className="space-y-4 max-w-3xl">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-muted-foreground">Saved UI Blocks ({blocks.length})</h3>

        {blocks.length === 0 ? (
          <div className="p-8 rounded-2xl bg-surface-2 border border-dashed border-border text-center text-muted-foreground text-xs">
            No custom reusable blocks created yet. Fill out the form above to add your first UI block.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blocks.map((block) => (
              <div key={block.id} className="p-5 rounded-2xl bg-surface-2 border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                    {block.type}
                  </span>
                  <button
                    onClick={() => handleDelete(block.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-foreground">{block.name}</h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">{block.content?.headline}</p>
                </div>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                  <code className="text-[10px] bg-surface p-1 rounded border border-border text-muted-foreground font-mono">
                    {`<ComponentBlock id="${block.id}" />`}
                  </code>
                  <button
                    onClick={() => handleCopyTag(block.id)}
                    className="p-1.5 rounded-lg bg-surface border border-border text-muted-foreground hover:text-foreground text-[10px] font-semibold flex items-center gap-1"
                  >
                    {copiedId === block.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />} Copy Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
