// Master Local & Supabase Enterprise Data Store for Dheeraj Katwe Portfolio
import { useState, useEffect } from 'react';

export interface StandardRecord {
  id: string;
  uuid: string;
  slug: string;
  status: 'draft' | 'published' | 'archived' | 'active';
  visibility: 'public' | 'private' | 'hidden';
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by: string;
  updated_by: string;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
  version: number;
}

export interface SetupConfig {
  setupCompleted: boolean;
  websiteName: string;
  tagline: string;
  logo: string;
  favicon: string;
  profilePhoto: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  theme: 'dark' | 'light' | 'system';
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    leetcode: string;
    youtube: string;
  };
  resumeUrl: string;
  seoTitle: string;
  seoDescription: string;
  analyticsId: string;
  smtp: {
    host: string;
    port: number;
    user: string;
    secure: boolean;
  };
  timezone: string;
  language: string;
  adminAccount: {
    username: string;
    email: string;
  };
}

export interface FeatureToggles {
  testimonials: boolean;
  gallery: boolean;
  experience: boolean;
  projects: boolean;
  skills: boolean;
  timeline: boolean;
  aiAssistant: boolean;
  resume: boolean;
  newsletter: boolean;
  comments: boolean;
  likes: boolean;
  analytics: boolean;
  githubSync: boolean;
  leetcodeSync: boolean;
  visitorsCounter: boolean;
  openSource: boolean;
  codingProfiles: boolean;
  contactForm: boolean;
  maintenanceMode: boolean;
}

export interface CustomSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  video?: string;
  layout: 'cards' | 'grid' | 'buttons' | 'banner';
  cards: Array<{ id: string; title: string; desc: string; icon?: string; tag?: string }>;
  buttons: Array<{ id: string; label: string; url: string; variant: 'primary' | 'secondary' }>;
  background: 'glass' | 'dark' | 'gradient' | 'transparent';
  padding: 'small' | 'medium' | 'large';
  spacing: 'tight' | 'normal' | 'relaxed';
  animation: 'fade' | 'zoom' | 'slide' | 'none';
  visibility: boolean;
  position: number;
  seoTitle?: string;
}

export interface ExperienceItem {
  id: string;
  type: 'work' | 'education';
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements?: string[];
  skills?: string[];
  score?: string;
}

export interface ComponentBlock {
  id: string;
  name: string;
  type: 'CTA' | 'FeatureCards' | 'TimelineCards' | 'PricingCards' | 'Stats' | 'HeroBanner' | 'Alert' | 'ImageGallery' | 'CodeBlock' | 'Buttons' | 'Testimonials' | 'Newsletter';
  content: Record<string, any>;
  created_at: string;
}

export interface WidgetItem {
  id: string;
  type: 'github' | 'github_contributions' | 'github_activity' | 'clock' | 'calendar' | 'visitor_count' | 'latest_blog' | 'popular_blog' | 'recent_projects' | 'skills' | 'quote' | 'weather' | 'newsletter' | 'social_feed' | 'coding_stats' | 'rss_feed';
  title: string;
  enabled: boolean;
  position: number;
  colSpan: 1 | 2 | 3;
}

export interface FooterConfig {
  logoText: string;
  description: string;
  copyrightText: string;
  backgroundColor: string;
  columns: Array<{
    title: string;
    links: Array<{ label: string; url: string }>;
  }>;
  showNewsletter: boolean;
  showSocials: boolean;
  privacyPolicyUrl: string;
  termsUrl: string;
}

export interface SidebarConfig {
  enabled: boolean;
  showSearch: boolean;
  showCategories: boolean;
  showTags: boolean;
  showArchives: boolean;
  showPopularPosts: boolean;
  showRecentPosts: boolean;
  showAd: boolean;
  adText: string;
  showNewsletter: boolean;
  showSocials: boolean;
  showGithubStats: boolean;
}

export interface RedirectRule {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  type: '301' | '302' | '404' | 'Temporary' | 'Permanent';
  active: boolean;
  hits: number;
}

export interface TrashItem {
  id: string;
  entityType: 'project' | 'blog' | 'skill' | 'service' | 'message' | 'section';
  entityTitle: string;
  data: any;
  deletedAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  user: string;
}

export interface CommentItem {
  id: string;
  targetId: string; // blog or project ID
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'spam';
  likesCount: number;
  replies?: CommentItem[];
}

