import React, { useState } from 'react';
import {
  Download, FileText, X, Sparkles, Tag, Calendar,
  ArrowLeft, Eye, Folder, ExternalLink
} from 'lucide-react';
import { db, DocumentFile } from '../lib/db';
import { toast } from 'sonner';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Resume:        'bg-primary/10 text-primary border-primary/20',
  Certificate:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Cover Letter':'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Report:        'bg-sky-500/10 text-sky-400 border-sky-500/20',
  Project:       'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Other:         'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [docs, setDocs] = useState<DocumentFile[]>(db.getDocuments().filter(d => d.isPublic));
  const [selected, setSelected] = useState<DocumentFile | null>(null);

  if (!isOpen) return null;

  const handleDownload = (doc: DocumentFile) => {
    db.incrementDocumentDownload(doc.id);
    setDocs(db.getDocuments().filter(d => d.isPublic));
    if (selected) setSelected({ ...selected, downloadCount: selected.downloadCount + 1 });

    toast.success(`Downloading "${doc.title}"...`);

    if (doc.fileUrl && doc.fileUrl.startsWith('http')) {
      // External URL — open in new tab
      window.open(doc.fileUrl, '_blank');
    } else if (doc.fileUrl && doc.fileUrl.startsWith('data:')) {
      // Base64 uploaded file
      const a = document.createElement('a');
      a.href = doc.fileUrl;
      a.download = doc.fileName;
      a.click();
    } else {
      // Placeholder
      toast.info('No file uploaded yet. Ask admin to upload the document file.');
    }
  };

  // ---- Detail View ----
  if (selected) {
    const color = CATEGORY_COLORS[selected.category] || CATEGORY_COLORS['Other'];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="w-full max-w-xl glass-card rounded-3xl border border-border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Documents
            </button>
            <button onClick={onClose} className="p-2 rounded-full bg-surface hover:bg-surface-2 border border-border transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 overflow-y-auto">
            {/* Icon + Title */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-foreground leading-tight">{selected.title}</h2>
                <span className={`inline-flex items-center gap-1 mt-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${color}`}>
                  <Folder className="w-3 h-3" /> {selected.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-2xl bg-surface-2/60 border border-border text-sm text-muted-foreground leading-relaxed">
              {selected.description}
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-2/40 border border-border space-y-1">
                <span className="text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Uploaded</span>
                <span className="font-semibold text-foreground">
                  {new Date(selected.uploadedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-surface-2/40 border border-border space-y-1">
                <span className="text-muted-foreground flex items-center gap-1"><Download className="w-3 h-3" /> Downloads</span>
                <span className="font-semibold text-emerald-400">{selected.downloadCount} times</span>
              </div>
              {selected.fileSize && (
                <div className="p-3 rounded-xl bg-surface-2/40 border border-border space-y-1">
                  <span className="text-muted-foreground">File Size</span>
                  <span className="font-semibold text-foreground">{selected.fileSize}</span>
                </div>
              )}
              <div className="p-3 rounded-xl bg-surface-2/40 border border-border space-y-1">
                <span className="text-muted-foreground">File Name</span>
                <span className="font-semibold text-foreground font-mono truncate block">{selected.fileName}</span>
              </div>
            </div>

            {/* Tags */}
            {selected.tags && selected.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selected.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-[11px] text-muted-foreground">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Download CTA */}
            <button
              onClick={() => handleDownload(selected)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-primary-foreground bg-primary hover:opacity-90 transition-all shadow-lg hover:scale-[1.01]"
            >
              <Download className="w-5 h-5" />
              Download {selected.fileName}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- List View ----
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl glass-card rounded-3xl border border-border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border relative shrink-0">
          <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-surface hover:bg-surface-2 border border-border transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <Sparkles className="w-4 h-4 text-accent" /> Documents
          </div>
          <h3 className="text-2xl font-bold text-foreground">Portfolio Documents</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Click on any document to view details and download.
          </p>
        </div>

        {/* List */}
        <div className="p-6 space-y-3 overflow-y-auto">
          {docs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No documents available yet.
            </div>
          )}
          {docs.map((doc) => {
            const color = CATEGORY_COLORS[doc.category] || CATEGORY_COLORS['Other'];
            return (
              <div
                key={doc.id}
                className="p-4 rounded-2xl bg-surface-2/60 border border-border hover:border-primary/40 transition-all cursor-pointer group"
                onClick={() => setSelected(doc)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-foreground truncate">{doc.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{doc.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${color}`}>
                          {doc.category}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">{doc.downloadCount} downloads</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="p-1.5 rounded-lg bg-surface border border-border text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDownload(doc); }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-primary-foreground bg-primary hover:opacity-90 transition-all shadow"
                    >
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-end shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-semibold text-xs text-foreground bg-surface hover:bg-surface-2 border border-border">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
