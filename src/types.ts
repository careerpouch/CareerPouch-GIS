export type CategoryType = 'career' | 'productivity' | 'math' | 'converters' | 'text' | 'design' | 'accounting';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: CategoryType;
  icon: string; // Lucide icon name, we'll map them dynamically or render them safely
}

export interface CategorySpec {
  id: CategoryType;
  name: string;
  description: string;
  color: string;
}

export const CATEGORIES: CategorySpec[] = [
  { id: 'career', name: 'Career Builders', description: 'ATS Resumes, CV Builders, and Letter Drafts', color: 'from-emerald-500 to-teal-600' },
  { id: 'productivity', name: 'Productivity & Workflows', description: 'Kanban boards, timers, and local coordinators', color: 'from-blue-500 to-indigo-600' },
  { id: 'math', name: 'Math & Estimations', description: 'Formula evaluators, graphers, and factor math', color: 'from-pink-500 to-rose-600' },
  { id: 'converters', name: 'Format & Data Converters', description: 'Convert bases, epoch, CSV, JSON, and XML', color: 'from-amber-500 to-orange-600' },
  { id: 'text', name: 'Text & Content Utilities', description: 'Diff viewers, encoders, and word counters', color: 'from-violet-500 to-fuchsia-600' },
  { id: 'design', name: 'Design & Styling Sandboxes', description: 'Color pickers, Flexbox, glass, and SVG minifiers', color: 'from-cyan-500 to-blue-600' },
  { id: 'accounting', name: 'Accounting & Finance', description: 'Double-entry ledgers, break-even graphs, and tax estimates', color: 'from-slate-705 to-sky-750' }
];
