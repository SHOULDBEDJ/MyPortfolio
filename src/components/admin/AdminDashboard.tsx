import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  Code2,
  FolderGit2,
  Briefcase,
  Award,
  Mail,
  Sliders,
  LogOut,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Edit2,
  CheckCircle2,
  Download,
  Upload,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import {
  db,
  HeroData,
  SetupConfig,
  ProjectItem,
  SkillItem,
  ExperienceItem,
  CertificationItem,
  ContactMessage
} from '../../lib/db';
import { toast } from 'sonner';

interface AdminDashboardProps {
  onLogout: () => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('profile');

  // Local Component States for Data Editing
  const [hero, setHero] = useState<HeroData>(db.getHero());
  const [config, setConfig] = useState<SetupConfig>(db.getSetupConfig());
  const [adminAuth, setAdminAuth] = useState<{ email: string; passwordHash: string }>(db.getAdminAuth());
  const [projects, setProjects] = useState<ProjectItem[]>(db.getProjects());
  const [skills, setSkills] = useState<SkillItem[]>(db.getSkills());
  const [experiences, setExperiences] = useState<ExperienceItem[]>(db.getExperience());
  const [certifications, setCertifications] = useState<CertificationItem[]>(db.getCertifications());
  const [messages, setMessages] = useState<ContactMessage[]>(db.getMessages());

  // Editing state trackers
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<SkillItem> | null>(null);
  const [editingExp, setEditingExp] = useState<Partial<ExperienceItem>>({});
  const [editingCert, setEditingCert] = useState<Partial<CertificationItem>>({});

