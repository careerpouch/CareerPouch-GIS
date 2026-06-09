import React, { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  id: string;
  bannerKey?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({ 
  id, 
  bannerKey,
  width = 728,
  height = 90,
  className
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Fallback to environment variables if set, otherwise use the provided bannerKey prop or hardcoded fallbacks
  const envKey = width === 728 
    ? import.meta.env.VITE_ADSTERRA_LEADERBOARD_KEY 
    : import.meta.env.VITE_ADSTERRA_SQUARE_KEY;
  
  const activeKey = envKey || bannerKey || (width === 728 ? '29552977' : '29553000');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Clear previous elements
    el.innerHTML = '';

    // Style the containers to maintain custom height and center them
    if (className) {
      el.className = className;
    } else if (width === 728) {
      el.className = 'w-full min-h-[96px] flex items-center justify-center my-6 overflow-hidden bg-slate-950/20 border border-slate-805/40 rounded-xl max-w-[728px] mx-auto';
    } else {
      // Grid Card block dimensions format
      el.className = 'w-full h-full min-h-[250px] flex flex-col items-center justify-center overflow-hidden bg-slate-950/25 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl relative p-4';
    }

    // Create the Ad-isolation Sandbox iFrame to contain the atOptions context
    const iframe = document.createElement('iframe');
    iframe.style.width = `${width}px`;
    iframe.style.height = `${height}px`;
    iframe.style.maxWidth = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.background = 'transparent';
    iframe.scrolling = 'no';
    iframe.title = `Adsterra-Sponsor-${id}`;

    el.appendChild(iframe);

    let checkInterval: any = null;
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                html, body {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  background: transparent;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                #fallback {
                  font-family: monospace;
                  font-size: 10px;
                  color: #64748b;
                  text-transform: uppercase;
                  letter-spacing: 0.1em;
                  text-align: center;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 100%;
                  box-sizing: border-box;
                  padding: 10px;
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 10;
                  pointer-events: none;
                }
              </style>
            </head>
            <body>
              <div id="fallback">
                ${width === 728 ? `
                  <div style="color: rgba(245, 158, 11, 0.85); font-weight: bold; font-family: sans-serif; font-size: 12px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; justify-content: center;">
                    <span style="color: #f59e0b;">●</span> Sponsored Ad Slot
                  </div>
                  <div style="font-size: 9px; margin-bottom: 2px;">Format: ${width}x${height} Leaderboard</div>
                  <div style="color: rgba(148, 163, 184, 0.6); font-size: 9px; text-transform: none;">Active Network Unit Live</div>
                ` : `
                  <div style="color: rgba(244, 63, 94, 0.85); font-weight: bold; font-family: sans-serif; font-size: 12px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; justify-content: center;">
                    <span style="color: #f43f5e;">●</span> Sponsored Block
                  </div>
                  <div style="font-family: sans-serif; font-size: 11px; color: #94a3b8; text-transform: none; line-height: 1.4; margin-bottom: 12px; max-w-xs; text-align: center;">
                    Support CareerPouch. Keep our free professional tools online for everyone.
                  </div>
                  <div style="font-size: 9px; padding: 4px 8px; border: 1px dashed rgba(100,116,139,0.3); border-radius: 4px; background: rgba(15,23,42,0.4);">
                    Square Unit: ${width}x${height}
                  </div>
                `}
              </div>

              <script type="text/javascript">
                var atOptions = {
                  'key' : '${activeKey}',
                  'format' : 'iframe',
                  'height' : ${height},
                  'width' : ${width},
                  'params' : {}
                };
                
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    var hasAd = false;
                    for (var i = 0; i < document.body.children.length; i++) {
                      var tag = document.body.children[i].tagName;
                      if (tag === 'IFRAME' || tag === 'A' || (tag === 'DIV' && document.body.children[i].id !== 'fallback')) {
                        hasAd = true;
                        break;
                      }
                    }
                    if (hasAd) {
                      var fb = document.getElementById('fallback');
                      if (fb) fb.style.display = 'none';
                    }
                  }, 1200);
                });
              </script>
              <script type="text/javascript" src="https://www.highperformanceformat.com/${activeKey}/invoke.js"></script>
            </body>
          </html>
        `);
        doc.close();

        // Active checker on main thread to hide fallback when ad code is active
        checkInterval = setInterval(() => {
          try {
            const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (innerDoc) {
              const children = Array.from(innerDoc.body?.children || []);
              const hasAd = children.some(child => 
                child.tagName === 'IFRAME' || 
                child.tagName === 'A' || 
                (child.tagName === 'DIV' && child.id !== 'fallback')
              );
              if (hasAd) {
                const fb = innerDoc.getElementById('fallback');
                if (fb) {
                  fb.style.display = 'none';
                }
                clearInterval(checkInterval);
              }
            }
          } catch (e) {
            // Cross domain navigation handles self
            clearInterval(checkInterval);
          }
        }, 1000);
      }
    } catch (e) {
      console.warn('Adsterra sandboxed frame initialization bypassed due to restricted environment.', e);
    }

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };

  }, [id, activeKey, width, height]);

  return <div id={id} ref={containerRef} />;
};
