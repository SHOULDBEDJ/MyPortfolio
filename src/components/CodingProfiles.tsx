import React from 'react';
import {
  Github,
  Code,
  Terminal,
  Award,
  ExternalLink,
  Flame,
  CheckCircle2,
  Trophy
} from 'lucide-react';

export const CodingProfiles: React.FC = () => {
  const profiles = [
    {
      name: 'GitHub',
      icon: Github,
      username: '@dheerajkatwe',
      stats: '12+ Public Repos • 350+ Commits',
      badge: 'Active Contributor',
      color: 'text-primary',
      url: 'https://github.com',
    },
    {
      name: 'LeetCode',
      icon: Code,
      username: 'dheeraj_katwe',
      stats: '450+ Solved • Top 15% Contest Rating',
      badge: 'Knight / Master',
      color: 'text-amber-400',
      url: 'https://leetcode.com',
    },
    {
      name: 'HackerRank',
      icon: Terminal,
      username: 'dheeraj_katwe',
      stats: '5 Stars in SQL & Problem Solving',
      badge: 'Gold Badge',
      color: 'text-emerald-400',
      url: 'https://hackerrank.com',
    },
    {
      name: 'CodeChef',
      icon: Award,
      username: 'dheeraj_katwe',
      stats: '3-Star Competitive Programmer',
      badge: 'Division 2',
      color: 'text-accent',
      url: 'https://codechef.com',
    },
  ];

  return (
    <section id="coding-profiles" className="py-24 relative bg-surface-2/30 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            Competitive Coding & Open Source
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Coding Profiles & Algorithmic Practice
          </h2>
          <p className="text-base text-muted-foreground">
            Tracking 450+ solved data structure problems, contest ratings, and active open source repositories across major platforms.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className="glass-card rounded-3xl p-6 border border-border space-y-5 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center border border-border group-hover:scale-105 transition-transform">
                      <Icon className={`w-6 h-6 ${p.color}`} />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {p.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      {p.name}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      {p.username}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-foreground/90 bg-surface-2 p-3 rounded-xl border border-border">
                    {p.stats}
                  </p>
                </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors pt-2 border-t border-border/50"
                >
                  View Live Profile
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
