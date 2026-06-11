import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

// Load local environmental registers
dotenv.config();

import { TOOLS } from "./src/data/toolsData.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to persistent scheduler state
const STATE_FILE = path.join(process.cwd(), "x_poster_state.json");

// Define state structures
interface PostHistory {
  id: string;
  toolId: string;
  toolName: string;
  tweetText: string;
  timestamp: string;
  status: "success" | "simulated" | "failed";
  errorMessage?: string;
}

interface PosterState {
  currentIndex: number;
  lastPostedAt: string | null;
  history: PostHistory[];
  isLoopActive: boolean;
  dailyPostingIntervalMs: number; // Defaults to 24 hours
}

// Read state safely
function loadState(): PosterState {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = fs.readFileSync(STATE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading X poster state, restoring default:", err);
  }
  return {
    currentIndex: 0,
    lastPostedAt: null,
    history: [],
    isLoopActive: true,
    dailyPostingIntervalMs: 24 * 60 * 60 * 1000, // 24 hours
  };
}

// Write state safely
function saveState(state: PosterState) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write state file:", err);
  }
}

// Format tweet for a given tool helper
function formatTweet(tool: any, index: number, totalCount: number, appUrl: string): string {
  const cleanAppUrl = appUrl.replace(/\/$/, "");
  const toolLink = `${cleanAppUrl}/tools/${tool.id}`;
  
  // Custom headers to represent 100+ tools challenge
  const headers = [
    `🚀 Daily Tool Feature — #${index + 1}/${totalCount}! 🛠️`,
    `🔥 Utility Spotlight #${index + 1}: Check this out!`,
    `💡 Problem Solver Series — #${index + 1}/${totalCount} ⚙️`,
    `✨ Useful Developer Tool of the Day — #${index + 1}!`,
    `💼 Career & Developer Stack Challenge — Tool #${index + 1}/${totalCount}`
  ];
  
  const header = headers[index % headers.length];
  
  // Clean description to fit Twitter character limits comfortably (under 280)
  let description = tool.description;
  if (description.length > 130) {
    description = description.slice(0, 127) + "...";
  }

  const categoryHashtags: Record<string, string> = {
    career: "#career #resumewriter #cv #ats #jobs",
    productivity: "#productivity #tasks #workflow #web3",
    math: "#calculators #math #finance #money",
    converters: "#devtools #json #coding #coder #webdev",
    text: "#copywriting #texteditor #regex #seo",
    design: "#uiux #design #svg #pattern #webdesign",
    accounting: "#accounting #fintech #ledger #invoice"
  };

  const hashtags = categoryHashtags[tool.category] || "#productivity #tools #coder";

  return `${header}\n\n👉 ${tool.name}\n"${description}"\n\n🔗 Execute $100% locally here:\n${toolLink}\n\n${hashtags}`;
}

