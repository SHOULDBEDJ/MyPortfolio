import React, { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, Plus, Trash2, Copy, Check } from 'lucide-react';
import { db, MediaFile } from '../../lib/db';
import { toast } from 'sonner';

export const MediaManager: React.FC = () => {
  const [media, setMedia] = useState<MediaFile[]>(db.getMediaFiles());

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const item: MediaFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.includes('image') ? 'image' : 'pdf',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        url: reader.result as string,
        uploadedAt: new Date().toISOString().split('T')[0],
      };
      db.addMediaFile(item);
      setMedia(db.getMediaFiles());
      toast.success('File uploaded to Media Library!');
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string) => {
    db.deleteMediaFile(id);
    setMedia(db.getMediaFiles());
    toast.success('Media file deleted.');
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Media URL copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Media & File Library</h2>
          <p className="text-xs text-muted-foreground">Upload and manage images, PDFs, and assets across your portfolio.</p>
        </div>

        <div>
          <input
            type="file"
            onChange={handleUpload}
            className="hidden"
            id="media-upload-input"
          />
          <label
            htmlFor="media-upload-input"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-primary-foreground bg-primary hover:opacity-90 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            Upload File
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {media.map((file) => (
          <div key={file.id} className="p-4 rounded-2xl glass-card border border-border flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-3">
              {file.type === 'image' ? (
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
              )}
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-foreground truncate">{file.name}</h4>
                <span className="text-[10px] text-muted-foreground">{file.size} • {file.uploadedAt}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <button
                onClick={() => handleCopyUrl(file.url)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy URL
              </button>
              <button
                onClick={() => handleDelete(file.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
