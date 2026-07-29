-- Dheeraj Manohar Katwe Portfolio Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to initialize all tables

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. HERO TABLE
CREATE TABLE hero (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL DEFAULT 'Dheeraj Manohar Katwe',
    role VARCHAR(255) NOT NULL DEFAULT 'Full Stack Software Engineer',
    availability VARCHAR(255) DEFAULT 'Available for freelance & full-time work',
    bio TEXT,
    email VARCHAR(255) DEFAULT 'dheerajkatwe@example.com',
    phone VARCHAR(255) DEFAULT '+91 90000 00000',
    location VARCHAR(255) DEFAULT 'Karnataka, India',
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    leetcode_url VARCHAR(255),
    hackerrank_url VARCHAR(255),
    codechef_url VARCHAR(255),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. ABOUT TABLE
CREATE TABLE about (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) DEFAULT 'Building robust, intuitive & scalable web applications',
    biography TEXT,
    career_objective TEXT,
    education_highlight VARCHAR(255) DEFAULT 'B.E. AI & ML (VTU - CGPA 8.3)',
    experience_years VARCHAR(50) DEFAULT '1.5+ Years',
    status VARCHAR(100) DEFAULT 'Open to Full-Time & Contracts',
    languages TEXT[] DEFAULT ARRAY['English', 'Hindi', 'Kannada', 'Marathi'],
    projects_count INT DEFAULT 12,
    tech_count INT DEFAULT 24,
    clients_count INT DEFAULT 8,
    problems_solved_count INT DEFAULT 450,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. SKILLS TABLE
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    percentage INT NOT NULL DEFAULT 80,
    icon VARCHAR(100) DEFAULT 'Code',
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. SERVICES TABLE
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) DEFAULT 'Layers',
    price VARCHAR(100) DEFAULT 'Custom Pricing',
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. PROJECTS TABLE
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    short_description TEXT NOT NULL,
    full_details TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Completed',
    tech_stack TEXT[] DEFAULT ARRAY[]::TEXT[],
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. EXPERIENCE TABLE
CREATE TABLE experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL,
    location VARCHAR(255) DEFAULT 'Karnataka, India',
    description TEXT NOT NULL,
    responsibilities TEXT[] DEFAULT ARRAY[]::TEXT[],
    skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. EDUCATION TABLE
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    degree VARCHAR(255) NOT NULL,
    major VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL,
    score VARCHAR(100) NOT NULL,
    details TEXT,
    skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. CERTIFICATIONS TABLE
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    issue_date VARCHAR(100) NOT NULL,
    credential_id VARCHAR(255),
    credential_url VARCHAR(255),
    skills_learned TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. BLOGS TABLE
CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    read_time VARCHAR(50) DEFAULT '5 min read',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. TESTIMONIALS TABLE
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    feedback TEXT NOT NULL,
    rating INT DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. CONTACT MESSAGES TABLE
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
