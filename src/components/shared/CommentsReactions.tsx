import React, { useState, useEffect } from 'react';
import { ThumbsUp, Heart, Flame, Rocket, MessageSquare, Send, Sparkles } from 'lucide-react';
import { db, ReactionCounts } from '../../lib/db';
import { toast } from 'sonner';

interface CommentsReactionsProps {
  targetId?: string;
  title?: string;
}

export const CommentsReactions: React.FC<CommentsReactionsProps> = ({ targetId = 'global', title = 'Portfolio' }) => {
  const [reactions, setReactions] = useState<ReactionCounts>(db.getReactions(targetId));
  const [userReaction, setUserReaction] = useState<keyof ReactionCounts | null>(null);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');

  useEffect(() => {
    // Check if visitor has already reacted
    const saved = localStorage.getItem(`visitor_user_reaction_${targetId}`);
    if (saved && ['like', 'love', 'fire', 'rocket'].includes(saved)) {
      setUserReaction(saved as keyof ReactionCounts);
    }
  }, [targetId]);

  const handleReact = (type: keyof ReactionCounts) => {
    let nextReaction: keyof ReactionCounts | null = type;
    let prevReaction = userReaction;

    if (userReaction === type) {
      // Toggle off if clicking the same reaction
      nextReaction = null;
      localStorage.removeItem(`visitor_user_reaction_${targetId}`);
      toast.info('Reaction removed.');
    } else {
      // Switch or set new reaction
      localStorage.setItem(`visitor_user_reaction_${targetId}`, type);
      toast.success(prevReaction ? `Switched reaction to ${type}!` : `Thank you for reacting!`);
    }

    const updated = db.toggleVisitorReaction(targetId, prevReaction, nextReaction);
    setUserReaction(nextReaction);
    setReactions({ ...updated });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !commentText) return;
    db.addComment({
      targetId,
      authorName: name,
      authorEmail: email || 'visitor@example.com',
      content: commentText,
      replies: [],
    });
    toast.success('Comment submitted! Pending admin moderation approval.');
    setName('');
    setEmail('');
    setCommentText('');
  };

  return (
    <div className="py-8 bg-surface-2/40 rounded-3xl border border-border p-6 sm:p-8 space-y-6">
      
      {/* Reactions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <h3 className="font-bold text-sm text-foreground">Visitor Reactions</h3>
          <p className="text-xs text-muted-foreground">React to this showcase (1 reaction per visitor)</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Like */}
          <button
            onClick={() => handleReact('like')}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              userReaction === 'like'
                ? 'bg-sky-500/20 border-sky-400 text-sky-300 ring-2 ring-sky-400/40 shadow-lg shadow-sky-500/20'
                : 'bg-surface border-border hover:border-sky-400 text-foreground'
            }`}
            title={userReaction === 'like' ? 'Click to remove like' : 'Like'}
          >
            <ThumbsUp className={`w-4 h-4 ${userReaction === 'like' ? 'text-sky-300 fill-sky-300/30' : 'text-sky-400'}`} /> {reactions.like || 0}
          </button>

          {/* Love */}
          <button
            onClick={() => handleReact('love')}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              userReaction === 'love'
                ? 'bg-rose-500/20 border-rose-400 text-rose-300 ring-2 ring-rose-400/40 shadow-lg shadow-rose-500/20'
                : 'bg-surface border-border hover:border-rose-400 text-foreground'
            }`}
            title={userReaction === 'love' ? 'Click to remove heart' : 'Love'}
          >
            <Heart className={`w-4 h-4 ${userReaction === 'love' ? 'text-rose-300 fill-rose-300/30' : 'text-rose-400'}`} /> {reactions.love || 0}
          </button>

          {/* Fire */}
          <button
            onClick={() => handleReact('fire')}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              userReaction === 'fire'
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/20'
                : 'bg-surface border-border hover:border-amber-400 text-foreground'
            }`}
            title={userReaction === 'fire' ? 'Click to remove fire' : 'Fire'}
          >
            <Flame className={`w-4 h-4 ${userReaction === 'fire' ? 'text-amber-300 fill-amber-300/30' : 'text-amber-400'}`} /> {reactions.fire || 0}
          </button>

          {/* Rocket */}
          <button
            onClick={() => handleReact('rocket')}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              userReaction === 'rocket'
                ? 'bg-primary/20 border-primary text-primary-foreground ring-2 ring-primary/40 shadow-lg shadow-primary/20'
                : 'bg-surface border-border hover:border-primary text-foreground'
            }`}
            title={userReaction === 'rocket' ? 'Click to remove rocket' : 'Rocket'}
          >
            <Rocket className={`w-4 h-4 ${userReaction === 'rocket' ? 'text-primary fill-primary/30' : 'text-primary'}`} /> {reactions.rocket || 0}
          </button>
        </div>
      </div>

      {/* Leave Comment Form */}
      <form onSubmit={handleAddComment} className="space-y-4">
        <h4 className="font-bold text-xs text-foreground uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" /> Leave a Comment
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm"
          />
          <input
            type="email"
            placeholder="Your Email (Optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm"
          />
        </div>

        <textarea
          rows={3}
          required
          placeholder="Share your thoughts or question..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border text-sm resize-none"
        />

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> Post Comment
        </button>
      </form>

    </div>
  );
};
