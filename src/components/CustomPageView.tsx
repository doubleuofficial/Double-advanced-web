import React from 'react';
import { Page, Entity } from '../types';
import { motion } from 'motion/react';
import { Globe, FileCode, CheckCircle2, Link2, Landmark, User } from 'lucide-react';

interface CustomPageViewProps {
  page: Page;
  allEntities: Entity[];
  onNavigate: (route: string) => void;
}

export default function CustomPageView({ page, allEntities, onNavigate }: CustomPageViewProps) {
  // Get entities referenced in this page
  const pageEntities = allEntities.filter(ent => page.entities?.includes(ent.id));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-6 py-12 space-y-10 font-sans bg-[#0c0c0e] text-[#e2e8f0]"
    >
      {/* Dynamic Route Header */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[#00F0FF] text-xs font-mono uppercase tracking-wider">
            <Globe size={14} className="animate-spin" style={{ animationDuration: '10s' }} />
            <span>Active SEO Route Matrix // /{page.id}</span>
          </div>
          <h1 className="text-2xl font-bold text-white heading-font uppercase tracking-tight">{page.title}</h1>
          <p className="text-xs text-zinc-500 font-mono">Last modified: {page.dateModified}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 size={10} />
            <span>Googlebot Crawled</span>
          </span>
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono font-bold text-[#ff5f00] uppercase tracking-wider">
            <FileCode size={10} />
            <span>Schema.org Live</span>
          </span>
        </div>
      </div>

      {/* Main Page Content Card */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 shadow-2xl space-y-6">
        <div 
          className="prose prose-invert max-w-none text-zinc-300 leading-relaxed font-sans text-base space-y-4"
          dangerouslySetInnerHTML={{ __html: page.content || '<p class="text-zinc-500 italic">No content written for this page yet. Edit this page in the Artist Suite.</p>' }}
        />

        {/* Canonical Reference */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            <span className="font-bold text-zinc-400">Canonical URL:</span>{' '}
            <span className="text-[#00F0FF] underline">https://doubleuofficial.online/{page.id === 'home' ? '' : page.id}</span>
          </div>
          <div className="text-zinc-600">
            SEO Index: Index, Follow
          </div>
        </div>
      </div>

      {/* Associated Knowledge Entities (Crucial for Entity Recognition) */}
      {pageEntities.length > 0 && (
        <div className="space-y-4">
          <div className="border-b border-zinc-900 pb-2">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider heading-font">Declared Knowledge Graph Entities</h3>
            <p className="text-xs text-zinc-600 font-sans">These entities are injected into this page's Schema.org JSON-LD to train Google's entity matching brain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pageEntities.map(ent => (
              <div 
                key={ent.id}
                className="bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-xl p-5 shadow-2xl transition-all duration-200 flex items-start space-x-4"
              >
                <div className="p-2.5 bg-zinc-900 text-[#00F0FF] rounded-lg shrink-0">
                  {ent.type === 'Person' ? <User size={18} /> : <Landmark size={18} />}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-white heading-font uppercase">{ent.name}</h4>
                    <span className="text-[9px] font-mono font-bold bg-zinc-900 border border-zinc-800 text-[#ff5f00] px-2 py-0.5 rounded uppercase tracking-wider">
                      {ent.type}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{ent.description}</p>
                  
                  {/* SameAs links */}
                  {ent.authoritativeUrl && (
                    <div className="pt-2 flex items-center space-x-2">
                      <a 
                        href={ent.authoritativeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[10px] font-mono text-[#00F0FF] hover:underline"
                      >
                        <Link2 size={10} className="text-[#00F0FF]" />
                        <span>Authority Link</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Navigation Help */}
      <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-xl text-center space-y-3 shadow-inner">
        <p className="text-xs text-zinc-500 font-sans">
          This page is fully integrated into the sitemap and sitemap.xml registries.
        </p>
        <button 
          onClick={() => onNavigate('home')}
          className="text-xs font-mono text-[#ff5f00] hover:text-[#00F0FF] uppercase font-bold tracking-widest transition"
        >
          &larr; Return to main portal
        </button>
      </div>
    </motion.div>
  );
}
