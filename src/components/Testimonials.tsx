import React from 'react';
import { Star, Quote, Building2 } from 'lucide-react';
import { db, TestimonialItem, useDbUpdate } from '../lib/db';

export const Testimonials: React.FC = () => {
  useDbUpdate();
  const testimonials: TestimonialItem[] = db.getTestimonials();

  return (
    <section id="testimonials" className="py-24 relative bg-surface-2/30 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            Client & Team Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            What Clients & Leads Say
          </h2>
          <p className="text-base text-muted-foreground">
            Feedback from tailoring business owners and enterprise project leads on project delivery and technical engineering support.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-card rounded-3xl p-8 border border-border space-y-6 flex flex-col justify-between relative hover:border-emerald-500/40 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-foreground leading-relaxed italic">
                  "{t.feedback}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                  {t.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {t.clientName}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {t.role} • <span className="text-primary">{t.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
