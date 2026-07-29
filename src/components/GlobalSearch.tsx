import React, { useState, useEffect } from 'react';
import { Search, X, Code2, Layers, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { db } from '../lib/db';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const projects = db.getProjects();
  const skills = db.getSkills();
  const services = db.getServices();
  // Natural Language Search term processing
  const cleanQuery = query.toLowerCase().replace(/show|work|projects|skills|experience|my|the|with|in/g, '').trim();
  const activeQuery = cleanQuery || query.toLowerCase();

  const filteredProjects = query
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(activeQuery) ||
          p.shortDescription.toLowerCase().includes(activeQuery) ||
          p.tech.some((t) => t.toLowerCase().includes(activeQuery))
      )
    : [];

  const filteredSkills = query
    ? skills.filter((s) => s.name.toLowerCase().includes(activeQuery) || s.category.toLowerCase().includes(activeQuery))
    : [];

  const filteredServices = query
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(activeQuery) ||
          s.description.toLowerCase().includes(activeQuery)
      )
    : [];

  const hasResults =
    filteredProjects.length > 0 ||
    filteredSkills.length > 0 ||
    filteredServices.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl glass-card rounded-3xl p-6 border border-border shadow-2xl space-y-4">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-muted-foreground absolute left-4 pointer-events-none" />
          <input
            type="text"
            autoFocus
            placeholder="Smart Natural Language Search (e.g. 'Show React projects', 'Python work')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={onClose}
            className="absolute right-3 p-1 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[10px] text-muted-foreground font-bold uppercase shrink-0">Try:</span>
          {['Show React projects', 'Python work', 'ERP customization', 'MySQL database'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-muted-foreground hover:text-foreground shrink-0 text-[11px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-96 overflow-y-auto space-y-4 pr-1">
          {!query && (
            <div className="py-8 text-center text-xs text-muted-foreground space-y-1">
              <p className="font-semibold">Type a natural language query or keyword.</p>
              <p>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border">Ctrl + K</kbd></p>
            </div>
          )}

          {query && !hasResults && (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No matching portfolio items found for "{query}".
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary block px-1">
                Projects ({filteredProjects.length})
              </span>
              {filteredProjects.map((p) => (
                <a
                  key={p.id}
                  href="#projects"
                  onClick={onClose}
                  className="p-3.5 rounded-xl bg-surface-2/60 border border-border flex items-center justify-between hover:border-primary/40 transition-all block"
                >
                  <div className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{p.title}</h4>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">{p.shortDescription}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </a>
              ))}
            </div>
          )}

          {/* Skills */}
          {filteredSkills.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent block px-1">
                Skills ({filteredSkills.length})
              </span>
              <div className="flex flex-wrap gap-2 px-1">
                {filteredSkills.map((s) => (
                  <a
                    key={s.id}
                    href="#skills"
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-xs font-semibold text-foreground hover:border-accent"
                  >
                    {s.name} ({s.percentage}%)
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {filteredServices.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block px-1">
                Services ({filteredServices.length})
              </span>
              {filteredServices.map((s) => (
                <a
                  key={s.id}
                  href="#services"
                  onClick={onClose}
                  className="p-3 rounded-xl bg-surface-2/60 border border-border flex items-center justify-between hover:border-emerald-400/40 transition-all block"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{s.title}</h4>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">{s.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </a>
              ))}
            </div>
          )}

          {/* End of results */}
        </div>

      </div>
    </div>
  );
};
