import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Shield, MapPin, Send, CheckCircle, HelpCircle } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    context: 'Booking / Live Presentation',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', context: 'Booking / Live Presentation', message: '' });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      {/* Editorial Header */}
      <header className="border-b border-slate-900 pb-6 mb-12">
        <span className="heading-font text-xs uppercase tracking-widest text-[#00F0FF] font-bold">Studio Dispatch Console</span>
        <h1 className="heading-font text-4xl font-black tracking-tight text-white uppercase mt-2">
          CONNECT WITH <span className="text-[#FF5F00]">THE STUDIO</span>
        </h1>
        <p className="text-xs font-mono text-slate-500 mt-1 uppercase">Oklahoma City // 405 Region Archive</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Information block */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="heading-font text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-2">
            Operational Parameters
          </h3>
          
          <div className="space-y-4 font-mono text-xs">
            {/* Base */}
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-lg flex items-start space-x-3">
              <MapPin size={16} className="text-[#00F0FF] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">OPERATIONAL BASE</p>
                <p className="text-white mt-1 text-sm font-sans font-medium">Oklahoma City, Oklahoma</p>
                <p className="text-slate-600 mt-0.5 text-[10px]">405 Region Archive Node</p>
              </div>
            </div>

            {/* Press */}
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-lg flex items-start space-x-3">
              <Mail size={16} className="text-[#00F0FF] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">MEDIA & PRESS INQUIRIES</p>
                <p className="text-[#00F0FF] mt-1 text-sm font-sans break-all font-medium select-all">
                  management@doubleuofficial.online
                </p>
              </div>
            </div>

            {/* Organization */}
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-lg flex items-start space-x-3">
              <Shield size={16} className="text-[#FF5F00] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-slate-500 font-bold uppercase text-[9px] tracking-wider">CREATIVE MOVEMENT</p>
                <p className="text-[#FF5F00] mt-1 text-sm font-sans font-medium">
                  No Stories Left Behind Records
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form block */}
        <div className="md:col-span-7">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950/80 border border-[#00F0FF]/30 rounded-xl p-8 text-center space-y-4 backdrop-blur"
            >
              <div className="inline-flex p-3 bg-[#00F0FF]/10 text-[#00F0FF] rounded-full">
                <CheckCircle size={28} />
              </div>
              <h3 className="heading-font text-lg font-bold text-white uppercase tracking-wide">
                Transmission Securely Logged
              </h3>
              <p className="text-xs text-slate-400 font-mono max-w-sm mx-auto leading-relaxed">
                Your coordinates and dispatch details have been securely written to the master registry node. Our management team will establish contact once routing is complete.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 border border-slate-800 rounded uppercase tracking-widest text-[10px] text-slate-300 hover:border-[#00F0FF] hover:text-[#00F0FF] font-mono transition duration-300"
              >
                Transmit Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1.5">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Agency, Booking Representative"
                  className="w-full bg-slate-950/60 border border-slate-800/80 rounded px-4 py-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#00F0FF] hover:border-slate-800 transition"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. representative@agency.com"
                  className="w-full bg-slate-950/60 border border-slate-800/80 rounded px-4 py-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#00F0FF] hover:border-slate-800 transition"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1.5">
                  Inquiry Context
                </label>
                <select
                  value={formData.context}
                  onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800/80 rounded px-4 py-3 text-xs font-mono text-slate-400 focus:outline-none focus:border-[#00F0FF] hover:border-slate-800 transition"
                >
                  <option>Booking / Live Presentation</option>
                  <option>Press / Interview Request</option>
                  <option>Distribution / Licensing</option>
                  <option>General Correspondence</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1.5">
                  Secure Message Transmission
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your prompt, scheduling proposal, or license inquiry. Transmissions are private."
                  className="w-full bg-slate-950/60 border border-slate-800/80 rounded px-4 py-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#FF5F00] hover:border-slate-800 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#00F0FF] to-[#FF5F00] hover:shadow-[0_0_20px_rgba(255,95,0,0.3)] text-black font-mono text-xs font-bold py-4 rounded uppercase tracking-widest transition duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-3 w-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Matrix Signal...</span>
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Transmit Message To Vault</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
