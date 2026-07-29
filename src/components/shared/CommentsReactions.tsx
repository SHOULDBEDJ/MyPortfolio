import React, { useState } from 'react';
import { ThumbsUp, Heart, Flame, Rocket, MessageSquare, Send, Sparkles } from 'lucide-react';
import { db, ReactionCounts } from '../../lib/db';
import { toast } from 'sonner';

interface CommentsReactionsProps {
  targetId?: string;
  title?: string;
}

export const CommentsReactions: React.FC<CommentsReactionsProps> = ({ targetId = 'global', title = 'Portfolio' }) => {
  const [reactions, setReactions] = useState<ReactionCounts>(db.getReactions(targetId));
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');

  const handleReact = (type: keyof ReactionCounts) => {
    const updated = db.addReaction(targetId, type);
    setReactions({ ...updated });
    toast.success(`Reaction registered! Thank you.`);
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
          <p className="text-xs text-muted-foreground">React to this showcase!</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleReact('like')}
            className="px-3.5 py-2 rounded-2xl bg-surface border border-border hover:border-primary text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
          >
            <ThumbsUp className="w-4 h-4 text-sky-400" /> {reactions.like}
          </button>

          <button
            onClick={() => handleReact('love')}
            className="px-3.5 py-2 rounded-2xl bg-surface border border-border hover:border-rose-400 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Heart className="w-4 h-4 text-rose-400" /> {reactions.love}
          </button>

          <button
            onClick={() => handleReact('fire')}
            className="px-3.5 py-2 rounded-2xl bg-surface border border-border hover:border-amber-400 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Flame className="w-4 h-4 text-amber-400" /> {reactions.fire}
          </button>

          <button
            onClick={() => handleReact('rocket')}
            className="px-3.5 py-2 rounded-2xl bg-surface border border-border hover:border-primary text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Rocket className="w-4 h-4 text-primary" /> {reactions.rocket}
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
