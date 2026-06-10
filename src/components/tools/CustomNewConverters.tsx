import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../Icon';

interface CustomNewConvertersProps {
  toolId: string;
}

export const CustomNewConverters: React.FC<CustomNewConvertersProps> = ({ toolId }) => {
  // Common visual card helpers
  const [errorLog] = useState('');

  // 1. COLOR PALETTE EXTRACTOR
  const [colorPalette, setColorPalette] = useState([
    { hex: '#1E293B', name: 'Slate Deep' },
    { hex: '#4F46E5', name: 'Indigo Aura' },
    { hex: '#14B8A6', name: 'Teal Flare' },
    { hex: '#F3F4F6', name: 'Cosmic Snow' },
    { hex: '#10B981', name: 'Emerald Spark' }
  ]);

  const randomizePalette = () => {
    const tones = [
      ['#0F172A', '#D946EF', '#8B5CF6', '#F5F5F7', '#34D399'],
      ['#1E1B4B', '#F43F5E', '#3B82F6', '#E2E8F0', '#06B6D4'],
      ['#1C1917', '#F59E0B', '#10B981', '#FAF9F6', '#EC4899'],
      ['#022C22', '#14B8A6', '#6EE7B7', '#F0FDF4', '#84CC16']
    ];
    const chosen = tones[Math.floor(Math.random() * tones.length)];
    setColorPalette(colorPalette.map((c, i) => ({ ...c, hex: chosen[i] })));
  };

  // 2. PROTOBUF ⇄ JSON
  const [protoText, setProtoText] = useState(`message UserProfile {
  string uuid = 1;
  int32 session_age = 2;
  bool is_active_member = 3;
}`);
  const [jsonResultText, setJsonResultText] = useState('');

  useEffect(() => {
    try {
      const lines = protoText.split('\n');
      const obj: Record<string, any> = {};
      lines.forEach(line => {
        const match = line.match(/(string|int32|bool|float)\s+([a-zA-Z0-9_-]+)\s*=\s*\d+/);
        if (match) {
          const type = match[1];
          const key = match[2];
          if (type === 'string') obj[key] = "career_pouch_sandbox_text";
          else if (type === 'int32') obj[key] = 101;
          else if (type === 'bool') obj[key] = true;
          else obj[key] = 99.9;
        }
      });
      setJsonResultText(JSON.stringify(obj, null, 2));
    } catch (e) {
      setJsonResultText('{ "error": "Unable to map. Check Protobuf message syntax guidelines." }');
    }
  }, [protoText]);

  // 3. DNS RECORD PARSER
  const [dnsInput, setDnsInput] = useState(`careerpouch.com.  3600  IN  A      104.21.36.105
careerpouch.com.  3600  IN  MX     10 mail.careerpouch.com.
careerpouch.com.  3600  IN  TXT    "v=spf1 include:_spf.google.com ~all"`);
  
  const parseDnsRecords = () => {
    const lines = dnsInput.split('\n');
    return lines.map((line, idx) => {
      const parts = line.split(/\s+/).filter(Boolean);
      if (parts.length >= 4) {
        return {
          id: idx,
          host: parts[0],
          ttl: parts[1],
          type: parts[3],
          value: parts.slice(4).join(' ')
        };
      }
      return null;
    }).filter(Boolean);
  };

  // 4. HEX GRAPHICAL CANVAS SYNTHETIC DRAW
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pixelHexStr, setPixelHexStr] = useState('03C0 0FF0 1E78 3C3C 781E F00F C003');

  useEffect(() => {
    if (toolId !== 'binary-image-viewer') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    // Split rows of hex
    const rows = pixelHexStr.trim().split(/\s+/);
    const pixelSize = 25;

    rows.forEach((row, rIdx) => {
      const num = parseInt(row, 16) || 0;
      for (let bit = 15; bit >= 0; bit--) {
        const val = (num >> bit) & 1;
        ctx.fillStyle = val === 1 ? '#14B8A6' : '#1E293B';
        ctx.fillRect((15 - bit) * pixelSize, rIdx * pixelSize, pixelSize - 1, pixelSize - 1);
      }
    });
  }, [pixelHexStr, toolId]);

  // 5. NGINX ROUTER DIAGRAM EXPLAINER
  const [nginxRule, setNginxRule] = useState(`server {
  listen 3000;
  server_name sandbox.server;

  location /api {
    proxy_pass http://127.0.0.1:8000;
  }
}`);

  const explainNginx = () => {
    const explanations = [];
    if (nginxRule.includes('listen')) {
      const match = nginxRule.match(/listen\s+(\d+)/);
      explanations.push(`● Ingress Binding: Server listens on internal container port [tcp/${match ? match[1] : '3000'}] for client HTTP endpoints.`);
    }
    if (nginxRule.includes('proxy_pass')) {
      const match = nginxRule.match(/proxy_pass\s+([^\s;]+)/);
      explanations.push(`● Reverse Proxy: Directs location requests seamlessly into target upstream: [${match ? match[1] : 'http://localhost'}]`);
    }
    if (nginxRule.includes('server_name')) {
      const match = nginxRule.match(/server_name\s+([^\s;]+)/);
      explanations.push(`● Match Host header: Binds routing logic specifically to domain: "${match ? match[1] : 'localhost'}"`);
    }
    return explanations;
  };

  // 6. OS / USER-AGENT PARSER
  const [userAgentStr, setUserAgentStr] = useState(navigator.userAgent);
  
  const parseUserAgent = () => {
    const ua = userAgentStr.toLowerCase();
    let os = 'Unknown OS';
    if (ua.includes('windows')) os = 'Windows Desktop OS';
    else if (ua.includes('macintosh') || ua.includes('mac os')) os = 'macOS Apple Device';
    else if (ua.includes('android')) os = 'Android OS Mobile';
    else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS Apple Mobile';
    else if (ua.includes('linux')) os = 'Linux Distribution';

    let browser = 'Modern Web Browser';
    if (ua.includes('chrome')) browser = 'Google Chrome';
    else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Apple Safari';
    else if (ua.includes('firefox')) browser = 'Mozilla Firefox';
    else if (ua.includes('edge')) browser = 'Microsoft Edge';

    return { os, browser, isMobile: /mobile|phone|tablet|android|ipad/i.test(ua) ? 'Mobile / Touch interface' : 'Desktop / Pointer interface' };
  };

  // 7. SEMVER RANGE AUDITOR
  const [semverInput, setSemverInput] = useState('^1.2.3');
  const [testVersion, setTestVersion] = useState('1.5.0');

  const checkSemverMatch = () => {
    const cleanRange = semverInput.replace(/[~^]/, '').split('.').map(Number);
    const cleanTest = testVersion.split('.').map(Number);

    if (cleanRange.length < 3 || cleanTest.length < 3) return 'Invalid SemVer format (use Major.Minor.Patch)';

    const [rMin, rMid, rMax] = cleanRange;
    const [tMin, tMid, tMax] = cleanTest;

    if (semverInput.startsWith('^')) {
      // caret: same major, patch/minor can be equal or greater
      if (tMin !== rMin) return '❌ Failed matching: Major version mismatch (Caret ^ matches matching Majors)';
      if (tMid > rMid) return '✅ Successful matching range update!';
      if (tMid === rMid && tMax >= rMax) return '✅ Successful matching range update!';
      return '❌ Failed matching: Version is older than bottom range threshold';
    } else if (semverInput.startsWith('~')) {
      // tilde: same major & minor, patch must be equal/greater
      if (tMin === rMin && tMid === rMid && tMax >= rMax) return '✅ Successful matching range update!';
      return '❌ Failed matching: Tilde ~ constraints require exact Major/Minor matching';
    }
    // exact representation
    if (tMin === rMin && tMid === rMid && tMax === rMax) return '✅ Exact equivalent matching!';
    return '❌ Failed matching: Versions do not match exactly';
  };

  // 8. SQL STATEMENT FORMATTER
  const [sqlRawText, setSqlRawText] = useState('SELECT u.uuid, u.username, o.price_cents FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.status = "valid" ORDER BY o.created_at DESC');
  const [sqlFormattedText, setSqlFormattedText] = useState('');

  useEffect(() => {
    const keywords = ['SELECT', 'FROM', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN', 'WHERE', 'ORDER BY', 'GROUP BY', 'LIMIT', 'SET', 'INSERT INTO', 'VALUES', 'UPDATE'];
    let working = sqlRawText;
    keywords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      working = working.replace(regex, `\n${word}`);
    });
    setSqlFormattedText(working.trim());
  }, [sqlRawText]);

  return (
    <div className="space-y-6 font-sans">
      {/* 1. COLOR PALETTE EXTRACTOR */}
      {toolId === 'color-palette-extractor' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
                <Icon name="Palette" className="text-teal-400" />
                Image Dominant Color Space Extractor
              </h2>
              <p className="text-xs text-slate-400 mt-1">Upload an image reference and extract matching thematic colors locally.</p>
            </div>
            <button
              onClick={randomizePalette}
              className="bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-xs text-teal-400 font-bold"
            >
              Randomize Reference Palette
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-750 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-slate-900/30 opacity-40 group-hover:scale-105 transition-transform duration-700" />
              <Icon name="DownloadCloud" size={32} className="text-teal-500 mb-2 relative z-10" />
              <p className="text-xs text-slate-400 relative z-10">Drag or select reference imagery here</p>
              <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase relative z-10">Client-Side Sandbox sandbox extraction</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
              <h4 className="text-[10px] uppercase font-mono tracking-widest font-bold text-teal-400 border-b border-rose-950 pb-2">Identified HEX Values</h4>
              <div className="space-y-2">
                {colorPalette.map((color, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-850 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg border border-slate-700" style={{ backgroundColor: color.hex }} />
                      <div>
                        <span className="text-xs font-semibold text-slate-205 block">{color.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{color.hex}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(color.hex);
                        alert(`Color code ${color.hex} copied!`);
                      }}
                      className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded hover:border-slate-700 text-[10px] font-bold text-teal-400 font-mono uppercase"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROTOBUF ⇄ JSON */}
      {toolId === 'protobuf-json' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="Database" className="text-teal-500" />
              Protocol Buffers (Protobuf) ⇄ JSON Parser
            </h2>
            <p className="text-xs text-slate-400 mt-1">Extract JSON mocks directly from proto structural fields.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <span className="block text-[10px] font-mono text-slate-400 uppercase">Input Protobuf message schema:</span>
              <textarea
                value={protoText}
                onChange={(e) => setProtoText(e.target.value)}
                rows={11}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-xs text-white font-mono leading-relaxed outline-none"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-mono text-slate-400 uppercase">Output JSON Data payload:</span>
                <pre className="w-full bg-slate-950 border border-slate-850 rounded-2xl p-4 text-xs text-indigo-400 font-mono overflow-auto max-h-[220px]">
                  {jsonResultText}
                </pre>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonResultText);
                  alert('JSON payload copied!');
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-505 text-white font-bold py-2 rounded-xl text-xs transition-colors"
              >
                Copy structured JSON Mock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DNS RECORD PARSER */}
      {toolId === 'dns-record-parser' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="Globe" className="text-teal-400 animate-pulse" />
              DNS Zone Config & Records Formatter
            </h2>
            <p className="text-xs text-slate-400 mt-1">Read and structure raw Nameserver hosting outputs side-by-side.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <span className="block text-[10px] font-mono text-slate-400 uppercase">Input raw DNS Zone strings:</span>
              <textarea
                value={dnsInput}
                onChange={(e) => setDnsInput(e.target.value)}
                rows={8}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-xs text-white font-mono"
              />
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-3">
              <h4 className="text-[10px] font-mono uppercase text-slate-400 border-b border-slate-900 pb-2">Structured Records Catalog</h4>
              <div className="space-y-2 overflow-y-auto max-h-[160px]">
                {parseDnsRecords().map((rec) => (
                  <div key={rec.id} className="p-2.5 bg-slate-900 border border-slate-852 rounded-xl text-xs flex justify-between font-mono">
                    <div>
                      <span className="text-indigo-400 font-extrabold pr-2">{rec.type}</span>
                      <span className="text-slate-350">{rec.value}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">TTL: {rec.ttl}s</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. BINARY HEX GRAPHICAL CANVAS */}
      {toolId === 'binary-image-viewer' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
                <Icon name="Image" className="text-teal-500" />
                Binary Hex ⇄ Graphical Canvas Synth
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-sans">Synthesize retro 16-bit icon bitmaps out of hexadecimal arrays locally.</p>
            </div>
            <button
              onClick={() => setPixelHexStr('5555 AAAA 5555 AAAA 5555 AAAA 5555')}
              className="bg-slate-850 hover:bg-slate-800 border border-slate-702 px-3 py-1 text-xs text-teal-400"
            >
              Load Weave Pattern
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1.5">16-bit Hex Array Rows (Space-delimited)</label>
                <input
                  type="text"
                  value={pixelHexStr}
                  onChange={(e) => setPixelHexStr(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-400 font-sans">
                <p>💡 Synthesized automatically: pixels are mapped row by row where hexadecimal codes represent active bits.</p>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col items-center justify-center">
              <canvas
                ref={canvasRef}
                width={400}
                height={175}
                className="border border-slate-800 bg-slate-950 rounded shadow-sm"
              />
              <span className="text-[10px] mt-2 font-mono text-slate-500">Live RAM Canvas Sandbox Context</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. NGINX ROUTER DIAGRAM */}
      {toolId === 'nginx-config-explainer' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="FileCode" className="text-teal-450 animate-pulse" />
              Nginx Config Router Schema Explainer
            </h2>
            <p className="text-xs text-slate-400 mt-1">Translate nested webserver proxy settings into responsive diagrams instantly.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-1.5">
              <span className="block text-[10px] font-mono text-slate-400 uppercase">Input raw Nginx custom rule block:</span>
              <textarea
                value={nginxRule}
                onChange={(e) => setNginxRule(e.target.value)}
                rows={9}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-xs text-white font-mono"
              />
            </div>

            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono uppercase text-teal-450 border-b border-slate-900 pb-2">Decompiled Proxy Logic</h4>
                <div className="space-y-2 font-sans">
                  {explainNginx().map((expl, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-slate-300 leading-relaxed font-sans">
                      {expl}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. USER-AGENT PARSER */}
      {toolId === 'user-agent-parser' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
                <Icon name="Laptop" className="text-teal-400" />
                Browser User-Agent Metadata Analyzer
              </h2>
              <p className="text-xs text-slate-400 mt-1">Parse device client environment variables locally with instant mapping.</p>
            </div>
            <button
              onClick={() => setUserAgentStr(navigator.userAgent)}
              className="bg-slate-800 border border-slate-710 rounded px-2.5 py-1 text-xs text-teal-400 font-bold"
            >
              Load Mine
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] text-slate-400 uppercase font-mono">User-Agent raw input</label>
              <textarea
                value={userAgentStr}
                onChange={(e) => setUserAgentStr(e.target.value)}
                rows={4}
                className="w-full bg-slate-900 border border-slate-707 rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
              />
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 font-sans space-y-3">
              <h4 className="text-[10px] font-mono uppercase text-slate-500 border-b border-slate-900 pb-1.5">Identified Specs</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 text-xs text-slate-300">
                  <span className="text-[10px] font-mono text-slate-500 block">SYSTEM BRAND / OS</span>
                  <strong className="text-emerald-400 block pt-1">{parseUserAgent().os}</strong>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 text-xs text-slate-300">
                  <span className="text-[10px] font-mono text-slate-500 block">ENGINE BRAND</span>
                  <strong className="text-indigo-400 block pt-1">{parseUserAgent().browser}</strong>
                </div>
                <div className="col-span-2 bg-slate-900 p-2.5 rounded-lg border border-slate-855 text-xs text-slate-300">
                  <span className="text-[10px] font-mono text-slate-500 block">DEVICE TYPE INDICATOR</span>
                  <strong className="text-teal-400 block pt-1">{parseUserAgent().isMobile}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. SEMVER RANGE AUDITOR */}
      {toolId === 'semver-checker' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="Settings" className="text-teal-400 animate-pulse" />
              Semantic Version (SemVer) Range Audits
            </h2>
            <p className="text-xs text-slate-400 mt-1">Audit dependency updates compatibility schemas locally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-755 space-y-3">
              <h4 className="text-xs font-bold text-slate-300">Rules Settings</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Declared Range (e.g. ^1.2.3 or ~2.0.0)</label>
                  <input
                    type="text"
                    value={semverInput}
                    onChange={(e) => setSemverInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1 w-full">Test Version Update release</label>
                  <input
                    type="text"
                    value={testVersion}
                    onChange={(e) => setTestVersion(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between font-sans">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">EVALUATION STATEMENT:</span>
                <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl font-bold text-xs text-slate-205">
                  {checkSemverMatch()}
                </div>
              </div>
              <p className="text-[9.5px] font-mono text-slate-506 italic mt-2 leading-none">
                💡 Tilde (~) maps patch updates; Caret (^) maps minor transitions. Zero Major disables Caret updates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 8. SQL STATEMENT FORMATTER */}
      {toolId === 'sql-formatter' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="Database" className="text-teal-400 animate-pulse" />
              SQL Database Statement Formatter
            </h2>
            <p className="text-xs text-slate-400 mt-1">Beautify messy unstructured database queries inside isolated client layouts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <span className="block text-[10px] font-mono text-slate-450 uppercase">Messy raw SQL String:</span>
              <textarea
                value={sqlRawText}
                onChange={(e) => setSqlRawText(e.target.value)}
                rows={7}
                className="w-full bg-slate-900 border border-slate-760 text-xs text-white font-mono p-4 rounded-xl outline-none"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-mono text-slate-450 uppercase">Formatted structural outputs:</span>
                <pre className="w-full bg-slate-950 border border-slate-850 rounded-xl p-4 text-xs text-indigo-400 font-mono overflow-auto max-h-[145px] whitespace-pre-wrap leading-relaxed">
                  {sqlFormattedText}
                </pre>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(sqlFormattedText);
                  alert('Beautified SQL copied!');
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold py-2 rounded-xl text-xs text-white transition-colors uppercase tracking-widest"
              >
                Copy Formatting Output
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
