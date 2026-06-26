import React, { useState } from 'react';
import { 
  Sparkles, Music, CheckCircle, Copy, AlertCircle, Play, 
  HelpCircle, ClipboardCheck, ArrowRight, RefreshCw, Layers,
  Share2, Twitter, Instagram, Linkedin, Send, MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';
import { SongCatalogItem } from '../types';

interface ArtistToolkitPanelProps {
  catalog: SongCatalogItem[];
}

export default function ArtistToolkitPanel({ catalog }: ArtistToolkitPanelProps) {
  const [copiedText, setCopiedText] = useState('');

  // --- 1. AI AUTOMATED SOCIAL POST SYNC STATE ---
  const [selectedSongId, setSelectedSongId] = useState(catalog[0]?.id || '');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [isGeneratingSocial, setIsGeneratingSocial] = useState(false);
  const [socialDrafts, setSocialDrafts] = useState<{
    twitter: string;
    instagram: string;
    linkedin: string;
  } | null>(null);
  const [socialTab, setSocialTab] = useState<'twitter' | 'instagram' | 'linkedin'>('twitter');
  const [socialError, setSocialError] = useState('');

  // --- 2. STORY & PRESS RELEASE GENERATOR STATE ---
  const [releaseTitle, setReleaseTitle] = useState('');
  const [releaseVibe, setReleaseVibe] = useState('Nostalgic Pain / Melancholy');
  const [releaseContext, setReleaseContext] = useState('');
  const [draftResult, setDraftResult] = useState('');
  const [generating, setGenerating] = useState(false);

  // --- 3. SPOTIFY PLAYER & INTEGRITY VALIDATOR STATE ---
  const [spotifyInput, setSpotifyInput] = useState('');
  const [extractedEmbed, setExtractedEmbed] = useState('https://open.spotify.com/embed/album/0udTHknZfINCMd8ipkmaGv');
  const [extractedLink, setExtractedLink] = useState('https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv');
  const [spotifyError, setSpotifyError] = useState('');

  // --- 4. DISTRIBUTION CHECKLIST STATE ---
  const [checklist, setChecklist] = useState([
    { id: 'chk-wav', label: 'Audio Master: Stereo WAV (24-bit, 44.1kHz sample rate)', checked: true },
    { id: 'chk-art', label: 'Cover Art Specifications: 3000x3000px, RGB color space, no URL/handles', checked: true },
    { id: 'chk-writer', label: 'Lyric Credits: Complete Legal Name (William Kirby Hartman) listed as Songwriter', checked: false },
    { id: 'chk-explicit', label: 'Explicit Tags: Verified explicit verses, tagged correctly to avoid store rejection', checked: false },
    { id: 'chk-isrc', label: 'ISRC / UPC Codes: Index code matched to physical catalog logs', checked: false },
    { id: 'chk-canvas', label: 'Spotify Canvas: Stretched loops prepared in 9:16 vertical ratio', checked: false }
  ]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const handleGenerateSocials = async (e: React.FormEvent) => {
    e.preventDefault();
    const song = catalog.find(s => s.id === selectedSongId);
    if (!song) {
      setSocialError('Please select a valid release item from the catalog.');
      return;
    }

    setIsGeneratingSocial(true);
    setSocialError('');
    setSocialDrafts(null);

    try {
      const response = await fetch('/api/social/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: song.title,
          artist: song.primaryArtist || 'DoubleU',
          type: song.type,
          genre: song.genre || 'Hip Hop / Americana',
          description: `${song.about}. ${additionalInstructions}`.trim(),
          releaseDate: song.releaseDate,
          isrc: song.isrc,
          upc: song.upc,
          tracks: song.tracks || song.tracklist || []
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate social media drafts.');
      }

      const data = await response.json();
      const rawText = data.drafts || '';

      // Parse output sections
      const twitterMatch = rawText.match(/\[X\/Twitter Draft\]\s*([\s\S]*?)(?=\[Instagram Draft\]|\[Threads\/LinkedIn Story Draft\]|$)/i);
      const instagramMatch = rawText.match(/\[Instagram Draft\]\s*([\s\S]*?)(?=\[X\/Twitter Draft\]|\[Threads\/LinkedIn Story Draft\]|$)/i);
      const linkedinMatch = rawText.match(/\[Threads\/LinkedIn Story Draft\]\s*([\s\S]*?)$/i);

      setSocialDrafts({
        twitter: twitterMatch ? twitterMatch[1].trim() : rawText.slice(0, 250),
        instagram: instagramMatch ? instagramMatch[1].trim() : rawText,
        linkedin: linkedinMatch ? linkedinMatch[1].trim() : rawText
      });
    } catch (err: any) {
      console.error(err);
      setSocialError(err.message || 'Transmission timed out or missing Gemini API key.');
    } finally {
      setIsGeneratingSocial(false);
    }
  };

  const handleGenerateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!releaseTitle.trim()) return;

    setGenerating(true);
    setTimeout(() => {
      const generatedPress = `FOR IMMEDIATE RELEASE

DOUBLEU RECORDINGS ANNOUNCES SATELLITE ENTRY: "${releaseTitle.toUpperCase()}"

OKLAHOMA CITY, OK — DoubleU, the sovereign musical moniker of William Kirby Hartman, officially announces the impending release of "${releaseTitle}". Translating core transitions, biographical losses, and local Oklahoma military foundations into a raw, glowing auditory timeline, "${releaseTitle}" marks another chapter in the "No Stories Left Untold" movement.

Crafted in the heart of OKC, this record leans heavily into ${releaseVibe}.

ABOUT THE NARRATIVE CHRONICLE:
"${releaseContext ? releaseContext : "This piece cataloged transitional shadows, capturing the acoustic footprint of loss and victory."}"

William Hartman explains: "Every human voice carries a coordinate. We do not bury early ruptures; we index them. This track is a direct ledger entry of our survival."

CONTACT CONSOLE:
E: press@doubleuofficial.online | Location: Oklahoma City, OK
Web: https://doubleuofficial.online/${releaseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

      setDraftResult(generatedPress);
      setGenerating(false);
    }, 1000);
  };

  const handleValidateSpotify = (e: React.FormEvent) => {
    e.preventDefault();
    setSpotifyError('');

    if (!spotifyInput.trim()) return;

    // Regex to match track or album IDs from Spotify links
    const albumMatch = spotifyInput.match(/album\/([a-zA-Z0-9]+)/);
    const trackMatch = spotifyInput.match(/track\/([a-zA-Z0-9]+)/);

    if (albumMatch && albumMatch[1]) {
      const id = albumMatch[1];
      setExtractedEmbed(`https://open.spotify.com/embed/album/${id}?utm_source=generator`);
      setExtractedLink(`https://open.spotify.com/album/${id}`);
    } else if (trackMatch && trackMatch[1]) {
      const id = trackMatch[1];
      setExtractedEmbed(`https://open.spotify.com/embed/track/${id}?utm_source=generator`);
      setExtractedLink(`https://open.spotify.com/track/${id}`);
    } else {
      setSpotifyError('INVALID LINK: Could not locate a valid Spotify track or album signature.');
    }
  };

  const toggleCheck = (id: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const checkedCount = checklist.filter(c => c.checked).length;
  const readinessPercentage = Math.round((checkedCount / checklist.length) * 100);

  return (
    <div className="space-y-8">
      
      {/* Introduction Card */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff5f00] to-[#00f0ff]" />
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center rounded text-[#00f0ff]">
            <Layers size={16} />
          </div>
          <div>
            <h2 className="heading-font text-base font-black uppercase text-white tracking-wide">Artist Publishing & Sync Console</h2>
            <p className="text-xs text-zinc-500 font-mono">Tools designed to accelerate and streamline the publishing workflow for DoubleU releases</p>
          </div>
        </div>
      </div>

      {/* --- FEATURE 1: AUTOMATED SOCIAL MEDIA SYNC DRAFER (AI POWERED) --- */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-xl relative">
        <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-l from-emerald-500/20 to-transparent text-[8px] font-mono uppercase font-bold text-emerald-400 rounded-bl-xl border-l border-b border-zinc-900">
          Autopilot Sync Engine
        </div>
        
        <div>
          <h3 className="heading-font text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Share2 size={14} className="text-emerald-400" />
            <span>AI Automated Social Media Sync</span>
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono">
            Automatically draft customized promotional content based on your active catalog's semantic metadata structure
          </p>
        </div>

        <form onSubmit={handleGenerateSocials} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4 font-mono text-xs">
            <div>
              <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Select Catalog Entry</label>
              {catalog.length === 0 ? (
                <div className="text-amber-500/80 bg-amber-500/5 border border-amber-500/20 p-2.5 rounded text-[10px]">
                  No items found in catalog database. Please add songs first.
                </div>
              ) : (
                <select
                  value={selectedSongId}
                  onChange={e => setSelectedSongId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded px-3 py-2.5 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="" disabled>-- Choose Track or Album --</option>
                  {catalog.map(song => (
                    <option key={song.id} value={song.id}>
                      [{song.type.toUpperCase()}] {song.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Custom Sync Directives (Optional)</label>
              <textarea
                rows={3}
                value={additionalInstructions}
                onChange={e => setAdditionalInstructions(e.target.value)}
                placeholder="Add special vibe guidelines, mention a specific collaborator, or focus heavily on lyrics release..."
                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-emerald-500 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none resize-none placeholder-zinc-600"
              />
            </div>

            <button
              type="submit"
              disabled={isGeneratingSocial || catalog.length === 0}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 text-black font-extrabold uppercase tracking-widest rounded transition flex items-center justify-center space-x-2 text-[11px]"
            >
              {isGeneratingSocial ? (
                <>
                  <RefreshCw size={12} className="animate-spin" />
                  <span>CRAWLING METADATA & DRAFTING...</span>
                </>
              ) : (
                <>
                  <Sparkles size={12} />
                  <span>GENERATE PROMOTIONAL COPYS</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col min-h-[220px] bg-zinc-900/20 border border-zinc-900 rounded-xl overflow-hidden">
            {socialError && (
              <div className="p-4 bg-red-500/5 border-b border-red-500/20 text-red-400 font-mono text-[10px] flex items-center space-x-2">
                <AlertCircle size={14} />
                <span>{socialError}</span>
              </div>
            )}

            {!socialDrafts ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-zinc-600 font-mono text-[10px]">
                <Send size={24} className="text-zinc-800 mb-3" />
                <span>Selected metadata values will stream directly into X/Twitter, Instagram, and LinkedIn channels.</span>
                <span className="text-zinc-700 mt-1">Press "Generate" to synchronize the semantic feed.</span>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                {/* Channels tabs */}
                <div className="flex border-b border-zinc-900 bg-zinc-950/40">
                  {(['twitter', 'instagram', 'linkedin'] as const).map(tab => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setSocialTab(tab)}
                      className={`flex-1 py-3 text-center font-mono text-[10px] uppercase font-bold tracking-wider flex items-center justify-center space-x-1.5 border-r border-zinc-900 last:border-r-0 transition ${
                        socialTab === tab 
                          ? tab === 'twitter' ? 'bg-zinc-900 text-[#00f0ff] border-b-2 border-[#00f0ff]'
                            : tab === 'instagram' ? 'bg-zinc-900 text-pink-400 border-b-2 border-pink-400'
                            : 'bg-zinc-900 text-amber-400 border-b-2 border-amber-400'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {tab === 'twitter' && <Twitter size={10} />}
                      {tab === 'instagram' && <Instagram size={10} />}
                      {tab === 'linkedin' && <Linkedin size={10} />}
                      <span className="capitalize">{tab === 'twitter' ? 'X / Twitter' : tab === 'instagram' ? 'Instagram' : 'LinkedIn / Story'}</span>
                    </button>
                  ))}
                </div>

                {/* Draft text representation */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="relative">
                    <pre className="text-zinc-300 font-mono text-[10px] leading-relaxed whitespace-pre-wrap select-all h-36 overflow-y-auto pr-2 scrollbar-thin">
                      {socialTab === 'twitter' ? socialDrafts.twitter : socialTab === 'instagram' ? socialDrafts.instagram : socialDrafts.linkedin}
                    </pre>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                    <div>
                      {socialTab === 'twitter' && (
                        <span>Characters: <span className={socialDrafts.twitter.length > 280 ? "text-red-500" : "text-emerald-400"}>{socialDrafts.twitter.length} / 280</span></span>
                      )}
                      {socialTab === 'instagram' && <span>Optimal for photo slides / Reels descriptions</span>}
                      {socialTab === 'linkedin' && <span>Sovereign independence biography focus</span>}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(
                        socialTab === 'twitter' ? socialDrafts.twitter : socialTab === 'instagram' ? socialDrafts.instagram : socialDrafts.linkedin,
                        `social-${socialTab}`
                      )}
                      className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded font-bold uppercase text-[9px] tracking-widest text-[#00f0ff] hover:text-white transition flex items-center space-x-1"
                    >
                      <Copy size={10} />
                      <span>{copiedText === `social-${socialTab}` ? 'Draft Copied!' : 'Copy Copywriter Draft'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column: Narrative Press Drafter */}
        <div className="xl:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-zinc-900 pb-3 flex justify-between items-center">
            <div>
              <h3 className="heading-font text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Sparkles size={14} className="text-[#ff5f00]" />
                <span>Poetic Story Press Drafter</span>
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono">Draft high-end, brand-aligned press sheets ready for media distribution</p>
            </div>
          </div>

          <form onSubmit={handleGenerateStory} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">Release Title</label>
                <input 
                  type="text"
                  required
                  value={releaseTitle}
                  onChange={e => setReleaseTitle(e.target.value)}
                  placeholder="e.g. Faded 405"
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-[#ff5f00] rounded px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">Auditory Mood Vibe</label>
                <select 
                  value={releaseVibe}
                  onChange={e => setReleaseVibe(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#ff5f00] rounded px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="Nostalgic Pain / Melancholy">Nostalgic Pain / Melancholy</option>
                  <option value="Industrial Trap / OKC Soul">Industrial Trap / OKC Soul</option>
                  <option value="Military Foundations / Early Rupture">Military Foundations / Early Rupture</option>
                  <option value="Sovereign Solitude / Ambient Glow">Sovereign Solitude / Ambient Glow</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">Memories & Life Transitions Behind Track</label>
              <textarea 
                rows={3}
                required
                value={releaseContext}
                onChange={e => setReleaseContext(e.target.value)}
                placeholder="Describe Jacksonville transitions, Oklahoma military bases, family memories, or late night OKC sessions..."
                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-[#ff5f00] rounded px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-2.5 bg-[#ff5f00] hover:bg-[#ff5f00]/90 text-black font-extrabold uppercase tracking-wider rounded transition flex items-center justify-center space-x-2"
            >
              {generating ? (
                <>
                  <RefreshCw size={12} className="animate-spin" />
                  <span>Synthesizing Bio Ledger...</span>
                </>
              ) : (
                <>
                  <Sparkles size={12} />
                  <span>Generate Brand Press Draft</span>
                </>
              )}
            </button>
          </form>

          {draftResult && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-bold">Official Narrative Ready</span>
                <button
                  onClick={() => handleCopy(draftResult, 'draft')}
                  className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded font-mono text-[9px] text-zinc-300 uppercase tracking-widest transition flex items-center space-x-1"
                >
                  <Copy size={10} />
                  <span>{copiedText === 'draft' ? 'Copied Press Release!' : 'Copy Release'}</span>
                </button>
              </div>
              <pre className="bg-zinc-950 p-4 border border-zinc-900 rounded-lg text-[9px] text-zinc-300 font-mono h-56 overflow-y-auto whitespace-pre-wrap select-all leading-relaxed">
                {draftResult}
              </pre>
            </div>
          )}
        </div>

        {/* Right Column: Spotify Embed & Checklist */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* Spotify Verification Validator */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4 shadow-xl">
            <div>
              <h3 className="heading-font text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Music size={14} className="text-[#00f0ff]" />
                <span>Spotify Live Player Validator</span>
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono">Validate song signatures and test iframe embedding structures</p>
            </div>

            <form onSubmit={handleValidateSpotify} className="flex gap-2 font-mono text-xs">
              <input 
                type="text"
                value={spotifyInput}
                onChange={e => setSpotifyInput(e.target.value)}
                placeholder="Paste Spotify Link (Album or Track)"
                className="flex-grow bg-zinc-900/60 border border-zinc-800 focus:border-[#00f0ff] rounded px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
              <button 
                type="submit"
                className="px-3 py-2 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-extrabold uppercase text-[10px] tracking-wider rounded transition shrink-0"
              >
                Sync
              </button>
            </form>

            {spotifyError && (
              <div className="p-2.5 bg-red-500/5 border border-red-500/20 text-red-400 font-mono text-[9px] rounded flex items-center space-x-1.5">
                <AlertCircle size={12} />
                <span>{spotifyError}</span>
              </div>
            )}

            {/* Embedded Active Player */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Active Player Audio Verification</span>
              <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-900 h-20 relative">
                <iframe 
                  src={extractedEmbed}
                  width="100%" 
                  height="80" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="absolute inset-0"
                  title="Spotify Player Node"
                />
              </div>
              <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
                <span className="truncate max-w-[200px]">Active URL: {extractedLink}</span>
                <button 
                  onClick={() => handleCopy(extractedLink, 'link')}
                  className="hover:text-white transition flex items-center space-x-0.5"
                >
                  <Copy size={8} />
                  <span>{copiedText === 'link' ? 'Copied Link!' : 'Copy URL'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Distribution Checklist */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4 shadow-xl">
            <div>
              <h3 className="heading-font text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <ClipboardCheck size={14} className="text-emerald-400" />
                <span>Pre-Distribution Readiness Audit</span>
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono">Dynamic checklist ensuring 100% submission compliance scores</p>
            </div>

            {/* Progress Gauge */}
            <div className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-zinc-300 block">Readiness Score</span>
                <span className="text-[9px] font-mono text-zinc-500 block">Complete checklist to maximize compliance index</span>
              </div>
              <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="transparent" stroke="#18181b" strokeWidth="4" />
                  <circle 
                    cx="24" 
                    cy="24" 
                    r="20" 
                    fill="transparent" 
                    stroke={readinessPercentage === 100 ? '#10b981' : readinessPercentage >= 50 ? '#ff5f00' : '#ef4444'} 
                    strokeWidth="4" 
                    strokeDasharray={2 * Math.PI * 20}
                    strokeDashoffset={2 * Math.PI * 20 * (1 - readinessPercentage / 100)}
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute text-[10px] font-mono font-black text-white">{readinessPercentage}%</span>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
              {checklist.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="w-full text-left p-2.5 bg-zinc-900/20 hover:bg-zinc-900/50 border border-zinc-900 rounded-lg flex items-start space-x-2.5 transition"
                >
                  <div className={`mt-0.5 h-4 w-4 border rounded flex items-center justify-center shrink-0 transition ${
                    item.checked 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                      : 'bg-zinc-950 border-zinc-800 text-transparent'
                  }`}>
                    <CheckCircle size={10} className="fill-current" />
                  </div>
                  <span className={`text-[10px] font-mono leading-relaxed transition ${
                    item.checked ? 'text-zinc-400 line-through' : 'text-zinc-200'
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {readinessPercentage === 100 && (
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] rounded-lg text-center font-bold">
                ✓ ALL COMPLIANCE METRIC GAUGES MAXIMIZED. SECURE SHIPMENT CLEARANCE.
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
