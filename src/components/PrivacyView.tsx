import React from 'react';
import { Eye, Shield, Lock, FileText, Info } from 'lucide-react';

export default function PrivacyView() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      {/* Editorial Header */}
      <header className="border-b border-slate-900/80 pb-8 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full font-mono text-[10px] tracking-widest text-[#00F0FF] uppercase">
          <Eye size={10} className="text-[#00F0FF]" />
          <span>Data Protocol // Verified Transparent</span>
        </div>
        <h1 className="heading-font text-4xl font-black tracking-tight text-white uppercase">
          PRIVACY <span className="text-[#FF5F00]">REGISTRY</span>
        </h1>
        <p className="font-mono text-xs text-slate-500 uppercase">Last Synchronized: June 2026</p>
      </header>

      {/* Registry Text Content */}
      <article className="space-y-10 text-xs md:text-sm text-slate-400 font-light leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3 border-l-2 border-[#00F0FF]/30 pl-4 py-1">
          <h2 className="heading-font text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Shield size={14} className="text-[#00F0FF]" />
            <span>1.0 Infrastructure Overview</span>
          </h2>
          <p>
            This Privacy Registry details how this independent audio platform collects, safeguards, and utilizes terminal parameters. Built entirely on the <span className="text-slate-200 font-normal">No Stories Left Behind</span> ethos, we treat your tracking footprint with absolute transparency. We do not exploit or exchange personal details.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 border-l-2 border-[#FF5F00]/30 pl-4 py-1">
          <h2 className="heading-font text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Lock size={14} className="text-[#FF5F00]" />
            <span>2.0 Advertising & Vendor Data Architecture</span>
          </h2>
          <p>
            This site integrates <span className="text-slate-200 font-normal">Google AdSense</span> to deploy monetization assets. Google and third-party vendors use technical cookies (such as the DART cookie) to serve contextualized layouts based on a user's previous sequence of nodes visited across this and other domains on the network.
          </p>
          
          <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl font-mono text-[10px] text-slate-400 flex items-start space-x-3">
            <Info size={16} className="text-[#00F0FF] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#00F0FF] uppercase block mb-1">SYSTEM NODE NOTICE</span>
              You may completely decline or opt out of personalized network ads by adjusting parameters inside your terminal console via the official{' '}
              <a 
                href="https://adssettings.google.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#00F0FF] underline hover:text-[#FF5F00] transition"
              >
                Google Ads Settings
              </a>.
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 border-l-2 border-[#00F0FF]/30 pl-4 py-1">
          <h2 className="heading-font text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <FileText size={14} className="text-[#00F0FF]" />
            <span>3.0 Information Log Files</span>
          </h2>
          <p>
            Standard operational logging protocols are maintained for maintenance diagnostics. These records register network IP addresses, browser versions, Internet Service Provider (ISP) signatures, date/time matrices, and navigation exit sequences. This data layer does not link to identifiable personal files.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 border-l-2 border-[#FF5F00]/30 pl-4 py-1">
          <h2 className="heading-font text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Eye size={14} className="text-[#FF5F00]" />
            <span>4.0 External Vector Redirects</span>
          </h2>
          <p>
            The audio catalog maps out directly to third-party distribution vectors (including Spotify, Apple Music, and YouTube). DoubleU Recordings does not govern the backend operational rules of these external database nodes. Review their native parameters for tracking governance.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 border-l-2 border-[#00F0FF]/30 pl-4 py-1">
          <h2 className="heading-font text-base font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Info size={14} className="text-[#00F0FF]" />
            <span>5.0 Complete Consensual Control</span>
          </h2>
          <p>
            By interacting within this concrete hub, you acknowledge and authorize the tracking frameworks described above. If you do not accept these network behaviors, configure your local client browser to refuse tracking cookies before executing further connections.
          </p>
        </section>

      </article>
    </div>
  );
}
