'use client';

import { useState } from 'react';
import { FileDown, Mail, User, Loader2, Check, X } from 'lucide-react';

export default function ResumeGate() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || 'Something went wrong');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Steven_Nguyen_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setSuccess(true);
      setTimeout(() => {
        setShowForm(false);
        setSuccess(false);
        setEmail('');
        setName('');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-accent-foreground font-montserrat font-extrabold text-sm uppercase tracking-widest shadow-2xl shadow-accent/40 hover:scale-105 hover:brightness-110 transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <FileDown className="w-5 h-5" />
        <span>Download Resume</span>
      </button>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-md rounded-3xl p-6 border border-border/50 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileDown className="w-4 h-4 text-accent" />
          <span className="text-xs font-montserrat font-extrabold text-muted-foreground uppercase tracking-[0.2em]">
            Download Resume
          </span>
        </div>
        <button
          onClick={() => {
            setShowForm(false);
            setError(null);
          }}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {success ? (
        <div className="flex items-center justify-center gap-2 py-4 text-accent font-montserrat font-bold text-sm">
          <Check className="w-5 h-5" />
          <span>Download started!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              required
              placeholder="Your email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-background border border-border text-foreground text-sm font-montserrat placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-background border border-border text-foreground text-sm font-montserrat placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 font-montserrat font-medium px-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-montserrat font-extrabold text-sm uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-105 hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>Get Resume</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-muted-foreground/50 text-center font-montserrat">
            Your email is only used to track downloads.
          </p>
        </form>
      )}
    </div>
  );
}
