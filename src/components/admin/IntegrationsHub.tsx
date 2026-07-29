import React, { useState } from 'react';
import { Github, Code2, Mail, MessageSquare, RefreshCw, CheckCircle2, ShieldAlert, Sparkles, Send } from 'lucide-react';
import { db, CommentItem, NewsletterSubscriber } from '../../lib/db';
import { toast } from 'sonner';

export const IntegrationsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sync' | 'newsletter' | 'comments'>('sync');

  // GitHub Sync State
  const [syncingGithub, setSyncingGithub] = useState<boolean>(false);

  // Newsletter State
  const [subscribers] = useState<NewsletterSubscriber[]>(db.getSubscribers());
  const [campaignSubject, setCampaignSubject] = useState<string>('');
  const [campaignBody, setCampaignBody] = useState<string>('');

  // Comments State
  const [comments, setComments] = useState<CommentItem[]>(db.getComments());

  const handleSyncGithub = () => {
    setSyncingGithub(true);
    setTimeout(() => {
      setSyncingGithub(false);
      db.logActivity('GitHub Auto Sync Executed', 'Synced public repositories, stars, and language metrics', 'success');
      toast.success('GitHub Repositories and Contribution Matrix synced!');
    }, 1500);
  };

  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignSubject) return;
    db.logActivity('Newsletter Sent', `Campaign "${campaignSubject}" dispatched to subscribers`, 'info');
    toast.success(`Newsletter dispatched to ${subscribers.length || 1} subscribers!`);
    setCampaignSubject('');
    setCampaignBody('');
  };

  const handleUpdateComment = (id: string, status: CommentItem['status']) => {
    db.updateCommentStatus(id, status);
    setComments(db.getComments());
    toast.success(`Comment status updated to "${status}"`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-primary" />
            Integrations & Audience Center
          </h2>
          <p className="text-xs text-muted-foreground">GitHub auto-sync, email newsletters, and comments moderation.</p>
        </div>

        <div className="flex items-center gap-1.5 bg-surface-2 p-1 rounded-2xl border border-border">
          <button
            onClick={() => setActiveTab('sync')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'sync' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Auto Sync
          </button>
          <button
            onClick={() => setActiveTab('newsletter')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'newsletter' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Newsletter
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'comments' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}
          >
            Comments Moderation
          </button>
        </div>
      </div>

      {/* Tab: Auto Sync */}
      {activeTab === 'sync' && (
        <div className="grid grid-cols-1 gap-6">
          <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
            <div className="flex items-center gap-2 text-foreground font-bold">
              <Github className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold">GitHub Repositories Auto Sync</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Automatically sync public repos, stars, forks, languages, topics, and pinned projects from your GitHub profile.
            </p>
            <button
              onClick={handleSyncGithub}
              disabled={syncingGithub}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncingGithub ? 'animate-spin' : ''}`} />
              {syncingGithub ? 'Syncing Repos...' : 'Sync GitHub Repositories'}
            </button>
          </div>
        </div>
      )}

      {/* Tab: Newsletter */}
      {activeTab === 'newsletter' && (
        <div className="space-y-6">
          <form onSubmit={handleSendCampaign} className="glass-card rounded-3xl p-6 border border-border space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> Create Email Campaign
            </h3>

            <div>
              <label className="block text-xs font-semibold mb-1">Subject Line</label>
              <input
                type="text"
                required
                placeholder="e.g. New Article: Designing Normalized Relational Databases"
                value={campaignSubject}
                onChange={(e) => setCampaignSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Email Body Content</label>
              <textarea
                rows={4}
                required
                placeholder="Write your email update..."
                value={campaignBody}
                onChange={(e) => setCampaignBody(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Dispatch Campaign
            </button>
          </form>
        </div>
      )}

      {/* Tab: Comments Moderation */}
      {activeTab === 'comments' && (
        <div className="glass-card rounded-3xl p-6 border border-border space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" /> Visitor Comments Moderation
          </h3>

          {comments.length === 0 ? (
            <div className="p-8 rounded-2xl bg-surface-2 border border-dashed border-border text-center text-xs text-muted-foreground">
              No pending visitor comments. Comments left on articles or projects will appear here for approval.
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-surface-2 border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{c.authorName} ({c.authorEmail})</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface border border-border uppercase font-mono">{c.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.content}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                    <button
                      onClick={() => handleUpdateComment(c.id, 'approved')}
                      className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateComment(c.id, 'rejected')}
                      className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-400 text-[10px] font-bold"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
