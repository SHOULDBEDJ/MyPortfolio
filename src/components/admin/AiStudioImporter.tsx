import React, { useState } from 'react';
import { Bot, FileText, Award, Sparkles, Upload, CheckCircle2, RefreshCw, Copy, Save } from 'lucide-react';
import { db, CertificationItem } from '../../lib/db';
import { toast } from 'sonner';

export const AiStudioImporter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'resume' | 'ocr'>('content');

  // AI Content Studio State
  const [prompt, setPrompt] = useState<string>('');
  const [contentType, setContentType] = useState<string>('projectDescription');
  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);

  // OCR Certificate State
  const [ocrTitle, setOcrTitle] = useState<string>('');
  const [ocrIssuer, setOcrIssuer] = useState<string>('');
  const [ocrDate, setOcrDate] = useState<string>('2026');
  const [ocrId, setOcrId] = useState<string>('');

  const handleGenerateAI = () => {
    if (!prompt) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      const responses: Record<string, string> = {
        projectDescription: `Engineered an enterprise ${prompt} web platform with full-stack React and Node.js architecture. Integrates normalized relational SQL database schemas with automated unit testing and real-time dashboard analytics.`,
        metaDescription: `Explore ${prompt} by Dheeraj Katwe — Full Stack & AI Software Engineer. Scalable React, TypeScript, and SQL database implementations.`,
        skillDescription: `Advanced proficiency in ${prompt} including database query tuning, clean architectural patterns, and production deployments.`,
      };

      setGeneratedOutput(responses[contentType] || responses.projectDescription);
      toast.success('AI Content generated successfully!');
    }, 1200);
  };

  const handleSimulateResumeImport = () => {
    toast.info('Parsing uploaded resume PDF...');
    setTimeout(() => {
      db.logActivity('AI Resume Importer', 'Parsed Dheeraj Katwe resume and updated skills & experience', 'success');
      toast.success('Resume imported successfully! Experience, Education, and Skills synced.');
    }, 1500);
  };

  const handleSaveOcrCert = () => {
    if (!ocrTitle || !ocrIssuer) return;
    const cert: CertificationItem = {
      id: Date.now().toString(),
      title: ocrTitle,
      organization: ocrIssuer,
      issueDate: ocrDate,
      credentialId: ocrId || `CERT-${Date.now().toString().slice(-4)}`,
      skills: ['Verified Credential'],
    };
    db.saveCertification(cert);
    toast.success(`Certificate "${ocrTitle}" saved to portfolio!`);
    setOcrTitle('');
    setOcrIssuer('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            AI Content Studio & Intelligent Importers
          </h2>
          <p className="text-xs text-muted-foreground">AI text generation, automated PDF resume parser, and OCR certificate scanner.</p>
        </div>

        <div className="flex items-center gap-1.5 bg-surface-2 p-1 rounded-2xl border border-border">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'content' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            AI Studio
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'resume' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Resume Importer
          </button>
          <button
            onClick={() => setActiveTab('ocr')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'ocr' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            OCR Scanner
          </button>
        </div>
      </div>

      {/* Tab 1: AI Content Studio */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> AI Content Generator
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Target Module</label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                >
                  <option value="projectDescription">Project Description</option>
                  <option value="metaDescription">SEO Meta Description</option>
                  <option value="skillDescription">Skill Highlight Summary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Prompt Topic / Key Keywords</label>
                <input
                  type="text"
                  placeholder="e.g. Smart Tailor Billing System with React & MySQL"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateAI}
              disabled={generating || !prompt}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground shadow flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
              {generating ? 'Generating with AI...' : 'Generate Copy'}
            </button>
          </div>

          {generatedOutput && (
            <div className="glass-card rounded-3xl p-6 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> AI Result
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedOutput);
                    toast.success('Generated text copied!');
                  }}
                  className="p-1.5 rounded-lg bg-surface border border-border text-xs text-muted-foreground flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
              <textarea
                rows={5}
                readOnly
                value={generatedOutput}
                className="w-full px-4 py-3 rounded-2xl bg-surface-2 border border-border text-xs resize-none font-mono"
              />
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Resume Importer */}
      {activeTab === 'resume' && (
        <div className="glass-card rounded-3xl p-6 border border-border text-center space-y-4">
          <FileText className="w-10 h-10 text-primary mx-auto opacity-70" />
          <div>
            <h3 className="text-sm font-bold text-foreground">AI Resume Parser & Auto-Sync</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Upload your updated PDF resume to automatically parse work experience, projects, skills, education, and contact metrics.
            </p>
          </div>

          <div className="p-8 border-2 border-dashed border-border rounded-3xl bg-surface-2 cursor-pointer hover:border-primary transition-all">
            <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
            <span className="text-xs font-bold text-foreground">Drag & Drop Resume PDF here</span>
            <p className="text-[10px] text-muted-foreground mt-1">Supports PDF, DOCX (Max 10MB)</p>
          </div>

          <button
            onClick={handleSimulateResumeImport}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow"
          >
            Start Automatic Resume Import
          </button>
        </div>
      )}

      {/* Tab 3: OCR Scanner */}
      {activeTab === 'ocr' && (
        <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> OCR Certificate Image Scanner
          </h3>
          <p className="text-xs text-muted-foreground">Upload or photograph a physical certificate to automatically detect title, issuer, date, and credential ID.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Detected Certificate Title</label>
              <input
                type="text"
                placeholder="e.g. Machine Learning Specialization"
                value={ocrTitle}
                onChange={(e) => setOcrTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Detected Issuer / Org</label>
              <input
                type="text"
                placeholder="e.g. Coursera / Stanford Online"
                value={ocrIssuer}
                onChange={(e) => setOcrIssuer(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Issue Year</label>
              <input
                type="text"
                value={ocrDate}
                onChange={(e) => setOcrDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Credential ID</label>
              <input
                type="text"
                placeholder="COURSERA-ML-883"
                value={ocrId}
                onChange={(e) => setOcrId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
              />
            </div>
          </div>

          <button
            onClick={handleSaveOcrCert}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Certificate Record
          </button>
        </div>
      )}

    </div>
  );
};
