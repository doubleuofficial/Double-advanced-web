import React from 'react';
import { CATALOG } from '../data';
import { SongCatalogItem } from '../types';
import { motion } from 'motion/react';
import { Music, Play, Volume2, ArrowLeft, ArrowUpRight, ListMusic, Disc, ShoppingBag, FileText } from 'lucide-react';

interface DiscographyViewProps {
  selectedItemId: string | null;
  onNavigate: (route: 'home' | 'about' | 'discography' | 'contact' | 'privacy', itemId?: string) => void;
  catalog?: SongCatalogItem[];
}

export default function DiscographyView({ selectedItemId, onNavigate, catalog = CATALOG }: DiscographyViewProps) {
  
  // If a specific song/album detail is requested, render the template-based view
  if (selectedItemId) {
    const item = catalog.find(c => c.id === selectedItemId);
    if (!item) {
      return (
        <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4 font-mono">
          <p className="text-red-500 font-bold uppercase text-sm tracking-widest">RECORD DISCREPANCY</p>
          <p className="text-slate-500 text-xs">The catalog ID requested is unrecognized by this terminal node.</p>
          <button 
            onClick={() => onNavigate('discography')}
            className="px-4 py-2 border border-slate-800 rounded uppercase tracking-widest text-[10px] text-slate-300 hover:border-[#00F0FF] hover:text-[#00F0FF]"
          >
            Reset Archive
          </button>
        </div>
      );
    }

    const isAlbum = item.type === 'album';

    return (
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Dynamic Breadcrumbs */}
        <div className="flex items-center space-x-2 font-mono text-[10px] tracking-widest uppercase text-slate-500">
          <button onClick={() => onNavigate('home')} className="hover:text-[#00F0FF] transition">Vault Home</button>
          <span>//</span>
          <button onClick={() => onNavigate('discography')} className="hover:text-[#00F0FF] transition">Discography</button>
          <span>//</span>
          <span className="text-slate-300 font-medium">{item.type}</span>
        </div>

        {/* Back navigation */}
        <button
          onClick={() => onNavigate('discography')}
          className="flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-[#00F0FF] uppercase tracking-widest transition duration-300"
        >
          <ArrowLeft size={12} />
          <span>Return to Catalog Grid</span>
        </button>

        {/* Master Album / Track Details Area */}
        <section className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          {/* Cover Art frame */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 bg-slate-950 border border-slate-900 rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-2xl group">
            <img 
              src={item.image} 
              alt={`${item.title} Artwork Cover`} 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 font-mono text-[9px] text-slate-400 flex justify-between border-t border-slate-900/40 pt-2 bg-slate-950/60 backdrop-blur-sm px-2.5 py-1.5 rounded">
              <span>{item.metaLeft}</span>
              <span>{item.metaRight}</span>
            </div>
          </div>

          {/* Descriptive Area */}
          <div className="space-y-6 flex-grow text-center lg:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full font-mono text-[10px] tracking-widest text-[#FF5F00] uppercase">
                <span className="w-1.5 h-1.5 bg-[#FF5F00] rounded-full animate-pulse"></span>
                <span>{item.type} Log // Secure Entry</span>
              </div>
              <h1 className="heading-font text-4xl md:text-5xl font-black text-white uppercase tracking-tight selection:bg-[#FF5F00] selection:text-black">
                {item.title}
              </h1>
              {item.subHeading && (
                <p className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest font-semibold">
                  {item.subHeading}
                </p>
              )}
            </div>

            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {item.about}
            </p>

            {/* Link vector arrays */}
            <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href={item.spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3 border border-[#1ED760]/30 hover:border-[#1ED760] bg-[#1ED760]/5 hover:bg-[#1ED760]/10 text-xs font-mono uppercase font-bold tracking-widest text-[#1ED760] rounded-lg transition duration-300"
              >
                <Music size={12} />
                <span>Spotify Feed</span>
                <ArrowUpRight size={10} />
              </a>
              {item.appleMusicLink && (
                <a
                  href={item.appleMusicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-3 border border-pink-500/30 hover:border-pink-500 bg-pink-500/5 hover:bg-pink-500/10 text-xs font-mono uppercase font-bold tracking-widest text-pink-400 rounded-lg transition duration-300"
                >
                  <Disc size={12} />
                  <span>Apple Music</span>
                  <ArrowUpRight size={10} />
                </a>
              )}
              {item.youtubeLink && (
                <a
                  href={item.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-3 border border-red-500/30 hover:border-red-500 bg-red-500/5 hover:bg-red-500/10 text-xs font-mono uppercase font-bold tracking-widest text-red-400 rounded-lg transition duration-300"
                >
                  <Play size={12} />
                  <span>YouTube Video</span>
                  <ArrowUpRight size={10} />
                </a>
              )}
              {item.purchaseLink && (
                <a
                  href={item.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-3 border border-[#ff5f00]/30 hover:border-[#ff5f00] bg-[#ff5f00]/5 hover:bg-[#ff5f00]/10 text-xs font-mono uppercase font-bold tracking-widest text-[#ff5f00] rounded-lg transition duration-300"
                >
                  <ShoppingBag size={12} />
                  <span>Buy / Bandcamp</span>
                  <ArrowUpRight size={10} />
                </a>
              )}
            </div>

            {/* Enhanced Technical Metadata block */}
            {(item.primaryArtist || item.genre || item.producer || item.isrc || item.upc) && (
              <div className="pt-6 border-t border-slate-900 mt-6 text-left">
                <h4 className="font-mono text-[9px] text-[#00F0FF] uppercase tracking-widest font-bold mb-3">TECHNICAL ARCHIVE METADATA</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-950/40 border border-slate-900 rounded-xl p-4 font-mono text-[10px]">
                  {item.primaryArtist && (
                    <div>
                      <span className="text-slate-500 uppercase block text-[8px] tracking-wider">Primary Artist</span>
                      <span className="text-slate-200 uppercase font-bold">{item.primaryArtist}</span>
                    </div>
                  )}
                  {item.genre && (
                    <div>
                      <span className="text-slate-500 uppercase block text-[8px] tracking-wider">Genre</span>
                      <span className="text-slate-200 uppercase font-bold">{item.genre}</span>
                    </div>
                  )}
                  {item.producer && (
                    <div>
                      <span className="text-slate-500 uppercase block text-[8px] tracking-wider">Producer</span>
                      <span className="text-slate-200 uppercase font-bold">{item.producer}</span>
                    </div>
                  )}
                  {item.isrc && (
                    <div>
                      <span className="text-slate-500 uppercase block text-[8px] tracking-wider">ISRC Identifier</span>
                      <span className="text-slate-300 uppercase select-all font-semibold">{item.isrc}</span>
                    </div>
                  )}
                  {item.upc && (
                    <div>
                      <span className="text-slate-500 uppercase block text-[8px] tracking-wider">UPC Barcode</span>
                      <span className="text-slate-300 uppercase select-all font-semibold">{item.upc}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Lyrics & Embed Section */}
        {item.lyrics && (
          <section className="border-t border-slate-900 pt-12">
            <h3 className="heading-font text-xs font-bold text-[#ff5f00] uppercase tracking-widest flex items-center space-x-2 mb-4">
              <FileText size={12} />
              <span>Record Lyric Manuscript & Transcript</span>
            </h3>
            <div className="bg-slate-950/20 border border-slate-900 rounded-2xl p-6 md:p-8 font-mono text-xs text-slate-400 max-h-96 overflow-y-auto whitespace-pre-line leading-relaxed tracking-wide select-text">
              {item.lyrics}
            </div>
          </section>
        )}

        {/* Dynamic Section: Tracklist vs Spotify Embed */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-slate-900 pt-12">
          {/* Spotify Direct player embed (Col 1 to 7) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="heading-font text-xs font-bold text-[#00F0FF] uppercase tracking-widest flex items-center space-x-2">
              <Volume2 size={12} />
              <span>Direct Audio Stream Matrix</span>
            </h3>
            <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden p-1 shadow-2xl">
              <iframe
                style={{ borderRadius: '12px' }}
                src={item.spotifyEmbedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`${item.title} Spotify Stream`}
              ></iframe>
            </div>
          </div>

          {/* Tracklist layout for Albums & EPs (Col 8 to 12) */}
          {(item.type === 'album' || item.type === 'ep') && (item.tracks || item.tracklist) && (
            <div className="lg:col-span-5 space-y-4">
              <h3 className="heading-font text-xs font-bold text-[#FF5F00] uppercase tracking-widest flex items-center space-x-2">
                <ListMusic size={12} />
                <span>Tracklist Chronicles</span>
              </h3>
              <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 font-mono text-xs text-slate-400 space-y-3 shadow-inner">
                {item.tracks && item.tracks.length > 0 ? (
                  item.tracks.map((track, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-900/40 last:border-0 hover:text-white transition group">
                      <span className="flex items-center space-x-2">
                        <span className="text-[#00F0FF] text-[10px] font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                        <span>{track.title}</span>
                      </span>
                      {track.url ? (
                        <a 
                          href={track.url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-[9px] font-mono font-bold text-[#00f0ff] hover:text-white hover:border-[#00f0ff] uppercase tracking-widest flex items-center space-x-1 transition duration-200"
                        >
                          <Play size={8} className="fill-current" />
                          <span>Stream</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-600 uppercase font-bold">Standard Mix</span>
                      )}
                    </div>
                  ))
                ) : item.tracklist ? (
                  item.tracklist.map((track, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-900/40 last:border-0 hover:text-white transition">
                      <span className="flex items-center space-x-2">
                        <span className="text-[#00F0FF] text-[10px] font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                        <span>{track}</span>
                      </span>
                      <span className="text-[10px] text-slate-600 uppercase font-bold">Standard Mix</span>
                    </div>
                  ))
                ) : null}
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }

  // Split into Albums vs Singles
  const albums = catalog.filter(item => item.type === 'album' || item.type === 'ep');
  const singles = catalog.filter(item => item.type === 'single');

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      
      {/* Dynamic Header */}
      <header className="border-b border-slate-900 pb-8 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full font-mono text-[10px] tracking-widest text-[#00F0FF] uppercase">
          <Disc size={10} className="text-[#FF5F00] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Catalog Index // Verified Masters</span>
        </div>
        <h1 className="heading-font text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          DOUBLEU <span className="text-[#00F0FF]">ARCHIVES</span>
        </h1>
        <p className="text-xs font-mono text-slate-500 uppercase">
          Continuous catalog tracking // Spotify Verified Entity
        </p>
      </header>

      {/* Spotify Artist Hub Embed */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-900/60 pb-2">
          <span className="w-2 h-2 rounded-full bg-[#1ED760] animate-pulse" />
          <h2 className="heading-font text-xs font-bold text-slate-400 uppercase tracking-widest">
            Verified Spotify Artist Hub Feed
          </h2>
        </div>
        <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden p-1 shadow-2xl">
          <iframe 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/artist/78gVqbaxxYAd9aLEZJ49YG?utm_source=generator" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="DoubleU Official Artist Feed"
          ></iframe>
        </div>
      </section>

      {/* Albums & EPs Layout */}
      <section className="space-y-6">
        <h2 className="heading-font text-lg font-bold text-[#FF5F00] uppercase tracking-wider border-b border-slate-900 pb-2 flex items-center space-x-2">
          <span>Albums & EPs</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {albums.map((item) => (
            <div 
              key={item.id} 
              className="bg-slate-950/40 border border-slate-900 hover:border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row gap-6 backdrop-blur group transition duration-300"
            >
              <div className="relative w-full md:w-36 h-36 aspect-square rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between py-1">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block">{item.metaLeft}</span>
                  <h3 className="heading-font text-lg font-bold text-white uppercase group-hover:text-[#00F0FF] transition duration-200">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2">{item.about}</p>
                </div>
                <button
                  onClick={() => onNavigate('discography', item.id)}
                  className="mt-4 md:mt-0 py-2 bg-slate-900 hover:bg-[#FF5F00]/10 border border-slate-800/80 hover:border-[#FF5F00] rounded font-mono text-[9px] uppercase font-bold text-slate-300 hover:text-[#FF5F00] tracking-widest transition duration-300"
                >
                  Inspect Extended Record
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Singles Layout */}
      <section className="space-y-6">
        <h2 className="heading-font text-lg font-bold text-[#00F0FF] uppercase tracking-wider border-b border-slate-900 pb-2 flex items-center space-x-2">
          <span>Singles</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {singles.map((item) => (
            <div 
              key={item.id} 
              className="bg-slate-950/40 border border-slate-900 hover:border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row gap-6 backdrop-blur group transition duration-300"
            >
              <div className="relative w-full md:w-36 h-36 aspect-square rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between py-1">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block">{item.metaLeft}</span>
                  <h3 className="heading-font text-lg font-bold text-white uppercase group-hover:text-[#00F0FF] transition duration-200">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2">{item.about}</p>
                </div>
                <button
                  onClick={() => onNavigate('discography', item.id)}
                  className="mt-4 md:mt-0 py-2 bg-slate-900 hover:bg-[#00F0FF]/10 border border-slate-800/80 hover:border-[#00F0FF] rounded font-mono text-[9px] uppercase font-bold text-slate-300 hover:text-[#00F0FF] tracking-widest transition duration-300"
                >
                  Inspect Single Record
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
