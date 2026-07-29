import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Save, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';
import { db, FeatureToggles } from '../../lib/db';
import { toast } from 'sonner';

export const FeatureManager: React.FC = () => {
  const [toggles, setToggles] = useState<FeatureToggles>(db.getFeatureToggles());

  const handleToggle = (key: keyof FeatureToggles) => {
    const updated = { ...toggles, [key]: !toggles[key] };
    setToggles(updated);
  };

  const handleSave = () => {
    db.saveFeatureToggles(toggles);
    db.logActivity('Feature Toggles Updated', 'Updated feature toggle permissions across site', 'info');
    toast.success('Feature toggle configuration saved!');
  };

  const handleEnableAll = () => {
    const allOn: FeatureToggles = Object.keys(toggles).reduce((acc, k) => {
      acc[k as keyof FeatureToggles] = true;
      return acc;
    }, {} as FeatureToggles);
    allOn.maintenanceMode = false;
    setToggles(allOn);
    db.saveFeatureToggles(allOn);
    toast.success('All portfolio features enabled!');
  };

  const featureList: Array<{ key: keyof FeatureToggles; label: string; description: string; category: string }> = [
    { key: 'projects', label: 'Projects Showcase', description: 'Display portfolio projects grid and modal details', category: 'Core Content' },
    { key: 'skills', label: 'Skills & Tech Stack', description: 'Display interactive skills and proficiency bars', category: 'Core Content' },
    { key: 'experience', label: 'Work Experience & Education', description: 'Show employment timeline and education details', category: 'Core Content' },
    { key: 'testimonials', label: 'Client Testimonials', description: 'Display customer and lead developer recommendations', category: 'Content Hub' },
    { key: 'codingProfiles', label: 'Coding Profiles Grid', description: 'Display GitHub, LeetCode, CodeChef badge profiles', category: 'Integrations' },
    { key: 'aiAssistant', label: 'AI Portfolio Assistant Chatbot', description: 'Floating AI chat widget trained on Dheeraj Katwe resume', category: 'AI & Automation' },
    { key: 'resume', label: 'Resume Viewer & PDF Downloads', description: 'Enable modal preview and file downloads', category: 'Core Content' },
    { key: 'newsletter', label: 'Email Newsletter Signup', description: 'Subscribe form and email campaign integration', category: 'Engagement' },
    { key: 'comments', label: 'Blog & Project Comments', description: 'Allow visitors to leave comments on articles and projects', category: 'Engagement' },
    { key: 'likes', label: 'Visitor Reactions (Likes/Fire/Claps)', description: 'Interactive reaction buttons on content', category: 'Engagement' },
    { key: 'analytics', label: 'Traffic & Visitor Tracker', description: 'Log pageviews, user sessions, and geographic metrics', category: 'Analytics' },
    { key: 'githubSync', label: 'GitHub Auto-Sync', description: 'Automated fetch of public repositories and contribution calendar', category: 'Integrations' },
    { key: 'leetcodeSync', label: 'LeetCode Auto-Sync', description: 'Fetch total solved problems and contest metrics', category: 'Integrations' },
    { key: 'visitorsCounter', label: 'Live Visitors Counter Widget', description: 'Display total live and unique visitors badge', category: 'Analytics' },
    { key: 'openSource', label: 'Open Source Projects Section', description: 'Highlight community repositories and npm packages', category: 'Content Hub' },
    { key: 'gallery', label: 'Media & Image Gallery', description: 'Visual project screenshot showcase', category: 'Content Hub' },
    { key: 'timeline', label: 'System Timeline & Changelog', description: 'Milestones and activity timeline widget', category: 'Core Content' },
    { key: 'contactForm', label: 'Interactive Contact Form', description: 'Allow visitors to send direct messages to CRM', category: 'Engagement' },
    { key: 'maintenanceMode', label: 'Maintenance Mode Banner', description: 'Lock public site with maintenance landing screen', category: 'System Control' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Feature Toggle System</h2>
          <p className="text-xs text-muted-foreground">Instantly enable or disable any module or widget across the platform.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleEnableAll}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface-2 hover:bg-surface border border-border text-foreground flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Enable All
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground shadow-md hover:opacity-90 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Toggle Settings
          </button>
        </div>
      </div>

      {/* Grid of Toggle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featureList.map((item) => {
          const isEnabled = toggles[item.key];
          return (
            <div
              key={item.key}
              onClick={() => handleToggle(item.key)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isEnabled
                  ? 'bg-surface-2/90 border-primary/40 shadow-sm'
                  : 'bg-surface/50 border-border opacity-70 hover:opacity-100'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{item.label}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-muted-foreground border border-border">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              </div>

              <button type="button" className="shrink-0 text-primary">
                {isEnabled ? (
                  <ToggleRight className="w-8 h-8 text-primary" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-muted-foreground" />
                )}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
