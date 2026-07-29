import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  Code2,
  FolderGit2,
  Layers,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  BarChart3,
  Image,
  Database,
  Sliders,
  CheckCircle2,
  Wand2,
  ToggleRight,
  LayoutGrid,
  SearchCheck,
  Network,
  History,
  Activity,
  Sparkles,
  Bot,
  RefreshCw,
  Terminal,
  Palette,
  Undo2,
  Redo2,
  Sidebar as SidebarIcon
} from 'lucide-react';
import { db, SkillItem, ServiceItem, ProjectItem, ContactMessage } from '../../lib/db';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { ContactCRM } from './ContactCRM';
import { MediaManager } from './MediaManager';
import { PageBuilder } from './PageBuilder';
import { BackupRestore } from './BackupRestore';
import { SetupWizardModal } from './SetupWizardModal';
import { FeatureManager } from './FeatureManager';
import { ComponentLibrary } from './ComponentLibrary';
import { WidgetManager } from './WidgetManager';
import { FooterSidebarBuilder } from './FooterSidebarBuilder';
import { SeoBrokenLinkScanner } from './SeoBrokenLinkScanner';
import { RedirectManager } from './RedirectManager';
import { SoftDeleteTrash } from './SoftDeleteTrash';
import { ActivityLogTimeline } from './ActivityLogTimeline';
import { SystemDbHealth } from './SystemDbHealth';
import { ImageProcessingStudio } from './ImageProcessingStudio';
import { BrandingThemeStudio } from './BrandingThemeStudio';
import { AiStudioImporter } from './AiStudioImporter';
import { IntegrationsHub } from './IntegrationsHub';
import { DevOpsDocsSuite } from './DevOpsDocsSuite';
import { toast } from 'sonner';

interface AdminDashboardProps {
  onLogout: () => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [wizardOpen, setWizardOpen] = useState<boolean>(false);

  // Undo / Redo Stack State
  const [history, setHistory] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  // Core Hero State
  const [heroData, setHeroData] = useState(db.getHero());

  const handleTabChange = (newTab: string) => {
    setHistory((prev) => [...prev, activeTab]);
    setRedoStack([]);
    setActiveTab(newTab);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousTab = history[history.length - 1];
    setRedoStack((prev) => [...prev, activeTab]);
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setActiveTab(previousTab);
    toast.info(`Undid navigation to "${previousTab}"`);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextTab = redoStack[redoStack.length - 1];
    setHistory((prev) => [...prev, activeTab]);
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
    setActiveTab(nextTab);
    toast.info(`Redid navigation to "${nextTab}"`);
  };

