# MUΣE // Luxury Editorial Portfolio for Computer Science Engineering

An avant-garde personal portfolio website for **Nethravathi**, a Computer Science Engineering student and AI researcher. The website reimagines the developer portfolio through the visual language of high-fashion editorial publishing (*Vogue*, *Kinfolk*, *Cereal*)—combining warm ivory tones, obsidian contrast spreads, high-contrast serif typography, geometric line-art, and bespoke interactive features.

---

## ✦ Live Demonstration & Preview

To run locally:
```bash
# Start a simple static server
python -m http.server 8000

# Open in your browser
# Navigate to: http://localhost:8000
```

---

## ✦ Visual & Architectural Design Language

- **Primary Background:** Warm Ivory (`#F9F6F0`, `#F2ECE0`, `#FCFAF6`).
- **Contrast Accents:** Deep Obsidian & Navy (`#0A0E17`, `#141C2D`, `#192236`).
- **Metallic & Champagne:** Muted gold (`#C5A059`, `#DFC28A`, `#9A7532`).
- **Typography Suite:**
  - Display Serifs: *Playfair Display*, *Cinzel*, *Cormorant Garamond*
  - Modern Sans & Metadata: *Syne*, *Plus Jakarta Sans*, *Space Mono*
- **Tactile Paper Grain:** Procedural SVG fractal noise overlay at `3.2%` opacity.
- **Editorial Graphics:** Barcodes, coordinate indicators (`12.9716° N, 77.5946° E`), issue stamps, dropcaps, and golden section line geometry.

---

## ✦ Major Sections & Components

| Section | Description |
| :--- | :--- |
| **01. Masthead & Cover** | Running publication ticker, live issue metadata, ambient study sound toggle, oversized serif masthead, and unblemished portrait frame. |
| **02. Biographical Monograph** | 2-column essay with dropcaps, pull quote, core academic pillars, and verified candidate dossier card. |
| **03. Engineering Craft** | 4-plate structured taxonomy covering *Core CS*, *AI & ML*, *Full Stack*, and *Cloud/DevOps* with animated mastery bars. |
| **04. Academic Chronology** | Chronological milestone timeline detailing B.E. in CSE (9.34 CGPA), Research Fellowship, and distinction honors. |
| **05. Curated Lookbook** | High-contrast project cards with oversized numerals (`PLATE 01–04`), live category filters, and GitHub source links. |
| **06. AI Study Assistant Spotlight** | Double-page spread with an interactive **Live Sandbox Simulator** (Algorithms Summary, CAP Theorem Flashcard, PyTorch Attention, OS Paging Quiz). |
| **07. Curriculum Vitæ Dossier** | Fullscreen lightbox modal with candidate credential checklist and 1-click `window.print()` PDF generation. |
| **08. Dispatch & Colophon** | Letterform inquiry transmission with field validation, email copy-to-clipboard, and publication colophon. |

---

## ✦ Directory Structure

```
Nethravathi/
├── index.html               # Semantic HTML5 master document
├── README.md                # Project documentation & deployment guide
├── robots.txt               # Search engine crawl directives
├── sitemap.xml              # SEO sitemap index
├── .gitignore               # Git version control exclusions
├── css/
│   ├── variables.css        # Design tokens, color scales, and layout units
│   ├── typography.css       # Google Fonts, dropcaps, and serif hierarchy
│   ├── components.css       # Barcodes, badges, buttons, AI sandbox, modal, toast
│   ├── layout.css           # Masthead, hero grid, timeline, lookbook, footer
│   ├── animations.css       # Slow luxury motion curves, scroll reveals, parallax
│   └── style.css            # Central stylesheet bundle
├── js/
│   └── main.js              # Controller (AI sandbox, audio synthesizer, modal, filters)
└── assets/
    └── profile.jpg          # User portrait photograph
```

---

## ✦ Cross-Browser Compatibility & Testing Matrix

The portfolio has been thoroughly structured and validated across modern browser rendering engines and viewport breakpoints:

- **Desktop Browsers:** Google Chrome (Blink), Mozilla Firefox (Gecko), Apple Safari (WebKit), Microsoft Edge (Blink).
- **Mobile & Tablet Devices:** iPhone (iOS Safari), iPad (iPadOS Safari), Android Phones (Chrome Mobile), Android Tablets.
- **Viewport Breakpoints:**
  - Mobile Small: `360px – 480px`
  - Mobile Large / Phablet: `481px – 640px`
  - Tablet: `641px – 1024px`
  - Desktop Standard: `1025px – 1440px`
  - Ultra-wide: `>1440px`

---

## ✦ Deployment Guide

This website is built with **zero external compilation dependencies** (vanilla HTML5, CSS3, and JavaScript), allowing instant, free deployment on any modern static hosting platform.

### Option 1: GitHub Pages (Recommended)

1. Initialize git and push to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of MUΣE editorial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select Branch: `main` and Folder: `/ (root)`.
   - Click **Save**.
3. Your website will be live in ~60 seconds at: `https://<your-username>.github.io/<your-repo-name>/`.

### Option 2: Vercel (1-Click Instant Deployment)

1. Install Vercel CLI (or connect via GitHub on [vercel.com](https://vercel.com)):
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts (accept defaults). Your site will be deployed with free global CDN and SSL.

### Option 3: Netlify (Drag & Drop or Git)

1. Log in to [netlify.com](https://netlify.com).
2. Drag and drop the `Nethravathi` folder directly into the Netlify dashboard.
3. Your site is instantly live with custom domain and HTTPS support.

### Option 4: Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Connect your GitHub repository and select `None` for the build framework.
3. Set root directory to `/` and click **Save and Deploy**.

---

## ✦ License & Attribution

Designed with precision for **Nethravathi**. All rights reserved © 2026.
Inspired by the **MUΣE** Luxury Editorial Visual Architecture.
