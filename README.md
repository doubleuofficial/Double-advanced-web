# DoubleU Publishing & SEO Admin Console

Welcome to the DoubleU Artist Publishing & Search Engine Optimization Console. This system is engineered to provide sovereign independent artist William Kirby Hartman ("DoubleU") with robust tools to control metadata, optimize search crawlability, and automate multi-channel social media promotion campaigns.

---

## 🔑 Required API Keys & Credentials

To fully unlock the capabilities of the automated systems, you need to configure the following environment variable:

| Environment Variable | Category | Purpose | Setup Location |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Secret | Powers the social media copywriter model, translating discography metadata into punchy social content. | **AI Studio Settings > Secrets** |

> ⚠️ **Important Security Guardrail**: The `GEMINI_API_KEY` is loaded exclusively on the Node.js Express server (`server.ts`). It is never exposed, rendered, or passed down to the client-side browser bundle, preventing key leaks.

---

## 🚀 How the Core Systems Work

### 1. AI Automated Social Media Sync Engine
* **Location**: *Admin Hub > Discography Matrix > Artist Toolkit*
* **Endpoint**: `POST /api/social/generate`
* **How It Works**: 
  1. The system extracts structured metadata from your selected discography catalog item (Title, Release Type, Genre, Description/About, Release Date, Tracks/Highlights, and catalog codes like ISRC and UPC).
  2. It forwards this metadata to the secure backend server along with any custom guidelines or vibe descriptions you provide in the textarea.
  3. The server invokes the Gemini model, instructing it to draft three tailored, channel-specific promotional posts:
     * **X / Twitter**: Punchy, high-energy hook under the 280-character ceiling, featuring streaming call-to-actions.
     * **Instagram**: Atmospheric, narrative-driven lyric hook mapping Oklahoma City coordinates and a "Link in Bio" referral.
     * **LinkedIn / Story**: Reflective, narrative-focused professional story charting Hartman's sovereign artistic journey and military-foundations background as a legal ledger of survival.
  4. The resulting copy is streamed back and rendered inside responsive, copy-to-clipboard channel cards.

### 2. XML Sitemap Generator
* **Location**: *Admin Hub > SEO & Ranking Engine > XML Sitemap*
* **How It Works**: 
  * The tool dynamically crawls the real-time React application state, collecting both the static pages registry (`pages`) and the music catalog database (`catalog`).
  * It maps every item to its canonical SEO path:
    * Pages translate to `/` or `/{id}` paths.
    * Catalog songs and albums translate to `/discography?item={id}` parameters.
  * The component generates a fully compliant `<urlset>` XML document containing `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` tags.
  * You can preview the raw XML ledger inline, copy it instantly to your clipboard, or click **Download sitemap.xml** to save the file for direct upload to your web server root or submission in the **Google Search Console**.

### 3. Human-Readable JSON-LD Schema Tree Visualizer
* **Location**: *Admin Hub > SEO & Ranking Engine > Schema Audit*
* **How It Works**:
  * Rich schema metadata is critical for Google to generate **Knowledge Graphs** and official **MusicGroup Carousel panels** for the artist.
  * Instead of forcing you to read dense JSON blocks, the visual tree renders a fully interactive, collapsible node graph representing:
    * **Artist (Person) Entity**: Birth date, birthplace (Jacksonville), competencies, and external authority indexes (`sameAs` links like Wikidata or Wikipedia).
    * **Band / Brand (MusicGroup) Entity**: Moniker description, Oklahoma City origin coordinates, and a dynamically mapped array of `MusicAlbum` items synced from your active catalog.
  * Toggle between the clean, nested tree structure and the raw JSON payload code, which can be copied directly to your clipboard for easy verification.

### 4. Bulk Metadata Spreadsheet Ledger
* **Location**: *Admin Hub > SEO & Ranking Engine > Bulk Meta-Editor*
* **How It Works**:
  * Instead of navigating to individual page editors, this spreadsheet-like control room collects SEO Title elements and Snippet Descriptions for all custom pages and catalog items into a single unified grid.
  * Inputs include dynamic **character counter badges** to keep your tags optimized for search engine constraints:
    * **Titles**: Keeps you updated on the optimal 45–60 character range to prevent truncation.
    * **Descriptions**: Highlights the optimal 120–160 character boundary.
  * Click **Save All Meta Updates** to execute a bulk state transaction, updating both the sitemap nodes and index metadata instantly in a single batch operation.

---

## 🛠️ Local Development & Deployment

### Run the Dev Server
The full-stack application utilizes a unified Express server handling API proxies alongside the Vite static asset middleware:
```bash
npm run dev
```

### Compile Production Build
To bundle the client-side SPA and compile the TypeScript backend into a self-contained CommonJS target (`dist/server.cjs`):
```bash
npm run build
```

### Launch Production Container
```bash
npm start
```
