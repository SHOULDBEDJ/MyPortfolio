import React, { useState } from 'react';
import {
  Code,
  Database,
  Layout,
  Server,
  Wrench,
  Brain,
  CheckCircle
} from 'lucide-react';

import { db, SkillItem, useDbUpdate } from '../lib/db';

export const Skills: React.FC = () => {
  useDbUpdate();
  const dbSkills: SkillItem[] = db.getSkills();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Categories list
  const categoryNames = Array.from(new Set(dbSkills.map(s => s.category)));
  const categories = [
    { name: 'All', icon: Code },
    ...categoryNames.map(cat => ({ name: cat, icon: cat.includes('Data') ? Database : cat.includes('Core') ? Brain : cat.includes('Soft') ? CheckCircle : Code }))
  ];

  // Group skills by category
  const skillGroupsMap: Record<string, SkillItem[]> = {};
  dbSkills.forEach(s => {
    if (!skillGroupsMap[s.category]) skillGroupsMap[s.category] = [];
    skillGroupsMap[s.category].push(s);
  });

  const skillGroups = Object.keys(skillGroupsMap).map(category => ({
    category,
    title: category,
    icon: category.includes('Data') ? Database : category.includes('Core') ? Brain : category.includes('Soft') ? CheckCircle : Code,
    color: 'text-primary',
    skills: skillGroupsMap[category].map(s => ({ name: s.name, level: s.percentage }))
  }));

  const filteredGroups =
    activeCategory === 'All'
      ? skillGroups
      : skillGroups.filter((g) => g.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative bg-surface-2/30 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider border border-accent/20">
            Skills & Technical Proficiency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Core Competencies & Technologies
          </h2>
          <p className="text-base text-muted-foreground">
            Programming languages, web frameworks, databases, core CS concepts, and soft skills from Dheeraj Manohar Katwe's resume.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'glass-card text-muted-foreground hover:text-foreground hover:bg-surface-2'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, idx) => {
            const GroupIcon = group.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-3xl p-6 border border-border space-y-6 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center border border-border">
                      <GroupIcon className={`w-5 h-5 ${group.color}`} />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">
                      {group.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {group.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-foreground flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-primary" />
                            {skill.name}
                          </span>
                          <span className="text-muted-foreground font-mono">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden border border-border/50">
                          <div
                            className="h-full bg-gradient-brand rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40 text-xs text-muted-foreground text-right font-medium">
                  {group.skills.length} competencies listed
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
