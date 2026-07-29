# Enterprise SaaS Portfolio Platform — Architecture & Documentation

## System Architecture Diagram

```mermaid
graph TD
    Client[Browser Client] -->|Vite Single Page App| ReactApp[React + TypeScript Core]
    ReactApp -->|Local Persistence| DataStore[DataStore Manager (db.ts)]
    ReactApp -->|Cloud Backup & Storage| Supabase[Supabase PostgreSQL & Storage]
    
    subgraph Enterprise Modules
      ReactApp --> SetupWizard[Setup Wizard]
      ReactApp --> FeatureToggle[Feature Manager]
      ReactApp --> PageBuilder[Dynamic Page Builder]
      ReactApp --> Widgets[Interactive Widget Engine]
      ReactApp --> MediaStudio[Image Processing & Canvas Studio]
      ReactApp --> AIStudio[AI Content Studio & Importers]
      ReactApp --> SEOAudit[SEO & Broken Link Diagnostics]
    end
```

## Relational Database ER Diagram

```mermaid
erDiagram
    PROJECTS {
        string id PK
        string uuid
        string title
        string category
        string shortDescription
        string status
        boolean is_featured
        string created_at
    }
    SKILLS {
        string id PK
        string name
        string category
        number percentage
        boolean featured
    }
    SERVICES {
        string id PK
        string title
        string description
        string price
    }
    BLOGS {
        string id PK
        string title
        string slug
        string category
        string summary
        boolean published
    }
    MESSAGES {
        string id PK
        string name
        string email
        string message
        string status
    }
    TRASH {
        string id PK
        string entityType
        string entityTitle
        string deletedAt
    }

    PROJECTS ||--o{ TRASH : soft_deletes
    BLOGS ||--o{ TRASH : soft_deletes
```

## Developer & Deployment Guide

1. **Local Development**:
   Run `npm run dev` to start Vite development server.
2. **Build Verification**:
   Run `npm run build` to verify TypeScript types and bundle optimization.
3. **Docker Deployment**:
   Run `docker-compose up -d --build` to launch the multi-stage Nginx container.
