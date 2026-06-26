import React, { useState, useEffect, useRef } from 'react';
import { SongCatalogItem } from '../types';
import { 
  TrendingUp, Users, Activity, BarChart2, Zap, Play, Radio, 
  Calendar, ArrowUpRight, DollarSign, Disc, ListMusic, MapPin, 
  Percent, Globe, Sparkles, RefreshCw, Smartphone, Monitor
} from 'lucide-react';

interface MusicAnalyticsPanelProps {
  catalog: SongCatalogItem[];
}

interface StreamDataPoint {
  label: string; // date or month
  streams: number;
}

interface PlaylistPlacement {
  name: string;
  curator: string;
  streamsContributed: number;
  status: 'LIVE' | 'PENDING' | 'REMOVED';
  addedDate: string;
}

interface LiveStreamPlay {
  id: string;
  timestamp: string;
  city: string;
  region: string;
  trackTitle: string;
  platform: 'Spotify' | 'Apple Music' | 'YouTube' | 'Tidal';
  device: 'mobile' | 'desktop' | 'tablet';
}

export default function MusicAnalyticsPanel({ catalog }: MusicAnalyticsPanelProps) {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '12m'>('30d');
  const [isLiveListening, setIsLiveListening] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);
  
  // Real-time simulated log stream state
  const [livePlays, setLivePlays] = useState<LiveStreamPlay[]>([]);
  const tickerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize live plays log
  useEffect(() => {
    const initialPlays: LiveStreamPlay[] = [
      { id: 'p1', timestamp: 'Just now', city: 'Oklahoma City', region: 'OK', trackTitle: 'Faded 405', platform: 'Spotify', device: 'mobile' },
      { id: 'p2', timestamp: '12s ago', city: 'Jacksonville', region: 'FL', trackTitle: 'Jacksonville Rupture', platform: 'Apple Music', device: 'desktop' },
      { id: 'p3', timestamp: '45s ago', city: 'Hopkinsville', region: 'KY', trackTitle: 'Band Room Blueprint', platform: 'YouTube', device: 'mobile' },
      { id: 'p4', timestamp: '2m ago', city: 'Chicago', region: 'IL', trackTitle: 'Dear Author', platform: 'Spotify', device: 'tablet' },
      { id: 'p5', timestamp: '4m ago', city: 'Oklahoma City', region: 'OK', trackTitle: 'Nights On The Fault', platform: 'Tidal', device: 'mobile' }
    ];
    setLivePlays(initialPlays);
  }, []);

  // Real-time live plays generation simulation
  useEffect(() => {
    if (isLiveListening) {
      tickerIntervalRef.current = setInterval(() => {
        const cities = [
          { city: 'Oklahoma City', region: 'OK' },
          { city: 'Jacksonville', region: 'FL' },
          { city: 'Hopkinsville', region: 'KY' },
          { city: 'Los Angeles', region: 'CA' },
          { city: 'Chicago', region: 'IL' },
          { city: 'New York', region: 'NY' },
          { city: 'London', region: 'UK' },
          { city: 'Atlanta', region: 'GA' },
          { city: 'Nashville', region: 'TN' },
          { city: 'Miami', region: 'FL' }
        ];

        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        
        // Find a random song from catalog
        const catalogSongs = catalog.length > 0 ? catalog : [
          { title: 'Faded 405' }, 
          { title: 'Dear Author' }, 
          { title: 'Jacksonville Rupture' },
          { title: 'Susie\'s Sanctuary' }
        ];
        const randomSong = catalogSongs[Math.floor(Math.random() * catalogSongs.length)];
        const trackName = randomSong.title;

        const platforms: ('Spotify' | 'Apple Music' | 'YouTube' | 'Tidal')[] = ['Spotify', 'Apple Music', 'YouTube', 'Tidal'];
        const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

        const devices: ('mobile' | 'desktop' | 'tablet')[] = ['mobile', 'desktop', 'tablet'];
        const randomDevice = devices[Math.floor(Math.random() * devices.length)];

        const newPlay: LiveStreamPlay = {
          id: 'p_' + Math.random().toString(36).substr(2, 9),
          timestamp: 'Just now',
          city: randomCity.city,
          region: randomCity.region,
          trackTitle: trackName,
          platform: randomPlatform,
          device: randomDevice
        };

        setLivePlays(prev => {
          // Update previous 'Just now' labels to timestamps
          const updatedPrev = prev.map((p, idx) => {
            if (idx === 0) return { ...p, timestamp: '10s ago' };
            if (idx === 1) return { ...p, timestamp: '1m ago' };
            if (idx === 2) return { ...p, timestamp: '3m ago' };
            if (idx === 3) return { ...p, timestamp: '5m ago' };
            return { ...p, timestamp: `${idx + 5}m ago` };
          });
          return [newPlay, ...updatedPrev.slice(0, 9)];
        });
      }, 5000);
    } else {
      if (tickerIntervalRef.current) {
        clearInterval(tickerIntervalRef.current);
      }
    }

    return () => {
      if (tickerIntervalRef.current) {
        clearInterval(tickerIntervalRef.current);
      }
    };
  }, [isLiveListening, catalog]);

  // Synchronize loading animation trigger
  const handleSyncData = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  // --- DERIVE ANALYTICS FIGURES BASED ON SELECTED TRACK & TIMEFRAME ---
  // Seed distinct performance metrics per track item for deep reality
  const getTrackMetrics = () => {
    if (selectedTrackId === 'all') {
      return {
        totalStreams: 550840,
        monthlyListeners: 72350,
        playlistsCount: 46,
        revenue: 2203.36,
        spotifyShare: 62,
        appleShare: 21,
        youtubeShare: 14,
        tidalShare: 3,
        growthRate: 14.2,
        topCities: [
          { city: 'Oklahoma City', code: 'OKC, US', streams: '132,201', percentage: 24 },
          { city: 'Jacksonville', code: 'JAX, US', streams: '99,151', percentage: 18 },
          { city: 'Hopkinsville', code: 'HPK, US', streams: '77,117', percentage: 14 },
          { city: 'Los Angeles', code: 'LAX, US', streams: '55,084', percentage: 10 },
          { city: 'Chicago', code: 'ORD, US', streams: '44,067', percentage: 8 }
        ],
        playlists: [
          { name: 'RapCaviar', curator: 'Spotify Editorial', streamsContributed: 142104, status: 'LIVE', addedDate: '2026-06-15' },
          { name: 'Mellow Bars', curator: 'Spotify Editorial', streamsContributed: 88450, status: 'LIVE', addedDate: '2026-06-18' },
          { name: 'Fresh Finds: Hip Hop', curator: 'Spotify Editorial', streamsContributed: 65112, status: 'LIVE', addedDate: '2026-05-10' },
          { name: 'Cloud Rap Classics', curator: 'Filter Wave', streamsContributed: 34102, status: 'LIVE', addedDate: '2026-04-01' },
          { name: 'OKC Local Wave', curator: 'Okie Sound', streamsContributed: 24100, status: 'LIVE', addedDate: '2026-02-20' },
          { name: 'Sovereign Anthems', curator: 'DoubleU Records', streamsContributed: 18450, status: 'LIVE', addedDate: '2026-02-15' },
          { name: 'Army Cadence Bars', curator: 'Vet Playlist Group', streamsContributed: 12100, status: 'PENDING', addedDate: '2026-06-25' }
        ] as PlaylistPlacement[]
      };
    } else if (selectedTrackId === 'faded-405') {
      return {
        totalStreams: 124500,
        monthlyListeners: 18400,
        playlistsCount: 12,
        revenue: 498.00,
        spotifyShare: 68,
        appleShare: 18,
        youtubeShare: 11,
        tidalShare: 3,
        growthRate: 8.5,
        topCities: [
          { city: 'Oklahoma City', code: 'OKC, US', streams: '43,575', percentage: 35 },
          { city: 'Jacksonville', code: 'JAX, US', streams: '18,675', percentage: 15 },
          { city: 'Hopkinsville', code: 'HPK, US', streams: '12,450', percentage: 10 },
          { city: 'Dallas', code: 'DFW, US', streams: '9,960', percentage: 8 },
          { city: 'Chicago', code: 'ORD, US', streams: '7,470', percentage: 6 }
        ],
        playlists: [
          { name: 'OKC Local Wave', curator: 'Okie Sound', streamsContributed: 24100, status: 'LIVE', addedDate: '2026-02-20' },
          { name: 'Sovereign Anthems', curator: 'DoubleU Records', streamsContributed: 18450, status: 'LIVE', addedDate: '2026-02-15' },
          { name: 'Mellow Bars', curator: 'Spotify Editorial', streamsContributed: 15400, status: 'LIVE', addedDate: '2026-03-01' },
          { name: 'Night Drive Grooves', curator: 'Sound Curations', streamsContributed: 11200, status: 'LIVE', addedDate: '2026-02-18' }
        ] as PlaylistPlacement[]
      };
    } else if (selectedTrackId === 'dear-author') {
      return {
        totalStreams: 84200,
        monthlyListeners: 12100,
        playlistsCount: 8,
        revenue: 336.80,
        spotifyShare: 52,
        appleShare: 28,
        youtubeShare: 16,
        tidalShare: 4,
        growthRate: -2.1,
        topCities: [
          { city: 'Jacksonville', code: 'JAX, US', streams: '21,050', percentage: 25 },
          { city: 'Hopkinsville', code: 'HPK, US', streams: '16,840', percentage: 20 },
          { city: 'Oklahoma City', code: 'OKC, US', streams: '12,630', percentage: 15 },
          { city: 'Atlanta', code: 'ATL, US', streams: '6,736', percentage: 8 },
          { city: 'Nashville', code: 'BNA, US', streams: '5,894', percentage: 7 }
        ],
        playlists: [
          { name: 'Fresh Finds: Hip Hop', curator: 'Spotify Editorial', streamsContributed: 35112, status: 'LIVE', addedDate: '2026-05-10' },
          { name: 'Sovereign Anthems', curator: 'DoubleU Records', streamsContributed: 12200, status: 'LIVE', addedDate: '2026-04-10' },
          { name: 'Grief & Grit Poetry', curator: 'Lyrical Therapy', streamsContributed: 8400, status: 'LIVE', addedDate: '2026-04-12' },
          { name: 'Acoustic Soul Reprise', curator: 'Indie Vibe Maker', streamsContributed: 4300, status: 'LIVE', addedDate: '2026-04-20' }
        ] as PlaylistPlacement[]
      };
    } else { // nights-on-the-fault or any added custom track
      const track = catalog.find(c => c.id === selectedTrackId);
      const name = track ? track.title : 'Album Release';
      
      return {
        totalStreams: 342140,
        monthlyListeners: 41850,
        playlistsCount: 26,
        revenue: 1368.56,
        spotifyShare: 64,
        appleShare: 20,
        youtubeShare: 13,
        tidalShare: 3,
        growthRate: 24.8,
        topCities: [
          { city: 'Oklahoma City', code: 'OKC, US', streams: '75,998', percentage: 22 },
          { city: 'Jacksonville', code: 'JAX, US', streams: '59,426', percentage: 17 },
          { city: 'Hopkinsville', code: 'HPK, US', streams: '47,827', percentage: 14 },
          { city: 'Chicago', code: 'ORD, US', streams: '34,214', percentage: 10 },
          { city: 'Los Angeles', code: 'LAX, US', streams: '30,792', percentage: 9 }
        ],
        playlists: [
          { name: 'RapCaviar', curator: 'Spotify Editorial', streamsContributed: 142104, status: 'LIVE', addedDate: '2026-06-15' },
          { name: 'Mellow Bars', curator: 'Spotify Editorial', streamsContributed: 73050, status: 'LIVE', addedDate: '2026-06-18' },
          { name: 'Cloud Rap Classics', curator: 'Filter Wave', streamsContributed: 34102, status: 'LIVE', addedDate: '2026-06-13' },
          { name: 'Army Cadence Bars', curator: 'Vet Playlist Group', streamsContributed: 12100, status: 'PENDING', addedDate: '2026-06-25' }
        ] as PlaylistPlacement[]
      };
    }
  };

  const metrics = getTrackMetrics();

  // Multiplier for timeline toggles
  const getTimeframeMultiplier = () => {
    switch (timeframe) {
      case '7d': return 0.22;
      case '12m': return 12.0;
      case '30d':
      default: return 1.0;
    }
  };

  const mul = getTimeframeMultiplier();
  const adjustedStreams = Math.floor(metrics.totalStreams * (timeframe === '12m' ? 1.0 : mul));
  const adjustedRevenue = metrics.revenue * (timeframe === '12m' ? 1.0 : mul);

  // --- CHART DATA GENERATOR ---
  const generateChartData = (): StreamDataPoint[] => {
    // Generate data points matching real events
    // Nights On The Fault (June 2026), Dear Author (April 2026), Faded 405 (Feb 2026)
    if (timeframe === '7d') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      let baseVal = adjustedStreams / 7;
      return days.map((day, idx) => {
        // add some variance
        const variance = Math.sin(idx * 1.5) * (baseVal * 0.15);
        return {
          label: day,
          streams: Math.floor(baseVal + variance + (idx * (baseVal * 0.05)))
        };
      });
    } else if (timeframe === '30d') {
      const points: StreamDataPoint[] = [];
      const baseVal = adjustedStreams / 30;
      for (let i = 1; i <= 30; i += 3) {
        const idx = i / 30;
        const trend = selectedTrackId === 'dear-author' ? (1 - idx * 0.2) : (1 + idx * 0.3); // Dear author slightly declining, others growing
        const variance = Math.cos(i * 0.8) * (baseVal * 0.2);
        points.push({
          label: `Jun ${i}`,
          streams: Math.floor((baseVal * trend) + variance)
        });
      }
      return points;
    } else { // 12m
      const months = ['Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26'];
      // Track specific launches
      return months.map((month, idx) => {
        let streamCount = 2000; // Baseline catalog back streams before releases
        
        if (selectedTrackId === 'all') {
          if (idx >= 7) streamCount += 45000; // Faded 405 release in Feb (idx 7)
          if (idx >= 9) streamCount += 38000; // Dear Author release in Apr (idx 9)
          if (idx >= 11) streamCount += 150000; // Nights on the Fault release in June (idx 11)
          // Add organic month-on-month compounding growth
          streamCount += idx * 6000;
        } else if (selectedTrackId === 'faded-405') {
          if (idx >= 7) {
            // Feb launch spike then steady
            streamCount = idx === 7 ? 65000 : 35000 + (idx - 7) * 2000;
          } else {
            streamCount = 0;
          }
        } else if (selectedTrackId === 'dear-author') {
          if (idx >= 9) {
            // April launch spike then taper
            streamCount = idx === 9 ? 48000 : idx === 10 ? 25000 : 18000;
          } else {
            streamCount = 0;
          }
        } else { // nights-on-the-fault
          if (idx >= 11) {
            streamCount = 310000; // Massive launch month surge in June
          } else {
            streamCount = 0;
          }
        }

        return {
          label: month,
          streams: streamCount
        };
      });
    }
  };

  const chartData = generateChartData();

  // --- SVG GRAPH CONSTRUTION CALCULATIONS ---
  const chartHeight = 180;
  const chartWidth = 500;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 25;

  const maxVal = Math.max(...chartData.map(d => d.streams)) * 1.15 || 1000;
  const minVal = 0;

  const getSvgCoordinates = (index: number, val: number) => {
    const x = paddingLeft + (index / (chartData.length - 1)) * (chartWidth - paddingLeft - paddingRight);
    const y = paddingTop + (1 - (val - minVal) / (maxVal - minVal)) * (chartHeight - paddingTop - paddingBottom);
    return { x, y };
  };

  // Compile the SVG Path points string
  let pathD = '';
  let areaD = '';

  if (chartData.length > 0) {
    const startPoint = getSvgCoordinates(0, chartData[0].streams);
    pathD = `M ${startPoint.x} ${startPoint.y}`;
    
    for (let i = 1; i < chartData.length; i++) {
      const pt = getSvgCoordinates(i, chartData[i].streams);
      pathD += ` L ${pt.x} ${pt.y}`;
    }

    // Closed path for filled gradient area
    const endPoint = getSvgCoordinates(chartData.length - 1, chartData[chartData.length - 1].streams);
    const bottomY = chartHeight - paddingBottom;
    areaD = `${pathD} L ${endPoint.x} ${bottomY} L ${startPoint.x} ${bottomY} Z`;
  }

  // Find hover coordinates
  const hoverPoint = activeHoverIndex !== null ? getSvgCoordinates(activeHoverIndex, chartData[activeHoverIndex].streams) : null;

  return (
    <div className="space-y-6">
      
      {/* HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-4">
        <div>
          <h2 className="heading-font text-base font-black text-white uppercase tracking-wider flex items-center space-x-2">
            <BarChart2 className="text-[#00f0ff]" size={16} />
            <span>Sovereign Music Analytics Ledger</span>
          </h2>
          <p className="text-xs text-zinc-500 font-mono">
            Direct telemetry measuring organic stream logs, listener coordinates, and channel royalties.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] w-full md:w-auto">
          {/* Track Selector */}
          <select
            value={selectedTrackId}
            onChange={(e) => setSelectedTrackId(e.target.value)}
            className="bg-zinc-900/80 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-[#ff5f00] font-mono text-[10px] uppercase font-bold"
          >
            <option value="all">📁 ALL TRACKS COMBINED</option>
            {catalog.map(song => (
              <option key={song.id} value={song.id}>
                🎵 {song.title.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Timeframe Selector */}
          <div className="flex bg-zinc-950 p-1 border border-zinc-900 rounded font-bold shrink-0">
            {(['7d', '30d', '12m'] as const).map(tf => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 rounded transition uppercase ${timeframe === tf ? 'bg-[#ff5f00] text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                {tf === '7d' ? '7 Days' : tf === '30d' ? '30 Days' : '12 Mon'}
              </button>
            ))}
          </div>

          {/* Refresher */}
          <button
            onClick={handleSyncData}
            disabled={isSyncing}
            className="p-1.5 bg-zinc-900/60 border border-zinc-800 hover:border-[#00f0ff] rounded text-zinc-400 hover:text-white transition disabled:opacity-50"
            title="Force recalculate logs"
          >
            <RefreshCw size={12} className={isSyncing ? 'animate-spin text-[#00f0ff]' : ''} />
          </button>
        </div>
      </div>

      {/* TOP ROW: KEY PERFORMANCE INDICATORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric A: Total Streams */}
        <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition duration-300">
            <Activity size={48} className="text-[#00f0ff]" />
          </div>
          <div className="space-y-1.5 relative">
            <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block font-bold">Adjusted Streams</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-extrabold text-white tracking-tight font-mono">
                {adjustedStreams.toLocaleString()}
              </span>
              <span className={`text-[9px] font-bold font-mono px-1 py-0.5 rounded ${metrics.growthRate >= 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {metrics.growthRate >= 0 ? `+${metrics.growthRate}%` : `${metrics.growthRate}%`}
              </span>
            </div>
            <div className="flex justify-between items-center text-[8px] text-zinc-600 font-mono pt-1">
              <span>Timeframe: {timeframe.toUpperCase()}</span>
              <span>Organic Plays</span>
            </div>
          </div>
        </div>

        {/* Metric B: Monthly Listeners */}
        <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition duration-300">
            <Users size={48} className="text-[#ff5f00]" />
          </div>
          <div className="space-y-1.5 relative">
            <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block font-bold">Monthly Listeners</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-extrabold text-white tracking-tight font-mono">
                {metrics.monthlyListeners.toLocaleString()}
              </span>
              <span className="text-[9px] font-bold font-mono px-1 py-0.5 rounded bg-[#ff5f00]/10 text-[#ff5f00] border border-[#ff5f00]/20">
                ACTIVE
              </span>
            </div>
            <div className="flex justify-between items-center text-[8px] text-zinc-600 font-mono pt-1">
              <span>Estimated Reach</span>
              <span>Unique IP Nodes</span>
            </div>
          </div>
        </div>

        {/* Metric C: Curated Playlist Placements */}
        <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition duration-300">
            <ListMusic size={48} className="text-violet-400" />
          </div>
          <div className="space-y-1.5 relative">
            <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block font-bold">Curator Placements</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-extrabold text-white tracking-tight font-mono">
                {metrics.playlistsCount}
              </span>
              <span className="text-[9px] font-bold font-mono px-1 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                +3 pending
              </span>
            </div>
            <div className="flex justify-between items-center text-[8px] text-zinc-600 font-mono pt-1">
              <span>Audited Curations</span>
              <span>Global Feeds</span>
            </div>
          </div>
        </div>

        {/* Metric D: Estimated Royalties */}
        <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition duration-300">
            <DollarSign size={48} className="text-amber-400" />
          </div>
          <div className="space-y-1.5 relative">
            <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block font-bold">Accrued Royalties (USD)</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl font-extrabold text-amber-400 tracking-tight font-mono">
                ${adjustedRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-[8px] text-zinc-500 font-mono font-bold uppercase">
                @ $0.004
              </span>
            </div>
            <div className="flex justify-between items-center text-[8px] text-zinc-600 font-mono pt-1">
              <span>Sovereign Earnings</span>
              <span className="text-emerald-400">Paid Direct</span>
            </div>
          </div>
        </div>

      </div>

      {/* MIDDLE SECTION: MAIN GRAPH AND GEOGRAPHIC TELEMETRY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMN A: STREAMING MOMENTUM AREA GRAPH (7/12 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
            <div>
              <span className="text-[10px] text-[#00f0ff] font-mono uppercase tracking-widest font-bold block">Streaming Momentum</span>
              <span className="text-[9px] text-zinc-500 font-mono block">Realtime play-log trajectory over selected timeline</span>
            </div>
            <span className="px-2 py-0.5 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 text-[9px] font-mono rounded font-bold uppercase">
              LIVE BROADCAST
            </span>
          </div>

          {/* CUSTOM SVG GRAPH COMPONENT */}
          <div className="relative pt-2">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-48 md:h-56 select-none overflow-visible"
            >
              {/* Gradients */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={selectedTrackId === 'dear-author' ? '#ff5f00' : '#00f0ff'} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={selectedTrackId === 'dear-author' ? '#ff5f00' : '#00f0ff'} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingTop + ratio * (chartHeight - paddingTop - paddingBottom);
                const gridVal = maxVal - ratio * (maxVal - minVal);
                return (
                  <g key={i} className="opacity-15">
                    <line 
                      x1={paddingLeft} 
                      y1={y} 
                      x2={chartWidth - paddingRight} 
                      y2={y} 
                      stroke="#4b5563" 
                      strokeWidth="1" 
                      strokeDasharray="4 4"
                    />
                    <text 
                      x={paddingLeft - 8} 
                      y={y + 3} 
                      fill="#9ca3af" 
                      fontSize="7" 
                      fontFamily="monospace" 
                      textAnchor="end"
                      className="opacity-60"
                    >
                      {gridVal >= 1000 ? `${(gridVal / 1000).toFixed(0)}k` : gridVal.toFixed(0)}
                    </text>
                  </g>
                );
              })}

              {/* Grid background / area fill */}
              {areaD && (
                <path 
                  d={areaD} 
                  fill="url(#chartGradient)" 
                />
              )}

              {/* Smooth trendline path */}
              {pathD && (
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke={selectedTrackId === 'dear-author' ? '#ff5f00' : '#00f0ff'} 
                  strokeWidth="2" 
                  className="drop-shadow-[0_0_4px_rgba(0,240,255,0.3)]"
                />
              )}

              {/* Interactive interactive hover line & circles */}
              {hoverPoint && (
                <g>
                  <line 
                    x1={hoverPoint.x} 
                    y1={paddingTop} 
                    x2={hoverPoint.x} 
                    y2={chartHeight - paddingBottom} 
                    stroke="#4b5563" 
                    strokeWidth="1.5" 
                    strokeDasharray="2 2"
                    className="opacity-50"
                  />
                  <circle 
                    cx={hoverPoint.x} 
                    cy={hoverPoint.y} 
                    r="5" 
                    fill="#000" 
                    stroke={selectedTrackId === 'dear-author' ? '#ff5f00' : '#00f0ff'} 
                    strokeWidth="2" 
                  />
                  <circle 
                    cx={hoverPoint.x} 
                    cy={hoverPoint.y} 
                    r="8" 
                    fill={selectedTrackId === 'dear-author' ? '#ff5f00' : '#00f0ff'} 
                    className="opacity-25 animate-ping"
                  />
                </g>
              )}

              {/* X-Axis Labels */}
              {chartData.map((pt, idx) => {
                const coord = getSvgCoordinates(idx, pt.streams);
                
                // Show subset of labels if too dense
                const shouldShow = timeframe === '7d' 
                  || (timeframe === '30d' && idx % 2 === 0) 
                  || (timeframe === '12m' && idx % 2 === 1);

                if (!shouldShow) return null;

                return (
                  <text
                    key={idx}
                    x={coord.x}
                    y={chartHeight - 8}
                    fill="#9ca3af"
                    fontSize="7"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="opacity-40"
                  >
                    {pt.label}
                  </text>
                );
              })}

              {/* Transparent interactive bars for hover triggers */}
              {chartData.map((pt, idx) => {
                const width = (chartWidth - paddingLeft - paddingRight) / (chartData.length - 1);
                const coord = getSvgCoordinates(idx, pt.streams);
                const xStart = coord.x - width / 2;

                return (
                  <rect
                    key={idx}
                    x={xStart}
                    y={paddingTop}
                    width={width}
                    height={chartHeight - paddingTop - paddingBottom}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveHoverIndex(idx)}
                    onMouseLeave={() => setActiveHoverIndex(null)}
                  />
                );
              })}
            </svg>

            {/* Float Tooltip */}
            {activeHoverIndex !== null && chartData[activeHoverIndex] && (
              <div 
                className="absolute bg-zinc-950 border border-zinc-900 rounded px-2.5 py-1.5 font-mono text-[9px] pointer-events-none shadow-xl flex flex-col space-y-0.5"
                style={{
                  left: `${(activeHoverIndex / (chartData.length - 1)) * 80 + 10}%`,
                  top: '10%'
                }}
              >
                <span className="text-zinc-500 uppercase text-[8px] font-bold">Node Timeframe: {chartData[activeHoverIndex].label}</span>
                <span className="text-white font-extrabold">{chartData[activeHoverIndex].streams.toLocaleString()} Streams</span>
                <span className="text-[#00f0ff] font-bold text-[8px] uppercase">
                  Est. Revenue: ${(chartData[activeHoverIndex].streams * 0.004).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 px-2">
            <span>Hover graph nodes to verify daily/monthly playback counts</span>
            <span className="text-[#ff5f00] font-bold">Payout multiplier: $0.004/stream</span>
          </div>
        </div>

        {/* COLUMN B: GEOGRAPHIC DISTRIBUTION TABLE (5/12 cols) */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
            <div>
              <span className="text-[10px] text-[#ff5f00] font-mono uppercase tracking-widest font-bold block">Geographic Coordinates</span>
              <span className="text-[9px] text-zinc-500 font-mono block">Top regional clusters driving active listener cells</span>
            </div>
            <MapPin size={12} className="text-[#ff5f00]" />
          </div>

          {/* Regional Table */}
          <div className="space-y-3.5 pt-1">
            {metrics.topCities.map((city, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center font-mono text-[10px]">
                  <div className="flex items-center space-x-2">
                    <span className="text-zinc-500 font-bold">#{idx + 1}</span>
                    <span className="text-white font-bold">{city.city}</span>
                    <span className="text-[8px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-1 rounded font-bold">
                      {city.code}
                    </span>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="text-zinc-300 font-bold block">{city.streams}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-zinc-900/40 border border-zinc-900 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#ff5f00] h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_#ff5f00]" 
                    style={{ width: `${city.percentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-[8px] font-mono text-zinc-600 px-0.5">
                  <span>Stream contribution</span>
                  <span>{city.percentage}% share</span>
                </div>
              </div>
            ))}
          </div>

          {/* Geographic validation callout */}
          <div className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-lg text-[9px] font-mono text-zinc-500 flex gap-2 items-start leading-relaxed">
            <Globe size={14} className="text-zinc-400 shrink-0 mt-0.5" />
            <span>
              Primary coordinates cluster around **Oklahoma City, OK**, **Jacksonville, FL**, and **Hopkinsville, KY** — matching William Hartman's real geographic coordinates of migration and survival.
            </span>
          </div>

        </div>

      </div>

      {/* BOTTOM ROW: PLATFORM DISTRIBUTION AND PLAYLIST LEDGER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* PLATFORM DISTRIBUTION (5/12 cols) */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
            <div>
              <span className="text-[10px] text-violet-400 font-mono uppercase tracking-widest font-bold block">Streaming Platform breakout</span>
              <span className="text-[9px] text-zinc-500 font-mono block">Ecosystem split across streaming distribution feeds</span>
            </div>
            <Percent size={12} className="text-violet-400" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            {/* Pie-chart like concentric rings */}
            <div className="relative flex items-center justify-center h-32 bg-zinc-900/10 border border-zinc-900/40 rounded-xl">
              <svg viewBox="0 0 100 100" className="w-24 h-24 transform -rotate-90">
                {/* Spotify Ring */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1d4ed8" strokeWidth="6" className="opacity-10" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="6" strokeDasharray={`${metrics.spotifyShare * 2.51} 251`} className="stroke-[#10b981] drop-shadow-[0_0_2px_#10b981]" />

                {/* Apple Music Ring */}
                <circle cx="50" cy="50" r="30" fill="transparent" stroke="#1d4ed8" strokeWidth="6" className="opacity-10" />
                <circle cx="50" cy="50" r="30" fill="transparent" stroke="#fa4659" strokeWidth="6" strokeDasharray={`${metrics.appleShare * 1.88} 188`} className="stroke-[#fa4659] drop-shadow-[0_0_2px_#fa4659]" />

                {/* YouTube Ring */}
                <circle cx="50" cy="50" r="20" fill="transparent" stroke="#1d4ed8" strokeWidth="6" className="opacity-10" />
                <circle cx="50" cy="50" r="20" fill="transparent" stroke="#ef4444" strokeWidth="6" strokeDasharray={`${metrics.youtubeShare * 1.25} 125`} className="stroke-[#ef4444] drop-shadow-[0_0_2px_#ef4444]" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                <span className="text-[14px] font-black text-white">{metrics.spotifyShare}%</span>
                <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-bold">Spotify Lead</span>
              </div>
            </div>

            {/* Custom Legend & percentages */}
            <div className="flex flex-col justify-center space-y-3 font-mono text-[9px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                  <span className="text-zinc-400">Spotify</span>
                </div>
                <span className="text-white font-bold">{metrics.spotifyShare}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-[#fa4659]" />
                  <span className="text-zinc-400">Apple Music</span>
                </div>
                <span className="text-white font-bold">{metrics.appleShare}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
                  <span className="text-zinc-400">YouTube Music</span>
                </div>
                <span className="text-white font-bold">{metrics.youtubeShare}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-violet-400" />
                  <span className="text-zinc-400">Tidal / Others</span>
                </div>
                <span className="text-white font-bold">{metrics.tidalShare}%</span>
              </div>
            </div>
          </div>

          {/* Micro stats icons indicators */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-2.5 bg-zinc-900/30 border border-zinc-900 rounded-xl flex items-center space-x-2.5">
              <Smartphone size={14} className="text-zinc-500" />
              <div className="font-mono text-[8px] leading-tight">
                <span className="text-white block font-bold">88.4% Mobile</span>
                <span className="text-zinc-500 block">iOS / Android Playback</span>
              </div>
            </div>

            <div className="p-2.5 bg-zinc-900/30 border border-zinc-900 rounded-xl flex items-center space-x-2.5">
              <Monitor size={14} className="text-zinc-500" />
              <div className="font-mono text-[8px] leading-tight">
                <span className="text-white block font-bold">11.6% Desktop</span>
                <span className="text-zinc-500 block">Browser / App Playback</span>
              </div>
            </div>
          </div>

        </div>

        {/* PLAYLIST PLACEMENTS LEDGER (7/12 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
            <div>
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-bold block">Playlist Placements Registry</span>
              <span className="text-[9px] text-zinc-500 font-mono block">Monitored editorial and independent catalog placements</span>
            </div>
            <span className="px-2 py-0.5 bg-violet-500/10 text-violet-400 border border-violet-500/30 text-[9px] font-mono rounded font-bold uppercase">
              {metrics.playlists.length} PLACEMENTS
            </span>
          </div>

          <div className="max-h-56 overflow-y-auto pr-1 scrollbar-thin">
            <table className="w-full text-left border-collapse font-mono text-[9px]">
              <thead>
                <tr className="border-b border-zinc-900/60 text-zinc-500 uppercase pb-2 text-[8px] font-bold">
                  <th className="pb-2">Playlist Name</th>
                  <th className="pb-2">Curator Node</th>
                  <th className="pb-2 text-right">Streams Contributed</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/30">
                {metrics.playlists.map((pl, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/10 transition">
                    <td className="py-2.5 text-zinc-300 font-bold max-w-[150px] truncate">{pl.name}</td>
                    <td className="py-2.5 text-zinc-500">{pl.curator}</td>
                    <td className="py-2.5 text-right text-white font-bold">
                      {pl.streamsContributed.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right">
                      <span className={`px-1.5 py-0.5 text-[7px] rounded font-bold uppercase ${
                        pl.status === 'LIVE' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {pl.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* BOTTOM PANEL: REALTIME LIVE INGESTION LOGS */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900 pb-3">
          <div className="space-y-0.5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Live Playback Ingestion Broadcast Ticker</span>
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">
              Capturing incoming real-time playback sessions from worldwide distribution protocols.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <span className="text-[9px] text-zinc-400 font-mono">BROADCAST LISTENER STATE:</span>
            <button
              onClick={() => setIsLiveListening(!isLiveListening)}
              className={`px-3 py-1.5 rounded font-mono text-[9px] uppercase font-bold tracking-wider transition ${
                isLiveListening 
                  ? 'bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25' 
                  : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'
              }`}
            >
              {isLiveListening ? 'Stop Ticker Feed' : 'Start Ticker Feed'}
            </button>
          </div>
        </div>

        {/* Realtime play-log stream items */}
        <div className="bg-black/80 border border-zinc-900 rounded-xl p-4 h-48 overflow-y-auto font-mono text-[9px] text-zinc-400 space-y-2.5 scrollbar-thin">
          {livePlays.map((play) => (
            <div key={play.id} className="flex justify-between items-center py-1.5 border-b border-zinc-900/40 last:border-0 hover:bg-zinc-900/10 px-2 rounded transition">
              <div className="flex items-center space-x-3 max-w-[70%]">
                <span className="text-zinc-600 block shrink-0">{play.timestamp}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                <span className="text-zinc-500">User in</span>
                <span className="text-white font-bold">{play.city}, {play.region}</span>
                <span className="text-zinc-500">listened to</span>
                <span className="text-[#ff5f00] font-black uppercase truncate max-w-[120px]" title={play.trackTitle}>
                  "{play.trackTitle}"
                </span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className={`px-1.5 py-0.5 rounded uppercase text-[7px] font-black ${
                  play.platform === 'Spotify' ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20' :
                  play.platform === 'Apple Music' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' :
                  play.platform === 'YouTube' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20'
                }`}>
                  {play.platform}
                </span>
                <span className="text-zinc-600 uppercase text-[7px]">{play.device}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
