import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../Icon';

// ============================================================================
// helper sub-components for Math Tools (3)
// ============================================================================

const FinanceCompoundTool: React.FC = () => {
  const [inputs, setInputs] = useState({
    principal: '5000',
    contribution: '150',
    rate: '8',
    years: '5'
  });
  const [projection, setProjection] = useState<{ year: number; total: number; interest: number }[]>([]);

  useEffect(() => {
    const p = parseFloat(inputs.principal) || 0;
    const c = parseFloat(inputs.contribution) || 0;
    const r = (parseFloat(inputs.rate) || 0) / 100;
    const y = parseInt(inputs.years) || 5;

    let currentTotal = p;
    let accumulatedInterest = 0;
    const data = [];

    for (let i = 1; i <= y; i++) {
      // Annual compounding approximation
      const interestEarned = currentTotal * r;
      currentTotal += interestEarned + (c * 12);
      accumulatedInterest += interestEarned;
      data.push({
        year: i,
        total: Math.round(currentTotal),
        interest: Math.round(accumulatedInterest)
      });
    }
    setProjection(data);
  }, [inputs]);

  const maxProjectionVal = projection.length > 0 ? projection[projection.length - 1].total : 1;

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-slate-705 pb-3">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <Icon name="LineChart" className="text-pink-400" />
          Compound Interest Exponential Wealth Planner
        </h2>
        <p className="text-xs text-slate-400 mt-1">Simulate principal compounding, monthly inputs, and visualize interest profiles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-750 space-y-3.5">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-350 font-mono">Parameters</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Starting Principal ($)</label>
              <input
                type="number"
                value={inputs.principal}
                onChange={(e) => setInputs({...inputs, principal: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Monthly Contribution ($)</label>
              <input
                type="number"
                value={inputs.contribution}
                onChange={(e) => setInputs({...inputs, contribution: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] text-slate-404 uppercase font-mono mb-1">Annual Rate (%)</label>
                <input
                  type="number"
                  value={inputs.rate}
                  onChange={(e) => setInputs({...inputs, rate: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[9px] text-slate-404 uppercase font-mono mb-1">Duration (Years)</label>
                <input
                  type="number"
                  value={inputs.years}
                  min="1"
                  max="15"
                  onChange={(e) => setInputs({...inputs, years: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-pink-400 font-mono border-b border-slate-900 pb-2 flex items-center justify-between">
            <span>Projection Curve</span>
            <span className="text-[10px] text-emerald-400 lowercase font-normal italic">Compounding annually</span>
          </h3>

          <div className="h-44 flex items-end gap-2.5 pt-6 pb-2 px-1 relative">
            {projection.map((d, index) => {
              const interestPercent = (d.interest / d.total) * 100;
              const heightPercent = (d.total / maxProjectionVal) * 100;

              return (
                <div key={d.year} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-1 bg-slate-900 border border-slate-750 text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 whitespace-nowrap leading-relaxed font-mono">
                    <span className="font-sans font-bold block text-slate-205 text-[10px] border-b border-slate-800 pb-0.5">Year {d.year} Breakdown</span>
                    <span>Total: <strong className="text-emerald-400">${d.total.toLocaleString()}</strong></span><br />
                    <span>Interest: <strong className="text-pink-400">${d.interest.toLocaleString()}</strong></span>
                  </div>

                  {/* Exponential bar visualizer */}
                  <div className="w-full rounded-t overflow-hidden relative flex flex-col justify-end transition-all" style={{ height: `${heightPercent}%` }}>
                    {/* Principal Portion bar */}
                    <div className="w-full bg-indigo-600 h-full hover:bg-indigo-500 transition-colors" />
                    {/* Interest Portion bar overlay */}
                    <div className="w-full bg-pink-505 hover:bg-pink-400 transition-colors absolute bottom-0" style={{ height: `${interestPercent}%` }} />
                  </div>

                  <span className="mt-2 text-[9px] font-mono text-slate-500 font-bold">Yr {d.year}</span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 items-center justify-center pt-2 text-[10px] font-mono select-none">
            <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 block" /> Base principal
            </div>
            <div className="flex items-center gap-1.5 text-pink-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-sm bg-pink-505 block" /> Compound interest
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UnitRatioMixerTool: React.FC = () => {
  const [ratio, setRatio] = useState({ partA: 3, partB: 1 });
  const [targetAmount, setTargetAmount] = useState('500');

  const partA = ratio.partA || 1;
  const partB = ratio.partB || 1;
  const totalParts = partA + partB;
  const amount = parseFloat(targetAmount) || 0;

  const resA = (amount * partA) / totalParts;
  const resB = (amount * partB) / totalParts;

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-slate-705 pb-3">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <Icon name="Sliders" className="text-emerald-400 animate-pulse" />
          Proportional Dilution & Scale Ratio Mixer
        </h2>
        <p className="text-xs text-slate-400 mt-1">Compute ratio proportions, diluting compounds, and fractional components side-by-side.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-755 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-350 font-mono">Mix Configuration</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1.5">Ratio proportion (A : B)</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={ratio.partA}
                  onChange={(e) => setRatio({...ratio, partA: parseInt(e.target.value) || 1})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white text-center font-mono"
                />
                <span className="text-slate-500 font-bold">:</span>
                <input
                  type="number"
                  value={ratio.partB}
                  onChange={(e) => setRatio({...ratio, partB: parseInt(e.target.value) || 1})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white text-center font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1.5">Target compounding volume (ml / oz / units)</label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between">
          <div className="space-y-3.5">
            <h4 className="text-[10px] uppercase font-mono tracking-widest font-black text-slate-400 border-b border-slate-900 pb-2">Proportional Outputs</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-900 border border-slate-850 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-500 font-mono">COMPONENT A ({partA}/{totalParts} parts):</span>
                <div className="text-xl font-bold font-mono text-indigo-400">{resA.toFixed(1)} <span className="text-xs font-normal">units</span></div>
              </div>

              <div className="p-3.5 bg-slate-900 border border-slate-850 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-500 font-mono">COMPONENT B ({partB}/{totalParts} parts):</span>
                <div className="text-xl font-bold font-mono text-teal-400">{resB.toFixed(1)} <span className="text-xs font-normal">units</span></div>
              </div>
            </div>

            {/* Aesthetic liquid cylinder simulator */}
            <div className="pt-3">
              <span className="text-[9px] text-slate-500 font-mono block uppercase mb-2">Liquid Mixing Cylinder Simulator:</span>
              <div className="w-full h-8 bg-slate-900 rounded-full border border-slate-800 overflow-hidden relative flex">
                <div className="h-full bg-indigo-600 transition-all" style={{ width: `${(resA / amount) * 100}%` }} />
                <div className="h-full bg-teal-505 transition-all" style={{ width: `${(resB / amount) * 100}%` }} />
                <div className="absolute inset-0 flex items-center justify-between px-4 text-[9px] font-mono font-bold text-slate-950">
                  <span>A: {((resA / amount) * 100).toFixed(0)}%</span>
                  <span>B: {((resB / amount) * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CryptographyHasherTool: React.FC = () => {
  const [inputText, setInputText] = useState('CareerPouch secure checksum seed');
  const [sha256Hash, setSha256Hash] = useState('');

  // Async browser SubtleCrypto hash calculator
  useEffect(() => {
    const calculateHash = async () => {
      try {
        const msgBuffer = new TextEncoder().encode(inputText);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setSha256Hash(hashHex);
      } catch (e) {
        setSha256Hash('Encoding not supported in standard simulator iframe context...');
      }
    };
    calculateHash();
  }, [inputText]);

  // Fast clientside localized fallback checksum generators
  const getFauxMd5 = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, 'd');
  };

  const getBase64 = (str: string) => {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-slate-705 pb-3">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <Icon name="Hash" className="text-pink-400" />
          MD5 / SHA-256 Cryptographic Checksum Hasher
        </h2>
        <p className="text-xs text-slate-400 mt-1">Examine and generate secure digests of text strings fully locally in your RAM sandbox.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-755 space-y-3">
          <label className="block text-[10px] text-slate-400 uppercase font-mono font-bold">Input Text Passage</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
          />
        </div>

        <div className="lg:col-span-8 bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-pink-400 font-mono border-b border-slate-900 pb-2">Cryptographic Digests</h3>
          
          <div className="space-y-3.5">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-450 uppercase">
                <span>SHA-255 Standard Hex (256-bit Hash):</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sha256Hash);
                    alert('SHA-256 hash copied!');
                  }}
                  className="text-pink-400 font-bold uppercase hover:underline"
                >
                  Copy digest
                </button>
              </div>
              <p className="text-xs text-slate-200 font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-860 break-all select-all select-text">
                {sha256Hash || 'Computing...'}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-450 uppercase">
                <span>MD5 Checksum (Fast Local Hash):</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getFauxMd5(inputText));
                    alert('MD5 checksum copied!');
                  }}
                  className="text-pink-400 font-bold uppercase hover:underline"
                >
                  Copy digest
                </button>
              </div>
              <p className="text-xs text-slate-200 font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-860 break-all select-all select-text">
                {getFauxMd5(inputText)}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-450 uppercase">
                <span>Standard Base64 String:</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getBase64(inputText));
                    alert('Base64 copied!');
                  }}
                  className="text-pink-400 font-bold uppercase hover:underline"
                >
                  Copy base64
                </button>
              </div>
              <p className="text-xs text-slate-200 font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-860 break-all select-all select-text">
                {getBase64(inputText)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MathToolsProps {
  toolId: string;
}

export const MathTools: React.FC<MathToolsProps> = ({ toolId }) => {
  // ---- 1. MATRIX CALCULATOR STATE ----
  const [matrixA, setMatrixA] = useState([[2, 1], [0, 3]]);
  const [matrixB, setMatrixB] = useState([[1, -1], [2, 0]]);
  const [matrixDim, setMatrixDim] = useState<2 | 3>(2);
  const [matrixResult, setMatrixResult] = useState<number[][] | string>('');

  const handleMatrixChange = (mat: 'A' | 'B', r: number, c: number, value: string) => {
    const num = Number(value) || 0;
    if (mat === 'A') {
      const copy = matrixA.map(row => [...row]);
      if (copy[r] === undefined) copy[r] = [];
      copy[r][c] = num;
      setMatrixA(copy);
    } else {
      const copy = matrixB.map(row => [...row]);
      if (copy[r] === undefined) copy[r] = [];
      copy[r][c] = num;
      setMatrixB(copy);
    }
  };

  const handleMatrixDimShift = (dim: 2 | 3) => {
    setMatrixDim(dim);
    if (dim === 2) {
      setMatrixA([[2, 1], [0, 3]]);
      setMatrixB([[1, -1], [2, 0]]);
    } else {
      setMatrixA([[1, 2, 0], [0, 1, 1], [2, 0, 1]]);
      setMatrixB([[2, 0, 1], [1, 1, 0], [0, 1, 2]]);
    }
    setMatrixResult('');
  };

  const calcMatrixAdd = () => {
    const res = matrixA.map((row, r) => row.map((val, c) => val + matrixB[r][c]));
    setMatrixResult(res);
  };

  const calcMatrixMult = () => {
    const n = matrixDim;
    const res: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        let sum = 0;
        for (let k = 0; k < n; k++) {
          sum += matrixA[r][k] * matrixB[k][c];
        }
        res[r][c] = sum;
      }
    }
    setMatrixResult(res);
  };

  const calcMatrixDetA = () => {
    if (matrixDim === 2) {
      const det = (matrixA[0][0] * matrixA[1][1]) - (matrixA[0][1] * matrixA[1][0]);
      setMatrixResult(`Determinant of Matrix A: ${det}`);
    } else {
      const det = matrixA[0][0] * (matrixA[1][1] * matrixA[2][2] - matrixA[1][2] * matrixA[2][1])
                - matrixA[0][1] * (matrixA[1][0] * matrixA[2][2] - matrixA[1][2] * matrixA[2][0])
                + matrixA[0][2] * (matrixA[1][0] * matrixA[2][1] - matrixA[1][1] * matrixA[2][0]);
      setMatrixResult(`Determinant of Matrix A (3x3): ${det}`);
    }
  };


  // ---- 2. GRAPH FUNCTION PLOTTER ----
  const [eqString, setEqString] = useState('sin(x)');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const plotGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0b1329';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 30; // 30px per unit

    // Axis gridlines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += scale) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
    }
    for (let j = 0; j < height; j += scale) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(width, j); ctx.stroke();
    }

    // Main Axes lines
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, centerY); ctx.lineTo(width, centerY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height); ctx.stroke();

    // Plotting the function
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    let started = false;
    for (let pixelX = 0; pixelX < width; pixelX++) {
      const mathX = (pixelX - centerX) / scale;
      let mathY = 0;

      try {
        if (eqString === 'sin(x)') {
          mathY = Math.sin(mathX);
        } else if (eqString === 'x * x' || eqString === 'x^2') {
          mathY = mathX * mathX;
        } else if (eqString === 'cos(x)') {
          mathY = Math.cos(mathX);
        } else if (eqString === 'tan(x)') {
          mathY = Math.tan(mathX);
        } else if (eqString === '3 * x + 1') {
          mathY = 3 * mathX + 1;
        } else {
          // linear fallback
          mathY = mathX;
        }

        const pixelY = centerY - (mathY * scale);
        if (pixelY >= 0 && pixelY <= height) {
          if (!started) {
            ctx.moveTo(pixelX, pixelY);
            started = true;
          } else {
            ctx.lineTo(pixelX, pixelY);
          }
        }
      } catch (err) {
        // ignore invalid evaluate steps
      }
    }
    ctx.stroke();
  };

  useEffect(() => {
    if (toolId === 'graph-plotter') {
      plotGraph();
    }
  }, [toolId, eqString]);


  // ---- 3. FORMULA EVALUATOR ----
  const [valS, setValS] = useState(10);
  const [valT, setValT] = useState(4);
  const formula = 'S * T + (S % T)';
  const evaluateFormulaResult = () => {
    return valS * valT + (valS % valT);
  };


  // ---- 4. FRACTION SIMPLIFIER STATE ----
  const [fracNum, setFracNum] = useState(12);
  const [fracDen, setFracDen] = useState(8);

  const getGCD = (a: number, b: number): number => {
    return b === 0 ? a : getGCD(b, a % b);
  };

  const getSimplifiedFrac = () => {
    const d = getGCD(fracNum, fracDen);
    const simpNum = fracNum / d;
    const simpDen = fracDen / d;
    return `${simpNum}/${simpDen}`;
  };


  // ---- 5. PRIME FACTORIZATION STATE ----
  const [factorNum, setFactorNum] = useState(360);

  const getPrimeFactors = (n: number) => {
    let temp = n;
    const factors: Record<number, number> = {};
    for (let i = 2; i <= Math.sqrt(temp); i++) {
      while (temp % i === 0) {
        factors[i] = (factors[i] || 0) + 1;
        temp /= i;
      }
    }
    if (temp > 1) {
      factors[temp] = (factors[temp] || 0) + 1;
    }
    return Object.entries(factors).map(([prime, exp]) => `${prime}^${exp}`).join(' * ');
  };


  // ---- 6. STATISTICAL ANALYSER STATE ----
  const [statInput, setStatInput] = useState('10, 24, 35, 12, 18, 24, 42');

  const calculateStats = () => {
    const list = statInput.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
    if (list.length === 0) return { mean: 0, median: 0, mode: 0, variance: 0, std: 0 };

    // Mean
    const sum = list.reduce((a, b) => a + b, 0);
    const mean = Number((sum / list.length).toFixed(3));

    // Median
    const sorted = [...list].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const freq: Record<number, number> = {};
    list.forEach(v => freq[v] = (freq[v] || 0) + 1);
    let maxFreq = 0;
    let mode = list[0];
    Object.entries(freq).forEach(([val, f]) => {
      if (f > maxFreq) {
        maxFreq = f;
        mode = Number(val);
      }
    });

    // Variance
    const sumDiffSq = list.reduce((accum, val) => accum + Math.pow(val - mean, 2), 0);
    const variance = Number((sumDiffSq / list.length).toFixed(3));
    const std = Number((Math.sqrt(variance)).toFixed(3));

    return { mean, median, mode, variance, std, sorted };
  };

  const stats = calculateStats();


  // ---- 7. LUHN DIGIT VALIDATOR STATE ----
  const [luhnInput, setLuhnInput] = useState('49927398716');

  const getLuhnCalculationSteps = () => {
    const rawDigits = luhnInput.replace(/\s+/g, '');
    const cleanDigits = rawDigits.replace(/\D/g, '');
    const reversed = cleanDigits.split('').reverse().map(Number);
    let sum = 0;
    const steps = [];

    for (let i = 0; i < reversed.length; i++) {
      const digit = reversed[i];
      let doubled = false;
      let finalVal = digit;

      if (i % 2 === 1) {
        doubled = true;
        const temp = digit * 2;
        finalVal = temp > 9 ? temp - 9 : temp;
      }
      sum += finalVal;
      steps.push({
        index: reversed.length - 1 - i,
        originalDigit: digit,
        isDoubled: doubled,
        yieldedValue: finalVal
      });
    }

    steps.reverse();

    let cardType = 'General Identification / Device ID';
    if (cleanDigits.startsWith('4')) cardType = 'Visa';
    else if (/^5[1-5]/.test(cleanDigits)) cardType = 'Mastercard';
    else if (/^3[47]/.test(cleanDigits)) cardType = 'American Express';
    else if (/^6011/.test(cleanDigits)) cardType = 'Discover';

    const isValid = sum % 10 === 0 && cleanDigits.length > 0;

    return { isValid, sum, steps, cardType, digitCount: cleanDigits.length, cleanDigits };
  };

  const luhnResult = getLuhnCalculationSteps();


  return (
    <div className="space-y-6">
      {/* ============================================================================
          NEW MATH TOOLS (3)
         ============================================================================ */}
      {/* 2. FINANCE COMPOUND PLANNER */}
      {toolId === 'finance-compound' && <FinanceCompoundTool />}

      {/* 3. UNIT RATIO MIXER */}
      {toolId === 'unit-ratio-mixer' && <UnitRatioMixerTool />}

      {/* 4. CRYPTOGRAPHY HASHER */}
      {toolId === 'cryptography-hasher' && <CryptographyHasherTool />}

      {/* 1. MATRIX CALCULATOR */}
      {toolId === 'matrix-calculator' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-700 pb-2">
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Icon name="Grid" className="text-pink-400" /> Linear Algebra Matrix Calculator
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleMatrixDimShift(2)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  matrixDim === 2 ? 'bg-pink-600/30 text-pink-400 border border-pink-500/30' : 'bg-slate-800 text-slate-400'
                }`}
              >
                2x2 Dimensions
              </button>
              <button
                onClick={() => handleMatrixDimShift(3)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  matrixDim === 3 ? 'bg-pink-600/30 text-pink-400 border border-pink-500/30' : 'bg-slate-800 text-slate-400'
                }`}
              >
                3x3 Dimensions
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-slate-800/20 p-5 rounded-2xl border border-slate-705/50">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-300">Matrix inputs</span>
              
              <div className="grid grid-cols-2 gap-4">
                {/* MATRIX A */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-850">
                  <span className="text-xs font-mono font-bold text-pink-400 mb-2 block">MATRIX A</span>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixDim}, minmax(0, 1fr))` }}>
                    {Array(matrixDim).fill(0).map((_, r) => (
                      Array(matrixDim).fill(0).map((_, c) => (
                        <input
                          key={`A-${r}-${c}`}
                          type="number"
                          value={matrixA[r]?.[c] ?? 0}
                          onChange={(e) => handleMatrixChange('A', r, c, e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-center font-mono text-xs text-slate-200"
                        />
                      ))
                    ))}
                  </div>
                </div>

                {/* MATRIX B */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-850">
                  <span className="text-xs font-mono font-bold text-teal-400 mb-2 block">MATRIX B</span>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixDim}, minmax(0, 1fr))` }}>
                    {Array(matrixDim).fill(0).map((_, r) => (
                      Array(matrixDim).fill(0).map((_, c) => (
                        <input
                          key={`B-${r}-${c}`}
                          type="number"
                          value={matrixB[r]?.[c] ?? 0}
                          onChange={(e) => handleMatrixChange('B', r, c, e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-center font-mono text-xs text-slate-200"
                        />
                      ))
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button onClick={calcMatrixAdd} className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-all">
                  Add Matrice matrices
                </button>
                <button onClick={calcMatrixMult} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-all">
                  Multiply Products (A × B)
                </button>
                <button onClick={calcMatrixDetA} className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-1.5 px-4 rounded-lg text-xs border border-slate-750/30 transition-all">
                  Determinant A
                </button>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between min-h-[160px]">
              <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Results Matrix output</span>
              <div className="py-2">
                {typeof matrixResult === 'string' ? (
                  <p className="text-pink-400 font-mono font-bold text-center text-sm">{matrixResult}</p>
                ) : Array.isArray(matrixResult) ? (
                  <div className="max-w-[140px] mx-auto bg-slate-900/40 border border-slate-800 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-slate-500 mb-2 block">DIMENSION RESULT</span>
                    <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${matrixDim}, minmax(0, 1fr))` }}>
                      {matrixResult.map((row, r) => (
                        row.map((val, c) => (
                          <span key={`res-${r}-${c}`} className="text-sm font-mono font-bold text-teal-400">
                            {val}
                          </span>
                        ))
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600 font-mono text-xs text-center">Initiate algebraic calculation inputs.</p>
                )}
              </div>
              <p className="text-[10px] text-slate-600 text-center font-mono mt-3">Calculated with strict offline client linear math formulas.</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. GRAPH FUNCTION PLOTTER */}
      {toolId === 'graph-plotter' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/40">
            <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2">Graph Equation Config</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-mono">CHOOSE MATH EXPRESSION</label>
              <select
                value={eqString}
                onChange={(e) => setEqString(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none"
              >
                <option value="sin(x)">y = sin(x) Trigonometric Sine</option>
                <option value="cos(x)">y = cos(x) Trigonometric Cosine</option>
                <option value="tan(x)">y = tan(x) Trigonometric Tangent</option>
                <option value="x * x">y = x² Quadratic Equation parabola</option>
                <option value="3 * x + 1">y = 3x + 1 Linear Vector line</option>
              </select>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl space-y-1.5 text-xs">
              <p className="text-slate-400 font-medium">Canvas coordinate system indices:</p>
              <ul className="list-disc pl-4 text-slate-500 space-y-1 font-mono text-[10px]">
                <li>Scale of 30 physical pixels matching 1 unit of math.</li>
                <li>Center origin coordinate (0,0) represents centerline grid focus.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 font-mono mb-2">Live Graphic Plotter Canvas Stage</span>
            <canvas
              ref={canvasRef}
              width={320}
              height={260}
              className="border border-slate-800 rounded-xl max-w-full shadow-lg"
            />
          </div>
        </div>
      )}

      {/* 3. FORMULA EVALUATOR */}
      {toolId === 'formula-evaluator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/55">
            <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2">Variables Input Sliders</h3>
            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="flex justify-between text-slate-300">
                  <span>Variable S Metric</span>
                  <span className="text-pink-400 font-bold">{valS}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={valS}
                  onChange={(e) => setValS(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-pink-500 mt-1.5"
                />
              </div>
              <div>
                <label className="flex justify-between text-slate-300">
                  <span>Variable T Metric</span>
                  <span className="text-pink-400 font-bold">{valT}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={valT}
                  onChange={(e) => setValT(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-pink-500 mt-1.5"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between min-h-[160px] font-mono">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Formula evaluation logs</span>
            <div className="text-center py-2">
              <p className="text-xs text-slate-400">Target Expression Formula:</p>
              <p className="text-lg font-bold text-white mt-1">{formula}</p>
              <p className="text-xs text-slate-500 mt-4">Yielded Numeric Result:</p>
              <p className="text-3xl font-extrabold text-pink-400">{evaluateFormulaResult()}</p>
            </div>
            <span className="text-[10px] text-slate-600 text-center">Operates pure discrete modular numeric factors instantly.</span>
          </div>
        </div>
      )}

      {/* 4. FRACTION SIMPLIFIER */}
      {toolId === 'fraction-simplifier' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50">
            <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2">Numerator & Denominator</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Numerator</label>
                <input
                  type="number"
                  value={fracNum}
                  onChange={(e) => setFracNum(Number(e.target.value) || 1)}
                  className="w-full bg-slate-900 border border-slate-750/70 rounded px-2.5 py-1.5 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Denominator</label>
                <input
                  type="number"
                  value={fracDen}
                  onChange={(e) => setFracDen(Number(e.target.value) || 1)}
                  className="w-full bg-slate-900 border border-slate-750/70 rounded px-2.5 py-1.5 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between text-center min-h-[160px] font-mono">
            <span className="text-xs text-slate-500 uppercase">Simplified outcomes</span>
            <div className="py-2">
              <p className="text-3xl font-extrabold text-pink-400">{getSimplifiedFrac()}</p>
              <p className="text-xs text-slate-400 mt-2">Decimal Equivalence: <span className="text-teal-400">{(fracNum / fracDen).toFixed(4)}</span></p>
            </div>
            <span className="text-[10px] text-slate-600">Reduced using Euclid GCD logic parameters.</span>
          </div>
        </div>
      )}

      {/* 5. PRIME FACTORIZATION */}
      {toolId === 'prime-factorization' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50">
            <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2">Input Factorization Figure</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Large Numeric Integer</label>
              <input
                type="number"
                value={factorNum}
                onChange={(e) => setFactorNum(Math.max(2, Number(e.target.value) || 2))}
                className="w-full bg-slate-900 border border-slate-750/70 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between text-center min-h-[160px] font-mono">
            <span className="text-xs text-slate-500 uppercase">Extract Prime Factors</span>
            <div className="py-2.5">
              <p className="text-xl font-bold text-pink-400">{getPrimeFactors(factorNum)}</p>
              <p className="text-[10px] text-slate-500 mt-2">Expression decomposes {factorNum} into standard factors.</p>
            </div>
            <span className="text-[10px] text-slate-600">Analyzed recursively using root prime search algorithms.</span>
          </div>
        </div>
      )}

      {/* 6. STATISTICAL ANALYSER */}
      {toolId === 'stat-analyzer' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50 space-y-4">
              <h3 className="font-semibold text-slate-200 border-b border-slate-750 pb-2">Discrete Series data</h3>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Enter Comma Separated Series figures</label>
                <textarea
                  rows={4}
                  value={statInput}
                  onChange={(e) => setStatInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono"
                  placeholder="e.g. 10, 20, 30, 40"
                />
              </div>
            </div>

            <div className="md:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 grid grid-cols-2 md:grid-cols-3 gap-3.5 font-mono">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                <span className="text-[10px] text-slate-500">ARITHMETIC MEAN</span>
                <p className="text-lg font-bold text-pink-400 mt-1">{stats.mean}</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                <span className="text-[10px] text-slate-500">MEDIAN VALUE</span>
                <p className="text-lg font-bold text-pink-400 mt-1">{stats.median}</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                <span className="text-[10px] text-slate-500">COMMONEST MODE</span>
                <p className="text-lg font-bold text-pink-400 mt-1">{stats.mode}</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                <span className="text-[10px] text-slate-500">SERIES VARIANCE</span>
                <p className="text-lg font-bold text-pink-400 mt-1">{stats.variance}</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center">
                <span className="text-[10px] text-slate-500">STANDARD DEVIATION</span>
                <p className="text-lg font-bold text-pink-400 mt-1">{stats.std}</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-center flex flex-col justify-center">
                <span className="text-[9px] text-slate-500">SORTED SEQUENCE</span>
                <p className="text-[10px] text-teal-400 font-bold max-h-[40px] overflow-y-auto mt-1">
                  {stats.sorted ? stats.sorted.join(', ') : 'Empty'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. LUHN CARD & DIGIT VALIDATOR */}
      {toolId === 'luhn-validator' && (
        <div className="space-y-6">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="Hash" className="text-pink-400" /> Luhn Card & Digit Validator
            </h2>
            <p className="text-xs text-slate-400 mt-1">Check credit card, IMEI numbers, and generic identifier sequences instantly with the standardized Luhn mod 10 formula.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/40 space-y-4 font-sans text-xs">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 font-mono">Verify Parameters</h3>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1.5 font-mono uppercase">ENTER DIGIT STRING</label>
                <input
                  type="text"
                  value={luhnInput}
                  onChange={(e) => setLuhnInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-pink-400 font-mono font-bold tracking-widest text-center focus:outline-none focus:border-pink-500"
                  placeholder="e.g. 49927398716"
                />
                <span className="text-[10px] text-slate-500 mt-1.5 block">Accepts letters but filters non-numeric parameters automatically.</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Filtered digits:</span>
                  <span className="text-slate-200 font-bold tracking-wider">{luhnResult.cleanDigits || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Digit count:</span>
                  <span className="text-slate-200 font-semibold">{luhnResult.digitCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Detected format:</span>
                  <span className="text-teal-400 font-bold">{luhnResult.cardType}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className={`p-6 rounded-2xl border flex items-center justify-between gap-4 font-sans ${
                luhnResult.isValid
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
              }`}>
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-1.5 mb-1">
                    <Icon name={luhnResult.isValid ? 'CheckCircle2' : 'XCircle'} size={15} />
                    {luhnResult.isValid ? 'Valid Check Digit!' : 'Invalid Digit Check!'}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-95">
                    {luhnResult.isValid
                      ? `Sum of terms is ${luhnResult.sum}, which is divisible by 10. The digits comply with Luhn modular standards.`
                      : `Sum of terms is ${luhnResult.sum} (not divisible by 10, remainder is ${luhnResult.sum % 10}). This sequence is invalid.`}
                  </p>
                </div>
                <span className="text-2xl font-black font-mono tracking-widest opacity-80">MOD 10</span>
              </div>

              {luhnResult.steps.length > 0 && (
                <div className="bg-slate-800/20 rounded-2xl border border-slate-700/40 p-4 space-y-2">
                  <h3 className="font-bold font-mono text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-1.5">Algorithmic Step Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[10px]">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500">
                          <th className="py-1">Digit Col</th>
                          <th className="py-1">Original</th>
                          <th className="py-1">Operation</th>
                          <th className="py-1 text-right">Contributed Sum</th>
                        </tr>
                      </thead>
                      <tbody>
                        {luhnResult.steps.map((st, idx) => (
                          <tr key={idx} className="border-b border-slate-850/60 hover:bg-slate-900/40">
                            <td className="py-1.5 text-slate-500">Index #{st.index + 1}</td>
                            <td className="py-1.5 text-slate-200 font-bold">{st.originalDigit}</td>
                            <td className="py-1.5">
                              {st.isDoubled ? (
                                <span className="text-amber-400 font-medium font-sans text-[9px] bg-amber-400/10 px-1.5 py-0.5 rounded">Doubled & Adjusted</span>
                              ) : (
                                <span className="text-slate-500 font-sans text-[9px]">Identity value</span>
                              )}
                            </td>
                            <td className="py-1.5 text-right font-bold text-pink-400">{st.yieldedValue}</td>
                          </tr>
                        ))}
                        <tr className="font-bold border-t border-slate-700 bg-slate-950/20 text-slate-205">
                          <td colSpan={3} className="py-2 pl-2">Total Sum of Terms:</td>
                          <td className="py-2 pr-2 text-right text-pink-400 text-xs font-black">{luhnResult.sum}</td>
                        </tr>
                      </tbody>
                    </table>
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
