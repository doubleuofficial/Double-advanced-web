import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Lyric Puller
  app.post("/api/lyrics/generate", async (req, res) => {
    try {
      const { title, artist, type, genre, description } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ 
          error: "GEMINI_API_KEY is missing. Please add your Gemini API Key in the Settings > Secrets menu." 
        });
      }

      // Lazy load Gemini Client
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Write or find complete lyrics for a ${type || 'song'} titled "${title}" by artist "${artist || 'DoubleU'}".
Genre/Style: ${genre || 'Any'}.
Description/Context: ${description || 'No description provided'}.

Please format your response with clean lyrics, organizing it by sections like [Verse 1], [Chorus], [Verse 2], etc.
If there are official or existing lyrics matching this description, pull them. If not, generate highly poetic, high-fidelity professional-grade lyrics fitting the theme. Do not add any conversational intro or outro text, only output the formatted lyrics.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ lyrics: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate lyrics" });
    }
  });

  // API Route: Social Post Drafter
  app.post("/api/social/generate", async (req, res) => {
    try {
      const { title, artist, type, genre, description, tracks, releaseDate, isrc, upc } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ 
          error: "GEMINI_API_KEY is missing. Please add your Gemini API Key in the Settings > Secrets menu." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const trackListStr = tracks && tracks.length > 0 
        ? tracks.map((t: any) => `- ${typeof t === 'string' ? t : t.title}`).join('\n')
        : 'No tracklist provided';

      const prompt = `You are a professional music marketer and copywriter for "DoubleU", the musical moniker of William Kirby Hartman, a sovereign independent artist from Oklahoma City (military foundation, deep authentic emotional Americana and Hip Hop themes, "No Stories Left Untold" movement).

Write 3 distinct social media post drafts to promote the newly released ${type || 'item'} titled "${title}" by "${artist || 'DoubleU'}".

Release Metadata:
- Title: ${title}
- Release Type: ${type}
- Genre: ${genre || 'Any'}
- Background/Story: ${description || 'No description provided'}
- Release Date: ${releaseDate || '2026'}
- ISRC: ${isrc || 'Pending'}
- UPC: ${upc || 'Pending'}
- Tracks/Highlights:
${trackListStr}

Please generate 3 highly customized drafts exactly as follows:

[X/Twitter Draft]
(Make it high-energy, punchy, maximum 280 characters, includes emotional hook, streaming call to action, and hashtags like #DoubleU #NewMusic #NoStoriesLeftUntold)

[Instagram Draft]
(Make it atmospheric and aesthetic. Start with a striking lyrical or narrative hook, tell a brief story of the song's OKC/military or emotional coordinates, list key tracks or highlights, add a line about link in bio, and include a block of relevant tags)

[Threads/LinkedIn Story Draft]
(Make it reflective, professional, and deeply creative. Tell the story of Hartman's independent artist journey, indexing transitional memories and early ruptures, framing this release as a legal ledger of survival. Focus on independent artistry and creative authenticity)

Format your response using exact header tags [X/Twitter Draft], [Instagram Draft], and [Threads/LinkedIn Story Draft] with the post text directly underneath, and nothing else. Avoid intro/outro comments.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ drafts: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate social media drafts" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
