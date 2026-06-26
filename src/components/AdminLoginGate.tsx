import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Terminal, Key, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLoginGateProps {
  onAuthorize: () => void;
  onExit: () => void;
}

export default function AdminLoginGate({ onAuthorize, onExit }: AdminLoginGateProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPassword = password.trim().toLowerCase();
    if (!cleanPassword) return;

    setIsDecrypting(true);
    setError('');

    setTimeout(() => {
      // Allow 'doubleu405' or 'admin' as authorized passcodes case-insensitively
      if (cleanPassword === 'doubleu405' || cleanPassword === 'admin') {
        onAuthorize();
      } else {
        setError('DECRYPTION FAILURE: INVALID COMPILER ACCESS TOKEN KEY.');
        setPassword('');
      }
      setIsDecrypting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-text">
      {/* Dynamic tech-grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-orange/5 rounded-full filter blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full filter blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-zinc-950 border border-zinc-900 rounded-2xl p-8 relative shadow-2xl space-y-6"
      >
        {/* Glow borders */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff5f00] to-[#00f0ff]" />

        {/* Header Indicator */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-12 w-12 bg-[#ff5f00]/10 border border-[#ff5f00]/30 flex items-center justify-center rounded-xl text-[#ff5f00] shadow-[0_0_15px_rgba(255,95,0,0.1)]">
            <Shield size={22} className="animate-pulse" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-extrabold">
              SECURED SUITE COHORT
            </span>
            <h2 className="heading-font text-xl font-black text-white uppercase tracking-tight">
              Artist Console Gate
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              Authorized decrypted credentials strictly verified.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                Access Token Passcode
              </label>
              <span className="text-[8px] text-zinc-600 font-semibold uppercase">
                Area 405 OKC Registry
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-zinc-600">
                <Key size={14} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••••••"
                disabled={isDecrypting}
                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-[#ff5f00] focus:outline-none rounded px-10 py-3 text-slate-100 transition tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded flex items-start space-x-2.5 text-red-400">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              <span className="text-[9px] font-mono leading-relaxed">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isDecrypting}
            className="w-full py-3.5 bg-gradient-to-r from-[#ff5f00] to-[#00f0ff] text-black font-extrabold uppercase tracking-widest rounded hover:shadow-[0_0_20px_rgba(255,95,0,0.35)] transition duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2"
          >
            {isDecrypting ? (
              <>
                <div className="h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>DECRYPTING SECURE CHANNELS...</span>
              </>
            ) : (
              <span>VERIFY SECURITY TOKEN</span>
            )}
          </button>
        </form>

        {/* Bottom Help Section & Back Button */}
        <div className="pt-4 border-t border-zinc-900 space-y-3 text-center">
          <p className="text-[9px] text-zinc-500 font-mono uppercase leading-relaxed">
            Hint: Oklahoma City Regional Code ID / Master Key <br />
            <span className="text-[#00f0ff] font-bold">Passcode: doubleu405</span>
          </p>
          <button
            onClick={onExit}
            className="text-[9px] font-mono text-zinc-500 hover:text-white uppercase font-bold tracking-widest transition"
          >
            &larr; Safely Return to Public Vault
          </button>
        </div>
      </motion.div>
    </div>
  );
}
