import React, { useState } from 'react';
import { Mail, Download, Trash2, Search, Tag, MessageSquare, Check } from 'lucide-react';
import { db, ContactMessage } from '../../lib/db';
import { toast } from 'sonner';

export const ContactCRM: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>(db.getMessages());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, status: ContactMessage['status']) => {
    db.updateMessageStatus(id, status);
    setMessages(db.getMessages());
    toast.success(`Message marked as ${status}`);
  };

  const handleDelete = (id: string) => {
    db.deleteMessage(id);
    setMessages(db.getMessages());
    toast.success('Message deleted.');
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Message', 'Date', 'Status'];
    const rows = messages.map((m) => [
      `"${m.name}"`,
      `"${m.email}"`,
      `"${m.message.replace(/"/g, '""')}"`,
      `"${m.date}"`,
      `"${m.status || 'New'}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `contact_messages_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Contact messages exported to CSV!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Contact CRM</h2>
          <p className="text-xs text-muted-foreground">Manage incoming client inquiries, status workflow, and CSV exports.</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-primary-foreground bg-primary hover:opacity-90 shadow-md self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Export to CSV
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'New', 'In Progress', 'Replied', 'Archived'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                statusFilter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-2 text-muted-foreground hover:text-foreground'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* CRM Inbox List */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-xs text-muted-foreground glass-card rounded-3xl">
          No matching contact messages found.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((m) => (
            <div key={m.id} className="p-6 rounded-3xl glass-card border border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                    {m.name}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      {m.status || 'New'}
                    </span>
                  </h4>
                  <a href={`mailto:${m.email}`} className="text-xs text-primary">{m.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground">{m.date}</span>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground bg-surface-2/60 p-4 rounded-2xl border border-border leading-relaxed">
                "{m.message}"
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
                <span className="text-[11px] font-semibold text-muted-foreground mr-2">Set Status:</span>
                {(['New', 'In Progress', 'Replied', 'Archived'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(m.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                      m.status === st
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-surface border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
