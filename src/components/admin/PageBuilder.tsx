import React, { useState } from 'react';
import { Eye, EyeOff, Save, Layers, Plus, Trash2, ArrowUp, ArrowDown, Sparkles, LayoutGrid } from 'lucide-react';
import { db, SectionVisibility, CustomSection } from '../../lib/db';
import { toast } from 'sonner';

export const PageBuilder: React.FC = () => {
  const [vis, setVis] = useState<SectionVisibility>(db.getSectionVisibility());
  const [customSections, setCustomSections] = useState<CustomSection[]>(db.getCustomSections());

  // Form state for creating custom section
  const [newSection, setNewSection] = useState<Partial<CustomSection>>({
    title: '',
    subtitle: '',
    description: '',
    layout: 'cards',
    background: 'glass',
    padding: 'medium',
    spacing: 'normal',
    animation: 'fade',
    visibility: true,
  });

  const handleToggleVis = (key: keyof SectionVisibility) => {
    const updated = { ...vis, [key]: !vis[key] };
    setVis(updated);
    db.saveSectionVisibility(updated);
    toast.success(`Section visibility updated!`);
  };

  const handleAddCustomSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSection.title) return;
    const item: CustomSection = {
      id: Date.now().toString(),
      title: newSection.title,
      subtitle: newSection.subtitle || '',
      description: newSection.description || '',
      image: newSection.image || '',
      video: newSection.video || '',
      layout: newSection.layout || 'cards',
      cards: [
        { id: '1', title: 'Feature One', desc: 'Custom content card details', tag: 'New' },
        { id: '2', title: 'Feature Two', desc: 'High performance workflow card', tag: 'Fast' },
      ],
      buttons: [
        { id: 'b1', label: 'Explore More', url: '#contact', variant: 'primary' },
      ],
      background: newSection.background || 'glass',
      padding: newSection.padding || 'medium',
      spacing: newSection.spacing || 'normal',
      animation: newSection.animation || 'fade',
      visibility: true,
      position: customSections.length + 1,
      seoTitle: newSection.title,
    };
    db.saveCustomSection(item);
    setCustomSections(db.getCustomSections());
    setNewSection({ title: '', subtitle: '', description: '', layout: 'cards', background: 'glass' });
    toast.success('Dynamic Homepage Section Created!');
  };

  const handleDeleteCustomSection = (id: string) => {
    db.deleteCustomSection(id);
    setCustomSections(db.getCustomSections());
    toast.success('Custom section removed.');
  };

  const sections: Array<{ key: keyof SectionVisibility; label: string; desc: string }> = [
    { key: 'hero', label: 'Hero Section', desc: 'Main header title, role typewriter, and profile card' },
    { key: 'about', label: 'About & Bio', desc: 'Career summary, CGPA stats, and language badges' },
    { key: 'services', label: 'Services', desc: 'ERP customization & full-stack development offerings' },
    { key: 'skills', label: 'Skills & Tech Stack', desc: 'Interactive skill bars and category filters' },
    { key: 'projects', label: 'Projects Showcase', desc: 'Portfolio project cards with detailed modals' },
    { key: 'codingProfiles', label: 'Coding Profiles', desc: 'GitHub, LeetCode, and HackerRank live stats' },
    { key: 'certifications', label: 'Certifications', desc: 'Verified professional licenses & degrees' },
    { key: 'experience', label: 'Career Journey', desc: 'Work experience at AarGees and education history' },
    { key: 'testimonials', label: 'Testimonials', desc: 'Client reviews and rating stars' },
    { key: 'contact', label: 'Contact Form', desc: 'Direct message submission form' },
    { key: 'footer', label: 'Footer Bar', desc: 'Bottom copyright bar and social links' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Layers className="w-6 h-6 text-primary" />
          Dynamic Page & Section Builder
        </h2>
        <p className="text-xs text-muted-foreground">
          Manage core section visibility and create completely new custom homepage sections.
        </p>
      </div>

      {/* Built-in Sections Controls */}
      <div className="space-y-3 max-w-3xl">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-muted-foreground">Core Built-in Sections</h3>
        {sections.map(({ key, label, desc }) => {
          const isVisible = vis[key];
          return (
            <div
              key={key}
              className="p-4 rounded-2xl glass-card border border-border flex items-center justify-between transition-colors"
            >
              <div>
                <h4 className="text-xs font-bold text-foreground">{label}</h4>
                <p className="text-[11px] text-muted-foreground">{desc}</p>
              </div>

              <button
                onClick={() => handleToggleVis(key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isVisible
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {isVisible ? (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Visible
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Hidden
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Dynamic Custom Section Creator */}
      <div className="space-y-4 max-w-3xl pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-primary" /> Custom Homepage Sections ({customSections.length})
          </h3>
        </div>

        <form onSubmit={handleAddCustomSection} className="glass-card rounded-3xl p-6 border border-border space-y-4">
          <h4 className="text-xs font-bold text-foreground">Create New Custom Homepage Section</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Section Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Featured Clients & Awards"
                value={newSection.title || ''}
                onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-surface-2 border border-border text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Subtitle / Badge</label>
              <input
                type="text"
                placeholder="e.g. Enterprise Milestones"
                value={newSection.subtitle || ''}
                onChange={(e) => setNewSection({ ...newSection, subtitle: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-surface-2 border border-border text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Section narrative summary..."
              value={newSection.description || ''}
              onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-surface-2 border border-border text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Layout Grid Style</label>
              <select
                value={newSection.layout || 'cards'}
                onChange={(e) => setNewSection({ ...newSection, layout: e.target.value as any })}
                className="w-full px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs"
              >
                <option value="cards">Cards Grid</option>
                <option value="grid">Multi-Column Grid</option>
                <option value="banner">Hero Banner</option>
                <option value="buttons">CTA Action Bar</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Background Theme</label>
              <select
                value={newSection.background || 'glass'}
                onChange={(e) => setNewSection({ ...newSection, background: e.target.value as any })}
                className="w-full px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs"
              >
                <option value="glass">Glassmorphic Blur</option>
                <option value="dark">Solid Dark</option>
                <option value="gradient">Gradient Glow</option>
                <option value="transparent">Transparent</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Entrance Animation</label>
              <select
                value={newSection.animation || 'fade'}
                onChange={(e) => setNewSection({ ...newSection, animation: e.target.value as any })}
                className="w-full px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs"
              >
                <option value="fade">Fade In</option>
                <option value="zoom">Zoom Scale</option>
                <option value="slide">Slide Up</option>
                <option value="none">Static</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Section to Homepage
          </button>
        </form>

        {/* Existing Custom Sections */}
        <div className="space-y-3">
          {customSections.map((sec) => (
            <div key={sec.id} className="p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-foreground">{sec.title}</h4>
                <p className="text-[11px] text-muted-foreground">{sec.subtitle} • Layout: {sec.layout} • Theme: {sec.background}</p>
              </div>
              <button
                onClick={() => handleDeleteCustomSection(sec.id)}
                className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
