import React, { useState, useEffect } from 'react';
import { Route, Page, Entity, SongCatalogItem } from './types';
import { injectSEO } from './seo';
import { INITIAL_PAGES, INITIAL_ENTITIES } from './initialData';
import { CATALOG } from './data';

// View Components
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import DiscographyView from './components/DiscographyView';
import ContactView from './components/ContactView';
import PrivacyView from './components/PrivacyView';
import NotFoundView from './components/NotFoundView';
import CustomPageView from './components/CustomPageView';
import AdminHubView from './components/AdminHubView';

// Icons
import { Terminal, Shield, Menu, X, Compass, Disc, Award, Mail, Eye } from 'lucide-react';

export default function App() {
  const [pages, setPages] = useState<Page[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [catalog, setCatalog] = useState<SongCatalogItem[]>([]);
  
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize pages registry in localStorage
  useEffect(() => {
    const cachedPages = localStorage.getItem('doubleu_pages');
    if (cachedPages) {
      try {
        setPages(JSON.parse(cachedPages));
      } catch (e) {
        setPages(INITIAL_PAGES);
      }
    } else {
      setPages(INITIAL_PAGES);
      localStorage.setItem('doubleu_pages', JSON.stringify(INITIAL_PAGES));
    }

    const cachedEntities = localStorage.getItem('doubleu_entities');
    if (cachedEntities) {
      try {
        setEntities(JSON.parse(cachedEntities));
      } catch (e) {
        setEntities(INITIAL_ENTITIES);
      }
    } else {
      setEntities(INITIAL_ENTITIES);
      localStorage.setItem('doubleu_entities', JSON.stringify(INITIAL_ENTITIES));
    }

    const cachedCatalog = localStorage.getItem('doubleu_catalog');
    if (cachedCatalog) {
      try {
        setCatalog(JSON.parse(cachedCatalog));
      } catch (e) {
        setCatalog(CATALOG);
      }
    } else {
      setCatalog(CATALOG);
      localStorage.setItem('doubleu_catalog', JSON.stringify(CATALOG));
    }
  }, []);

  const handlePagesChange = (updatedPages: Page[]) => {
    setPages(updatedPages);
    localStorage.setItem('doubleu_pages', JSON.stringify(updatedPages));
    injectSEO(currentRoute, currentItemId || undefined);
  };

  const handleEntitiesChange = (updatedEntities: Entity[]) => {
    setEntities(updatedEntities);
    localStorage.setItem('doubleu_entities', JSON.stringify(updatedEntities));
  };

  const handleCatalogChange = (updatedCatalog: SongCatalogItem[]) => {
    setCatalog(updatedCatalog);
    localStorage.setItem('doubleu_catalog', JSON.stringify(updatedCatalog));
  };

  // Synchronize SEO tags and Schema on route transitions
  useEffect(() => {
    injectSEO(currentRoute, currentItemId || undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [currentRoute, currentItemId, pages]);

  const handleNavigate = (route: Route, itemId?: string) => {
    setCurrentRoute(route);
    setCurrentItemId(itemId || null);
  };

  const activeCustomPage = pages.find(p => p.id === currentRoute && p.isCustom);

  // If we are on the admin suite, render it full screen directly!
  if (currentRoute === 'admin') {
    return (
      <AdminHubView 
        pages={pages}
        onPagesChange={handlePagesChange}
        entities={entities}
        onEntitiesChange={handleEntitiesChange}
        catalog={catalog}
        onCatalogChange={handleCatalogChange}
        onNavigate={(route) => handleNavigate(route)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0e] text-[#e2e8f0] font-sans antialiased">
      
      {/* MASTER NAVIGATION BAR */}
      <nav className="sticky top-0 w-full z-40 bg-[#0c0c0e]/95 backdrop-blur-md border-b border-zinc-900 h-20 flex items-center justify-between px-6 md:px-8 shadow-sm">
        {/* Logo / Brand Anchor */}
        <button 
          onClick={() => handleNavigate('home')} 
          className="heading-font text-2xl font-bold tracking-tight hover:opacity-95 transition duration-300 focus:outline-none flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-neon-orange flex items-center justify-center shrink-0 rounded">
            <span className="text-black font-black text-sm font-mono">W</span>
          </div>
          <span className="font-extrabold text-lg tracking-tighter text-white">
            DOUBLE<span className="text-[#00F0FF]">U</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <button 
            onClick={() => handleNavigate('home')}
            className={`hover:text-white transition duration-200 relative py-1 ${currentRoute === 'home' ? 'text-[#00F0FF] font-bold' : ''}`}
          >
            Vault Home
            {currentRoute === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            )}
          </button>
          <button 
            onClick={() => handleNavigate('about')}
            className={`hover:text-white transition duration-200 relative py-1 ${currentRoute === 'about' ? 'text-[#00F0FF] font-bold' : ''}`}
          >
            The Journey
            {currentRoute === 'about' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            )}
          </button>
          <button 
            onClick={() => handleNavigate('discography')}
            className={`hover:text-white transition duration-200 relative py-1 ${currentRoute === 'discography' ? 'text-[#00F0FF] font-bold' : ''}`}
          >
            Discography
            {currentRoute === 'discography' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            )}
          </button>
          <button 
            onClick={() => handleNavigate('contact')}
            className={`hover:text-white transition duration-200 relative py-1 ${currentRoute === 'contact' ? 'text-[#00F0FF] font-bold' : ''}`}
          >
            Contact
            {currentRoute === 'contact' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            )}
          </button>

          {/* Custom dynamic pages selector dropdown */}
          {pages.some(p => p.isCustom) && (
            <div className="relative group">
              <button className="hover:text-white transition duration-200 py-1 flex items-center space-x-1.5 font-bold text-[#ff5f00]">
                <Compass size={14} className="animate-spin" style={{ animationDuration: '10s' }} />
                <span>Custom Nodes</span>
              </button>
              <div className="absolute top-full right-0 mt-2 bg-zinc-950 border border-zinc-900 rounded-lg shadow-2xl py-1.5 w-48 hidden group-hover:block z-50">
                {pages.filter(p => p.isCustom).map(cp => (
                  <button
                    key={cp.id}
                    onClick={() => handleNavigate(cp.cpId || cp.id)}
                    className="w-full text-left px-4 py-2 hover:bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-white transition"
                  >
                    /{cp.id}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Administrative Portal Link */}
          <button
            onClick={() => handleNavigate('admin')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#ff5f00]/10 hover:bg-[#ff5f00]/20 border border-[#ff5f00]/30 hover:border-[#ff5f00] rounded text-[10px] text-[#ff5f00] font-bold tracking-widest uppercase transition duration-300"
          >
            <Shield size={10} />
            <span>Artist Suite</span>
          </button>
        </div>

        {/* Mobile Menu Toggler */}
        <div className="flex items-center space-x-4 md:hidden">
          <button 
            onClick={() => handleNavigate('admin')}
            className="p-1.5 bg-zinc-900 border border-zinc-800 text-[#ff5f00] rounded-lg"
            title="Artist Hub"
          >
            <Shield size={16} />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-400 hover:text-white transition focus:outline-none p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-900 px-6 py-6 space-y-4 font-mono text-xs uppercase tracking-widest text-zinc-400 shadow-inner">
          <button 
            onClick={() => handleNavigate('home')}
            className={`block w-full text-left py-1 hover:text-white ${currentRoute === 'home' ? 'text-[#00F0FF] font-bold' : ''}`}
          >
            Vault Home
          </button>
          <button 
            onClick={() => handleNavigate('about')}
            className={`block w-full text-left py-1 hover:text-white ${currentRoute === 'about' ? 'text-[#00F0FF] font-bold' : ''}`}
          >
            The Journey
          </button>
          <button 
            onClick={() => handleNavigate('discography')}
            className={`block w-full text-left py-1 hover:text-white ${currentRoute === 'discography' ? 'text-[#00F0FF] font-bold' : ''}`}
          >
            Discography
          </button>
          <button 
            onClick={() => handleNavigate('contact')}
            className={`block w-full text-left py-1 hover:text-white ${currentRoute === 'contact' ? 'text-[#00F0FF] font-bold' : ''}`}
          >
            Contact
          </button>

          {/* Mobile custom pages list */}
          {pages.some(p => p.isCustom) && (
            <div className="pt-2 border-t border-zinc-900 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Custom Uploaded Pages:</span>
              {pages.filter(p => p.isCustom).map(cp => (
                <button
                  key={cp.id}
                  onClick={() => handleNavigate(cp.id)}
                  className="block w-full text-left py-1.5 pl-3 border-l-2 border-zinc-800 hover:border-[#00F0FF] hover:bg-zinc-900 font-mono text-xs text-zinc-300"
                >
                  /{cp.id}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MASTER ROUTER COMPONENT VIEW WRAPPER */}
      <main className="flex-grow">
        {/* Active Custom Page Renderer */}
        {activeCustomPage ? (
          <CustomPageView 
            page={activeCustomPage} 
            allEntities={entities}
            onNavigate={(route) => handleNavigate(route)} 
          />
        ) : (
          <>
            {currentRoute === 'home' && (
              <HomeView 
                onNavigate={(route, id) => handleNavigate(route as any, id)} 
                catalog={catalog}
              />
            )}
            {currentRoute === 'about' && (
              <AboutView onNavigate={(route) => handleNavigate(route as any)} />
            )}
            {currentRoute === 'discography' && (
              <DiscographyView 
                selectedItemId={currentItemId} 
                onNavigate={(route, id) => handleNavigate(route as any, id)} 
                catalog={catalog}
              />
            )}
            {currentRoute === 'contact' && (
              <ContactView />
            )}
            {currentRoute === 'privacy' && (
              <PrivacyView />
            )}
            {currentRoute === '404' && (
              <NotFoundView onReturnHome={() => handleNavigate('home')} />
            )}
          </>
        )}
      </main>

      {/* MASTER ARCHITECTURAL FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-6 md:px-8 mt-auto shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="heading-font text-xs font-bold tracking-wider text-white uppercase">
              KNOWLEDGEARCH MATRIX // DOUBLEU
            </p>
            <p className="font-mono text-[9px] text-zinc-500 uppercase">
              &copy; 2026 William Kirby Hartman. All Entity Schemas Standardized.
            </p>
          </div>

          {/* Crawlable navigation tags for structural E-A-T score maximization */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-[9px] tracking-widest uppercase text-zinc-500">
            <button onClick={() => handleNavigate('discography')} className="hover:text-[#00F0FF] transition font-bold">Discography Matrix</button>
            <button onClick={() => handleNavigate('about')} className="hover:text-[#00F0FF] transition font-bold">The Journey</button>
            <button onClick={() => handleNavigate('contact')} className="hover:text-[#00F0FF] transition font-bold">Contact Console</button>
            <button onClick={() => handleNavigate('privacy')} className={`transition font-bold ${currentRoute === 'privacy' ? 'text-[#00F0FF] border-b border-[#00F0FF]' : 'hover:text-white'}`}>Privacy Registry</button>
            <button onClick={() => handleNavigate('admin')} className="text-[#ff5f00] hover:text-white transition font-bold">Artist Suite</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
