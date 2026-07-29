import React, { useState } from 'react';
import {
  Wand2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Globe,
  Palette,
  Mail,
  ShieldCheck,
  Save,
  X
} from 'lucide-react';
import { db, SetupConfig } from '../../lib/db';
import { toast } from 'sonner';

interface SetupWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const SetupWizardModal: React.FC<SetupWizardModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [config, setConfig] = useState<SetupConfig>(db.getSetupConfig());

  if (!isOpen) return null;

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSaveAll = () => {
    const updated = { ...config, setupCompleted: true };
    db.saveSetupConfig(updated);
    db.logActivity('Onboarding Wizard Completed', 'Initial website settings and branding saved', 'success');
    toast.success('Onboarding completed successfully! Website configuration updated.');
    if (onComplete) onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col my-8">
        
        {/* Header */}
        <div className="p-6 bg-surface-2 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold shadow-lg">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">First-Time Setup Wizard</h2>
              <p className="text-xs text-muted-foreground">Step {step} of {totalSteps} — Enterprise Onboarding</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-surface border border-border text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-2 h-1.5">
          <div
            className="bg-gradient-brand h-1.5 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-6 lg:p-8 flex-1 space-y-6">
          
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Globe className="w-4 h-4" /> Step 1: Branding & Identity
              </div>
              <p className="text-xs text-muted-foreground">Set up your brand presence, website logo, and main tagline.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Website Name</label>
                  <input
                    type="text"
                    value={config.websiteName}
                    onChange={(e) => setConfig({ ...config, websiteName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Brand Logo Text / Initials</label>
                  <input
                    type="text"
                    value={config.logo}
                    onChange={(e) => setConfig({ ...config, logo: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Profile Photo URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={config.profilePhoto}
                    onChange={(e) => setConfig({ ...config, profilePhoto: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Favicon URL</label>
                  <input
                    type="text"
                    placeholder="/favicon.ico"
                    value={config.favicon}
                    onChange={(e) => setConfig({ ...config, favicon: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Palette className="w-4 h-4" /> Step 2: Theme & Color Palette
              </div>
              <p className="text-xs text-muted-foreground">Customize your palette and interface appearance.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Secondary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Default Theme Mode</label>
                  <select
                    value={config.theme}
                    onChange={(e) => setConfig({ ...config, theme: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  >
                    <option value="dark">Dark Mode</option>
                    <option value="light">Light Mode</option>
                    <option value="system">System Preference</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Timezone</label>
                  <input
                    type="text"
                    value={config.timezone}
                    onChange={(e) => setConfig({ ...config, timezone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Language</label>
                  <input
                    type="text"
                    value={config.language}
                    onChange={(e) => setConfig({ ...config, language: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Mail className="w-4 h-4" /> Step 3: Contact & Social Accounts
              </div>
              <p className="text-xs text-muted-foreground">Configure your contact details and social media links.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Address / Location</label>
                <input
                  type="text"
                  value={config.address}
                  onChange={(e) => setConfig({ ...config, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={config.socialLinks.github}
                    onChange={(e) => setConfig({ ...config, socialLinks: { ...config.socialLinks, github: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={config.socialLinks.linkedin}
                    onChange={(e) => setConfig({ ...config, socialLinks: { ...config.socialLinks, linkedin: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Step 4: SEO & Analytics Integration
              </div>
              <p className="text-xs text-muted-foreground">Optimize your meta titles and connect analytics.</p>

              <div>
                <label className="block text-xs font-semibold mb-1">Default Meta Title</label>
                <input
                  type="text"
                  value={config.seoTitle}
                  onChange={(e) => setConfig({ ...config, seoTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Default Meta Description</label>
                <textarea
                  rows={3}
                  value={config.seoDescription}
                  onChange={(e) => setConfig({ ...config, seoDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Google Analytics ID</label>
                  <input
                    type="text"
                    value={config.analyticsId}
                    onChange={(e) => setConfig({ ...config, analyticsId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Resume File Link</label>
                  <input
                    type="text"
                    value={config.resumeUrl}
                    onChange={(e) => setConfig({ ...config, resumeUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Step 5: Admin Account & Review
              </div>
              <p className="text-xs text-muted-foreground">Review administrative settings and initialize your site.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Admin Username</label>
                  <input
                    type="text"
                    value={config.adminAccount.username}
                    onChange={(e) => setConfig({ ...config, adminAccount: { ...config.adminAccount, username: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Admin Email</label>
                  <input
                    type="email"
                    value={config.adminAccount.email}
                    onChange={(e) => setConfig({ ...config, adminAccount: { ...config.adminAccount, email: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 space-y-1 text-xs">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Ready to Save Configuration
                </div>
                <p>Clicking "Finish & Launch Portfolio" will persist all initial setup configurations and unlock full admin features.</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Controls */}
        <div className="p-6 bg-surface-2 border-t border-border flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-border bg-surface text-foreground disabled:opacity-40 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground shadow-md hover:opacity-90 flex items-center gap-2"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSaveAll}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-white shadow-md hover:opacity-90 flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Finish & Launch Portfolio
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
