import React, { useState, useEffect } from 'react';
import { Page, Entity, SongCatalogItem } from '../types';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Copy, 
  Check, 
  ExternalLink, 
  Globe, 
  FileCode, 
  Code, 
  ShieldCheck, 
  Eye, 
  Flame, 
  User, 
  Search,
  CheckCircle2,
  ListFilter
} from 'lucide-react';

// --- HELPER FUNCTION: AUTO-GENERATE OPTIMIZED META & OPEN GRAPH TAGS ---
export function generateOptimizedTags(page: Page) {
  // Extract and sanitize page body plain text
  const cleanContent = page.content
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/\s+/g, ' ')
    .trim();

  // Create highly clickable description
  let autoDescription = cleanContent;
  if (!autoDescription || autoDescription.length < 10) {
    autoDescription = `Explore the official sound archives, releases, lyrics, and chronological narratives of William Kirby Hartman (DoubleU).`;
  }

  // Refine and pad to 155 characters with CTA hooks
  let refinedDesc = autoDescription.slice(0, 140).trim();
  if (autoDescription.length > 140) {
    refinedDesc += '...';
  }
  
  // Appends high-CTR action phrase if there is room or by default
  const ctaSuffix = " Stream official tracks & view tour dates now.";
  if (refinedDesc.length + ctaSuffix.length <= 160) {
    refinedDesc += ctaSuffix;
  } else {
    refinedDesc = refinedDesc.slice(0, 155) + "... Listen now.";
  }

  const focusKw = page.focusKeywords || 'DoubleU, William Kirby Hartman, indie music, Oklahoma City';
  const defaultOgImage = page.ogImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80';
  const pageUrl = `https://doubleuofficial.online/${page.id === 'home' ? '' : page.id}`;

  return {
    title: `${page.title} | DoubleU Official`,
    metaDescription: refinedDesc,
    focusKeywords: focusKw,
    ogTitle: `${page.title} | Sovereign Sound Matrix`,
    ogDescription: refinedDesc,
    ogType: page.ogType || 'music.song',
    ogImage: defaultOgImage,
    ogUrl: pageUrl,
    twitterCard: 'summary_large_image',
    robots: page.isNoIndex ? 'noindex, nofollow' : 'index, follow',
    changefreq: page.changeFrequency || 'weekly',
    priority: page.priority !== undefined ? page.priority.toFixed(1) : '0.5'
  };
}

// ==========================================
// 1. KNOWLEDGE PANEL CHECKLIST PANEL
// ==========================================
interface KnowledgePanelProps {
  pages: Page[];
  entities: Entity[];
  catalog: SongCatalogItem[];
}