// Core post trigger method
async function executePosting(forceIndex?: number): Promise<PostHistory> {
  const state = loadState();
  const index = forceIndex !== undefined ? forceIndex : state.currentIndex;
  
  const tool = TOOLS[index];
  if (!tool) {
    throw new Error(`Tool index overflow! Total: ${TOOLS.length}, Requested: ${index}`);
  }

  const appUrl = process.env.APP_URL || "https://ais-pre-yzknksjx4dwz4katglbhgy-407490129077.europe-west3.run.app";
  const tweetText = formatTweet(tool, index, TOOLS.length, appUrl);
  
  const record: PostHistory = {
    id: Date.now().toString(),
    toolId: tool.id,
    toolName: tool.name,
    tweetText,
    timestamp: new Date().toISOString(),
    status: "simulated",
  };

  const hasKeys =
    process.env.X_API_KEY &&
    process.env.X_API_KEY_SECRET &&
    process.env.X_ACCESS_TOKEN &&
    process.env.X_ACCESS_TOKEN_SECRET;

  if (hasKeys) {
    try {
      const client = new TwitterApi({
        appKey: process.env.X_API_KEY!,
        appSecret: process.env.X_API_KEY_SECRET!,
        accessToken: process.env.X_ACCESS_TOKEN!,
        accessSecret: process.env.X_ACCESS_TOKEN_SECRET!,
      });

      console.log(`[X Auto-Poster] Sending real tweet for ${tool.name}...`);
      await client.v2.tweet(tweetText);
      record.status = "success";
      console.log(`[X Auto-Poster] Real tweet successfully posted for ${tool.name}.`);
    } catch (err: any) {
      console.error(`[X Auto-Poster] Twitter API execution error for ${tool.name}:`, err);
      record.status = "failed";
      record.errorMessage = err.message || JSON.stringify(err);
    }
  } else {
    console.log(`[X Auto-Poster] X API keys NOT configured. Logged ${tool.name} post as Simulated.`);
    record.status = "simulated";
    record.errorMessage = "X API secrets (X_API_KEY, etc.) are currently unprovided. Configured as Simulated draft mode.";
  }

  // Update indices and times
  state.lastPostedAt = new Date().toISOString();
  state.history.unshift(record);
  
  // Truncate history log to 100 entries to prevent memory leak
  if (state.history.length > 100) {
    state.history = state.history.slice(0, 100);
  }

  // Handle loop rotation automatically
  if (forceIndex === undefined) {
    let nextIndex = state.currentIndex + 1;
    if (nextIndex >= TOOLS.length) {
      nextIndex = 0; // LOOP BACK to index 0 dynamically as requested
    }
    state.currentIndex = nextIndex;
  }

  saveState(state);
  return record;
}

// Initialize active background scheduler polling
function runBackgroundScheduler() {
  console.log("[X Auto-Poster] Initiating background scheduling interval check.");
  
  // Check every 10 minutes
  setInterval(async () => {
    try {
      const state = loadState();
      if (!state.isLoopActive) return;

      const now = Date.now();
      const lastPosted = state.lastPostedAt ? new Date(state.lastPostedAt).getTime() : 0;
      const interval = state.dailyPostingIntervalMs;

      if (now - lastPosted >= interval) {
        console.log("[X Auto-Poster] Automated scheduled daily posting threshold met. Triggering now.");
        await executePosting();
      }
    } catch (err) {
      console.error("[X Auto-Poster] Scheduler worker exception caught:", err);
    }
  }, 10 * 60 * 1000);
}

// Start scheduler in background on server boot
runBackgroundScheduler();

// API Endpoints
app.get("/api/x/state", (req, res) => {
  const state = loadState();
  res.json({
    currentIndex: state.currentIndex,
    lastPostedAt: state.lastPostedAt,
    isLoopActive: state.isLoopActive,
    totalTools: TOOLS.length,
    nextTool: TOOLS[state.currentIndex] || null,
    history: state.history,
    keysConfigured: !!(
      process.env.X_API_KEY &&
      process.env.X_API_KEY_SECRET &&
      process.env.X_ACCESS_TOKEN &&
      process.env.X_ACCESS_TOKEN_SECRET
    ),
  });
});

app.post("/api/x/post-now", async (req, res) => {
  try {
    const record = await executePosting();
    res.json({ success: true, record });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/x/post-specific", async (req, res) => {
  try {
    const { index } = req.body;
    if (index === undefined || index < 0 || index >= TOOLS.length) {
      return res.status(400).json({ success: false, error: "Invalid tool index requested." });
    }
    const record = await executePosting(index);
    res.json({ success: true, record });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/x/toggle-loop", (req, res) => {
  const state = loadState();
  state.isLoopActive = !state.isLoopActive;
  saveState(state);
  res.json({ success: true, isLoopActive: state.isLoopActive });
});

app.post("/api/x/set-index", (req, res) => {
  const { index } = req.body;
  if (index === undefined || index < 0 || index >= TOOLS.length) {
    return res.status(400).json({ success: false, error: "Invalid tool index requested." });
  }
  const state = loadState();
  state.currentIndex = index;
  saveState(state);
  res.json({ success: true, currentIndex: state.currentIndex, nextTool: TOOLS[index] });
});

// Serve frontend with Vite dev middleware / static client fallback
async function bootServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Core applet running on http://localhost:${PORT}`);
  });
}

bootServer();
