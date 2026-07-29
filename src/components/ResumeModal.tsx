import React, { useState } from 'react';
import { Download, FileText, X, Check, Sparkles } from 'lucide-react';
import { db, ResumeFile } from '../lib/db';
import { toast } from 'sonner';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [resumes, setResumes] = useState<ResumeFile[]>(db.getResumes());

  if (!isOpen) return null;

  const handleDownload = (resume: ResumeFile) => {
    db.incrementResumeDownload(resume.id);
    setResumes(db.getResumes());
    toast.success(`Downloading ${resume.title}...`);

    // Simulated PDF download trigger
    const element = document.createElement('a');
    const file = new Blob([`Resume Content for ${resume.title}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = resume.fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 border border-border shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-surface text-foreground hover:bg-surface-2 transition-colors border border-border"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="w-4 h-4 text-accent" />
            Resume Downloads
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Download Dheeraj Katwe's Resume
          </h3>
          <p className="text-xs text-muted-foreground">
            Select the specialized resume format tailored for your hiring requirement.
          </p>
        </div>

        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="p-5 rounded-2xl bg-surface-2/60 border border-border flex items-center justify-between gap-4 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {resume.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {resume.description}
                  </p>
                  <span className="text-[11px] font-mono text-emerald-400 block mt-1">
                    Downloaded {resume.downloadCount} times
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDownload(resume)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-primary-foreground bg-primary hover:opacity-90 transition-all shadow-md shrink-0"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-foreground bg-surface hover:bg-surface-2 border border-border"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