export interface ReactionCounts {
  like: number;
  love: number;
  fire: number;
  rocket: number;
  clap: number;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

export interface HeroData {
  name: string;
  role: string;
  availability: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  hackerrankUrl: string;
  codechefUrl: string;
  profilePhotoUrl?: string;
  coverPhotoUrl?: string;
}

export interface AboutData {
  title: string;
  biography: string;
  careerObjective: string;
  educationHighlight: string;
  experienceYears: string;
  status: string;
  languages: string[];
  projectsCount: number;
  techCount: number;
  clientsCount: number;
  problemsSolvedCount: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages' | 'Databases' | 'Frontend' | 'Backend' | 'Tools & AI' | 'Framework & Libraries' | 'Core CS Concepts' | 'Soft Skills';
  percentage: number;
  icon?: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDetails: string;
  status: string;
  tech: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  type: 'work' | 'education';
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements?: string[];
  skills?: string[];
  score?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  role: string;
  feedback: string;
  rating: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
  status?: 'New' | 'In Progress' | 'Replied' | 'Archived';
  notes?: string;
  starred?: boolean;
}

export interface ResumeFile {
  id: string;
  title: string;
  description: string;
  fileName: string;
  downloadCount: number;
}

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'video' | 'doc';
  size: string;
  url: string;
  uploadedAt: string;
}

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  services: boolean;
  skills: boolean;
  projects: boolean;
  codingProfiles: boolean;
  certifications: boolean;
  experience: boolean;
  testimonials: boolean;
  contact: boolean;
  footer: boolean;
}

export interface MaintenanceConfig {
  enabled: boolean;
  message: string;
  estimatedReturn: string;
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  borderRadius: string;
  glassOpacity: number;
  fontFamily: string;
  animationStyle: string;
}

// SEED DEFAULTS
const initialSetupConfig: SetupConfig = {
  setupCompleted: true,
  websiteName: 'Dheeraj Manohar Katwe — Software Engineer',
  tagline: 'Software Engineer & Full Stack Web Developer',
  logo: 'DK',
  favicon: '/favicon.ico',
  profilePhoto: '',
  primaryColor: '#6366f1',
  secondaryColor: '#3b82f6',
  accentColor: '#ec4899',
  theme: 'dark',
  email: 'dhirajkatwe109@gmail.com',
  phone: '9113565802',
  address: 'Hubli, Dharwad, Karnataka, 580024, India',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    leetcode: 'https://leetcode.com',
    youtube: 'https://youtube.com',
  },
  resumeUrl: '/Dheeraj_Katwe_Resume.pdf',
  seoTitle: 'Dheeraj Manohar Katwe — Software Engineer',
  seoDescription: 'Computer Science graduate (CGPA: 8.3) with hands-on experience building and deploying full-stack web applications using Java, Python, React, and Node.js.',
  analyticsId: 'GA-99482012',
  smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'dhirajkatwe109@gmail.com',
    secure: true,
  },
  timezone: 'Asia/Kolkata (GMT+5:30)',
  language: 'en-US',
  adminAccount: {
    username: 'admin',
    email: 'dhirajkatwe109@gmail.com',
  },
};

const initialFeatureToggles: FeatureToggles = {
  testimonials: true,
  gallery: true,
  experience: true,
  projects: true,
  skills: true,
  timeline: true,
  aiAssistant: true,
  resume: true,
  newsletter: true,
  comments: true,
  likes: true,
  analytics: true,
  githubSync: true,
  leetcodeSync: true,
  visitorsCounter: true,
  openSource: true,
  codingProfiles: true,
  contactForm: true,
  maintenanceMode: false,
};

const initialWidgets: WidgetItem[] = [
  { id: 'w1', type: 'github_contributions', title: 'GitHub Contributions', enabled: true, position: 1, colSpan: 2 },
  { id: 'w2', type: 'coding_stats', title: 'LeetCode Problem Stats', enabled: true, position: 2, colSpan: 1 },
  { id: 'w3', type: 'clock', title: 'World Clock & Timezone', enabled: true, position: 3, colSpan: 1 },
  { id: 'w4', type: 'calendar', title: 'Availability Calendar', enabled: true, position: 4, colSpan: 1 },
  { id: 'w5', type: 'visitor_count', title: 'Real-time Visitors', enabled: true, position: 5, colSpan: 1 },
  { id: 'w6', type: 'latest_blog', title: 'Featured Article', enabled: true, position: 6, colSpan: 2 },
  { id: 'w7', type: 'quote', title: 'Daily Tech Inspiration', enabled: true, position: 7, colSpan: 1 },
  { id: 'w8', type: 'weather', title: 'Location & Weather', enabled: true, position: 8, colSpan: 1 },
];

