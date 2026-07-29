import React from 'react';
import {
  Layers,
  Code2,
  Database,
  Server,
  Wrench,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { db, ServiceItem, useDbUpdate } from '../lib/db';

export const Services: React.FC = () => {
  useDbUpdate();
  const services: ServiceItem[] = db.getServices();

  const iconMap: Record<string, any> = {
    Layers: Layers,
    Code2: Code2,
    Database: Database,
    Server: Server,
    Wrench: Wrench,
  };

  return (
    <section id="services" className="py-24 relative bg-surface-2/20 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
            Services Offered
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Specialized Software Engineering Services
          </h2>
          <p className="text-base text-muted-foreground">
            Delivering high-performance backend systems, custom ERP module extensions, database tuning, and modern web applications.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <div
                key={service.id}
                className="glass-card rounded-3xl p-8 border border-border space-y-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group hover:shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-7 h-7" />
                    </div>
                    {service.price && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface-2 text-muted-foreground border border-border">
                        {service.price}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-accent transition-colors"
                  >
                    Request Service Proposal
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
