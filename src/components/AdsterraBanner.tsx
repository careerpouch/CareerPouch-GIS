import React, { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  id: string;
  bannerKey?: string;
  width?: number;
  height?: number;
}

export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({ 
  id, 
  bannerKey = 'd6b9c7286fad672d25095b18587763',
  width = 728,
  height = 90
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Clear previous elements
    el.innerHTML = '';

    // Style the containers to maintain custom height and center them
    if (width === 728) {
      el.className = 'w-full min-h-[90px] flex items-center justify-center my-6 overflow-hidden bg-slate-950/20 border border-slate-800/60 rounded-xl max-w-[728px] mx-auto';
    } else {
      // Grid Card block dimensions format
      el.className = 'w-full h-full min-h-[250px] flex flex-col items-center justify-center overflow-hidden bg-slate-950/25 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl relative p-6';
    }

    // Append fallback beautiful presentation block in case of sandbox blocking or adblock
    const fallbackBlock = document.createElement('div');
    fallbackBlock.className = 'flex flex-col items-center justify-center text-center px-4 py-2 text-slate-500 font-mono text-[10px] uppercase tracking-wider relative z-10 w-full h-full';
    
    if (width === 728) {
      fallbackBlock.innerHTML = `
        <div class="flex items-center gap-1.5 text-xs text-amber-500/80 font-bold mb-1">
          <span>● Simulated Sponsor Slot</span>
        </div>
        <div>Size: ${width} × ${height} Leaderboard • iframe</div>
        <div class="text-[9px] text-slate-600/70 mt-1">Ready for high-paying Google AdSense / Adsterra live units</div>
      `;
    } else {
      fallbackBlock.innerHTML = `
        <div class="flex items-center gap-1.5 text-xs text-rose-500/80 font-bold mb-1.5">
          <svg class="w-4 h-4 text-rose-400 rotate-12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.086 1.086L11.25 11.25z" />
          </svg>
          <span class="font-sans font-extrabold tracking-tight">SPONSORED CAMPAIGN</span>
        </div>
        <div class="text-[11px] font-sans text-slate-400 normal-case leading-relaxed max-w-[200px] mb-3">
          Support CareerPouch by keeping our 100% free server-acceleration servers open for everyone.
        </div>
        <div class="text-[10px] font-mono text-slate-550 border border-dashed border-slate-700/50 px-2 py-1 rounded bg-slate-900/60">
          Format: ${width} × ${height} Grid Square
        </div>
      `;
    }
    el.appendChild(fallbackBlock);

    let observer: MutationObserver | null = null;
    try {
      // Create options configuration context
      const atOptions = {
        key: bannerKey,
        format: 'iframe',
        height: height,
        width: width,
        params: {}
      };

      // Set global window option parameter exactly as expected
      (window as any).atOptions = atOptions;

      // Construct remote config script tag
      const configScript = document.createElement('script');
      configScript.type = 'text/javascript';
      configScript.innerHTML = `atOptions = ${JSON.stringify(atOptions)};`;
      el.appendChild(configScript);

      // Construct executable invoke script source dynamically based on bannerKey
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `//www.highperformanceformat.com/${bannerKey}/invoke.js`;
      el.appendChild(invokeScript);

      // Observe if an iframe gets loaded by the script to hide the fallback block
      observer = new MutationObserver(() => {
        const hasIframe = Array.from(el.children).some(child => child.tagName === 'IFRAME');
        if (hasIframe) {
          fallbackBlock.style.display = 'none';
        }
      });
      observer.observe(el, { childList: true, subtree: true });

    } catch (e) {
      console.warn('Adsterra runtime setup is bypassed in local sandboxed environments.');
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };

  }, [id, bannerKey, width, height]);

  return <div id={id} ref={containerRef} />;
};
