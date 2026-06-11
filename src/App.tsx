import React, { useState, useMemo, useEffect, useRef } from 'react';
import { TOOLS } from './data/toolsData';
import { CATEGORIES, Tool, CategoryType } from './types';
import { Icon } from './components/Icon';
import { AdsterraBanner } from './components/AdsterraBanner';

// Import our modular tool categories components
import { CareerTools } from './components/tools/CareerTools';
import { ProductivityTools } from './components/tools/ProductivityTools';
import { MathTools } from './components/tools/MathTools';
import { ConverterTools } from './components/tools/ConverterTools';
import { TextTools } from './components/tools/TextTools';
import { DesignTools } from './components/tools/DesignTools';
import { AccountingTools } from './components/tools/AccountingTools';

// Memorable Premium Briefcase Brand Logo with an prominent interactive gear mechanism
const BrandLogo = () => (
  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-600/30 border border-white/10 relative group hover:scale-105 transition-all duration-300 shrink-0 select-none">
    {/* High-fidelity gear background rotating glow on hover */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl blur-[4px] opacity-35 group-hover:opacity-55 transition-opacity duration-200" />
    <div className="absolute inset-x-0 inset-y-0.5 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    <svg className="w-8 h-8 text-white drop-shadow-md relative z-10 transition-transform duration-500 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Sleek suitcase outline block */}
      <rect x="3" y="8" width="18" height="12" rx="3" stroke="currentColor" />
      <path d="M8 8V4.5a1.5 1.5 0 0 1 1.5-1.5h5a1.5 1.5 0 0 1 1.5 1.5v3.5" stroke="currentColor" />
      
      {/* Intricate interlocking mechanical gears lock */}
      <circle cx="12" cy="14" r="2.5" fill="#facc15" stroke="#eab308" strokeWidth="1" className="animate-pulse" />
      {/* Detailed gear teeth / notches representing utility tools */}
      <path d="M12 10.5v1M12 16.5v1M8.5 14h1M14.5 14h1" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.5 11.5l.7.7M13.8 15.8l.7.7M9.5 16.5l.7-.7M13.8 11.5l.7-.7" stroke="#eab308" strokeWidth="1.8" strokeLinecap="round" />
      {/* Central mechanism pin rivet */}
      <circle cx="12" cy="14" r="0.8" fill="#1e1b4b" />
    </svg>
  </div>
);

// High-fidelity, interactively dynamic Visual Suitcase illustration as requested
const DynamicVisualSuitcase = ({ jumpingCount }: { jumpingCount: number }) => (
  <div className="relative mx-auto w-32 h-24 my-6 group cursor-pointer select-none">
    {/* Glow shadow behind suitcase */}
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-sky-400 to-teal-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
    
    {/* Handle of the suitcase */}
    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-6 rounded-t-xl border-[4.5px] border-slate-700 dark:border-slate-350 transition-all duration-300 group-hover:h-7 group-hover:border-blue-500 z-10" />
    
    {/* Body of the Suitcase */}
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-blue-600 via-indigo-600 to-indigo-700 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 border-2 border-slate-800 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1">
      
      {/* Glossy shine reflection overlay */}
      <div className="absolute top-0 inset-x-0 h-1/2 bg-white/10 skew-y-6 transform origin-top-left pointer-events-none" />
      
      {/* Decorative Golden Brass Corner Armor Plates */}
      <div className="absolute top-0 left-0 w-4 h-4 bg-amber-400/90 dark:bg-amber-500/80 rounded-tl-xl rounded-br-md border-b border-r border-amber-300/40" />
      <div className="absolute top-0 right-0 w-4 h-4 bg-amber-400/90 dark:bg-amber-500/80 rounded-tr-xl rounded-bl-md border-b border-l border-amber-300/40" />
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-amber-400/90 dark:bg-amber-500/80 rounded-bl-xl rounded-tr-md border-t border-r border-amber-300/40" />
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-amber-400/90 dark:bg-amber-500/80 rounded-br-xl rounded-tl-md border-t border-l border-amber-300/40" />
      
      {/* Twin lock-down leather style straps */}
      <div className="absolute inset-y-0 left-6 w-3 bg-slate-900/80 dark:bg-slate-950/60 border-x border-slate-700/30 flex flex-col justify-between py-1.5">
        <div className="w-1 h-1 bg-amber-400 rounded-full mx-auto" />
        <div className="w-1 h-1 bg-amber-400 rounded-full mx-auto" />
      </div>
      <div className="absolute inset-y-0 right-6 w-3 bg-slate-900/80 dark:bg-slate-950/60 border-x border-slate-700/30 flex flex-col justify-between py-1.5">
        <div className="w-1 h-1 bg-amber-400 rounded-full mx-auto" />
        <div className="w-1 h-1 bg-amber-400 rounded-full mx-auto" />
      </div>
      
      {/* Center lock mechanism badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 border border-amber-300 rounded shadow-md flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
      </div>

      {/* Retro sticker elements slapped onto the leather to showcase versatility */}
      <div className="absolute bottom-2 left-1 bg-teal-400 text-slate-950 text-[7.5px] font-black font-mono px-1 rounded-sm rotate-[12deg] scale-90 border border-teal-350 shadow-sm leading-none">
        ATS
      </div>
      <div className="absolute bottom-2.5 right-1 bg-pink-500 text-white text-[7.5px] font-black font-mono px-1 rounded-sm rotate-[-8deg] scale-90 border border-pink-400 shadow-sm leading-none">
        PDF
      </div>
      <div className="absolute top-1.5 left-1.5 bg-blue-400 text-white text-[6.5px] font-bold px-0.5 rounded-sm scale-95 opacity-90 leading-none">
        CODE
      </div>
    </div>

    {/* Custom Badge Bubble popping out */}
    <div className="absolute -top-1 -right-4 bg-gradient-to-r from-teal-400 to-indigo-500 text-slate-950 dark:text-white text-[8px] font-black font-mono px-2 py-0.5 rounded-full shadow-lg border border-teal-300/40 animate-bounce">
      {jumpingCount}+ UTILS
    </div>

    {/* Floating symbols erupting elegantly from the side on hover */}
    <div className="absolute -top-3 -left-2 text-sm opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:-translate-x-1 transition-all duration-300 pointer-events-none delay-75">
      ⚙️
    </div>
    <div className="absolute -top-4 right-1 text-sm opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 group-hover:translate-x-1 transition-all duration-300 pointer-events-none delay-100">
      📝
    </div>
    <div className="absolute top-6 -right-4 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-300 pointer-events-none delay-150">
      📊
    </div>
    <div className="absolute top-4 -left-5 text-sm opacity-0 group-hover:opacity-100 group-hover:-translate-x-3 transition-all duration-300 pointer-events-none delay-120">
      🔢
    </div>
  </div>
);

// Metadata for Category dashboard blocks based on image references
const DASHBOARD_BLOCKS = [
  {
    id: 'career' as CategoryType,
    name: 'Career Builders',
    subtitle: 'Solve Your Career Documents & CV Needs',
    qty: '9+ tools',
    colorClasses: 'from-rose-500 to-pink-600 text-white',
    ringColor: 'focus:ring-rose-400',
    featuredId: 'ats-cv',
    featuredName: 'ATS Resume Writer',
    icon: 'Briefcase',
    btnColorTheme: 'text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-100',
    circleAccent: 'bg-white/15 text-white'
  },
  {
    id: 'productivity' as CategoryType,
    name: 'Productivity & Work',
    subtitle: 'Solve Your Daily Tasks & Workflow Problems',
    qty: '6+ tools',
    colorClasses: 'from-indigo-500 to-purple-600 text-white',
    ringColor: 'focus:ring-indigo-400',
    featuredId: 'kanban-board',
    featuredName: 'Kanban Task Board',
    icon: 'Trello',
    btnColorTheme: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-100',
    circleAccent: 'bg-white/15 text-white'
  },
  {
    id: 'math' as CategoryType,
    name: 'Math & Estimators',
    subtitle: 'Solve Your Formula & Numerical Audits',
    qty: '7+ tools',
    colorClasses: 'from-fuchsia-500 to-rose-600 text-white',
    ringColor: 'focus:ring-fuchsia-400',
    featuredId: 'luhn-validator',
    featuredName: 'Luhn Credit Check',
    icon: 'Calculator',
    btnColorTheme: 'text-fuchsia-600 bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-100',
    circleAccent: 'bg-white/15 text-white'
  },
  {
    id: 'converters' as CategoryType,
    name: 'Format Converters',
    subtitle: 'Solve Your Format Translators & Schema Audits',
    qty: '11+ tools',
    colorClasses: 'from-orange-500 to-amber-600 text-white',
    ringColor: 'focus:ring-orange-400',
    featuredId: 'json-validator',
    featuredName: 'JSON Beautifier',
    icon: 'RefreshCw',
    btnColorTheme: 'text-orange-600 bg-orange-50 hover:bg-orange-100 border-orange-100',
    circleAccent: 'bg-white/15 text-white'
  },
  {
    id: 'text' as CategoryType,
    name: 'Text Utilities',
    subtitle: 'Solve Your Copywriting & RegEx Parsing Problems',
    qty: '6+ tools',
    colorClasses: 'from-blue-600 to-blue-800 text-white',
    ringColor: 'focus:ring-blue-400',
    featuredId: 'text-diff',
    featuredName: 'Visual Text Diff',
    icon: 'FileText',
    btnColorTheme: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-100',
    circleAccent: 'bg-white/15 text-white'
  },
  {
    id: 'design' as CategoryType,
    name: 'Design Sandboxes',
    subtitle: 'Solve Your QR Badge & Glassmorphism Drafts',
    qty: '6+ tools',
    colorClasses: 'from-teal-600 to-emerald-600 text-white',
    ringColor: 'focus:ring-teal-400',
    featuredId: 'qr-generator',
    featuredName: 'QR WiFi Badge Maker',
    icon: 'Image',
    btnColorTheme: 'text-teal-600 bg-teal-50 hover:bg-teal-100 border-teal-100',
    circleAccent: 'bg-white/15 text-white'
  },
  {
    id: 'accounting' as CategoryType,
    name: 'Accounting & Finance',
    subtitle: 'Solve Your Ledger Entries & Asset Lives Schedules',
    qty: '4+ tools',
    colorClasses: 'from-slate-700 to-sky-850 text-white',
    ringColor: 'focus:ring-slate-400',
    featuredId: 'ledger-simulator',
    featuredName: 'Double-Entry Ledger Sim',
    icon: 'Receipt',
    btnColorTheme: 'text-slate-700 bg-slate-50 hover:bg-slate-100 border-slate-100',
    circleAccent: 'bg-white/15 text-white'
  }
];

