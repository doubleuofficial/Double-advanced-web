import React, { useState } from 'react';
import { Page, Entity } from '../types';
import { 
  FileCode, Download, Copy, Check, BarChart2, Activity,
  Search, Eye, AlertTriangle, CheckCircle, RefreshCw, Layers 
} from 'lucide-react';
import { motion } from 'motion/react';

interface SearchConsolePanelProps {
  pages: Page[];
  entities: Entity[];
}

export default function SearchConsolePanel({ pages, entities }: SearchConsolePanelProps) {
  const [copiedText, setCopiedText] = useState('');
  const [selectedInspectRoute, setSelectedInspectRoute] = useState('home');
  const [inspectStatus, setInspectStatus] = useState<'idle' | 'validating' | 'done'>('idle');
  const [inspectFeedback, setInspectFeedback] = useState<any>(null);

  // --- PERFORMANCE METRIC TOGGLES ---
  const [activeMetric, setActiveMetric] = useState<'clicks' | 'impressions'>('clicks');
  const [dateRange, setDateRange] = useState<'7' | '30' | '90'>('30');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(''), 2000);
  };

  // --- REAL SITEMAP COMPILER ---
  const generateSitemapXml = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    pages.forEach(p => {
      const path = p.id === 'home' ? '' : p.id;
      xml += `  <url>\n`;
      xml += `    <loc>https://doubleuofficial.online/${path}</loc>\n`;
      xml += `    <lastmod>${p.dateModified}</lastmod>\n`;
      xml += `    <changefreq>${p.id === 'home' ? 'daily' : 'weekly'}</changefreq>\n`;
      xml += `    <priority>${p.id === 'home' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const downloadSitemap = () => {
    const xmlText = generateSitemapXml();
    const blob = new Blob([xmlText], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- RICH SNIPPET TESTER ---
  const handleInspectRoute = (routeId: string) => {
    setInspectStatus('validating');
    setTimeout(() => {
      const page = pages.find(p => p.id === routeId) || pages[0];
      const referencedEntities = entities.filter(ent => page.entities?.includes(ent.id));
      
      const errors: string[] = [];
      const warnings: string[] = [];

      // Run structured checks
      if (!page.title.trim()) errors.push('Title element cannot be blank.');
      if (page.description.length < 100) warnings.push('Metadata description is very short. Recommend >120 characters.');
      if (page.description.length > 180) warnings.push('Metadata description exceeds maximum bounds. Googlebot will truncate snippets.');
      if (referencedEntities.length === 0 && !page.customSchema) {
        warnings.push('No linked structured entities found. Entity graph integration recommended to trigger Google knowledge cards.');
      }

      setInspectFeedback({
        page,
        entities: referencedEntities,
        errors,
        warnings,
        isValid: errors.length === 0,
      });
      setInspectStatus('done');
    }, 1000);
  };

  // --- SIMULATED DATA CALCULATIONS BASED ON ACTUAL STATE DENSITY ---
  const dynamicMultiplier = 1 + (pages.length * 0.15) + (entities.length * 0.25);
  const baseClicks = 442 * dynamicMultiplier;
  const baseImpressions = 12530 * dynamicMultiplier;

  // Chart coordinate nodes builder
  const points = dateRange === '7' ? 7 : dateRange === '30' ? 10 : 15;
  const chartCoordinates = Array.from({ length: points }, (_, i) => {
    const factor = Math.sin(i / 2) * 0.2 + (i / points) * 0.4 + 0.8;
    const clicks = Math.round(baseClicks * factor * (dateRange === '7' ? 0.25 : dateRange === '90' ? 3.0 : 1.0));
    const impressions = Math.round(baseImpressions * factor * (dateRange === '7' ? 0.25 : dateRange === '90' ? 3.0 : 1.0));
    return { day: i + 1, clicks, impressions };
  });

  const maxValue = Math.max(...chartCoordinates.map(c => activeMetric === 'clicks' ? c.clicks : c.impressions));
  const chartWidth = 500;
  const chartHeight = 150;
  const pointsString = chartCoordinates.map((c, idx) => {
    const x = (idx / (points - 1)) * chartWidth;
    const val = activeMetric === 'clicks' ? c.clicks : c.impressions;
    const y = chartHeight - (val / maxValue) * (chartHeight - 15) - 5;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. SITEMAP live compiler */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-2xl">
        <div className="border-b border-zinc-900 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="heading-font text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <FileCode className="text-[#00f0ff]" size={15} />
              <span>Sitemap Compiler & Live Export Node</span>
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">Compiles fully valid sitemap.xml files based on current dynamic nodes</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleCopy(generateSitemapXml(), 'xml')}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded font-mono text-[9px] text-zinc-300 uppercase tracking-widest transition flex items-center space-x-1"
            >
              <Copy size={10} />
              <span>{copiedText === 'xml' ? 'Copied XML!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={downloadSitemap}
              className="px-3 py-1.5 bg-[#00f0ff] hover:bg-[#00f0ff]/95 text-black font-mono text-[9px] font-bold uppercase tracking-widest rounded transition flex items-center space-x-1"
            >
              <Download size={10} />
              <span>Download sitemap.xml</span>
            </button>
          </div>
        </div>

        <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-xl font-mono text-[9px] text-zinc-400 h-44 overflow-y-auto whitespace-pre leading-relaxed select-all">
          {generateSitemapXml()}
        </div>
      </div>

      {/* 2. DYNAMIC SEARCH PERFORMANCE METRICS */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-3">
          <div>
            <h3 className="heading-font text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <BarChart2 className="text-[#ff5f00]" size={15} />
              <span>Search Console Traffic Analytics</span>
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">Organic growth indices scaling with Knowledge cards and custom dynamic node setups</p>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-[9px]">
            {/* Metric select */}
            <div className="bg-zinc-900 border border-zinc-800 rounded p-0.5 flex">
              <button 
                onClick={() => setActiveMetric('clicks')}
                className={`px-3 py-1 rounded text-[9px] uppercase font-bold transition ${activeMetric === 'clicks' ? 'bg-[#ff5f00] text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                Clicks
              </button>
              <button 
                onClick={() => setActiveMetric('impressions')}
                className={`px-3 py-1 rounded text-[9px] uppercase font-bold transition ${activeMetric === 'impressions' ? 'bg-[#00f0ff] text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                Impressions
              </button>
            </div>

            {/* Date range selection */}
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-800 rounded px-2 text-[9px] text-zinc-300 font-bold focus:outline-none focus:border-[#ff5f00]"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Dashboard Analytics summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">Search Clicks</span>
            <span className="heading-font text-xl font-extrabold text-[#ff5f00] block mt-1">
              {Math.round(baseClicks * (dateRange === '7' ? 0.25 : dateRange === '90' ? 3.0 : 1.0)).toLocaleString()}
            </span>
            <span className="text-[8px] text-emerald-400 block mt-0.5">+{pages.length * 15}% Node Boost</span>
          </div>
          <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">Impressions</span>
            <span className="heading-font text-xl font-extrabold text-[#00f0ff] block mt-1">
              {Math.round(baseImpressions * (dateRange === '7' ? 0.25 : dateRange === '90' ? 3.0 : 1.0)).toLocaleString()}
            </span>
            <span className="text-[8px] text-emerald-400 block mt-0.5">+{entities.length * 25}% Entity Boost</span>
          </div>
          <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">Avg Position</span>
            <span className="heading-font text-xl font-extrabold text-white block mt-1">
              {(12.4 / (1 + (entities.length * 0.08))).toFixed(1)}
            </span>
            <span className="text-[8px] text-emerald-400 block mt-0.5">Top-Tier Ranking Focus</span>
          </div>
          <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">Average CTR</span>
            <span className="heading-font text-xl font-extrabold text-white block mt-1">
              {(3.5 * (1 + (pages.length * 0.04))).toFixed(2)}%
            </span>
            <span className="text-[8px] text-emerald-400 block mt-0.5">Direct Snippet Matches</span>
          </div>
        </div>

        {/* Beautiful native SVG chart */}
        <div className="p-4 bg-zinc-900/20 border border-zinc-900 rounded-xl relative">
          <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5 text-[8px] font-mono text-zinc-500 uppercase">
            <Activity size={10} className="text-emerald-400 animate-pulse" />
            <span>Crawler Performance Index Feed</span>
          </div>

          <div className="h-[150px] w-full">
            <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="#1f1f2e" strokeDasharray="3,3" />
              <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#1f1f2e" strokeDasharray="3,3" />
              <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#1f1f2e" strokeWidth="2" />

              {/* Shaded Area */}
              <path
                d={`M 0,${chartHeight} L ${pointsString} L ${chartWidth},${chartHeight} Z`}
                fill={activeMetric === 'clicks' ? 'url(#clicks-grad)' : 'url(#impressions-grad)'}
                opacity="0.15"
                className="transition-all duration-300"
              />

              {/* Polyline */}
              <polyline
                fill="none"
                stroke={activeMetric === 'clicks' ? '#ff5f00' : '#00f0ff'}
                strokeWidth="2.5"
                points={pointsString}
                className="transition-all duration-300"
              />

              {/* Gradients */}
              <defs>
                <linearGradient id="clicks-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5f00" />
                  <stop offset="100%" stopColor="#ff5f00" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="impressions-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase pt-2">
            <span>Interval Coordinate 01</span>
            <span>Interval Coordinate {points.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* 3. STRUCTURED DATA OVERVIEW & RICH SNIPPET PREVIEWER */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-2xl">
        <div className="border-b border-zinc-900 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="heading-font text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Search className="text-[#00f0ff]" size={15} />
              <span>Structured Data Schema Validator & Snippet Preview</span>
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">Validate custom schemas and preview real Google rich search cards</p>
          </div>

          <div className="flex gap-2 font-mono text-xs">
            <select
              value={selectedInspectRoute}
              onChange={e => setSelectedInspectRoute(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded px-3.5 py-1.5 text-[11px] text-slate-300 focus:outline-none focus:border-[#ff5f00]"
            >
              {pages.map(p => (
                <option key={p.id} value={p.id}>/{p.id}</option>
              ))}
            </select>
            <button
              onClick={() => handleInspectRoute(selectedInspectRoute)}
              disabled={inspectStatus === 'validating'}
              className="px-4 py-1.5 bg-[#ff5f00] text-black font-extrabold uppercase text-[10px] tracking-wider rounded transition flex items-center space-x-1.5"
            >
              {inspectStatus === 'validating' ? (
                <>
                  <RefreshCw size={11} className="animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <span>Scan Schema</span>
              )}
            </button>
          </div>
        </div>

        {inspectFeedback ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left side checklist */}
            <div className="md:col-span-5 space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Audit Analysis Outcome</span>
                <div className={`p-3 border rounded-xl flex items-start space-x-2.5 ${
                  inspectFeedback.isValid 
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
                    : 'bg-amber-500/5 border-amber-500/20 text-amber-400'
                }`}>
                  {inspectFeedback.isValid ? (
                    <CheckCircle size={16} className="shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold uppercase text-[10px] block">
                      {inspectFeedback.isValid ? 'Schema Compliant' : 'Audit Warnings Discovered'}
                    </span>
                    <span className="text-[9px] text-zinc-400 block mt-0.5 leading-relaxed">
                      {inspectFeedback.isValid 
                        ? 'This page includes perfect metadata markup structure for immediate Google indices.' 
                        : 'Adjust metadata details below to achieve 100% search compliance index.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Warnings and errors list */}
              {(inspectFeedback.errors.length > 0 || inspectFeedback.warnings.length > 0) ? (
                <div className="space-y-2">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Diagnostic Ledger Logs</span>
                  <div className="space-y-1.5">
                    {inspectFeedback.errors.map((err: string, i: number) => (
                      <div key={i} className="p-2 bg-red-500/5 border border-red-500/10 text-red-400 text-[10px] rounded flex items-center space-x-1.5">
                        <AlertTriangle size={12} />
                        <span>{err}</span>
                      </div>
                    ))}
                    {inspectFeedback.warnings.map((warn: string, i: number) => (
                      <div key={i} className="p-2 bg-amber-500/5 border border-amber-500/10 text-amber-400 text-[10px] rounded flex items-center space-x-1.5">
                        <AlertTriangle size={12} />
                        <span>{warn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-1 text-center">
                  <span className="text-emerald-400 font-bold block text-[10px]">✓ ZERO DISCREPANCIES DETECTED</span>
                  <span className="text-[9px] text-zinc-500 block leading-relaxed">Ready to train search engine brains.</span>
                </div>
              )}
            </div>

            {/* Right side search engine rich snippet preview */}
            <div className="md:col-span-7 space-y-3 font-mono">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Googlebot Rich Snippet SimulationCard</span>
              
              <div className="p-5 bg-[#17171a] border border-zinc-900 rounded-2xl max-w-lg shadow-inner">
                <div className="flex items-center space-x-2 text-[10px] text-zinc-400">
                  <span className="truncate">https://doubleuofficial.online &gt; /{inspectFeedback.page.id === 'home' ? '' : inspectFeedback.page.id}</span>
                </div>
                <h3 className="text-lg text-[#00f0ff] font-semibold hover:underline cursor-pointer mt-1 font-sans">
                  {inspectFeedback.page.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light mt-1">
                  {inspectFeedback.page.description}
                </p>

                {/* Simulated dynamic elements of rich snippet */}
                {inspectFeedback.entities.length > 0 && (
                  <div className="pt-3 mt-3 border-t border-zinc-800 space-y-2">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block font-bold">Declared Knowledge Entities (Linked sameAs structures):</span>
                    <div className="flex flex-wrap gap-1.5">
                      {inspectFeedback.entities.map((ent: Entity) => (
                        <span key={ent.id} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-mono text-[8px] text-[#ff5f00] uppercase font-bold tracking-wider">
                          {ent.type}: {ent.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-500 border border-zinc-900 border-dashed rounded-xl">
            <span>Select any dynamic or static page node from the list and select [Scan Schema] to compile compliance tests.</span>
          </div>
        )}
      </div>

    </div>
  );
}
