import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { db, useDbUpdate } from '../lib/db';

export const Contact: React.FC = () => {
  useDbUpdate();
  const heroData = db.getHero();
  const setupConfig = db.getSetupConfig();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all required fields.');
      return;
    }
    setLoading(true);

    // Save to local DataStore as record
    db.addMessage({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    const targetEmail = heroData.email || setupConfig.email || 'dhirajkatwe109@gmail.com';
    const emailSubject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    // Direct Gmail Web Compose link
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${emailSubject}&body=${emailBody}`;
    
    // Open Gmail directly in new window
    window.open(gmailComposeUrl, '_blank');

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success('Gmail composer opened! Your message is ready to send directly to dhirajkatwe109@gmail.com.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
            Contact & Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Let's Build Something Great Together
          </h2>
          <p className="text-base text-muted-foreground">
            Have a role, a project, or an engineering idea? Drop me a message and I'll get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-border space-y-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Contact Information
              </h3>
              
              <div className="space-y-5">
                
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Email Address
                    </span>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(heroData.email || setupConfig.email || 'dhirajkatwe109@gmail.com')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                      title="Click to open in Gmail"
                    >
                      {heroData.email || setupConfig.email || 'dhirajkatwe109@gmail.com'}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:+91${(heroData.phone || setupConfig.phone || '9113565802').replace(/\D/g, '')}`}
                      className="text-sm font-semibold text-foreground hover:text-accent transition-colors flex items-center gap-1"
                      title="Click to call directly"
                    >
                      {heroData.phone || setupConfig.phone || '9113565802'}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {heroData.location || setupConfig.address || 'Karnataka, India'}
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Working Hours
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      Mon – Sat, 10:00 – 19:00 IST
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Response Guarantee */}
            <div className="p-6 rounded-3xl bg-gradient-brand/10 border border-primary/20 space-y-2 text-center">
              <Sparkles className="w-6 h-6 text-primary mx-auto" />
              <h4 className="font-bold text-sm text-foreground">
                Fast Turnaround Guaranteed
              </h4>
              <p className="text-xs text-muted-foreground">
                I typically respond to inquiries within 24 hours on business days.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 border border-border space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Send a Message
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Fill out the form below to initiate contact directly.
                </p>
              </div>

              {sent ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-foreground">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Thank you for reaching out. Dheeraj Katwe will review your message and reply back soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-primary-foreground bg-primary hover:opacity-90 transition-all shadow-lg hover:scale-[1.01] disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
