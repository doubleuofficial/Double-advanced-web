import React, { useState, useEffect } from 'react';
import { CATALOG } from '../data';
import { SongCatalogItem } from '../types';
import { motion } from 'motion/react';
import { Music, ArrowRight, Sparkles, Send, CheckCircle, Clock } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (route: 'home' | 'about' | 'discography' | 'contact' | 'privacy', itemId?: string) => void;
  catalog?: SongCatalogItem[];
}

export default function HomeView({ onNavigate, catalog = CATALOG }: HomeViewProps) {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', story: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    function calculateCountdown() {
      const now = new Date();
      const nextFriday = new Date();
      // Friday is day 5. Calculate days to add.
      const diff = (5 + 7 - now.getDay()) % 7 || 7;
      nextFriday.setDate(now.getDate() + diff);
      nextFriday.setHours(0, 0, 0, 0);

      const diffMs = nextFriday.getTime() - now.getTime();
      
      const d = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const h = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', story: '' });
    }, 1500);
  };

  return (
    <div className="space-y-16 pb-20 font-sans bg-[#0c0c0e] text-[#e2e8f0]">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden py-16">
        {/* Subtle geometric grid background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl space-y-6 z-10"
        >
          {/* Movement Header Tag */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#ff5f00]/10 border border-[#ff5f00]/30 rounded-full text-xs font-mono font-bold text-[#ff5f00] uppercase tracking-wider">
            <Sparkles size={12} className="text-[#ff5f00] animate-pulse" />
            <span>No Stories Left Untold Movement</span>
          </div>

          <h1 className="heading-font text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase">
            DOUBLE<span className="text-[#00F0FF] text-neon-cyan">U</span>
          </h1>

          <p className="text-sm md:text-base text-zinc-400 font-mono tracking-wide max-w-2xl mx-auto uppercase leading-relaxed">
            Translating core transitions, losses, and military foundations into raw, glowing soundtracks.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center font-mono">
            <button
              id="hero-listen-btn"
              onClick={() => onNavigate('discography')}
              className="px-8 py-3.5 bg-neon-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] text-black font-bold text-xs uppercase tracking-widest rounded transition duration-300"
            >
              Stream Sound Catalog
            </button>
            <button
              id="hero-join-btn"
              onClick={() => onNavigate('about')}
              className="px-8 py-3.5 border border-zinc-800 hover:border-[#ff5f00] bg-zinc-950/60 hover:bg-[#ff5f00]/5 text-white hover:text-[#ff5f00] font-bold text-xs uppercase tracking-widest rounded transition duration-300"
            >
              Biographical Journey
            </button>
          </div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-neon-cyan" />
          
          <div className="flex justify-center items-center space-x-2 text-[#00F0FF] mb-1">
            <Clock size={12} className="animate-pulse" />
            <span className="heading-font text-[10px] uppercase tracking-widest font-bold">Chronometer Node</span>
          </div>
          <h2 className="heading-font text-2xl font-bold text-white mt-1 mb-6 uppercase tracking-wider">
            Next Vault Release Unlocks In
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto font-mono">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds },
            ].map((cell, idx) => (
              <div key={idx} className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 flex flex-col items-center">
                <span className="heading-font text-3xl font-extrabold text-white text-neon-orange">
                  {cell.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] text-zinc-500 tracking-wider uppercase mt-1">{cell.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Discography */}
      <section className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-zinc-900 pb-3">
          <div>
            <span className="heading-font text-[10px] uppercase tracking-widest text-[#00F0FF] font-bold">Audio Inventory</span>
            <h2 className="heading-font text-2xl font-bold text-white uppercase mt-0.5">Featured Single Archives</h2>
          </div>
          <button
            onClick={() => onNavigate('discography')}
            className="group flex items-center space-x-1.5 text-xs font-mono text-[#00F0FF] hover:text-[#ff5f00] uppercase mt-2 sm:mt-0 transition font-bold tracking-widest"
          >
            <span>Full Catalog Matrix</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catalog.map((item) => (
            <div 
              key={item.id} 
              className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-zinc-800 transition-all duration-300"
            >
              {/* Artwork Cover */}
              <div className="relative aspect-square overflow-hidden bg-zinc-900">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded font-mono text-[8px] font-bold text-[#ff5f00] uppercase tracking-widest">
                  {item.type}
                </span>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="heading-font text-lg font-bold text-white uppercase tracking-tight">{item.title}</h3>
                  <p className="text-[9px] font-mono text-zinc-400 mt-0.5">{item.metaLeft}</p>
                </div>
              </div>

              {/* Summary and Streaming links */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {item.about}
                </p>

                <div className="flex gap-2.5 pt-3 border-t border-zinc-900 font-mono">
                  <button
                    onClick={() => onNavigate('discography', item.id)}
                    className="flex-grow py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg text-[9px] uppercase font-bold transition duration-200 text-center"
                  >
                    Load Track Details
                  </button>
                  <a
                    href={item.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#1ED760]/10 hover:bg-[#1ED760]/20 border border-[#1ED760]/30 rounded-lg text-[#1ED760] transition"
                    title="Stream on Spotify"
                  >
                    <Music size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Movement Manifesto Section */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="relative rounded-2xl bg-zinc-950 border border-zinc-900 p-8 md:p-10 text-center space-y-3">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-orange" />
          <div className="inline-flex h-9 w-9 items-center justify-center rounded bg-[#ff5f00]/10 border border-[#ff5f00]/30 text-[#ff5f00] font-bold font-mono text-sm">
            W
          </div>
          <h2 className="heading-font text-xl font-bold text-white uppercase tracking-wider">
            No Stories Left Untold
          </h2>
          <div className="max-w-2xl mx-auto space-y-3 font-light text-zinc-400 text-sm leading-relaxed">
            <p>
              "Every human voice carries a timeline, and every early rupture leaves an acoustic footprint. We do not bury our losses; we catalog them."
            </p>
            <p className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-wider font-bold">
              — DoubleU Recordings Manifesto
            </p>
          </div>
        </div>
      </section>

      {/* Movement Intake Console (Contact Form) */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 md:p-10 space-y-6 shadow-2xl">
          <div className="border-b border-zinc-900 pb-4">
            <span className="heading-font text-[10px] uppercase tracking-widest text-[#00F0FF] font-bold">Secure Intake Terminal</span>
            <h2 className="heading-font text-xl font-bold text-white uppercase mt-0.5">Submit Your Narrative</h2>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">Your memory ledger coordinate will be directly indexed in the archive.</p>
          </div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded-xl p-8 text-center space-y-4"
            >
              <div className="inline-flex p-3 bg-[#00F0FF]/10 text-[#00F0FF] rounded-full">
                <CheckCircle size={22} />
              </div>
              <h3 className="heading-font text-base font-bold text-white uppercase">Narrative Logged</h3>
              <p className="text-xs text-zinc-400 font-mono max-w-sm mx-auto leading-relaxed">
                Transmission verified. Your coordinate has been securely logged into the centralized memory ledger.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded font-mono text-[9px] text-zinc-300 uppercase tracking-widest transition font-bold"
              >
                Reset Intake Ledger
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Narrator Identity / Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. William K. Hartman"
                    className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded px-4 py-3 text-slate-200 focus:outline-none focus:border-[#00F0FF] hover:border-zinc-800 transition"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Return Coordinate / Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. william@doubleuofficial.online"
                    className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded px-4 py-3 text-slate-200 focus:outline-none focus:border-[#00F0FF] hover:border-zinc-800 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">The Documented Narrative / Your Story</label>
                <textarea
                  rows={4}
                  required
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Inscribe the transition, the loss, or the victory. None will be left unheard."
                  className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded px-4 py-3 text-slate-200 focus:outline-none focus:border-[#ff5f00] hover:border-zinc-800 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#00F0FF] to-[#ff5f00] hover:shadow-[0_0_20px_rgba(255,95,0,0.3)] text-black font-bold rounded uppercase tracking-widest transition duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Synchronizing Ledger...</span>
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Transmit Story to the Vault</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