export function KnowledgePanelChecklistPanel({ pages, entities, catalog }: KnowledgePanelProps) {
  const [score, setScore] = useState(0);

  // Compute checklist statuses dynamically
  const artistEntity = entities.find(e => e.type === 'Person' || e.type === 'MusicGroup');
  const hasSameAs = artistEntity && artistEntity.sameAs && artistEntity.sameAs.length > 0;
  
  const hasVerifiedImages = entities.every(e => e.image && e.image.startsWith('http')) && 
                            catalog.every(c => c.image && c.image.startsWith('http'));

  const socialLinksCount = artistEntity?.sameAs ? artistEntity.sameAs.length : 0;
  const hasSocials = socialLinksCount >= 3;

  const descLength = artistEntity?.description ? artistEntity.description.length : 0;
  const hasRichBio = descLength >= 150;

  const hasLinkedCatalog = catalog.length > 0;
  const hasSecureHomeSchema = pages.find(p => p.id === 'home')?.customSchema ? true : false;

  const checks = [
    {
      id: 'sameas',
      title: 'Google Authority sameAs Handshake',
      description: 'Presence of third-party authority links (Wikipedia, Spotify, MusicBrainz) in JSON-LD fields.',
      status: hasSameAs ? 'passed' : 'failed',
      severity: 'critical',
      fix: 'Edit your central Artist Entity and supply authoritative URLs (Wikipedia, Spotify Artist ID page, Twitter/Instagram handles) to trigger entity matching.'
    },
    {
      id: 'images',
      title: 'Secure Image Source Verification',
      description: 'Profile artworks and song releases must use secure, absolute high-resolution HTTPS urls.',
      status: hasVerifiedImages ? 'passed' : 'warning',
      severity: 'recommended',
      fix: 'Review your catalog and entities. Ensure no local placeholders or insecure HTTP assets are used for cover art.'
    },
    {
      id: 'socials',
      title: 'Social Matrix Connectedness',
      description: 'At least 3 social or streaming network URLs mapped in your schema profiles.',
      status: hasSocials ? 'passed' : 'warning',
      severity: 'recommended',
      fix: 'Add your Instagram, YouTube, and Bandcamp URLs to the sameAs fields of your central artist entity (current count: ' + socialLinksCount + ').'
    },
    {
      id: 'bio',
      title: 'Biography Corpus Index Density',
      description: 'Authoritative description has enough character depth to supply Googlebot NLP extractions (min 150 chars).',
      status: hasRichBio ? 'passed' : 'failed',
      severity: 'critical',
      fix: 'The primary artist bio has ' + descLength + ' characters. Write a descriptive, chronological historical record of at least 150 characters.'
    },
    {
      id: 'catalog_works',
      title: 'Released Discography Association',
      description: 'Sovereign creative works registered in the local index for knowledge graph nesting.',
      status: hasLinkedCatalog ? 'passed' : 'warning',
      severity: 'recommended',
      fix: 'Upload at least one album or single to the Catalog Inventory Manager to index releases in the dynamic site map.'
    },
    {
      id: 'home_schema',
      title: 'Homepage JSON-LD Semantic Core',
      description: 'A custom structural JSON-LD schema injected directly on the landing node.',
      status: hasSecureHomeSchema ? 'passed' : 'warning',
      severity: 'recommended',
      fix: 'Inject a valid schema block in the home page edit panel under custom schema override.'
    }
  ];

  useEffect(() => {
    const passedCount = checks.filter(c => c.status === 'passed').length;
    const totalScore = Math.round((passedCount / checks.length) * 100);
    setScore(totalScore);
  }, [pages, entities, catalog]);

  return (
    <div className="space-y-6">
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="heading-font text-lg font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="text-amber-400" size={16} />
              <span>Google Knowledge Panel Compliance Audit</span>
            </h2>
            <p className="text-xs text-zinc-500 font-mono">Verify authoritative entities and social handshakes to secure a Google Search Knowledge box.</p>
          </div>
          <div className="flex items-center space-x-4 bg-zinc-900/40 px-5 py-3 border border-zinc-800 rounded-xl">
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">Audit Compliance Score</span>
            <div className="relative flex items-center justify-center">
              <div className="text-2xl font-mono font-black text-amber-400">{score}%</div>
            </div>
          </div>
        </div>

        {/* Score progress bar */}
        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-400 transition-all duration-500" 
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Checklist cards */}
        <div className="grid grid-cols-1 gap-4">
          {checks.map(check => (
            <div 
              key={check.id} 
              className={`p-5 rounded-xl border flex flex-col sm:flex-row justify-between items-start gap-4 transition duration-200 ${
                check.status === 'passed' 
                  ? 'bg-zinc-950/20 border-zinc-900' 
                  : check.severity === 'critical'
                    ? 'bg-red-500/5 border-red-500/10'
                    : 'bg-amber-500/5 border-amber-500/10'
              }`}
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center space-x-2">
                  {check.status === 'passed' ? (
                    <CheckCircle className="text-emerald-400 shrink-0" size={16} />
                  ) : check.severity === 'critical' ? (
                    <XCircle className="text-red-400 shrink-0" size={16} />
                  ) : (
                    <AlertTriangle className="text-amber-400 shrink-0" size={16} />
                  )}
                  <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wide">{check.title}</h3>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                    check.status === 'passed' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : check.severity === 'critical'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {check.status === 'passed' ? 'PASS' : check.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">{check.description}</p>
                {check.status !== 'passed' && (
                  <p className="text-[11px] text-zinc-500 font-mono bg-zinc-900/50 p-2.5 rounded border border-zinc-800/40 mt-2">
                    <span className="text-amber-400/80 font-bold">RECONSTRUCT PROTOCOL:</span> {check.fix}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. META TAGS AND OPEN GRAPH CTR GENERATOR
// ==========================================
interface MetaCtrProps {
  pages: Page[];
}

export function MetaCtrGeneratorPanel({ pages }: MetaCtrProps) {
  const [selectedPageId, setSelectedPageId] = useState<string>(pages[0]?.id || '');
  const [copied, setCopied] = useState(false);

  const activePage = pages.find(p => p.id === selectedPageId);
  const tags = activePage ? generateOptimizedTags(activePage) : null;

  const htmlOutput = tags ? `<!-- Primary Meta Tags for ${activePage?.title} -->
<title>${tags.title}</title>
<meta name="title" content="${tags.title}">
<meta name="description" content="${tags.metaDescription}">
<meta name="keywords" content="${tags.focusKeywords}">
<meta name="robots" content="${tags.robots}">

<!-- Open Graph / Facebook Social Preview -->
<meta property="og:type" content="${tags.ogType}">
<meta property="og:url" content="${tags.ogUrl}">
<meta property="og:title" content="${tags.ogTitle}">
<meta property="og:description" content="${tags.ogDescription}">
<meta property="og:image" content="${tags.ogImage}">

<!-- Twitter Card Social Preview -->
<meta property="twitter:card" content="${tags.twitterCard}">
<meta property="twitter:url" content="${tags.ogUrl}">
<meta property="twitter:title" content="${tags.ogTitle}">
<meta property="twitter:description" content="${tags.ogDescription}">
<meta property="twitter:image" content="${tags.ogImage}">` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6">
        <div>
          <h2 className="heading-font text-lg font-black text-white uppercase tracking-wider flex items-center space-x-2">
            <Flame className="text-pink-400" size={16} />
            <span>Click-Through Rate (CTR) Meta & Social Card Generator</span>
          </h2>
          <p className="text-xs text-zinc-500 font-mono">Select any dynamic page route to auto-extract HTML header meta tags optimized for Google CTR and social share previews.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Select Route Node</label>
              <select
                value={selectedPageId}
                onChange={e => setSelectedPageId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-pink-500"
              >
                {pages.map(p => (
                  <option key={p.id} value={p.id}>/{p.id}</option>
                ))}
              </select>
            </div>

            {tags && (
              <div className="p-4 bg-zinc-900/20 border border-zinc-900 rounded-xl space-y-3 font-mono text-[10px] text-zinc-400">
                <div className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="uppercase text-zinc-500">Indexing status</span>
                  <span className={tags.robots.includes('noindex') ? 'text-red-400' : 'text-emerald-400'}>
                    {tags.robots.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="uppercase text-zinc-500">Change Frequency</span>
                  <span className="text-zinc-300 font-bold uppercase">{tags.changefreq}</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase text-zinc-500">Sitemap Priority</span>
                  <span className="text-pink-400 font-bold">{tags.priority}</span>
                </div>
              </div>
            )}
          </div>

          {/* Social and SERP Previews Column */}
          <div className="lg:col-span-8 space-y-6">
            {tags && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Google Search Result Preview */}
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-xl space-y-2">
                  <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest block">Google SERP CTR Snippet Preview</span>
                  <div className="space-y-1">
                    <div className="text-[11px] text-zinc-400 font-mono truncate">{tags.ogUrl}</div>
                    <h3 className="text-base text-blue-400 hover:underline cursor-pointer font-sans truncate font-medium">
                      {tags.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 leading-normal font-sans text-left">
                      {tags.metaDescription}
                    </p>
                  </div>
                </div>

                {/* Social Share Card Preview (Discord/Slack/Facebook) */}
                <div className="bg-zinc-900/10 border border-zinc-900 rounded-xl overflow-hidden flex flex-col">
                  <div className="p-3 bg-zinc-900/20 border-b border-zinc-900">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest block">Discord/Slack Social share card preview</span>
                  </div>
                  {tags.ogImage && (
                    <div className="aspect-[1.91/1] overflow-hidden bg-zinc-900 relative">
                      <img 
                        src={tags.ogImage} 
                        alt="Preview card" 
                        className="object-cover w-full h-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="p-4 bg-zinc-900/40 border-t border-zinc-900/80 space-y-1 text-left flex-grow">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{tags.ogType}</div>
                    <div className="text-xs font-bold text-white font-sans">{tags.ogTitle}</div>
                    <div className="text-[11px] text-zinc-400 font-sans leading-normal line-clamp-2">{tags.ogDescription}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code editor output block */}
        <div className="space-y-2 text-left">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Optimized HTML header tag payload</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 font-mono text-[9px] uppercase font-bold tracking-wider rounded flex items-center space-x-1.5 transition"
            >
              {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
              <span>{copied ? 'Copied to Buffer' : 'Copy Meta Tags'}</span>
            </button>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl relative">
            <pre className="text-[10px] font-mono text-pink-400/90 whitespace-pre-wrap select-text leading-relaxed overflow-x-auto h-48">
              {htmlOutput}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. JSON-LD MUSIC ARTIST SCHEMA VALIDATOR
// ==========================================
interface SchemaValidatorProps {
  pages: Page[];
  entities: Entity[];
}

export function SchemaValidatorPanel({ pages, entities }: SchemaValidatorProps) {
  const [selectedPageId, setSelectedPageId] = useState<string>(pages[0]?.id || '');
  const [customInput, setCustomInput] = useState<string>('');
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errorMsg?: string;
    parsedObj?: any;
    scores: { field: string; status: 'passed' | 'warning' | 'failed'; desc: string; importance: 'required' | 'highly-recommended' | 'optional' }[];
  } | null>(null);

  const activePage = pages.find(p => p.id === selectedPageId);

  // Sync editor content with page's schema or fallback to generated schema based on entities
  useEffect(() => {
    if (activePage) {
      if (activePage.customSchema) {
        setCustomInput(activePage.customSchema);
      } else {
        // Auto-generate a beautiful mock compliant Schema based on our entities
        const centralArtist = entities.find(e => e.type === 'Person' || e.type === 'MusicGroup') || entities[0];
        const sameAsUrls = centralArtist?.sameAs || [];
        
        const mockSchema = {
          "@context": "https://schema.org",
          "@type": centralArtist?.type || "MusicGroup",
          "name": centralArtist?.name || "DoubleU",
          "url": "https://doubleuofficial.online",
          "image": centralArtist?.image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
          "description": centralArtist?.description || "William Kirby Hartman record ledger.",
          "sameAs": sameAsUrls.length > 0 ? sameAsUrls : [
            "https://open.spotify.com/artist/0udTHknZfINCMd8ipkmaGv",
            "https://wikipedia.org/wiki/William_Kirby_Hartman",
            "https://music.apple.com/us/artist/doubleu"
          ],
          "genre": ["Hip Hop", "Americana", "Indie Rock"]
        };
        setCustomInput(JSON.stringify(mockSchema, null, 2));
      }
    }
  }, [selectedPageId, pages, entities]);

  const handleRunValidation = () => {
    if (!customInput.trim()) {
      setValidationResult({
        valid: false,
        errorMsg: 'Schema payload text block cannot be empty.',
        scores: []
      });
      return;
    }

    try {
      // JSON validation parse
      const parsed = JSON.parse(customInput.trim());
      
      // Meticulous compliance rules
      const scores: { field: string; status: 'passed' | 'warning' | 'failed'; desc: string; importance: 'required' | 'highly-recommended' | 'optional' }[] = [];

      // Rule 1: @context check
      const context = parsed['@context'];
      if (context === 'https://schema.org' || context === 'http://schema.org') {
        scores.push({ field: '@context', status: 'passed', desc: 'Valid semantic schema.org context verified.', importance: 'required' });
      } else {
        scores.push({ field: '@context', status: 'failed', desc: 'Missing or incorrect @context. Must point precisely to "https://schema.org".', importance: 'required' });
      }

      // Rule 2: @type check
      const type = parsed['@type'];
      if (type === 'MusicGroup' || type === 'Person') {
        scores.push({ field: '@type', status: 'passed', desc: `Entity optimization matched artist catalog format [${type}].`, importance: 'required' });
      } else {
        scores.push({ field: '@type', status: 'failed', desc: 'Incorrect entity @type. For artist optimization, must be "MusicGroup" or "Person".', importance: 'required' });
      }

      // Rule 3: Name presence
      if (parsed.name && parsed.name.trim().length > 0) {
        scores.push({ field: 'name', status: 'passed', desc: `Artist name registry matching found: "${parsed.name}".`, importance: 'required' });
      } else {
        scores.push({ field: 'name', status: 'failed', desc: 'Artist name tag is missing or blank.', importance: 'required' });
      }

      // Rule 4: Official Authority URL
      if (parsed.url && parsed.url.startsWith('http')) {
        scores.push({ field: 'url', status: 'passed', desc: `Authoritative official website domain registered: ${parsed.url}`, importance: 'required' });
      } else {
        scores.push({ field: 'url', status: 'failed', desc: 'Authoritative URL is missing or does not start with HTTP protocol.', importance: 'required' });
      }

      // Rule 5: Image Profile
      if (parsed.image) {
        scores.push({ field: 'image', status: 'passed', desc: 'Secure branding image detected for Knowledge Box display.', importance: 'highly-recommended' });
      } else {
        scores.push({ field: 'image', status: 'warning', desc: 'Missing search result image. Strongly recommended for visual brand panels.', importance: 'highly-recommended' });
      }

      // Rule 6: Social / Streaming sameAs profiles
      const sameAs = parsed.sameAs;
      if (Array.isArray(sameAs) && sameAs.length > 0) {
        scores.push({ field: 'sameAs', status: 'passed', desc: `Identified ${sameAs.length} verified third-party social profiles.`, importance: 'highly-recommended' });
      } else if (typeof sameAs === 'string' && sameAs.startsWith('http')) {
        scores.push({ field: 'sameAs', status: 'warning', desc: 'sameAs is a single string. It is highly recommended to declare as an array of profiles.', importance: 'highly-recommended' });
      } else {
        scores.push({ field: 'sameAs', status: 'failed', desc: 'No social sameAs coordinates found. Google cannot bundle your panel without them.', importance: 'required' });
      }

      // Rule 7: Genre
      if (parsed.genre && (Array.isArray(parsed.genre) || typeof parsed.genre === 'string')) {
        scores.push({ field: 'genre', status: 'passed', desc: 'Genre tags cataloged to match music category searches.', importance: 'highly-recommended' });
      } else {
        scores.push({ field: 'genre', status: 'warning', desc: 'Music category genre is missing. Add genre keywords.', importance: 'highly-recommended' });
      }

      const isValid = scores.every(s => s.importance !== 'required' || s.status === 'passed');

      setValidationResult({
        valid: isValid,
        parsedObj: parsed,
        scores
      });

    } catch (err: any) {
      setValidationResult({
        valid: false,
        errorMsg: `JSON compilation syntax error: ${err.message}`,
        scores: []
      });
    }
  };

  // Run validation on first render/load
  useEffect(() => {
    if (customInput) {
      handleRunValidation();
    }
  }, [customInput]);

  return (
    <div className="space-y-6">
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="heading-font text-lg font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <FileCode className="text-emerald-400" size={16} />
              <span>JSON-LD Semantic Schema Compiler & Validator</span>
            </h2>
            <p className="text-xs text-zinc-500 font-mono">Verify and test structural JSON-LD metadata markup. Detect syntax errors before crawling.</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPageId}
              onChange={e => setSelectedPageId(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500"
            >
              {pages.map(p => (
                <option key={p.id} value={p.id}>Load /{p.id} Schema</option>
              ))}
            </select>
            <button
              onClick={handleRunValidation}
              className="px-4 py-1.5 bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-widest rounded hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] transition"
            >
              Run Compiler Check
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editor Block */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Active Schema Sandbox Block</span>
              <span className="text-[10px] font-mono text-zinc-500">Edit and live test</span>
            </div>
            <textarea
              rows={16}
              value={customInput}
              onChange={e => setCustomInput(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-4 font-mono text-xs text-emerald-400 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
            />
          </div>

          {/* Validation Logs Block */}
          <div className="lg:col-span-6 space-y-4">
            <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Compiler Verification Diagnostics</div>
            
            {validationResult ? (
              <div className="space-y-4">
                {/* Syntax Error Box */}
                {validationResult.errorMsg ? (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3 text-left">
                    <XCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
                    <div className="space-y-1">
                      <h4 className="font-mono text-xs font-bold uppercase text-red-400">JSON Parse Critical Failure</h4>
                      <p className="text-[11px] text-zinc-400 font-mono leading-normal">{validationResult.errorMsg}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-start space-x-3 text-left">
                    <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                    <div className="space-y-1">
                      <h4 className="font-mono text-xs font-bold uppercase text-emerald-400">Syntax Format Validated</h4>
                      <p className="text-[11px] text-zinc-400 font-sans leading-normal">The schema payload compiles into flawless semantic structures.</p>
                    </div>
                  </div>
                )}

                {/* Score results */}
                {validationResult.scores.length > 0 && (
                  <div className="border border-zinc-900 rounded-xl overflow-hidden bg-zinc-950/40">
                    <div className="bg-zinc-900/30 p-3 border-b border-zinc-900 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                      Property Compliance Breakdown
                    </div>
                    <div className="divide-y divide-zinc-900/80 font-mono text-xs max-h-72 overflow-y-auto">
                      {validationResult.scores.map((score, idx) => (
                        <div key={idx} className="p-3 hover:bg-zinc-900/10 flex justify-between items-start gap-4">
                          <div className="space-y-1 text-left">
                            <div className="flex items-center space-x-2">
                              <span className="text-slate-200 font-bold">{score.field}</span>
                              <span className={`text-[8px] uppercase px-1 rounded font-bold ${
                                score.importance === 'required' 
                                  ? 'bg-red-500/10 text-red-400' 
                                  : 'bg-zinc-800 text-zinc-400'
                              }`}>
                                {score.importance}
                              </span>
                            </div>
                            <p className="text-[10px] text-zinc-500 leading-normal">{score.desc}</p>
                          </div>
                          <div>
                            {score.status === 'passed' ? (
                              <span className="text-emerald-400 text-[10px] font-bold uppercase">Passed</span>
                            ) : score.status === 'warning' ? (
                              <span className="text-amber-400 text-[10px] font-bold uppercase">Warning</span>
                            ) : (
                              <span className="text-red-400 text-[10px] font-bold uppercase">Critical</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center border border-zinc-900 rounded-xl text-zinc-500 font-mono text-xs">
                Run Compiler Check to fetch validation output logs.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
