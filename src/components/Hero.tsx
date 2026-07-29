import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Code,
  Terminal,
  ExternalLink,
  ArrowRight,
  Upload,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { db, useDbUpdate } from '../lib/db';

export const Hero: React.FC = () => {
  useDbUpdate();
  const heroData = db.getHero();
  const setupConfig = db.getSetupConfig();
  const aboutData = db.getAbout();

  const userEmail = heroData.email || setupConfig.email || 'dhirajkatwe109@gmail.com';
  const userPhone = heroData.phone || setupConfig.phone || '9113565802';
  const userLocation = heroData.location || setupConfig.address || 'Hubli, Dharwad, Karnataka, 580024, India';
  const userName = heroData.name || setupConfig.websiteName || 'Dheeraj Manohar Katwe';
  const userRole = heroData.role || 'Software Engineer';
  const userBio = heroData.bio || 'Computer Science graduate (CGPA: 8.3) with hands-on experience building and deploying full-stack web applications using Java, Python, React, and Node.js.';
  const userAvailability = heroData.availability || 'Seeking Entry-Level Software Engineer / Developer Role';

  const roles = [
    'Software Engineer',
    'Full Stack Web Developer',
    'L2 ERP Technical Support',
    'Python & React Developer',
  ];

  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = roles[currentRoleIdx];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < targetText.length) {
        setDisplayText(targetText.substring(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === targetText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(targetText.substring(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIdx]);

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: heroData.githubUrl || setupConfig.socialLinks?.github || 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, href: heroData.linkedinUrl || setupConfig.socialLinks?.linkedin || 'https://linkedin.com' },
    { name: 'LeetCode', icon: Code, href: heroData.leetcodeUrl || setupConfig.socialLinks?.leetcode || 'https://leetcode.com' },
    { name: 'HackerRank', icon: Terminal, href: heroData.hackerrankUrl || 'https://hackerrank.com' },
    { name: 'CodeChef', icon: Award, href: heroData.codechefUrl || 'https://codechef.com' },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background aurora glow effect */}
      <div className="absolute inset-0 aurora-bg opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Hero Info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 text-xs font-semibold text-foreground tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              {userAvailability}
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                {userName}
              </h1>
              <div className="h-10 sm:h-12 flex items-center text-xl sm:text-2xl lg:text-3xl font-semibold text-primary">
                <span>{displayText}</span>
                <span className="w-0.5 h-7 bg-primary ml-1 animate-caret-blink inline-block" />
              </div>
            </div>

            {/* Bio */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {userBio}
            </p>

            {/* Contact quick links */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground pt-2">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(userEmail)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors glass-card px-3 py-1.5 rounded-lg"
                title="Click to open in Gmail"
              >
                <Mail className="w-4 h-4 text-primary" />
                {userEmail}
              </a>
              <a
                href={`tel:+91${userPhone.replace(/\D/g, '')}`}
                className="flex items-center gap-1.5 hover:text-accent transition-colors glass-card px-3 py-1.5 rounded-lg"
                title="Click to call directly"
              >
                <Phone className="w-4 h-4 text-accent" />
                {userPhone}
              </a>
              <span className="flex items-center gap-1.5 glass-card px-3 py-1.5 rounded-lg">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {userLocation}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-primary-foreground bg-primary hover:opacity-90 shadow-xl transition-all hover:scale-[1.02]"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#skills"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-foreground glass-card hover:bg-surface-2 transition-all"
              >
                View Skills & Work
              </a>
            </div>

            {/* Social Icons */}
            <div className="pt-4 border-t border-border/50">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-3">
                Connect with me
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      {s.name}
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md glass-card rounded-3xl p-6 relative border border-border/80 shadow-2xl space-y-6">
              
              {/* Card Badge Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {userRole}
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Open to Work
                </span>
              </div>

              {/* Profile Avatar Box */}
              <div className="relative rounded-2xl overflow-hidden bg-surface-2/80 border border-border flex flex-col items-center justify-center p-3 space-y-3">
                <div className="w-full h-64 sm:h-72 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground font-black text-4xl shadow-xl overflow-hidden relative group">
                  {heroData.profilePhotoUrl ? (
                    <img
                      src={heroData.profilePhotoUrl}
                      alt={userName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span>DK</span>
                  )}
                </div>
                <div className="text-center space-y-0.5 pb-1">
                  <h3 className="font-bold text-lg text-foreground">
                    {userName}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    {userRole}
                  </p>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-surface-2/50 border border-border">
                  <span className="text-xs text-muted-foreground font-medium block">Education</span>
                  <span className="text-sm font-bold text-foreground">BE AI & ML (8.3 CGPA)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-2/50 border border-border">
                  <span className="text-xs text-muted-foreground font-medium block">Diploma</span>
                  <span className="text-sm font-bold text-foreground">CS (7.4 GPA)</span>
                </div>
              </div>

              {/* Verified checklist */}
              <div className="space-y-2 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>B.E. AI & ML (VTU) | Diploma in CS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full Stack Dev & Technical Support Associate</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
