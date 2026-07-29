import React from 'react';
import {
  GraduationCap,
  MapPin,
  Briefcase,
  Globe,
  Award,
  Layers,
  Users,
  Code2,
  Check
} from 'lucide-react';

import { db, useDbUpdate } from '../lib/db';

export const About: React.FC = () => {
  useDbUpdate();
  const heroData = db.getHero();
  const aboutData = db.getAbout();

  const stats = [
    { label: 'Projects Built', value: `${aboutData.projectsCount || 3}`, icon: Layers, color: 'text-primary' },
    { label: 'Tech Stack Competencies', value: `${aboutData.techCount || 16}`, icon: Code2, color: 'text-accent' },
    { label: 'Customer Records Managed', value: `${aboutData.clientsCount || 150}+`, icon: Users, color: 'text-emerald-400' },
    { label: 'Problems Solved', value: `${aboutData.problemsSolvedCount || 500}+`, icon: Award, color: 'text-amber-400' },
  ];

  const languages = aboutData.languages || ['English', 'Hindi', 'Kannada', 'Marathi'];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {aboutData.title}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {aboutData.biography}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 text-center space-y-3 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center mx-auto border border-border">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Career Objective */}
          <div className="md:col-span-2 glass-card rounded-3xl p-8 border border-border space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Summary & Career Objective
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {aboutData.careerObjective}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Full-Stack Web App Development (Java, Python, React, Node.js)
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                RESTful API Design & Relational/NoSQL Databases
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                L2 ERP Technical Support & System Customization
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Data Structures, Algorithms & OOPs Principles
              </div>
            </div>
          </div>

          {/* Card 2: Quick Highlights */}
          <div className="glass-card rounded-3xl p-8 border border-border space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Education */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center shrink-0 border border-border">
                  <GraduationCap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Highest Degree</h4>
                  <p className="text-xs text-muted-foreground">{aboutData.educationHighlight}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center shrink-0 border border-border">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Location</h4>
                  <p className="text-xs text-muted-foreground">{heroData.location}</p>
                </div>
              </div>

              {/* Spoken Languages */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center shrink-0 border border-border">
                  <Globe className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Languages</h4>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-0.5 rounded-md bg-surface-2 text-[10px] font-semibold text-foreground border border-border"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Status pill */}
            <div className="p-4 rounded-2xl bg-surface-2/60 border border-border text-center">
              <span className="text-xs font-semibold text-muted-foreground block">Current Status</span>
              <span className="text-sm font-bold text-primary">{aboutData.status}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