  const handleSaveHero = () => {
    db.saveHero(heroData);
    db.logActivity('Hero Updated', 'Saved header profile details', 'info');
    toast.success('Hero profile updated successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col lg:flex-row overflow-hidden animate-in fade-in duration-200">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-surface border-r border-border p-6 flex flex-col justify-between shrink-0 space-y-6 overflow-y-auto">
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                DK
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Enterprise SaaS</h3>
                <span className="text-[10px] text-emerald-400 font-semibold block">v2.5 Full Suite</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleUndo}
                disabled={history.length === 0}
                className="p-1.5 rounded-lg bg-surface-2 text-muted-foreground hover:text-foreground disabled:opacity-30"
                title="Undo Tab Action"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleRedo}
                disabled={redoStack.length === 0}
                className="p-1.5 rounded-lg bg-surface-2 text-muted-foreground hover:text-foreground disabled:opacity-30"
                title="Redo Tab Action"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-surface-2 text-muted-foreground hover:text-foreground"
                title="Return to Site"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            onClick={() => setWizardOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-brand text-primary-foreground shadow-md hover:opacity-90 flex items-center justify-center gap-2"
          >
            <Wand2 className="w-4 h-4" /> Setup Onboarding Wizard
          </button>

          <nav className="space-y-1 text-xs">
            {[
              { id: 'overview', label: 'Overview Metrics', icon: LayoutDashboard },
              { id: 'toggles', label: 'Feature Toggles', icon: ToggleRight },
              { id: 'pageBuilder', label: 'Dynamic Page Builder', icon: Sliders },
              { id: 'components', label: 'Component Library', icon: LayoutGrid },
              { id: 'widgets', label: 'Widget System', icon: Layers },
              { id: 'footerSidebar', label: 'Footer & Sidebar', icon: SidebarIcon },
              { id: 'seoScanner', label: 'SEO & Broken Link Scanner', icon: SearchCheck },
              { id: 'redirects', label: 'Redirect Manager', icon: Network },
              { id: 'trash', label: 'Soft Delete Trash', icon: Trash2 },
              { id: 'timeline', label: 'Activity Log Timeline', icon: History },
              { id: 'systemHealth', label: 'System & DB Health', icon: Activity },
              { id: 'mediaStudio', label: 'Media Studio & Icon Picker', icon: Image },
              { id: 'brandingTheme', label: 'Branding & Theme Studio', icon: Palette },
              { id: 'aiStudio', label: 'AI Content Studio & OCR', icon: Bot },
              { id: 'integrations', label: 'Integrations & Audience', icon: RefreshCw },
              { id: 'devops', label: 'Developer Console & DevOps', icon: Terminal },
              { id: 'analytics', label: 'Traffic & Visitor Analytics', icon: BarChart3 },
              { id: 'crm', label: 'Contact CRM Messages', icon: Mail },
              { id: 'hero', label: 'Hero & Profile Data', icon: User },
              { id: 'backup', label: 'Backup & JSON Restore', icon: Database },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === id
                    ? 'bg-primary text-primary-foreground shadow-md font-bold'
                    : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl text-xs font-bold text-foreground bg-surface-2 hover:bg-surface border border-border"
          >
            View Public Site
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8">
        
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">SaaS Executive Dashboard Overview</h2>
              <p className="text-xs text-muted-foreground">Real-time status of 40+ enterprise platform modules.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card rounded-3xl p-6 border border-border space-y-2">
                <span className="text-xs font-semibold text-muted-foreground block">Active Features</span>
                <div className="text-3xl font-extrabold text-foreground">20 / 20</div>
              </div>
              <div className="glass-card rounded-3xl p-6 border border-border space-y-2">
                <span className="text-xs font-semibold text-muted-foreground block">SEO Health Index</span>
                <div className="text-3xl font-extrabold text-emerald-400">96 / 100</div>
              </div>
              <div className="glass-card rounded-3xl p-6 border border-border space-y-2">
                <span className="text-xs font-semibold text-muted-foreground block">Broken Links</span>
                <div className="text-3xl font-extrabold text-primary">0</div>
              </div>
              <div className="glass-card rounded-3xl p-6 border border-border space-y-2">
                <span className="text-xs font-semibold text-muted-foreground block">Database Status</span>
                <div className="text-3xl font-extrabold text-accent">Healthy</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'toggles' && <FeatureManager />}
        {activeTab === 'pageBuilder' && <PageBuilder />}
        {activeTab === 'components' && <ComponentLibrary />}
        {activeTab === 'widgets' && <WidgetManager />}
        {activeTab === 'footerSidebar' && <FooterSidebarBuilder />}
        {activeTab === 'seoScanner' && <SeoBrokenLinkScanner />}
        {activeTab === 'redirects' && <RedirectManager />}
        {activeTab === 'trash' && <SoftDeleteTrash />}
        {activeTab === 'timeline' && <ActivityLogTimeline />}
        {activeTab === 'systemHealth' && <SystemDbHealth />}
        {activeTab === 'mediaStudio' && <ImageProcessingStudio />}
        {activeTab === 'brandingTheme' && <BrandingThemeStudio />}
        {activeTab === 'aiStudio' && <AiStudioImporter />}
        {activeTab === 'integrations' && <IntegrationsHub />}
        {activeTab === 'devops' && <DevOpsDocsSuite />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'crm' && <ContactCRM />}
        {activeTab === 'backup' && <BackupRestore />}

        {/* Hero Edit Tab */}
        {activeTab === 'hero' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">Hero Profile Details</h2>
            <div className="glass-card rounded-3xl p-8 border border-border space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={heroData.name}
                  onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Role Title</label>
                <input
                  type="text"
                  value={heroData.role}
                  onChange={(e) => setHeroData({ ...heroData, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                />
              </div>
              <button
                onClick={handleSaveHero}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow"
              >
                <Save className="w-4 h-4 inline mr-1.5" /> Save Hero Profile
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Setup Wizard Modal */}
      <SetupWizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />

    </div>
  );
};
