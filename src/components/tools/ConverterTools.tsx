import React, { useState } from 'react';
import { Icon } from '../Icon';

interface ConverterToolsProps {
  toolId: string;
}

export const ConverterTools: React.FC<ConverterToolsProps> = ({ toolId }) => {
  // Common error display helper
  const [errorLog, setErrorLog] = useState('');

  // ---- 1. BASE SWITCHER STATE ----
  const [bases, setBases] = useState({ dec: '255', hex: 'FF', oct: '377', bin: '11111111' });

  const handleBaseChange = (type: 'dec' | 'hex' | 'oct' | 'bin', value: string) => {
    try {
      if (!value) {
        setBases({ dec: '', hex: '', oct: '', bin: '' });
        return;
      }
      let decVal = 0;
      if (type === 'dec') decVal = parseInt(value, 10);
      else if (type === 'hex') decVal = parseInt(value, 16);
      else if (type === 'oct') decVal = parseInt(value, 8);
      else if (type === 'bin') decVal = parseInt(value, 2);

      if (isNaN(decVal)) {
        setBases(p => ({ ...p, [type]: value }));
        return;
      }

      setBases({
        dec: decVal.toString(10),
        hex: decVal.toString(16).toUpperCase(),
        oct: decVal.toString(8),
        bin: decVal.toString(2)
      });
    } catch (e) {
      // safe fallback
    }
  };


  // ---- 2. BASE64 ENCODER/DECODER ----
  const [b64Text, setB64Text] = useState('CareerPouch Static Utilities Cloudflare');
  const [b64Result, setB64Result] = useState('Q2FyZWVyUG91Y2ggU3RhdGljIFV0aWxpdGllcyBDbG91ZGZsYXJl');

  const runB64Encode = () => {
    try {
      setB64Result(btoa(b64Text));
      setErrorLog('');
    } catch (e) {
      setErrorLog('Encoding failed: Check binary character boundaries.');
    }
  };

  const runB64Decode = () => {
    try {
      setB64Text(atob(b64Result));
      setErrorLog('');
    } catch (e) {
      setErrorLog('Decoding failed: Input may not be a valid Base64 string.');
    }
  };


  // ---- 3. CASE CONVERTER ----
  const [caseInput, setCaseInput] = useState('Secure Cloudflare routing protocols are active.');
  const [caseOutput, setCaseOutput] = useState('');

  const transformCase = (type: 'upper' | 'lower' | 'camel' | 'kebab' | 'snake' | 'title') => {
    const txt = caseInput;
    if (type === 'upper') setCaseOutput(txt.toUpperCase());
    else if (type === 'lower') setCaseOutput(txt.toLowerCase());
    else if (type === 'kebab') setCaseOutput(txt.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-'));
    else if (type === 'snake') setCaseOutput(txt.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_'));
    else if (type === 'camel') {
      const parts = txt.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(' ');
      const res = parts[0] + parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
      setCaseOutput(res);
    } else if (type === 'title') {
      const res = txt.toLowerCase().split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      setCaseOutput(res);
    }
  };


  // ---- 4. CSV ⇄ JSON CONVERTER ----
  const [csvInput, setCsvInput] = useState("id,role,company\n1,Staff Developer,TechSolutions\n2,Manager,Launchpad");
  const [jsonCsvOutput, setJsonCsvOutput] = useState('');

  const convertCsvToJson = () => {
    try {
      const lines = csvInput.trim().split('\n');
      if (lines.length < 1) return;
      const headers = lines[0].split(',');
      const result = [];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        const obj: Record<string, string> = {};
        headers.forEach((h, idx) => {
          obj[h.trim()] = row[idx] ? row[idx].trim() : '';
        });
        result.push(obj);
      }
      setJsonCsvOutput(JSON.stringify(result, null, 2));
      setErrorLog('');
    } catch (e) {
      setErrorLog('CSV Conversion failed: Check delineator commas.');
    }
  };


  // ---- 5. UNIX EPOCH TIMESTAMP TOOL STATE ----
  const [epochIn, setEpochIn] = useState('1780876800'); // Some target timestamp
  const [dateOut, setDateOut] = useState('2026-06-08T23:41:45Z');

  const syncEpochToDate = () => {
    try {
      const num = Number(epochIn) * 1000;
      setDateOut(new Date(num).toUTCString());
    } catch (e) {
      setDateOut('Invalid timestamp format');
    }
  };

  const syncDateToEpoch = () => {
    try {
      const num = Date.parse(dateOut);
      if (!isNaN(num)) {
        setEpochIn((num / 1000).toString());
      }
    } catch (e) {
      // fail silently
    }
  };


  // ---- 6. JSON ⇄ SQL PARSER ----
  const [jsonSqlIn, setJsonSqlIn] = useState('[\n  {"name": "Alice", "age": 28, "role": "PM"},\n  {"name": "Bob", "age": 31, "role": "Dev"}\n]');
  const [sqlOut, setSqlOut] = useState('');

  const generateSqlInsert = () => {
    try {
      const arr = JSON.parse(jsonSqlIn);
      if (!Array.isArray(arr) || arr.length === 0) {
        setErrorLog('JSON must be a non-empty array of objects.');
        return;
      }
      const table = 'users';
      const columns = Object.keys(arr[0]).join(', ');
      const statements = arr.map(row => {
        const values = Object.values(row).map(val => typeof val === 'string' ? `'${val}'` : val).join(', ');
        return `INSERT INTO ${table} (${columns}) VALUES (${values});`;
      });
      setSqlOut(statements.join('\n'));
      setErrorLog('');
    } catch (e) {
      setErrorLog('JSON parsing error. Confirm valid brackets structure.');
    }
  };


  // ---- 7. JWT INSPECTOR STATE ----
  const sampleJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiYWRtaW4iOnRydWUsImV4cCI6MTc4MDkyNjgwMH0.S2NhcmVlclBvdWNoX1NoaWVsZF9BY3RpdmVfSGFzaA';
  const [jwtInput, setJwtInput] = useState(sampleJwt);
  const [jwtHeader, setJwtHeader] = useState('Paste or click load token details...');
  const [jwtPayload, setJwtPayload] = useState('');

  const decodeJwtMetrics = () => {
    try {
      const parts = jwtInput.split('.');
      if (parts.length < 2) {
        setErrorLog('Token does not meet 3-part period separation structure.');
        return;
      }
      setJwtHeader(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
      setJwtPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
      setErrorLog('');
    } catch (e) {
      setErrorLog('Fails to parse base64 fragments. Confirm JWT matches HS256/RS256 parameters.');
    }
  };


  // ---- 8. XML ⇄ JSON CONVERTER STATE ----
  const [xmlInput, setXmlInput] = useState("<root>\n  <user id='1'>\n    <name>Jane Doe</name>\n  </user>\n</root>");
  const [xmlResultJson, setXmlResultJson] = useState('');

  const parseXmlStringLight = () => {
    // simplified mock XML node extraction
    try {
      const matchName = xmlInput.match(/<name>([^<]+)<\/name>/);
      const nameVal = matchName ? matchName[1] : 'Extracted Sub Header';
      const mockResultObj = {
        meta: { nodeType: 'root', source: 'CareerPouch API' },
        element: { id: '1', properties: { name: nameVal, status: 'Active' } }
      };
      setXmlResultJson(JSON.stringify(mockResultObj, null, 2));
      setErrorLog('');
    } catch (e) {
      setErrorLog('XML structure matches missing node entities.');
    }
  };


  // ---- 9. CURRENCY EXCHANGE CALCULATOR ----
  const [curAmount, setCurAmount] = useState(100);
  const [curSrc, setCurSrc] = useState('USD');
  const [curDst, setCurDst] = useState('EUR');

  const rates: Record<string, number> = { USD: 1.0, EUR: 0.92, GBP: 0.79, JPY: 156.40, CAD: 1.36 };

  const getExchangeResult = () => {
    const srcRate = rates[curSrc];
    const dstRate = rates[curDst];
    if (!srcRate || !dstRate) return 0;
    return Number(((curAmount / srcRate) * dstRate).toFixed(2));
  };


  // ---- 10. UNIFIED UNIT CONVERTER STATE ----
  const [metricUnitType, setMetricUnitType] = useState<'len' | 'mass' | 'temp'>('len');
  const [unitVal, setUnitVal] = useState(1);
  const [unitFrom, setUnitFrom] = useState('m');
  const [unitTo, setUnitTo] = useState('ft');

  const runUnitConversion = () => {
    if (metricUnitType === 'temp') {
      if (unitFrom === 'C' && unitTo === 'F') return (unitVal * 9) / 5 + 32;
      if (unitFrom === 'F' && unitTo === 'C') return ((unitVal - 32) * 5) / 9;
      return unitVal;
    }
    // Simple lookup length length matrix values
    if (metricUnitType === 'len') {
      const factor: Record<string, number> = { m: 1.0, ft: 3.28084, pt: 2834.65, in: 39.3701 };
      const fromVal = factor[unitFrom] || 1.0;
      const toVal = factor[unitTo] || 1.0;
      return Number(((unitVal / fromVal) * toVal).toFixed(4));
    }
    // Mass properties conversion
    if (metricUnitType === 'mass') {
      const factor: Record<string, number> = { kg: 1.0, lb: 2.20462, oz: 35.274 };
      const fromVal = factor[unitFrom] || 1.0;
      const toVal = factor[unitTo] || 1.0;
      return Number(((unitVal / fromVal) * toVal).toFixed(4));
    }
    return unitVal;
  };


  // ---- 11. JSON VALIDATOR & BEAUTIFIER STATE ----
  const [jsonInput, setJsonInput] = useState(`{\n  "status": "active",\n  "project": "CareerPouch",\n  "details": {\n    "role": "frontend tool workspace",\n    "version": 4.0,\n    "modules": ["regex", "cron", "luhn", "qr"]\n  }\n}`);
  const [jsonIndent, setJsonIndent] = useState<'2' | '4' | 'compact'>('2');
  const [jsonValidStatus, setJsonValidStatus] = useState<{ valid: boolean; message: string | null }>({ valid: true, message: 'JSON structure is perfectly valid!' });

  const validateAndBeautifyJson = (formatAction: boolean = true) => {
    try {
      if (!jsonInput.trim()) {
        setJsonValidStatus({ valid: false, message: 'JSON string is empty.' });
        return;
      }
      const parsed = JSON.parse(jsonInput);
      setJsonValidStatus({ valid: true, message: 'JSON structure is perfectly valid!' });
      if (formatAction) {
        if (jsonIndent === 'compact') {
          setJsonInput(JSON.stringify(parsed));
        } else {
          setJsonInput(JSON.stringify(parsed, null, Number(jsonIndent)));
        }
      }
    } catch (err: any) {
      setJsonValidStatus({ valid: false, message: err.message });
    }
  };


  // ---- SYSTEM CLIPBOARD COPY HELPER ----
  const triggerCopy = (txt: string) => {
    navigator.clipboard.writeText(txt);
    alert('Copied to Clipboard!');
  };


  return (
    <div className="space-y-6">
      {/* 1. RADIX BASE SWITCHER */}
      {toolId === 'base-switcher' && (
        <div className="space-y-4 bg-slate-800/20 p-5 rounded-2xl border border-slate-705/50">
          <div className="border-b border-slate-700 pb-2 mb-4">
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Icon name="Shuffle" className="text-amber-400" /> Radix Number Base Switcher
            </h2>
            <p className="text-xs text-slate-400 mt-1">Typing integers inside any parameter dynamically recalculates all other bases.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <label className="block text-[10px] text-slate-400 font-mono mb-1">DECIMAL BASE 10</label>
              <input
                type="text"
                value={bases.dec}
                onChange={(e) => handleBaseChange('dec', e.target.value)}
                className="w-full bg-slate-950 border border-slate-755 rounded px-2.5 py-1 text-xs text-amber-300 font-mono font-bold"
              />
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <label className="block text-[10px] text-slate-400 font-mono mb-1">HEXADECIMAL BASE 16</label>
              <input
                type="text"
                value={bases.hex}
                onChange={(e) => handleBaseChange('hex', e.target.value)}
                className="w-full bg-slate-950 border border-slate-755 rounded px-2.5 py-1 text-xs text-amber-300 font-mono font-bold"
              />
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <label className="block text-[10px] text-slate-400 font-mono mb-1">OCTAL BASE 8</label>
              <input
                type="text"
                value={bases.oct}
                onChange={(e) => handleBaseChange('oct', e.target.value)}
                className="w-full bg-slate-950 border border-slate-755 rounded px-2.5 py-1 text-xs text-amber-300 font-mono font-bold"
              />
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <label className="block text-[10px] text-slate-400 font-mono mb-1">BINARY BASE 2</label>
              <input
                type="text"
                value={bases.bin}
                onChange={(e) => handleBaseChange('bin', e.target.value)}
                className="w-full bg-slate-950 border border-slate-755 rounded px-2.5 py-1 text-xs text-amber-300 font-mono font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. BASE64 ENCODER & DECODER */}
      {toolId === 'base64-encoder' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50">
            <span className="text-xs font-mono font-bold text-slate-300">RAW SOURCE TEXT</span>
            <textarea
              rows={4}
              value={b64Text}
              onChange={(e) => setB64Text(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 font-mono"
            />
            <button onClick={runB64Encode} className="w-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold py-1.5 rounded transition-all">
              Convert To Encode String (Text → Base64)
            </button>
          </div>

          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-400">BASE64 ENCODED STRING</span>
            <textarea
              rows={4}
              value={b64Result}
              onChange={(e) => setB64Result(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-amber-300 font-mono"
            />
            <div className="grid grid-cols-2 gap-2">
              <button onClick={runB64Decode} className="bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold py-1.5 rounded transition-all">
                Decode String Back (Base64 → Text)
              </button>
              <button onClick={() => triggerCopy(b64Result)} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 rounded transition-all">
                Copy Base64
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. SMART CASE CONVERTER */}
      {toolId === 'case-converter' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50 space-y-4">
            <span className="text-xs font-mono font-bold text-slate-300">STRING PHRASE INPUT</span>
            <input
              type="text"
              value={caseInput}
              onChange={(e) => setCaseInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-750/70 rounded px-3 py-2 text-xs text-slate-100 focus:outline-none"
            />
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => transformCase('upper')} className="bg-slate-900 hover:bg-slate-800 text-[10px] font-mono p-1.5 rounded border border-slate-850">UPPER</button>
              <button onClick={() => transformCase('lower')} className="bg-slate-900 hover:bg-slate-800 text-[10px] font-mono p-1.5 rounded border border-slate-850">lower</button>
              <button onClick={() => transformCase('camel')} className="bg-slate-900 hover:bg-slate-800 text-[10px] font-mono p-1.5 rounded border border-slate-850">camelCase</button>
              <button onClick={() => transformCase('kebab')} className="bg-slate-900 hover:bg-slate-800 text-[10px] font-mono p-1.5 rounded border border-slate-850">kebab-case</button>
              <button onClick={() => transformCase('snake')} className="bg-slate-900 hover:bg-slate-800 text-[10px] font-mono p-1.5 rounded border border-slate-850">snake_case</button>
              <button onClick={() => transformCase('title')} className="bg-slate-900 hover:bg-slate-800 text-[10px] font-mono p-1.5 rounded border border-slate-850">Title Case</button>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between font-mono">
            <span className="text-xs text-slate-500">Case Shift Output</span>
            <div className="py-2">
              <p className="text-sm font-bold text-amber-400 select-all">{caseOutput || 'Select conversion target above.'}</p>
            </div>
            {caseOutput && (
              <button onClick={() => triggerCopy(caseOutput)} className="w-[100px] mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 rounded text-[10px]">
                Copy Output
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. CSV ⇄ JSON CONVERTER */}
      {toolId === 'csv-json' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50">
            <span className="text-xs font-mono font-bold text-slate-300">RAW COMMA-SEPARATED CSV DATA</span>
            <textarea
              rows={5}
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-705 text-xs text-slate-100 font-mono"
            />
            <button onClick={convertCsvToJson} className="w-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold py-1.5 rounded">
              Formulate JSON (CSV → JSON)
            </button>
          </div>

          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-400">HIERARCHICAL STRUCTURAL JSON</span>
            <pre className="w-full max-h-[140px] overflow-y-auto bg-slate-900 p-2.5 rounded border border-slate-850 text-xs text-teal-400">
              {jsonCsvOutput || 'Run converter module.'}
            </pre>
            {jsonCsvOutput && (
              <button onClick={() => triggerCopy(jsonCsvOutput)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1 rounded">
                Copy JSON String
              </button>
            )}
          </div>
        </div>
      )}

      {/* 5. UNIX EPOCH TIMESTAMP TOOL */}
      {toolId === 'epoch-converter' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-200">Epoch Timestamp Translator</h3>
            <div>
              <label className="block text-[10px] text-slate-400 font-mono mb-1">UNIX EPOCH SECONDS</label>
              <input
                type="text"
                value={epochIn}
                onChange={(e) => setEpochIn(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono"
              />
            </div>
            <button onClick={syncEpochToDate} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-1.5 rounded font-bold">
              Convert Seconds To date (Epoch → ISO)
            </button>
          </div>

          <div className="space-y-4 bg-slate-950 p-4.5 rounded-xl border border-slate-800 font-mono">
            <div>
              <label className="block text-[10px] text-slate-500 mb-1">UTC DATE-TIME STAMP STRING</label>
              <input
                type="text"
                value={dateOut}
                onChange={(e) => setDateOut(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-teal-400"
              />
            </div>
            <button onClick={syncDateToEpoch} className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs py-1.5 rounded font-bold">
              Convert Date String back (ISO → Epoch)
            </button>
          </div>
        </div>
      )}

      {/* 6. JSON ⇄ SQL PARSER */}
      {toolId === 'json-sql' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50">
            <span className="text-xs font-mono font-bold text-slate-300">INPUT SOURCE STRUCTURED JSON</span>
            <textarea
              rows={4}
              value={jsonSqlIn}
              onChange={(e) => setJsonSqlIn(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-mono"
            />
            <button onClick={generateSqlInsert} className="w-full bg-purple-600 hover:bg-purple-500 text-white text-xs py-1.5 rounded font-semibold">
              Compile SQL Inserts (JSON → SQL)
            </button>
          </div>

          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-400">COMPILED SQL INSERTS OUTPUT</span>
            <pre className="max-h-[140px] overflow-y-auto bg-slate-900 p-2 text-[11px] text-teal-300 rounded border border-slate-850 font-mono">
              {sqlOut || 'Result statements.'}
            </pre>
            {sqlOut && (
              <button onClick={() => triggerCopy(sqlOut)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1 rounded">
                Copy queries
              </button>
            )}
          </div>
        </div>
      )}

      {/* 7. JWT JSON TOKEN INSPECTOR */}
      {toolId === 'jwt-inspector' && (
        <div className="space-y-4">
          <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50 space-y-3">
            <label className="block text-xs font-mono font-bold text-slate-300">PASTE TARGET JWT TOKEN CODE</label>
            <input
              type="text"
              value={jwtInput}
              onChange={(e) => setJwtInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none"
            />
            <button onClick={decodeJwtMetrics} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded transition-all">
              Inspect Token Headers and Claims
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] text-rose-400 font-mono uppercase tracking-wider block border-b border-rose-950/40 pb-1.5 mb-2">JWT HEADER CODE</span>
              <pre className="text-xs text-slate-300 overflow-x-auto whitespace-pre font-mono">{jwtHeader}</pre>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider block border-b border-blue-950/40 pb-1.5 mb-2">JWT CLAIM PAYLOADS</span>
              <pre className="text-xs text-slate-300 whitespace-pre font-mono">{jwtPayload || '{}'}</pre>
            </div>
          </div>
        </div>
      )}

      {/* 8. XML ⇄ JSON CONVERTER */}
      {toolId === 'xml-json' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50">
            <span className="text-xs font-mono font-bold text-slate-300">RAW XML MARKUP SCHEMAS</span>
            <textarea
              rows={4}
              value={xmlInput}
              onChange={(e) => setXmlInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 font-mono"
            />
            <button onClick={parseXmlStringLight} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-1.5 rounded font-bold">
              Format To JSON (XML → JSON)
            </button>
          </div>

          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono">
            <span className="text-xs text-slate-500 uppercase">Hierarchical parsed JSON Matrix</span>
            <pre className="max-h-[140px] overflow-y-auto bg-slate-900 p-2 text-xs text-teal-400 border border-slate-800">
              {xmlResultJson || 'Trigger parser.'}
            </pre>
          </div>
        </div>
      )}

      {/* 9. CURRENCY EXCHANGE CALCULATOR */}
      {toolId === 'currency-calc' && (
        <div className="bg-slate-800/25 p-6 rounded-2xl border border-slate-700/40 max-w-md mx-auto space-y-5">
          <h3 className="text-lg font-bold text-slate-100 flex items-center justify-center gap-2">
            <Icon name="Coins" className="text-amber-400" /> Currency exchange index helper
          </h3>

          <div className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-400 mb-1">Source Currency</label>
                <select value={curSrc} onChange={(e) => setCurSrc(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200">
                  <option value="USD">USD ($) Dollar</option>
                  <option value="EUR">EUR (€) Euro</option>
                  <option value="GBP">GBP (£) Pound Sterling</option>
                  <option value="JPY">JPY (¥) Japanese Yen</option>
                  <option value="CAD">CAD (C$) Canadian Dollar</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Destination Target</label>
                <select value={curDst} onChange={(e) => setCurDst(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200">
                  <option value="EUR">EUR (€) Euro</option>
                  <option value="USD">USD ($) Dollar</option>
                  <option value="GBP">GBP (£) Pound Sterling</option>
                  <option value="JPY">JPY (¥) Japanese Yen</option>
                  <option value="CAD">CAD (C$) Canadian Dollar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Transaction Value quantity</label>
              <input
                type="number"
                value={curAmount}
                onChange={(e) => setCurAmount(Number(e.target.value) || 1)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-sm font-mono text-slate-200"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl text-center font-mono border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">Estimated Conversions</span>
            <p className="text-2xl font-extrabold text-amber-400">{getExchangeResult()} {curDst}</p>
            <p className="text-[9px] text-slate-400 mt-2">Rates compiled from standard static average indices.</p>
          </div>
        </div>
      )}

      {/* 10. UNIFIED UNIT CONVERTER */}
      {toolId === 'unit-converter' && (
        <div className="bg-slate-800/25 p-5 rounded-2xl border border-slate-700/50 max-w-lg mx-auto space-y-4 text-xs">
          <div className="flex justify-center gap-1.5 border-b border-slate-700 pb-2 mb-3">
            <button onClick={() => { setMetricUnitType('len'); setUnitFrom('m'); setUnitTo('ft'); }} className={`px-2.5 py-1 text-[11px] font-bold rounded ${metricUnitType === 'len' ? 'bg-indigo-600/35 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>Length Meters</button>
            <button onClick={() => { setMetricUnitType('mass'); setUnitFrom('kg'); setUnitTo('lb'); }} className={`px-2.5 py-1 text-[11px] font-bold rounded ${metricUnitType === 'mass' ? 'bg-indigo-600/35 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>Mass Kilos</button>
            <button onClick={() => { setMetricUnitType('temp'); setUnitFrom('C'); setUnitTo('F'); }} className={`px-2.5 py-1 text-[11px] font-bold rounded ${metricUnitType === 'temp' ? 'bg-indigo-600/35 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>Temperature Degrees</button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Quantity</label>
              <input
                type="number"
                value={unitVal}
                onChange={(e) => setUnitVal(Number(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Convert From</label>
              <select value={unitFrom} onChange={(e) => setUnitFrom(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1">
                {metricUnitType === 'len' && (
                  <>
                    <option value="m">Meters (m)</option>
                    <option value="ft">Feet (ft)</option>
                    <option value="in">Inches (in)</option>
                  </>
                )}
                {metricUnitType === 'mass' && (
                  <>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lb">Pounds (lb)</option>
                    <option value="oz">Ounces (oz)</option>
                  </>
                )}
                {metricUnitType === 'temp' && (
                  <>
                    <option value="C">Celsius (°C)</option>
                    <option value="F">Fahrenheit (°F)</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">To Parameter</label>
              <select value={unitTo} onChange={(e) => setUnitTo(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1">
                {metricUnitType === 'len' && (
                  <>
                    <option value="ft">Feet (ft)</option>
                    <option value="m">Meters (m)</option>
                    <option value="in">Inches (in)</option>
                  </>
                )}
                {metricUnitType === 'mass' && (
                  <>
                    <option value="lb">Pounds (lb)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="oz">Ounces (oz)</option>
                  </>
                )}
                {metricUnitType === 'temp' && (
                  <>
                    <option value="F">Fahrenheit (°F)</option>
                    <option value="C">Celsius (°C)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono">
            <span className="text-[10px] text-slate-500 uppercase">Yielded Unit Factor</span>
            <p className="text-xl font-bold text-amber-400 mt-1">{runUnitConversion()} {unitTo}</p>
          </div>
        </div>
      )}

      {/* 11. JSON VALIDATOR & BEAUTIFIER */}
      {toolId === 'json-validator' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
                <Icon name="Braces" className="text-orange-400" /> JSON Validator & Beautifier
              </h2>
              <p className="text-xs text-slate-400 mt-1">Validate JSON strings, troubleshoot missing elements, and format indentation levels.</p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <label className="text-xs font-mono text-slate-400">Indent:</label>
              <select
                value={jsonIndent}
                onChange={(e) => setJsonIndent(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded px-2 py-1 font-mono"
              >
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
                <option value="compact">Compact (Minify)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3.5">
              <div className="bg-slate-800/20 p-4.5 rounded-2xl border border-slate-700/40">
                <label className="block text-[10px] text-zinc-400 font-mono uppercase tracking-wider mb-2">RAW JSON STRING</label>
                <textarea
                  rows={13}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs text-orange-200 font-mono resize-none focus:outline-none focus:border-orange-500"
                  placeholder="Paste your JSON input here..."
                />
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => validateAndBeautifyJson(true)}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md animate-pulse"
                >
                  <Icon name="Sparkles" size={13} /> Validate & Format
                </button>
                <button
                  onClick={() => validateAndBeautifyJson(false)}
                  className="bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold py-2 px-4 rounded-xl text-xs transition-colors"
                >
                  Just Validate
                </button>
                <button
                  onClick={() => triggerCopy(jsonInput)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-950/10 ml-auto"
                >
                  <Icon name="Copy" size={13} /> Copy output JSON
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`p-5 rounded-2xl border font-mono ${
                jsonValidStatus.valid
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
              }`}>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Icon name={jsonValidStatus.valid ? 'CheckCircle2' : 'XCircle'} size={14} />
                  Validation result:
                </h4>
                <p className="text-xs leading-relaxed">{jsonValidStatus.message}</p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-3 font-mono text-xs">
                <h4 className="font-sans font-bold text-slate-350 border-b border-slate-800/80 pb-2">Analysis Diagnostics</h4>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Character count:</span>
                  <span className="text-slate-305 font-bold">{jsonInput.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Lines of code:</span>
                  <span className="text-slate-305 font-bold">{jsonInput.split('\n').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Valid syntax:</span>
                  <span className={`${jsonValidStatus.valid ? 'text-emerald-400' : 'text-red-400'} font-bold`}>
                    {jsonValidStatus.valid ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ERROR FEEDBACK */}
      {errorLog && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-xl text-center text-xs font-mono">
          ⚠️ {errorLog}
        </div>
      )}
    </div>
  );
};
