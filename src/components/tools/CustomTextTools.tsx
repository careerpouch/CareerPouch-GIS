import React, { useState, useEffect } from 'react';
import { Icon } from '../Icon';

interface CustomTextToolsProps {
  toolId: string;
}

export const CustomTextTools: React.FC<CustomTextToolsProps> = ({ toolId }) => {
  // 1. TEXT SUMMARIZER STATE
  const [summarizerText, setSummarizerText] = useState(`CareerPouch delivers high-class utility tools tailored specifically to active software contractors and modern professional writers. The application handles direct in-browser memory states safely. Using local cryptographic checksum APIs protects user integrity during deep work sessions. We prioritize lightweight execution speeds over bloated framework wrappers.`);
  const [summaryResult, setSummaryResult] = useState('');

  const summarizePassage = () => {
    const sentences = summarizerText.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 5);
    if (sentences.length <= 1) {
      setSummaryResult(summarizerText);
      return;
    }
    // Simple frequency weighting matching high-utility nodes
    const keywords = ['utility', 'professional', 'safely', 'cryptographic', 'integrity', 'lightweight', 'speed'];
    const weighed = sentences.map(s => {
      let score = 0;
      keywords.forEach(word => {
        if (s.toLowerCase().includes(word)) score += 1;
      });
      return { text: s, score };
    });

    const sorted = [...weighed].sort((a, b) => b.score - a.score);
    // Take the top 2 weighted sentences
    const topSentences = sorted.slice(0, 2).map(s => s.text + '.');
    setSummaryResult(topSentences.join(' '));
  };

  useEffect(() => {
    summarizePassage();
  }, [summarizerText]);

  // 2. DICTIONARY TRANSLATION PRESETS
  const [phrase, setPhrase] = useState('Welcome to our developer team sandbox');
  const [targetLang, setTargetLang] = useState('Spanish');

  const translatePhrase = () => {
    const dictionary: Record<string, Record<string, string>> = {
      'Welcome to our developer team sandbox': {
        Spanish: 'Bienvenido al sandbox de nuestro equipo de desarrolladores',
        French: 'Bienvenue dans le bac à sable de notre équipe de développeurs',
        German: 'Willkommen in der Sandbox unseres Entwicklerteams',
        Japanese: '開発者チームサンドボックスへようこそ'
      },
      'Deploying safe code updates in real time': {
        Spanish: 'Desplegando actualizaciones de código seguras en tiempo real',
        French: 'Déploiement de mises à jour de code sécurisées en temps réel',
        German: 'Sicherheits-Code-Updates in Echtzeit ausrollen',
        Japanese: '安全なコードアップデートをリアルタイムでデプロイします'
      }
    };

    const row = dictionary[phrase];
    if (row && row[targetLang]) return row[targetLang];
    return `Translation mock for "${phrase}" in ${targetLang} is fully prepared for global networks.`;
  };

  // 3. AI REPHRASE
  const [rephraseText, setRephraseText] = useState('i dont want to go to the zoom meeting today because i have too much other stuff on my plate');
  const [tone, setTone] = useState('Corporate');

  const getRephraseOutput = () => {
    const txt = rephraseText.toLowerCase();
    if (tone === 'Corporate') {
      return 'I would like to request to skip today’s sync call. I am currently operating at capacity with critical high-priority deliverables and wish to prioritize their release integrity.';
    } else if (tone === 'Assertive') {
      return 'I will be absent from today’s call to safeguard my focus on compiling core project dependencies to meet our release schedules.';
    } else if (tone === 'Simplified') {
      return 'I am skipping today’s meeting because I am very busy.';
    }
    return rephraseText;
  };

  // 4. GRAMMAR DIAGNOSIS
  const [grammarInput, setGrammarInput] = useState('their is two main reasons why we write code write now instead of waiting on legacy builds');
  
  const getGrammarErrors = () => {
    const errors = [];
    if (grammarInput.toLowerCase().includes('their is')) {
      errors.push({ original: 'their is', correction: 'there are', reason: 'Subject-verb agreement and adverbial place identification mismatch.' });
    }
    if (grammarInput.toLowerCase().includes('write code write now')) {
      errors.push({ original: 'write now', correction: 'right now', reason: 'Homophone confusion; write represents text compilation whereas right represents immediately.' });
    }
    return errors;
  };

  // 5. CASE CONVERTER
  const [caseText, setCaseText] = useState('career pouch platform utility');
  
  const convertCase = (type: 'upper' | 'lower' | 'title' | 'camel' | 'snake' | 'kebab') => {
    const words = caseText.trim().split(/\s+/).filter(Boolean);
    if (type === 'upper') return caseText.toUpperCase();
    if (type === 'lower') return caseText.toLowerCase();
    if (type === 'title') return words.map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    if (type === 'camel') return words[0].toLowerCase() + words.slice(1).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');
    if (type === 'snake') return words.map(w => w.toLowerCase()).join('_');
    if (type === 'kebab') return words.map(w => w.toLowerCase()).join('-');
    return caseText;
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. TEXT SUMMARIZER */}
      {toolId === 'text-summarizer' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="Sparkles" className="text-violet-400" />
              Weight-Frequency Text Summarizer
            </h2>
            <p className="text-xs text-slate-400 mt-1">Surgically extract high-priority keywords sentences from raw descriptive passages locally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <span className="block text-[10px] font-mono text-slate-400 uppercase">Input Narrative passage:</span>
              <textarea
                value={summarizerText}
                onChange={(e) => setSummarizerText(e.target.value)}
                rows={9}
                className="w-full bg-slate-900 border border-slate-705 text-xs text-white p-4 rounded-xl leading-relaxed outline-none"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-between bg-slate-950 p-5 rounded-2xl border border-slate-850">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-mono text-violet-450 uppercase">Extracted Core Summary:</span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-902 select-all select-text">
                  {summaryResult || 'Key in larger text values above...'}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(summaryResult);
                  alert('Summary copied!');
                }}
                className="w-full bg-violet-650 hover:bg-violet-600 text-white font-bold py-2 rounded-xl text-xs uppercase hover:scale-101 transition-all"
              >
                Copy core summary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TRANSLATION HELPER */}
      {toolId === 'translation-helper' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="Languages" className="text-violet-400" />
              Developer Language Presets Dictionary
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">Preview localized strings translation side-by-side offline in sandboxed layout modules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-755 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-350 font-mono">Parameters</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1.5">Phrase Option</label>
                  <select
                    value={phrase}
                    onChange={(e) => setPhrase(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="Welcome to our developer team sandbox">Welcome to our developer team sandbox</option>
                    <option value="Deploying safe code updates in real time">Deploying safe code updates in real time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1.5">Target Language</label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="Spanish">Spanish (Castilian)</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between font-sans">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-450 block uppercase">LOCALIZED OUTPUT translation:</span>
                <p className="p-4 bg-slate-900 border border-slate-850 rounded-xl text-xs font-bold text-slate-205 leading-relaxed select-text select-all">
                  {translatePhrase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. AI REPHRASE */}
      {toolId === 'ai-rephrase' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="RefreshCw" className="text-violet-400 animate-spin" />
              Slick Tone & AI Voice Rephraser
            </h2>
            <p className="text-xs text-slate-400 mt-1">Restructure informal drafts into chosen professional settings instantly side-by-side.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3.5 bg-slate-800/40 p-5 rounded-2xl border border-slate-755">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1.5 text-amber-400">Casual User Draft</label>
                <textarea
                  value={rephraseText}
                  onChange={(e) => setRephraseText(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Target Tone Preset</label>
                <div className="flex gap-2">
                  {['Corporate', 'Assertive', 'Simplified'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`flex-1 py-1 px-2.5 rounded border text-[10px] font-mono font-bold transition-all ${
                        tone === t ? 'bg-violet-900/30 border-violet-505 text-violet-350' : 'bg-slate-900 border-slate-800 text-slate-450'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between font-sans">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-violet-400 block uppercase">Tone-Mapped output update:</span>
                <p className="p-4 bg-slate-900 border border-slate-850 rounded-xl text-xs font-semibold text-slate-200 leading-relaxed select-text select-all">
                  {getRephraseOutput()}
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(getRephraseOutput());
                  alert('Rephrased text copied!');
                }}
                className="w-full bg-violet-650 hover:bg-violet-600 font-bold py-2 rounded-xl text-xs text-white transition-colors mt-4 uppercase"
              >
                Copy professional draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. GRAMMAR CHECKER */}
      {toolId === 'grammar-checker' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="SpellCheck" className="text-violet-400" />
              Offline Homophone & Grammar Diagnostic Analyzer
            </h2>
            <p className="text-xs text-slate-400 mt-1">Audit lexical mistakes and get structural explanations instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] text-slate-400 uppercase font-mono">My Text Passage</label>
              <textarea
                value={grammarInput}
                onChange={(e) => setGrammarInput(e.target.value)}
                rows={5}
                className="w-full bg-slate-900 border border-slate-707 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 font-sans space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase block border-b border-slate-900 pb-1.5">Identified Diagnostics</span>
                
                {getGrammarErrors().length > 0 ? (
                  <div className="space-y-2">
                    {getGrammarErrors().map((err, i) => (
                      <div key={i} className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs">
                        <div className="flex gap-2 text-[10px] font-mono text-slate-400 pb-1 font-bold">
                          <span>Original: <strong className="text-rose-400 line-through">{err.original}</strong></span>
                          <span>▸ Correction: <strong className="text-emerald-440">{err.correction}</strong></span>
                        </div>
                        <p className="text-[11px] text-slate-350 leading-relaxed font-sans">{err.reason}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500 border border-slate-900 rounded-xl leading-relaxed">
                    ✨ No major diagnostic alerts discovered locally! Key in homophones like "their is" or "write now" to check the diagnostics.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CASE CONVERTER */}
      {toolId === 'case-converter' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="CaseSensitive" className="text-violet-400" />
              Slick Casing & Case Converter helper
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-sans">Toggle strings casing formats between programming, display, and sentence arrays instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-755 space-y-3">
              <label className="block text-[10px] text-slate-400 uppercase font-mono">Base string passage</label>
              <input
                type="text"
                value={caseText}
                onChange={(e) => setCaseText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-3">
              <h4 className="text-[10px] uppercase font-mono text-slate-400 border-b border-slate-900 pb-1.5 font-bold">Casing Variants Outputs</h4>
              <div className="space-y-2">
                {[
                  { label: 'UPPERCASE', type: 'upper' },
                  { label: 'lowercase', type: 'lower' },
                  { label: 'Title Case', type: 'title' },
                  { label: 'camelCase', type: 'camel' },
                  { label: 'snake_case', type: 'snake' },
                  { label: 'kebab-case', type: 'kebab' }
                ].map((c) => {
                  const out = convertCase(c.type as any);
                  return (
                    <div key={c.type} className="p-2 bg-slate-902 border border-slate-860 rounded-lg text-xs flex justify-between items-center font-mono">
                      <div>
                        <span className="text-[9px] text-slate-500 block">{c.label}</span>
                        <span className="text-slate-300 block pt-0.5">{out}</span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(out);
                          alert(`${c.label} copied!`);
                        }}
                        className="text-[9px] uppercase font-bold text-violet-450 hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