// Ambient colored shadow & glowing interactive borders helper to satisfy user's request
const getCategoryGlow = (category: string) => {
  const mapping: Record<string, { shadow: string; border: string; glow: string }> = {
    career: {
      shadow: 'hover:shadow-[0_20px_50px_rgba(244,63,94,0.14)] dark:hover:shadow-[0_20px_50px_rgba(244,63,94,0.18)]',
      border: 'hover:border-rose-400 dark:hover:border-rose-505',
      glow: 'bg-rose-500/5 group-hover:bg-rose-500/10'
    },
    productivity: {
      shadow: 'hover:shadow-[0_20px_50px_rgba(99,102,241,0.14)] dark:hover:shadow-[0_20px_50px_rgba(99,102,241,0.18)]',
      border: 'hover:border-indigo-400 dark:hover:border-indigo-505',
      glow: 'bg-indigo-500/5 group-hover:bg-indigo-500/10'
    },
    math: {
      shadow: 'hover:shadow-[0_20px_50px_rgba(217,70,239,0.14)] dark:hover:shadow-[0_20px_50px_rgba(217,70,239,0.18)]',
      border: 'hover:border-fuchsia-400 dark:hover:border-fuchsia-505',
      glow: 'bg-fuchsia-500/5 group-hover:bg-fuchsia-500/10'
    },
    converters: {
      shadow: 'hover:shadow-[0_20px_50px_rgba(249,115,22,0.14)] dark:hover:shadow-[0_20px_50px_rgba(249,115,22,0.18)]',
      border: 'hover:border-orange-400 dark:hover:border-orange-505',
      glow: 'bg-orange-500/5 group-hover:bg-orange-500/10'
    },
    text: {
      shadow: 'hover:shadow-[0_20px_50px_rgba(37,99,235,0.14)] dark:hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)]',
      border: 'hover:border-blue-400 dark:hover:border-blue-505',
      glow: 'bg-blue-500/5 group-hover:bg-blue-500/10'
    },
    design: {
      shadow: 'hover:shadow-[0_20px_50px_rgba(13,148,136,0.14)] dark:hover:shadow-[0_20px_50px_rgba(13,148,136,0.18)]',
      border: 'hover:border-teal-400 dark:hover:border-teal-505',
      glow: 'bg-teal-500/5 group-hover:bg-teal-500/10'
    },
    accounting: {
      shadow: 'hover:shadow-[0_20px_50px_rgba(70,80,95,0.14)] dark:hover:shadow-[0_20px_50px_rgba(70,80,95,0.18)]',
      border: 'hover:border-slate-400 dark:hover:border-slate-505',
      glow: 'bg-slate-500/5 group-hover:bg-slate-500/10'
    }
  };
  return mapping[category] || {
    shadow: 'hover:shadow-lg',
    border: 'hover:border-blue-400',
    glow: 'bg-slate-500/5'
  };
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [activeInfoPage, setActiveInfoPage] = useState<'privacy' | 'tos' | 'contact' | 'blog' | 'about' | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Light Mode Default
  const [isStickyAdVisible, setIsStickyAdVisible] = useState(true);
  const prevScrollPosRef = useRef<number>(0);

  // X Auto-Poster States
  const [isXPosterOpen, setIsXPosterOpen] = useState(false);
  const [xState, setXState] = useState<any>(null);
  const [xLoading, setXLoading] = useState(false);
  const [xMsg, setXMsg] = useState({ type: '', text: '' });
  const [customIndexInput, setCustomIndexInput] = useState('0');

  const fetchXState = async () => {
    try {
      const res = await fetch('/api/x/state');
      if (res.ok) {
        const data = await res.json();
        setXState(data);
        setCustomIndexInput(data.currentIndex.toString());
      }
    } catch (err) {
      console.error('Failed to parse X Auto-Poster state', err);
    }
  };

  const toggleXLoop = async () => {
    setXLoading(true);
    setXMsg({ type: '', text: '' });
    try {
      const res = await fetch('/api/x/toggle-loop', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setXMsg({ type: 'success', text: `Scheduler status updated. Loop is now ${data.isLoopActive ? 'ACTIVE' : 'PAUSED'}.` });
        fetchXState();
      }
    } catch (err) {
      setXMsg({ type: 'error', text: 'Network request failure while toggling scheduler state.' });
    } finally {
      setXLoading(false);
    }
  };

  const triggerXPostNow = async () => {
    setXLoading(true);
    setXMsg({ type: 'info', text: 'Invoking X API daily queue scheduler. Please wait...' });
    try {
      const res = await fetch('/api/x/post-now', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        const status = data.record.status === 'success' ? 'SUCCESS' : 'SIMULATED (keys missing)';
        setXMsg({ type: 'success', text: `Post triggered successfully! Mode: ${status} for "${data.record.toolName}".` });
        fetchXState();
      } else {
        setXMsg({ type: 'error', text: `Failed to trigger post: ${data.error}` });
      }
    } catch (err) {
      setXMsg({ type: 'error', text: 'Network request failure while executing post.' });
    } finally {
      setXLoading(false);
    }
  };

  const updateXIndex = async (indexNum: number) => {
    setXLoading(true);
    setXMsg({ type: '', text: '' });
    try {
      const res = await fetch('/api/x/set-index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: indexNum }),
      });
      const data = await res.json();
      if (data.success) {
        setXMsg({ type: 'success', text: `Tool queue head shifted to index ${data.currentIndex} (${data.nextTool?.name || 'unknown'}).` });
        fetchXState();
      } else {
        setXMsg({ type: 'error', text: data.error || 'Failed to update queue index.' });
      }
    } catch (err) {
      setXMsg({ type: 'error', text: 'Network error updating loop index.' });
    } finally {
      setXLoading(false);
    }
  };

  // Fetch X state periodically
  useEffect(() => {
    fetchXState();
    const timer = setInterval(fetchXState, 60000); // refresh panel info 60s
    return () => clearInterval(timer);
  }, []);

  // States for Tool request engine
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [userRequests, setUserRequests] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('careerpouch_tool_requests');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [reqName, setReqName] = useState('');
  const [reqCat, setReqCat] = useState('productivity');
  const [reqDesc, setReqDesc] = useState('');
  const [reqPriority, setReqPriority] = useState('Standard');

  useEffect(() => {
    localStorage.setItem('careerpouch_tool_requests', JSON.stringify(userRequests));
  }, [userRequests]);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqName.trim()) return;

    const newReq = {
      id: Date.now().toString(),
      name: reqName,
      category: reqCat,
      description: reqDesc,
      priority: reqPriority,
      date: new Date().toISOString().split('T')[0],
      status: '🟡 Pending verification'
    };

    setUserRequests(prev => [newReq, ...prev]);
    setReqName('');
    setReqDesc('');
    setReqPriority('Standard');
    alert(`💡 Success! "${reqName}" has been logged in your local request dashboard. We are auditing it for release!`);
  };

  const [jumpingCount, setJumpingCount] = useState(0);

  // Jump up animation metric count
  useEffect(() => {
    let start = 0;
    const end = TOOLS.length; // Live count 73
    if (start === end) return;
    
    const duration = 1000; // ms
    const increment = Math.ceil(end / (duration / 30));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setJumpingCount(end);
        clearInterval(timer);
      } else {
        setJumpingCount(start);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, []);

  // ---- LIGHTWEIGHT NATIVE SEO ROUTING SYNC ----
  useEffect(() => {
    const syncToolFromUrl = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      
      let toolId = params.get('tool');
      let pageId = params.get('page');
      
      if (!pageId && hash) {
        if (hash === '#privacy' || hash === '#/privacy') pageId = 'privacy';
        else if (hash === '#tos' || hash === '#/tos') pageId = 'tos';
        else if (hash === '#contact' || hash === '#/contact') pageId = 'contact';
        else if (hash === '#blog' || hash === '#/blog') pageId = 'blog';
        else if (hash === '#about' || hash === '#/about') pageId = 'about';
      }
      if (!pageId && pathname) {
        if (pathname === '/privacy' || pathname === '/privacy-policy') pageId = 'privacy';
        else if (pathname === '/tos' || pathname === '/terms') pageId = 'tos';
        else if (pathname === '/contact' || pathname === '/contact-us') pageId = 'contact';
        else if (pathname === '/blog') pageId = 'blog';
        else if (pathname === '/about') pageId = 'about';
      }

      if (pageId && ['privacy', 'tos', 'contact', 'blog', 'about'].includes(pageId)) {
        setActiveInfoPage(pageId as any);
        setSelectedTool(null);
        const formattedPageName = pageId === 'tos' ? 'Terms of Service' : pageId.charAt(0).toUpperCase() + pageId.slice(1);
        document.title = `${formattedPageName} | CareerPouch - Premium Privacy Suite`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', `${formattedPageName} page on CareerPouch. Free offline-first tools for developers and careers.`);
        }
        setTimeout(() => {
          document.getElementById('info-page-workspace-anchor')?.scrollIntoView({ behavior: 'smooth' });
        }, 305);
        return;
      } else {
        setActiveInfoPage(null);
      }

      if (!toolId && pathname && pathname.startsWith('/tools/')) {
        toolId = pathname.replace(/^\/tools\//, '').replace(/\/$/, '');
      }
      
      if (!toolId && hash && hash.startsWith('#/tools/')) {
        toolId = hash.replace(/^#\/tools\//, '');
      }
      
      if (toolId) {
        const foundTool = TOOLS.find(t => t.id === toolId);
        if (foundTool) {
          setSelectedTool(foundTool);
          document.title = `${foundTool.name} - Free Offline Builder | CareerPouch`;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute('content', `${foundTool.description} Free offline-first developer and business utility tool inside CareerPouch.`);
          }
          // Scroll into view elegantly on direct load
          setTimeout(() => {
            document.getElementById('tool-workspace-anchor')?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        } else {
          setSelectedTool(null);
          document.title = `CareerPouch - ${TOOLS.length}-in-1 Dynamic Utility Briefcase`;
        }
      } else {
        setSelectedTool(null);
        document.title = `CareerPouch - ${TOOLS.length}-in-1 Dynamic Utility Briefcase`;
      }
    };

    // Main mount check
    syncToolFromUrl();

    // Listen to native back/forward browser buttons
    window.addEventListener('popstate', syncToolFromUrl);
    return () => window.removeEventListener('popstate', syncToolFromUrl);
  }, []);

  // ---- DYNAMIC NAVIGATION PINNED FAVORITES STATE ----
  const [pinnedToolIds, setPinnedToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('career_pouch_pinned');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['ats-cv', 'kanban-board', 'json-validator']; // standard starter defaults
  });

  useEffect(() => {
    localStorage.setItem('career_pouch_pinned', JSON.stringify(pinnedToolIds));
  }, [pinnedToolIds]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const togglePinTool = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation();
    setPinnedToolIds(prev => 
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  // ---- QUANTIFY ACTUAL LOCAL STORAGE MEMORY USAGE ----
  const [browserStorageKB, setBrowserStorageKB] = useState(0.8);
  useEffect(() => {
    let totalChars = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('career_pouch_')) {
        totalChars += (key.length + (localStorage.getItem(key) || '').length);
      }
    }
    // Convert to estimated KB safely
    const kb = parseFloat(((totalChars * 2) / 1024).toFixed(2));
    setBrowserStorageKB(kb > 0.1 ? kb : 0.8);
  }, [selectedTool, pinnedToolIds]);

  // Dice roll random utilities discovery trigger
  const handleRandomToolDiscovery = () => {
    const randomIndex = Math.floor(Math.random() * TOOLS.length);
    const discoveredObj = TOOLS[randomIndex];
    if (discoveredObj) {
      handleSelectTool(discoveredObj);
    }
  };

  // Clear all saves client storage flushed mechanism
  const handleResetApplicationState = () => {
    if (confirm('Are you sure you want to restore the briefcase? This will clear all local resume profiles, job application trackers, kanban boards, and credentials.')) {
      localStorage.clear();
      alert('Local browser sandbox memory flushed successfully. Restoring base modules.');
      window.location.reload();
    }
  };

  const handleSelectInfoPage = (page: 'privacy' | 'tos' | 'contact' | 'blog' | 'about') => {
    setSelectedTool(null);
    setActiveInfoPage(page);
    
    // Smoothly update URL
    const newUrl = `?page=${page}`;
    window.history.pushState({ pageId: page }, '', newUrl);
    
    // Update SEO title
    const formattedPageName = page === 'tos' ? 'Terms of Service' : page.charAt(0).toUpperCase() + page.slice(1);
    document.title = `${formattedPageName} | CareerPouch - Premium Privacy Suite`;
    
    setTimeout(() => {
      document.getElementById('info-page-workspace-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleCloseInfoPage = () => {
    setActiveInfoPage(null);
    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
    document.title = `CareerPouch - ${TOOLS.length}-in-1 Dynamic Utility Briefcase`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `CareerPouch is a ${TOOLS.length}-in-1 premium utility suitcase featuring ATS resume writers, secure converters, visual graphers, and calculators running securely inside your local browser memory.`);
    }
  };

  // Return to homepage trigger to reset active tool states
  const handleResetToHome = () => {
    setSelectedTool(null);
    setActiveInfoPage(null);
    setSelectedCategory('all');
    setSearchQuery('');
    
    // Smoothly update URL to root
    window.history.pushState({}, '', '/');
    document.title = `CareerPouch - ${TOOLS.length}-in-1 Dynamic Utility Briefcase`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `CareerPouch is a ${TOOLS.length}-in-1 premium utility suitcase featuring ATS resume writers, secure converters, visual graphers, and calculators running securely inside your local browser memory.`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter tools based on search query and category
  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectTool = (tool: Tool) => {
    if (!selectedTool) {
      prevScrollPosRef.current = window.scrollY;
    }
    setSelectedTool(tool);
    
    // Update URL with clean paths for Programmatic SEO
    const newUrl = `/tools/${tool.id}`;
    window.history.pushState({ toolId: tool.id }, '', newUrl);
    
    // Swap SEO titles & description metadata
    document.title = `${tool.name} - Free Offline Builder | CareerPouch`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${tool.description} Free, 100% offline-first developer and career utility on CareerPouch.`);
    }

    // Dynamic Schema.org Google Rich Snippets updates
    const schemaScript = document.getElementById('default-manifest-schema');
    if (schemaScript) {
      const dynamicSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": `${tool.name} - CareerPouch Suite`,
        "url": `https://careerpouch.com/tools/${tool.id}`,
        "image": "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%234f46e5%22/><text y=%22.7em%22 x=%225%25%22 font-size=%2250%22 fill=%22%23ffffff%22 font-family=%22sans-serif%22 font-weight=%22bold%22>🦘 CP</text></svg>",
        "operatingSystem": "All",
        "applicationCategory": "DeveloperApplication",
        "description": tool.description,
        "browserRequirements": "Requires HTML5 compatible browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      };
      schemaScript.innerHTML = JSON.stringify(dynamicSchema, null, 2);
    }

    // Auto scroll to active tool workspace elegantly
    setTimeout(() => {
      document.getElementById('tool-workspace-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCloseTool = () => {
    setSelectedTool(null);
    
    // Smoothly remove product subpath on close
    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
    document.title = `CareerPouch - ${TOOLS.length}-in-1 Dynamic Utility Briefcase`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `CareerPouch is a ${TOOLS.length}-in-1 premium utility suitcase featuring ATS resume writers, secure converters, visual graphers, and calculators running securely inside your local browser memory.`);
    }

    // Reset default manifest schema
    const schemaScript = document.getElementById('default-manifest-schema');
    if (schemaScript) {
      const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "CareerPouch",
        "alternateName": "CareerPouch Suitcase of Utilities",
        "url": "https://careerpouch.com/",
        "image": "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%234f46e5%22/><text y=%22.7em%22 x=%225%25%22 font-size=%2250%22 fill=%22%23ffffff%22 font-family=%22sans-serif%22 font-weight=%22bold%22>🦘 CP</text></svg>",
        "operatingSystem": "All",
        "applicationCategory": "DeveloperApplication",
        "description": `Premium 100% responsive, client-side utility suite showcasing over ${TOOLS.length} career builders, coding converters, and designers.`,
        "browserRequirements": "Requires HTML5 compatible browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      };
      schemaScript.innerHTML = JSON.stringify(defaultSchema, null, 2);
    }

    // Restore the scroll position they were at before choosing a tool
    const targetScroll = prevScrollPosRef.current;
    setTimeout(() => {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }, 80);
  };

  // Directly select a featured tool from category block footer click
  const handleSelectFeaturedTool = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation(); // Stop parent category toggle click
    const targetTool = TOOLS.find(t => t.id === toolId);
    if (targetTool) {
      handleSelectTool(targetTool);
    }
  };

  // Filter list by category block click and scroll
  const handleCategorySelection = (catId: CategoryType) => {
    setSelectedCategory(catId);
    setTimeout(() => {
      document.getElementById('toolsSectionHeader')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Render the tool component based on the category inside a centralized wrapper
  const renderActiveToolComponent = (tool: Tool) => {
    const cid = tool.category;
    if (cid === 'career') return <CareerTools toolId={tool.id} />;
    if (cid === 'productivity') return <ProductivityTools toolId={tool.id} isDarkMode={isDarkMode} />;
    if (cid === 'math') return <MathTools toolId={tool.id} />;
    if (cid === 'converters') return <ConverterTools toolId={tool.id} />;
    if (cid === 'text') return <TextTools toolId={tool.id} />;
    if (cid === 'design') return <DesignTools toolId={tool.id} />;
    if (cid === 'accounting') return <AccountingTools toolId={tool.id} />;
    return <div className="text-center py-4 font-mono text-xs text-slate-500">Unrecognized tool layout schema.</div>;
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 font-sans ${isDarkMode ? 'bg-[#090d16] text-slate-100' : 'bg-[#f6f8fa] text-slate-900'}`}>
      
      {/* Interactive, dynamic ambient light sources in absolute position */}
      <div className="absolute top-[5%] left-[-15%] w-[65vw] h-[65vw] max-w-[650px] max-h-[650px] rounded-full filter blur-[110px] pointer-events-none opacity-[0.22] dark:opacity-[0.14] bg-gradient-to-tr from-blue-400 to-indigo-600 mix-blend-initial animate-pulse duration-[8000ms]" />
      <div className="absolute top-[35%] right-[-15%] w-[55vw] h-[55vw] max-w-[550px] max-h-[550px] rounded-full filter blur-[130px] pointer-events-none opacity-[0.18] dark:opacity-[0.11] bg-gradient-to-tr from-sky-400 to-indigo-600 mix-blend-initial animate-pulse duration-[10000ms] delay-[1500ms]" />
      <div className="absolute bottom-[10%] left-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full filter blur-[120px] pointer-events-none opacity-[0.15] dark:opacity-[0.09] bg-gradient-to-br from-teal-400 to-emerald-500 mix-blend-initial animate-pulse duration-[7000ms] delay-[3000ms]" />
      
      {/* Ambient background Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.1px,transparent_1.1px)] dark:bg-[radial-gradient(#1e293b_1.1px,transparent_1.1px)] [background-size:24px_24px] opacity-40 dark:opacity-60 pointer-events-none" />

      {/* Primary elevate wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 space-y-10">
        
        {/* INFO SPECIFIC ROUTED PAGES (Privacy, TOS, Contact, Blog, About) */}
        {activeInfoPage && (
          <div 
            id="info-page-workspace-anchor" 
            className={`p-6 sm:p-10 rounded-3xl border transition-all animate-fade shadow-2xl relative ${
              isDarkMode 
                ? 'bg-slate-950 border-slate-800/80 shadow-slate-950/45 text-white' 
                : 'bg-white border-slate-200 shadow-slate-200/40 text-slate-900'
            }`}
          >
            <div className="flex justify-between items-center pb-4 border-b border-slate-250 dark:border-slate-800/60 mb-6 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/15">
                  LEGAL & INFORMATION
                </span>
                <span className="text-slate-400 font-mono text-xs">/</span>
                <span className="text-xs text-slate-500 font-mono font-bold select-all">careerpouch.com/{activeInfoPage}</span>
              </div>
              <button
                onClick={handleCloseInfoPage}
                className="flex items-center gap-1.5 bg-slate-850 hover:bg-slate-750 text-slate-100 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer"
              >
                <Icon name="X" size={13} /> Close Document
              </button>
            </div>

            {/* Content Switcher */}
            {activeInfoPage === 'privacy' && (
              <div className="max-w-4xl space-y-6">
                <h1 className="text-3xl font-black tracking-tight mb-2">Privacy Policy & Cookie Statement</h1>
                <p className="text-xs text-slate-400 font-mono">Last updated: June 10, 2026</p>
                
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-300">1. Zero Server-Side Logging Philosophy</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    At CareerPouch, user confidentiality is our primary directive. Unlike traditional SaaS web utilities, CareerPouch operates completely client-side. This means that <strong>none of your personal records, parsed documents, PDF files, base64 strings, credentials, or text utilities are ever transmitted to or stored on remote web servers</strong>.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    All conversions, file parsing, mathematical plotting, and document creation engines run locally in your system browser sandbox, preserving your full data ownership rights.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-300">2. Cookies and Browser Storage Usage</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    We use cookies and local storage (such as HTML5 <code>localStorage</code>) to enable high-value productivity features like saving your resume progress, persisting your active Kanban board cards, and remembering your customized settings.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    These elements do not contain personal tracking codes and can be wiped completely at any time by clearing your browser cache or clicking "Flush Briefcase" in the application settings inside the sidebar.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-300">3. Third-Party Web Advertising Networks (Google AdSense & Adsterra)</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    To keep all 41+ developer and career-focused tools 100% free of charge for users worldwide, we work with trusted advertising networks including Google AdSense and Adsterra to display standard graphical ads.
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-2 text-slate-600 dark:text-slate-300">
                    <li>Google, as a third-party vendor, uses cookies to serve ads on CareerPouch.</li>
                    <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to this site and/or other sites on the Internet.</li>
                    <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline">Google Ad Settings</a> or opting out in their browser's Privacy Preferences.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-300">4. European GDPR & California CCPA Rights</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Under standard data privacy frameworks, you hold the absolute right to be forgotten or download your profile. Since we do not hold, collect, or transmit any database records for any user, your right to be forgotten is fully guaranteed out-of-the-box: you can wipe your entire profile history directly from your browser settings or via the footer "Reset App State" option.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-300">5. Continuous Compliance Contact</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    If you have questions about local-first data processing or cookie configuration, contact our team directly at <span className="font-mono text-indigo-600 dark:text-indigo-300">aquamarinesilver37@gmail.com</span>.
                  </p>
                </section>
              </div>
            )}

            {activeInfoPage === 'tos' && (
              <div className="max-w-4xl space-y-6">
                <h1 className="text-3xl font-black tracking-tight mb-2">Terms of Service</h1>
                <p className="text-xs text-slate-400 font-mono">Effective starting: June 10, 2026</p>
                
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-300">1. Terms of Use & Access Rights</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    CareerPouch grants a non-exclusive, fully revocable, completely free license to utilize our suite of over 41 sandbox tools. The tools are free for personal, educational, commercial, or professional developer use.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-300">2. Prohibited Conduct</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Since the application is 100% serverless and client-side, physical abuse of our server resources is inherently prevented. However, users are requested to not bypass or modify any ad configurations or reverse-engineer client code assets in bad faith.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-300">3. Absolute Disclaimer of Warranty</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    ALL TOOLS AND LAYOUTS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESSED OR IMPLIED. CAREERPOUCH CANNOT GUARANTY 100% METRIC COHERENCY FOR PDF OUTPUTS OR PERFECT REAL-TIME COMPILATIONS, ALTHOUGH WE STRIVE FOR PRISTINE CODE QUALITY. USER HOLDS TOTAL RESPONSIBILITY FOR CORROBORATING CALCULATOR ESTIMATIONS.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-300">4. Modifications and Serverless Continuity</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    We reserve the right to dynamically add, edit, or de-register developer utility panels to prevent visual bloat and maintain top-tier performance for our global audience.
                  </p>
                </section>
              </div>
            )}

            {activeInfoPage === 'contact' && (
              <div className="max-w-4xl space-y-6">
                <div>
                  <h1 className="text-3xl font-black tracking-tight mb-2">Contact Us & Technical Support</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-sans">
                    Have a feature request, bug report, or business proposal? Reach out to our community inbox and we'll reply within 24-48 business hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  {/* Left Side: Contact details */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-205 dark:border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400">
                        <Icon name="Mail" size={16} />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider">Official Email Inbox</span>
                      </div>
                      <p className="text-sm font-semibold select-all text-indigo-600 dark:text-indigo-300">aquamarinesilver37@gmail.com</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Direct channel for developer-to-developer requests, advertising integrations, and white-label inquiries.</p>
                    </div>

                    <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-205 dark:border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
                        <Icon name="Cpu" size={16} />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider">Global Server Status</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                        CareerPouch relies on <strong>Cloudflare CDN Caching Edge servers</strong> for zero-latency asset distribution. Fully redundant and 100% online.
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Interactive local support form */}
                  <div className="md:col-span-3">
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.currentTarget);
                        const ticket = {
                          id: Date.now(),
                          sender: data.get('sender_name'),
                          email: data.get('sender_email'),
                          subject: data.get('sender_subject'),
                          msg: data.get('sender_message'),
                          date: new Date().toLocaleString()
                        };
                        try {
                          const existing = JSON.parse(localStorage.getItem('careerpouch_user_tickets') || '[]');
                          localStorage.setItem('careerpouch_user_tickets', JSON.stringify([...existing, ticket]));
                        } catch (err) {}
                        alert('Your message was successfully compiled and queued! Because CareerPouch runs entirely on the client, this message has been simulated and saved to your browser cache. For actual inbox processing, please copy this text and email us at aquamarinesilver37@gmail.com.');
                        e.currentTarget.reset();
                      }}
                      className="p-6 bg-slate-900/45 dark:bg-slate-900/60 rounded-2xl border border-slate-205 dark:border-slate-800 space-y-4"
                    >
                      <h3 className="text-sm font-bold font-mono uppercase tracking-widest text-slate-500 dark:text-slate-300">Secure Contact Portal</h3>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 mb-1">Your Name</label>
                        <input required name="sender_name" type="text" placeholder="John Doe" className="w-full bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-950 dark:text-white" />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 mb-1">Your Email</label>
                        <input required name="sender_email" type="email" placeholder="johndoe@gmail.com" className="w-full bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-950 dark:text-white" />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 mb-1">Subject</label>
                        <input required name="sender_subject" type="text" placeholder="Advertising space or Tool integration request" className="w-full bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-950 dark:text-white" />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 mb-1">Message Detail</label>
                        <textarea required name="sender_message" rows={4} placeholder="Type your message here..." className="w-full bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-950 dark:text-white resize-none" />
                      </div>

                      <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-550 hover:to-indigo-550 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/10 cursor-pointer">
                        Send Secure Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {activeInfoPage === 'about' && (
              <div className="max-w-4xl space-y-6">
                <h1 className="text-3xl font-black tracking-tight mb-2">About CareerPouch</h1>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">The 41-in-1 Dynamic Utility Briefcase for Careers & Developers.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 pointer-events-none">
                  <div className="p-4 bg-slate-100/50 dark:bg-slate-900/40 rounded-2xl border border-slate-205 dark:border-slate-800 space-y-1 text-center">
                    <span className="text-3xl font-black block bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">41+</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">Offline-First Tools</span>
                  </div>
                  <div className="p-4 bg-slate-100/50 dark:bg-slate-900/40 rounded-2xl border border-slate-205 dark:border-slate-800 space-y-1 text-center">
                    <span className="text-3xl font-black block bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">3.0k+</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">Daily Global Visitors</span>
                  </div>
                  <div className="p-4 bg-slate-100/50 dark:bg-slate-900/40 rounded-2xl border border-slate-205 dark:border-slate-800 space-y-1 text-center">
                    <span className="text-3xl font-black block bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">100%</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono font-bold">Privacy Guaranteed</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  CareerPouch was designed out of a growing need for fast, clean, zero-compromise developer tools and career layout systems. Traditional tools are bloated with heavy analytics trackers, account walls, slow load speeds, and potential server-side data leaks.
                </p>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  We engineered CareerPouch to be <strong>entirely local-first</strong>. When you compile an ATS CV template, convert a base64 string, analyze statistics, or plot custom function slopes, every mathematical algorithm is executed inside your own device CPU. No databases, no login forms, no latency.
                </p>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  The Metaphor of the <strong>Kangaroo 🦘 pouch and professional briefcase</strong> represent compactness, portability, and native storage of high-value tools. We hope you enjoy using the suite and find it helpful in optimizing your daily workflows!
                </p>
              </div>
            )}

            {activeInfoPage === 'blog' && (
              <div className="max-w-4xl space-y-8">
                <div>
                  <h1 className="text-3xl font-black tracking-tight mb-2">Guides & Developer Tutorials</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    High-impact articles prepared by our engineering and recruitment experts to boost your career and technical proficiency.
                  </p>
                </div>

                {/* List of 4 Articles */}
                <div className="space-y-8">
                  {/* Article 1 */}
                  <article className="p-6 bg-slate-50/50 dark:bg-slate-900/35 border border-slate-205 dark:border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-mono">
                      <span>CAREER ADVICE</span>
                      <span>•</span>
                      <span>5 MIN READ</span>
                    </div>
                    <h2 className="text-xl font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Mastering ATS Compliance: Build a Professional Resume in 2026</h2>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      When seeking corporate job placements, over 95% of fortune 500 companies process applicants through Applicant Tracking Systems (ATS) like Workday, Taleo, and Greenhouse. These platforms automatically digest PDF and parsed doc formats, analyzing structural phrases to score relevancy. 
                    </p>
                    <div className="text-xs text-slate-600 dark:text-slate-500 bg-slate-100/40 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-250 dark:border-slate-850 font-mono space-y-1">
                      <p className="font-bold text-slate-700 dark:text-slate-400">ATS Optimization Success Checklist:</p>
                      <p>✅ Use a single-column layout without tables or absolute-positioned text frames.</p>
                      <p>✅ Ensure fonts are standard (Inter, Arial, Georgia) and NOT converted to bitmap vector path outlines.</p>
                      <p>✅ Include industry-specific keywords (e.g. "React development", "Timezone synchronization", "JSON parser") directly.</p>
                    </div>
                  </article>

                  {/* Article 2 */}
                  <article className="p-6 bg-slate-55/50 dark:bg-slate-900/35 border border-slate-205 dark:border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                      <span>WEB SECURITY</span>
                      <span>•</span>
                      <span>6 MIN READ</span>
                    </div>
                    <h2 className="text-xl font-bold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">The Rise of Local-First Web Applications</h2>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      As internet data privacy rules harden globally (including GDPR and CCPA), the serverless local-first philosophy is taking over the developer space. Traditionally, processing any JWT inspect, Luhn card verification, or resume compilation demanded uploading private records to an external cloud cluster database.
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      Local-first architectures process data exclusively in browser sandbox instances. This completely decouples user operations from hardware databases, guaranteeing zero latency, absolute immunity to server breaches, and continuous offline availability.
                    </p>
                  </article>

                  {/* Article 3 */}
                  <article className="p-6 bg-slate-55/50 dark:bg-slate-900/35 border border-slate-205 dark:border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 text-xs font-bold font-mono">
                      <span>DEVELOPER RESOURCES</span>
                      <span>•</span>
                      <span>4 MIN READ</span>
                    </div>
                    <h2 className="text-xl font-bold hover:text-amber-600 dark:hover:text-emerald-400 transition-colors">Demystifying JSON, XML, and YAML: A Conversational Guide</h2>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      Format translation constitutes a major share of developer workflows. Whether config parsing, backend API payload mapping, or client rendering, understanding JSON (JavaScript Object Notation), XML (eXtensible Markup Language), and YAML (YAML Ain't Markup Language) is key.
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      JSON remains standard for application network payloads because of its direct parsing speed. YAML excels in Kubernetes and cloud config due to human readability, while XML serves enterprise operations. Utilizing offline converters on CareerPouch makes transition safe and fast.
                    </p>
                  </article>

                  {/* Article 4 */}
                  <article className="p-6 bg-slate-55/50 dark:bg-slate-900/35 border border-slate-205 dark:border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 text-xs font-bold font-mono">
                      <span>TIME MANAGEMENT</span>
                      <span>•</span>
                      <span>5 MIN READ</span>
                    </div>
                    <h2 className="text-xl font-bold hover:text-pink-600 dark:hover:text-pink-450 transition-colors">Understanding Epoch Timestamps & Distributed Timezones</h2>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      Unix epoch time represents the count of seconds elapsed since January 1, 1970 (UTC), omitting leap seconds. In modern computer science, coordinating clocks across distributed server environments is an absolute prerequisite to prevent database collision and data race states.
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      A local epoch converter utility, combined with timezone offset coordinators, lets engineers visualize exactly how milliseconds align across Global boundaries instantly without triggering async timezone database locks.
                    </p>
                  </article>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ACTIVE WORKSPACE AREA AT ANCHOR - THEME ADAPTIVE */}
        {selectedTool && (
          <div 
            id="tool-workspace-anchor" 
            className={`p-6 rounded-3xl border transition-all animate-fade shadow-2xl ${
              isDarkMode 
                ? 'bg-slate-950 border-slate-800/80 shadow-slate-950/45 text-white' 
                : 'light-tool-workspace bg-white border-slate-200 shadow-slate-200/40 text-slate-900'
            }`}
          >
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800/60 mb-5 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/15">
                  {selectedTool.category.toUpperCase()} UTILITY
                </span>
                <span className="text-slate-400 dark:text-slate-650 font-mono text-xs">/</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold select-all">tools/{selectedTool.id}/index.html</span>
              </div>
              <button
                onClick={handleCloseTool}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm"
              >
                <Icon name="X" size={13} /> Dismiss Sandbox
              </button>
            </div>

            {/* SEO OPTIMIZED TOOL HEADER & INTERACTIVE EXPOSURE PANEL inside human readable view */}
            <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-blue-500/5 dark:from-indigo-400/5 dark:to-blue-400/5 border border-indigo-200/50 dark:border-indigo-400/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Icon name={selectedTool.icon} className="text-indigo-600 dark:text-indigo-400 shrink-0" size={22} />
                    {selectedTool.name}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 dark:border-emerald-500/20 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-550 dark:bg-emerald-500 animate-pulse" />
                    Google Core Vitally Indexed
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
                  {selectedTool.description} This tool runs entirely in your local browser sandbox to provide instant results with zero server transfers.
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <div className="p-2 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-2 shadow-sm text-center">
                  <div className="p-1 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                    <Icon name="Shield" size={13} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[8px] font-mono uppercase text-slate-400 dark:text-slate-500">GDPR Compliance</span>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350 font-sans">100% Client-Side Only</span>
                  </div>
                </div>
                <div className="p-2 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-2 shadow-sm text-center">
                  <div className="p-1 rounded bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-300">
                    <Icon name="Activity" size={13} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[8px] font-mono uppercase text-slate-400 dark:text-slate-500">Performance</span>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350 font-sans">0ms Client Latency</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Switcher Subbar inside active category */}
            <div className="mb-6 p-3 bg-slate-900/65 rounded-2xl border border-slate-800/60 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Icon name="Compass" size={11} className="text-white" />
                </div>
                <span className="text-xs font-bold text-slate-300">Workspace Quick-Jump:</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full scrollbar-none">
                {TOOLS.filter(t => t.category === selectedTool.category).map(sibling => (
                  <a
                    key={sibling.id}
                    href={`/tools/${sibling.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectTool(sibling);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all shrink-0 cursor-pointer border ${
                      sibling.id === selectedTool.id
                        ? 'bg-indigo-600 text-white border-transparent shadow shadow-indigo-600/20'
                        : 'bg-slate-950 text-slate-400 border-slate-850 hover:text-slate-200'
                    }`}
                  >
                    {sibling.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Standard full-scale tool body renderer */}
            <div className="p-1.5 overflow-x-auto min-h-[300px]">
              {renderActiveToolComponent(selectedTool)}
            </div>
          </div>
        )}

        {/* HERO INTRO AND SEARCH WRAPPER - CLEAN GLASS DESIGN DIRECT FROM THE ATTACHMENT */}
        <section className={`py-14 px-6 rounded-3xl text-center border overflow-hidden relative transition-all duration-500 ${isDarkMode ? 'bg-slate-900/40 backdrop-blur-xl border-slate-800 shadow-2xl shadow-indigo-950/10' : 'bg-white backdrop-blur-xl border-indigo-100/80 shadow-xl shadow-indigo-100/30'}`}>
          {/* Animated colorful gradient line on top - High quality blue-sky-teal spectrum */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-sky-500 via-indigo-600 to-teal-400" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-400/5 dark:to-blue-400/5 border border-indigo-500/20 dark:border-indigo-400/10 rounded-full mb-3 select-none">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className={`text-[10px] font-bold tracking-widest uppercase font-mono ${isDarkMode ? 'text-teal-400' : 'text-indigo-950'}`}>
              ✨ Comprehensive Local Document Sandbox & Utilities Deck
            </span>
          </div>

          {/* Interactive animated physical mini suitcase container */}
          <DynamicVisualSuitcase jumpingCount={jumpingCount} />

          <h2 className="text-5xl font-black md:text-6xl tracking-tight leading-none font-sans mt-3 flex flex-col items-center justify-center gap-1 select-none">
            <span className={`bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 via-sky-300 to-indigo-300' : 'from-blue-700 via-indigo-955 to-sky-600'} bg-clip-text text-transparent inline-flex items-center gap-2 flex-wrap justify-center`}>
              CareerPouch
              <span className="text-xs md:text-sm font-black tracking-widest font-mono uppercase px-2.5 py-1 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-650 to-pink-500 text-white shadow-lg shadow-pink-500/20 animate-pulse cursor-default">
                AI POWERED
              </span>
            </span>
            <span className={`block text-xl md:text-2xl font-extrabold mt-2 tracking-[0.25em] uppercase font-mono ${isDarkMode ? 'text-teal-400' : 'text-slate-700'}`}>
              Dynamic Suitcase
            </span>
          </h2>

          {/* EYE-CATCHING COLOURED STYLISH HIGHLIGHT BOX FOR DESCRIPTION */}
          <div className="max-w-3xl mx-auto mt-6 p-5 rounded-2xl relative overflow-hidden bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-teal-500/10 dark:from-blue-500/5 dark:via-indigo-500/5 dark:to-teal-500/5 border border-indigo-500/25 dark:border-indigo-500/10 shadow-lg backdrop-blur-sm group">
            {/* Ambient subtle decorative lights */}
            <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-blue-550/20 rounded-full filter blur-xl opacity-75 group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-teal-500/20 rounded-full filter blur-xl opacity-70 group-hover:scale-125 transition-transform duration-700" />
            
            <p className={`text-base font-bold leading-relaxed font-sans relative z-10 ${isDarkMode ? 'text-indigo-200' : 'text-indigo-950'}`}>
              🚀 Search or select from our verified sandbox blocks to convert datasets, organize resumes, write layouts, and compute formulas offline with private storage.
            </p>
          </div>

          {/* SEARCH & SYSTEM THEME STATE TOGGLE CONTROLLER WRAPPER */}
          <div className="max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
            {/* DYNAMIC COLOURFUL GLOWING OUTLINE SEARCH BAR */}
            <div className="flex-1 w-full relative select-none p-[2.5px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-600 via-sky-400 to-teal-400 shadow-md group hover:shadow-indigo-500/20 transition-all duration-350">
              {/* Smirky Companion "You will need me!" */}
              <div className="absolute -top-7 left-6 flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/95 dark:bg-slate-950/95 text-[10px] font-mono font-bold rounded-lg border border-indigo-505/30 hover:border-teal-500/50 text-slate-200 shadow-lg cursor-default select-none z-25 group-hover:-translate-y-0.5 transition-all duration-300">
                <span>😏</span>
                <span className="text-teal-400">You'll need me!</span>
              </div>

              {/* Interactive Glow Backdrop layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-600 via-sky-500 to-teal-400 rounded-full blur-[6px] opacity-40 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative flex items-center rounded-full bg-transparent overflow-hidden">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 z-20">
                  <Icon name="Search" size={18} />
                </div>
                <input
                  id="searchInput"
                  type="text"
                  placeholder={`Search through all ${jumpingCount}+ professional tools instantly...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-40 py-4 rounded-full border-none text-sm font-sans transition-all focus:outline-none relative z-10 ${
                    isDarkMode
                      ? 'bg-slate-950 text-slate-100 placeholder:text-slate-500'
                      : 'bg-white text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                {/* Surprise me Dice random router */}
                <button
                  onClick={handleRandomToolDiscovery}
                  className={`absolute right-28 top-2 bottom-2 px-3.5 z-20 rounded-full transition-all flex items-center justify-center gap-1 cursor-pointer border hover:scale-105 active:scale-95 ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-800 text-indigo-400 hover:text-indigo-300 hover:border-slate-750' 
                      : 'bg-slate-50 border-slate-205 text-indigo-600 hover:bg-indigo-100/80 hover:border-indigo-200'
                  }`}
                  title="Surprise Me: Roll Dice for a random useful tool sandbox!"
                >
                  <Icon name="Dices" size={15} />
                  <span className="text-[10px] font-bold font-mono">Roll</span>
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('toolsSectionHeader')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="absolute right-2 top-1.5 bottom-1.5 px-6 z-20 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-full text-xs shadow-md transition-all duration-200 flex items-center gap-1.5 group cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>

            {/* HIGHLIGHTED INTERACTIVE THEME TOGGLE BUTTON */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative p-3.5 rounded-full border-2 transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer shadow-lg flex items-center justify-center gap-2 group/theme-toggle shrink-0 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-slate-900 to-indigo-950 border-indigo-500 text-yellow-400 hover:border-yellow-400 hover:shadow-yellow-400/25' 
                  : 'bg-gradient-to-r from-white to-blue-50 border-blue-600 text-blue-600 hover:border-blue-500 hover:bg-blue-100/50 hover:shadow-blue-500/20'
              }`}
              title="Toggle Layout theme state (Dark / Light Mode)"
            >
              {/* Pulsing colored ring glow around the toggle to capture attention */}
              <div className={`absolute -inset-1 rounded-full blur-[4px] opacity-40 group-hover/theme-toggle:opacity-75 transition-opacity duration-300 animate-pulse ${
                isDarkMode ? 'bg-yellow-400/30' : 'bg-blue-500/30'
              }`} />
              
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={18} className="relative z-10 transition-transform duration-500 group-hover/theme-toggle:rotate-45" />
              <span className="text-xs font-black tracking-widest font-mono uppercase pr-1.5 relative z-10">
                {isDarkMode ? 'Light' : 'Dark'}
              </span>
            </button>
          </div>

          {/* DYNAMIC ACTIONS BAR DIRECTLY BELOW THE SEARCH BAR SECTION */}
          <div className="mt-6 flex flex-wrap justify-center gap-3.5">
            <button
              onClick={() => setIsRequestModalOpen(true)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden group/req-btn border ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 hover:bg-indigo-950 hover:border-indigo-500/40 text-indigo-300 hover:text-white shadow-indigo-950/20' 
                  : 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 text-indigo-700 hover:text-indigo-900 shadow-indigo-100/10'
              }`}
              title="Request a customized offline tool from our coding team"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <Icon name="Lightbulb" size={13} className="text-amber-500" />
              <span>Can't find a tool? Request a customized offline tool</span>
              {userRequests.length > 0 && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </button>

            <button
              onClick={() => { setIsXPosterOpen(true); fetchXState(); }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden group/x-btn border ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 hover:bg-blue-950 hover:border-blue-500/40 text-blue-400 hover:text-white shadow-indigo-950/20' 
                  : 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 text-blue-700 hover:text-blue-900 shadow-blue-100/10'
              }`}
              title="Open the X Auto-Posting Loop Controls and state dashboard"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${xState?.isLoopActive ? 'bg-emerald-550' : 'bg-rose-550'}`} />
              <Icon name="Twitter" size={13} className="text-blue-500 group-hover/x-btn:scale-115 transition-transform" />
              <span>X Auto-Poster Integration</span>
              <span className="text-[10px] opacity-75 px-1.5 py-0.5 rounded-md bg-white/10 dark:bg-black/20 text-blue-600 dark:text-blue-400">
                {xState?.isLoopActive ? 'Loop Active' : 'Paused'}
              </span>
            </button>
          </div>

          {/* HIGH-FIDELITY ZERO-DATA PRIVACY & LOCAL SECURITY SEAL PANEL */}
          <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-200/40 dark:border-slate-800/80">
            {/* Blinking Live Security Status Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 rounded-full mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span className="text-[10px] font-black tracking-widest uppercase font-mono text-emerald-600 dark:text-emerald-400">
                ● Offline Sandbox Secure Mode: Active & Fully Isolated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Pillar 1: No remote server uploads */}
              <div className="p-4 rounded-xl hover:bg-slate-500/5 transition-all group/pillar">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/pillar:scale-110 transition-transform">
                    <Icon name="Shield" size={16} />
                  </div>
                  <h4 className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                    No Server Uploads
                  </h4>
                </div>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Your resumes, documents, and lists are compiled <strong className="text-blue-600 dark:text-sky-455">100% locally</strong> inside your browser. Absolutely no remote servers process or store your custom files.
                </p>
              </div>

              {/* Pillar 2: Wiped on Close */}
              <div className="p-4 rounded-xl hover:bg-slate-500/5 transition-all group/pillar">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover/pillar:scale-110 transition-transform">
                    <Icon name="EyeOff" size={16} />
                  </div>
                  <h4 className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                    Instant RAM Purge
                  </h4>
                </div>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  All tools utilize transient memory. The moment you close or refresh this tab, all active states are completely and permanently <strong className="text-teal-600 dark:text-teal-400">purged from your machine</strong>.
                </p>
              </div>

              {/* Pillar 3: Zero Trackers */}
              <div className="p-4 rounded-xl hover:bg-slate-500/5 transition-all group/pillar">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover/pillar:scale-110 transition-transform">
                    <Icon name="Database" size={16} />
                  </div>
                  <h4 className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                    Cookie-Less Design
                  </h4>
                </div>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  No third-party trackers, behavioral profiling, or cookie-sniffing. Enjoy a clean, fast, private sandbox environment optimized for <strong className="text-indigo-600 dark:text-indigo-400">maximum security</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ADSTERRA TOP NATIVE BANNER BLOCK - HIGH-EARNING POSITION DIRECTLY UNDER INTRO DESK */}
        <div className="w-full">
          <AdsterraBanner id="ad-top" bannerKey="29552977" />
        </div>

        {/* INTERACTIVE PINNED SHORTCUTS & SECURE MEMORY DESK INDICATORS */}
        <section className={`p-5 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-900/25 border-slate-800' : 'bg-slate-50/50 border-slate-205 shadow-sm'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Left Portion: Pinned Buttons Desk */}
            <div className="space-y-2.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <h3 className={`text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Icon name="Pin" size={13} className="text-blue-500 rotate-45 shrink-0" /> Pinned Quick-Launch Desk
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2 items-center">
                {pinnedToolIds.length === 0 ? (
                  <p className="text-xs text-slate-400 font-sans italic">
                    No custom shortcuts pinned yet. Click the pin icon in any utility card to customize your desk.
                  </p>
                ) : (
                  pinnedToolIds.map(pinnedId => {
                    const toolObj = TOOLS.find(t => t.id === pinnedId);
                    if (!toolObj) return null;
                    return (
                      <div
                        key={pinnedId}
                        className={`group/pin flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-xl border text-xs font-sans transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer ${
                          isDarkMode 
                            ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-100' 
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-805 shadow-slate-100'
                        }`}
                        onClick={() => handleSelectTool(toolObj)}
                      >
                        <span className="font-bold relative flex items-center gap-1.5 pr-1.5 border-r border-slate-800/20 dark:border-slate-800/60 leading-none">
                          <Icon name={toolObj.icon} size={12} className="text-blue-500 group-hover/pin:scale-110 transition-transform" />
                          {toolObj.name}
                        </span>
                        
                        {/* Instant Pin dismissal trigger */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPinnedToolIds(prev => prev.filter(id => id !== pinnedId));
                          }}
                          className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                          title="Unpin tool"
                        >
                          <Icon name="X" size={10} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Portion: Sandbox memory and secure indicators */}
            <div className="flex flex-wrap items-center gap-3.5 shrink-0 select-none text-[10px] font-mono border-t md:border-t-0 md:border-l border-slate-200/40 dark:border-slate-800 pt-3.5 md:pt-0 md:pl-5">
              <div className="space-y-1">
                <span className="text-slate-500 block">LOCAL SYSTEM STATE:</span>
                <span className="flex items-center gap-1 font-bold text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> SECURE SANDBOX ({browserStorageKB} KB)
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">CONNECTION speed:</span>
                <span className="font-bold text-blue-500 flex items-center gap-1">
                  <Icon name="Wifi" size={11} className="text-blue-500 shrink-0" /> OFFLINE ACCEL (~0.1ms)
                </span>
              </div>
              <button
                onClick={handleResetApplicationState}
                className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/15 text-rose-500 font-bold transition-all cursor-pointer text-[9px] uppercase tracking-wider font-mono shrink-0"
                title="Wipe browser memory and clear application caches"
              >
                Flush Cache
              </button>
            </div>

          </div>
        </section>

        {/* ✨ AI POWER SPOTLIGHT SUITE */}
        <section className={`p-6 rounded-3xl border space-y-5 ${
          isDarkMode 
            ? 'bg-slate-950/40 border-indigo-500/20' 
            : 'bg-gradient-to-r from-blue-50/70 via-indigo-50/70 to-teal-50/60 border-slate-200/80 shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest font-black text-indigo-600 dark:text-cyan-400 flex items-center gap-1.5 leading-none">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping inline-block" />
                Featured Intelligence Deck
              </span>
              <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                ⚡ AI & Premium Spotlight Hub
              </h3>
            </div>
            <span className="self-start md:self-auto px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 font-mono text-[10px] font-extrabold uppercase tracking-wider rounded-full border border-indigo-500/20">
              ⚡ Free Local Acceleration
            </span>
          </div>

          {/* Grid of high-demand AI tools in focus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.filter(t => t.id.startsWith('ai-') || t.id.includes('optimizer') || t.id.includes('remover') || t.id.includes('upscaler')).map((tool) => {
              const isPinned = pinnedToolIds.includes(tool.id);
              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelectTool(tool)}
                  className={`group relative p-4.5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between ${
                    isDarkMode
                      ? 'bg-slate-900/60 border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900'
                      : 'bg-white border-slate-200/75 hover:border-indigo-400/80 hover:bg-white'
                  }`}
                >
                  {/* Neon border glow line */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-450 flex items-center justify-center">
                        <Icon name={tool.icon} size={15} />
                      </div>
                      <button
                        onClick={(e) => togglePinTool(e, tool.id)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isPinned 
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                            : 'bg-slate-100 dark:bg-slate-950 border-slate-200/50 dark:border-slate-800/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-100'
                        }`}
                        title={isPinned ? 'Unpin from Quick Desk' : 'Pin to Quick Desk'}
                      >
                        <Icon name="Pin" size={11} className={isPinned ? 'rotate-45 fill-current' : 'rotate-45'} />
                      </button>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold font-sans text-slate-805 dark:text-slate-105 group-hover:text-indigo-600 dark:group-hover:text-cyan-405 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-[10px] text-slate-450 dark:text-slate-500 font-sans mt-1 line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[9px] font-mono uppercase text-slate-400 dark:text-slate-500 font-bold">
                    <span>{tool.category} utility</span>
                    <span className="text-indigo-505 dark:text-cyan-405 font-extrabold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Open <Icon name="ArrowRight" size={9} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COLOURED CATEGORIES FLOW BOARD (PRECISE RECONSTRUCTION OF THE TINYWOW ATTACHMENT BLOCKS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              Primary Category Sandboxes
            </h3>
            <span className="text-xs font-mono text-slate-400">{CATEGORIES.length} Suites ready</span>
          </div>

          {/* GRID OF GORGEOUS COLOR CATEGORY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DASHBOARD_BLOCKS.map((block) => {
              const count = TOOLS.filter(t => t.category === block.id).length;
              const matchesSelection = selectedCategory === block.id;

              return (
                <div
                  key={block.id}
                  onClick={() => handleCategorySelection(block.id)}
                  className={`group rounded-3xl border transition-all duration-300 flex flex-col cursor-pointer overflow-hidden transform hover:-translate-y-1 ${
                    matchesSelection 
                      ? 'ring-4 ring-blue-500/20 shadow-lg' 
                      : 'hover:shadow-xl'
                  } ${
                    isDarkMode 
                      ? 'border-slate-800 bg-slate-900/60' 
                      : 'border-slate-200/60 bg-white'
                  }`}
                >
                  {/* TOP COLOR WRAPPER - SOLID COLOURED HEADER MODULE */}
                  <div className={`p-6 bg-gradient-to-br ${block.colorClasses} flex-1 flex flex-col justify-between relative min-h-[160px]`}>
                    <div className="flex items-center justify-between">
                      {/* Circle Backdrop Icon */}
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center ${block.circleAccent} shadow-sm backdrop-blur-md`}>
                        <Icon name={block.icon} size={20} />
                      </div>
                      
                      {/* Translucent pill badge quantity */}
                      <span className="px-2.5 py-1 bg-white/20 text-white rounded-full text-[11px] font-bold font-mono tracking-wide backdrop-blur-md">
                        {count} tools
                      </span>
                    </div>

                    <div className="mt-5 space-y-1">
                      <h4 className="text-xl font-extrabold tracking-tight font-sans text-white flex items-center gap-1.5">
                        {block.name}
                      </h4>
                      <p className="text-[11px] text-white/85 max-w-[90%] font-medium leading-relaxed">
                        {block.subtitle}
                      </p>
                    </div>

                    {/* Arrow pointer positioned bottom right of block */}
                    <div className="absolute bottom-5 right-5 w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white backdrop-blur-md transform group-hover:translate-x-1 transition-all">
                      <Icon name="ChevronRight" size={12} />
                    </div>
                  </div>

                  {/* BOTTOM WHITE / LIGHT GRAY FOOTER WITH CLICKABLE FEATURED SHORTCUT */}
                  <div className={`px-5 py-3.5 border-t flex items-center justify-between text-xs font-sans ${
                    isDarkMode 
                      ? 'bg-slate-950/80 border-slate-800/80 text-slate-300' 
                      : 'bg-slate-50/95 border-slate-100 text-slate-650'
                  }`}>
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      Featured Tool:
                    </span>
                    <a
                      href={`/tools/${block.featuredId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectFeaturedTool(e, block.featuredId);
                      }}
                      className={`px-3 py-1 text-[11px] font-extrabold rounded-full border transition-all cursor-pointer ${block.btnColorTheme}`}
                    >
                      {block.featuredName}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TINYWOW STATISTICS DISPLAY BAR */}
          <div className={`py-6 px-8 rounded-3xl border flex flex-wrap justify-around items-center gap-6 ${
            isDarkMode 
              ? 'bg-slate-950/20 border-slate-800 text-white' 
              : 'bg-white border-slate-100 shadow-sm text-slate-800'
          }`}>
            <div className="flex items-center gap-3.5 min-w-[150px]">
              <span className="text-4xl font-extrabold text-indigo-600 tracking-tight font-sans">1M+</span>
              <span className="text-xs font-bold text-slate-400 leading-tight">Active<br />Clients</span>
            </div>
            <div className="w-px h-8 bg-slate-200 hidden lg:block" />
            <div className="flex items-center gap-3.5 min-w-[150px]">
              <span className="text-4xl font-extrabold text-orange-500 tracking-tight font-sans">10M+</span>
              <span className="text-xs font-bold text-slate-400 leading-tight">Calculations<br />Solved</span>
            </div>
            <div className="w-px h-8 bg-slate-200 hidden lg:block" />
            <div className="flex items-center gap-3.5 min-w-[150px]">
              <span className="text-4xl font-extrabold text-rose-500 tracking-tight font-sans">{jumpingCount}+</span>
              <span className="text-xs font-bold text-slate-400 leading-tight">Sandboxed<br />Modules</span>
            </div>
            <div className="w-px h-8 bg-slate-200 hidden lg:block" />
            <div className="flex items-center gap-3.5 min-w-[150px]">
              <span className="text-4xl font-extrabold text-[#0d9488] tracking-tight font-sans">500K+</span>
              <span className="text-xs font-bold text-slate-400 leading-tight">Secured<br />Saves</span>
            </div>
          </div>

          {/* ADSTERRA MID NATIVE BANNER BLOCK */}
          <div className="w-full">
            <AdsterraBanner id="ad-stats-bottom" bannerKey="29552977" />
          </div>
        </section>

        {/* DETAILED INDIVIDUAL UTILITIES MATCH LIST */}
        <section id="toolsSectionHeader" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/55 pb-4">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {selectedCategory === 'all' ? 'All Live Utility Modules' : `Filtered Category Block: ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Showing {filteredTools.length} of {TOOLS.length} modules available
              </p>
            </div>

            {/* Quick Filter Reset Selector */}
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="self-start text-xs font-mono font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 px-3 py-1.5 rounded-xl cursor-pointer"
              >
                Clear Category Filter (Show All)
              </button>
            )}
          </div>

          {/* PRIMARY INDEX TOOLS GRID */}
          <section id="toolsGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool, index) => {
              const isWorking = selectedTool?.id === tool.id;
              const ambient = getCategoryGlow(tool.category);

              const cardContent = (
                <a
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectTool(tool);
                  }}
                  className={`group p-6 rounded-2xl border cursor-pointer hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    isWorking
                      ? 'bg-slate-900 border-indigo-500 text-white shadow-xl ring-2 ring-indigo-500/20'
                      : isDarkMode
                        ? `bg-slate-950/40 border-slate-800 text-slate-100 ${ambient.shadow} ${ambient.border}`
                        : `bg-white/70 backdrop-blur-md border-slate-200 text-slate-900 ${ambient.shadow} ${ambient.border}`
                  }`}
                >
                  {/* Subtle Colored Ambient Light Source Spot on Card Hover */}
                  {!isWorking && (
                    <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full filter blur-[24px] opacity-15 pointer-events-none transition-all duration-300 group-hover:scale-125 group-hover:opacity-30 ${ambient.glow}`} />
                  )}

                  <div>
                    <div className="flex items-center justify-between relative z-10">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                        isWorking
                          ? 'bg-indigo-600/30 border-indigo-505/25 text-indigo-400'
                          : isDarkMode 
                            ? 'bg-slate-800/40 border-slate-700/20 text-indigo-400 group-hover:text-sky-400' 
                            : 'bg-slate-50 border-slate-150 text-blue-600 group-hover:text-blue-800 shadow-sm'
                      }`}>
                        <Icon name={tool.icon} size={18} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {/* Interactive dynamic pin shortcuts button */}
                        <span
                          onClick={(e) => togglePinTool(e, tool.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            pinnedToolIds.includes(tool.id)
                              ? 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                              : 'bg-transparent border-transparent text-slate-500 hover:text-slate-200'
                          }`}
                          title={pinnedToolIds.includes(tool.id) ? "Unpin shortcut" : "Pin shortcut to desk"}
                        >
                          <Icon name="Pin" size={11} className={pinnedToolIds.includes(tool.id) ? "rotate-45" : ""} />
                        </span>
                        <span className={`text-[9px] font-mono uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${
                          isWorking
                            ? 'text-indigo-300 border-indigo-700/50 bg-indigo-950/40'
                            : isDarkMode 
                              ? 'text-slate-500 border-slate-800 bg-slate-905/30' 
                              : 'text-slate-550 border-slate-200 bg-slate-50'
                        }`}>
                          {tool.category}
                        </span>
                      </div>
                    </div>

                    <h3 className={`text-base font-bold tracking-tight mt-3.5 transition-colors relative z-10 ${
                      isWorking 
                        ? 'text-white' 
                        : isDarkMode ? 'text-slate-200 group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                      {tool.name}
                    </h3>

                    <p className={`text-xs mt-1.5 transition-colors leading-relaxed font-sans relative z-10 ${
                      isWorking
                        ? 'text-slate-300'
                        : isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {tool.description}
                    </p>
                  </div>

                  <div className={`flex justify-between items-center border-t pt-3 mt-4 text-[10px] font-mono relative z-10 ${
                    isWorking
                      ? 'border-indigo-950/40 text-slate-405'
                      : isDarkMode ? 'border-slate-850 text-slate-500' : 'border-slate-100 text-slate-400'
                  }`}>
                    <span>Secure client sandbox</span>
                    <span className={`font-bold group-hover:translate-x-1.5 transition-transform flex items-center gap-0.5 ${
                      isWorking
                        ? 'text-indigo-300'
                        : isDarkMode ? 'text-indigo-400' : 'text-blue-600'
                    }`}>
                      Launch <Icon name="ChevronRight" size={10} />
                    </span>
                  </div>
                </a>
              );

              if (index === 2) {
                return (
                  <React.Fragment key={tool.id}>
                    {cardContent}
                    <div className="w-full h-full min-h-[250px]" key="sponsor-grid-1">
                      <AdsterraBanner id="grid-sponsor-middle-1" bannerKey="29553000" width={300} height={250} />
                    </div>
                  </React.Fragment>
                );
              }

              if (index === 7) {
                return (
                  <React.Fragment key={tool.id}>
                    {cardContent}
                    <div className="w-full h-full min-h-[250px]" key="sponsor-grid-2">
                      <AdsterraBanner id="grid-sponsor-middle-2" bannerKey="29553000" width={300} height={250} />
                    </div>
                  </React.Fragment>
                );
              }

              return cardContent;
            })}

            {filteredTools.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500 font-mono text-xs bg-white/20 dark:bg-slate-950/20 rounded-2xl">
                No matching CareerPouch tools catalogued for your search prompt.
              </div>
            )}
          </section>
        </section>

      </main>

      {/* FOOTER SECTION & ADSTERRA BOTTOM BANNER BLOCK */}
      <footer className={`mt-16 border-t relative transition-all pt-12 pb-8 overflow-hidden ${isDarkMode ? 'bg-gradient-to-b from-[#090d1c] to-[#04060a] border-slate-800 text-slate-300' : 'bg-gradient-to-b from-blue-50/10 to-indigo-50/40 border-slate-200 text-slate-600'}`}>
        {/* Colorful glowing bar on top of footer to resolve 'too colourless at the end' */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-sky-400 via-indigo-600 via-teal-400 to-emerald-400" />
        
        {/* Soft background light spots to bring rich detail without distraction */}
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full filter blur-[100px] pointer-events-none opacity-[0.14] bg-gradient-to-tr from-blue-600 to-indigo-500" />
        <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full filter blur-[100px] pointer-events-none opacity-[0.11] bg-gradient-to-tr from-teal-500 to-emerald-400" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <AdsterraBanner id="ad-bottom" bannerKey="29552977" />

          {/* TinyWow style columns block directly from the requested screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-slate-200/50 dark:border-slate-850">
            
            {/* Left Column: Styled logo matching TinyWow visually and description */}
            <div className="md:col-span-4 space-y-4">
              <a 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleResetToHome();
                }}
                className="inline-flex items-center gap-2.5 cursor-pointer transition-opacity group select-none"
                title="Return to homepage"
              >
                <div className="text-3xl font-black tracking-tight font-sans bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
                  CareerPouch
                </div>
              </a>
              <p className={`text-sm leading-relaxed max-w-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                CareerPouch provides free online conversion, resume writing, templates, and other handy utilities to help you solve problems of all types. All documents both processed and unprocessed remain completely private and secure in your local browser sandbox.
              </p>
            </div>

            {/* Column 2: Navigate links with colorful hovers */}
            <div className="md:col-span-2 space-y-3">
              <h4 className={`text-xs font-black tracking-widest uppercase font-mono ${isDarkMode ? 'text-sky-400' : 'text-indigo-900'}`}>Navigate</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li>
                  <a href="/" onClick={(e) => { e.preventDefault(); handleResetToHome(); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Home</a>
                </li>
                <li>
                  <a href="?page=privacy" onClick={(e) => { e.preventDefault(); handleSelectInfoPage('privacy'); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Privacy Policy</a>
                </li>
                <li>
                  <a href="?page=tos" onClick={(e) => { e.preventDefault(); handleSelectInfoPage('tos'); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Terms of Service (TOS)</a>
                </li>
                <li>
                  <a href="?page=contact" onClick={(e) => { e.preventDefault(); handleSelectInfoPage('contact'); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Contact Us</a>
                </li>
                <li>
                  <a href="?page=blog" onClick={(e) => { e.preventDefault(); handleSelectInfoPage('blog'); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Guides & Blog</a>
                </li>
                <li>
                  <a href="?page=about" onClick={(e) => { e.preventDefault(); handleSelectInfoPage('about'); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">About CareerPouch</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Tools 1 */}
            <div className="md:col-span-2 space-y-3">
              <h4 className={`text-xs font-black tracking-widest uppercase font-mono ${isDarkMode ? 'text-sky-400' : 'text-indigo-900'}`}>Tools Catalog</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'ats-cv'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">ATS Resume Writer</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'cover-letter'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Cover Letter Maker</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'academic-cv'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Academic CV Builder</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'qr-generator'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">QR WiFi Badge Generator</a>
                </li>
              </ul>
            </div>

            {/* Column 4: Tools 2 (unnamed but aligned beautifully of PDF tools as listed in screenshot template mapping) */}
            <div className="md:col-span-2 space-y-2 md:mt-8 text-sm text-slate-500 dark:text-slate-400">
              <ul className="space-y-2">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'job-tracker'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Job Apps Tracker</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'kanban-board'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Kanban Task Board</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'invoice-generator'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Invoice PDF Builder</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'unit-converter'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Unified Unit Converter</a>
                </li>
              </ul>
            </div>

            {/* Column 5: Tools 3 */}
            <div className="md:col-span-2 space-y-2 md:mt-8 text-sm text-slate-500 dark:text-slate-400">
              <ul className="space-y-2">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'json-validator'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">JSON Schema Validator</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'jwt-inspector'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">JWT Token Inspector</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); const t = TOOLS.find(x => x.id === 'glassmorphism'); if(t) handleSelectTool(t); }} className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors font-medium">Glassmorphism Styles</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory('all'); document.getElementById('toolsSectionHeader')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-blue-600 dark:text-sky-400 font-extrabold hover:text-blue-700 dark:hover:text-sky-300 transition-colors">Others →</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200/40 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>All {TOOLS.length} items executed client-side in secure sandbox memory structures offline.</span>
            </div>
            <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} CareerPouch. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* STICKY ADSTERRA ANCHORED FOOTER BANNER (TinyWow style) */}
      {isStickyAdVisible && (
        <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all border-t shadow-2xl backdrop-blur-md pb-safe ${
          isDarkMode 
            ? 'bg-slate-950/95 border-slate-800 text-slate-300 shadow-slate-950/50' 
            : 'bg-white/95 border-slate-200 text-slate-650 shadow-slate-200/50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 relative py-1 flex flex-col items-center justify-center">
            {/* Close button bar */}
            <div className="w-full max-w-[728px] flex justify-end text-[9px] font-mono tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-0.5 px-0.5">
              <button 
                onClick={() => setIsStickyAdVisible(false)}
                className="flex items-center gap-1 hover:text-rose-600 dark:hover:text-rose-400 transition-colors uppercase cursor-pointer"
                title="Dismiss ad banner"
              >
                <span>Close</span>
                <Icon name="X" size={10} />
              </button>
            </div>
            
            {/* Leaderboard banner itself (scaled down by ~50%) */}
            <div className="w-full flex items-center justify-center h-[50px] overflow-hidden">
              <div className="transform scale-[0.55] origin-center shrink-0">
                <AdsterraBanner 
                  id="ad-sticky-footer" 
                  bannerKey="29552977" 
                  className="w-[728px] h-[90px] flex items-center justify-center overflow-hidden bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Extra spacing at bottom of entire container when sticky ad is active to prevent blocking content */}
      {isStickyAdVisible && <div className="h-[68px] shrink-0" />}
      </div>

      {/* REQUEST A TOOL MODAL DISPLAY OVERLAY */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade">
          <div className={`relative w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 max-h-[90vh] flex flex-col ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-indigo-950/20' 
              : 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50'
          }`}>
            {/* Modal header */}
            <div className="p-5 border-b border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-550 dark:text-cyan-400 flex items-center justify-center">
                  <Icon name="Lightbulb" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight font-sans">Request a Personal Offline Tool</h3>
                  <p className="text-[10px] text-slate-400">Describe what equations or workflows you need mapped.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsRequestModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-405 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Icon name="X" size={14} />
              </button>
            </div>

            {/* Scrollable form and feedback queues columns */}
            <div className="p-5 overflow-y-auto space-y-5">
              {/* Form block */}
              <form onSubmit={handleCreateRequest} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Requested Tool Name</label>
                  <input 
                    type="text"
                    required
                    value={reqName}
                    onChange={(e) => setReqName(e.target.value)}
                    placeholder="e.g. Mortgage Amortization, Weekly Fitness Logger"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 font-medium text-xs focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Category</label>
                    <select
                      value={reqCat}
                      onChange={(e) => setReqCat(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-205 dark:border-slate-850 bg-white dark:bg-slate-950 text-xs font-semibold focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
                    >
                      <option value="career">Career Builder</option>
                      <option value="productivity">Productivity Suite</option>
                      <option value="math">Math & Estimates</option>
                      <option value="converters">Format Converters</option>
                      <option value="text">Text Utilities</option>
                      <option value="design">Design Sandbox</option>
                      <option value="accounting">Accounting & Finance</option>
                      <option value="other">Other Unique Idea</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Urgency Level</label>
                    <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-205 dark:border-slate-800">
                      {['Standard', 'Urgent'].map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setReqPriority(p)}
                          className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            reqPriority === p 
                              ? 'bg-indigo-600 text-white shadow' 
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Goal & Custom Functions Details</label>
                  <textarea
                    rows={3}
                    value={reqDesc}
                    required
                    onChange={(e) => setReqDesc(e.target.value)}
                    placeholder="Describe relevant arithmetic equations, inputs you want to calculate, or what formatting needs solving."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 font-medium text-xs focus:ring-2 focus:ring-indigo-500/30 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/20"
                >
                  <Icon name="Check" size={13} /> Submit Design Proposal
                </button>
              </form>

              {/* Your Submission queue lists */}
              <div className="pt-4 border-t border-slate-205 dark:border-slate-800/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Icon name="Activity" size={10} className="text-indigo-400" />
                    Your Suggestion history status ({userRequests.length})
                  </h4>
                  {userRequests.length > 0 && (
                    <button 
                      onClick={() => {
                        if(confirm('Clear suggestion history logs?')) {
                          setUserRequests([]);
                        }
                      }}
                      className="text-[9px] font-mono font-black text-rose-500 hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {userRequests.length === 0 ? (
                  <div className="text-center py-5 border border-dashed border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 rounded-2xl">
                    <p className="text-[10px] text-slate-400 font-mono">You haven't requested any custom tools in this session.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-0.5">
                    {userRequests.map((req) => (
                      <div 
                        key={req.id} 
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-1.5 ${
                          isDarkMode ? 'bg-slate-950/50 border-slate-850 hover:border-slate-800' : 'bg-slate-50 border-slate-205 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-xs block leading-tight">{req.name}</span>
                            <span className="text-[9px] font-mono text-slate-400">{req.category.toUpperCase()} • {req.date}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase shrink-0 leading-none ${
                            req.priority === 'Urgent' ? 'bg-rose-500/10 text-rose-450 border border-rose-500/15' : 'bg-slate-500/10 text-slate-400 border border-slate-500/10'
                          }`}>
                            {req.priority}
                          </span>
                        </div>
                        {req.description && (
                          <p className={`text-[11px] ml-0.5 font-sans leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-405' : 'text-slate-600'}`}>
                            {req.description}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-150 dark:border-slate-850 text-[9px] uppercase font-mono tracking-wider font-extrabold text-[#d97706] dark:text-[#fbbf24]">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-450 animate-pulse" />
                          <span>Status: Auditing client compiler structures</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* X AUTO-POSTING CRON CONTROL HUB MODAL */}
      {isXPosterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 ${
            isDarkMode ? 'bg-[#0b0f19] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            
            {/* Header glow banner */}
            <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-teal-400" />
            
            {/* Modal Head */}
            <div className="p-6 pb-4 border-b border-slate-200/35 dark:border-slate-800/50 flex justify-between items-center bg-slate-900/10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-550/10 text-blue-550 flex items-center justify-center">
                  <Icon name="Twitter" size={20} />
                </div>
                <div>
                  <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    X (Twitter) Auto-Poster Controller
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">Loop Automation Status & Queue Deck</p>
                </div>
              </div>
              
              <button
                onClick={() => { setIsXPosterOpen(false); setXMsg({ type: '', text: '' }); }}
                className="p-2 hover:bg-slate-500/10 rounded-full transition-colors cursor-pointer"
              >
                <Icon name="X" size={16} className="text-slate-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[72vh] space-y-6">
              
              {/* Status Message Prompt */}
              {xMsg.text && (
                <div className={`p-4 rounded-xl text-xs font-bold border transition-all flex items-center gap-2.5 ${
                  xMsg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-650 dark:text-emerald-400' :
                  xMsg.type === 'error' ? 'bg-rose-500/10 border-rose-500/25 text-rose-650 dark:text-rose-450' :
                  'bg-indigo-500/10 border-indigo-500/25 text-indigo-600 dark:text-indigo-400'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                  <span className="flex-1 font-mono uppercase tracking-wide leading-tight">{xMsg.text}</span>
                  <button onClick={() => setXMsg({ type: '', text: '' })} className="underline cursor-pointer opacity-75 hover:opacity-100">Dismiss</button>
                </div>
              )}

              {/* API Credentials Verification Box */}
              {xState && (
                <div className={`p-4 rounded-2xl border ${
                  xState.keysConfigured 
                    ? 'bg-emerald-500/[0.03] border-emerald-500/20' 
                    : 'bg-amber-500/[0.03] border-amber-500/20'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${xState.keysConfigured ? 'bg-emerald-550' : 'bg-amber-500 animate-pulse'}`} />
                        <h4 className={`text-xs font-black uppercase font-mono tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                          {xState.keysConfigured ? "X API Credentials Verified" : "Keys Not Connected (Draft Preview Mode active)"}
                        </h4>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {xState.keysConfigured 
                          ? "Real tweets will be posted to your configured X timeline autonomously." 
                          : "Because your X_API_KEY credentials are not yet populated, tweets are generated as simulated high-contrast test logs."}
                      </p>
                    </div>
                    
                    {!xState.keysConfigured && (
                      <div className="p-2.5 px-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[10px] font-mono font-bold text-amber-600 dark:text-amber-405 uppercase tracking-widest leading-relaxed shrink-0 max-w-sm">
                        ⚠️ Live connection: Configure keys inside Settings pane using .env variables.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Automation Control Widgets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Control Panel: Loop State & Override triggers */}
                <div className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-[#0f1423]/50 border-slate-800' : 'bg-slate-50 border-slate-205'}`}>
                  <h4 className={`text-xs font-extrabold uppercase font-mono tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Active Controls
                  </h4>
                  
                  <div className="space-y-3.5">
                    {/* Active Loop Power Toggle Switch */}
                    <div className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/40 dark:border-slate-850">
                      <div>
                        <span className="block text-xs font-bold">Automation Loop Status</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-405 font-mono">Loop through all tools continuously</span>
                      </div>
                      
                      <button
                        onClick={toggleXLoop}
                        disabled={xLoading}
                        className={`px-4 py-2 rounded-xl text-xs font-black font-sans uppercase transition-all tracking-wider border cursor-pointer ${
                          xState?.isLoopActive
                            ? 'bg-emerald-500/15 text-emerald-550 border-emerald-500/25 hover:bg-emerald-500/20'
                            : 'bg-rose-500/15 text-rose-550 border-rose-500/25 hover:bg-rose-500/20'
                        }`}
                      >
                        {xState?.isLoopActive ? '● Active' : '○ Paused'}
                      </button>
                    </div>

                    {/* Manual Post Override Button */}
                    <div className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/40 dark:border-slate-850">
                      <div>
                        <span className="block text-xs font-bold">Manual Trigger Mode</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-405 font-mono font-bold">Post next tool right now</span>
                      </div>
                      
                      <button
                        onClick={triggerXPostNow}
                        disabled={xLoading}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-55"
                      >
                        Post Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Queue Master Control */}
                <div className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-[#0f1423]/50 border-slate-800' : 'bg-slate-50 border-slate-205'}`}>
                  <h4 className={`text-xs font-extrabold uppercase font-mono tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Queue Operations
                  </h4>
                  
                  {xState && (
                    <div className="space-y-4">
                      {/* Current & Next Tool description preview */}
                      <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/40 dark:border-slate-850 space-y-1">
                        <span className="text-[9px] uppercase font-mono text-indigo-500 dark:text-indigo-400 block font-bold">Up Next in Rotation:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            [{xState.currentIndex}] {xState.nextTool?.name || 'No tool scheduled'}
                          </span>
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded uppercase bg-slate-100 dark:bg-slate-900 text-slate-400 font-bold">
                            {xState.nextTool?.category || 'Utility'}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-405 italic line-clamp-1 leading-normal select-all">
                          {xState.nextTool?.description}
                        </p>
                      </div>

                      {/* Manual index cue modifier input */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-slate-400 font-mono mb-1">Queue Head Index (0 to {xState.totalTools - 1})</label>
                          <input
                            type="number"
                            min="0"
                            max={xState.totalTools - 1}
                            value={customIndexInput}
                            onChange={(e) => setCustomIndexInput(e.target.value)}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-850 rounded-xl p-2 px-3 text-xs focus:outline-none focus:border-indigo-550 text-slate-950 dark:text-white font-mono"
                          />
                        </div>
                        
                        <button
                          onClick={() => {
                            const val = parseInt(customIndexInput, 10);
                            if (!isNaN(val) && val >= 0 && val < xState.totalTools) {
                              updateXIndex(val);
                            } else {
                              alert(`Please specify a valid index integer between 0 and ${xState.totalTools - 1}.`);
                            }
                          }}
                          disabled={xLoading}
                          className="mt-5 px-3.5 py-2 hover:bg-slate-200 dark:hover:bg-slate-850 text-xs font-bold transition-all border border-slate-250 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 cursor-pointer"
                        >
                          Modify Cue
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* History Timeline feed */}
              <div className="space-y-3">
                <h4 className={`text-xs font-extrabold uppercase font-mono tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Post Loop Activity logs (last {xState?.history?.length || 0} cycles)
                </h4>
                
                {xState?.history && xState.history.length === 0 ? (
                  <p className="text-xs text-slate-500 italic font-sans py-7 text-center border border-dashed border-slate-250 dark:border-slate-850 rounded-2xl bg-slate-500/[0.01]">
                    No timeline actions logged yet. Click "Post Now" to queue/trigger your first automated loop post.
                  </p>
                ) : (
                  <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                    {xState?.history?.map((log: any) => (
                      <div 
                        key={log.id} 
                        className={`p-4 rounded-xl border space-y-2.5 transition-all text-left ${
                          log.status === 'success' ? 'bg-emerald-500/[0.015] border-emerald-500/10' :
                          log.status === 'failed' ? 'bg-rose-500/[0.015] border-rose-500/10' :
                          'bg-amber-500/[0.015] border-amber-500/10'
                        }`}
                      >
                        {/* Title bar of item */}
                        <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-indigo-500 dark:text-indigo-400 uppercase">{log.toolName}</span>
                            <span className="text-slate-400 dark:text-slate-600">·</span>
                            <span className="text-slate-505 dark:text-slate-400 font-normal">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({new Date(log.timestamp).toLocaleDateString()})</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border font-mono ${
                              log.status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                              log.status === 'failed' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' :
                              'bg-amber-500/10 border-amber-500/20 text-amber-500'
                            }`}>
                              {log.status === 'success' ? 'SUCCESS' : log.status === 'failed' ? 'FAILED' : 'SIMULATED DRAFT'}
                            </span>
                          </div>
                        </div>

                        {/* Exact tweet mock text styling */}
                        <div className="p-3.5 bg-white dark:bg-slate-950/60 rounded-xl border border-slate-150 dark:border-slate-850 text-xs font-mono leading-relaxed whitespace-pre-wrap select-all">
                          {log.tweetText}
                        </div>

                        {/* Error log details */}
                        {log.errorMessage && (
                          <div className="p-2.5 px-3 bg-red-500/[0.03] rounded-lg border border-red-500/10 text-[10px] font-mono text-red-500/90 leading-normal">
                            <strong className="uppercase">Internal Log Diagnostic:</strong> {log.errorMessage}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-slate-200/35 dark:border-slate-800/50 bg-slate-900/10 text-right flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                LOOPING RATIO: {xState ? `1/${xState.totalTools} tools daily` : "Loading..."}
              </span>
              <button
                onClick={() => { setIsXPosterOpen(false); setXMsg({ type: '', text: '' }); }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 cursor-pointer rounded-xl"
              >
                Close Panel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
