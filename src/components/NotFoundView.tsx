import React from 'react';
import { Compass } from 'lucide-react';

interface NotFoundViewProps {
  onReturnHome: () => void;
}

export default function NotFoundView({ onReturnHome }: NotFoundViewProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <p className="heading-font text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FF5F00] to-red-800 tracking-tighter select-none animate-pulse">
          404
        </p>
        
        <div className="space-y-3 font-mono">
          <h1 className="heading-font text-white font-bold uppercase tracking-widest text-sm text-[#00F0FF]">
            UNRECOGNIZED TRACK PATH
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            The segment or recording you requested has either been archived, shifted out of rotation, or left completely behind in the analog tape storage.
          </p>
        </div>

        <div className="pt-4">
          <button 
            onClick={onReturnHome}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded border border-[#00F0FF] text-[#00F0FF] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#00F0FF] hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition duration-300"
          >
            <Compass size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span>Re-Center Audio Matrix</span>
          </button>
        </div>
      </div>
    </div>
  );
}
