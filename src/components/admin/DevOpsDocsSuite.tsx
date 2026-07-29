import React, { useState } from 'react';
import { Terminal, Shield, FileText, Code2, Server, GitBranch, Download, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const DevOpsDocsSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'swagger' | 'ratelimit' | 'terminal' | 'devops'>('terminal');

  const gitInfo = {
    branch: 'main',
    commitHash: '7f9a2b1c',
    environment: 'production',
    buildStatus: 'Passing',
    appVersion: 'v2.5.0-Enterprise',
    deployedAt: '2026-07-29T20:17:28+05:30',
  };

  const handleDownloadDevOpsFiles = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded ${filename}!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" />
            Developer Console & DevOps Suite
          </h2>
          <p className="text-xs text-muted-foreground">OpenAPI Explorer, Sentry logs, rate limiting, and Docker / CI/CD scripts.</p>
        </div>

        <div className="flex items-center gap-1.5 bg-surface-2 p-1 rounded-2xl border border-border">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'terminal' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Terminal Dashboard
          </button>
          <button
            onClick={() => setActiveTab('swagger')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'swagger' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            OpenAPI / Swagger
          </button>
          <button
            onClick={() => setActiveTab('ratelimit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'ratelimit' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Rate Limiting
          </button>
          <button
            onClick={() => setActiveTab('devops')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'devops' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Docker & CI/CD
          </button>
        </div>
      </div>

      {/* Tab: Terminal Dashboard */}
      {activeTab === 'terminal' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 font-mono">
                <GitBranch className="w-4 h-4 text-emerald-400" /> Git Deployment Metadata
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                {gitInfo.buildStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
              <div className="p-3 rounded-2xl bg-surface-2 border border-border">
                <span className="text-[10px] text-muted-foreground block">Branch</span>
                <span className="text-xs font-bold text-primary">{gitInfo.branch}</span>
              </div>
              <div className="p-3 rounded-2xl bg-surface-2 border border-border">
                <span className="text-[10px] text-muted-foreground block">Commit</span>
                <span className="text-xs font-bold text-foreground">{gitInfo.commitHash}</span>
              </div>
              <div className="p-3 rounded-2xl bg-surface-2 border border-border">
                <span className="text-[10px] text-muted-foreground block">Version</span>
                <span className="text-xs font-bold text-accent">{gitInfo.appVersion}</span>
              </div>
              <div className="p-3 rounded-2xl bg-surface-2 border border-border">
                <span className="text-[10px] text-muted-foreground block">Environment</span>
                <span className="text-xs font-bold text-sky-400">{gitInfo.environment}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: OpenAPI / Swagger */}
      {activeTab === 'swagger' && (
        <div className="glass-card rounded-3xl p-6 border border-border space-y-4 font-mono">
          <h3 className="text-sm font-bold text-foreground font-sans">OpenAPI 3.0 REST Specification</h3>

          <div className="p-4 rounded-2xl bg-surface-2 border border-border space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-white font-bold text-[10px]">GET</span>
              <span className="text-foreground font-bold">/api/v1/projects</span>
              <span className="text-muted-foreground">Fetch portfolio projects grid</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-sky-500 text-white font-bold text-[10px]">POST</span>
              <span className="text-foreground font-bold">/api/v1/contact</span>
              <span className="text-muted-foreground">Submit CRM message entry</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-amber-500 text-white font-bold text-[10px]">PUT</span>
              <span className="text-foreground font-bold">/api/v1/admin/settings</span>
              <span className="text-muted-foreground">Update theme and configuration</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Rate Limiting */}
      {activeTab === 'ratelimit' && (
        <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" /> Abuse Detection & Rate Limits
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-surface-2 border border-border">
              <span className="text-[10px] text-muted-foreground block">Max Requests / Min</span>
              <span className="text-2xl font-black text-foreground">120 Req</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-2 border border-border">
              <span className="text-[10px] text-muted-foreground block">Blocked Malicious IPs</span>
              <span className="text-2xl font-black text-emerald-400">0</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-2 border border-border">
              <span className="text-[10px] text-muted-foreground block">Failed Logins (24h)</span>
              <span className="text-2xl font-black text-amber-400">0</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Docker & CI/CD */}
      {activeTab === 'devops' && (
        <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
          <h3 className="text-sm font-bold text-foreground">DevOps Deployment Artifacts</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => handleDownloadDevOpsFiles('Dockerfile', `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`)}
              className="p-4 rounded-2xl bg-surface-2 border border-border hover:border-primary text-left transition-all space-y-1"
            >
              <FileText className="w-5 h-5 text-primary" />
              <div className="font-bold text-xs text-foreground">Download Dockerfile</div>
              <span className="text-[10px] text-muted-foreground">Multi-stage Nginx container</span>
            </button>

            <button
              onClick={() => handleDownloadDevOpsFiles('docker-compose.yml', `version: '3.8'\nservices:\n  portfolio:\n    build: .\n    ports:\n      - "80:80"\n    restart: always`)}
              className="p-4 rounded-2xl bg-surface-2 border border-border hover:border-primary text-left transition-all space-y-1"
            >
              <FileText className="w-5 h-5 text-accent" />
              <div className="font-bold text-xs text-foreground">Docker Compose</div>
              <span className="text-[10px] text-muted-foreground">Production web service</span>
            </button>

            <button
              onClick={() => handleDownloadDevOpsFiles('deploy.yml', `name: CI/CD Pipeline\non: [push]\njobs:\n  build-and-test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm ci\n      - run: npm run build`)}
              className="p-4 rounded-2xl bg-surface-2 border border-border hover:border-primary text-left transition-all space-y-1"
            >
              <FileText className="w-5 h-5 text-emerald-400" />
              <div className="font-bold text-xs text-foreground">GitHub Actions CI/CD</div>
              <span className="text-[10px] text-muted-foreground">Automated workflow script</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