const initialFooterConfig: FooterConfig = {
  logoText: 'Dheeraj Katwe',
  description: 'Building high-performance software, normalized databases, and modern web applications with clean architecture.',
  copyrightText: `© ${new Date().getFullYear()} Dheeraj Manohar Katwe. All rights reserved.`,
  backgroundColor: 'surface',
  columns: [
    {
      title: 'Quick Links',
      links: [
        { label: 'About', url: '#about' },
        { label: 'Projects', url: '#projects' },
        { label: 'Skills', url: '#skills' },
        { label: 'Experience', url: '#experience' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', url: '#blogs' },
        { label: 'Certifications', url: '#certifications' },
        { label: 'Resume', url: '#resume' },
        { label: 'Admin Portal', url: '/admin' },
      ],
    },
  ],
  showNewsletter: true,
  showSocials: true,
  privacyPolicyUrl: '#privacy',
  termsUrl: '#terms',
};

const initialSidebarConfig: SidebarConfig = {
  enabled: true,
  showSearch: true,
  showCategories: true,
  showTags: true,
  showArchives: true,
  showPopularPosts: true,
  showRecentPosts: true,
  showAd: true,
  adText: 'Available for custom Web App & ERP Development contracts!',
  showNewsletter: true,
  showSocials: true,
  showGithubStats: true,
};

const initialRedirects: RedirectRule[] = [
  { id: 'r1', sourceUrl: '/github', targetUrl: 'https://github.com', type: '301', active: true, hits: 142 },
  { id: 'r2', sourceUrl: '/linkedin', targetUrl: 'https://linkedin.com', type: '301', active: true, hits: 98 },
  { id: 'r3', sourceUrl: '/resume-download', targetUrl: '/Dheeraj_Katwe_Resume.pdf', type: '302', active: true, hits: 215 },
];

const initialHero: HeroData = {
  name: 'Dheeraj Manohar Katwe',
  role: 'Software Engineer',
  availability: 'Seeking Entry-Level Software Engineer / Developer Role',
  bio: 'Computer Science graduate (CGPA: 8.3) with hands-on experience building and deploying full-stack web applications using Java, Python, React, and Node.js. Delivered a production SaaS-based tailoring management platform that now supports 150+ customer records and orders.',
  email: 'dhirajkatwe109@gmail.com',
  phone: '9113565802',
  location: 'Hubli, Dharwad, Karnataka, 580024, India',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  leetcodeUrl: 'https://leetcode.com',
  hackerrankUrl: 'https://hackerrank.com',
  codechefUrl: 'https://codechef.com',
  profilePhotoUrl: '',
};

const initialAbout: AboutData = {
  title: 'Computer Science Graduate & Full-Stack Web Application Developer',
  biography:
    'Computer Science graduate (CGPA: 8.3) with hands-on experience building and deploying full-stack web applications using Java, Python, React, and Node.js. Delivered a production SaaS-based tailoring management platform that now supports 150+ customer records and orders. Skilled in data structures & algorithms, RESTful API design, and relational and NoSQL databases.',
  careerObjective:
    'Seeking an entry-level Software Engineer or Software Developer role. Skilled in data structures & algorithms, RESTful API design, relational and NoSQL databases, and end-to-end web deployment.',
  educationHighlight: 'BE in AI & ML (GPA: 8.3) | Diploma in CS (GPA: 7.4)',
  experienceYears: '1+ Years',
  status: 'Open for Software Engineer / Developer Roles',
  languages: ['English', 'Hindi', 'Kannada', 'Marathi'],
  projectsCount: 3,
  techCount: 16,
  clientsCount: 150,
  problemsSolvedCount: 500,
};

const initialSkills: SkillItem[] = [
  // Programming Languages
  { id: '1', name: 'Python', category: 'Languages', percentage: 90, featured: true },
  { id: '2', name: 'C', category: 'Languages', percentage: 82, featured: true },
  { id: '3', name: 'HTML & CSS', category: 'Languages', percentage: 92, featured: true },
  { id: '4', name: 'JavaScript', category: 'Languages', percentage: 88, featured: true },
  // Framework & Libraries
  { id: '5', name: 'React.js', category: 'Framework & Libraries', percentage: 90, featured: true },
  { id: '6', name: 'Node.js', category: 'Framework & Libraries', percentage: 85, featured: true },
  { id: '7', name: 'Express.js', category: 'Framework & Libraries', percentage: 84, featured: true },
  { id: '8', name: 'Django', category: 'Framework & Libraries', percentage: 80, featured: true },
  { id: '9', name: 'FastAPI', category: 'Framework & Libraries', percentage: 82, featured: true },
  // Databases
  { id: '10', name: 'MySQL', category: 'Databases', percentage: 88, featured: true },
  { id: '11', name: 'MongoDB', category: 'Databases', percentage: 82, featured: true },
  { id: '12', name: 'SQLite', category: 'Databases', percentage: 85, featured: true },
  { id: '13', name: 'DBMS', category: 'Databases', percentage: 86, featured: true },
  // Core CS Concepts
  { id: '14', name: 'Data Structures & Algorithms', category: 'Core CS Concepts', percentage: 88, featured: true },
  { id: '15', name: 'Object-Oriented Programming', category: 'Core CS Concepts', percentage: 90, featured: true },
  { id: '16', name: 'AI/ML Basics', category: 'Core CS Concepts', percentage: 82, featured: true },
  // Soft Skills
  { id: '17', name: 'Adaptability & Communication', category: 'Soft Skills', percentage: 92, featured: true },
  { id: '18', name: 'Problem Solving & Teamwork', category: 'Soft Skills', percentage: 94, featured: true },
  { id: '19', name: 'Time Management', category: 'Soft Skills', percentage: 90, featured: true },
];

const initialServices: ServiceItem[] = [
  {
    id: 's1',
    title: 'L2 ERP Support & Customization',
    description: 'Resolving client ERP issues, report errors, module customization, user onboarding, and system configurations.',
    icon: 'Layers',
    price: 'Custom Quote',
    featured: true,
  },
  {
    id: 's2',
    title: 'Full Stack Web Application Development',
    description: 'Building production-grade web applications using React.js, Node.js, Express.js, FastAPI, and relational/NoSQL databases.',
    icon: 'Code2',
    price: 'Project Based',
    featured: true,
  },
  {
    id: 's3',
    title: 'Database Architecture & Management',
    description: 'Designing normalized database schemas in MySQL, MongoDB, SQLite, DBMS, and developing RESTful APIs.',
    icon: 'Database',
    price: 'Consultation',
    featured: true,
  },
];

const initialProjects: ProjectItem[] = [
  {
    id: 'smart-tailor',
    title: 'Smart Tailor Billing & Customer Management System',
    category: 'Full Stack SaaS Application',
    shortDescription: 'Deployed SaaS platform supporting management of 130+ customer records and 130+ tailoring orders and digital invoices.',
    fullDetails: 'Deployed the platform to production, supporting the management of 130+ customer records and the processing of 130+ tailoring orders and digital invoices.',
    status: 'Completed',
    tech: ['React.js', 'Node.js', 'Express.js', 'SQLite (LibSQL)', 'Turso', 'Google Sheets API', 'PDFKit'],
    features: [
      'Deployed the platform to production supporting 130+ customer records and orders',
      'Processing of 130+ tailoring orders and automated digital PDF invoices',
      'Integration with LibSQL/Turso cloud database and Google Sheets API',
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    featured: true,
  },
  {
    id: 'exquisite-tailoring',
    title: 'Exquisite Tailoring Co. (LM Ladies Tailor)',
    category: 'Full Stack Web App',
    shortDescription: 'Production-grade full-stack application for appointment booking, inquiry management, booking tracking, and gallery management.',
    fullDetails: 'Developed and deployed a production-grade full-stack application enabling appointment booking, customer inquiry management, booking tracking, and gallery management.',
    status: 'Completed',
    tech: ['React', 'TypeScript', 'FastAPI', 'MongoDB Atlas', 'JWT', 'Vercel', 'Render'],
    features: [
      'Developed and deployed production-grade full-stack web application',
      'Appointment booking, customer inquiry management, and booking tracking',
      'Gallery management, MongoDB Atlas integration, and JWT auth',
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    featured: true,
  },
  {
    id: 'library-system',
    title: 'Library Management System',
    category: 'Desktop & Web System',
    shortDescription: 'System to manage inventory, member registration, borrowing/return operations, and fine calculations with real-time alerts.',
    fullDetails: 'Built a Library Management System using Python (Tkinter/Django) and SQLite/MySQL to manage inventory, member registration, borrowing/return operations, and fine calculation with features like secure authentication, real-time availability, and overdue alerts.',
    status: 'Completed',
    tech: ['Python (Tkinter/Django)', 'SQLite/MySQL', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Inventory cataloguing & member registration management',
      'Borrowing/return transaction operations & automated fine calculation',
      'Secure authentication, real-time availability, and overdue alerts',
    ],
    githubUrl: 'https://github.com',
    featured: true,
  },
];

const initialTestimonials: TestimonialItem[] = [
  {
    id: 't1',
    clientName: 'Ramesh Tailors Management',
    company: 'Apex Bespoke Tailoring',
    role: 'Business Owner',
    feedback: 'Dheeraj delivered a tailoring billing system that completely digitized our customer measurement logs and invoices. Extremely dependable and skilled!',
    rating: 5,
  },
];

const initialResumes: ResumeFile[] = [
  {
    id: 'r1',
    title: 'Software Engineer Resume (Full Stack Focus)',
    description: 'Detailed resume featuring React, Node.js, SQL, and AI/ML qualifications.',
    fileName: 'Dheeraj_Katwe_Software_Engineer_Resume.pdf',
    downloadCount: 42,
  },
];

const initialSectionVisibility: SectionVisibility = {
  hero: true,
  about: true,
  services: true,
  skills: true,
  projects: true,
  codingProfiles: true,
  certifications: true,
  experience: true,
  testimonials: true,
  contact: true,
  footer: true,
};

const initialMaintenance: MaintenanceConfig = {
  enabled: false,
  message: 'System Maintenance in progress. The portfolio will be back online shortly.',
  estimatedReturn: '1 Hour',
};

const initialThemeConfig: ThemeConfig = {
  primaryColor: '#6366f1',
  accentColor: '#ec4899',
  borderRadius: '1.5rem',
  glassOpacity: 0.7,
  fontFamily: 'Inter',
  animationStyle: 'smooth',
};

const initialCertifications: CertificationItem[] = [
  {
    id: '1',
    title: 'Machine Learning Internship',
    organization: 'Karunadu Technologies Pvt. Ltd',
    issueDate: "Nov '23",
    credentialId: 'KT-ML-2023',
    skills: ['Machine Learning', 'Python', 'AI/ML'],
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    organization: 'Sookshmas E -Learning Private Limited Company',
    issueDate: "May '24",
    credentialId: 'SE-FS-2024',
    skills: ['Full Stack Development', 'React.js', 'Node.js', 'Web Development'],
  },
];

const initialExperience: ExperienceItem[] = [
  {
    id: '1',
    type: 'work',
    role: 'Technical Support Associate',
    company: 'AarGees Business Solutions',
    period: "May '25 — Jun '26",
    location: 'Hubli, India',
    description: 'Provided L2 ERP support by resolving client issues, report errors, and application defects through remote and direct channels.',
    achievements: [
      'Provided L2 ERP support by resolving client issues, report errors, and application defects through remote and direct channels.',
      'Handled system configuration, module customization, and user onboarding to ensure smooth implementation and usage.',
      'Collaborated with development and internal teams to troubleshoot complex cases and deliver timely resolutions.',
      'Maintained high service quality standards while consistently driving strong client satisfaction.',
    ],
    skills: ['L2 ERP Support', 'System Configuration', 'Module Customization', 'User Onboarding', 'Troubleshooting'],
  },
  {
    id: '2',
    type: 'education',
    role: 'BE in AI & ML',
    company: 'G M Institute of Technology',
    period: "Feb '23 — Apr '25",
    location: 'Davangere, India',
    score: 'GPA: 8.3 (BE in AI & ML GPA: 7.5)',
    description: 'Bachelor of Engineering in Artificial Intelligence & Machine Learning. Focused on AI/ML, Data Structures, Algorithms, Software Engineering, and Full-Stack Development.',
    skills: ['AI & ML', 'Python', 'Data Structures', 'Algorithms', 'Software Engineering'],
  },
  {
    id: '3',
    type: 'education',
    role: 'Diploma in Computer Science',
    company: 'Government Polytechnic Hubli',
    period: "Aug '18 — Jan '21",
    location: 'Hubli, India',
    score: 'GPA: 7.4',
    description: 'Diploma in Computer Science covering core programming languages (C, Python), Object-Oriented Programming, Database Management Systems, and Web Technologies.',
    skills: ['C', 'Python', 'HTML/CSS', 'JavaScript', 'DBMS'],
  },
];

// DATA STORE MANAGER CLASS
class DataStore {
  constructor() {
    if (typeof window !== 'undefined') {
      const SYNC_KEY = 'portfolio_resume_synced_v10';
      if (!localStorage.getItem(SYNC_KEY)) {
        localStorage.setItem('portfolio_setup_config', JSON.stringify(initialSetupConfig));
        localStorage.setItem('portfolio_hero', JSON.stringify(initialHero));
        localStorage.setItem('portfolio_about', JSON.stringify(initialAbout));
        localStorage.setItem('portfolio_skills', JSON.stringify(initialSkills));
        localStorage.setItem('portfolio_projects', JSON.stringify(initialProjects));
        localStorage.setItem('portfolio_experience', JSON.stringify(initialExperience));
        localStorage.setItem('portfolio_certifications', JSON.stringify(initialCertifications));
        localStorage.setItem(SYNC_KEY, 'true');
      }
    }
  }

  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(`portfolio_${key}`);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('db-update', { detail: { key } }));
      }
    } catch (e) {
      console.error(`Failed saving ${key} to localStorage`, e);
    }
  }

  // SETUP CONFIG
  getSetupConfig(): SetupConfig { return this.getItem('setup_config', initialSetupConfig); }
  saveSetupConfig(config: SetupConfig): void { this.setItem('setup_config', config); }

  // FEATURE TOGGLES
  getFeatureToggles(): FeatureToggles { return this.getItem('feature_toggles', initialFeatureToggles); }
  saveFeatureToggles(toggles: FeatureToggles): void { this.setItem('feature_toggles', toggles); }

  // CUSTOM SECTIONS
  getCustomSections(): CustomSection[] { return this.getItem('custom_sections', []); }
  saveCustomSection(section: CustomSection): void {
    const sections = this.getCustomSections();
    const idx = sections.findIndex(s => s.id === section.id);
    if (idx >= 0) sections[idx] = section;
    else sections.push({ ...section, id: Date.now().toString() });
    this.setItem('custom_sections', sections);
  }
  deleteCustomSection(id: string): void {
    this.setItem('custom_sections', this.getCustomSections().filter(s => s.id !== id));
  }

  // REUSABLE COMPONENT BLOCKS
  getComponentBlocks(): ComponentBlock[] { return this.getItem('component_blocks', []); }
  saveComponentBlock(block: ComponentBlock): void {
    const blocks = this.getComponentBlocks();
    const idx = blocks.findIndex(b => b.id === block.id);
    if (idx >= 0) blocks[idx] = block;
    else blocks.push({ ...block, id: Date.now().toString(), created_at: new Date().toISOString() });
    this.setItem('component_blocks', blocks);
  }
  deleteComponentBlock(id: string): void {
    this.setItem('component_blocks', this.getComponentBlocks().filter(b => b.id !== id));
  }

  // WIDGETS
  getWidgets(): WidgetItem[] { return this.getItem('widgets', initialWidgets); }
  saveWidgets(widgets: WidgetItem[]): void { this.setItem('widgets', widgets); }

  // FOOTER & SIDEBAR CONFIGS
  getFooterConfig(): FooterConfig { return this.getItem('footer_config', initialFooterConfig); }
  saveFooterConfig(config: FooterConfig): void { this.setItem('footer_config', config); }
  getSidebarConfig(): SidebarConfig { return this.getItem('sidebar_config', initialSidebarConfig); }
  saveSidebarConfig(config: SidebarConfig): void { this.setItem('sidebar_config', config); }

  // REDIRECT RULES
  getRedirects(): RedirectRule[] { return this.getItem('redirects', initialRedirects); }
  saveRedirect(rule: RedirectRule): void {
    const rules = this.getRedirects();
    const idx = rules.findIndex(r => r.id === rule.id);
    if (idx >= 0) rules[idx] = rule;
    else rules.push({ ...rule, id: Date.now().toString(), hits: 0 });
    this.setItem('redirects', rules);
  }
  deleteRedirect(id: string): void {
    this.setItem('redirects', this.getRedirects().filter(r => r.id !== id));
  }

  // SOFT DELETE TRASH
  getTrash(): TrashItem[] { return this.getItem('trash', []); }
  moveToTrash(entityType: TrashItem['entityType'], entityTitle: string, data: any): void {
    const trash = this.getTrash();
    trash.unshift({
      id: Date.now().toString(),
      entityType,
      entityTitle,
      data,
      deletedAt: new Date().toISOString(),
    });
    this.setItem('trash', trash);
  }
  restoreFromTrash(id: string): any {
    const trash = this.getTrash();
    const item = trash.find(t => t.id === id);
    if (item) {
      this.setItem('trash', trash.filter(t => t.id !== id));
      return item;
    }
    return null;
  }
  emptyTrash(): void { this.setItem('trash', []); }

  // ACTIVITY LOG TIMELINE
  getActivityLogs(): ActivityLog[] {
    const logs = this.getItem<ActivityLog[]>('activity_logs', []);
    if (logs.length === 0) {
      return [
        { id: '1', action: 'System Initialized', details: 'Enterprise portfolio modules loaded successfully', timestamp: new Date().toISOString(), type: 'info', user: 'Admin' },
        { id: '2', action: 'Login', details: 'Admin logged in from local console', timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'success', user: 'Admin' },
      ];
    }
    return logs;
  }
  logActivity(action: string, details: string, type: ActivityLog['type'] = 'info'): void {
    const logs = this.getActivityLogs();
    logs.unshift({
      id: Date.now().toString(),
      action,
      details,
      timestamp: new Date().toISOString(),
      type,
      user: 'Admin',
    });
    this.setItem('activity_logs', logs.slice(0, 100)); // keep last 100 logs
  }

  // COMMENTS & REACTIONS
  getComments(): CommentItem[] { return this.getItem('comments', []); }
  addComment(comment: Omit<CommentItem, 'id' | 'createdAt' | 'status' | 'likesCount'>): void {
    const comments = this.getComments();
    comments.unshift({
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      likesCount: 0,
    });
    this.setItem('comments', comments);
  }
  updateCommentStatus(id: string, status: CommentItem['status']): void {
    const comments = this.getComments();
    const idx = comments.findIndex(c => c.id === id);
    if (idx >= 0) {
      comments[idx].status = status;
      this.setItem('comments', comments);
    }
  }

  getReactions(targetId: string = 'global'): ReactionCounts {
    const raw = localStorage.getItem(`reactions_${targetId}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.like >= 100 || parsed.love >= 90) {
          const resetCounts = { like: 0, love: 0, fire: 0, rocket: 0, clap: 0 };
          this.setItem(`reactions_${targetId}`, resetCounts);
          return resetCounts;
        }
        return parsed;
      } catch (e) {}
    }
    return this.getItem(`reactions_${targetId}`, { like: 0, love: 0, fire: 0, rocket: 0, clap: 0 });
  }
  addReaction(targetId: string = 'global', type: keyof ReactionCounts): ReactionCounts {
    const counts = this.getReactions(targetId);
    counts[type] += 1;
    this.setItem(`reactions_${targetId}`, counts);
    return counts;
  }
  toggleVisitorReaction(
    targetId: string = 'global',
    previousType: keyof ReactionCounts | null,
    newType: keyof ReactionCounts | null
  ): ReactionCounts {
    const counts = this.getReactions(targetId);
    if (previousType && counts[previousType] !== undefined && counts[previousType] > 0) {
      counts[previousType] -= 1;
    }
    if (newType && counts[newType] !== undefined) {
      counts[newType] += 1;
    }
    this.setItem(`reactions_${targetId}`, counts);
    return counts;
  }

  // NEWSLETTER
  getSubscribers(): NewsletterSubscriber[] { return this.getItem('subscribers', []); }
  addSubscriber(email: string): boolean {
    const subs = this.getSubscribers();
    if (subs.some(s => s.email.toLowerCase() === email.toLowerCase())) return false;
    subs.unshift({
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active',
    });
    this.setItem('subscribers', subs);
    return true;
  }

  // HERO
  getHero(): HeroData { return this.getItem('hero', initialHero); }
  saveHero(data: HeroData): void { this.setItem('hero', data); }

  // ABOUT
  getAbout(): AboutData { return this.getItem('about', initialAbout); }
  saveAbout(data: AboutData): void { this.setItem('about', data); }

  // SKILLS
  getSkills(): SkillItem[] { return this.getItem('skills', initialSkills); }
  saveSkill(skill: SkillItem): void {
    const skills = this.getSkills();
    const idx = skills.findIndex(s => s.id === skill.id);
    if (idx >= 0) skills[idx] = skill;
    else skills.push({ ...skill, id: Date.now().toString() });
    this.setItem('skills', skills);
  }
  deleteSkill(id: string): void {
    const skill = this.getSkills().find(s => s.id === id);
    if (skill) this.moveToTrash('skill', skill.name, skill);
    this.setItem('skills', this.getSkills().filter(s => s.id !== id));
  }

  // SERVICES
  getServices(): ServiceItem[] { return this.getItem('services', initialServices); }
  saveService(service: ServiceItem): void {
    const items = this.getServices();
    const idx = items.findIndex(s => s.id === service.id);
    if (idx >= 0) items[idx] = service;
    else items.push({ ...service, id: Date.now().toString() });
    this.setItem('services', items);
  }
  deleteService(id: string): void {
    const item = this.getServices().find(s => s.id === id);
    if (item) this.moveToTrash('service', item.title, item);
    this.setItem('services', this.getServices().filter(s => s.id !== id));
  }

  // PROJECTS
  getProjects(): ProjectItem[] { return this.getItem('projects', initialProjects); }
  saveProject(project: ProjectItem): void {
    const items = this.getProjects();
    const idx = items.findIndex(p => p.id === project.id);
    if (idx >= 0) items[idx] = project;
    else items.push({ ...project, id: Date.now().toString() });
    this.setItem('projects', items);
  }
  deleteProject(id: string): void {
    const item = this.getProjects().find(p => p.id === id);
    if (item) this.moveToTrash('project', item.title, item);
    this.setItem('projects', this.getProjects().filter(p => p.id !== id));
  }

  // EXPERIENCE
  getExperience(): ExperienceItem[] { return this.getItem('experience', initialExperience); }
  saveExperience(item: ExperienceItem): void {
    const items = this.getExperience();
    const idx = items.findIndex(e => e.id === item.id);
    if (idx >= 0) items[idx] = item;
    else items.push({ ...item, id: Date.now().toString() });
    this.setItem('experience', items);
  }
  deleteExperience(id: string): void {
    this.setItem('experience', this.getExperience().filter(e => e.id !== id));
  }

  // CERTIFICATIONS
  getCertifications(): CertificationItem[] { return this.getItem('certifications', initialCertifications); }
  saveCertification(cert: CertificationItem): void {
    const items = this.getCertifications();
    const idx = items.findIndex(c => c.id === cert.id);
    if (idx >= 0) items[idx] = cert;
    else items.push({ ...cert, id: Date.now().toString() });
    this.setItem('certifications', items);
  }
  deleteCertification(id: string): void {
    this.setItem('certifications', this.getCertifications().filter(c => c.id !== id));
  }

  // TESTIMONIALS
  getTestimonials(): TestimonialItem[] { return this.getItem('testimonials', initialTestimonials); }

  // RESUMES
  getResumes(): ResumeFile[] { return this.getItem('resumes', initialResumes); }
  incrementResumeDownload(id: string): void {
    const items = this.getResumes();
    const idx = items.findIndex(r => r.id === id);
    if (idx >= 0) {
      items[idx].downloadCount += 1;
      this.setItem('resumes', items);
    }
  }

  // CONTACT MESSAGES
  getMessages(): ContactMessage[] { return this.getItem('messages', []); }
  addMessage(msg: Omit<ContactMessage, 'id' | 'date' | 'read'>): void {
    const messages = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      read: false,
      status: 'New',
    };
    messages.unshift(newMsg);
    this.setItem('messages', messages);
    this.logActivity('New Contact Message', `Message received from ${msg.name} (${msg.email})`, 'info');
  }
  updateMessageStatus(id: string, status: ContactMessage['status'], notes?: string): void {
    const messages = this.getMessages();
    const idx = messages.findIndex(m => m.id === id);
    if (idx >= 0) {
      messages[idx].status = status;
      if (notes !== undefined) messages[idx].notes = notes;
      this.setItem('messages', messages);
    }
  }
  deleteMessage(id: string): void {
    const item = this.getMessages().find(m => m.id === id);
    if (item) this.moveToTrash('message', `From ${item.name}`, item);
    this.setItem('messages', this.getMessages().filter(m => m.id !== id));
  }

  // SECTION VISIBILITY
  getSectionVisibility(): SectionVisibility { return this.getItem('visibility', initialSectionVisibility); }
  saveSectionVisibility(vis: SectionVisibility): void { this.setItem('visibility', vis); }

  // MAINTENANCE CONFIG
  getMaintenance(): MaintenanceConfig { return this.getItem('maintenance', initialMaintenance); }
  saveMaintenance(config: MaintenanceConfig): void { this.setItem('maintenance', config); }

  // THEME CONFIG
  getThemeConfig(): ThemeConfig { return this.getItem('theme', initialThemeConfig); }
  saveThemeConfig(config: ThemeConfig): void { this.setItem('theme', config); }

  // MEDIA FILES
  getMediaFiles(): MediaFile[] { return this.getItem('media', []); }
  addMediaFile(file: MediaFile): void {
    const media = this.getMediaFiles();
    media.unshift(file);
    this.setItem('media', media);
  }
  deleteMediaFile(id: string): void {
    this.setItem('media', this.getMediaFiles().filter(m => m.id !== id));
  }

  // FULL BACKUP EXPORT & RESTORE
  exportFullBackup(): string {
    const data = {
      setup: this.getSetupConfig(),
      toggles: this.getFeatureToggles(),
      hero: this.getHero(),
      about: this.getAbout(),
      skills: this.getSkills(),
      services: this.getServices(),
      projects: this.getProjects(),
      certifications: this.getCertifications(),
      customSections: this.getCustomSections(),
      widgets: this.getWidgets(),
      footer: this.getFooterConfig(),
      sidebar: this.getSidebarConfig(),
      redirects: this.getRedirects(),
      messages: this.getMessages(),
      visibility: this.getSectionVisibility(),
      theme: this.getThemeConfig(),
      media: this.getMediaFiles(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  restoreBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.hero) this.saveHero(data.hero);
      if (data.skills) this.setItem('skills', data.skills);
      if (data.projects) this.setItem('projects', data.projects);
      if (data.services) this.setItem('services', data.services);
      if (data.toggles) this.saveFeatureToggles(data.toggles);
      if (data.setup) this.saveSetupConfig(data.setup);
      if (data.visibility) this.saveSectionVisibility(data.visibility);
      this.logActivity('Backup Restored', 'System data restored from JSON backup file', 'warning');
      return true;
    } catch {
      return false;
    }
  }
}

export const db = new DataStore();

export function useDbUpdate(): number {
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    const handleUpdate = () => setTick((t) => t + 1);
    window.addEventListener('db-update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('db-update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return tick;
}
