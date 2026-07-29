import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User, MessageSquare } from 'lucide-react';
import { db } from '../../lib/db';

export const PortfolioAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([
    {
      role: 'ai',
      text: "Hi! I'm Dheeraj's AI Portfolio Assistant. Ask me anything about his skills, projects, experience at AarGees, or education!",
    },
  ]);
  const [input, setInput] = useState('');

  const hero = db.getHero();
  const about = db.getAbout();
  const skills = db.getSkills();
  const projects = db.getProjects();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg = [...messages, { role: 'user' as const, text: userText }];
    setMessages(newMsg);
    setInput('');

    // AI Knowledge Base Matching Engine
    setTimeout(() => {
      let reply = "Dheeraj Katwe is a Full Stack Software Engineer with expertise in React, Node.js, SQL, and AI/ML. Feel free to ask about his projects or work experience!";
      const q = userText.toLowerCase();

      if (q.includes('experience') || q.includes('work') || q.includes('company') || q.includes('aargees')) {
        reply = "Dheeraj is currently a Technical Support Associate at AarGees Business Solutions (May 2025 – Jun 2026), specializing in ERP customization, database query tuning, and application support.";
      } else if (q.includes('education') || q.includes('college') || q.includes('cgpa') || q.includes('degree')) {
        reply = `Dheeraj holds a Bachelor of Engineering in AI & Machine Learning from Visvesvaraya Technological University (VTU) with a CGPA of 8.3/10, and a Diploma in Computer Science.`;
      } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('java') || q.includes('python')) {
        reply = `Dheeraj's core technical stack includes: Languages (${skills.filter(s => s.category === 'Languages').map(s => s.name).join(', ')}), Databases (MySQL, PostgreSQL), Frontend (React.js, TypeScript, Tailwind CSS), and Backend (Node.js, Express.js).`;
      } else if (q.includes('project') || q.includes('tailor') || q.includes('library')) {
        reply = `Dheeraj's top projects are:\n1. Smart Tailor Billing System (React, Node, Express, MySQL)\n2. Exquisite Tailoring Website (React, Tailwind)\n3. Library Management System (Java JDBC Desktop App).`;
      } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire')) {
        reply = `You can contact Dheeraj via email at ${hero.email}, call/WhatsApp at ${hero.phone}, or submit a message through the contact form on this site!`;
      }

      setMessages([...newMsg, { role: 'ai', text: reply }]);
    }, 500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-gradient-brand text-primary-foreground shadow-2xl hover:scale-110 transition-all flex items-center gap-2 font-bold text-xs group"
          title="Ask Dheeraj's AI Assistant"
        >
          <Bot className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">Ask AI Assistant</span>
        </button>
      )}

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-full max-w-sm glass-card rounded-3xl p-5 border border-border shadow-2xl space-y-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground flex items-center gap-1">
                  AI Portfolio Assistant
                  <Sparkles className="w-3 h-3 text-accent" />
                </h4>
                <span className="text-[10px] text-emerald-400 font-semibold">Trained on Dheeraj's Resume</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="h-64 overflow-y-auto space-y-3 pr-1 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-line leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground font-medium rounded-br-none'
                      : 'bg-surface-2 text-foreground border border-border rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="relative flex items-center pt-2">
            <input
              type="text"
              placeholder="Ask about skills, projects..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-2 p-1.5 rounded-lg text-primary hover:text-accent transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
