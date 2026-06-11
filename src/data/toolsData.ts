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
  {
    id: 'crypto-gas-converter',
    name: 'Ethereum Gwei & Token Gas Calculator',
    description: 'Estimate Web3 and crypto transactional gas price metrics between Gwei, Wei, Ether, and gas limit thresholds instantly.',
    category: 'converters',
    icon: 'Coins'
  },
  {
    id: 'file-header-extractor',
    name: 'File Magic Byte Signature Extractor',
    description: 'Analyze hex headers and magic byte sequences client-side to dynamically identify file types (JPG, PDF, PNG, etc.).',
    category: 'converters',
    icon: 'Binary'
  },
  {
    id: 'yaml-json',
    name: 'YAML ⇄ JSON Bidirectional Config Parser',
    description: 'Transform hierarchical YAML settings streams into standard structural JSON and back without syntax loss.',
    category: 'converters',
    icon: 'FileCode'
  },
  {
    id: 'toml-json',
    name: 'TOML ⇄ JSON Cargo & PyProject Converter',
    description: 'Convert Rust Cargo or Python PyProject TOML configuration arrays seamlessly into standardized JSON.',
    category: 'converters',
    icon: 'Settings'
  },
  {
    id: 'url-parser',
    name: 'Advanced URL Query & UTMs Decoder',
    description: 'Parse heavy URL query strings into nested visual key-value grids, with full UTM parameter and encoding decode support.',
    category: 'converters',
    icon: 'Globe'
  },
  {
    id: 'unicode-lookup',
    name: 'Hidden Unicode & Invisible Space Finder',
    description: 'Detect Zero-Width spaces, non-breaking strings, or hidden emojis within letters and print their escape syntax.',
    category: 'converters',
    icon: 'Search'
  },
  {
    id: 'html-markdown',
    name: 'HTML ⇄ Markdown Bidirectional Converter',
    description: 'Convert direct rich HTML elements into clean readable Markdown strings, or render Markdown into structured HTML.',
    category: 'converters',
    icon: 'FileText'
  },
  {
    id: 'csv-ascii',
    name: 'CSV ⇄ Markdown Table & ASCII Grid',
    description: 'Convert spreadsheet-styled CSV lines into developer-ready ASCII text grids or Markdown table rows.',
    category: 'converters',
    icon: 'Table'
  },
  {
    id: 'chmod-translator',
    name: 'UNIX Chmod Permission Translator',
    description: 'Translate chmod octal code integers (755) to symbolic flags (rwxr-xr-x) and back with visual group checkmarks.',
    category: 'converters',
    icon: 'Shield'
  },
  {
    id: 'pdf-to-word',
    name: 'Clientside PDF to Word Creator',
    description: 'A highly advanced client-side simulator that parses raw document layout segments and saves them into clean editable DOC outlines.',
    category: 'converters',
    icon: 'FileCode'
  },
  {
    id: 'word-to-markdown',
    name: 'Docx Word to Markdown Plain-text Extractor',
    description: 'Extract direct paragraphs and structure from Word formats and map them to clean Markdown layout headings.',
    category: 'converters',
    icon: 'FileCode'
  },
  {
    id: 'json-to-excel',
    name: 'Nested JSON to CSV/Excel Flattening Grid',
    description: 'Surgically flatten multi-layered JSON hierarchies into clean spreadsheet tables ready for Excel download.',
    category: 'converters',
    icon: 'Grid'
  },
  {
    id: 'hex-rgb-visualizer',
    name: 'Visual Hex ⇄ Color Space Spectrometer',
    description: 'Translate complex HEX values directly to HSL/RGBA/CMYK with side-by-side color matching and tone variations.',
    category: 'converters',
    icon: 'Palette'
  },
  {
    id: 'css-to-tailwind',
    name: 'Surgical CSS-to-Tailwind Class Mapper',
    description: 'Translate standard CSS layout declarations (e.g., flex-direction: column) into their exact Tailwind utility counterpart.',
    category: 'converters',
    icon: 'Sparkles'
  },
  {
    id: 'img-format-inspector',
    name: 'Image Extension & Compression Inspector',
    description: 'Simulate size-per-format compression ratios (PNG, JPG, WebP, AVIF) at custom quality degradation sliders.',
    category: 'converters',
    icon: 'Image'
  },
  {
    id: 'pdf-text-extractor',
    name: 'Local PDF Plain-Text Harvester',
    description: 'Paste file structures or process local raw text configurations out of PDFs using local canvas text metrics.',
    category: 'converters',
    icon: 'FileText'
  },
  {
    id: 'base-multi-encoder',
    name: 'Base32 / Base58 / Base85 Multi-Protocol Packer',
    description: 'Convert data strings into professional cryptographic formats used in IPFS, Bitcoin, and Git environments.',
    category: 'converters',
    icon: 'Key'
  },
  {
    id: 'hex-utf8',
    name: 'Hex Hexadecimal ⇄ UTF-8 Character Decoder',
    description: 'Translate continuous streams of hexadecimal numbers into clean readable UTF-8 text and detailed byte layouts.',
    category: 'converters',
    icon: 'Binary'
  },
  {
    id: 'xml-yaml',
    name: 'XML ⇄ YAML Cloud Configuration Bridge',
    description: 'Format heavy enterprise XML payloads directly into tidy, modern DevOps-compliant YAML files instantly.',
    category: 'converters',
    icon: 'FileCode'
  },
  {
    id: 'cidr-subnet',
    name: 'CIDR IPv4 Subnet Mask Splitter',
    description: 'Deconstruct IP addresses and subnet masks to calculate host ranges, broadcast addresses, and CIDR notation values.',
    category: 'converters',
    icon: 'Globe'
  },
  {
    id: 'gzip-simulator',
    name: 'Gzip / Deflate Compression Calculator',
    description: 'Paste heavy scripts or payloads to calculate raw compression efficiency ratios and byte savings locally.',
    category: 'converters',
    icon: 'TrendingUp'
  },
  {
    id: 'morse-nato',
    name: 'Morse Code & NATO Phonetic Alphabet Parser',
    description: 'Bi-directionally translate text strings into soundable Morse code dots or international NATO military spelling lists.',
    category: 'converters',
    icon: 'Volume2'
  },
  {
    id: 'svg-react-transformer',
    name: 'SVG Code ⇄ React JSX component Sanitizer',
    description: 'Clean messy vector drawings, remove XML parameters, and translate them into ready-to-use reusable React components.',
    category: 'converters',
    icon: 'Sparkles'
  },
  {
    id: 'sql-ddl-to-json',
    name: 'SQL DDL Schema ⇄ JSON schema Translator',
    description: 'Parse raw database CREATE TABLE statements to output structured JSON models and relational schemas.',
    category: 'converters',
    icon: 'Database'
  },
  {
    id: 'color-contrast-wcag',
    name: 'WCAG AAA Color Contrast & Accessibility Checker',
    description: 'Calculate the precise visual contrast ratio between any foreground and background color for digital accessibility.',
    category: 'converters',
    icon: 'Sliders'
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
  },
  // NEW CAREER TOOLS (3)
  {
    id: 'ai-interview-helper',
    name: 'AI Interactive Interview Simulator',
    description: 'Practice virtual interviews with AI-generated role questions and local grading frameworks.',
    category: 'career',
    icon: 'MessageSquareCode'
  },
  {
    id: 'salary-estimator',
    name: 'Salary Negotiation Offer Evaluator',
    description: 'Calculate real compensation packages and prepare tactical email counter-offers based on industry percentiles.',
    category: 'career',
    icon: 'TrendingUp'
  },
  {
    id: 'linkedin-optimizer',
    name: 'AI LinkedIn Profiles & Headings Optimizer',
    description: 'Optimize social visibility and SEO metrics for recruiters through high-CTR job headlines.',
    category: 'career',
    icon: 'Sparkles'
  },
  {
    id: 'ai-keyword-detector',
    name: 'AI Job Post Keyword & Skill Match Detector',
    description: 'Scan job descriptions to extract critical skills and audit your CV keywords to beat Applicant Tracking Systems (ATS).',
    category: 'career',
    icon: 'Sparkles'
  },
  // NEW PRODUCTIVITY TOOLS (4)
  {
    id: 'meeting-agenda',
    name: 'Meeting Agenda & Objective Architect',
    description: 'Create high-yield business meeting designs with time boxing, goals, and outline structures.',
    category: 'productivity',
    icon: 'ListChecks'
  },
  {
    id: 'project-timeline',
    name: 'Project Milestone Gantt Visualizer',
    description: 'Build responsive linear chronological schedules, work items, and visual deliverables.',
    category: 'productivity',
    icon: 'Activity'
  },
  {
    id: 'daily-standup',
    name: 'Daily Standup Update Composer',
    description: 'Pre-compile concise and professional standup logs (Yesterday, Today, Blockers) for engineering teams.',
    category: 'productivity',
    icon: 'CheckSquare'
  },
  {
    id: 'ai-weekly-report',
    name: 'Executive Work Log Weekly Summarizer',
    description: 'Transform informal daily notes into polished, stakeholder-ready corporate bullet points.',
    category: 'productivity',
    icon: 'Sparkles'
  },
  // NEW MATH TOOLS (3)
  {
    id: 'finance-compound',
    name: 'Compound Interest Exponential Planner',
    description: 'Calculate interest growth profiles, principal additions, and visualize wealth growth charts.',
    category: 'math',
    icon: 'LineChart'
  },
  {
    id: 'unit-ratio-mixer',
    name: 'Proportional Dilution & Scale Mixer',
    description: 'Compute precise ratio dilutions, compound scales, and proportional measurements side-by-side.',
    category: 'math',
    icon: 'Sliders'
  },
  {
    id: 'cryptography-hasher',
    name: 'MD5 / SHA-256 Checksum Multi-Hasher',
    description: 'Generate secure hex digests and cryptographic checksums for text passages locally.',
    category: 'math',
    icon: 'Hash'
  },
  // NEW CONVERTER TOOLS (8)
  {
    id: 'color-palette-extractor',
    name: 'Image Dominant Color Space Extractor',
    description: 'Upload or drag images to extract beautiful matching color palettes with HEX/RGB tags.',
    category: 'converters',
    icon: 'Palette'
  },
  {
    id: 'protobuf-json',
    name: 'Protocol Buffers (Protobuf) ⇄ JSON Parser',
    description: 'Translate serialized microservice schema objects bidirectionally to standard JSON trees.',
    category: 'converters',
    icon: 'Database'
  },
  {
    id: 'dns-record-parser',
    name: 'DNS Zone Config & Records Formatter',
    description: 'Read and format raw nameserver host zone strings into clear responsive charts.',
    category: 'converters',
    icon: 'Globe'
  },
  {
    id: 'binary-image-viewer',
    name: 'Binary Hex ⇄ Graphical Canvas Synth',
    description: 'Reconstruct visual bitmaps and raw canvas drawings out of structured database array codes.',
    category: 'converters',
    icon: 'Image'
  },
  {
    id: 'nginx-config-explainer',
    name: 'Nginx Config Router Schema Explainer',
    description: 'Deconstruct webserver proxy rules, location blocks, and server headers into clean diagrams.',
    category: 'converters',
    icon: 'FileCode'
  },
  {
    id: 'user-agent-parser',
    name: 'Browser User-Agent Metadata Analyzer',
    description: 'Parse raw browser client strings to map secure device hardware, operating system, and engine states.',
    category: 'converters',
    icon: 'Laptop'
  },
  {
    id: 'semver-checker',
    name: 'Semantic Version (SemVer) Range Audits',
    description: 'Evaluate matching package ranges and dependency updates under Node/Cargo semver constraints.',
    category: 'converters',
    icon: 'Settings'
  },
  {
    id: 'sql-formatter',
    name: 'SQL Database Statement Formatter',
    description: 'Reformat raw or messy SQL queries into highly readable, syntax-beautified statements.',
    category: 'converters',
    icon: 'Database'
  },
  // NEW TEXT TOOLS (5)
  {
    id: 'ai-cold-email',
    name: 'AI Smart Sales Cold Outreach Composer',
    description: 'Design premium business outreach templates tailored to target high-CTR replies.',
    category: 'text',
    icon: 'Sparkles'
  },
  {
    id: 'ai-text-hooks',
    name: 'AI Copywriting Headline & Hook Crafter',
    description: 'Formulate high-conversion headlines and social hooks for news, blogs, or platforms.',
    category: 'text',
    icon: 'Sparkles'
  },
  {
    id: 'text-anonymizer',
    name: 'PII Personal Sensitive Information Sanitize',
    description: 'Obfuscate names, email codes, debit figures, and private keys from corporate texts prior to system copy.',
    category: 'text',
    icon: 'EyeOff'
  },
  {
    id: 'word-scrambler',
    name: 'Word Character Permutation Solver',
    description: 'Analyze anagram letter clusters to identify dictionary outcomes and character possibilities.',
    category: 'text',
    icon: 'Type'
  },
  {
    id: 'lorem-ipsum',
    name: 'Aesthetic Lorem Ipsum Dummy Generator',
    description: 'Produce pristine structural text paragraphs, words, and codes to populate draft templates.',
    category: 'text',
    icon: 'FileText'
  },
  {
    id: 'ai-hashtag-generator',
    name: 'AI Social Hashtag Generator & Planner',
    description: 'Create hyper-targeted, high-engagement trending hashtags and optimized social snippets instantly from raw drafts or documents.',
    category: 'text',
    icon: 'Sparkles'
  },
  // NEW DESIGN TOOLS (4)
  {
    id: 'ai-image-upscaler',
    name: 'AI Intelligent Image Upscaler (Super-Resolution)',
    description: 'Double details and scale photo resolutions using client-side bicubic rendering and digital sharpening filters.',
    category: 'design',
    icon: 'Sparkles'
  },
  {
    id: 'ai-bg-remover',
    name: 'AI Intelligent Image Background Purger',
    description: 'Purge background environments using smart chroma keying and color-similarity canvas masking.',
    category: 'design',
    icon: 'Sparkles'
  },
  {
    id: 'svg-pattern-generator',
    name: 'Aesthetic Tileable SVG Pattern Maker',
    description: 'Create harmonious vector backgrounds with customizable geometric patterns and parameters.',
    category: 'design',
    icon: 'Grid'
  },
  {
    id: 'css-shadow-creator',
    name: 'CSS Box Shadow Ultimate Layover Studio',
    description: 'Create multi-layered soft natural shadows to export professional modern container classes.',
    category: 'design',
    icon: 'Sparkles'
  },
  {
    id: 'github-readme-designer',
    name: 'GitHub Profile README Builder',
    description: 'Design a highly optimized, fully responsive markdown portfolio file for your developer GitHub profile.',
    category: 'career',
    icon: 'Github'
  },
  {
    id: 'elevator-pitch',
    name: 'Elevator Pitch & Intro Writer',
    description: 'Compose a compact and highly persuasive 30-second introduction targeting recruiters and hiring managers.',
    category: 'career',
    icon: 'UserCheck'
  },
  {
    id: 'weekly-status',
    name: 'Weekly Corporate Status Reporter',
    description: 'Convert raw highlights and daily notes into a professional, well-structured corporate status email.',
    category: 'productivity',
    icon: 'Clock'
  },
  // ACCOUNTING: 4 tools
  {
    id: 'ledger-simulator',
    name: 'Double-Entry Ledger Simulator',
    description: 'Structure debit and credit pairs to record double-entry transactions and dynamically update the general ledger.',
    category: 'accounting',
    icon: 'Receipt'
  },
  {
    id: 'breakeven-calc',
    name: 'Break-Even & Profit Margin Calculator',
    description: 'Calculate unit contribution margins, margins ratios, and volume profit sensitivities.',
    category: 'accounting',
    icon: 'LineChart'
  },
  {
    id: 'depreciation-planner',
    name: 'Creative Asset Depreciation Scheduler',
    description: 'Map out Straight Line, Double Declining Balance, and Sum-of-the-Years\'-Digits schedules.',
    category: 'accounting',
    icon: 'Table'
  },
  {
    id: 'tax-estimator',
    name: 'Freelance Net Income & Quarterly Tax Advisor',
    description: 'Input freelance revenues, calculate deductions, self-employment tax, and estimated quarterly IRS vouchers.',
    category: 'accounting',
    icon: 'Coins'
  },
  {
    id: 'salary-deductions',
    name: 'Salary Paycheck Deduction Calculator',
    description: 'Calculate gross-to-net paychecks with federal, state, Social Security, Medicare, and benefit holding deductions.',
    category: 'accounting',
    icon: 'Briefcase'
  },
  {
    id: 'compounding-calc',
    name: 'Investment Compound Interest Calculator',
    description: 'Track compound capital growth over years with customizable deposit timelines and interest rates.',
    category: 'accounting',
    icon: 'LineChart'
  },
  {
    id: 'savings-profit',
    name: 'Savings Profit Tax-Adjusted Calculator',
    description: 'Structure tax-withholding savings yields to forecast actual net APY gains and account growth.',
    category: 'accounting',
    icon: 'TrendingUp'
  }
];
