import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../Icon';

// ============================================================================
// helper sub-components for Productivity Tools (4)
// ============================================================================

const MeetingAgendaTool: React.FC = () => {
  const [sessionType, setSessionType] = useState('Weekly Team Sync');
  const [items, setItems] = useState([
    { id: '1', duration: 10, topic: 'Kickoff & Icebreaker Metrics', owner: 'Management' },
    { id: '2', duration: 15, topic: 'Critical Technical Refactors Recap', owner: 'Engineering' },
    { id: '3', duration: 20, topic: 'Product Priorities & Roadmaps Align', owner: 'Product Admin' },
    { id: '4', duration: 15, topic: 'Risk Mitigation Blocked Discussion', owner: 'QA Lead' }
  ]);
  const [newItem, setNewItem] = useState({ duration: 10, topic: '', owner: '' });

  const totalDuration = items.reduce((sum, item) => sum + item.duration, 0);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.topic.trim()) return;
    setItems([...items, { ...newItem, id: Date.now().toString() }]);
    setNewItem({ duration: 10, topic: '', owner: '' });
  };

  const handleCopyAgenda = () => {
    const txt = `📅 MEETING AGENDA: ${sessionType}\n⏱️ Total Duration: ${totalDuration} minutes\n\n` + 
      items.map((item, idx) => `[${idx + 1}] (${item.duration}m) ${item.topic} - Owner: ${item.owner || 'All'}`).join('\n');
    navigator.clipboard.writeText(txt);
    alert('Agenda copied to clipboard!');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-slate-700/60 pb-3 flex justify-between items-center flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <Icon name="ListChecks" className="text-indigo-400" />
            Meeting Agenda Architect
          </h2>
          <p className="text-xs text-slate-400 mt-1">Design balanced business sync models with precise allocation structures.</p>
        </div>
        <button
          onClick={handleCopyAgenda}
          className="bg-indigo-650 hover:bg-indigo-600 text-white font-bold py-1.5 px-3.5 rounded-lg text-xs transition-colors flex items-center gap-1.5"
        >
          <Icon name="Copy" size={13} /> Copy Agenda
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-800/40 p-5 rounded-2xl border border-slate-750 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-350 font-mono">Create Agenda Segment</h3>
          
          <form onSubmit={handleAddItem} className="space-y-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Session Headline</label>
              <input
                type="text"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Topic Details</label>
              <input
                type="text"
                value={newItem.topic}
                onChange={(e) => setNewItem({...newItem, topic: e.target.value})}
                placeholder="e.g. Q3 Pipeline Review"
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] text-slate-404 uppercase font-mono mb-1">Duration (Min)</label>
                <input
                  type="number"
                  value={newItem.duration}
                  onChange={(e) => setNewItem({...newItem, duration: parseInt(e.target.value) || 5})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[9px] text-slate-404 uppercase font-mono mb-1">Topic Owner</label>
                <input
                  type="text"
                  value={newItem.owner}
                  onChange={(e) => setNewItem({...newItem, owner: e.target.value})}
                  placeholder="e.g. Sarah J."
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-xl transition-all">
              Add Segment block
            </button>
          </form>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850/60 flex justify-between text-xs font-mono">
            <span className="text-slate-400">TOTAL ESTIMATED TIME:</span>
            <span className="text-emerald-400 font-extrabold">{totalDuration} minutes</span>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-400 font-mono border-b border-slate-900 pb-2">Timeline Progression</h3>
          
          <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-950">
            {items.map((item, idx) => {
              const colors = ['border-blue-500 text-blue-400', 'border-indigo-500 text-indigo-400', 'border-teal-500 text-teal-400', 'border-yellow-500 text-yellow-400'];
              const col = colors[idx % colors.length];

              return (
                <div key={item.id} className="relative pl-8 flex items-start justify-between group">
                  <div className={`absolute left-2.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 ${col.split(' ')[0]} z-10`} />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">{item.topic}</h4>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">
                      Owner: {item.owner || 'Unassigned'} • Allocate: {item.duration}m
                    </span>
                  </div>
                  <button
                    onClick={() => setItems(items.filter(i => i.id !== item.id))}
                    className="p-1 rounded text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <Icon name="X" size={11} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectTimelineTool: React.FC = () => {
  const [milestones, setMilestones] = useState([
    { id: '1', name: 'Scoping & Strategy Specs', start: 1, duration: 2, status: 'Completed' },
    { id: '2', name: 'Figma Layout Design Wireframes', start: 3, duration: 2, status: 'In Progress' },
    { id: '3', name: 'Core Engine Coding & Integration', start: 5, duration: 3, status: 'Todo' },
    { id: '4', name: 'Alpha Audits & Stakeholders Deploy', start: 8, duration: 1, status: 'Todo' }
  ]);
  const [newMS, setNewMS] = useState({ name: '', start: 1, duration: 2, status: 'Todo' });

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMS.name.trim()) return;
    setMilestones([...milestones, { ...newMS, id: Date.now().toString() }]);
    setNewMS({ name: '', start: 1, duration: 2, status: 'Todo' });
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-slate-700/60 pb-3">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <Icon name="Activity" className="text-teal-400" />
          Project Milestone Gantt Chart Visualizer
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-sans">Plot project blocks on an instant linear timeline layout securely.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-750 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-350 font-mono">Create Milestone</h3>
          
          <form onSubmit={handleAddMilestone} className="space-y-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Milestone Name</label>
              <input
                type="text"
                value={newMS.name}
                onChange={(e) => setNewMS({...newMS, name: e.target.value})}
                placeholder="e.g. Database Migrations"
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] text-slate-404 uppercase font-mono mb-1">Start Week</label>
                <input
                  type="number"
                  value={newMS.start}
                  onChange={(e) => setNewMS({...newMS, start: parseInt(e.target.value) || 1})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[9px] text-slate-404 uppercase font-mono mb-1">Duration (Wks)</label>
                <input
                  type="number"
                  value={newMS.duration}
                  onChange={(e) => setNewMS({...newMS, duration: parseInt(e.target.value) || 1})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1 font-bold">Status State</label>
              <select
                value={newMS.status}
                onChange={(e) => setNewMS({...newMS, status: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold py-2 rounded-xl transition-all">
              Add Block to Chart
            </button>
          </form>
        </div>

        <div className="lg:col-span-8 bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-teal-400 font-mono border-b border-slate-900 pb-2">Linear Progress Board (Weeks 1 to 10)</h3>
          
          <div className="space-y-4">
            {milestones.map((ms) => {
              const statusCol = ms.status === 'Completed' ? 'bg-emerald-500/25 border-emerald-500 text-emerald-400' : ms.status === 'In Progress' ? 'bg-indigo-500/25 border-indigo-500 text-indigo-400' : 'bg-slate-800/50 border-slate-700 text-slate-400';
              return (
                <div key={ms.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-200">{ms.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider border font-mono ${statusCol}`}>
                        {ms.status}
                      </span>
                      <button
                        onClick={() => setMilestones(milestones.filter(m => m.id !== ms.id))}
                        className="text-slate-500 hover:text-red-500"
                        title="Delete milestone"
                      >
                        <Icon name="X" size={10} />
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-5 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 relative flex leading-none">
                    {/* Grid Week Guide Lines */}
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex-1 border-r border-slate-850/60 last:border-0 h-full" />
                    ))}
                    {/* Timeline Block Overlay */}
                    <div
                      className="absolute top-1 bottom-1 bg-gradient-to-r from-teal-500 to-indigo-505 rounded shadow-sm flex items-center justify-center text-[8px] font-mono font-black text-slate-950 uppercase selection:bg-none pointer-events-none"
                      style={{
                        left: `${((ms.start - 1) / 10) * 100}%`,
                        width: `${(ms.duration / 10) * 100}%`
                      }}
                    >
                      Wk {ms.start}-{ms.start + ms.duration - 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const DailyStandupTool: React.FC = () => {
  const [standup, setStandup] = useState({
    yesterday: 'Completed coding the JWT authentication controllers and finalized route schemas.',
    today: 'Integrating custom Adsterra native widgets and drafting initial test coverages.',
    blockers: 'None so far. Awaiting legal API tokens to process actual transaction lists.'
  });

  const getStandupText = () => {
    return `📝 DAILY STANDUP UPDATE\n\n🟢 YESTERDAY:\n- ${standup.yesterday}\n\n🔵 TODAY:\n- ${standup.today}\n\n🛑 BLOCKERS:\n- ${standup.blockers}`;
  };

  const handleCopyStandup = () => {
    navigator.clipboard.writeText(getStandupText());
    alert('Standup text copied to Clipboard (Slack & Teams formatted)!');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-slate-700/60 pb-3 flex justify-between items-center flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <Icon name="CheckSquare" className="text-indigo-400" />
            Daily Standup Update Composer
          </h2>
          <p className="text-sm text-slate-400 mt-1">Pre-compile structured updates for teammates smoothly.</p>
        </div>
        <button
          onClick={handleCopyStandup}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-3.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-md"
        >
          <Icon name="Copy" size={13} /> Copy Slack Format
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-755 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-350 font-mono">Work Items Inputs</h3>
          
          <div className="space-y-3.5">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1 text-emerald-400">🟢 What I did Yesterday</label>
              <textarea
                value={standup.yesterday}
                onChange={(e) => setStandup({...standup, yesterday: e.target.value})}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1 text-blue-400">🔵 What I am doing Today</label>
              <textarea
                value={standup.today}
                onChange={(e) => setStandup({...standup, today: e.target.value})}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1 text-rose-450">🛑 Blockers / Obstacles</label>
              <textarea
                value={standup.blockers}
                onChange={(e) => setStandup({...standup, blockers: e.target.value})}
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-mono tracking-widest font-black text-slate-400 border-b border-slate-900 pb-2">Slack-Ready Markdown Output</h4>
            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed select-text select-all bg-slate-900/30 p-4 rounded-xl border border-slate-902">
              {getStandupText()}
            </pre>
          </div>
          <span className="text-[9px] font-mono text-slate-505 block mt-3">💡 Tip: Succinct standalone items make Standups 80% faster.</span>
        </div>
      </div>
    </div>
  );
};

const AiWeeklyReportTool: React.FC = () => {
  const [bulletsInput, setBulletsInput] = useState(`- completed 3 layout updates
- refactored the database schema for the user tracker
- resolved a heavy loading memory leak in index file
- met with Sarah to align on Q3 launch coordinates`);
  
  const [weeklyReport, setWeeklyReport] = useState<{ summary: string; bullets: string[] } | null>(null);

  const simulateAiWeeklyAnalysis = () => {
    if (!bulletsInput.trim()) {
      alert('Please key in daily notes beforehand.');
      return;
    }
    
    const lines = bulletsInput.split('\n').map(l => l.replace(/^-\s*/, '').trim()).filter(Boolean);
    const summary = `During this operating sprint, we systematically finalized critical layouts milestones, resolved relational data memory blocks, and streamlined client-facing operational schemas. Collaboration structures were proactively consolidated across cross-functional partners to preserve release timelines.`;
    
    const bullets = lines.map(line => {
      // Elevate text to corporate-speak templates
      if (line.includes('layout')) return `Designed, tested, and shipped high-contrast visual layout improvements following modern responsive guidelines.`;
      if (line.includes('database') || line.includes('schema')) return `Architected robust transactional relational schema updates to maximize long-term database integrity.`;
      if (line.includes('leak') || line.includes('loading')) return `Eradicated site memory performance bottlenecks, lowering cumulative client layout delays by 18%.`;
      if (line.includes('Sarah') || line.includes('meet')) return `Consolidated executive strategic objectives and cross-functional expectations with core team leads.`;
      return `Executed target task: "${line}" and aligned deliverables to support core timeline integrity.`;
    });

    setWeeklyReport({ summary, bullets });
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-slate-700/60 pb-3 flex justify-between items-center flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <Icon name="Sparkles" className="text-indigo-400 animate-pulse" />
            AI Executive Work Log Weekly Summarizer
          </h2>
          <p className="text-sm text-slate-400 mt-1">Convert raw daily notes into professional summaries tailored for stakeholders.</p>
        </div>
        <button
          onClick={simulateAiWeeklyAnalysis}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1.5 px-3.5 rounded-lg text-xs transition-transform flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Icon name="RefreshCw" size={13} className="animate-spin" /> Summarize Notes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-800/40 p-5 rounded-2xl border border-slate-755 space-y-3">
          <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1 font-bold">Raw Daily Notes (One item per line)</label>
          <textarea
            value={bulletsInput}
            onChange={(e) => setBulletsInput(e.target.value)}
            rows={10}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono leading-relaxed outline-none focus:border-indigo-500"
            placeholder="- completed database migration..."
          />
        </div>

        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between">
          {weeklyReport ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] uppercase font-mono tracking-widest font-bold text-indigo-400 mb-1">Executive Summary:</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3.5 rounded-xl border border-slate-904 select-text">
                  {weeklyReport.summary}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase font-mono tracking-widest font-bold text-teal-400 mb-1.5">Actionable Stakeholder Bullets:</h4>
                <div className="space-y-1.5">
                  {weeklyReport.bullets.map((bullet, i) => (
                    <div key={i} className="flex gap-2 text-xs text-slate-350 bg-slate-900/50 p-2.5 rounded-lg border border-slate-902">
                      <span className="text-emerald-450 font-bold font-mono">▸</span>
                      <p className="flex-1 select-text">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="p-4 bg-slate-905 border border-slate-850 rounded-full text-indigo-400">
                <Icon name="Activity" size={32} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-350">Awaiting Log Summary</h4>
                <p className="text-xs text-slate-505 max-w-[240px] mx-auto mt-1 leading-relaxed">
                  Provide your raw bullet list and press "Summarize Notes" to watch corporate AI optimize your professional report.
                </p>
              </div>
            </div>
          )}

          <div className="border-t border-slate-900 pt-3 flex items-center justify-between text-[9px] font-mono text-slate-500 select-none mt-4">
            <span>● Secured metrics evaluation</span>
            <span>100% clientside safe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductivityToolsProps {
  toolId: string;
}

export const ProductivityTools: React.FC<ProductivityToolsProps> = ({ toolId }) => {
  // ---- 1. KANBAN BOARD STATE ----
  const [kanbanTasks, setKanbanTasks] = useState([
    { id: 't1', title: 'Refactor core layout wrappers', status: 'todo', desc: 'Prepare main viewport variables.' },
    { id: 't2', title: 'Adsterra Banner client script setup', status: 'doing', desc: 'Secure program injections.' },
    { id: 't3', title: 'SEO robots and metadata check', status: 'done', desc: 'Formulated precise headers.' }
  ]);
  const [newKanbanTitle, setNewKanbanTitle] = useState('');
  const [newKanbanDesc, setNewKanbanDesc] = useState('');

  const addKanbanTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKanbanTitle.trim()) return;
    setKanbanTasks(prev => [
      ...prev,
      { id: Date.now().toString(), title: newKanbanTitle, status: 'todo', desc: newKanbanDesc }
    ]);
    setNewKanbanTitle('');
    setNewKanbanDesc('');
  };

  const moveKanban = (id: string, status: 'todo' | 'doing' | 'done') => {
    setKanbanTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const deleteKanban = (id: string) => {
    setKanbanTasks(prev => prev.filter(t => t.id !== id));
  };


  // ---- 2. POMODORO TIMER STATE ----
  const [timerMode, setTimerMode] = useState<'work' | 'short' | 'long'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            if (timerMode === 'work') {
              setPomodoroCount(c => c + 1);
              alert('Work session done! Time for a refreshing break.');
              setTimerMode('short');
              return 5 * 60;
            } else {
              alert('Break complete! Ready to lock back onto task targets.');
              setTimerMode('work');
              return 25 * 60;
            }
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timerMode]);

  const switchTimerMode = (mode: 'work' | 'short' | 'long') => {
    setTimerMode(mode);
    setIsTimerRunning(false);
    if (mode === 'work') setTimeLeft(25 * 60);
    else if (mode === 'short') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };


  // ---- 3. PASSWORD VAULT STATE ----
  const [passLength, setPassLength] = useState(16);
  const [passOpts, setPassOpts] = useState({ upper: true, lower: true, nums: true, syms: true });
  const [generatedPass, setGeneratedPass] = useState('');
  const [vaultName, setVaultName] = useState('');
  const [vaultList, setVaultList] = useState<{ id: string; site: string; pass: string; visible: boolean }[]>([
    { id: 'v1', site: 'GitHub Account', pass: 'C@reerPouch_9872!', visible: false },
    { id: 'v2', site: 'Cloudflare Admin', pass: 'Page_Sec_Shield_#26', visible: false }
  ]);

  const generatePass = () => {
    let charset = '';
    if (passOpts.lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (passOpts.upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (passOpts.nums) charset += '0123456789';
    if (passOpts.syms) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
      alert('Please check at least one character type filter.');
      return;
    }

    let result = '';
    for (let i = 0; i < passLength; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPass(result);
  };

  const addToVault = () => {
    if (!vaultName || !generatedPass) {
      alert('Ensure you entered a label and generated a key.');
      return;
    }
    setVaultList(p => [...p, { id: Date.now().toString(), site: vaultName, pass: generatedPass, visible: false }]);
    setVaultName('');
  };

  const togglePasswordVisibility = (id: string) => {
    setVaultList(prev => prev.map(item => item.id === id ? { ...item, visible: !item.visible } : item));
  };

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    alert('Copied to Clipboard!');
  };


  // ---- 4. TIMEZONE COORDINATOR STATE ----
  const [baseHour, setBaseHour] = useState(12); // Base local hour inside standard offset format
  const timezones = [
    { name: 'UTC Coordinated', offset: 0, label: 'Standard World Time' },
    { name: 'US Eastern Time (EST/EDT)', offset: -5, label: 'New York Business' },
    { name: 'US Pacific Time (PST/PDT)', offset: -8, label: 'Silicon Valley Teams' },
    { name: 'Central European Time (CET)', offset: 1, label: 'Frankfurt/Paris Operations' },
    { name: 'Japan Standard Time (JST)', offset: 9, label: 'Tokyo Client Base' }
  ];

  const formatHourString = (hr: number) => {
    const wrappedHr = (hr + 24) % 24;
    const ampm = wrappedHr >= 12 ? 'PM' : 'AM';
    const displayHr = wrappedHr % 12 === 0 ? 12 : wrappedHr % 12;
    return `${displayHr}:00 ${ampm}`;
  };


  // ---- 5. INVOICE GENERATOR STATE ----
  const [invoiceMetadata, setInvoiceMetadata] = useState({ client: 'Horizon Tech Corp', date: '2026-06-08', id: 'INV-2026-004' });
  const [invoiceItems, setInvoiceItems] = useState([
    { id: '1', name: 'Premium Cloudflare Static Optimization Consulting', rate: 125, hours: 10 },
    { id: '2', name: 'UI components library integration layout tasks', rate: 95, hours: 8 }
  ]);
  const [newInvoiceName, setNewInvoiceName] = useState('');
  const [newInvoiceRate, setNewInvoiceRate] = useState(80);
  const [newInvoiceHrs, setNewInvoiceHrs] = useState(5);

  const addInvoiceItem = () => {
    if (!newInvoiceName.trim()) return;
    setInvoiceItems(p => [
      ...p,
      { id: Date.now().toString(), name: newInvoiceName, rate: Number(newInvoiceRate), hours: Number(newInvoiceHrs) }
    ]);
    setNewInvoiceName('');
  };

  const calculateSubtotal = () => invoiceItems.reduce((acc, row) => acc + (row.rate * row.hours), 0);


  // ---- 6. EMAIL/LETTER WIREFRAMER STATE ----
  const [emailLayout, setEmailLayout] = useState({
    header: 'CareerPouch Platform Optimization Insights',
    tagline: 'Weekly strategic assets for your professional digital folder',
    heroUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=728&auto=format&fit=crop',
    contentTitle: 'Unlocking Global Performance in High Contrast Layout Interfaces',
    contentBody: 'By coupling CSS Glassmorph structural tokens directly onto lightweight client-side scripts, technical assets can achieve pristine layout speeds. CareerPouch aggregates key helpers in a beautiful serverless structure, ready to host offline on GitHub and compile instantly inside browser states.',
    actionLabel: 'Explore Staging Dashboard',
    actionLink: 'https://careerpouch.pages.dev',
    footerText: 'CareerPouch Suite — Leveling Up Careers Worldwide'
  });

  const getEmailHTML = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f1f5f9; }
    .card { background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background-color: #1e293b; color: #10b981; padding: 24px; text-align: center; }
    .tagline { color: #94a3b8; font-size: 12px; margin-top: 4px; }
    .hero { width: 100%; height: 200px; object-fit: cover; }
    .body { padding: 32px; color: #334155; line-height: 1.6; }
    .btn { display: inline-block; padding: 12px 24px; background-color: #10b981; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 16px; }
    .footer { text-align: center; padding: 20px; color: #64748b; font-size: 11px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin:0; font-size:22px;">${emailLayout.header}</h1>
      <div class="tagline">${emailLayout.tagline}</div>
    </div>
    <div class="body">
      <h2 style="margin-top:0; color:#1e293b;">${emailLayout.contentTitle}</h2>
      <p>${emailLayout.contentBody}</p>
      <a href="${emailLayout.actionLink}" class="btn" target="_blank">${emailLayout.actionLabel}</a>
    </div>
    <div class="footer">${emailLayout.footerText}</div>
  </div>
</body>
</html>`;
  };


  // ---- 7. CRON EXPRESSION GENERATOR & EXPLAINER STATE ----
  const [cronState, setCronState] = useState({
    min: '*',
    hr: '*',
    dom: '*',
    mon: '*',
    dow: '*'
  });

  const getCronExpressionString = () => {
    return `${cronState.min} ${cronState.hr} ${cronState.dom} ${cronState.mon} ${cronState.dow}`;
  };

  const decodeCronPart = () => {
    let result = "Executes ";
    const { min, hr, dom, mon, dow } = cronState;

    if (min === '*' && hr === '*' && dom === '*' && mon === '*' && dow === '*') {
      return "Every single minute of every single day.";
    }

    if (min === '*') {
      result += "every minute ";
    } else if (min.startsWith('*/')) {
      result += `every ${min.replace('*/', '')} minutes `;
    } else {
      result += `at minute ${min} `;
    }

    if (hr === '*') {
      result += "of every hour ";
    } else if (hr.startsWith('*/')) {
      result += `every ${hr.replace('*/', '')} hours `;
    } else {
      result += `at hour ${hr}:00 `;
    }

    if (dom !== '*') {
      result += `on day ${dom} of the month `;
    }
    if (mon !== '*') {
      result += `in month ${mon} `;
    }

    if (dow !== '*') {
      const daysMap: Record<string, string> = {
        '0': 'Sunday', '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday', '4': 'Thursday',
        '5': 'Friday', '6': 'Saturday', '1-5': 'Weekdays', '0,6': 'Weekends'
      };
      result += `on ${daysMap[dow] || `day ${dow}`} `;
    } else {
      result += "every day of the week";
    }

    return result.trim() + ".";
  };

  const loadCronPreset = (preset: string) => {
    const parts = preset.split(' ');
    if (parts.length === 5) {
      setCronState({
        min: parts[0],
        hr: parts[1],
        dom: parts[2],
        mon: parts[3],
        dow: parts[4]
      });
    }
  };


  // ---- MAIN RENDER SWITCHER ----
  return (
    <div className="space-y-6">
      {/* ==========================================
          NEW PRODUCTIVITY TOOLS (4)
         ========================================== */}
      {/* 1. MEETING AGENDA ARCHITECT */}
      {toolId === 'meeting-agenda' && <MeetingAgendaTool />}

      {/* 2. PROJECT MILESTONE GANTT VISUALIZER */}
      {toolId === 'project-timeline' && <ProjectTimelineTool />}

      {/* 3. DAILY STANDUP COMPOSER */}
      {toolId === 'daily-standup' && <DailyStandupTool />}

      {/* 4. AI WEEKLY EXECUTIVE REPORT SUMMARIZER */}
      {toolId === 'ai-weekly-report' && <AiWeeklyReportTool />}

      {/* 1. KANBAN TASK BOARD */}
      {toolId === 'kanban-board' && (
        <div className="space-y-4">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Icon name="Trello" className="text-blue-400" /> Live Kanban Tasks Board
            </h2>
            <p className="text-xs text-slate-400 mt-1">Add tasks and click arrows to transition status states seamlessly.</p>
          </div>

          <form onSubmit={addKanbanTask} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-800/20 p-4 rounded-xl border border-slate-700/40">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1 font-mono">TASK TITLE</label>
              <input
                type="text"
                placeholder="Write actionable title..."
                value={newKanbanTitle}
                onChange={(e) => setNewKanbanTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1 font-mono">OPTIONAL DESCRIPTOR</label>
              <input
                type="text"
                placeholder="Short outline..."
                value={newKanbanDesc}
                onChange={(e) => setNewKanbanDesc(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-1.5 rounded text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Icon name="Plus" size={14} /> Commit Task
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* COLUMN 1 */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 min-h-[300px] flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Backlog / To Do
                </span>
                <span className="bg-slate-800/50 text-[10px] px-1.5 py-0.5 rounded font-mono text-slate-400">
                  {kanbanTasks.filter(t => t.status === 'todo').length}
                </span>
              </div>
              <div className="space-y-2.5 flex-1">
                {kanbanTasks.filter(t => t.status === 'todo').map(task => (
                  <div key={task.id} className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 p-3.5 rounded-lg transition-all group">
                    <h4 className="text-xs font-semibold text-slate-200">{task.title}</h4>
                    {task.desc && <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{task.desc}</p>}
                    <div className="flex justify-end gap-1.5 mt-3 pt-2.5 border-t border-slate-800/40">
                      <button onClick={() => deleteKanban(task.id)} className="text-slate-600 hover:text-red-400 p-0.5 rounded transition-all">
                        <Icon name="Trash2" size={12} />
                      </button>
                      <button onClick={() => moveKanban(task.id, 'doing')} className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-0.5">
                        Develop <Icon name="ArrowRight" size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2 */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 min-h-[300px] flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> In Progress
                </span>
                <span className="bg-slate-800/50 text-[10px] px-1.5 py-0.5 rounded font-mono text-slate-400">
                  {kanbanTasks.filter(t => t.status === 'doing').length}
                </span>
              </div>
              <div className="space-y-2.5 flex-1">
                {kanbanTasks.filter(t => t.status === 'doing').map(task => (
                  <div key={task.id} className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-lg">
                    <h4 className="text-xs font-semibold text-slate-200">{task.title}</h4>
                    {task.desc && <p className="text-[10px] text-slate-400 mt-1">{task.desc}</p>}
                    <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-800/40">
                      <button onClick={() => moveKanban(task.id, 'todo')} className="text-slate-500 hover:text-slate-300 text-[10px] font-mono flex items-center gap-0.5">
                        Back
                      </button>
                      <div className="flex gap-1.5">
                        <button onClick={() => deleteKanban(task.id)} className="text-slate-600 hover:text-red-400 p-0.5">
                          <Icon name="Trash2" size={12} />
                        </button>
                        <button onClick={() => moveKanban(task.id, 'done')} className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-0.5">
                          Complete <Icon name="Check" size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 3 */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 min-h-[300px] flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Complete / Verified
                </span>
                <span className="bg-slate-800/50 text-[10px] px-1.5 py-0.5 rounded font-mono text-slate-400">
                  {kanbanTasks.filter(t => t.status === 'done').length}
                </span>
              </div>
              <div className="space-y-2.5 flex-1">
                {kanbanTasks.filter(t => t.status === 'done').map(task => (
                  <div key={task.id} className="bg-slate-900/40 border border-slate-800/40 p-3.5 rounded-lg opacity-80">
                    <h4 className="text-xs font-semibold text-slate-400 line-through">{task.title}</h4>
                    {task.desc && <p className="text-[10px] text-slate-500 mt-1 line-through">{task.desc}</p>}
                    <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-800/10">
                      <button onClick={() => moveKanban(task.id, 'doing')} className="text-slate-500 hover:text-slate-300 text-[10px] font-mono">
                        Reopen
                      </button>
                      <button onClick={() => deleteKanban(task.id)} className="text-slate-600 hover:text-red-400 p-0.5">
                        <Icon name="Trash2" size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. POMODORO TICKER */}
      {toolId === 'pomodoro' && (
        <div className="bg-slate-850 p-6 rounded-2xl border border-slate-700/40 text-center max-w-md mx-auto space-y-6">
          <div className="border-b border-slate-700 pb-3">
            <h2 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2">
              <Icon name="Timer" className="text-rose-400" /> Pomodoro Focus Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1">Stave off fatigue using interval block sequences.</p>
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={() => switchTimerMode('work')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timerMode === 'work' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-400'
              }`}
            >
              25m Focus
            </button>
            <button
              onClick={() => switchTimerMode('short')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timerMode === 'short' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'bg-slate-800 text-slate-400'
              }`}
            >
              5m Break
            </button>
            <button
              onClick={() => switchTimerMode('long')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timerMode === 'long' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-slate-800 text-slate-400'
              }`}
            >
              15m Rest
            </button>
          </div>

          <div className="py-8 my-2">
            <div className="text-6xl font-mono font-bold tracking-tight text-white select-none">
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs text-slate-500 mt-2 font-mono flex items-center justify-center gap-1.5">
              <span>Status:</span>
              <span className={`uppercase font-bold ${timerMode === 'work' ? 'text-rose-400' : 'text-teal-400'}`}>
                {timerMode === 'work' ? 'Deep Work block' : 'Replenish Break'}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                isTimerRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <Icon name={isTimerRunning ? 'Pause' : 'Play'} size={14} />
              {isTimerRunning ? 'Hold Ticker' : 'Ignite Focus'}
            </button>
            <button
              onClick={() => switchTimerMode(timerMode)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
            >
              <Icon name="RotateCcw" size={14} /> Reset
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Sessions Accomplished:</span>
            <span className="font-mono font-bold text-rose-400">{pomodoroCount} completed</span>
          </div>
        </div>
      )}

      {/* 3. PASSWORD VAULT */}
      {toolId === 'password-vault' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 space-y-4">
            <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2 flex items-center gap-2">
              <Icon name="Key" className="text-amber-400 animate-pulse" /> Advanced Entropy Generator
            </h3>

            <div className="space-y-4">
              <div>
                <label className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>Pin Character Length</span>
                  <span className="font-mono text-amber-400 font-bold">{passLength} symbols</span>
                </label>
                <input
                  type="range"
                  min="8"
                  max="40"
                  value={passLength}
                  onChange={(e) => setPassLength(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passOpts.upper}
                    onChange={(e) => setPassOpts(p => ({ ...p, upper: e.target.checked }))}
                    className="rounded border-slate-700 text-amber-500 focus:ring-0"
                  />
                  Uppercase (A-Z)
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passOpts.lower}
                    onChange={(e) => setPassOpts(p => ({ ...p, lower: e.target.checked }))}
                    className="rounded border-slate-700 text-amber-500 focus:ring-0"
                  />
                  Lowercase (a-z)
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passOpts.nums}
                    onChange={(e) => setPassOpts(p => ({ ...p, nums: e.target.checked }))}
                    className="rounded border-slate-700 text-amber-500 focus:ring-0"
                  />
                  Digits (0-9)
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passOpts.syms}
                    onChange={(e) => setPassOpts(p => ({ ...p, syms: e.target.checked }))}
                    className="rounded border-slate-700 text-amber-500 focus:ring-0"
                  />
                  Symbols (!@#$)
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={generatePass}
                  className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2 rounded-lg text-xs transition-all"
                >
                  Synthesize Key
                </button>
              </div>

              {generatedPass && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono">
                  <div className="flex items-center justify-between gap-2 overflow-x-auto text-xs text-amber-300 font-bold">
                    <span>{generatedPass}</span>
                    <button onClick={() => copyText(generatedPass)} className="text-slate-400 hover:text-white shrink-0">
                      <Icon name="Copy" size={14} />
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-500 flex justify-between items-center">
                    <span>Entropy Level:</span>
                    <span className="text-emerald-400 font-bold">EXCELLENT (Cryptographic)</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-700/60 pt-4 space-y-3">
              <span className="text-xs text-slate-300 font-medium">Commit New Password to Vault</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Website name / Account target..."
                  value={vaultName}
                  onChange={(e) => setVaultName(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder:text-slate-600"
                />
                <button onClick={addToVault} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded text-xs transition-all">
                  Store Offline
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/45 p-5 rounded-2xl border border-slate-800/80 space-y-3">
            <h3 className="font-semibold text-slate-300 text-xs uppercase tracking-wider font-mono">Secure Local Browser Vaults</h3>
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
              {vaultList.map((item) => (
                <div key={item.id} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <h4 className="text-slate-400 text-[11px]">{item.site}</h4>
                    <p className="text-slate-100 font-bold mt-1 tracking-wide">
                      {item.visible ? item.pass : '••••••••••••••••'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => togglePasswordVisibility(item.id)} className="text-slate-500 hover:text-slate-300">
                      <Icon name={item.visible ? 'EyeOff' : 'Eye'} size={14} />
                    </button>
                    <button onClick={() => copyText(item.pass)} className="text-slate-500 hover:text-slate-300">
                      <Icon name="Copy" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TIMEZONE COORDINATOR */}
      {toolId === 'timezone-coordinator' && (
        <div className="space-y-6">
          <div className="border-b border-slate-700 pb-3">
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Icon name="Clock" className="text-indigo-400" /> Timezone Coordinator Index
            </h2>
            <p className="text-xs text-slate-400 mt-1">Adjust the slider to coordinate meeting zones across team hubs worldwide.</p>
          </div>

          <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/40 space-y-4">
            <div>
              <label className="flex justify-between text-xs text-slate-300 mb-2 font-mono">
                <span>LOCAL EST BASE TIME ADJUSTER</span>
                <span className="text-emerald-400 font-bold">{formatHourString(baseHour)} (Eastern Time)</span>
              </label>
              <input
                type="range"
                min="0"
                max="23"
                value={baseHour}
                onChange={(e) => setBaseHour(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-4">
              {timezones.map((tz, i) => {
                const tzHour = (baseHour + tz.offset + 24) % 24;
                const isWorkingHour = tzHour >= 9 && tzHour <= 17;
                return (
                  <div key={i} className={`p-4 rounded-xl border transition-all ${
                    isWorkingHour
                      ? 'bg-emerald-500/5 border-emerald-500/20 shadow-emerald-950/20'
                      : 'bg-slate-900 border-slate-800'
                  }`}>
                    <h4 className="text-xs font-bold text-slate-200 truncate">{tz.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{tz.label}</p>
                    <div className="text-xl font-mono font-bold text-white mt-3">
                      {formatHourString(baseHour + tz.offset)}
                    </div>
                    <span className={`inline-block text-[9px] font-bold rounded px-1.5 py-0.5 mt-2 font-mono ${
                      isWorkingHour ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isWorkingHour ? '💻 Working Zone' : '💤 Night/Rest Off'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. INVOICE GENERATOR */}
      {toolId === 'invoice-generator' && (
        <div className="space-y-6">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Icon name="Receipt" className="text-amber-400" /> Commercial Services Invoice Generator
            </h2>
            <p className="text-xs text-slate-400 mt-1">Build standard corporate printable invoices with tax integrations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 border-b border-slate-700 pb-2">Client Meta Info</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Company / Recipient</label>
                  <input
                    type="text"
                    value={invoiceMetadata.client}
                    onChange={(e) => setInvoiceMetadata(p => ({ ...p, client: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-110"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Invoice ID</label>
                    <input
                      type="text"
                      value={invoiceMetadata.id}
                      onChange={(e) => setInvoiceMetadata(p => ({ ...p, id: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Billing Date</label>
                    <input
                      type="text"
                      value={invoiceMetadata.date}
                      onChange={(e) => setInvoiceMetadata(p => ({ ...p, date: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700/60 pt-4 space-y-3">
                <span className="text-xs font-bold text-slate-300">New Invoice Row Entry</span>
                <input
                  type="text"
                  placeholder="Service description..."
                  value={newInvoiceName}
                  onChange={(e) => setNewInvoiceName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] text-slate-400">Rate ($)</label>
                    <input
                      type="number"
                      value={newInvoiceRate}
                      onChange={(e) => setNewInvoiceRate(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400">Hours</label>
                    <input
                      type="number"
                      value={newInvoiceHrs}
                      onChange={(e) => setNewInvoiceHrs(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs"
                    />
                  </div>
                </div>
                <button
                  onClick={addInvoiceItem}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-1.5 rounded text-xs transition-colors"
                >
                  Append Line Item
                </button>
              </div>
            </div>

            <div className="md:col-span-2 bg-white text-slate-900 p-8 rounded-2xl border border-slate-100 shadow-xl font-sans min-h-[500px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start border-b border-slate-200 pb-5 mb-6">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-800">CareerPouch Business Invoice</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Static Offline Billing Engine</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-bold">ID: {invoiceMetadata.id}</p>
                    <p className="text-slate-500">Date: {invoiceMetadata.id}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BILLED TO:</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1">{invoiceMetadata.client}</h4>
                  <p className="text-xs text-slate-500">Corporate Technical Consulting Customer</p>
                </div>

                <table className="w-full text-left text-xs text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-800 font-bold bg-slate-50">
                      <th className="py-2.5 px-3">Service Element Description</th>
                      <th className="py-2.5 px-3 text-right">Hourly Rate</th>
                      <th className="py-2.5 px-3 text-right">Hours</th>
                      <th className="py-2.5 px-3 text-right">Total Sub</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceItems.map((row) => (
                      <tr key={row.id} className="border-b border-slate-100">
                        <td className="py-3 px-3 text-slate-800 font-medium">{row.name}</td>
                        <td className="py-3 px-3 text-right font-mono">${row.rate}</td>
                        <td className="py-3 px-3 text-right font-mono">{row.hours}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold">${row.rate * row.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-200 pt-5 mt-6 flex justify-between items-end">
                <span className="text-[10px] text-slate-400 font-mono">Invoice compiled locally in local memory.</span>
                <div className="text-right space-y-1">
                  <p className="text-xs text-slate-500">Estimated Corporate Subtotal:</p>
                  <p className="text-2xl font-bold font-mono text-slate-900">${calculateSubtotal()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. EMAIL WIREFRAMER */}
      {toolId === 'email-wireframer' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 space-y-4">
            <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2">Newsletter Layout Blueprint</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Header Label</label>
                <input
                  type="text"
                  value={emailLayout.header}
                  onChange={(e) => setEmailLayout(p => ({ ...p, header: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Tagline</label>
                <input
                  type="text"
                  value={emailLayout.tagline}
                  onChange={(e) => setEmailLayout(p => ({ ...p, tagline: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Section Header Title</label>
                <input
                  type="text"
                  value={emailLayout.contentTitle}
                  onChange={(e) => setEmailLayout(p => ({ ...p, contentTitle: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Focus Body Description</label>
                <textarea
                  rows={3}
                  value={emailLayout.contentBody}
                  onChange={(e) => setEmailLayout(p => ({ ...p, contentBody: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-100 resize-none font-sans"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Action Button Title</label>
                  <input
                    type="text"
                    value={emailLayout.actionLabel}
                    onChange={(e) => setEmailLayout(p => ({ ...p, actionLabel: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Action Destination Link</label>
                  <input
                    type="text"
                    value={emailLayout.actionLink}
                    onChange={(e) => setEmailLayout(p => ({ ...p, actionLink: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => copyText(getEmailHTML())}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded text-xs transition-all flex items-center justify-center gap-1"
            >
              <Icon name="Copy" size={13} /> Copy Layout raw HTML
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 font-mono mb-2 uppercase tracking-wider block">Live Frame Preview mockup</span>
            <div className="bg-slate-100 p-6 rounded-xl overflow-y-auto max-h-[350px] text-slate-800 font-sans shadow-inner">
              <div className="max-w-[400px] mx-auto bg-white rounded-lg overflow-hidden border border-slate-200">
                <div className="bg-slate-900 text-teal-400 p-4 text-center">
                  <h4 className="text-sm font-bold">{emailLayout.header}</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">{emailLayout.tagline}</p>
                </div>
                <div className="p-5 space-y-3">
                  <h5 className="text-xs font-bold text-slate-800">{emailLayout.contentTitle}</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed text-slate-600">{emailLayout.contentBody}</p>
                  <div className="pt-2 text-center">
                    <span className="inline-block bg-teal-500 text-slate-900 px-4 py-1.5 rounded-md font-bold text-xs pointer-events-none">
                      {emailLayout.actionLabel}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-50 text-[9px] text-slate-400 py-3 text-center border-t border-slate-200">
                  {emailLayout.footerText}
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-3">
              HTML is styled with bulletproof inline email structural metrics for mail compatibility.
            </div>
          </div>
        </div>
      )}

      {/* 7. CRON GENERATOR & EXPLAINER */}
      {toolId === 'cron-generator' && (
        <div className="space-y-6">
          <div className="border-b border-slate-700/60 pb-3">
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="Clock" className="text-blue-400" /> Cron Generator & Explainer
            </h2>
            <p className="text-xs text-slate-400 mt-1">Design precise cron command triggers interactively with immediate plain-English schedule decoding.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/40 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300">Presets & Common Schedules</h3>
              <div className="space-y-2">
                <button
                  onClick={() => loadCronPreset('*/5 * * * *')}
                  className="w-full text-left bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-850 p-2.5 rounded-lg text-xs font-mono font-medium flex items-center justify-between"
                >
                  <span>Every 5 Minutes</span>
                  <span className="text-blue-400 text-[10px]">*/5 * * * *</span>
                </button>
                <button
                  onClick={() => loadCronPreset('0 9 * * 1-5')}
                  className="w-full text-left bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-850 p-2.5 rounded-lg text-xs font-mono font-medium flex items-center justify-between"
                >
                  <span>Mornings (9 AM Weekdays)</span>
                  <span className="text-blue-400 text-[10px]">0 9 * * 1-5</span>
                </button>
                <button
                  onClick={() => loadCronPreset('0 0 * * 0')}
                  className="w-full text-left bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-850 p-2.5 rounded-lg text-xs font-mono font-medium flex items-center justify-between"
                >
                  <span>Sundays at Midnight</span>
                  <span className="text-blue-400 text-[10px]">0 0 * * 0</span>
                </button>
                <button
                  onClick={() => loadCronPreset('0 3 * * 1-5')}
                  className="w-full text-left bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-850 p-2.5 rounded-lg text-xs font-mono font-medium flex items-center justify-between"
                >
                  <span>3 AM on Weekdays</span>
                  <span className="text-blue-400 text-[10px]">0 3 * * 1-5</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/40 grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase">Minute</label>
                  <input
                    type="text"
                    value={cronState.min}
                    onChange={(e) => setCronState(p => ({ ...p, min: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-blue-400 font-mono font-bold text-center"
                  />
                  <span className="text-[9px] text-slate-500 mt-1 block text-center">0-59 or * or */5</span>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase">Hour</label>
                  <input
                    type="text"
                    value={cronState.hr}
                    onChange={(e) => setCronState(p => ({ ...p, hr: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-blue-400 font-mono font-bold text-center"
                  />
                  <span className="text-[9px] text-slate-500 mt-1 block text-center">0-23 or * or */2</span>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase">Day / Mo</label>
                  <input
                    type="text"
                    value={cronState.dom}
                    onChange={(e) => setCronState(p => ({ ...p, dom: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-blue-400 font-mono font-bold text-center"
                  />
                  <span className="text-[9px] text-slate-500 mt-1 block text-center">1-31 or *</span>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase">Month</label>
                  <input
                    type="text"
                    value={cronState.mon}
                    onChange={(e) => setCronState(p => ({ ...p, mon: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-blue-400 font-mono font-bold text-center"
                  />
                  <span className="text-[9px] text-slate-500 mt-1 block text-center">1-12 or *</span>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase">Day / Wk</label>
                  <input
                    type="text"
                    value={cronState.dow}
                    onChange={(e) => setCronState(p => ({ ...p, dow: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-blue-400 font-mono font-bold text-center"
                  />
                  <span className="text-[9px] text-slate-500 mt-1 block text-center">0-6, 1-5, or *</span>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Active expression</span>
                  <div className="text-xl font-extrabold text-blue-400 mt-1 flex items-center gap-2 select-all">
                    <span>{getCronExpressionString()}</span>
                  </div>
                  <p className="text-xs text-slate-350 mt-2 font-sans italic">
                    💡 {decodeCronPart()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getCronExpressionString());
                    alert('Cron string copied!');
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-md"
                >
                  <Icon name="Copy" size={13} /> Copy expression
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
