import React, { useState, useEffect } from 'react';
import { TOOLS } from '../data/toolsData';
import { Tool } from '../types';
import { 
  Settings, 
  CheckCircle, 
  Calendar, 
  Play, 
  Pause, 
  RotateCcw, 
  ExternalLink, 
  Check, 
  Lock, 
  Info, 
  Sparkles, 
  FileText, 
  ChevronRight, 
  BookOpen, 
  AlertTriangle,
  Github,
  Award,
  Clock,
  Heart
} from 'lucide-react';

interface BloggerPost {
  id: string;
  toolId: string;
  title: string;
  url: string;
  publishedAt: string;
}

export function BloggerAutomationHub({ isDarkMode, appUrl }: { isDarkMode: boolean; appUrl: string }) {
  // Config States
  const [clientId, setClientId] = useState(() => localStorage.getItem('cp_blogger_client_id') || (import.meta.env.VITE_BLOGGER_CLIENT_ID as string) || '');
  const [clientSecret, setClientSecret] = useState(() => localStorage.getItem('cp_blogger_client_secret') || '');
  const [blogId, setBlogId] = useState(() => localStorage.getItem('cp_blogger_blog_id') || (import.meta.env.VITE_BLOGGER_BLOG_ID as string) || '');
  const [targetUrl, setTargetUrl] = useState(() => localStorage.getItem('cp_blogger_target_url') || appUrl || 'https://careerpouch.com');
  const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem('cp_blogger_access_token') || '');
  
  // Visibility States for secrets
  const [showClientId, setShowClientId] = useState(false);
  const [showClientSecret, setShowClientSecret] = useState(false);
  
  // Auth & Connection States
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name?: string; email?: string; picture?: string } | null>(null);
  const [blogInfo, setBlogInfo] = useState<{ name?: string; url?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Scheduler States
  const [currentQueueIndex, setCurrentQueueIndex] = useState(() => {
    const saved = localStorage.getItem('cp_blogger_queue_index');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isAutoActive, setIsAutoActive] = useState(() => {
    return localStorage.getItem('cp_blogger_auto_active') === 'true';
  });
  const [publishedHistory, setPublishedHistory] = useState<BloggerPost[]>(() => {
    const saved = localStorage.getItem('cp_blogger_published_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastCheckedDate, setLastCheckedDate] = useState(() => {
    return localStorage.getItem('cp_blogger_last_checked_date') || '';
  });

  // UI Tabs & Preview States
  const [showConfigGuide, setShowConfigGuide] = useState(false);
  const [selectedPreviewTool, setSelectedPreviewTool] = useState<Tool | null>(TOOLS[0]);
  const [previewTab, setPreviewTab] = useState<'visual' | 'code'>('visual');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  // Save Settings
  useEffect(() => {
    localStorage.setItem('cp_blogger_client_id', clientId);
  }, [clientId]);

  useEffect(() => {
    localStorage.setItem('cp_blogger_client_secret', clientSecret);
  }, [clientSecret]);

  useEffect(() => {
    localStorage.setItem('cp_blogger_blog_id', blogId);
  }, [blogId]);

  useEffect(() => {
    localStorage.setItem('cp_blogger_target_url', targetUrl);
  }, [targetUrl]);

  useEffect(() => {
    localStorage.setItem('cp_blogger_queue_index', currentQueueIndex.toString());
  }, [currentQueueIndex]);

  useEffect(() => {
    localStorage.setItem('cp_blogger_auto_active', isAutoActive.toString());
  }, [isAutoActive]);

  useEffect(() => {
    localStorage.setItem('cp_blogger_published_history', JSON.stringify(publishedHistory));
  }, [publishedHistory]);

  // Handle Hash Check or Incoming Auth Token from Google Popup / Redirect
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get('access_token');
        if (token) {
          sessionStorage.setItem('cp_blogger_access_token', token);
          setAccessToken(token);
          // Clean the hash from the URL
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    };
    parseHash();
  }, []);

  // Sync token and load user + blog info
  useEffect(() => {
    if (accessToken) {
      setIsConnected(true);
      fetchUserInfo(accessToken);
      fetchBlogInfo(accessToken);
    } else {
      setIsConnected(false);
      setUserInfo(null);
      setBlogInfo(null);
    }
  }, [accessToken, blogId]);

  // Daily auto-publisher simulation loop when Hub is active
  useEffect(() => {
    if (isAutoActive && isConnected && blogId && accessToken) {
      const todayString = new Date().toISOString().split('T')[0];
      if (lastCheckedDate !== todayString) {
        // Trigger auto publish for today
        autoPublishToday(todayString);
      }
    }
  }, [isAutoActive, isConnected, blogId, accessToken, lastCheckedDate]);

  // Fetch User Details from Google
  const fetchUserInfo = async (token: string) => {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUserInfo({
          name: data.name,
          email: data.email,
          picture: data.picture
        });
      }
    } catch (e) {
      console.error('Failed to fetch user info:', e);
    }
  };

  // Fetch Blogger Details
  const fetchBlogInfo = async (token: string) => {
    if (!blogId) return;
    try {
      setErrorMsg('');
      const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBlogInfo({
          name: data.name,
          url: data.url
        });
      } else {
        const errData = await res.json();
        setErrorMsg(errData?.error?.message || 'Failed to locate blog. Please verify your Blog ID.');
      }
    } catch (e) {
      setErrorMsg('Network error connecting to Blogger service.');
    }
  };

  // Google OAuth 2.0 Implicit Login Trigger
  const handleGoogleConnect = () => {
    if (!clientId) {
      setErrorMsg('Please specify a Google Client ID first.');
      setShowConfigGuide(true);
      return;
    }
    setErrorMsg('');
    const redirectUri = window.location.origin + window.location.pathname;
    const scope = 'https://www.googleapis.com/auth/blogger';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}&state=blogger_automation`;
    
    // Open standard authorize window
    window.location.href = authUrl;
  };

  const handleDisconnect = () => {
    sessionStorage.removeItem('cp_blogger_access_token');
    setAccessToken('');
    setIsConnected(false);
    setUserInfo(null);
    setBlogInfo(null);
  };

  // Rich SEO-Articles Content Compiler with custom vector mockups representing the "Screenshots"
  const generateSeoArticleAndBanner = (tool: Tool) => {
    const cleanUrl = `${targetUrl}#${tool.id}`;
    
    // Custom descriptive metadata lists for individual categories to maximize SEO structure
    const categoryBenefits: Record<string, string[]> = {
      career: [
        'Formatted strictly to bypass and score ultra-high on modern Applicant Tracking Systems (ATS).',
        'Built using industry-standard HR keywords and clean vertical hierarchy grids.',
        'Prevents standard export layout truncations common with other platform software.'
      ],
      productivity: [
        'Provides real-time interactive dashboards that preserve local-centric states.',
        'Implements responsive keybind inputs and rapid scratchpad actions.',
        'Reduces analytical bottlenecks with high-fidelity visual layout systems.'
      ],
      math: [
        'Resolves algorithmic and credit Luhn algorithm lookups with clean recursion.',
        'Allows direct visualization of parameters and inputs.',
        'No external API dependencies or database round-trip delays.'
      ],
      converters: [
        'Secure client-side format translations and code beautifiers.',
        'Helps standard code architectures remain clean and compliant.',
        'Handles large nested data structures gracefully within seconds.'
      ],
      text: [
        'Facilitates high-speed regex parsing, dynamic filters, and keyword auditing.',
        'Improves text flow, case alignment, and typography tracking metrics.',
        'Maintains complete privacy without uploading letters onto a cloud database.'
      ],
      design: [
        'Enables pristine customization of vector QR codes and CSS effects.',
        'Visual interactive previews that render and update instantly.',
        'Designed to deliver high professional results for developer portfolios.'
      ],
      accounting: [
        'Runs complex ledger spreadsheets and asset depreciation models.',
        'Simplifies math balance sheets and custom reports.',
        'Aide in establishing clean financial data trackers.'
      ]
    };

    const benefits = categoryBenefits[tool.category] || [
      'Engineered for maximum high-productivity outputs.',
      'Designed using modern visual guidelines and accessible palettes.',
      'Completely free, fast, secure, and lightweight.'
    ];

    // Build unique visual CSS SVG mockup to simulate high-fidelity interactive "screenshot" of the tool
    const visualMockupHtml = `
    <div style="margin: 25px 0; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 16px; padding: 24px; color: #ffffff; font-family: system-ui, -apple-system, sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden;">
      <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(99,102,241,0.15); border-radius: 50%; filter: blur(40px);"></div>
      <div style="position: absolute; bottom: -55px; left: -50px; width: 150px; height: 150px; background: rgba(244,63,94,0.12); border-radius: 50%; filter: blur(40px);"></div>
      
      <!-- Top control bar simulation -->
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 10px; height: 10px; background: #ef4444; border-radius: 50%;"></span>
          <span style="display: inline-block; width: 10px; height: 10px; background: #f59e0b; border-radius: 50%;"></span>
          <span style="display: inline-block; width: 10px; height: 10px; background: #10b981; border-radius: 50%;"></span>
          <span style="font-size: 11px; color: #a1a1aa; font-family: monospace; margin-left: 8px;">careerpouch.com/${tool.id}</span>
        </div>
        <div style="font-size: 10px; background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 9999px; font-weight: bold; text-transform: uppercase; color: #facc15; letter-spacing: 0.5px;">
          ${tool.category} Tool
        </div>
      </div>
      
      <!-- Inside Simulated Content -->
      <div style="display: flex; flex-direction: column; gap: 12px; min-height: 120px; justify-content: center; position: relative; z-index: 2;">
        <div style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px;">
          🦘 ${tool.name}
        </div>
        <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5; max-width: 500px;">
          ${tool.description}
        </div>
        
        <!-- Animated Mock inputs -->
        <div style="display: flex; gap: 10px; margin-top: 8px; flex-wrap: wrap;">
          <div style="background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #a1a1aa; font-family: monospace; flex: 1; min-width: 150px;">
            // Enter user parameters...
          </div>
          <button style="background: #4f46e5; border: none; padding: 8px 16px; border-radius: 8px; color: white; font-weight: 600; font-size: 11px; cursor: pointer;">
            Execute Utility
          </button>
        </div>
      </div>
    </div>
    `;

    const title = `The Ultimate Guide to ${tool.name}: Master ${tool.category === 'career' ? 'CV & Job Strategy' : 'Productivity & Tools'} (Free Online Utility)`;
    
    const htmlContent = `
    <div style="font-family: inherit; line-height: 1.7; color: #334155; max-width: 750px; margin: 0 auto; padding: 10px;">
      
      <p style="font-size: 16px; color: #475569; font-style: italic; margin-bottom: 25px;">
        Looking for a zero-compromise, premium, and entirely secure serverless tool to manage your files or boost your work outcomes? Let us take a deep dive into <strong>${tool.name}</strong>, a key utility featured in the core <strong>CareerPouch</strong> productivity suite.
      </p>

      <h2>What is ${tool.name}?</h2>
      <p>
        <strong>${tool.name}</strong> is designed to solve complex processing workflows safely in your local browser sandbox. 
        Unlike alternatives that require creating user accounts, paying steep monthly premiums, or exposing private details across distributed clouds, our utility compiles your input calculations internally in real time.
      </p>

      <!-- Screenshot mockup of the tool interface -->
      ${visualMockupHtml}

      <h2>Key Features & Core Benefits</h2>
      <ul style="padding-left: 20px;">
        ${benefits.map((b: string) => `<li style="margin-bottom: 8px;"><strong>⚡ ${b.split(':')[0] || 'Optimized'}:</strong> ${b.split(':')[1] || b}</li>`).join('')}
      </ul>

      <h2>Step-by-Step Walkthrough Guide</h2>
      <ol style="padding-left: 20px; line-height: 1.8;">
        <li style="margin-bottom: 10px;">
          Navigate to the live application workspace at <a href="${cleanUrl}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 600;">${tool.name} on CareerPouch</a>.
        </li>
        <li style="margin-bottom: 10px;">
          Locate the utility module interface panel within the <strong>${tool.category.toUpperCase()} Builders</strong> section.
        </li>
        <li style="margin-bottom: 10px;">
          Input your raw data parameters (don't worry, your data never leaves your computer).
        </li>
        <li style="margin-bottom: 10px;">
          Click the custom execution controls to run calculations or layout formatting, then download or copy your generated deliverables instantly!
        </li>
      </ol>

      <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 16px; margin: 30px 0; border-radius: 0 8px 8px 0;">
        <h4 style="margin: 0 0 8px 0; color: #0f172a; font-weight: 700;">🔒 Absolute Data Privacy Shield</h4>
        <p style="margin: 0; font-size: 13.5px; color: #475569;">
          Because this tool operates completely client-side, all input values are parsed safely inside your device RAM memory. No information ever touches an external third-party database.
        </p>
      </div>

      <h2>Boost Your Careers and Workflow Today</h2>
      <p>
        Ready to optimize? Experience the zero-lag speeds of the <strong>${tool.name}</strong> yourself. Check out our main suite of over ${TOOLS.length} builders, encoders, and converters, perfect for developers, accountants, and career builders!
      </p>

      <p style="text-align: center; margin: 35px 0;">
        <a href="${cleanUrl}" target="_blank" style="display: inline-block; background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 15px; font-weight: 700; border-radius: 9999px; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.35); text-transform: uppercase; letter-spacing: 0.5px;">
          🚀 Try ${tool.name} Now (100% Free)
        </a>
      </p>
      
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 40px 0;" />
      <p style="font-size: 11px; color: #94a3b8; text-align: center;">
        Published via CareerPouch Spotlight. All rights reserved. Built with privacy and high-impact SEO indexing guidelines.
      </p>
    </div>
    `;

    return { title, content: htmlContent };
  };

  // Perform automated daily check-and-publish sequence
  const autoPublishToday = async (todayString: string) => {
    try {
      const toolToPublish = TOOLS[currentQueueIndex];
      const { title, content } = generateSeoArticleAndBanner(toolToPublish);

      // Perform Google Blogger API post write
      const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          kind: 'blogger#post',
          title: title,
          content: content,
          labels: ['CareerPouch', toolToPublish.category, toolToPublish.name]
        })
      });

      if (response.ok) {
        const postData = await response.json();
        
        // Add to history
        const newPost: BloggerPost = {
          id: postData.id,
          toolId: toolToPublish.id,
          title: toolToPublish.name,
          url: postData.url,
          publishedAt: new Date().toLocaleString()
        };

        setPublishedHistory(prev => [newPost, ...prev]);
        setLastCheckedDate(todayString);
        localStorage.setItem('cp_blogger_last_checked_date', todayString);

        // Move to next in queue
        const nextIndex = (currentQueueIndex + 1) % TOOLS.length;
        setCurrentQueueIndex(nextIndex);
      }
    } catch (e) {
      console.error('Blogger daily auto-publish loop encountered an error:', e);
    }
  };

  // Trigger manual publish right now!
  const handlePublishNow = async (tool: Tool) => {
    if (!isConnected || !blogId || !accessToken) {
      setErrorMsg('You must configure Blogger credentials and click "Connect" first!');
      return;
    }
    setErrorMsg('');
    setIsPublishing(true);
    
    try {
      const { title, content } = generateSeoArticleAndBanner(tool);
      
      const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          kind: 'blogger#post',
          title: title,
          content: content,
          labels: ['CareerPouch', tool.category, tool.name, 'SEO Spotlight']
        })
      });

      if (response.ok) {
        const postData = await response.json();
        
        const newPost: BloggerPost = {
          id: postData.id,
          toolId: tool.id,
          title: tool.name,
          url: postData.url,
          publishedAt: new Date().toLocaleString()
        };

        setPublishedHistory(prev => [newPost, ...prev]);
        
        // Advance queue if this was the queued tool
        if (tool.id === TOOLS[currentQueueIndex].id) {
          const nextIndex = (currentQueueIndex + 1) % TOOLS.length;
          setCurrentQueueIndex(nextIndex);
        }

        alert(`Successfully published "How to Build an ATS-Compliant CV..." for ${tool.name} onto your blog!`);
      } else {
        const err = await response.json();
        setErrorMsg(err?.error?.message || 'Blogger API publication failed. Verify your account parameters.');
      }
    } catch (e) {
      setErrorMsg('Network error publishing. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  // Filter tools shown in the selection lists
  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategoryFilter === 'all' || tool.category === activeCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade">
      {/* Banner Card Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BookOpen className="w-48 h-48 rotate-[15deg]" />
        </div>
        <div style={{ position: 'relative', zIndex: 2 }} className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold font-mono tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> 
            Adsterra-Approved Blogger Automation Hub
          </div>
          <h1 className="text-3xl font-black tracking-tight font-sans">
            CareerPouch Spotlight
          </h1>
          <p className="text-sm text-indigo-100 max-w-2xl leading-relaxed">
            Auto-generate and schedule highly optimized SEO-friendly articles, interactive screens mockups, and referral back-links for all {TOOLS.length} tools onto your Blogger account to drive organic traffic and amplify your Adsterra ad CPM!
          </p>
        </div>
      </div>

      {/* Main Grid: Settings & Queue Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Connection Setup & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold font-mono text-slate-400 dark:text-slate-400 tracking-wider uppercase">Blogger Key settings</h2>
              <Settings className={`w-4 u-4 ${isConnected ? 'text-emerald-500 animate-spin-slow' : 'text-slate-400'}`} />
            </div>

            {/* Config warning indicator */}
            {!blogId && (
              <div className="flex gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Specify your Blog ID and Client credentials below to synchronize connection.</span>
              </div>
            )}

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase">Google App Client ID</label>
                  <button 
                    type="button"
                    onClick={() => setShowClientId(!showClientId)} 
                    className="text-[9px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors uppercase font-mono cursor-pointer"
                  >
                    {showClientId ? 'Mask' : 'Reveal'}
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type={showClientId ? "text" : "password"} 
                    placeholder="Enter your Google OAuth Client ID..."
                    title="Paste Client ID"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 font-mono transition-colors"
                  />
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase">Google App Client Secret</label>
                  <button 
                    type="button"
                    onClick={() => setShowClientSecret(!showClientSecret)} 
                    className="text-[9px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors uppercase font-mono cursor-pointer"
                  >
                    {showClientSecret ? 'Mask' : 'Reveal'}
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type={showClientSecret ? "text" : "password"} 
                    placeholder="Enter your Google Client Secret..."
                    title="Paste Client Secret"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 font-mono transition-colors"
                  />
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase mb-1">Blogger Blog ID</label>
                <input 
                  type="text" 
                  placeholder="e.g., 29553000..."
                  value={blogId}
                  onChange={(e) => setBlogId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase mb-1">Target Application Domain URL</label>
                <input 
                  type="text" 
                  placeholder="e.g., https://careerpouch.com"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 font-mono transition-colors"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 text-xs text-rose-500 bg-rose-500/10 rounded-xl border border-rose-500/20 font-mono">
                Error: {errorMsg}
              </div>
            )}

            {/* Guide Button */}
            <button 
              onClick={() => setShowConfigGuide(!showConfigGuide)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all font-semibold"
            >
              <Info className="w-4 h-4" />
              {showConfigGuide ? 'Hide Developer Instructions' : 'How to set up for Free?'}
            </button>

            {/* Action Connections Buttons */}
            {isConnected ? (
              <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  {userInfo?.picture ? (
                    <img src={userInfo.picture} alt="User" className="w-8 h-8 rounded-full border border-indigo-500" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs uppercase">
                      {userInfo?.name?.slice(0, 2) || 'CP'}
                    </div>
                  )}
                  <div className="text-left leading-none">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{userInfo?.name || 'Verified Publisher'}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">{userInfo?.email || 'api@blogger.com'}</p>
                  </div>
                </div>

                {blogInfo && (
                  <div className="p-3 bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs flex items-center justify-between">
                    <div className="truncate pr-2">
                      <p className="font-bold">✓ Connected: {blogInfo.name}</p>
                      <p className="text-[10px] opacity-70 truncate font-mono mt-0.5">{blogInfo.url}</p>
                    </div>
                    {blogInfo.url && (
                      <a href={blogInfo.url} target="_blank" rel="noopener noreferrer" className="p-1 rounded bg-white dark:bg-slate-800 border border-emerald-500/20 hover:scale-105 transition-transform shrink-0">
                        <ExternalLink className="w-4 h-4 text-emerald-500" />
                      </a>
                    )}
                  </div>
                )}

                <button 
                  onClick={handleDisconnect}
                  className="w-full py-2.5 bg-slate-100 dark:bg-slate-850 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl text-xs font-bold transition-all text-slate-600 dark:text-slate-300"
                >
                  Disconnect Blogger
                </button>
              </div>
            ) : (
              <button 
                onClick={handleGoogleConnect}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/15 transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-300" />
                Connect Google Blogger API
              </button>
            )}
          </div>

          {/* Quick Guide Panel */}
          {showConfigGuide && (
            <div className="p-5 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl space-y-3.5 text-xs text-slate-600 dark:text-slate-350 shadow-inner">
              <h3 className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5 font-mono">
                🔧 Google Developer Console Direct Links & Setup:
              </h3>
              <ol className="list-decimal pl-4 space-y-2 leading-relaxed">
                <li>
                  <a 
                    href="https://console.cloud.google.com/apis/library/blogger.googleapis.com?project=gen-lang-client-0151945052" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-indigo-600 dark:text-indigo-400 font-bold underline"
                  >
                    Click Here to Enable Blogger API v3
                  </a> (Make sure you are logged in to your <strong>careerpouchofficial@gmail.com</strong> account).
                </li>
                <li>
                  <a 
                    href="https://console.cloud.google.com/apis/credentials/consent?project=gen-lang-client-0151945052" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-indigo-600 dark:text-indigo-400 font-bold underline"
                  >
                    Click Here to Configure OAuth Consent Screen
                  </a> (Set User Type to <strong>External</strong>, add your email, and add the user scope <code>https://www.googleapis.com/auth/blogger</code>).
                </li>
                <li>
                  <a 
                    href="https://console.cloud.google.com/apis/credentials?project=gen-lang-client-0151945052" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-indigo-600 dark:text-indigo-400 font-bold underline"
                  >
                    Click Here to Create Credentials &gt; OAuth client ID
                  </a>
                </li>
                <li>
                  Set Application Type to <strong>Web application</strong>.
                </li>
                <li>
                  Add <code>{window.location.origin}</code> under <strong>Authorized JavaScript origins</strong> and <strong>Authorized redirect URIs</strong>.
                </li>
                <li>
                  Copy your <strong>Client ID</strong> & <strong>Client Secret</strong>, paste them into the settings inputs above, and click connect!
                </li>
              </ol>
              <div className="pt-2 border-t border-indigo-100/50 dark:border-indigo-950/20 text-[11px] text-slate-500">
                ⭐ Looking for your Blogger Blog ID? Open your <a href="https://www.blogger.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">Blogger Dashboard</a>. The long number at the end of the URL (e.g., <code>blogID=2475658548325357687</code>) is your Blog ID!
              </div>
            </div>
          )}

          {/* Marketing Analytics Block */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
            <h2 className="text-sm font-bold font-mono text-slate-400 dark:text-slate-400 tracking-wider uppercase">Marketing progress</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850">
                <span className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Queue Index</span>
                <span className="text-lg font-black">{currentQueueIndex + 1} <span className="text-slate-400 text-xs">/ {TOOLS.length}</span></span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850">
                <span className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Published count</span>
                <span className="text-lg font-black text-emerald-500">{publishedHistory.length} <span className="text-slate-400 text-xs">/ {TOOLS.length}</span></span>
              </div>
            </div>

            {/* Circular representation */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">Total SEO Coverage:</span>
                <span className="font-mono text-indigo-500 font-bold">{Math.round((publishedHistory.length / TOOLS.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(publishedHistory.length / TOOLS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Auto Schedule Trigger */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <div className="text-left pr-2">
                <p className="text-xs font-bold text-indigo-800 dark:text-indigo-300">Continuous Auto-Publish Loop</p>
                <p className="text-[10px] text-indigo-500/80 mt-0.5">Posts 1 optimized tool guide automatically every 24 hours</p>
              </div>
              <button 
                onClick={() => {
                  if (!isConnected) {
                    alert('Please connect your Blogger API first!');
                    return;
                  }
                  setIsAutoActive(!isAutoActive);
                }}
                className={`p-2 rounded-xl transition-all ${isAutoActive ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}
              >
                {isAutoActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Studio Composer Panel - Middle & Right */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Queued Next Article Preview */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold font-mono uppercase">
                    Queued Next
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Tools Index • {currentQueueIndex + 1}</span>
                </div>
                <h3 className="text-base font-bold mt-1">
                  💡 {TOOLS[currentQueueIndex]?.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    const prevIdx = (currentQueueIndex - 1 + TOOLS.length) % TOOLS.length;
                    setCurrentQueueIndex(prevIdx);
                    setSelectedPreviewTool(TOOLS[prevIdx]);
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-xs"
                >
                  Previous
                </button>
                <button 
                  onClick={() => {
                    const nextIdx = (currentQueueIndex + 1) % TOOLS.length;
                    setCurrentQueueIndex(nextIdx);
                    setSelectedPreviewTool(TOOLS[nextIdx]);
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-xs"
                >
                  Skip
                </button>
                <button 
                  disabled={isPublishing || !isConnected}
                  onClick={() => handlePublishNow(TOOLS[currentQueueIndex])}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  {isPublishing ? 'Publishing...' : 'Publish guide Now'}
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Preview Studio */}
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-150 dark:border-slate-850">
                <p className="text-xs font-bold font-mono pl-2 text-slate-400 uppercase">Interactive HTML SEO layout compiled live</p>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setPreviewTab('visual')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${previewTab === 'visual' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    Visual Preview
                  </button>
                  <button 
                    onClick={() => setPreviewTab('code')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${previewTab === 'code' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    Raw HTML Code
                  </button>
                </div>
              </div>

              {/* Renders Tab Content */}
              <div className="border border-slate-205 dark:border-slate-800 rounded-2xl overflow-hidden min-h-[300px] h-[400px] bg-white text-slate-800 relative shadow-inner">
                {previewTab === 'visual' ? (
                  <div className="w-full h-full overflow-y-auto p-4 md:p-6 text-left article-container">
                    {/* Visual iframe mock preview */}
                    <div dangerouslySetInnerHTML={{ __html: generateSeoArticleAndBanner(selectedPreviewTool || TOOLS[currentQueueIndex]).content }} />
                  </div>
                ) : (
                  <textarea 
                    readOnly
                    value={generateSeoArticleAndBanner(selectedPreviewTool || TOOLS[currentQueueIndex]).content}
                    className="w-full h-full bg-slate-950 text-emerald-400 p-4 font-mono text-xs overflow-auto outline-none select-all relative z-10"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Select and Search all queued tools */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-bold font-mono text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                Full Tools Queue Explorer ({TOOLS.length} total)
              </h3>
              
              {/* Category Search Selector */}
              <input 
                type="text" 
                placeholder="Search tools in folder queue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Filter Pill List */}
            <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-850">
              {['all', 'career', 'productivity', 'math', 'converters', 'text', 'design', 'accounting'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    activeCategoryFilter === cat 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tools Grid list selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-2">
              {filteredTools.map((tool) => {
                const isSelected = selectedPreviewTool?.id === tool.id;
                const isFirstQueued = TOOLS[currentQueueIndex]?.id === tool.id;
                const hasBeenPublished = publishedHistory.some(post => post.toolId === tool.id);

                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedPreviewTool(tool)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                      isSelected 
                        ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/15' 
                        : 'border-slate-150 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <p className={`text-xs font-bold leading-none ${isFirstQueued ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                        {tool.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate mt-1">
                        {tool.description}
                      </p>
                    </div>
                    {hasBeenPublished ? (
                      <span className="shrink-0 text-emerald-500 p-1 bg-emerald-500/10 rounded-full">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="shrink-0 text-slate-300 dark:text-slate-700 text-[9px] font-mono font-bold uppercase p-1 bg-slate-100 dark:bg-slate-950 rounded-md">
                        {tool.category}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Historical publications list */}
          {publishedHistory.length > 0 && (
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-mono text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                  Blogger Publication Logs
                </h3>
                <button 
                  onClick={() => {
                    if (window.confirm('Clear history records? This does NOT delete posts on Blogger.')) {
                      setPublishedHistory([]);
                    }
                  }}
                  className="text-[10px] text-slate-400 hover:text-rose-500 transition-colors uppercase font-mono"
                >
                  Clear logs
                </button>
              </div>

              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {publishedHistory.map((post) => (
                  <div key={post.id} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850 flex items-center justify-between gap-3 text-xs">
                    <div className="truncate text-left leading-none">
                      <p className="font-bold pr-2 truncate">{post.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">Published: {post.publishedAt}</p>
                    </div>
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 rounded-lg text-indigo-500 transition-colors shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
