import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Building2,
  Award,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

import { db, ExperienceItem, useDbUpdate } from '../lib/db';

export const Experience: React.FC = () => {
  useDbUpdate();
  const [tab, setTab] = useState<'all' | 'work' | 'education'>('all');

  const allDbExp: ExperienceItem[] = db.getExperience();
  const experiences = allDbExp.filter((e) => e.type === 'work').map((e) => ({
    type: 'work',
    role: e.role,
    organization: e.company,
    period: e.period,
    location: e.location,
    description: e.description,
    achievements: e.achievements || [],
    skills: e.skills || [],
  }));

  const education = allDbExp.filter((e) => e.type === 'education').map((e) => ({
    type: 'education',
    role: e.role,
    major: e.company,
    organization: e.location,
    period: e.period,
    location: e.location,
    score: e.score || '',
    details: e.description,
    skills: e.skills || [],
  }));

  return (
    <section id="experience" className="py-24 relative bg-surface-2/30 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            Journey & Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Work Experience & Educational Qualifications
          </h2>
          <p className="text-base text-muted-foreground">
            My professional career path, enterprise support experience, and academic background.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12 max-w-full px-4">
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 p-1.5 rounded-3xl md:rounded-full glass-card border border-border w-full max-w-lg">
            <button
              onClick={() => setTab('all')}
              className={`flex-1 min-w-[90px] text-center px-4 py-2 rounded-2xl md:rounded-full text-xs font-bold transition-all ${
                tab === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setTab('work')}
              className={`flex-1 min-w-[110px] text-center px-4 py-2 rounded-2xl md:rounded-full text-xs font-bold transition-all ${
                tab === 'work'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setTab('education')}
              className={`flex-1 min-w-[80px] text-center px-4 py-2 rounded-2xl md:rounded-full text-xs font-bold transition-all ${
                tab === 'education'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Education
            </button>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Work Experience */}
          {(tab === 'all' || tab === 'work') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Professional Experience
                </h3>
              </div>

              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-6 border border-border space-y-4 hover:border-primary/40 transition-all duration-300 relative"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">
                        {exp.role}
                      </h4>
                      <p className="text-sm font-semibold text-primary">
                        {exp.organization}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface-2 text-muted-foreground border border-border flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{exp.location}</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Key Responsibilities & Contributions
                    </span>
                    {exp.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 rounded-md bg-surface-2 text-[11px] font-medium text-foreground border border-border"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Column 2: Education */}
          {(tab === 'all' || tab === 'education') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                  <GraduationCap className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Education & Qualifications
                </h3>
              </div>

              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-6 border border-border space-y-4 hover:border-accent/40 transition-all duration-300 relative"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">
                        {edu.role}
                      </h4>
                      <p className="text-sm font-semibold text-accent">
                        {edu.major}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {edu.organization}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface-2 text-muted-foreground border border-border flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {edu.period}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                        {edu.score}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {edu.details}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                    {edu.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 rounded-md bg-surface-2 text-[11px] font-medium text-foreground border border-border"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
