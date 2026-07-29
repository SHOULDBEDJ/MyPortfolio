import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Scissors,
  Shirt,
  BookOpen,
  X,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails: string;
  tech: string[];
  features: string[];
  icon: any;
  status: string;
  githubUrl?: string;
  demoUrl?: string;
}

import { db, ProjectItem, useDbUpdate } from '../lib/db';

export const Projects: React.FC = () => {
  useDbUpdate();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const projectsData: ProjectItem[] = db.getProjects();
  const projects = projectsData.map((p) => ({
    ...p,
    description: p.shortDescription,
    icon: Layers,
  }));

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
            Featured Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Featured Projects & Real-World Work
          </h2>
          <p className="text-base text-muted-foreground">
            Explore software solutions I've built across full-stack web applications, database management systems, and enterprise tools.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="glass-card rounded-3xl p-6 border border-border space-y-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group hover:shadow-2xl"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-surface-2 text-xs font-medium text-foreground border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1 transition-colors"
                  >
                    View Project Details
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-surface hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-colors border border-border"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-surface hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-colors border border-border"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-border shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-surface text-foreground hover:bg-surface-2 transition-colors border border-border"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-bold text-foreground">
                {selectedProject.title}
              </h3>
            </div>

            {/* Full Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Overview & Impact
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedProject.fullDetails}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Key Features Included
              </h4>
              <div className="space-y-2">
                {selectedProject.features?.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-medium text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Badges */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech?.map((t: string) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-surface-2 text-xs font-semibold text-foreground border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs text-foreground bg-surface hover:bg-surface-2 border border-border"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