  // Reload helper
  const reloadData = () => {
    setHero(db.getHero());
    setConfig(db.getSetupConfig());
    setProjects(db.getProjects());
    setSkills(db.getSkills());
    setExperiences(db.getExperience());
    setCertifications(db.getCertifications());
    setMessages(db.getMessages());
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size too large. Please select an image under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      setHero((prev) => ({ ...prev, profilePhotoUrl: dataUrl }));
      toast.success('Photo uploaded! Click "Save Profile Details" below.');
    };
    reader.readAsDataURL(file);
  };

  // --- SAVE HANDLERS ---
  const handleSaveHero = () => {
    db.saveHero(hero);
    db.saveSetupConfig({
      ...config,
      email: hero.email,
      phone: hero.phone,
      address: hero.location,
      websiteName: hero.name
    });
    toast.success('Profile & photo updated successfully!');
    reloadData();
  };

  const handleSaveConfig = () => {
    db.saveSetupConfig(config);
    toast.success('Site settings saved successfully!');
    reloadData();
  };

  const handleSaveAdminAuth = () => {
    if (!adminAuth.email.trim() || !adminAuth.passwordHash.trim()) {
      toast.error('Admin email and password cannot be empty!');
      return;
    }
    db.saveAdminAuth(adminAuth);
    toast.success('Admin credentials updated! Use your new Email & Password on next sign in.');
    setAdminAuth(db.getAdminAuth());
  };

  const handleSaveProject = () => {
    if (!editingProject?.title) {
      toast.error('Project title is required!');
      return;
    }
    const item: ProjectItem = {
      id: editingProject.id || Date.now().toString(),
      title: editingProject.title || '',
      category: editingProject.category || 'Full Stack Web App',
      shortDescription: editingProject.shortDescription || '',
      fullDetails: editingProject.fullDetails || '',
      status: editingProject.status || 'Completed',
      tech: editingProject.tech || ['React', 'Node.js'],
      features: editingProject.features || [],
      githubUrl: editingProject.githubUrl || '',
      demoUrl: editingProject.demoUrl || '',
      featured: editingProject.featured ?? true,
    };
    db.saveProject(item);
    toast.success(editingProject.id ? 'Project updated!' : 'Project added!');
    setEditingProject(null);
    reloadData();
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      db.deleteProject(id);
      toast.success('Project deleted.');
      reloadData();
    }
  };

  const handleSaveSkill = () => {
    if (!editingSkill?.name) {
      toast.error('Skill name is required!');
      return;
    }
    const item: SkillItem = {
      id: editingSkill.id || Date.now().toString(),
      name: editingSkill.name || '',
      category: editingSkill.category || 'Languages',
      percentage: editingSkill.percentage || 85,
      featured: editingSkill.featured ?? true,
    };
    db.saveSkill(item);
    toast.success(editingSkill.id ? 'Skill updated!' : 'Skill added!');
    setEditingSkill(null);
    reloadData();
  };

  const handleDeleteSkill = (id: string) => {
    if (window.confirm('Delete this skill?')) {
      db.deleteSkill(id);
      toast.success('Skill deleted.');
      reloadData();
    }
  };

  const handleSaveExperience = () => {
    if (!editingExp?.role || !editingExp?.company) {
      toast.error('Role/Degree and Company/Institute are required!');
      return;
    }
    const item: ExperienceItem = {
      id: editingExp.id || Date.now().toString(),
      type: editingExp.type || 'work',
      role: editingExp.role || '',
      company: editingExp.company || '',
      period: editingExp.period || '',
      location: editingExp.location || '',
      description: editingExp.description || '',
      score: editingExp.score || '',
      skills: editingExp.skills || [],
    };
    db.saveExperience(item);
    toast.success(editingExp.id ? 'Experience updated!' : 'Experience added!');
    setEditingExp({});
    reloadData();
  };

  const handleDeleteExperience = (id: string) => {
    if (window.confirm('Delete this experience entry?')) {
      db.deleteExperience(id);
      toast.success('Entry deleted.');
      reloadData();
    }
  };

  const handleSaveCertification = () => {
    if (!editingCert?.title || !editingCert?.organization) {
      toast.error('Title and Organization are required!');
      return;
    }
    const item: CertificationItem = {
      id: editingCert.id || Date.now().toString(),
      title: editingCert.title || '',
      organization: editingCert.organization || '',
      issueDate: editingCert.issueDate || '',
      credentialId: editingCert.credentialId || '',
      skills: editingCert.skills || [],
    };
    db.saveCertification(item);
    toast.success(editingCert.id ? 'Certification updated!' : 'Certification added!');
    setEditingCert({});
    reloadData();
  };

  const handleDeleteCertification = (id: string) => {
    if (window.confirm('Delete certification?')) {
      db.deleteCertification(id);
      toast.success('Certification removed.');
      reloadData();
    }
  };

  const handleDeleteMessage = (id: string) => {
    db.deleteMessage(id);
    toast.success('Message removed.');
    reloadData();
  };

  const handleExportJSON = () => {
    const jsonStr = db.exportFullBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    toast.success('Backup exported successfully!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonString = event.target?.result as string;
      const success = db.restoreBackup(jsonString);
      if (success) {
        toast.success('Data imported successfully!');
        reloadData();
      } else {
        toast.error('Invalid JSON backup file!');
      }
    };
    reader.readAsText(file);
  };

  const navItems = [
    { id: 'profile', label: 'Basic Info & Hero', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills & Tech', icon: Code2 },
    { id: 'experience', label: 'Experience & Education', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'messages', label: 'Contact Messages', icon: Mail, count: messages.length },
    { id: 'settings', label: 'Site Settings & Backup', icon: Sliders },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col lg:flex-row overflow-hidden animate-in fade-in duration-200">
      
      {/* Clean Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-surface border-r border-border p-5 flex flex-col justify-between shrink-0 space-y-6 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shadow">
                DK
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Admin Control Panel</h3>
                <span className="text-[10px] text-muted-foreground block">Simple & Fast CMS</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-surface-2 text-muted-foreground hover:text-foreground"
              title="Close to site"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === id
                    ? 'bg-primary text-primary-foreground font-bold shadow'
                    : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </div>
                {count !== undefined && count > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-accent text-accent-foreground">
                    {count}
                  </span>
                )}
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
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto space-y-6">

        {/* --- TAB 1: BASIC INFO & HERO --- */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Basic Info & Hero Profile</h2>
              <p className="text-xs text-muted-foreground">Manage your personal details displayed across the portfolio.</p>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-border space-y-6">
              
              {/* Profile Photo Uploader & Preview */}
              <div className="p-4 rounded-2xl bg-surface-2/60 border border-border space-y-3">
                <label className="block text-xs font-bold text-foreground">
                  Profile Photo & Avatar
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Photo Preview Box */}
                  <div className="w-24 h-24 rounded-2xl bg-gradient-brand flex items-center justify-center text-primary-foreground font-black text-2xl shadow-md overflow-hidden shrink-0 border border-border relative">
                    {hero.profilePhotoUrl ? (
                      <img
                        src={hero.profilePhotoUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <span>DK</span>
                    )}
                  </div>

                  {/* Upload Actions & URL input */}
                  <div className="flex-1 space-y-2.5 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 shadow">
                        <Upload className="w-3.5 h-3.5" /> Upload Image File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>

                      {hero.profilePhotoUrl && (
                        <button
                          onClick={() => setHero({ ...hero, profilePhotoUrl: '' })}
                          className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-muted-foreground font-medium mb-1">
                        Or paste image URL:
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com/my-photo.jpg"
                        value={hero.profilePhotoUrl || ''}
                        onChange={(e) => setHero({ ...hero, profilePhotoUrl: e.target.value })}
                        className="w-full px-3.5 py-1.5 rounded-xl bg-surface-2 border border-border text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* General Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={hero.name}
                    onChange={(e) => setHero({ ...hero, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Headline / Role</label>
                  <input
                    type="text"
                    value={hero.role}
                    onChange={(e) => setHero({ ...hero, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={hero.email}
                    onChange={(e) => setHero({ ...hero, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={hero.phone}
                    onChange={(e) => setHero({ ...hero, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Location / Address</label>
                  <input
                    type="text"
                    value={hero.location}
                    onChange={(e) => setHero({ ...hero, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Availability Status</label>
                  <input
                    type="text"
                    value={hero.availability}
                    onChange={(e) => setHero({ ...hero, availability: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Bio Summary</label>
                  <textarea
                    rows={3}
                    value={hero.bio}
                    onChange={(e) => setHero({ ...hero, bio: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>

                {/* Social Media Links */}
                <div>
                  <label className="block text-xs font-semibold mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={hero.githubUrl || ''}
                    onChange={(e) => setHero({ ...hero, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={hero.linkedinUrl || ''}
                    onChange={(e) => setHero({ ...hero, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">LeetCode URL</label>
                  <input
                    type="text"
                    value={hero.leetcodeUrl || ''}
                    onChange={(e) => setHero({ ...hero, leetcodeUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">HackerRank URL</label>
                  <input
                    type="text"
                    value={hero.hackerrankUrl || ''}
                    onChange={(e) => setHero({ ...hero, hackerrankUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleSaveHero}
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow hover:opacity-90 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Profile Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: PROJECTS --- */}
        {activeTab === 'projects' && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Projects Management</h2>
                <p className="text-xs text-muted-foreground">Add, edit, or remove portfolio projects.</p>
              </div>
              <button
                onClick={() => setEditingProject({ tech: ['React', 'Node.js'], status: 'Completed' })}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            {/* Project Edit Modal / Form */}
            {editingProject && (
              <div className="glass-card rounded-3xl p-6 border border-primary/40 space-y-4 bg-surface/90">
                <h3 className="font-bold text-sm text-foreground">
                  {editingProject.id ? 'Edit Project' : 'Add New Project'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Project Title</label>
                    <input
                      type="text"
                      value={editingProject.title || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <input
                      type="text"
                      value={editingProject.category || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">Short Description</label>
                    <input
                      type="text"
                      value={editingProject.shortDescription || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">Full Details</label>
                    <textarea
                      rows={3}
                      value={editingProject.fullDetails || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, fullDetails: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={(editingProject.tech || []).join(', ')}
                      onChange={(e) => setEditingProject({ ...editingProject, tech: e.target.value.split(',').map(t => t.trim()) })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">GitHub Repo URL</label>
                    <input
                      type="text"
                      value={editingProject.githubUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 rounded-xl bg-surface-2 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProject}
                    className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
                  >
                    Save Project
                  </button>
                </div>
              </div>
            )}

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="glass-card rounded-2xl p-5 border border-border space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                        {p.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingProject(p)}
                          className="p-1.5 rounded-lg bg-surface-2 text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm text-foreground">{p.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{p.shortDescription}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-surface-2 border border-border text-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: SKILLS & TECH --- */}
        {activeTab === 'skills' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Skills & Technical Competencies</h2>
                <p className="text-xs text-muted-foreground">Manage programming languages, frameworks, databases, and soft skills.</p>
              </div>
              <button
                onClick={() => setEditingSkill({ category: 'Languages', percentage: 85 })}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            {/* Editing Form */}
            {editingSkill && (
              <div className="glass-card rounded-3xl p-6 border border-primary/40 space-y-4">
                <h3 className="font-bold text-sm">{editingSkill.id ? 'Edit Skill' : 'Add New Skill'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Skill Name</label>
                    <input
                      type="text"
                      value={editingSkill.name || ''}
                      onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <select
                      value={editingSkill.category || 'Languages'}
                      onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    >
                      <option value="Languages">Languages</option>
                      <option value="Framework & Libraries">Framework & Libraries</option>
                      <option value="Databases">Databases</option>
                      <option value="Core CS Concepts">Core CS Concepts</option>
                      <option value="Soft Skills">Soft Skills</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Proficiency % ({editingSkill.percentage || 85}%)</label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={editingSkill.percentage || 85}
                      onChange={(e) => setEditingSkill({ ...editingSkill, percentage: parseInt(e.target.value) })}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditingSkill(null)} className="px-4 py-2 rounded-xl bg-surface-2 text-xs">Cancel</button>
                  <button onClick={handleSaveSkill} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold">Save Skill</button>
                </div>
              </div>
            )}

            {/* Skills Table */}
            <div className="glass-card rounded-3xl p-6 border border-border space-y-3">
              <div className="grid grid-cols-12 text-xs font-bold text-muted-foreground pb-2 border-b border-border">
                <span className="col-span-5">Skill Name</span>
                <span className="col-span-4">Category</span>
                <span className="col-span-2">Level %</span>
                <span className="col-span-1 text-right">Actions</span>
              </div>
              {skills.map((s) => (
                <div key={s.id} className="grid grid-cols-12 items-center text-xs py-2 border-b border-border/40 hover:bg-surface-2/40 px-2 rounded-lg">
                  <span className="col-span-5 font-bold text-foreground">{s.name}</span>
                  <span className="col-span-4 text-muted-foreground">{s.category}</span>
                  <span className="col-span-2 font-mono font-bold text-primary">{s.percentage}%</span>
                  <div className="col-span-1 flex justify-end gap-1">
                    <button onClick={() => setEditingSkill(s)} className="p-1 rounded text-muted-foreground hover:text-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeleteSkill(s.id)} className="p-1 rounded text-rose-400 hover:bg-rose-500/10"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: EXPERIENCE & EDUCATION --- */}
        {activeTab === 'experience' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Work Experience & Education</h2>
                <p className="text-xs text-muted-foreground">Manage your work history, degrees, and academic records.</p>
              </div>
              <button
                onClick={() => setEditingExp({ type: 'work' })}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Experience / Education
              </button>
            </div>

            {/* Editing Form */}
            {editingExp.role !== undefined && (
              <div className="glass-card rounded-3xl p-6 border border-primary/40 space-y-4">
                <h3 className="font-bold text-sm">{editingExp.id ? 'Edit Entry' : 'Add New Entry'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Type</label>
                    <select
                      value={editingExp.type || 'work'}
                      onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    >
                      <option value="work">Work Experience</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Role / Degree Title</label>
                    <input
                      type="text"
                      value={editingExp.role || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Company / Institute</label>
                    <input
                      type="text"
                      value={editingExp.company || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Period (e.g. May '25 — Jun '26)</label>
                    <input
                      type="text"
                      value={editingExp.period || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      value={editingExp.location || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Score / GPA (optional)</label>
                    <input
                      type="text"
                      value={editingExp.score || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, score: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editingExp.description || ''}
                      onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditingExp({})} className="px-4 py-2 rounded-xl bg-surface-2 text-xs">Cancel</button>
                  <button onClick={handleSaveExperience} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold">Save Entry</button>
                </div>
              </div>
            )}

            {/* List */}
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="glass-card rounded-2xl p-5 border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${exp.type === 'work' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-accent/10 text-accent border-accent/20'}`}>
                        {exp.type}
                      </span>
                      <h3 className="font-bold text-sm text-foreground">{exp.role}</h3>
                      <span className="text-xs text-muted-foreground">@ {exp.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingExp(exp)} className="p-1.5 rounded-lg bg-surface-2 text-muted-foreground hover:text-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDeleteExperience(exp.id)} className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{exp.description}</p>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-semibold pt-1">
                    <span>Period: {exp.period}</span>
                    <span>Location: {exp.location}</span>
                    {exp.score && <span className="text-primary font-bold">{exp.score}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 5: CERTIFICATIONS --- */}
        {activeTab === 'certifications' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Certifications & Achievements</h2>
                <p className="text-xs text-muted-foreground">Manage your credentials, diplomas, and official certifications.</p>
              </div>
              <button
                onClick={() => setEditingCert({})}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Certification
              </button>
            </div>

            {/* Form */}
            {editingCert.title !== undefined && (
              <div className="glass-card rounded-3xl p-6 border border-primary/40 space-y-4">
                <h3 className="font-bold text-sm">{editingCert.id ? 'Edit Certification' : 'Add Certification'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Certification Title</label>
                    <input
                      type="text"
                      value={editingCert.title || ''}
                      onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Issuing Organization</label>
                    <input
                      type="text"
                      value={editingCert.organization || ''}
                      onChange={(e) => setEditingCert({ ...editingCert, organization: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Issue Date</label>
                    <input
                      type="text"
                      value={editingCert.issueDate || ''}
                      onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Credential ID (optional)</label>
                    <input
                      type="text"
                      value={editingCert.credentialId || ''}
                      onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditingCert({})} className="px-4 py-2 rounded-xl bg-surface-2 text-xs">Cancel</button>
                  <button onClick={handleSaveCertification} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold">Save Certification</button>
                </div>
              </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((c) => (
                <div key={c.id} className="glass-card rounded-2xl p-5 border border-border space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-foreground">{c.title}</h3>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setEditingCert(c)} className="p-1.5 rounded-lg bg-surface-2 text-muted-foreground hover:text-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDeleteCertification(c.id)} className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{c.organization}</p>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono pt-2 border-t border-border/40 flex justify-between">
                    <span>Issued: {c.issueDate}</span>
                    <span>ID: {c.credentialId || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 6: CONTACT MESSAGES --- */}
        {activeTab === 'messages' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Contact Form Messages</h2>
              <p className="text-xs text-muted-foreground">Inquiries submitted by website visitors.</p>
            </div>

            {messages.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 text-center text-muted-foreground space-y-2">
                <Mail className="w-10 h-10 mx-auto text-primary/40" />
                <p className="text-sm font-semibold">No messages received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="glass-card rounded-2xl p-5 border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-foreground">{m.name}</h4>
                        <span className="text-xs text-primary font-mono">{m.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-muted-foreground">{m.date}</span>
                        <button onClick={() => handleDeleteMessage(m.id)} className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed bg-surface-2/60 p-3 rounded-xl border border-border/40">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 7: SETTINGS & BACKUP --- */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Site Settings & Backup</h2>
              <p className="text-xs text-muted-foreground">Global settings, SEO metadata, and local data export/import.</p>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
              <h3 className="font-bold text-sm">General Website Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Website Title</label>
                  <input
                    type="text"
                    value={config.websiteName}
                    onChange={(e) => setConfig({ ...config, websiteName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Tagline</label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-1">SEO Description</label>
                  <textarea
                    rows={2}
                    value={config.seoDescription}
                    onChange={(e) => setConfig({ ...config, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveConfig}
                className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
              >
                Save Settings
              </button>
            </div>

            {/* Admin Login Credentials & Security */}
            <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-foreground">Change Admin Login ID & Password</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Customize your login Email ID and Password for signing into this Admin CMS Portal.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Admin Email / Login ID</label>
                  <input
                    type="text"
                    value={adminAuth.email}
                    onChange={(e) => setAdminAuth({ ...adminAuth, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border font-mono"
                    placeholder="e.g. djkatwe"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Admin Password</label>
                  <input
                    type="text"
                    value={adminAuth.passwordHash}
                    onChange={(e) => setAdminAuth({ ...adminAuth, passwordHash: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border font-mono"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleSaveAdminAuth}
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow hover:opacity-90 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Update Admin Credentials
                </button>
              </div>
            </div>

            {/* Backup & Restore */}
            <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
              <h3 className="font-bold text-sm">Backup & Restore Portfolio Data</h3>
              <p className="text-xs text-muted-foreground">Export your entire portfolio content as a single JSON file or restore from a previous JSON backup.</p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleExportJSON}
                  className="px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-xs font-bold flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-primary" /> Export Backup JSON
                </button>
                <label className="px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-xs font-bold flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4 text-accent" /> Import Backup JSON
                  <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
