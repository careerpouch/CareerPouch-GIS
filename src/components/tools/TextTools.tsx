import React, { useState } from 'react';
import { Icon } from '../Icon';

interface TextToolsProps {
  toolId: string;
}

export const TextTools: React.FC<TextToolsProps> = ({ toolId }) => {
  // ---- 1. ADVANCE WORD COUNTER STATE ----
  const [wordCountInput, setWordCountInput] = useState('CareerPouch delivers clean, pristine static layouts optimized for global recruitment pipelines. Write text and view structural indexes.');

  const getWordStats = () => {
    const raw = wordCountInput;
    const charsTotal = raw.length;
    const charsNoSpaces = raw.replace(/\s+/g, '').length;
    const wordsList = raw.trim().split(/\s+/).filter(w => w.length > 0);
    const wordsTotal = wordsList.length;
    const sentencesTotal = raw.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphsTotal = raw.split(/\n+/).filter(p => p.trim().length > 0).length;
    const readTimeMin = Math.ceil(wordsTotal / 200); // approx 200 wpm

    return { charsTotal, charsNoSpaces, wordsTotal, sentencesTotal, paragraphsTotal, readTimeMin };
  };

  const stats = getWordStats();


  // ---- 2. VISUAL TEXT DIFF STATE ----
  const [diffOrig, setDiffOrig] = useState('Build complete templates with static variables.');
  const [diffMod, setDiffMod] = useState('Build beautiful templates with modern Tailwind variables.');

  const runVisualDiff = () => {
    const origWords = diffOrig.split(' ');
    const modWords = diffMod.split(' ');
    return (
      <div className="flex flex-wrap gap-1 text-xs font-mono leading-relaxed p-4 bg-slate-900 rounded-xl border border-slate-800">
        {origWords.map((word, idx) => {
          const matchingMod = modWords[idx];
          if (word === matchingMod) {
            return <span key={idx} className="text-slate-300">{word}</span>;
          } else {
            return (
              <React.Fragment key={idx}>
                {word && <span className="bg-red-500/20 text-red-400 line-through px-1 rounded">{word}</span>}
                {matchingMod && <span className="bg-emerald-500/20 text-emerald-400 px-1 rounded font-bold">{matchingMod}</span>}
              </React.Fragment>
            );
          }
        })}
        {modWords.length > origWords.length && modWords.slice(origWords.length).map((word, idx) => (
          <span key={`mod-${idx}`} className="bg-emerald-500/20 text-emerald-400 px-1 rounded font-bold">{word}</span>
        ))}
      </div>
    );
  };


  // ---- 3. HTML ENTITIES ENCODER/DECODER STATE ----
  const [htmlEntIn, setHtmlEntIn] = useState("<div class='dashboard'>Welcome to CareerPouch!</div>");
  const [htmlEntOut, setHtmlEntOut] = useState('&lt;div class=&#x27;dashboard&#x27;&gt;Welcome to CareerPouch!&lt;/div&gt;');

  const encodeEntities = () => {
    const txt = htmlEntIn;
    const temp = document.createElement('textarea');
    temp.textContent = txt;
    setHtmlEntOut(temp.innerHTML.replace(/'/g, '&#x27;').replace(/"/g, '&quot;'));
  };

  const decodeEntities = () => {
    const txt = htmlEntOut;
    const temp = document.createElement('textarea');
    temp.innerHTML = txt;
    setHtmlEntIn(temp.value);
  };


  // ---- 4. MARKDOWN LIVE PREVIEW EDITOR ----
  const [mdInput, setMdInput] = useState("# CareerPouch Platform\n\nWelcome to your **professional static toolkit**. \n\n### Key Elements:\n- Built with high-fidelity Tailwind v4\n- Completely static browser memory states\n- 41 client interactive utilities ready for production");

  const parseMarkdownSimple = () => {
    // Basic structural translation for common entities (Headings, lists, bold)
    let temp = mdInput;
    temp = temp.replace(/^# (.*$)/gim, '<h2 class="text-xl font-bold text-slate-100 border-b border-slate-800 pb-1.5 mt-3 mb-2">$1</h2>');
    temp = temp.replace(/^### (.*$)/gim, '<h3 class="text-sm font-semibold text-slate-200 mt-2 mb-1">$1</h3>');
    temp = temp.replace(/\*\*(.*)\*\*/gim, '<strong class="text-emerald-400 font-bold">$1</strong>');
    temp = temp.replace(/^- (.*$)/gim, '<li class="list-disc pl-4 text-slate-300 text-xs py-0.5">$1</li>');
    return temp.split('\n').filter(line => line.length > 0).join('<br/>');
  };


  // ---- 5. SVG CODE OPTIMIZER ----
  const [svgInput, setSvgInput] = useState('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none">\n  <!-- metadata comments -->\n  <path stroke-linecap="round" d="M12 4v16m8-8H4" />\n</svg>');
  const [svgOptimized, setSvgOptimized] = useState('');

  const optimizeSvgPaths = () => {
    try {
      let cleaned = svgInput;
      // remove comments
      cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
      // compress whitespaces
      cleaned = cleaned.replace(/\s+/g, ' ').trim();
      setSvgOptimized(cleaned);
    } catch (e) {
      // safe fallback
    }
  };


  // ---- 6. REGEX TESTER & MATCH EXPLAINER STATE ----
  const [regexPattern, setRegexPattern] = useState('[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexText, setRegexText] = useState('Contact our tech team at systems@careerpouch.com or general support at hello@careerpouch.com to begin.');

  const getRegexMatches = () => {
    try {
      if (!regexPattern) return { list: [], count: 0, error: null };
      const flagsSet = regexFlags.includes('g') ? regexFlags : regexFlags + 'g';
      const re = new RegExp(regexPattern, flagsSet);
      const matches = [...regexText.matchAll(re)];
      const list = matches.map(m => m[0]);
      return { list, count: list.length, error: null };
    } catch (err: any) {
      return { list: [], count: 0, error: err.message };
    }
  };

  const regexResult = getRegexMatches();

  const loadRegexPreset = (pattern: string, flags: string, textSample: string) => {
    setRegexPattern(pattern);
    setRegexFlags(flags);
    setRegexText(textSample);
  };


  const copyToClipboard = (txt: string) => {
    navigator.clipboard.writeText(txt);
    alert('Copied to Clipboard!');
  };


  return (
    <div className="space-y-6">
      {/* 1. ADVANCE WORD COUNTER */}
      {toolId === 'word-counter' && (
        <div className="space-y-4">
          <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-705/50">
            <label className="block text-xs font-mono font-bold text-slate-300 mb-2">PASSAGE INPUT BLOCK</label>
            <textarea
              rows={5}
              value={wordCountInput}
              onChange={(e) => setWordCountInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3.5 font-mono text-center">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500">WORDS TOTAL</span>
              <p className="text-xl font-bold text-violet-400 mt-1">{stats.wordsTotal}</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500">CHARACTERS</span>
              <p className="text-xl font-bold text-violet-400 mt-1">{stats.charsTotal}</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500">WITHOUT SPACES</span>
              <p className="text-xl font-bold text-violet-400 mt-1">{stats.charsNoSpaces}</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500">SENTENCES</span>
              <p className="text-xl font-bold text-violet-400 mt-1">{stats.sentencesTotal}</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500">PARAGRAPHS</span>
              <p className="text-xl font-bold text-violet-400 mt-1">{stats.paragraphsTotal}</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 font-medium">READ TIME SPEED</span>
              <p className="text-xl font-bold text-emerald-400 mt-1">{stats.readTimeMin} min</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. VISUAL TEXT DIFF */}
      {toolId === 'text-diff' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/20 p-4.5 rounded-xl border border-slate-700/50">
              <span className="text-xs font-mono font-bold text-slate-300 block mb-1">ORIGINAL SOURCE VERSION</span>
              <textarea
                rows={3}
                value={diffOrig}
                onChange={(e) => setDiffOrig(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 font-mono"
              />
            </div>
            <div className="bg-slate-800/20 p-4.5 rounded-xl border border-slate-700/50">
              <span className="text-xs font-mono font-bold text-slate-300 block mb-1">REVISED MODIFIED EDITION</span>
              <textarea
                rows={3}
                value={diffMod}
                onChange={(e) => setDiffMod(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">Visual Word Change Comparative</span>
            {runVisualDiff()}
          </div>
        </div>
      )}

      {/* 3. HTML ENTITIES ENCODER/DECODER */}
      {toolId === 'html-entity' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-slate-300 block">RAW HTML CONTENT</span>
            <textarea
              rows={4}
              value={htmlEntIn}
              onChange={(e) => setHtmlEntIn(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 font-mono"
            />
            <button onClick={encodeEntities} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-1.5 rounded text-xs transition-colors">
              Seal HTML Reserved Code Input (Encode →)
            </button>
          </div>

          <div className="space-y-3 font-mono">
            <span className="text-xs text-slate-400 block font-bold">HTML ESCAPED ENTITIES STRING</span>
            <textarea
              rows={4}
              value={htmlEntOut}
              onChange={(e) => setHtmlEntOut(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-amber-300"
            />
            <div className="grid grid-cols-2 gap-2">
              <button onClick={decodeEntities} className="bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold py-1.5 rounded text-xs">
                Decode Back (← Decode)
              </button>
              <button onClick={() => copyToClipboard(htmlEntOut)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded text-xs">
                Copy Entries
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MARKDOWN LIVE PREVIEW EDITOR */}
      {toolId === 'markdown-html' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50">
            <span className="text-xs font-mono font-bold text-slate-300 block">MARKDOWN CONTENT</span>
            <textarea
              rows={8}
              value={mdInput}
              onChange={(e) => setMdInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-xs text-slate-100 font-mono resize-none focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-2 text-xs">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">Dynamic styled HTML outputs</span>
              <div
                dangerouslySetInnerHTML={{ __html: parseMarkdownSimple() }}
                className="p-4 bg-slate-900/60 border border-slate-850 rounded-xl max-h-[220px] overflow-y-auto leading-relaxed overflow-x-hidden select-text font-sans text-slate-300"
              />
            </div>
            <button onClick={() => copyToClipboard(parseMarkdownSimple())} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded text-xs transition-all mt-4">
              Copy Parsed Layout HTML
            </button>
          </div>
        </div>
      )}

      {/* 5. SVG CODE OPTIMIZER */}
      {toolId === 'svg-optimizer' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade">
          <div className="space-y-3 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50">
            <span className="text-xs font-mono font-bold text-slate-300 block">RAW SVG GRAPHIC VECTOR CODE</span>
            <textarea
              rows={5}
              value={svgInput}
              onChange={(e) => setSvgInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 font-mono"
            />
            <button onClick={optimizeSvgPaths} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-1.5 rounded text-xs">
              Strip Comments & metadata spaces
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between text-center min-h-[200px]">
            <span className="text-xs text-slate-500 font-mono">Render Stage Output Preview</span>
            <div className="py-4 my-1 flex justify-center">
              {svgOptimized ? (
                <div
                  dangerouslySetInnerHTML={{ __html: svgOptimized }}
                  className="w-20 h-20 text-teal-400"
                />
              ) : (
                <span className="text-xs text-slate-600 font-mono">Input clean SVG descriptors above.</span>
              )}
            </div>
            {svgOptimized && (
              <button onClick={() => copyToClipboard(svgOptimized)} className="w-[124px] mx-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 rounded text-[10px]">
                Copy Clean Paths
              </button>
            )}
          </div>
        </div>
      )}

      {/* 6. REGEX TESTER & MATCH EXPLAINER */}
      {toolId === 'regex-tester' && (
        <div className="space-y-6">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="Search" className="text-violet-400" /> RegEx Tester & Match Explainer
            </h2>
            <p className="text-xs text-slate-400 mt-1">Verify regular expression matches against custom text with high-speed compilation and token breakdown catalogs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/40 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-350 font-mono">Common RegEx Presets</h3>
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => loadRegexPreset('[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}', 'g', 'Send inquiries to hiring@careerpouch.com or security@careerpouch.pages.dev')}
                  className="w-full text-left bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-850 p-2.5 rounded-xl text-xs font-mono flex flex-col justify-between"
                >
                  <span className="font-bold text-violet-300">Email Address Matcher</span>
                  <span className="text-[10px] text-slate-400 truncate mt-1">/[a-zA-Z0-9._%+-]+@.../</span>
                </button>
                <button
                  onClick={() => loadRegexPreset('(?:https?:\\/\\/)?(?:www\\.)?[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+', 'g', 'Our domains are https://careerpouch.com and staging links at careerpouch.pages.dev')}
                  className="w-full text-left bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-850 p-2.5 rounded-xl text-xs font-mono flex flex-col justify-between"
                >
                  <span className="font-bold text-violet-300">URL Parser</span>
                  <span className="text-[10px] text-slate-400 truncate mt-1">/(?:https?:\/\/)?(?:www\.)?.../</span>
                </button>
                <button
                  onClick={() => loadRegexPreset('\\+?\\d{1,4}[-\\s]?\\(?\\d{1,3}\\)?[-\\s]?\\d{3,4}[-\\s]?\\d{3,4}', 'g', 'Reach hotlines at +1-555-019-2834 or dial 555-9234 locally.')}
                  className="w-full text-left bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-850 p-2.5 rounded-xl text-xs font-mono flex flex-col justify-between"
                >
                  <span className="font-bold text-violet-300">Phone Number Finder</span>
                  <span className="text-[10px] text-slate-400 truncate mt-1">{"/\\+?\\d{1,4}[-\\s]?\\d.../"}</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-850 font-mono text-[11px] text-slate-400 space-y-1.5">
                <span className="text-slate-300 font-bold block mb-1 font-sans">Quick Cheat-Sheet:</span>
                <div><code className="text-amber-400 font-bold">\d</code> - Any number (0-9)</div>
                <div><code className="text-amber-400 font-bold">\w</code> - Word characters (a-zA-Z0-9_)</div>
                <div><code className="text-amber-400 font-bold">\s</code> - White space characters</div>
                <div><code className="text-amber-400 font-bold">+</code> - 1 or more occurrences</div>
                <div><code className="text-amber-400 font-bold">*</code> - 0 or more occurrences</div>
                <div><code className="text-amber-400 font-bold">?</code> - Optional occurrence</div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/40 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono">
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wider">Regular Expression Pattern</label>
                    <input
                      type="text"
                      value={regexPattern}
                      onChange={(e) => setRegexPattern(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-violet-350 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wider">Flags</label>
                    <input
                      type="text"
                      value={regexFlags}
                      onChange={(e) => setRegexFlags(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-violet-350 font-mono font-bold text-center"
                    />
                  </div>
                </div>

                {regexResult.error ? (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono rounded-lg">
                    ⚠️ compilation error: {regexResult.error}
                  </div>
                ) : (
                  <div className="p-1 px-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-lg flex items-center gap-1.5">
                    <Icon name="CheckCircle2" size={13} /> Pattern fully compiled! Matches discovered: {regexResult.count}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase tracking-wider">Passage Text To Search</label>
                  <textarea
                    rows={4}
                    value={regexText}
                    onChange={(e) => setRegexText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-200 font-mono resize-none focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              {regexResult.list.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Captured Match Segments</span>
                  <div className="flex flex-wrap gap-2">
                    {regexResult.list.map((matchStr, idx) => (
                      <span
                        key={idx}
                        className="bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono px-2.5 py-1 rounded text-xs select-all flex items-center gap-1.5"
                      >
                        <code className="text-[10px] text-slate-500">#{idx+1}</code>
                        <span>{matchStr}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
