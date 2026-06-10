import React, { useState, useMemo } from 'react';
import { Icon } from '../Icon';

interface AccountingToolsProps {
  toolId: string;
}

export const AccountingTools: React.FC<AccountingToolsProps> = ({ toolId }) => {
  // Common states or state helpers can be embedded
  switch (toolId) {
    case 'ledger-simulator':
      return <LedgerSimulator />;
    case 'breakeven-calc':
      return <BreakEvenCalc />;
    case 'depreciation-planner':
      return <DepreciationPlanner />;
    case 'tax-estimator':
      return <TaxEstimator />;
    default:
      return (
        <div className="text-center py-12 text-slate-505 font-medium">
          Select an Accounting tool from the Quick-Jump bar above to get started.
        </div>
      );
  }
};

/* ==========================================
   1. DOUBLE-ENTRY LEDGER SIMULATOR
   ========================================== */
interface JournalEntry {
  id: string;
  date: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
}

const LedgerSimulator: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    { id: '1', date: '2026-06-01', description: 'Initial Owner Capital Investment', debitAccount: 'Cash', creditAccount: 'Common Stock', amount: 50000 },
    { id: '2', date: '2026-06-03', description: 'Bought Office Equipment', debitAccount: 'Equipment', creditAccount: 'Cash', amount: 12000 },
    { id: '3', date: '2026-06-05', description: 'Performed Consultancy on Account', debitAccount: 'Accounts Receivable', creditAccount: 'Services Revenue', amount: 8500 },
    { id: '4', date: '2026-06-08', description: 'Paid Office Rent Overhead', debitAccount: 'Rent Expense', creditAccount: 'Cash', amount: 2500 }
  ]);

  const [date, setDate] = useState('2026-06-10');
  const [description, setDescription] = useState('');
  const [debitAccount, setDebitAccount] = useState('Cash');
  const [creditAccount, setCreditAccount] = useState('Services Revenue');
  const [amountInput, setAmountInput] = useState('1500');

  const ACCOUNTS = [
    { name: 'Cash', type: 'Asset' },
    { name: 'Accounts Receivable', type: 'Asset' },
    { name: 'Equipment', type: 'Asset' },
    { name: 'Accounts Payable', type: 'Liability' },
    { name: 'Common Stock', type: 'Equity' },
    { name: 'Services Revenue', type: 'Revenue' },
    { name: 'Rent Expense', type: 'Expense' },
    { name: 'Ad Wages Expense', type: 'Expense' }
  ];

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amountInput);
    if (isNaN(amt) || amt <= 0) return;
    if (debitAccount === creditAccount) {
      alert("Error: Debit and Credit accounts must be different to form a valid double-entry pair.");
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date,
      description: description || 'Journal Transaction Entry',
      debitAccount,
      creditAccount,
      amount: amt
    };

    setEntries(prev => [...prev, newEntry]);
    setDescription('');
    setAmountInput('');
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  // Compute Account T-Balances
  const accountBalances = useMemo(() => {
    const balances: Record<string, number> = {};
    ACCOUNTS.forEach(acc => {
      balances[acc.name] = 0;
    });

    entries.forEach(entry => {
      // Debit rules: Assets & Expenses increase with debit (- for Liabilities, Equity, Revenue)
      const debAccDef = ACCOUNTS.find(a => a.name === entry.debitAccount);
      if (debAccDef) {
        if (debAccDef.type === 'Asset' || debAccDef.type === 'Expense') {
          balances[entry.debitAccount] = (balances[entry.debitAccount] || 0) + entry.amount;
        } else {
          balances[entry.debitAccount] = (balances[entry.debitAccount] || 0) - entry.amount;
        }
      }

      // Credit rules: Liabilities, Equity, Revenue increase with credit (- for Assets & Expenses)
      const credAccDef = ACCOUNTS.find(a => a.name === entry.creditAccount);
      if (credAccDef) {
        if (credAccDef.type === 'Liability' || credAccDef.type === 'Equity' || credAccDef.type === 'Revenue') {
          balances[entry.creditAccount] = (balances[entry.creditAccount] || 0) + entry.amount;
        } else {
          balances[entry.creditAccount] = (balances[entry.creditAccount] || 0) - entry.amount;
        }
      }
    });

    return balances;
  }, [entries]);

  // Aggregate values
  const assetsTotal = (accountBalances['Cash'] || 0) + (accountBalances['Accounts Receivable'] || 0) + (accountBalances['Equipment'] || 0);
  const liabilitiesTotal = accountBalances['Accounts Payable'] || 0;
  const equityTotal = (accountBalances['Common Stock'] || 0) + (accountBalances['Services Revenue'] || 0) - (accountBalances['Rent Expense'] || 0) - (accountBalances['Ad Wages Expense'] || 0);

  const netIncome = (accountBalances['Services Revenue'] || 0) - (accountBalances['Rent Expense'] || 0) - (accountBalances['Ad Wages Expense'] || 0);
  const totalDebitsSum = entries.reduce((acc, current) => acc + current.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 p-4 border border-amber-500/10 rounded-2xl bg-amber-500/[0.02]">
        <div className="text-2xl mt-0.5">💰</div>
        <div>
          <h4 className="text-sm font-extrabold text-indigo-950 dark:text-slate-100">Simulate Real Corporate Double-Entry Ledgers</h4>
          <p className="text-xs text-slate-705 dark:text-slate-400 mt-1">
            Every business transaction requires equal debits and credits. Try adding transactions (e.g., performance of freelance consulting on credit or hiring staff) and see the general ledger and financial statements balance themselves in real-time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ADD TRANSACTION FORM */}
        <div className="lg:col-span-1 p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-905">
          <h3 className="text-sm font-bold tracking-tight text-slate-850 dark:text-slate-100 mb-4 flex items-center gap-1.5 border-b pb-2">
            <Icon name="Plus" size={15} className="text-indigo-600" /> Let's Record a Transaction
          </h3>

          <form onSubmit={handleAddEntry} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Description</label>
              <input
                type="text"
                placeholder="e.g. Completed logo design draft"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-emerald-600 mb-1.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Account Entry to DEBIT (+)
              </label>
              <select
                value={debitAccount}
                onChange={e => setDebitAccount(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border"
              >
                {ACCOUNTS.map(a => (
                  <option key={a.name} value={a.name}>{a.name} ({a.type})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-rose-500 mb-1.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Account Entry to CREDIT (-)
              </label>
              <select
                value={creditAccount}
                onChange={e => setCreditAccount(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border"
              >
                {ACCOUNTS.map(a => (
                  <option key={a.name} value={a.name}>{a.name} ({a.type})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Amount ($)</label>
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="1500"
                value={amountInput}
                onChange={e => setAmountInput(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Icon name="Check" size={13} /> Add Journal Entry
            </button>
          </form>
        </div>

        {/* RECENT JOURNAL ENTRIES TABLE */}
        <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-905 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="text-sm font-bold tracking-tight text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
                <Icon name="Table" size={15} className="text-teal-600" /> General Journal Registry
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-indigo-505/10 text-indigo-700 dark:text-indigo-400 rounded-md">
                Total Balanced Credits: ${totalDebitsSum.toLocaleString()}
              </span>
            </div>

            <div className="overflow-x-auto text-[11px] leading-relaxed max-h-[300px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2 pr-2">Date</th>
                    <th className="py-2 pr-2">Description</th>
                    <th className="py-2 pr-2">Debit Account / Credit Account</th>
                    <th className="py-2 text-right">Debit</th>
                    <th className="py-2 text-right pr-4">Credit</th>
                    <th className="py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 font-sans italic">
                        No transactions registered yet. Use the ledger composer on the left to record debits and credits.
                      </td>
                    </tr>
                  ) : (
                    entries.map(entry => (
                      <React.Fragment key={entry.id}>
                        {/* DEBIT ROW */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                          <td className="py-1.5 font-mono text-slate-550 align-top" rowSpan={2}>{entry.date}</td>
                          <td className="py-1.5 font-medium text-slate-800 dark:text-slate-200 align-top" rowSpan={2}>
                            {entry.description}
                          </td>
                          <td className="py-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            {entry.debitAccount}
                          </td>
                          <td className="py-1 text-right font-mono font-bold text-slate-900 dark:text-slate-100 italic">
                            ${entry.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-1 text-right font-mono text-slate-400">-</td>
                          <td className="py-1.5 text-center align-top" rowSpan={2}>
                            <button
                              onClick={() => handleDeleteEntry(entry.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Delete Transaction Entry"
                            >
                              <Icon name="Trash2" size={13} />
                            </button>
                          </td>
                        </tr>
                        {/* CREDIT ROW */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                          <td className="py-1 pl-4 text-rose-500 dark:text-rose-400 font-bold">
                            {entry.creditAccount}
                          </td>
                          <td className="py-1 text-right font-mono text-slate-400">-</td>
                          <td className="py-1 text-right font-mono font-bold text-slate-900 dark:text-slate-100 italic pr-4">
                            ${entry.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex justify-between select-none">
            <span>💡 *General Rules:* Assets and Expenses increase with Debits. Liabilities, Equities, and Revenues increase with Credits.</span>
          </div>
        </div>
      </div>

      {/* BALANCED SCOREBOARDS & REAL T-ACCOUNTS GENERAL LEDGER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl border bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-emerald-600 dark:text-emerald-400">Total Assets Balance</span>
          <span className="text-2xl font-black font-mono mt-1">${assetsTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          <p className="text-[10px] text-emerald-605 dark:text-emerald-555 mt-2">Cash, Receivables & Equipment cumulative net valuations.</p>
        </div>

        <div className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-300 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-slate-505">Total Liabilities & Equity</span>
          <span className="text-2xl font-black font-mono mt-1">${(liabilitiesTotal + equityTotal).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          <p className="text-[10px] mt-2">
            Is balanced? {Math.abs(assetsTotal - (liabilitiesTotal + equityTotal)) < 0.01 ? (
              <span className="text-emerald-500 font-bold">✔️ YES! Equations Match Perfectly (A = L + OE)</span>
            ) : (
              <span className="text-rose-500 font-bold">❌ Accounts mismatch by ${(assetsTotal - (liabilitiesTotal + equityTotal)).toFixed(2)}</span>
            )}
          </p>
        </div>

        <div className="p-4 rounded-xl border bg-indigo-50 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-400 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-indigo-600 dark:text-indigo-400">Net Business profit/loss</span>
          <span className={`text-2xl font-black font-mono mt-1 ${netIncome >= 0 ? '' : 'text-rose-600'}`}>
            ${netIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <p className="text-[10px] text-indigo-605 dark:text-indigo-555 mt-2">Consultancy Services revenues minus operational lease/wage costs.</p>
        </div>
      </div>

      {/* DETAILED LEDGER STATEMENTS & T-CHARTS ACCORDION PANEL */}
      <div className="p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-905">
        <h3 className="text-sm font-bold tracking-tight text-slate-850 dark:text-slate-100 mb-4 pb-2 border-b flex items-center gap-1.5">
          <Icon name="Database" size={15} className="text-indigo-600" /> General Ledger T-Account Grid
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACCOUNTS.map(acc => {
            const debits = entries.filter(e => e.debitAccount === acc.name);
            const credits = entries.filter(e => e.creditAccount === acc.name);
            const netBalance = accountBalances[acc.name] || 0;

            if (debits.length === 0 && credits.length === 0) return null;

            return (
              <div key={acc.name} className="border rounded-xl text-[11px] p-3 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-950/30">
                <div>
                  <div className="font-bold border-b pb-1 text-slate-850 dark:text-slate-100 text-center uppercase tracking-wide">
                    {acc.name}
                  </div>
                  <div className="grid grid-cols-2 text-center border-b divide-x py-1 font-semibold text-slate-400 text-[10px]">
                    <div>DEBIT</div>
                    <div>CREDIT</div>
                  </div>
                  
                  <div className="grid grid-cols-2 divide-x h-[50px] overflow-y-auto text-center py-1">
                    {/* Left/Debit */}
                    <div className="text-emerald-600">
                      {debits.map(d => (
                        <div key={d.id} className="font-mono">${d.amount.toLocaleString()}</div>
                      ))}
                    </div>
                    {/* Right/Credit */}
                    <div className="text-rose-505 dark:text-rose-400">
                      {credits.map(c => (
                        <div key={c.id} className="font-mono">${c.amount.toLocaleString()}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-1.5 flex justify-between items-center font-bold font-mono text-[10px] mt-2">
                  <span className="text-slate-500">NET VALUE:</span>
                  <span className={netBalance >= 0 ? "text-emerald-605" : "text-rose-505 dark:text-rose-400"}>
                    ${netBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ==========================================
   2. BREAK-EVEN & PROFIT MARGIN CALCULATOR
   ========================================== */
const BreakEvenCalc: React.FC = () => {
  const [fixedCostsInput, setFixedCostsInput] = useState('15000');
  const [sellingPriceInput, setSellingPriceInput] = useState('120');
  const [variableCostInput, setVariableCostInput] = useState('45');
  const [targetQuantityInput, setTargetQuantityInput] = useState('500');

  const fixedCosts = parseFloat(fixedCostsInput) || 0;
  const sellingPrice = parseFloat(sellingPriceInput) || 0;
  const variableCost = parseFloat(variableCostInput) || 0;
  const targetQuantity = parseFloat(targetQuantityInput) || 0;

  // Analysis computations
  const contributionMargin = sellingPrice - variableCost;
  const contributionMarginRatio = sellingPrice > 0 ? (contributionMargin / sellingPrice) * 100 : 0;
  
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * sellingPrice;

  const targetRevenue = targetQuantity * sellingPrice;
  const targetVariableCosts = targetQuantity * variableCost;
  const targetTotalCosts = fixedCosts + targetVariableCosts;
  const targetProfit = targetRevenue - targetTotalCosts;

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 p-4 border border-violet-500/10 rounded-2xl bg-violet-500/[0.02]">
        <div className="text-2xl mt-0.5">📉</div>
        <div>
          <h4 className="text-sm font-extrabold text-indigo-950 dark:text-slate-100">Calculate Unit Economics, Margins & Break-Even Points</h4>
          <p className="text-xs text-slate-705 dark:text-slate-400 mt-1">
            Analyze the relationship between fixed costs, variable manufacturing/service cost, and sales price. Know exactly how many client unit sales you need to stop losing money and start compiling structural profit.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* INPUTS PANEL */}
        <div className="p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-905 space-y-4 text-xs">
          <h3 className="text-sm font-bold tracking-tight text-slate-850 dark:text-slate-100 mb-2 border-b pb-2 flex items-center gap-1.5">
            <Icon name="Sliders" size={15} className="text-indigo-600" /> Fixed & Variable Parameters
          </h3>

          <div>
            <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Monthly Fixed Costs ($)</label>
            <input
              type="number"
              value={fixedCostsInput}
              onChange={e => setFixedCostsInput(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border font-mono"
              placeholder="15000"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Rent, salaries, software, fixed marketing retainers.</span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Selling Price per Unit ($)</label>
            <input
              type="number"
              value={sellingPriceInput}
              onChange={e => setSellingPriceInput(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border font-mono"
              placeholder="120"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Variable Cost per Unit ($)</label>
            <input
              type="number"
              value={variableCostInput}
              onChange={e => setVariableCostInput(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border font-mono"
              placeholder="45"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Fulfillment overhead, packaging, commissions, materials.</span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Target Monthly Sales Volume (Units)</label>
            <input
              type="number"
              value={targetQuantityInput}
              onChange={e => setTargetQuantityInput(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border font-mono"
              placeholder="500"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Your projected or active monthly sales velocity.</span>
          </div>
        </div>

        {/* RESULTS & CALCULATED INSIGHTS */}
        <div className="md:col-span-2 p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-905 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-sm font-bold tracking-tight text-slate-850 dark:text-slate-100 border-b pb-2 flex items-center gap-1.5">
              <Icon name="LineChart" size={15} className="text-emerald-600" /> Unit Profitability Metrics
            </h3>

            {sellingPrice <= variableCost ? (
              <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/[0.02] text-rose-600 text-xs">
                ⚠️ <strong>Negative Unit Contribution Margin:</strong> Your selling price (${sellingPrice}) is less than or equal to your variable costs per unit (${variableCost}). This means every sale increases your losses. You must either raise your selling price or configure ways to reduce variable cost variables.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-450 uppercase tracking-wider block font-bold">Contribution Margin</span>
                  <div className="text-xl font-black font-mono text-emerald-605">
                    ${contributionMargin.toFixed(2)} <span className="text-[10px] font-medium text-slate-400">/ unit</span>
                  </div>
                  <p className="text-[10px] text-slate-500">The money left over from each sale to help cover fixed costs.</p>
                </div>

                <div className="p-4 border rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-450 uppercase tracking-wider block font-bold">Contribution Margin Ratio</span>
                  <div className="text-xl font-black font-mono text-indigo-650">
                    {contributionMarginRatio.toFixed(1)}%
                  </div>
                  <p className="text-[10px] text-slate-500">The portion of selling price that contributes directly to gross margins.</p>
                </div>

                <div className="p-4 border rounded-xl bg-slate-50/55 dark:bg-slate-930 space-y-1">
                  <span className="text-[10px] text-slate-450 uppercase tracking-wider block font-bold">Break-Even Sales Volume</span>
                  <div className="text-xl font-black font-mono text-slate-900 dark:text-slate-100">
                    {breakEvenUnits} <span className="text-[10px] font-medium text-slate-400">Units / mo</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Exactly what is needed to balance business profits and fixed outlays.</p>
                </div>

                <div className="p-4 border rounded-xl bg-slate-50/55 dark:bg-slate-930 space-y-1">
                  <span className="text-[10px] text-slate-450 uppercase tracking-wider block font-bold">Break-Even Sales Revenue</span>
                  <div className="text-xl font-black font-mono text-slate-900 dark:text-slate-100">
                    ${breakEvenRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-[10px] text-slate-500">Gross sales revenues required to cross the break-even zero line.</p>
                </div>
              </div>
            )}

            {/* TARGET VOLUME ANALYSIS */}
            {sellingPrice > variableCost && (
              <div className="p-4 rounded-xl border bg-indigo-50/30 dark:bg-indigo-950/15 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-950 dark:text-indigo-300">Target Volume Analysis ({targetQuantity} Units/mo)</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${targetProfit >= 0 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400" : "bg-rose-100 text-rose-850 dark:bg-rose-955 dark:text-rose-400"}`}>
                    {targetProfit >= 0 ? '✔️ PROFITABLE' : '❌ LOSS-MAKING'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] font-mono">
                  <div className="border border-indigo-200/50 dark:border-indigo-900/40 p-2 rounded-lg bg-white dark:bg-slate-905">
                    <span className="text-slate-450 block text-[9px] font-bold">REVENUE</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">${targetRevenue.toLocaleString()}</span>
                  </div>
                  <div className="border border-indigo-200/50 dark:border-indigo-900/40 p-2 rounded-lg bg-white dark:bg-slate-905">
                    <span className="text-slate-450 block text-[9px] font-bold">VAR. COSTS</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">${targetVariableCosts.toLocaleString()}</span>
                  </div>
                  <div className="border border-indigo-200/50 dark:border-indigo-900/40 p-2 rounded-lg bg-white dark:bg-slate-905">
                    <span className="text-slate-450 block text-[9px] font-bold">FIXED COSTS</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">${fixedCosts.toLocaleString()}</span>
                  </div>
                  <div className="border border-indigo-200/50 dark:border-indigo-900/40 p-2 rounded-lg bg-indigo-600 text-white shadow-md">
                    <span className="text-indigo-200 block text-[9px] font-bold">NET PROFIT</span>
                    <span className="font-bold">${targetProfit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SENSITIVITY SCALE RANGE ESTIMATE */}
      {sellingPrice > variableCost && (
        <div className="p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-905">
          <h3 className="text-sm font-bold tracking-tight text-slate-850 dark:text-slate-100 mb-4 pb-2 border-b flex items-center gap-1.5">
            <Icon name="Table" size={15} className="text-indigo-600" /> Volume Profit Sensitivity Chart
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            {[0.5, 1, 1.5, 2].map(multiplier => {
              const currentVol = Math.ceil(breakEvenUnits * multiplier);
              const currentRev = currentVol * sellingPrice;
              const currentTotalCost = fixedCosts + (currentVol * variableCost);
              const currentProfit = currentRev - currentTotalCost;

              return (
                <div key={multiplier} className={`border p-4 rounded-xl space-y-2 ${multiplier === 1 ? 'ring-2 ring-indigo-550 bg-indigo-500/[0.02]' : 'bg-slate-50/20'}`}>
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-450">{multiplier * 100}% Break-Even</span>
                    <span className="font-mono">{currentVol} Units</span>
                  </div>
                  
                  <div className="space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sales Rev:</span>
                      <span className="text-slate-900 dark:text-slate-200">${currentRev.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Out:</span>
                      <span className="text-slate-900 dark:text-slate-200">${currentTotalCost.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-t pt-1.5 flex justify-between font-bold">
                    <span className="text-slate-455 text-[10px]">Net Income:</span>
                    <span className={currentProfit >= 0 ? 'text-emerald-600' : 'text-rose-605'}>
                      ${currentProfit.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* ==========================================
   3. AESTHETIC ASSET DEPRECIATION PLANNER
   ========================================== */
const DepreciationPlanner: React.FC = () => {
  const [assetCostInput, setAssetCostInput] = useState('25000');
  const [salvageValueInput, setSalvageValueInput] = useState('4000');
  const [usefulLifeInput, setUsefulLifeInput] = useState('5');
  const [method, setMethod] = useState<'SL' | 'DB2' | 'SYD'>('SL');

  const assetCost = parseFloat(assetCostInput) || 0;
  const salvageValue = parseFloat(salvageValueInput) || 0;
  const usefulLife = parseInt(usefulLifeInput) || 1;

  // Depreciation plans calculation
  const schedule = useMemo(() => {
    const list: Array<{ year: number; depExpense: number; accumDep: number; bookValue: number }> = [];
    if (assetCost <= 0 || usefulLife <= 0 || salvageValue > assetCost) return list;

    let bookValue = assetCost;
    let accumDep = 0;

    if (method === 'SL') {
      // Straight-Line depreciation
      const depreciableCost = assetCost - salvageValue;
      const annualDep = depreciableCost / usefulLife;

      for (let i = 1; i <= usefulLife; i++) {
        accumDep += annualDep;
        bookValue -= annualDep;
        list.push({
          year: i,
          depExpense: annualDep,
          accumDep,
          bookValue: Math.max(bookValue, salvageValue)
        });
      }
    } else if (method === 'DB2') {
      // Double Declining balance calculation: 200% acceleration rate
      const dbRate = (2 / usefulLife);
      for (let i = 1; i <= usefulLife; i++) {
        let dbDep = bookValue * dbRate;
        // Limit depreciation so we do not drop below salvage value
        if (bookValue - dbDep < salvageValue) {
          dbDep = bookValue - salvageValue;
        }
        if (i === usefulLife) {
          dbDep = RegExp(/^/).test('') ? 0 : bookValue - salvageValue; // final year clearing balance
        }

        accumDep += dbDep;
        bookValue -= dbDep;
        list.push({
          year: i,
          depExpense: dbDep,
          accumDep,
          bookValue
        });
      }
    } else if (method === 'SYD') {
      // Sum-Of-Years' digits
      const denominator = (usefulLife * (usefulLife + 1)) / 2;
      const depreciableCost = assetCost - salvageValue;

      for (let i = 1; i <= usefulLife; i++) {
        const numerator = usefulLife - i + 1;
        const sydDep = depreciableCost * (numerator / denominator);
        accumDep += sydDep;
        bookValue -= sydDep;
        list.push({
          year: i,
          depExpense: sydDep,
          accumDep,
          bookValue
        });
      }
    }

    return list;
  }, [assetCost, salvageValue, usefulLife, method]);

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 p-4 border border-indigo-500/10 rounded-2xl bg-indigo-500/[0.02]">
        <div className="text-2xl mt-0.5">🗓️</div>
        <div>
          <h4 className="text-sm font-extrabold text-indigo-950 dark:text-slate-100">Plan Asset Depreciation over Useful Lifecycle</h4>
          <p className="text-xs text-slate-705 dark:text-slate-400 mt-1">
            Compare straight-line adjustments, Sum-of-the-Years'-Digits (SYD), or progressive double-declining values. Keep precise commercial spreadsheets mapping equipment wear and business asset write-offs accurately.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* INPUTS AND METRICS CONFIG */}
        <div className="p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-905 space-y-4 text-xs">
          <h3 className="text-sm font-bold tracking-tight text-slate-850 dark:text-slate-100 mb-2 border-b pb-2 flex items-center gap-1.5">
            <Icon name="Sliders" size={15} className="text-indigo-600" /> Asset Parameters
          </h3>

          <div>
            <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Initial Capital Acquisition Cost ($)</label>
            <input
              type="number"
              value={assetCostInput}
              onChange={e => setAssetCostInput(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border font-mono"
              placeholder="25000"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Estimated Salvage/Scrap Value ($)</label>
            <input
              type="number"
              value={salvageValueInput}
              onChange={e => setSalvageValueInput(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border font-mono"
              placeholder="4000"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Useful Life Duration (Years)</label>
            <select
              value={usefulLifeInput}
              onChange={e => setUsefulLifeInput(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border font-mono"
            >
              {[3, 4, 5, 7, 10, 15, 20].map(y => (
                <option key={y} value={y}>{y} Years</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Depreciation Allocation Method</label>
            <div className="space-y-1 mt-1.5">
              {[
                { key: 'SL', label: 'Straight-Line (SL)', note: 'Equal distributions over useful life.' },
                { key: 'DB2', label: '200% Double-Declining (DDB)', note: 'Accelerated, heavier write-offs early.' },
                { key: 'SYD', label: 'Sum-of-the-Years\'-Digits', note: 'Linear declining charge pattern.' }
              ].map(item => (
                <label key={item.key} className="flex items-start gap-2.5 p-2 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer">
                  <input
                    type="radio"
                    name="depMethod"
                    checked={method === item.key}
                    onChange={() => setMethod(item.key as any)}
                    className="mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                    <p className="text-[10px] text-slate-450">{item.note}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS GRID / COMPLETED SCHEDULE REPORT */}
        <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-905 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="text-sm font-bold tracking-tight text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
                <Icon name="Table" size={15} className="text-teal-600" /> Asset Depreciation Schedule Output
              </h3>
              <span className="text-[10px] uppercase font-mono font-bold font-sans">
                Active: {method === 'SL' ? 'Straight Line' : method === 'DB2' ? 'Double Declining' : 'SYD Pattern'}
              </span>
            </div>

            <div className="overflow-x-auto text-[11px] leading-relaxed">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5">Year</th>
                    <th className="py-2.5 text-right">Depreciation Expense</th>
                    <th className="py-2.5 text-right">Accumulated Depreciation</th>
                    <th className="py-2.5 text-right pr-2">Asset Book Value (Ending)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-800 dark:text-slate-200">
                  {schedule.map(row => (
                    <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                      <td className="py-2 font-bold font-sans">Year {row.year}</td>
                      <td className="py-2 text-right font-bold text-rose-506 dark:text-rose-400">
                        ${row.depExpense.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 text-right">
                        ${row.accumDep.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 text-right text-emerald-605 font-bold pr-2">
                        ${row.bookValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t font-sans font-extrabold text-slate-900 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-950/20">
                    <td className="py-2.5">TOTALS</td>
                    <td className="py-2.5 text-right text-rose-600">
                      ${schedule.reduce((acc, r) => acc + r.depExpense, 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 text-right text-slate-400">
                      -
                    </td>
                    <td className="py-2.5 text-right pr-2 text-slate-500 font-mono text-[10px]">
                      Salvage Value reached: ${salvageValue.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10.5px] text-slate-400 leading-relaxed font-sans">
            🚀 <strong>Accountant's Insight:</strong> Depreciation represents the systematic allocation of asset costs. Choosing DDB accelerates your expense claims early, lowering taxable business income in Year 1 and Year 2.
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================
   4. FREELANCE TAX & NET PAY ESTIMATOR
   ========================================== */
const TaxEstimator: React.FC = () => {
  const [grossRevenueInput, setGrossRevenueInput] = useState('75000');
  const [businessExpensesInput, setBusinessExpensesInput] = useState('12000');
  const [taxBracketRateInput, setTaxBracketRateInput] = useState('22');
  const [selfEmploymentRules, setSelfEmploymentRules] = useState(true);

  const grossRevenue = parseFloat(grossRevenueInput) || 0;
  const businessExpenses = parseFloat(businessExpensesInput) || 0;
  const targetRate = parseFloat(taxBracketRateInput) || 0;

  const netFreelanceProfit = grossRevenue - businessExpenses;
  
  // US typical or standard self-employment taxes: 15.3% on 92.35% of self-employment income
  const selfEmploymentTax = selfEmploymentRules && netFreelanceProfit > 0
    ? (netFreelanceProfit * 0.9235 * 0.153)
    : 0;

  // Income Tax calculation
  const totalTaxableFreelanceIncome = netFreelanceProfit > 0
    ? Math.max(0, netFreelanceProfit - (selfEmploymentRules ? (selfEmploymentTax * 0.5) : 0))
    : 0;

  const incomeTaxEstimate = totalTaxableFreelanceIncome * (targetRate / 100);
  const aggregateTaxLiability = selfEmploymentTax + incomeTaxEstimate;
  const netTakeHome = netFreelanceProfit - aggregateTaxLiability;

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 p-4 border border-rose-500/10 rounded-2xl bg-rose-500/[0.02]">
        <div className="text-2xl mt-0.5">📊</div>
        <div>
          <h4 className="text-sm font-extrabold text-indigo-950 dark:text-slate-100">Freelance Net Income & Quarterly Estimated Tax Advisor</h4>
          <p className="text-xs text-slate-705 dark:text-slate-400 mt-1">
            Input absolute revenue, operational assets write-offs, and income tax brackets. Instantly calculate net take-home earnings and self-employment outlays to prepare your yearly or quarterly filings safely.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ESTIMATOR PARAMETERS FORM */}
        <div className="p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-905 space-y-4 text-xs">
          <h3 className="text-sm font-bold tracking-tight text-slate-850 dark:text-slate-100 mb-2 border-b pb-2 flex items-center gap-1.5">
            <Icon name="Sliders" size={15} className="text-indigo-600" /> Tax & Profit Drivers
          </h3>

          <div>
            <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5 font-sans">Gross Freelance/Client Revenues ($/yr)</label>
            <input
              type="number"
              value={grossRevenueInput}
              onChange={e => setGrossRevenueInput(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border font-mono"
              placeholder="75000"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-react-type mb-1.5">Overhead Expenses & Deductions ($/yr)</label>
            <input
              type="number"
              value={businessExpensesInput}
              onChange={e => setBusinessExpensesInput(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border font-mono"
              placeholder="12000"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Hardware, office space, traveling, sub-contractors.</span>
          </div>

          <div>
            <label className="block font-bold text-slate-705 dark:text-slate-300 mb-1.5">Assumed Income Tax Bracket (%)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={taxBracketRateInput}
                onChange={e => setTaxBracketRateInput(e.target.value)}
                className="w-20 text-xs px-3 py-2 rounded-xl border font-mono animate-fade"
                placeholder="22"
              />
              <span className="text-[10px] text-slate-500">Typical values: 12%, 22%, 24%, 32%.</span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={selfEmploymentRules}
                onChange={e => setSelfEmploymentRules(e.target.checked)}
                className="mt-0.5 rounded"
              />
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Include Self-Employment Tax (15.3%)</span>
                <p className="text-[10px] text-slate-450 mt-1">Estimates US Medicare & Social Security allocation adjustments.</p>
              </div>
            </label>
          </div>
        </div>

        {/* DETAILED LEDGER OUTCOME DOCK */}
        <div className="md:col-span-2 p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-905 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-sm font-bold tracking-tight text-slate-850 dark:text-slate-100 border-b pb-2 flex items-center gap-1.5">
              <Icon name="Receipt" size={15} className="text-teal-600" /> Income & Tax Liability Breakout
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl space-y-1 bg-slate-50/40 dark:bg-slate-930">
                <span className="text-[10px] text-slate-450 uppercase tracking-wider block font-bold">Net Freelance Profit</span>
                <div className="text-xl font-black font-mono text-slate-900 dark:text-slate-100">
                  ${netFreelanceProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <p className="text-[10px] text-slate-500">Gross revenue minus valid tax-deductible expenses.</p>
              </div>

              <div className="p-4 border rounded-xl space-y-1 bg-rose-50/20 dark:bg-rose-950/10 border-rose-100">
                <span className="text-[10px] text-slate-455 uppercase tracking-wider block font-bold">Total Estimated Tax Liability</span>
                <div className="text-xl font-black font-mono text-rose-605">
                  ${aggregateTaxLiability.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <p className="text-[10px] text-slate-455">Combining self-employment dues and income taxes.</p>
              </div>
            </div>

            {/* DETAILED ACCORDION TABLE */}
            <div className="border rounded-xl overflow-hidden text-[11px] leading-relaxed">
              <div className="bg-slate-50 dark:bg-slate-950/40 p-3 border-b font-bold tracking-tight text-slate-850 dark:text-slate-200">
                Detailed Calculation Stack
              </div>
              <div className="p-4 space-y-2.5 font-mono text-slate-700 dark:text-slate-300">
                <div className="flex justify-between border-b pb-1">
                  <span>Gross Cash Revenues:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">${grossRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>(-) Business Expense Deductions:</span>
                  <span className="text-rose-600 font-bold">-${businessExpenses.toLocaleString()}</span>
                </div>
                {selfEmploymentRules && (
                  <div className="flex justify-between border-b pb-1">
                    <span>(+) Self-Employment Tax (SE):</span>
                    <span className="text-rose-600 font-bold">-${selfEmploymentTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between border-b pb-1">
                  <span>Assumed Taxable Income:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">${totalTaxableFreelanceIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>(-) Income tax bracket dues ({targetRate}%):</span>
                  <span className="text-rose-600 font-bold">-${incomeTaxEstimate.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* QUARTERLY VOUCHER ADVISORY */}
            <div className="p-4 rounded-xl border bg-emerald-500/5 dark:bg-emerald-500/[0.02] border-emerald-500/10 space-y-2 text-xs">
              <div className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                <Icon name="Sliders" size={14} /> Recommended Quarterly Estimated Payment
              </div>
              <p className="text-slate-650 dark:text-slate-400 text-[11px] leading-relaxed font-sans">
                To prevent underpayment penalties at year-end, the IRS/Tax authorities require paying your taxes in quarterly installments. We recommend submitting <strong>${(aggregateTaxLiability / 4).toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong> on each of the standard dates (April 15, June 15, Sept 15, Jan 15).
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-indigo-600 text-white flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] text-indigo-200 uppercase tracking-widest block font-bold">YEARLY NET TAKE-HOME PAY</span>
              <span className="text-2xl font-black font-mono">${netTakeHome.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="text-right border-l border-white/25 pl-4 select-none">
              <span className="text-[10px] text-indigo-200 block">EST. MONTHLY</span>
              <span className="text-sm font-extrabold font-mono">${(netTakeHome / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
