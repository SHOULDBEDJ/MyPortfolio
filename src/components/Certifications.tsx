import React from 'react';
import { Award, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import { db, CertificationItem } from '../lib/db';

export const Certifications: React.FC = () => {
  const certifications: CertificationItem[] = db.getCertifications();

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider border border-accent/20">
            Certifications & Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Verified Professional Certifications
          </h2>
          <p className="text-base text-muted-foreground">
            Accredited credentials and specializations completed in Machine Learning, Full Stack Software Engineering, and Database Systems.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-3xl p-6 border border-border space-y-6 flex flex-col justify-between hover:border-accent/50 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center border border-border group-hover:scale-105 transition-transform">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-2 text-muted-foreground border border-border">
                    {cert.issueDate}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    {cert.organization}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-1">
                    {cert.title}
                  </h3>
                  {cert.credentialId && (
                    <span className="text-xs font-mono text-muted-foreground block mt-1">
                      ID: {cert.credentialId}
                    </span>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-border/50">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
                    Competencies Covered
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-surface-2 text-[11px] font-medium text-foreground border border-border"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {cert.credentialUrl && (
                <div className="pt-4 border-t border-border/50">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-foreground transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Verify Credential Online
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
