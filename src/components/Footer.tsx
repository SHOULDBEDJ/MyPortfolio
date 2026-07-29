import React from 'react';
import {
  Github,
  Linkedin,
  Code,
  Terminal,
  Award,
  ArrowUp
} from 'lucide-react';

import { db, useDbUpdate } from '../lib/db';

export const Footer: React.FC = () => {
  useDbUpdate();
  const footerConfig = db.getFooterConfig();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Journey', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const heroData = db.getHero();
  const setupConfig = db.getSetupConfig();

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: heroData.githubUrl || setupConfig.socialLinks?.github || 'https://github.com/SHOULDBEDJ' },
    { name: 'LinkedIn', icon: Linkedin, href: heroData.linkedinUrl || setupConfig.socialLinks?.linkedin || 'https://linkedin.com' },
    { name: 'LeetCode', icon: Code, href: heroData.leetcodeUrl || setupConfig.socialLinks?.leetcode || 'https://leetcode.com' },
    { name: 'HackerRank', icon: Terminal, href: heroData.hackerrankUrl || 'https://hackerrank.com' },
    { name: 'CodeChef', icon: Award, href: heroData.codechefUrl || 'https://codechef.com' },
  ];

  return (
    <footer className="py-12 bg-surface border-t border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                DK
              </div>
              <span className="font-bold text-lg text-foreground">
                {footerConfig.logoText || 'Dheeraj Katwe'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              {footerConfig.description || 'Full stack engineer focused on clean architecture, fast interfaces and dependable backends.'}
            </p>
          </div>

          {/* Middle: Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
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

          {/* Right: Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-surface-2 border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            {footerConfig.copyrightText || `© ${new Date().getFullYear()} Dheeraj Manohar Katwe. All rights reserved.`}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-surface-2 hover:bg-surface text-muted-foreground hover:text-foreground transition-colors border border-border"
                  title={s.name}
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
};
