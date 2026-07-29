import React, { useState } from 'react';
import { Palette, Type, Sparkles, Image, Play, Save, Check } from 'lucide-react';
import { db, ThemeConfig } from '../../lib/db';
import { toast } from 'sonner';

export const BrandingThemeStudio: React.FC = () => {
  const [theme, setTheme] = useState<ThemeConfig>(db.getThemeConfig());
  const [activeTab, setActiveTab] = useState<'colors' | 'branding' | 'fonts' | 'animations'>('colors');

  const colorPresets = [
    { name: 'SaaS Indigo (Default)', primary: '#6366f1', accent: '#ec4899' },
    { name: 'Emerald Cyber', primary: '#10b981', accent: '#06b6d4' },
    { name: 'Sunset Crimson', primary: '#f43f5e', accent: '#f59e0b' },
    { name: 'Midnight Violet', primary: '#8b5cf6', accent: '#3b82f6' },
    { name: 'Nord Oceanic', primary: '#0ea5e9', accent: '#14b8a6' },
  ];

  const handleApplyPreset = (primary: string, accent: string) => {
    const updated = { ...theme, primaryColor: primary, accentColor: accent };
    setTheme(updated);
    db.saveThemeConfig(updated);
    toast.success('Color palette preset applied!');
  };

  const handleSaveTheme = () => {
    db.saveThemeConfig(theme);
    db.logActivity('Theme & Branding Updated', `Updated primary color to ${theme.primaryColor}`, 'info');
    toast.success('Branding & Theme settings saved!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Palette className="w-6 h-6 text-primary" />
            Branding, Typography & Animation Studio
          </h2>
          <p className="text-xs text-muted-foreground">Manage logos, OKLCH palettes, Google Fonts, and scroll animation triggers.</p>
        </div>

        <div className="flex items-center gap-1.5 bg-surface-2 p-1 rounded-2xl border border-border">
          <button
            onClick={() => setActiveTab('colors')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'colors' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Color Palettes
          </button>
          <button
            onClick={() => setActiveTab('branding')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'branding' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Branding Assets
          </button>
          <button
            onClick={() => setActiveTab('fonts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'fonts' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Font Manager
          </button>
          <button
            onClick={() => setActiveTab('animations')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'animations' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Animations
          </button>
        </div>
      </div>

      {/* Tab: Colors */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
            <h3 className="text-sm font-bold text-foreground">Color Presets Library</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {colorPresets.map((preset) => (
                <div
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset.primary, preset.accent)}
                  className="p-4 rounded-2xl bg-surface-2 border border-border flex items-center justify-between cursor-pointer hover:border-primary transition-all"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-foreground">{preset.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.accent }} />
                    </div>
                  </div>
                  <button className="px-3 py-1 rounded-xl bg-surface border border-border text-[10px] font-bold text-muted-foreground">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Branding Assets */}
      {activeTab === 'branding' && (
        <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
          <h3 className="text-sm font-bold text-foreground">Branding Assets Storage</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Dark Mode Logo', 'Light Mode Logo', 'SVG Vector Logo', 'Apple Touch Icon', 'Open Graph (OG) Share Image', 'Email Header Logo'].map((label) => (
              <div key={label} className="p-4 rounded-2xl bg-surface-2 border border-border space-y-2">
                <label className="block text-xs font-bold text-foreground">{label}</label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Fonts */}
      {activeTab === 'fonts' && (
        <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
          <h3 className="text-sm font-bold text-foreground">Google Fonts & Typography Settings</h3>

          <div>
            <label className="block text-xs font-semibold mb-1">Primary Font Family</label>
            <select
              value={theme.fontFamily || 'Inter'}
              onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
            >
              <option value="Inter">Inter (Modern Sans)</option>
              <option value="Outfit">Outfit (Clean Geometry)</option>
              <option value="Roboto">Roboto (Google Standard)</option>
              <option value="Fira Code">Fira Code (Developer Mono)</option>
            </select>
          </div>

          <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-2 text-center">
            <span className="text-xs text-muted-foreground font-mono">Typography Live Preview</span>
            <div className="text-2xl font-black text-foreground" style={{ fontFamily: theme.fontFamily }}>
              Dheeraj Katwe — Full Stack Engineer
            </div>
          </div>
        </div>
      )}

      {/* Tab: Animations */}
      {activeTab === 'animations' && (
        <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
          <h3 className="text-sm font-bold text-foreground">Framer Motion Animation Presets</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Entrance Transition Style</label>
              <select
                value={theme.animationStyle || 'smooth'}
                onChange={(e) => setTheme({ ...theme, animationStyle: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs"
              >
                <option value="smooth">Smooth Fade (200ms)</option>
                <option value="bounce">Spring Bounce</option>
                <option value="zoom">Scale Zoom</option>
                <option value="slide">Slide In</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleSaveTheme}
        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground shadow"
      >
        <Save className="w-4 h-4 inline mr-1.5" /> Save Branding & Theme
      </button>

    </div>
  );
};
