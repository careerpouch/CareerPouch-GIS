import React, { useState, useEffect } from 'react';
import { Icon } from '../Icon';

interface CareerToolsProps {
  toolId: string;
}

export const CareerTools: React.FC<CareerToolsProps> = ({ toolId }) => {
  // Common states for resumes
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    title: 'Senior Software Engineer',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    website: 'linkedin.com/in/janedoe',
    summary: 'Highly analytical and detail-oriented Senior Software Engineer with 6+ years of expertise in building responsive, scalable full-stack applications. Proven experience leading agile development sprints, driving user retention rate improvements, and optimizing site execution speeds.',
    experience: [
      { id: '1', role: 'Staff Engineer', company: 'TechSolutions Corp', period: '2023 - Present', bullet1: 'Led a cross-functional team of 8 engineers to refactor core enterprise dashboards, boosting execution speed by 42%.', bullet2: 'Architected robust event-driven workflows, reduction in client-side loading latency by 1.2 seconds, expanding active user engagement.' },
      { id: '2', role: 'Full Stack Engineer', company: 'Launchpad Inc', period: '2020 - 2023', bullet1: 'Designed and shipped reactive responsive portals using TypeScript and React under Agile Scrum guidelines.', bullet2: 'Managed relational state and optimized database read sequences, reducing network payload weights by over 30%.' }
    ],
    education: [
      { degree: 'B.S. in Computer Science', school: 'Stanford University', year: '2016 - 2020' }
    ],
    skills: ['TypeScript', 'React.js', 'Node.js', 'Tailwind CSS', 'SQL', 'Product Lifecycle', 'System Architecture', 'Agile Teamwork'],
    publications: [
      { title: 'Scalable Graph Architectures in Modern Edge Cache Layers', venue: 'IEEE Journal of Web Systems', year: '2022' }
    ],
    references: [
      { name: 'Dr. Arthur Pendelton', title: 'Director of Technology, TechSolutions Corp', email: 'arthur.p@techsolutions.com', relation: 'Direct Manager' },
      { name: 'Sarah Jenkins', title: 'Lead Product Manager, Launchpad Inc', email: 'sarah.jenkins@launchpad.io', relation: 'Project Collaborator' }
    ]
  });

  // Letter drafts states
  const [letterConfig, setLetterConfig] = useState({
    recipientName: 'Hiring Committee',
    companyName: 'Horizon Creative Technologies',
    jobTitle: 'Lead Frontend Developer',
    resignationNoticeWeeks: 'two weeks',
    resignationReason: 'advancing into a leadership role tailored for international scalability projects',
    resignationLastDay: 'June 30, 2026',
    memoSubject: 'Expansion of Digital Engagement Framework Insights',
    referenceName: 'John Smith',
    referenceCompany: 'Google AI Studio',
    letterBody: ''
  });

  // ---- JOB TRACKER STATE ----
  const [jobs, setJobs] = useState<{ id: string; role: string; company: string; date: string; status: 'applied' | 'interview' | 'offered' | 'rejected'; salary: string; notes: string }[]>(() => {
    try {
      const saved = localStorage.getItem('career_pouch_jobs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: '1', role: 'Staff Backend Engineer', company: 'Google', date: '2026-06-01', status: 'interview', salary: '$180,000 - $220,000', notes: 'Prepare tech system design, mock interviews on Wednesday.' },
      { id: '2', role: 'Frontend Lead Developer', company: 'Stripe', date: '2026-05-28', status: 'offered', salary: '$195,000 + equity', notes: 'Offer received! Review details on health insurance package.' },
      { id: '3', role: 'Solutions Architect', company: 'Amazon WS', date: '2026-05-15', status: 'applied', salary: '$170,005', notes: 'Submitted resume draft build with custom ATS portfolio.' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('career_pouch_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const [newJob, setNewJob] = useState({ role: '', company: '', date: new Date().toISOString().split('T')[0], status: 'applied' as const, salary: '', notes: '' });
  const [jobSearch, setJobSearch] = useState('');
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.role.trim() || !newJob.company.trim()) {
      alert('Please fill out both Role Title and Company Name');
      return;
    }
    const newlyCreated = {
      ...newJob,
      id: Date.now().toString()
    };
    setJobs([newlyCreated, ...jobs]);
    setNewJob({ role: '', company: '', date: new Date().toISOString().split('T')[0], status: 'applied', salary: '', notes: '' });
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const handleUpdateStatus = (id: string, stat: 'applied' | 'interview' | 'offered' | 'rejected') => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: stat } : j));
  };

  // Editor toggle helper
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const updateProfile = (field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  // ---- AI RESUME BULLET OPTIMIZER STATE & REAL-TIME ALGORITHM ----
  const [rawBullet, setRawBullet] = useState('worked on a react website and helped the team make loading time faster');
  const [jobCategory, setJobCategory] = useState<'tech' | 'growth' | 'management' | 'general'>('tech');
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    diagnostics: { type: 'success' | 'warning' | 'info'; message: string }[];
    bulletsSuggestions: string[];
  } | null>(null);

  const analyzeAndOptimizeBullet = () => {
    if (!rawBullet.trim()) {
      return;
    }

    const diagnostics: { type: 'success' | 'warning' | 'info'; message: string }[] = [];
    let score = 65; // Baseline standard score

    const lower = rawBullet.toLowerCase();

    // 1. Core Passive Opener Check
    const weakVerbs = ['helped', 'worked on', 'assisted', 'responsible for', 'managed', 'was in charge of', 'did', 'made', 'created', 'handled'];
    const foundWeak = weakVerbs.find(w => lower.startsWith(w) || lower.includes(' ' + w));
    if (foundWeak) {
      diagnostics.push({
        type: 'warning',
        message: `Weak Action Verb: Using "${foundWeak}" sounds like a duty list. Start with an impactful action verb directly.`
      });
      score -= 15;
    } else {
      diagnostics.push({
        type: 'success',
        message: 'Decisive Action: Your bullet avoids passive or shared-duty opening verbs.'
      });
      score += 10;
    }

    // 2. Metrics Check
    const hasNumbers = /[\d%$\+]+/.test(lower) || lower.includes('percent') || lower.includes('dollars');
    if (!hasNumbers) {
      diagnostics.push({
        type: 'warning',
        message: 'Lacks Quantified Value: Recruiters filter by metric outcome indicators. Include percentages (%), dollar values ($), or time values.'
      });
      score -= 20;
    } else {
      diagnostics.push({
        type: 'success',
        message: 'Measurable Evidence: Solid quantifiable data helps scale your actual contribution authority.'
      });
      score += 15;
    }

    // 3. Word length validation
    const words = rawBullet.trim().split(/\s+/).filter(Boolean);
    const wordsCount = words.length;
    if (wordsCount < 10) {
      diagnostics.push({
        type: 'warning',
        message: `Too Laconic (${wordsCount} words): Describe specific technologies or tools deployed to solve this task.`
      });
      score -= 10;
    } else if (wordsCount > 28) {
      diagnostics.push({
        type: 'warning',
        message: `Too Wordy (${wordsCount} words): Optimize bullet readability to under 25 words to avoid reader fatigue.`
      });
      score -= 10;
    } else {
      diagnostics.push({
        type: 'success',
        message: `Ideal Scanning Volume (${wordsCount} words): Fits perfectly within a single-line structural scan.`
      });
      score += 10;
    }

    // 4. STAR method indicators check
    const outcomeTriggers = ['to ', 'resulting in', 'boosting', 'improving', 'cutting', 'decreasing', 'realizing', 'accelerating', 'maximizing', 'saving', 'yielding', 'minimizing'];
    const hasOutcome = outcomeTriggers.some(t => lower.includes(t));
    if (!hasOutcome) {
      diagnostics.push({
        type: 'info',
        message: 'Unanchored Outcome: Connect this bullet directly to a professional benefit (e.g., "...resulting in higher speed").'
      });
    } else {
      score += 10;
    }

    const finalScore = Math.max(25, Math.min(98, score));

    // Dynamic AI options generators
    const disciplineList = {
      tech: ['Spearheaded', 'Architected', 'Engineered', 'Optimized', 'Synthesized', 'Automated'],
      growth: ['Catalyzed', 'Leveraged', 'Generated', 'Amplified', 'Orchestrated', 'Captured'],
      management: ['Directed', 'Championed', 'Mobilized', 'Streamlined', 'Pioneered', 'Negotiated'],
      general: ['Revamped', 'Expedited', 'Restructured', 'Consolidated', 'Pioneered', 'Spearheaded']
    };

    const selectedVerbs = disciplineList[jobCategory] || disciplineList.general;

    let cleanObjective = rawBullet
      .replace(/worked on a|worked on|helped the team|helped to|responsible for|helped|did |make/gi, '')
      .replace(/make loading time faster/gi, 'accelerate application latency')
      .replace(/faster/gi, 'high-performance execution')
      .trim();

    if (cleanObjective.length > 2) {
      cleanObjective = cleanObjective.charAt(0).toLowerCase() + cleanObjective.slice(1);
    } else {
      cleanObjective = 'optimize core deployment workflows';
    }

    const suggestions = [
      `${selectedVerbs[0]} critical system features to ${cleanObjective}, yielding a 35% improvement in deployment performance.`,
      `${selectedVerbs[1]} responsive workflows to ${cleanObjective}, resulting in a 42% latency reduction across enterprise dashboards.`,
      `${selectedVerbs[2]} cross-functional sprints to ${cleanObjective}, saving over 15+ engineering hours per week.`
    ];

    setAnalysisResult({
      score: finalScore,
      diagnostics,
      bulletsSuggestions: suggestions
    });
  };

  useEffect(() => {
    if (toolId === 'ai-bullet-optimizer') {
      analyzeAndOptimizeBullet();
    }
  }, [rawBullet, jobCategory, toolId]);

  const verbTreasury = {
    'Leadership & Strategy': ['Spearheaded', 'Orchestrated', 'Pioneered', 'Directed', 'Mobilized', 'Championed'],
    'Tech & Development': ['Architected', 'Engineered', 'Optimized', 'Synthesized', 'Automated', 'Refactored'],
    'Growth & Revenue': ['Catalyzed', 'Generated', 'Amplified', 'Leveraged', 'Maximized', 'Captured'],
    'Organization & Efficiency': ['Streamlined', 'Restructured', 'Consolidated', 'Expedited', 'Revamped', 'Standardized']
  };

  // ==========================================
  // NEW CAREER TOOLS IMPLEMENTATIONS
  // ==========================================
  const [interviewRole, setInterviewRole] = useState('Senior Software Engineer');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewAnswer, setInterviewAnswer] = useState('');
  const [interviewResult, setInterviewResult] = useState<{ score: number; starFeedback: string; alternativeAnswer: string } | null>(null);

  const interviewQuestions: Record<string, string[]> = {
    'Senior Software Engineer': [
      'Tell me about a time you had to resolve a complex scalability blocker in a production environment.',
      'How do you handle disagreement with product management regarding technical debt versus new features?',
      'Describe your process for conducting an optimized design review for a highly concurrent service.'
    ],
    'Product Manager': [
      'How do you prioritize your product backlog when faced with competing requests from engineering and sales?',
      'Describe a product launch that failed. What did you learn and how did you adjust?',
      'How do you define and track success metrics for an abstract user-facing feature?'
    ],
    'Data Scientist': [
      'How do you explain a complex neural network statistical insight to non-technical executive stakeholders?',
      'Tell me about a time you had to clean a severely degraded or biased dataset before training.',
      'How do you determine whether a statistical model drift requires active retraining versus baseline tweaking?'
    ]
  };

  const gradeInterviewResponse = () => {
    if (!interviewAnswer.trim()) {
      alert('Please write an answer before submitting for AI assessment.');
      return;
    }
    const len = interviewAnswer.length;
    let score = 70;
    let starFeedback = 'Great start! ';

    // STAR Method checking
    const hasSituation = /situation|when|was working|at my last|project/i.test(interviewAnswer);
    const hasTask = /task|goal|problem|objective|responsible/i.test(interviewAnswer);
    const hasAction = /action|i did|we optimized|i implemented|i chose/i.test(interviewAnswer);
    const hasResult = /result|consequently|percent|boosted|resulting|improved|metric/i.test(interviewAnswer);

    if (hasSituation) { score += 7; starFeedback += 'Excellent description of the Situation context. '; }
    else { starFeedback += 'Try outlining the exact Situation earlier in your passage. '; }

    if (hasTask) { score += 7; starFeedback += 'Identified the core Task cleanly. '; }
    else { starFeedback += 'Define your clear metrics role/Task more precisely. '; }

    if (hasAction) { score += 8; starFeedback += 'Rich description of your direct personal Actions. '; }
    else { starFeedback += 'State what YOU personally did (use "I did" instead of "we did"). '; }

    if (hasResult) { score += 8; starFeedback += 'Outstanding, metrics-backed Result provided. '; }
    else { score -= 10; starFeedback += 'Missing concrete numeric Results (numbers, percentages, times). Try adding a metrics-backed outcome to satisfy recruiters. '; }

    if (len > 300) score = Math.min(score + 5, 98);
    else if (len < 100) score = Math.max(score - 15, 45);

    const idealAnswer = `"[Situation] At my previous role, we faced a 45% spike in database concurrency load, which threatened API response limits during peak traffic.\n\n[Task] My core responsibility was to eliminate the lookup bottleneck and restore our 150ms service level agreement without scaling server costs.\n\n[Action] I profiled the queries, added tactical Redis caches, and optimized relational write indexes to prevent raw table locks.\n\n[Result] This successfully cut latency down to 85ms and saved $4,200 in monthly database expansion overhead."`;

    setInterviewResult({
      score,
      starFeedback,
      alternativeAnswer: idealAnswer
    });
  };

  const [salaryConfig, setSalaryConfig] = useState({
    title: 'Staff Frontend Engineer',
    baseOffer: '155000',
    equityOffer: '30000',
    bonusOffer: '15000',
    location: 'San Francisco, CA'
  });

  const getSalaryAnalysis = () => {
    const base = parseFloat(salaryConfig.baseOffer) || 0;
    const equity = parseFloat(salaryConfig.equityOffer) || 0;
    const bonus = parseFloat(salaryConfig.bonusOffer) || 0;
    const total = base + equity + bonus;

    let percentile = 65;
    if (total > 250000) percentile = 95;
    else if (total > 180000) percentile = 82;
    else if (total > 130000) percentile = 60;
    else if (total > 90050) percentile = 42;
    else percentile = 25;

    const negotiationEmail = `Subject: Negotiation Proposal - ${salaryConfig.title} - ${profile.name}

Dear Recruiting Team,

Thank you very much for offering me the role of ${salaryConfig.title} at your organization. I am incredibly excited about the prospect of aligning my technical skills to drive significant value for your projects.

I have spent some time reviewing the compensation package detailed in the agreement. Based on industry benchmark metrics for ${salaryConfig.title} professionals in ${salaryConfig.location}—as well as my 6+ years of specialized background in scale architectures—I was hoping we could explore a base salary adjustment closer to $${Math.ceil(base * 1.08).toLocaleString()} or look into a slight expansion of the yearly equity allocation.

I am confident that my experience leading high-profile sprint initiatives and shrinking load latencies will yield immediate, multi-fold returns for the company. I would be thrilled to sign immediately if we can bridge this alignment gap.

Thank you very much for your outstanding support, and I look forward to your thoughts.

Sincerely,
${profile.name}
${profile.phone}`;

    return { total, percentile, negotiationEmail };
  };

  const [linkedinConfig, setLinkedinConfig] = useState({
    targetRole: 'Staff Full-Stack Engineer',
    topSkill: 'React, Node, & Distributed Clouds',
    majorAchievement: 'refactored legacy portals to save 42% latency response speeds'
  });

  const getLinkedinOutcomes = () => {
    const title = linkedinConfig.targetRole;
    const skill = linkedinConfig.topSkill;
    const achievement = linkedinConfig.majorAchievement;

    const headlines = [
      `🚀 ${title} | Specializing in ${skill} | Driven to scale architecture limits`,
      `💻 ${title} | Veteran Contributor | I help teams ${achievement} utilizing robust engineering pipelines`,
      `✨ ${title} @ Scale | Expert in ${skill.split(',')[0] || 'Technical Systems'} | Metric-Driven Star Bullet builder`
    ];

    const aboutMe = `I am a performance-driven, growth-oriented ${title} specializing in ${skill}.\n\nThroughout my career development, I have maintained a track record of implementing high-fidelity solutions that align user goals with backend structures. Most recently, I ${achievement}, demonstrating my ability to streamline processes and yield measurable business outcomes.\n\nCore Competencies:\n⚡ Systems Architecture & Engineering\n⚡ Technical Mentorship & Sprint Oversight\n⚡ Agile Scrum & Continuous Integration\n\nLet's connect to chat about scaling your next-generation solutions!`;

    return { headlines, aboutMe };
  };

  if (toolId === 'ai-interview-helper') {
    const questions = interviewQuestions[interviewRole] || interviewQuestions['Senior Software Engineer'];
    const activeQuestion = questions[currentQuestionIndex] || questions[0];

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/60 pb-4 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Icon name="MessageSquareCode" className="text-emerald-400 animate-pulse" />
              AI Playback Interview Simulator
            </h2>
            <p className="text-sm text-slate-400 mt-1">Select your career domain and conduct localized grading evaluations on the STAR standard.</p>
          </div>
          <div className="flex gap-2">
            <select
              value={interviewRole}
              onChange={(e) => {
                setInterviewRole(e.target.value);
                setCurrentQuestionIndex(0);
                setInterviewAnswer('');
                setInterviewResult(null);
              }}
              className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white"
            >
              <option value="Senior Software Engineer">Senior Software Engineer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Data Scientist">Data Scientist</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-800/40 p-6 rounded-2xl border border-slate-750 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-full font-bold">
                QUESTION {currentQuestionIndex + 1} OF 3
              </span>
              <div className="flex gap-1">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => {
                    setCurrentQuestionIndex(prev => prev - 1);
                    setInterviewAnswer('');
                    setInterviewResult(null);
                  }}
                  className="p-1 px-2.5 bg-slate-900 border border-slate-700 hover:border-slate-650 rounded text-xs disabled:opacity-30"
                >
                  Prev
                </button>
                <button
                  disabled={currentQuestionIndex === 2}
                  onClick={() => {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setInterviewAnswer('');
                    setInterviewResult(null);
                  }}
                  className="p-1 px-2.5 bg-slate-900 border border-slate-700 hover:border-slate-650 rounded text-xs disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-emerald-500/20 rounded-xl relative overflow-hidden">
              <p className="text-sm font-semibold text-slate-200 leading-relaxed font-sans">
                &ldquo;{activeQuestion}&rdquo;
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-slate-400 uppercase font-mono tracking-wider font-bold">Your Response (STAR Method Guided)</label>
              <textarea
                value={interviewAnswer}
                onChange={(e) => setInterviewAnswer(e.target.value)}
                placeholder="Write your response, specifying: Situation (S), Task (T), Action (A) and quantitative Result (R)..."
                rows={7}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10.5px] text-slate-450 italic">💡 Include a number (e.g. 42%, $12k) to score higher!</span>
              <button
                onClick={gradeInterviewResponse}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-5 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-950/20"
              >
                <Icon name="Sparkles" size={13} /> Submit & Evaluate
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between">
            {interviewResult ? (
              <div className="space-y-5 font-sans">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="font-bold text-sm text-slate-200">Local Algorithmic Score</h4>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-2xl font-black font-mono leading-none ${
                      interviewResult.score >= 85 ? 'text-emerald-400' : 'text-yellow-400'
                    }`}>
                      {interviewResult.score}%
                    </span>
                    <span className="text-[10px] text-slate-500">STAR Rating</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400">Structural feedback:</h5>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 border border-slate-800/80 p-3.5 rounded-xl">
                    {interviewResult.starFeedback}
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="text-[10px] uppercase tracking-wider font-mono font-bold text-emerald-400">STAR Model Solution:</h5>
                  <pre className="text-[11px] text-slate-400 whitespace-pre-wrap leading-relaxed select-all bg-slate-900/40 p-3 rounded-lg border border-slate-850 font-mono">
                    {interviewResult.alternativeAnswer}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="p-4 bg-slate-905 border border-slate-850 rounded-full text-indigo-400">
                  <Icon name="MessageSquare" size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-300">Awaiting Response Grade</h4>
                  <p className="text-xs text-slate-500 max-w-[240px] mx-auto mt-1 leading-relaxed">
                    Write your STAR model interview answer in the box and submit to get rated locally.
                  </p>
                </div>
              </div>
            )}

            <div className="border-t border-slate-900 pt-3.5 text-[9px] font-mono text-slate-505 flex items-center justify-between select-none">
              <span>● Isolated grading runtime</span>
              <span>100% offline private</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (toolId === 'salary-estimator') {
    const { total, percentile, negotiationEmail } = getSalaryAnalysis();

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/60 pb-4 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Icon name="TrendingUp" className="text-emerald-400" />
              Salary negotiation & Offer Evaluator
            </h2>
            <p className="text-sm text-slate-400 mt-1">Audit compensation numbers, plot percentiles, and write tactful negotiations.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-800/40 p-5 rounded-2xl border border-slate-750 font-sans space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 font-mono">Customize Agreement</h3>
            
            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Target Professional Title</label>
                <input
                  type="text"
                  value={salaryConfig.title}
                  onChange={(e) => setSalaryConfig({...salaryConfig, title: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white"
                  placeholder="e.g. Lead Frontend Engineer"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Location Market</label>
                <input
                  type="text"
                  value={salaryConfig.location}
                  onChange={(e) => setSalaryConfig({...salaryConfig, location: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white"
                  placeholder="e.g. Austin, TX"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[9px] text-slate-400 uppercase font-mono mb-1">Base ($)</label>
                  <input
                    type="number"
                    value={salaryConfig.baseOffer}
                    onChange={(e) => setSalaryConfig({...salaryConfig, baseOffer: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-400 uppercase font-mono mb-1">Stock ($/yr)</label>
                  <input
                    type="number"
                    value={salaryConfig.equityOffer}
                    onChange={(e) => setSalaryConfig({...salaryConfig, equityOffer: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-405 uppercase font-mono mb-1">Bonus ($/yr)</label>
                  <input
                    type="number"
                    value={salaryConfig.bonusOffer}
                    onChange={(e) => setSalaryConfig({...salaryConfig, bonusOffer: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase">ESTIMATED COMP PACKAGE:</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">${total.toLocaleString()}</div>
              
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>MARKET PERCENTILE:</span>
                  <span className="font-extrabold text-blue-400">{percentile}th Percentile</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-505 rounded-full transition-all" style={{ width: `${percentile}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Icon name="MailOpen" size={13} className="text-indigo-400" /> Tactical Counter-Offer Template
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(negotiationEmail);
                    alert('Negotiation proposal copied!');
                  }}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-850 rounded hover:border-slate-750 text-[10px] font-bold text-teal-400 flex items-center gap-1 cursor-pointer"
                >
                  <Icon name="Copy" size={10} /> Copy Email
                </button>
              </div>

              <pre className="text-xs text-slate-350 bg-slate-900/50 p-4 rounded-xl border border-slate-900 overflow-y-auto max-h-[290px] font-sans whitespace-pre-wrap leading-relaxed select-text">
                {negotiationEmail}
              </pre>
            </div>

            <p className="text-[9px] font-mono text-slate-500 italic mt-3 leading-none">
              💡 Tip: Negotiating standard agreements yields 8% to 15% salary expansion on benchmarks.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (toolId === 'linkedin-optimizer') {
    const { headlines, aboutMe } = getLinkedinOutcomes();

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/60 pb-4 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-105 flex items-center gap-2">
              <Icon name="Sparkles" className="text-teal-400" />
              LinkedIn Profile & Headlines Optimizer
            </h2>
            <p className="text-sm text-slate-400 mt-1">Refine headlines, skills, and about pages locally to raise recruiter indexing.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-800/40 p-5 rounded-2xl border border-slate-750 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 font-mono">Profile Details</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Target Professional Title</label>
                <input
                  type="text"
                  value={linkedinConfig.targetRole}
                  onChange={(e) => setLinkedinConfig({...linkedinConfig, targetRole: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white"
                  placeholder="e.g. Senior Product Manager"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Primary Skill Accent</label>
                <input
                  type="text"
                  value={linkedinConfig.topSkill}
                  onChange={(e) => setLinkedinConfig({...linkedinConfig, topSkill: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white"
                  placeholder="e.g. Agile BACKLOG & Agile SCRUM"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Core Metric Achievement</label>
                <textarea
                  value={linkedinConfig.majorAchievement}
                  onChange={(e) => setLinkedinConfig({...linkedinConfig, majorAchievement: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white outline-none focus:border-emerald-500"
                  rows={2}
                  placeholder="e.g. scaled release rates by 40% with zero core bug blocks"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-5">
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-mono uppercase tracking-widest font-black text-indigo-400">High-CTR Refined Headlines:</h4>
              <div className="space-y-2">
                {headlines.map((headline, index) => (
                  <div key={index} className="group p-3 bg-slate-900 hover:bg-slate-900/80 border border-slate-850 rounded-xl flex items-center justify-between gap-3 transition-all">
                    <p className="text-xs text-slate-200 font-sans tracking-tight">{headline}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(headline);
                        alert('Headline copied!');
                      }}
                      className="p-1 px-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded text-[10px] text-teal-400 font-bold tracking-wider shrink-0 uppercase cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-mono uppercase tracking-widest font-black text-teal-400">High-Impact Bio (Summary):</h4>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(aboutMe);
                    alert('Bio summary copied!');
                  }}
                  className="px-2 py-1 bg-slate-900 border border-slate-800 rounded hover:border-slate-700 text-[10px] font-bold text-teal-400 flex items-center gap-1 cursor-pointer"
                >
                  <Icon name="Copy" size={11} /> Copy About Section
                </button>
              </div>
              <pre className="text-xs text-slate-300 bg-slate-900/30 p-4 rounded-xl border border-slate-900 overflow-y-auto max-h-[180px] font-sans whitespace-pre-wrap leading-relaxed select-text select-all">
                {aboutMe}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (toolId === 'ai-bullet-optimizer') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/60 pb-4 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Icon name="Sparkles" className="text-amber-400 rotate-12" />
              AI Resume Bullet Optimizer (100% Offline)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Refactor weak, passive experience bullets into metrics-guided STAR statements instantly without server API keys or delays.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/10 text-amber-300 border border-amber-500/15 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              Linguistic Engine Live
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Side */}
          <div className="space-y-4">
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-1.5">
                <Icon name="SpellCheck" className="text-emerald-400" size={16} /> Raw Draft Input
              </h3>
              
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 font-mono uppercase tracking-wider">Target Discipline</label>
                  <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
                    {[
                      { id: 'tech', label: 'Tech & Dev' },
                      { id: 'growth', label: 'Growth / Sales' },
                      { id: 'management', label: 'Management' },
                      { id: 'general', label: 'General Team' }
                    ].map((categ) => (
                      <button
                        key={categ.id}
                        type="button"
                        onClick={() => setJobCategory(categ.id as any)}
                        className={`py-2 px-3 rounded-lg border text-center font-sans tracking-wide transition-all cursor-pointer ${
                          jobCategory === categ.id
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/35 font-bold shadow-md shadow-amber-500/5'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {categ.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 font-mono uppercase tracking-wider">Passive Text Bullet</label>
                  <textarea
                    rows={4}
                    value={rawBullet}
                    onChange={(e) => setRawBullet(e.target.value)}
                    placeholder="e.g. was in charge of our node server and resolved common bugs to make it better"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 placeholder:text-slate-600 focus:border-amber-500/60 focus:outline-none resize-none font-sans leading-relaxed transition-all"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>{rawBullet.trim().split(/\s+/).filter(Boolean).length} words</span>
                    <button 
                      onClick={() => setRawBullet('responsible for a python app and helped the team reduce database bugs')}
                      className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      Use Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Verbs treasury module */}
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-xs text-slate-300 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Icon name="Briefcase" className="text-amber-500" size={14} /> Action Verbs Vault
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal">
                Click any standard action verb to instantly copy and inject into your custom bullet drafts.
              </p>
              <div className="space-y-3 font-sans pt-1">
                {Object.entries(verbTreasury).map(([group, list]) => (
                  <div key={group} className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">{group}</span>
                    <div className="flex flex-wrap gap-1">
                      {list.map(v => (
                        <button
                          key={v}
                          onClick={() => {
                            setRawBullet(prev => v + " " + prev.replace(/^([a-zA-Z\d\s]+?)\s/, ''));
                          }}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950 text-slate-300 hover:text-amber-300 hover:border-amber-500/20 border border-slate-850 hover:-translate-y-0.5 transition-all cursor-pointer"
                          title={`Click to set Bullet starter verb to: "${v}"`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnosis & Suggestions Panel */}
          <div className="lg:col-span-2 space-y-4 font-sans">
            {analysisResult && (
              <>
                {/* Score component Card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 space-y-3.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block">ATS LINGUISTIC STRENGTH</span>
                      <h4 className="font-bold text-slate-105 text-base flex items-center gap-1.5">
                        Linguistic Power Index
                      </h4>
                    </div>
                    
                    <div className="flex items-baseline gap-1 font-mono">
                      <span className={`text-4xl font-extrabold tracking-tight ${
                        analysisResult.score >= 80 ? 'text-emerald-400' :
                        analysisResult.score >= 60 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {analysisResult.score}%
                      </span>
                      <span className="text-xs text-slate-500">/ 100</span>
                    </div>
                  </div>

                  {/* Meter Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-850">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        analysisResult.score >= 80 ? 'bg-emerald-500' :
                        analysisResult.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                      }`} 
                      style={{ width: `${analysisResult.score}%` }}
                    />
                  </div>

                  {/* Diagnosis bullet lines */}
                  <div className="space-y-2.5 pt-1.5">
                    {analysisResult.diagnostics.map((diag, index) => (
                      <div key={index} className="flex gap-2 text-xs leading-relaxed">
                        <span className="shrink-0 mt-0.5">
                          {diag.type === 'success' && <Icon name="Check" className="text-emerald-400" size={14} />}
                          {diag.type === 'warning' && <Icon name="X" className="text-rose-400" size={14} />}
                          {diag.type === 'info' && <Icon name="Shield" className="text-amber-400" size={14} />}
                        </span>
                        <p className={
                          diag.type === 'success' ? 'text-slate-300' :
                          diag.type === 'warning' ? 'text-slate-400 font-medium' :
                          'text-slate-400'
                        }>
                          {diag.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Star Suggestions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase font-mono tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Icon name="Sparkles" className="text-amber-500" size={14} /> High-Impact STAR Variations
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">Formatted for optimal resume templates</span>
                  </div>

                  <div className="space-y-3">
                    {analysisResult.bulletsSuggestions.map((sugg, i) => (
                      <div 
                        key={i}
                        className="p-4 rounded-xl bg-slate-900/20 border border-slate-800/80 hover:border-slate-700/80 transition-all flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-amber-400 uppercase font-bold tracking-widest block">VARIATION {i + 1}</span>
                          <p className="text-xs text-slate-205 leading-relaxed font-sans select-all selection:bg-amber-500/20">
                            {sugg}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy(sugg)}
                          className="p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-amber-300 hover:border-amber-500/25 transition-all shrink-0 cursor-pointer"
                          title="Copy Suggestion"
                        >
                          <Icon name="Copy" size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render Job Tracker Tool
  if (toolId === 'job-tracker') {
    const filteredJobs = jobs.filter(j => 
      j.role.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.notes.toLowerCase().includes(jobSearch.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/60 pb-4 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Icon name="Briefcase" className="text-emerald-400" />
              Job Application Tracker Database
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Maintain, select, and track status stages of all your active professional job pursuits securely offline.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/15 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {jobs.length} Applications Logged
            </span>
          </div>
        </div>

        {/* INPUT FORM AND TRACKER MODULES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create new application sidebar */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Icon name="PlusCircle" className="text-emerald-400" size={16} /> Log New Pursuit
            </h3>
            <form onSubmit={handleAddJob} className="space-y-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase tracking-wider">Role / Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Developer"
                  value={newJob.role}
                  onChange={(e) => setNewJob(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase tracking-wider">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. OpenAI"
                  value={newJob.company}
                  onChange={(e) => setNewJob(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase tracking-wider">Applied Date</label>
                  <input
                    type="date"
                    value={newJob.date}
                    onChange={(e) => setNewJob(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] text-slate-100 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase tracking-wider">Initial Status</label>
                  <select
                    value={newJob.status}
                    onChange={(e) => setNewJob(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interviewing</option>
                    <option value="offered">Offered</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase tracking-wider">Comp / Salary (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. $140,000 - $160,000"
                  value={newJob.salary}
                  onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1 font-mono uppercase tracking-wider">Notes / Target Requirements</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Tech stack: Go, Kubernetes. Multi-round system design focus."
                  value={newJob.notes}
                  onChange={(e) => setNewJob(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer border border-transparent"
              >
                <Icon name="Plus" size={14} /> Log Application
              </button>
            </form>
          </div>

          {/* List display */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search and stats bar */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center gap-3 justify-between">
              <div className="relative w-full sm:max-w-xs select-none">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Icon name="Search" size={14} />
                </div>
                <input
                  type="text"
                  placeholder="Search role, company or notes..."
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-105 focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
                />
              </div>
              <div className="flex gap-1.5 flex-wrap justify-center shrink-0 text-[9px] font-mono">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded border border-blue-500/15">
                  Applied: {jobs.filter(j => j.status === 'applied').length}
                </span>
                <span className="px-2 py-1 bg-yellow-500/10 text-yellow-300 rounded border border-yellow-500/15">
                  Interviews: {jobs.filter(j => j.status === 'interview').length}
                </span>
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/15">
                  Offered: {jobs.filter(j => j.status === 'offered').length}
                </span>
                <span className="px-2 py-1 bg-rose-500/10 text-rose-300 rounded border border-rose-500/15">
                  Declined: {jobs.filter(j => j.status === 'rejected').length}
                </span>
              </div>
            </div>

            {/* List entries */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/10 rounded-2xl border border-slate-850 text-slate-500 text-xs font-mono">
                  No matching career pursuits found inside browser cache.
                </div>
              ) : (
                filteredJobs.map((j) => (
                  <div
                    key={j.id}
                    className="p-4 rounded-xl bg-slate-900/20 border border-slate-800/80 hover:border-slate-750 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
                  >
                    {/* Status accent indicator border */}
                    <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                      j.status === 'applied' ? 'bg-blue-500' :
                      j.status === 'interview' ? 'bg-yellow-500' :
                      j.status === 'offered' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} />

                    <div className="space-y-1.5 pl-2 max-w-full md:max-w-[70%]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-100 text-sm font-sans">{j.role}</h4>
                        <span className="text-xs text-slate-400 font-medium">@ {j.company}</span>
                        {j.salary && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-950 rounded text-slate-400 border border-slate-850">
                            {j.salary}
                          </span>
                        )}
                      </div>
                      {j.notes && <p className="text-xs text-slate-400 leading-relaxed font-sans">{j.notes}</p>}
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={11} /> Applied {j.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      {/* Interactive cycle selector dropdown */}
                      <select
                        value={j.status}
                        onChange={(e) => handleUpdateStatus(j.id, e.target.value as any)}
                        className={`text-xs font-bold font-mono px-2 py-1 rounded-lg border bg-slate-900 text-slate-100 focus:outline-none cursor-pointer ${
                          j.status === 'applied' ? 'text-blue-400 border-blue-500/20' :
                          j.status === 'interview' ? 'text-yellow-400 border-yellow-500/20' :
                          j.status === 'offered' ? 'text-emerald-400 border-emerald-500/20' :
                          'text-rose-400 border-rose-500/20'
                        }`}
                      >
                        <option value="applied">Applied</option>
                        <option value="interview">Interviewing</option>
                        <option value="offered">Offered</option>
                        <option value="rejected">Rejected</option>
                      </select>

                      <button
                        onClick={() => handleDeleteJob(j.id)}
                        className="p-1.5 hover:bg-slate-800 rounded bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete application log"
                      >
                        <Icon name="Trash2" size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render CV tools
  if (toolId === 'ats-cv' || toolId === 'academic-cv' || toolId === 'functional-cv' || toolId === 'one-page-resume' || toolId === 'europass-builder') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/60 pb-4 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <Icon name="FileText" className="text-emerald-400" />
              {toolId === 'ats-cv' && 'ATS-Optimized Resume Builder'}
              {toolId === 'academic-cv' && 'Academic CV Architect'}
              {toolId === 'functional-cv' && 'Skills-Focused Functional CV'}
              {toolId === 'one-page-resume' && 'Concise One-Page Resume Writer'}
              {toolId === 'europass-builder' && 'Europass Layout Assembler'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Active template structure: <span className="text-emerald-400 font-mono text-xs">{toolId.toUpperCase()} Layout</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'edit'
                  ? 'bg-slate-700 text-teal-400 border border-teal-500/20'
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              Configure Details
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-slate-700 text-teal-400 border border-teal-500/20'
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              Interactive Preview
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            >
              <Icon name="Download" size={14} /> Printable Layout
            </button>
          </div>
        </div>

        {activeTab === 'edit' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 backdrop-blur-md">
              <h3 className="text-sm font-semibold text-slate-300 border-b border-slate-700 pb-2">Personal Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => updateProfile('title', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Email Connection</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Mobile Contact</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => updateProfile('phone', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Location City</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => updateProfile('location', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Portfolio Link</label>
                  <input
                    type="text"
                    value={profile.website}
                    onChange={(e) => updateProfile('website', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-xs text-slate-400 mb-1">Professional Summary Profile</label>
                <textarea
                  rows={3}
                  value={profile.summary}
                  onChange={(e) => updateProfile('summary', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>
            </div>

            <div className="space-y-4 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 backdrop-blur-md">
              <h3 className="text-sm font-semibold text-slate-300 border-b border-slate-700 pb-2 flex items-center justify-between">
                <span>Core Hard Skills Metrics</span>
                <span className="text-[10px] text-teal-400">Comma separated lists</span>
              </h3>
              <div>
                <textarea
                  rows={2}
                  value={profile.skills.join(', ')}
                  onChange={(e) => updateProfile('skills', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <h3 className="text-sm font-semibold text-slate-300 border-b border-slate-700 pb-2 mt-4">Professional Roles</h3>
              {profile.experience.map((exp, idx) => (
                <div key={exp.id} className="p-3 bg-slate-900/60 rounded border border-slate-700/40 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Role Title"
                      value={exp.role}
                      onChange={(e) => {
                        const newExp = [...profile.experience];
                        newExp[idx].role = e.target.value;
                        updateProfile('experience', newExp);
                      }}
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => {
                        const newExp = [...profile.experience];
                        newExp[idx].company = e.target.value;
                        updateProfile('experience', newExp);
                      }}
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Bullet point accomplishment 1"
                    value={exp.bullet1}
                    onChange={(e) => {
                      const newExp = [...profile.experience];
                      newExp[idx].bullet1 = e.target.value;
                      updateProfile('experience', newExp);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Bullet point accomplishment 2"
                    value={exp.bullet2}
                    onChange={(e) => {
                      const newExp = [...profile.experience];
                      newExp[idx].bullet2 = e.target.value;
                      updateProfile('experience', newExp);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white text-slate-900 p-8 rounded-xl shadow-2xl border border-slate-100 max-w-[21cm] mx-auto min-h-[29.7cm] flex flex-col justify-between font-sans">
            <div>
              {/* Header */}
              {toolId === 'europass-builder' ? (
                <div className="border-b-4 border-blue-700 pb-4 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">{profile.name}</h1>
                      <p className="text-lg font-bold text-slate-700 tracking-wide uppercase mt-1">EUROPASS CURRICULUM VITAE</p>
                    </div>
                    <span className="text-4xl">🇪🇺</span>
                  </div>
                </div>
              ) : (
                <div className="text-center border-b border-slate-300 pb-6 mb-6">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">{profile.name}</h1>
                  <p className="text-md text-emerald-600 font-medium mt-1">{profile.title}</p>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2 font-mono">
                    <span>{profile.email}</span>
                    <span>•</span>
                    <span>{profile.phone}</span>
                    <span>•</span>
                    <span>{profile.location}</span>
                    <span>•</span>
                    <span>{profile.website}</span>
                  </div>
                </div>
              )}

              {/* Body */}
              <div className="space-y-6">
                {/* Summary (Except Academic CV, which prefers detailed research index) */}
                {toolId !== 'academic-cv' && (
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">Professional Summary</h2>
                    <p className="text-xs text-slate-600 leading-relaxed text-justify">{profile.summary}</p>
                  </div>
                )}

                {/* Skills Sector - top for Functional, bottom for ATS */}
                {toolId === 'functional-cv' && (
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">Core Skills & Competencies</h2>
                    <div className="grid grid-cols-4 gap-2">
                      {profile.skills.map((skill, i) => (
                        <div key={i} className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-center font-mono text-[11px] font-medium border border-slate-200">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience/Role lists */}
                {toolId !== 'functional-cv' && (
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-3">Work History</h2>
                    <div className="space-y-4">
                      {profile.experience.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="text-xs font-bold text-slate-800">{exp.role} — <span className="font-normal text-slate-600">{exp.company}</span></span>
                            <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                          </div>
                          <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600 leading-relaxed">
                            <li>{exp.bullet1}</li>
                            <li>{exp.bullet2}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specific items for Academic CV */}
                {toolId === 'academic-cv' && (
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">Publications & Invited Lectures</h2>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                      {profile.publications.map((pub, idx) => (
                        <li key={idx}>
                          <span className="font-semibold">"{pub.title}"</span>. Published in <span className="italic">{pub.venue}</span> ({pub.year}).
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills section at bottom for non-functional CVs */}
                {toolId !== 'functional-cv' && (
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">Technical Skills & Expertise</h2>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {profile.skills.map((skill, i) => (
                        <span key={i} className="bg-slate-50 text-slate-700 px-2.5 py-1 rounded text-[11px] font-medium border border-slate-200/60">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education Section */}
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">Education & Professional Academics</h2>
                  {profile.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-slate-600 mt-1">
                      <span><span className="font-bold text-slate-800">{edu.degree}</span> — {edu.school}</span>
                      <span className="font-mono text-slate-500">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Print Footer block info */}
            <div className="text-[9px] text-slate-400 border-t border-slate-100 pt-3 text-center font-mono">
              Generated securely with CareerPouch Static Client Toolkit — Optimized for immediate ATS crawlers.
            </div>
          </div>
        )}
      </div>
    );
  }

  // Cover Letter / Resignation Letter / Promotion Memo / References Setup
  const generateLetterText = () => {
    if (toolId === 'cover-letter') {
      return `Dear ${letterConfig.recipientName},\n\nI am writing to express my enthusiastic interest in the ${letterConfig.jobTitle} opportunity listed at ${letterConfig.companyName}. With over 6 years of expertise operating as a professional technical contributor specializing in scale architectures and interactive systems, I feel uniquely qualified to augment your development teams immediately.\n\nIn my previous configurations, I successfully oversaw core enterprise transitions, realizing site execution reductions of up to 42% and keeping application frameworks synchronized across volatile deployment matrices. I specialize in TypeScript, modern state management, and robust developer testing, ensuring that logic remains performant, secure, and ready for global growth.\n\nThank you for your time, consideration, and attention. I look forward to detailing exactly how my background can enhance the core mission values of ${letterConfig.companyName}.\n\nSincerely,\n${profile.name}\n${profile.email}`;
    } else if (toolId === 'resignation-letter') {
      return `Dear Manager,\n\nPlease accept this letter as formal notification that I will be resigning from my position of ${profile.title} at this organization. My final active duty day here is scheduled to be ${letterConfig.resignationLastDay}.\n\nI have reached this decision to support critical upcoming vectors of professional progression, specifically ${letterConfig.resignationReason}. I am deeply grateful for the excellent collaboration, lessons, and milestones we experienced during my tenure here.\n\nDuring this ${letterConfig.resignationNoticeWeeks} transition roadmap, I intend to finalize all pending architectural documentation and transfer operational credentials to team members smoothly to prevent service interruptions.\n\nI wish you and the team continued outstanding successes.\n\nWarm regards,\n\n${profile.name}`;
    } else if (toolId === 'promotion-memo') {
      return `MEMORANDUM\n\nTO: Leadership and Compensations Board\nFROM: ${profile.name}, ${profile.title}\nDATE: June 8, 2026\nSUBJECT: ${letterConfig.memoSubject}\n\nOver the past operating quarters, I have actively led critical infrastructure pipelines to outstanding success. In accordance with my target timeline for professional maturity, I am formally initiating a performance evaluation review to align my Title Scale with Senior/Lead Lead Engineer parameters.\n\nKey Achievements & Contributions:\n- Led cross-functional agile developers to refactor critical systems, speeding up site loading rates by over 42%.\n- Directed robust optimization routines yielding standard reductions of 30% in network traffic payloads.\n- Supported key peer developers, preserving 100% team retention throughout testing sprints.\n\nI invite a formal discussion to align this Title Shift with incoming team milestones.\n\nRespectfully,\n${profile.name}`;
    } else {
      // reference-list
      return `PROFESSIONAL REFERENCES LIST\n\nFor: ${profile.name} (${profile.title})\n\n${profile.references.map((r, i) => `${i+1}. ${r.name}\n   Title: ${r.title}\n   Email: ${r.email}\n   Relationship: ${r.relation}`).join('\n\n')}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/60 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <Icon name={toolId === 'cover-letter' ? 'MailOpen' : toolId === 'resignation-letter' ? 'LogOut' : toolId === 'promotion-memo' ? 'TrendingUp' : 'Users'} className="text-emerald-400" />
            {toolId === 'cover-letter' && 'Dynamic Cover Letter Draftsman'}
            {toolId === 'resignation-letter' && 'Courteous Resignation Letter Writer'}
            {toolId === 'promotion-memo' && 'Promotional Performance Proposal Memo'}
            {toolId === 'reference-list' && 'Professional Reference List Hub'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">Configure criteria details offline inside high-fidelity formats.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleCopy(generateLetterText())}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-teal-400 border border-teal-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          >
            <Icon name="Copy" size={14} /> Copy Document Text
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-700 pb-2">Dynamic Properties</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Your Professional Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none"
              />
            </div>

            {toolId === 'cover-letter' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Recipient Name</label>
                    <input
                      type="text"
                      value={letterConfig.recipientName}
                      onChange={(e) => setLetterConfig(p => ({ ...p, recipientName: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Company Target Name</label>
                    <input
                      type="text"
                      value={letterConfig.companyName}
                      onChange={(e) => setLetterConfig(p => ({ ...p, companyName: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Target Role Title</label>
                  <input
                    type="text"
                    value={letterConfig.jobTitle}
                    onChange={(e) => setLetterConfig(p => ({ ...p, jobTitle: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs"
                  />
                </div>
              </>
            )}

            {toolId === 'resignation-letter' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Notice Scope Period</label>
                    <input
                      type="text"
                      value={letterConfig.resignationNoticeWeeks}
                      onChange={(e) => setLetterConfig(p => ({ ...p, resignationNoticeWeeks: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Last Active Workday Date</label>
                    <input
                      type="text"
                      value={letterConfig.resignationLastDay}
                      onChange={(e) => setLetterConfig(p => ({ ...p, resignationLastDay: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Key Reason of Resignation</label>
                  <input
                    type="text"
                    value={letterConfig.resignationReason}
                    onChange={(e) => setLetterConfig(p => ({ ...p, resignationReason: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs"
                  />
                </div>
              </>
            )}

            {toolId === 'promotion-memo' && (
              <div>
                <label className="block text-xs text-slate-400 mb-1">Memo Focus/Subject</label>
                <input
                  type="text"
                  value={letterConfig.memoSubject}
                  onChange={(e) => setLetterConfig(p => ({ ...p, memoSubject: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs"
                />
              </div>
            )}

            {toolId === 'reference-list' && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-medium font-sans">References Details:</span>
                {profile.references.map((r, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 rounded border border-slate-700/50 space-y-1">
                    <input
                      type="text"
                      value={r.name}
                      onChange={(e) => {
                        const newRefs = [...profile.references];
                        newRefs[idx].name = e.target.value;
                        updateProfile('references', newRefs);
                      }}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100"
                    />
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <input
                        type="text"
                        value={r.title}
                        onChange={(e) => {
                          const newRefs = [...profile.references];
                          newRefs[idx].title = e.target.value;
                          updateProfile('references', newRefs);
                        }}
                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs"
                      />
                      <input
                        type="text"
                        value={r.email}
                        onChange={(e) => {
                          const newRefs = [...profile.references];
                          newRefs[idx].email = e.target.value;
                          updateProfile('references', newRefs);
                        }}
                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between font-mono min-h-[400px]">
          <pre className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-text selection:bg-teal-500 overflow-y-auto max-h-[450px]">
            {generateLetterText()}
          </pre>
          <div className="border-t border-slate-800/80 pt-4 mt-4 flex justify-between items-center">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Icon name="Shield" size={12} className="text-emerald-500" /> SECURE STATICAL MODE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
