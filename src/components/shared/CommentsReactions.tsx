import React, { useState, useEffect } from 'react';
import {
  ThumbsUp, Heart, Flame, Rocket, MessageSquare,
  Send, User, Clock, ChevronDown, ChevronUp, Star
} from 'lucide-react';
import { db, ReactionCounts, CommentItem } from '../../lib/db';
import { toast } from 'sonner';

interface CommentsReactionsProps {
  targetId?: string;
  title?: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(n => n[0]?.toUpperCase()).join('');
}

const AVATAR_COLORS = [
  'bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-amber-500',
  'bg-rose-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500',
];
function avatarColor(name: string): string {
  let hash = 0;
  for (const c of name) hash = (hash << 5) - hash + c.charCodeAt(0);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export const CommentsReactions: React.FC<CommentsReactionsProps> = ({ targetId = 'global', title = 'Portfolio' }) => {
  const [reactions, setReactions] = useState<ReactionCounts>(db.getReactions(targetId));
  const [userReaction, setUserReaction] = useState<keyof ReactionCounts | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`visitor_user_reaction_${targetId}`);
    if (saved && ['like', 'love', 'fire', 'rocket'].includes(saved)) {
      setUserReaction(saved as keyof ReactionCounts);
    }
    // Load approved comments for this targetId
    loadComments();
  }, [targetId]);

  const loadComments = () => {
    const all = db.getComments().filter(c => c.status === 'approved' && c.targetId === targetId);
    setComments(all);
  };

  const handleReact = (type: keyof ReactionCounts) => {
    const prev = userReaction;
    const next: keyof ReactionCounts | null = userReaction === type ? null : type;

    if (next === null) {
      localStorage.removeItem(`visitor_user_reaction_${targetId}`);
      toast.info('Reaction removed.');
    } else {
      localStorage.setItem(`visitor_user_reaction_${targetId}`, type);
      toast.success(prev ? `Switched to ${type}!` : 'Thanks for reacting! 🎉');
    }

    const updated = db.toggleVisitorReaction(targetId, prev, next);
    setUserReaction(next);
    setReactions({ ...updated });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;
    setSubmitting(true);

    setTimeout(() => {
      db.addComment({
        targetId,
        authorName: name.trim(),
        authorEmail: email.trim() || 'visitor@portfolio.com',
        content: commentText.trim(),
        replies: [],
      });
      toast.success('Your comment is now live! 🎉');
      setName('');
      setEmail('');
      setCommentText('');
      setSubmitting(false);
      loadComments();
    }, 400);
  };

  const visibleComments = showAll ? comments : comments.slice(0, 4);
  const totalComments = comments.length;

  return (
    <div className="space-y-6">

      {/* ─── Reactions Bar ─── */}
      <div className="bg-surface-2/40 rounded-3xl border border-border p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-6 mb-6">
          <div>
            <h3 className="font-bold text-sm text-foreground">Visitor Reactions</h3>
            <p className="text-xs text-muted-foreground">React to this showcase (1 reaction per visitor)</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Like */}
            <button onClick={() => handleReact('like')}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${userReaction === 'like' ? 'bg-sky-500/20 border-sky-400 text-sky-300 ring-2 ring-sky-400/40 shadow-lg shadow-sky-500/20' : 'bg-surface border-border hover:border-sky-400 text-foreground'}`}
              title={userReaction === 'like' ? 'Remove like' : 'Like'}
            >
              <ThumbsUp className={`w-4 h-4 ${userReaction === 'like' ? 'text-sky-300' : 'text-sky-400'}`} /> {reactions.like || 0}
            </button>
            {/* Love */}
            <button onClick={() => handleReact('love')}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${userReaction === 'love' ? 'bg-rose-500/20 border-rose-400 text-rose-300 ring-2 ring-rose-400/40 shadow-lg shadow-rose-500/20' : 'bg-surface border-border hover:border-rose-400 text-foreground'}`}
              title={userReaction === 'love' ? 'Remove heart' : 'Love'}
            >
              <Heart className={`w-4 h-4 ${userReaction === 'love' ? 'text-rose-300' : 'text-rose-400'}`} /> {reactions.love || 0}
            </button>
            {/* Fire */}
            <button onClick={() => handleReact('fire')}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${userReaction === 'fire' ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/20' : 'bg-surface border-border hover:border-amber-400 text-foreground'}`}
              title={userReaction === 'fire' ? 'Remove fire' : 'Fire'}
            >
              <Flame className={`w-4 h-4 ${userReaction === 'fire' ? 'text-amber-300' : 'text-amber-400'}`} /> {reactions.fire || 0}
            </button>
            {/* Rocket */}
            <button onClick={() => handleReact('rocket')}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${userReaction === 'rocket' ? 'bg-primary/20 border-primary text-primary-foreground ring-2 ring-primary/40 shadow-lg shadow-primary/20' : 'bg-surface border-border hover:border-primary text-foreground'}`}
              title={userReaction === 'rocket' ? 'Remove rocket' : 'Rocket'}
            >
              <Rocket className={`w-4 h-4 ${userReaction === 'rocket' ? 'text-primary' : 'text-primary'}`} /> {reactions.rocket || 0}
            </button>
          </div>
        </div>

        {/* ─── Leave a Comment Form ─── */}
        <form onSubmit={handleAddComment} className="space-y-4">
          <h4 className="font-bold text-xs text-foreground uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" /> Leave a Comment
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text" required placeholder="Your Name *"
              value={name} onChange={e => setName(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <input
              type="email" placeholder="Your Email (Optional)"
              value={email} onChange={e => setEmail(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <textarea
            rows={3} required placeholder="Share your thoughts, feedback, or a question..."
            value={commentText} onChange={e => setCommentText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            type="submit" disabled={submitting}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-60"
          >
            <Send className="w-4 h-4" /> {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>

      {/* ─── Public Comments Wall ─── */}
      {totalComments > 0 && (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-base text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Visitor Comments
              <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                {totalComments}
              </span>
            </h4>
          </div>

          {/* Comment Cards */}
          <div className="space-y-3">
            {visibleComments.map(comment => {
              const initials = getInitials(comment.authorName);
              const color = avatarColor(comment.authorName);
              return (
                <div
                  key={comment.id}
                  className="group relative bg-surface-2/50 rounded-2xl border border-border p-5 hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md`}>
                      {initials}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="text-sm font-bold text-foreground">{comment.authorName}</span>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {timeAgo(comment.createdAt)}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                          Verified Visitor
                        </span>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More / Less */}
          {totalComments > 4 && (
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="w-full py-3 rounded-2xl border border-border bg-surface-2/40 hover:bg-surface-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-2"
            >
              {showAll ? (
                <><ChevronUp className="w-4 h-4" /> Show Less</>
              ) : (
                <><ChevronDown className="w-4 h-4" /> Show {totalComments - 4} More Comments</>
              )}
            </button>
          )}
        </div>
      )}

      {/* Empty state */}
      {totalComments === 0 && (
        <div className="text-center py-8 bg-surface-2/30 rounded-2xl border border-dashed border-border">
          <MessageSquare className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};
