import React, { useState } from 'react';
import { Icon } from '../Icon';

interface DesignToolsProps {
  toolId: string;
}

export const DesignTools: React.FC<DesignToolsProps> = ({ toolId }) => {
  // Common alert copy handler
  const copyValue = (txt: string) => {
    navigator.clipboard.writeText(txt);
    alert('Copied to Clipboard!');
  };


  // ---- 1. COLOR PALETTE DESIGNER STATE ----
  const [palette, setPalette] = useState([
    { hex: '#0F172A', locked: false },
    { hex: '#10B981', locked: false },
    { hex: '#3B82F6', locked: false },
    { hex: '#F59E0B', locked: false },
    { hex: '#EF4444', locked: false }
  ]);

  const generateRandomPalette = () => {
    const letters = '0123456789ABCDEF';
    setPalette(prev => prev.map(color => {
      if (color.locked) return color;
      let hex = '#';
      for (let i = 0; i < 6; i++) {
        hex += letters[Math.floor(Math.random() * 16)];
      }
      return { ...color, hex };
    }));
  };

  const toggleLockColor = (index: number) => {
    setPalette(prev => prev.map((color, i) => i === index ? { ...color, locked: !color.locked } : color));
  };


  // ---- 2. GLASSMORPHISM STYLE GENERATOR STATE ----
  const [glassBlur, setGlassBlur] = useState(12);
  const [glassOpacity, setGlassOpacity] = useState(0.25);
  const [glassBorder, setGlassBorder] = useState(0.15);

  const getGlassCSS = () => {
    return `background: rgba(255, 255, 255, ${glassOpacity});\nbackdrop-filter: blur(${glassBlur}px);\n-webkit-backdrop-filter: blur(${glassBlur}px);\nborder: 1px solid rgba(255, 255, 255, ${glassBorder});\nborder-radius: 16px;\nbox-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);`;
  };


  // ---- 3. FLEXBOX & CSS GRID SANDBOX STATE ----
  const [layoutType, setLayoutType] = useState<'flex' | 'grid'>('flex');
  const [itemCount, setItemCount] = useState(4);
  const [gapSize, setGapSize] = useState(3); // Tailwind gap-3, etc.
  const [justifyContent, setJustifyContent] = useState('justify-between');
  const [flexDirection, setFlexDirection] = useState('flex-row');

  const getSandboxCSS = () => {
    if (layoutType === 'flex') {
      return `display: flex;\nflex-direction: ${flexDirection === 'flex-row' ? 'row' : 'column'};\njustify-content: ${justifyContent.replace('justify-', '')};\ngap: ${gapSize * 4}px;`;
    } else {
      return `display: grid;\ngrid-template-columns: repeat(2, minmax(0, 1fr));\ngap: ${gapSize * 4}px;`;
    }
  };


  // ---- 4. FAVICON GENERATOR STATE ----
  const [favChar, setFavChar] = useState('🦘');
  const [favBgColor, setFavBgColor] = useState('#1e293b');

  const getFaviconLinkTag = () => {
    return `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22${encodeURIComponent(favBgColor)}%22/><text y=%22.9em%22 font-size=%2280%22 x=%225%22>${favChar}</text></svg>" />`;
  };


  // ---- 5. COLOR SPACE SWAPPER (HEX-RGB-CMYK) ----
  const [hexColorIn, setHexColorIn] = useState('#10B981');

  const handleHexSwap = (hex: string) => {
    setHexColorIn(hex);
  };

  const getConvertedColorSpaces = () => {
    let cleanHex = hexColorIn.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length !== 6) {
      return { rgb: 'rgb(16, 185, 129)', cmyk: 'cmyk(91%, 0%, 30%, 27%)', hsl: 'hsl(160, 84%, 39%)' };
    }

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // RGB
    const rgb = `rgb(${r}, ${g}, ${b})`;

    // CMYK Conversion
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const k = 1 - Math.max(rNorm, gNorm, bNorm);
    const c = k === 1 ? 0 : Math.round(((1 - rNorm - k) / (1 - k)) * 100);
    const m = k === 1 ? 0 : Math.round(((1 - gNorm - k) / (1 - k)) * 100);
    const y = k === 1 ? 0 : Math.round(((1 - bNorm - k) / (1 - k)) * 100);
    const cmyk = `cmyk(${c}%, ${m}%, ${y}%, ${Math.round(k * 100)}%)`;

    // HSL
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === rNorm) h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
      else if (max === gNorm) h = (bNorm - rNorm) / d + 2;
      else if (max === bNorm) h = (rNorm - gNorm) / d + 4;
      h /= 6;
    }
    const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    return { rgb, cmyk, hsl };
  };

  const colors = getConvertedColorSpaces();


  // ---- 6. QR CODE & WIFI CARD BADGE MAKER STATE ----
  const [qrType, setQrType] = useState<'url' | 'wifi'>('url');
  const [qrUrl, setQrUrl] = useState('https://careerpouch.com');
  const [wifiSsid, setWifiSsid] = useState('MyHomeNetwork');
  const [wifiPassword, setWifiPassword] = useState('SecurePass123');
  const [wifiEncrypt, setWifiEncrypt] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [qrColor, setQrColor] = useState('0f172a');
  const [badgeTheme, setBadgeTheme] = useState<'card' | 'clean' | 'dark'>('card');

  const getQrCodePayload = () => {
    if (qrType === 'url') {
      return encodeURIComponent(qrUrl);
    }
    return encodeURIComponent(`WIFI:T:${wifiEncrypt};S:${wifiSsid};P:${wifiPassword};;`);
  };

  const getQrImageUrl = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=${qrColor}&data=${getQrCodePayload()}`;
  };


  return (
    <div className="space-y-6">
      {/* 1. COLOR PALETTE DESIGNER */}
      {toolId === 'color-palette' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700 pb-3 gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
                <Icon name="Palette" className="text-cyan-400" /> Professional 5-Color Palette Designer
              </h2>
              <p className="text-xs text-slate-400 mt-1">Lock colors, randomize others, and copy hex values securely.</p>
            </div>
            <button
              onClick={generateRandomPalette}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Icon name="RefreshCw" size={13} /> Roll Harmonious palette
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5 pt-4">
            {palette.map((color, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col items-center pb-3">
                <div className="w-full h-24 shadow-inner" style={{ backgroundColor: color.hex }} />
                <span className="font-mono text-xs font-bold text-slate-200 mt-3 select-all">{color.hex}</span>
                <div className="flex gap-2.5 mt-2.5">
                  <button onClick={() => toggleLockColor(idx)} className="text-slate-500 hover:text-slate-300 transition-colors">
                    <Icon name={color.locked ? 'Lock' : 'LockOpen'} size={14} className={color.locked ? 'text-cyan-400' : ''} />
                  </button>
                  <button onClick={() => copyValue(color.hex)} className="text-slate-500 hover:text-slate-350">
                    <Icon name="Copy" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. GLASSMOPHISM STYLE CLIENT GENERATOR */}
      {toolId === 'glassmorphism' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-705/50 space-y-4 text-xs font-mono">
            <h3 className="font-sans font-semibold text-slate-200 text-sm border-b border-slate-700 pb-2">Glass Glass Control Panel</h3>
            
            <div className="space-y-3.5">
              <div>
                <label className="flex justify-between text-slate-300 mb-1">
                  <span>BACKDROP BLUR LEVEL</span>
                  <span className="text-cyan-400 font-bold">{glassBlur}px</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={glassBlur}
                  onChange={(e) => setGlassBlur(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-300 mb-1">
                  <span>BACKGROUND SOLIDITY OPACITY</span>
                  <span className="text-cyan-400 font-bold">{glassOpacity * 100}%</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={glassOpacity * 100}
                  onChange={(e) => setGlassOpacity(Number(e.target.value) / 100)}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-300 mb-1">
                  <span>BORDER OUTLINE ACCENT</span>
                  <span className="text-cyan-400 font-bold">{glassBorder * 100}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={glassBorder * 100}
                  onChange={(e) => setGlassBorder(Number(e.target.value) / 100)}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>

            <button onClick={() => copyValue(getGlassCSS())} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1.5 rounded transition-all">
              Copy Generated CSS
            </button>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between max-h-[360px] relative overflow-hidden">
            {/* Ambient Background block */}
            <div className="absolute inset-0 bg-cover bg-center filter opacity-40 mix-blend-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400&auto=format&fit=crop')" }} />

            <div className="relative z-10 p-5 rounded-2xl flex flex-col justify-center items-center h-48 border" style={{
              background: `rgba(255, 255, 255, ${glassOpacity})`,
              backdropFilter: `blur(${glassBlur}px)`,
              WebkitBackdropFilter: `blur(${glassBlur}px)`,
              borderColor: `rgba(255, 255, 255, ${glassBorder})`
            }}>
              <span className="text-sm font-bold tracking-tight text-white mb-1">Glassmorph Glass Card</span>
              <p className="text-[10px] text-slate-300 text-center leading-relaxed">Pristine serverless CSS variable design output tokens.</p>
            </div>

            <pre className="relative z-10 text-[9px] text-teal-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800/65 font-mono max-h-[100px] overflow-y-auto mb-2 select-text">
              {getGlassCSS()}
            </pre>
          </div>
        </div>
      )}

      {/* 3. FLEXBOX & CSS GRID SANDBOX */}
      {toolId === 'flexbox-grid' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50 space-y-3 font-mono text-xs">
              <div className="flex bg-slate-900 p-1.5 rounded-lg mb-2">
                <button onClick={() => setLayoutType('flex')} className={`flex-1 py-1 rounded text-[11px] font-bold ${layoutType === 'flex' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>Flexbox</button>
                <button onClick={() => setLayoutType('grid')} className={`flex-1 py-1 rounded text-[11px] font-bold ${layoutType === 'grid' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>CSS Grid</button>
              </div>

              {layoutType === 'flex' && (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1">Flex Directions</label>
                    <select value={flexDirection} onChange={(e) => setFlexDirection(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1">
                      <option value="flex-row">Row Directions</option>
                      <option value="flex-col">Vertical Column Direction</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Items Alignment</label>
                    <select value={justifyContent} onChange={(e) => setJustifyContent(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1">
                      <option value="justify-between">Space Between</option>
                      <option value="justify-center">Center Align</option>
                      <option value="justify-around">Space Around</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-slate-400 mb-1">Spacing Gap size</label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={gapSize}
                  onChange={(e) => setGapSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 appearance-none rounded-lg accent-cyan-500"
                />
              </div>

              <button onClick={() => copyValue(getSandboxCSS())} className="w-full bg-cyan-600 hover:bg-cyan-500 py-1 rounded text-[10px] font-bold text-white transition-all uppercase">
                Copy Elements CSS
              </button>
            </div>

            <div className="md:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] text-slate-500 font-mono mb-2">Live visual sandbox grid</span>
              
              <div
                className={`flex border border-slate-800/80 p-4.5 bg-slate-900/20 rounded-xl min-h-[140px]`}
                style={{
                  display: layoutType === 'grid' ? 'grid' : 'flex',
                  flexDirection: flexDirection === 'flex-row' ? 'row' : 'column',
                  justifyContent: justifyContent.replace('justify-', ''),
                  gridTemplateColumns: layoutType === 'grid' ? 'repeat(2, minmax(0, 1fr))' : undefined,
                  gap: `${gapSize * 5}px`
                }}
              >
                {Array(itemCount).fill(0).map((_, idx) => (
                  <div key={idx} className="w-12 h-12 bg-cyan-500 text-slate-900 flex items-center justify-center font-bold font-mono rounded-lg shadow-md border border-cyan-400">
                    {idx + 1}
                  </div>
                ))}
              </div>

              <pre className="text-[9px] text-teal-300 bg-slate-900/40 p-2 border border-slate-850 rounded-lg font-mono tracking-wide mt-3 select-text">
                {getSandboxCSS()}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 4. FAVICON GENERATOR */}
      {toolId === 'favicon-generator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50 space-y-4 text-xs font-mono">
            <h3 className="font-sans font-semibold text-slate-200">Icon properties Configuration</h3>
            <div>
              <label className="block text-slate-400 mb-1">Letter / Symbol / Emoji representation</label>
              <input
                type="text"
                value={favChar}
                onChange={(e) => setFavChar(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Canvas Background colorhex</label>
              <input
                type="text"
                value={favBgColor}
                onChange={(e) => setFavBgColor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-teal-400 font-bold"
              />
            </div>
            <button onClick={() => copyValue(getFaviconLinkTag())} className="w-full bg-cyan-600 hover:bg-cyan-500 py-1.5 rounded text-xs font-bold text-white uppercase">
              Copy Recommendation Meta Link Code
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 font-mono mb-2">Favicon Render previews</span>
            <div className="flex justify-center items-center py-4 my-1">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl shadow-2xl border border-slate-800" style={{ backgroundColor: favBgColor }}>
                {favChar}
              </div>
            </div>
            <pre className="text-[9px] text-teal-350 select-all overflow-x-auto bg-slate-900 border border-slate-850/80 p-2 rounded max-h-[80px]">
              {getFaviconLinkTag()}
            </pre>
          </div>
        </div>
      )}

      {/* 5. COLOR SPACE SWAPPER */}
      {toolId === 'hex-rgb-cmyk' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/40">
            <div className="space-y-3 text-xs font-mono">
              <span className="font-sans text-sm font-semibold text-slate-200 block border-b border-slate-700 pb-2">Target Color inputs</span>
              <div>
                <label className="block text-slate-400 mb-1">HEXADECIMAL STRING VALUE</label>
                <input
                  type="text"
                  value={hexColorIn}
                  onChange={(e) => handleHexSwap(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 font-bold text-amber-300 uppercase"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2.5">
                <button onClick={() => handleHexSwap('#10B981')} className="h-6 rounded bg-[#10B981]"></button>
                <button onClick={() => handleHexSwap('#3B82F6')} className="h-6 rounded bg-[#3B82F6]"></button>
                <button onClick={() => handleHexSwap('#EC4899')} className="h-6 rounded bg-[#EC4899]"></button>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">RGB:</span>
                <span className="text-slate-100 font-bold">{colors.rgb}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">CMYK:</span>
                <span className="text-slate-100 font-bold">{colors.cmyk}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">HSL:</span>
                <span className="text-slate-100 font-bold">{colors.hsl}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. QR CODE & WIFI CARD BADGE MAKER */}
      {toolId === 'qr-generator' && (
        <div className="space-y-6 animate-fade">
          <div className="border-b border-slate-700/60 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
                <Icon name="QrCode" className="text-emerald-400" /> QR Code & WiFi Card Badge Maker
              </h2>
              <p className="text-xs text-slate-400 mt-1">Generate customizable vector QR Codes for secure web redirects or premium physical safe WiFi card badges.</p>
            </div>
            <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 shrink-0 select-none">
              <button
                onClick={() => setQrType('url')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold font-sans transition-all ${qrType === 'url' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
              >
                Standard Web URL
              </button>
              <button
                onClick={() => setQrType('wifi')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold font-sans transition-all ${qrType === 'wifi' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
              >
                WiFi Access Badge
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/40 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-350 font-sans">Configure Properties</h3>
              
              {qrType === 'url' ? (
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 font-mono uppercase">TARGET REDIRECT URL</label>
                  <input
                    type="text"
                    value={qrUrl}
                    onChange={(e) => setQrUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-705/50 rounded px-3 py-2 text-xs text-slate-200"
                    placeholder="e.g. https://careerpouch.com"
                  />
                </div>
              ) : (
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1.5 font-mono uppercase">WIFI SSID (NETWORK NAME)</label>
                    <input
                      type="text"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-705/50 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono"
                      placeholder="MyHomeSSID"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1.5 font-mono uppercase">WIFI KEY / PASSWORD</label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-705/50 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono"
                      placeholder="SSIDPassword123"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1.5 font-mono uppercase">ENCRYPTION TYPE</label>
                    <select
                      value={wifiEncrypt}
                      onChange={(e) => setWifiEncrypt(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-705/50 text-slate-200 rounded px-2 py-1 text-xs"
                    >
                      <option value="WPA">WPA / WPA2 (Most Standard)</option>
                      <option value="WEP">WEP Encryption</option>
                      <option value="nopass">None (Open/Public)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-850 font-sans">
                <label className="block text-[10px] text-slate-400 mb-1.5 font-mono uppercase">QR BLOCK TINT COLOR</label>
                <div className="flex gap-2">
                  <button onClick={() => setQrColor('0f172a')} className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 hover:scale-110 transition-transform cursor-pointer" />
                  <button onClick={() => setQrColor('059669')} className="w-6 h-6 rounded-full bg-emerald-600 border border-emerald-400 hover:scale-110 transition-transform cursor-pointer" />
                  <button onClick={() => setQrColor('2563eb')} className="w-6 h-6 rounded-full bg-blue-600 border border-blue-400 hover:scale-110 transition-transform cursor-pointer" />
                  <button onClick={() => setQrColor('db2777')} className="w-6 h-6 rounded-full bg-pink-600 border border-pink-400 hover:scale-110 transition-transform cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4 font-sans">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Live Render Card Badge Preview</span>
              
              <div className="flex justify-center items-center p-8 bg-slate-950 border border-slate-850 rounded-2xl">
                <div className="max-w-[270px] w-full bg-white text-slate-900 p-6 rounded-2xl shadow-xl border border-slate-205 text-center space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                  
                  {qrType === 'wifi' ? (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-widest font-mono text-emerald-600 uppercase">SAFE STABLE ACCESS</span>
                      <h4 className="text-sm font-extrabold text-slate-850 flex items-center justify-center gap-1.5">
                        <Icon name="Wifi" size={14} className="text-emerald-500" /> Join Home Network
                      </h4>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-widest font-mono text-emerald-600 uppercase">SCAN TO REDIRECT</span>
                      <h4 className="text-sm font-extrabold text-slate-850 flex items-center justify-center gap-1.5">
                        <Icon name="Globe" size={14} className="text-emerald-500" /> Dynamic Portal
                      </h4>
                    </div>
                  )}

                  <div className="mx-auto w-[184px] h-[184px] bg-white border border-slate-100 p-1 rounded-xl shadow-sm flex items-center justify-center">
                    <img
                      src={getQrImageUrl()}
                      alt="QR Code"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {qrType === 'wifi' ? (
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-left text-[10px] font-mono space-y-1">
                      <div><strong className="text-slate-500">SSID:</strong> <span className="text-slate-800 font-bold select-all">{wifiSsid}</span></div>
                      {wifiPassword && (
                        <div><strong className="text-slate-500">Password:</strong> <span className="text-slate-800 font-bold select-all">{wifiPassword}</span></div>
                      )}
                    </div>
                  ) : (
                    <div className="text-[10px] font-mono text-slate-500 truncate select-all">
                      {qrUrl}
                    </div>
                  )}

                  <p className="text-[9px] text-slate-400 font-sans italic leading-none">
                    ✨ Point standard mobile camera lens to scan
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3.5 pt-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getQrImageUrl());
                    alert('QR Code Image Link copied to Clipboard!');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4.5 rounded-xl text-xs transition-colors shadow-md flex items-center gap-1.5"
                >
                  <Icon name="Copy" size={13} /> Copy QR Link
                </button>
                <div className="text-[11px] text-slate-500 flex items-center font-mono gap-1 select-none ml-auto">
                  <Icon name="ShieldCheck" size={12} className="text-emerald-500" /> Fully local payload generation
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
