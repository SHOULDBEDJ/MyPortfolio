import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { GlobalSearch } from './components/GlobalSearch';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SetupWizardModal } from './components/admin/SetupWizardModal';
import { WidgetEngine } from './components/shared/WidgetEngine';
import { CommentsReactions } from './components/shared/CommentsReactions';
import { PWAInstaller } from './components/pwa/PWAInstaller';
import { MaintenancePage } from './components/shared/MaintenancePage';
import { db, useDbUpdate } from './lib/db';
import { logPageView } from './lib/analytics';
import { Toaster } from 'sonner';

export const App: React.FC = () => {
  useDbUpdate();

  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [wizardOpen, setWizardOpen] = useState<boolean>(!db.getSetupConfig().setupCompleted);
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(
    window.location.pathname === '/admin' || window.location.hash === '#admin'
  );
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(false);

  const vis = db.getSectionVisibility();
  const maintenance = db.getMaintenance();
  const toggles = db.getFeatureToggles();

  useEffect(() => {
    logPageView(window.location.hash || '/');

    const handlePopState = () => {
      setIsAdminRoute(window.location.pathname === '/admin' || window.location.hash === '#admin');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [darkMode]);

  // Schema.org Person JSON-LD Injection for SEO
  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: db.getSetupConfig().websiteName || 'Dheeraj Manohar Katwe',
      jobTitle: 'Full Stack Software Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'AarGees Business Solutions',
      },
      almaMater: 'Visvesvaraya Technological University',
      knowsAbout: ['Full Stack Development', 'React', 'Node.js', 'MySQL', 'ERP Customization', 'AI & Machine Learning'],
      url: window.location.origin,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const closeAdminView = () => {
    setIsAdminRoute(false);
    setAdminAuthenticated(false);
    if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    }
  };

  // If maintenance mode is enabled by admin and user is not in admin route
  if (maintenance.enabled && !isAdminRoute) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300 relative">
      <Toaster position="top-right" theme={darkMode ? 'dark' : 'light'} />

      {/* Setup Wizard Modal for First Time Installation */}
      <SetupWizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />

      {/* Admin Route View */}
      {isAdminRoute ? (
        adminAuthenticated ? (
          <AdminDashboard
            onLogout={() => setAdminAuthenticated(false)}
            onClose={closeAdminView}
          />
        ) : (
          <AdminLogin
            onLoginSuccess={() => setAdminAuthenticated(true)}
            onClose={closeAdminView}
          />
        )
      ) : (
        <>
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenResume={() => setResumeOpen(true)}
            onOpenAdmin={() => {
              window.history.pushState({}, '', '/admin');
              setIsAdminRoute(true);
            }}
          />

          <main className="flex-grow space-y-12">
            {vis.hero && <Hero />}
            {vis.about && <About />}
            {vis.services && <Services />}
            {vis.skills && toggles.skills && <Skills />}
            {vis.projects && toggles.projects && <Projects />}
            
            {/* Interactive Real-Time Widgets Engine */}
            <WidgetEngine />

            {vis.certifications && <Certifications />}
            {vis.experience && toggles.experience && <Experience />}
            {vis.testimonials && toggles.testimonials && <Testimonials />}
            {vis.contact && toggles.contactForm && <Contact />}

            {/* Audience Comments & Interactive Reactions */}
            {toggles.comments && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <CommentsReactions targetId="homepage" title="Portfolio Showcase" />
              </div>
            )}
          </main>

          {vis.footer && <Footer />}

          {/* PWA Installer Banner */}
          <PWAInstaller />

          {/* Modals */}
          {toggles.resume && <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />}
          <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
      )}
    </div>
  );
};

export default App;
