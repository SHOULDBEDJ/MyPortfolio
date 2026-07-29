import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const PWAInstaller: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShow(false);
      });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl glass-card border border-primary/30 shadow-2xl flex items-center gap-3 animate-in fade-in duration-200">
      <Download className="w-5 h-5 text-primary shrink-0" />
      <div>
        <h4 className="text-xs font-bold text-foreground">Install Portfolio App</h4>
        <p className="text-[10px] text-muted-foreground">Add to home screen for offline access.</p>
      </div>
      <button
        onClick={handleInstall}
        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-primary-foreground hover:opacity-90"
      >
        Install
      </button>
      <button onClick={() => setShow(false)} className="text-muted-foreground hover:text-foreground">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
