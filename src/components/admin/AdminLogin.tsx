import React, { useState, useEffect } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, X, Eye, EyeOff, Save } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '../../lib/db';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

const SAVED_CREDS_KEY = 'admin_saved_credentials';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load saved credentials on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVED_CREDS_KEY);
      if (saved) {
        const { savedId, savedPwd } = JSON.parse(saved);
        setEmail(savedId || '');
        setPassword(savedPwd || '');
        setRememberMe(true);
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const currentAuth = db.getAdminAuth();

      const inputId = email.trim().toLowerCase();
      const expectedId = currentAuth.email.trim().toLowerCase();

      if (inputId === expectedId && password === currentAuth.passwordHash) {
        // Save credentials if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem(SAVED_CREDS_KEY, JSON.stringify({ savedId: email.trim(), savedPwd: password }));
          toast.success('Signed in & credentials saved!');
        } else {
          localStorage.removeItem(SAVED_CREDS_KEY);
          toast.success('Admin authenticated successfully!');
        }
        onLoginSuccess();
      } else {
        toast.error('Invalid Login ID or Password!');
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-border shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-surface text-foreground hover:bg-surface-2 transition-colors border border-border"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-primary-foreground mx-auto shadow-xl">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-extrabold text-foreground">
            Admin CMS Portal
          </h3>
          <p className="text-xs text-muted-foreground">
            Sign in to manage portfolio content, edit resume details, and view messages.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {/* Login ID */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Admin Login ID
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5" />
              <input
                type="text"
                required
                placeholder="Enter your admin login ID"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 text-muted-foreground hover:text-foreground transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none group">
            <div
              onClick={() => setRememberMe((prev) => !prev)}
              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                rememberMe
                  ? 'bg-primary border-primary'
                  : 'bg-surface-2 border-border group-hover:border-primary'
              }`}
            >
              {rememberMe && <Save className="w-2.5 h-2.5 text-white" />}
            </div>
            <span className="text-xs text-muted-foreground">
              Save credentials (Remember Me)
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-primary-foreground bg-primary hover:opacity-90 transition-all shadow-lg hover:scale-[1.01] disabled:opacity-60 disabled:scale-100"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3.5 rounded-xl bg-surface-2/60 border border-border text-center text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-emerald-400 inline-block mr-1" />
          Secure Route • {rememberMe ? 'Credentials Saved Locally' : 'No Credentials Stored'}
        </div>
      </div>
    </div>
  );
};
