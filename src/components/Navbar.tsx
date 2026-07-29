import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  Search,
  FileText,
  Lock,
  ArrowUpRight
} from 'lucide-react';

import { db, useDbUpdate } from '../lib/db';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenSearch: () => void;
  onOpenResume: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenSearch,
  onOpenResume,
  onOpenAdmin,
}) => {
  useDbUpdate();
  const setupConfig = db.getSetupConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Journey', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/70 border-b border-border/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform duration-200">
            {setupConfig.logo || 'DK'}
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
              {setupConfig.websiteName || 'Dheeraj Katwe'}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest -mt-0.5">
              {setupConfig.tagline || 'Software Engineer'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons (Search, Resume, Theme Toggle, Admin, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl bg-surface-2/80 hover:bg-surface border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Search Portfolio (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline px-1 py-0.5 rounded bg-surface border border-border text-[9px]">
              Ctrl+K
            </kbd>
          </button>

          {/* Documents Modal Trigger */}
          <button
            onClick={onOpenResume}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary transition-all flex items-center gap-1.5 text-xs font-bold"
            title="View & Download Documents"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Documents</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-surface-2 border border-border text-foreground hover:bg-surface transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-primary" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-surface-2 border border-border text-foreground hover:bg-surface transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-border bg-background/95 backdrop-blur-2xl px-4 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-surface-2"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
