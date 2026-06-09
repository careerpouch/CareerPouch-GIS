import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // CAREER: 9 tools
  {
    id: 'ats-cv',
    name: 'ATS Resume Writer',
    description: 'Build a parse-optimized, clean resume crafted specifically to score highly on Applicant Tracking Systems (ATS).',
    category: 'career',
    icon: 'FileText'
  },
  {
    id: 'academic-cv',
    name: 'Academic CV Architect',
    description: 'Design a professional Curriculum Vitae featuring detailed research, publications, teaching history, and educational milestones.',
    category: 'career',
    icon: 'GraduationCap'
  },
  {
    id: 'functional-cv',
    name: 'Functional CV Builder',
    description: 'Focus on your core competencies, hard skills, and technical achievements rather than just linear historical work chronology.',
    category: 'career',
    icon: 'Briefcase'
  },
  {
    id: 'one-page-resume',
    name: 'One-Page Resume',
    description: 'A space-efficient, pixel-perfect single-page CV layout designed to present your background concisely for quick reviews.',
    category: 'career',
    icon: 'Layers'
  },
  {
    id: 'europass-builder',
    name: 'Europass Resume Creator',
    description: 'Format your professional profile into the standardized European Europass format, ready for EU opportunities.',
    category: 'career',
    icon: 'Globe'
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Generator',
    description: 'Draft persuasive, targeted, and highly personalized cover letters designed to align your experience with job requirements.',
    category: 'career',
    icon: 'MailOpen'
  },
  {
    id: 'resignation-letter',
    name: 'Resignation Letter Draft',
    description: 'Compose smooth, courteous, and highly professional resignation letters to maintain robust workplace relationships.',
    category: 'career',
    icon: 'LogOut'
  },
  {
    id: 'promotion-memo',
    name: 'Promotion Memo Writer',
    description: 'Structure performance data and leadership contributions to persuasively pitch your upcoming title upgrade or raises.',
    category: 'career',
    icon: 'TrendingUp'
  },
  {
    id: 'reference-list',
    name: 'Reference List Manger',
    description: 'Organize structural professional contact references and compile them into standardized, presentable submission lists.',
    category: 'career',
    icon: 'Users'
  },
  {
    id: 'job-tracker',
    name: 'Job Application Tracker',
    description: 'Track your career applications, salaries, interviewing stages, and task notes securely inside local sandboxed database memory.',
    category: 'career',
    icon: 'Briefcase'
  },
  {
    id: 'ai-bullet-optimizer',
    name: 'AI Resume Bullet Optimizer',
    description: 'Transform passive work details into high-impact, metrics-driven STAR resume bullet points instantly using smart offline linguistic algorithms.',
    category: 'career',
    icon: 'Sparkles'
  },

  // PRODUCTIVITY: 5 tools (including invoice generator / email wireframer / pomodoro / password-vault / timezone-coordinator / kanban)
  // Let's list the productivity category tools
  {
    id: 'kanban-board',
    name: 'Kanban Task Board',
    description: 'Manage tasks dynamically using drag-like custom card columns with interactive state management and local memory.',
    category: 'productivity',
    icon: 'Trello'
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro Focus Timer',
    description: 'Stay highly productive with customizable session times, active intervals, aesthetic focus tickers, and built-in alerts.',
    category: 'productivity',
    icon: 'Timer'
  },
  {
    id: 'password-vault',
    name: 'Password Generator & Vault',
    description: 'Generate production-ready cryptography-grade passwords and store them securely inside local browser state.',
    category: 'productivity',
    icon: 'Key'
  },
  {
    id: 'timezone-coordinator',
    name: 'Timezone Coordinator',
    description: 'Simulate and sync business meeting hours across global time offsets side-by-side using dynamic sliders.',
    category: 'productivity',
    icon: 'Clock'
  },
  {
    id: 'invoice-generator',
    name: 'Professional Invoice Generator',
    description: 'Build downloadable high-fidelity PDF-ready commercial invoices with custom items, VAT, and company details.',
    category: 'productivity',
    icon: 'Receipt'
  },
  {
    id: 'email-wireframer',
    name: 'Email & Letter Wireframer',
    description: 'Plan layout wireframes for newsletters or letters block-by-block with standard header/body placeholders.',
    category: 'productivity',
    icon: 'Layout'
  },
  {
    id: 'cron-generator',
    name: 'Cron Generator & Explainer',
    description: 'Build correct UNIX cron planning expressions interactively and decode them instantly into precise plain English.',
    category: 'productivity',
    icon: 'Clock'
  },

  // MATH: 6 tools
  {
    id: 'matrix-calculator',
    name: 'Matrix Calculator',
    description: 'Calculate matrix determinants, additions, subtractions, and products for matrices up to 3x3 instantly.',
    category: 'math',
    icon: 'Grid'
  },
  {
    id: 'graph-plotter',
    name: 'Graph Function Plotter',
    description: 'Visualize custom user functions like sin(x), quadratic, or linear equations on a responsive interactive canvas stage.',
    category: 'math',
    icon: 'LineChart'
  },
  {
    id: 'formula-evaluator',
    name: 'Formula Evaluator',
    description: 'Parse mathematical expressions of custom variables and evaluate numerical results dynamically with live precision.',
    category: 'math',
    icon: 'Calculator'
  },
  {
    id: 'fraction-simplifier',
    name: 'Fraction Simplifier',
    description: 'Convert any fraction to its simplest possible prime format and view decimal equivalence steps.',
    category: 'math',
    icon: 'Percent'
  },
  {
    id: 'prime-factorization',
    name: 'Prime Factorizer',
    description: 'Extract standard prime number constituents of large numeric figures using standard recursive algorithm grids.',
    category: 'math',
    icon: 'Hash'
  },
  {
    id: 'stat-analyzer',
    name: 'Statistical Analyzer',
    description: 'Calculate average metrics like mean, median, mode, variance, and standard deviation for any discrete data set.',
    category: 'math',
    icon: 'BarChart4'
  },
  {
    id: 'luhn-validator',
    name: 'Luhn Card & Digit Validator',
    description: 'Verify credit card, debit, and IMEI numbers using the Luhn check digit algorithm with visual mathematical steps.',
    category: 'math',
    icon: 'Hash'
  },

  // CONVERTERS: 10 tools
  {
    id: 'base-switcher',
    name: 'Radix Base Switcher',
    description: 'Seamlessly convert metrics between Binary, Octal, Decimal, and Hexadecimal numbers instantly.',
    category: 'converters',
    icon: 'Shuffle'
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder & Decoder',
    description: 'Live encode target texts or file descriptors to Base64 formatting strings or decode them back safely.',
    category: 'converters',
    icon: 'Binary'
  },
  {
    id: 'case-converter',
    name: 'Smart Case Converter',
    description: 'Instantly transform key strings into CamelCase, kebab-case, snake_case, UPPERCASE, lowercase, and Title Case.',
    category: 'converters',
    icon: 'Type'
  },
  {
    id: 'csv-json',
    name: 'CSV ⇄ JSON Converter',
    description: 'Convert tabular CSV lists into structural hierarchical JSON matrices and tables bidirectionally.',
    category: 'converters',
    icon: 'Database'
  },
  {
    id: 'epoch-converter',
    name: 'Unix Epoch Stamp Tool',
    description: 'Translate raw epoch timestamps into gorgeous human-readable dates and output target timestamps.',
    category: 'converters',
    icon: 'CalendarDays'
  },
  {
    id: 'json-sql',
    name: 'JSON ⇄ SQL Command Parser',
    description: 'Formulate clean SQL insert queries and statement templates directly out of standardized JSON arrays.',
    category: 'converters',
    icon: 'FileCode'
  },
  {
    id: 'jwt-inspector',
    name: 'JWT JSON Token Inspector',
    description: 'Decode and inspect JSON Web Tokens (JWT) locally to examine headers, claim payloads, and signatures.',
    category: 'converters',
    icon: 'ShieldAlert'
  },
  {
    id: 'xml-json',
    name: 'XML ⇄ JSON Converter',
    description: 'Format standard XML tree structures into functional JSON strings and vice-versa with indentation rules.',
    category: 'converters',
    icon: 'Code2'
  },
  {
    id: 'currency-calc',
    name: 'Smart Currency Rates Calc',
    description: 'Calculate international exchanges across standard fiat markers with customized offline conversions.',
    category: 'converters',
    icon: 'Coins'
  },
  {
    id: 'unit-converter',
    name: 'Unified Unit Converter',
    description: 'Swap metrics seamlessly across Length, Temperature, Mass, Area, Volume, and Data Storage systems.',
    category: 'converters',
    icon: 'Scale'
  },
  {
    id: 'json-validator',
    name: 'JSON Validator & Beautifier',
    description: 'Parse raw text for structural JSON schema compliance, inspect syntax errors, and beautify layout strings.',
    category: 'converters',
    icon: 'Braces'
  },

  // TEXT: 5 tools (including word-counter, text-diff, html-entity, markdown-html, svg-optimizer)
  {
    id: 'word-counter',
    name: 'Advance Word Counter',
    description: 'Extract dynamic metrics on characters, words, paragraphs, lines, estimated reading time, and word density indices.',
    category: 'text',
    icon: 'SpellCheck'
  },
  {
    id: 'text-diff',
    name: 'Visual Text Diff Viewer',
    description: 'Compare two text passages side-by-side with clear character-level differences highlighted dynamically.',
    category: 'text',
    icon: 'Split'
  },
  {
    id: 'html-entity',
    name: 'HTML Entities Encoder',
    description: 'Safe-encode HTML reserved characters to safe numeric entities or decode raw codes back to viewable elements.',
    category: 'text',
    icon: 'Braces'
  },
  {
    id: 'markdown-html',
    name: 'Markdown Live Editor',
    description: 'Compose clean markdown and watch the dynamic HTML output render side-by-side with clean typography.',
    category: 'text',
    icon: 'Eye'
  },
  {
    id: 'svg-optimizer',
    name: 'SVG Code Optimizer',
    description: 'Clean excess path code from raw SVG files, strip metadata, optimize viewing stages, and preview clean nodes inline.',
    category: 'text',
    icon: 'Maximize'
  },
  {
    id: 'regex-tester',
    name: 'RegEx Tester & Match Explainer',
    description: 'Fiddle with regular expressions against passage texts with live highlights, capture groups, and code breakdowns.',
    category: 'text',
    icon: 'Search'
  },

  // DESIGN: 6 tools (including color-palette, glassmorphism, flexbox-grid, favicon-generator, hex-rgb-cmyk)
  {
    id: 'color-palette',
    name: 'Color Palette Designer',
    description: 'Create harmonious 5-color accent palettes, lock core tints, test contrast, and export Hex lists.',
    category: 'design',
    icon: 'Palette'
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism Style Generator',
    description: 'Fiddle with background blurs, saturation levels, transparent borders, and box shadows to copy beautiful modern CSS.',
    category: 'design',
    icon: 'Sparkles'
  },
  {
    id: 'flexbox-grid',
    name: 'Flexbox & CSS Grid Sandbox',
    description: 'Visualize CSS layouts interactively by editing containers, gap size, aligned items, and item directions in micro-grids.',
    category: 'design',
    icon: 'LayoutGrid'
  },
  {
    id: 'favicon-generator',
    name: 'Multi-Size Favicon Draft',
    description: 'Generate standard favicon sizes, emojis setups, or icon configurations from your custom textual parameters.',
    category: 'design',
    icon: 'Image'
  },
  {
    id: 'hex-rgb-cmyk',
    name: 'Color Space Swapper',
    description: 'Translate colors seamlessly inside Hex, RGB, CMYK, and HSL formatting states for layout assets.',
    category: 'design',
    icon: 'Paintbrush'
  },
  {
    id: 'qr-generator',
    name: 'QR Code & WiFi Card Badge Maker',
    description: 'Generate customizable dynamic QR Codes for normal URLs, details, or direct safe home WiFi access layouts.',
    category: 'design',
    icon: 'Image'
  }
];
