<div align="center">

# ✨ UpscaleImage — Free Local AI Image Enhancer

**100% Client-Side WebGL Super-Resolution • Zero Server Uploads • Studio-Grade ESRGAN Neural Networks**

[![Live Website](https://img.shields.io/badge/Live_Demo-upscaleimage.github.io-800020?style=for-the-badge&logo=googlechrome&logoColor=white)](https://upscaleimage.github.io/)
[![Astro](https://img.shields.io/badge/Astro_4.16-SSG_Islands-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-WebGL_GPU-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![React 18](https://img.shields.io/badge/React_18-TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Support Developer](https://img.shields.io/badge/Buy_Me_A_Coffee-Support-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/kisharadilz)

<br />

<a href="https://upscaleimage.github.io/">
  <img src="https://res.cloudinary.com/dpx6w78bt/image/upload/f_auto/q_auto/v1786342039/Online_Tool_rc1ybr.png" alt="UpscaleImage - Free Local AI Image Enhancer Preview" width="880" />
</a>

<br />

[**🚀 Launch Live App**](https://upscaleimage.github.io/) &nbsp;•&nbsp; [**🇪🇸 Español**](https://upscaleimage.github.io/es/) &nbsp;•&nbsp; [**🇧🇷 Português**](https://upscaleimage.github.io/pt/) &nbsp;•&nbsp; [**🇩🇪 Deutsch**](https://upscaleimage.github.io/de/) &nbsp;•&nbsp; [**🇫🇷 Français**](https://upscaleimage.github.io/fr/) &nbsp;•&nbsp; [**🇯🇵 日本語**](https://upscaleimage.github.io/ja/)

</div>

---

## 📖 Overview

**UpscaleImage** ([`upscaleimage.github.io`](https://upscaleimage.github.io/)) is a privacy-first, 100% browser-based AI image upscaler and restoration suite. Unlike cloud upscalers that upload personal photos to remote servers, impose credit limits, or add watermarks, **UpscaleImage executes deep Residual-in-Residual Dense Block (RRDB) Enhanced Super-Resolution Generative Adversarial Networks (ESRGAN) directly on the user's local GPU via WebGL and TensorFlow.js**.

Your images never leave your device—ensuring **zero server latency, zero privacy risk, and unlimited free high-resolution exports**.

---

## 🧠 Dual-Tier Local AI Engine

UpscaleImage features a multi-tier neural architecture powered by **UpscalerJS** and **TensorFlow.js**, allowing users to balance real-time speed with heavyweight studio reconstruction:

| Quality Mode | Underlying Neural Model | Architecture | Patch Chunking (`Desktop` / `Mobile`) | Best Used For |
| :--- | :--- | :--- | :---: | :--- |
| **⚡ Balanced (Fast)** | `@upscalerjs/esrgan-medium` (`2x` & `4x`) | Lightweight Multi-Layer ESRGAN | `256×256` / `64×64` (`padding: 4`) | Rapid everyday photo enhancement, UI assets, web graphics, and social media exports (`~1–3s`). |
| **💎 Ultra HD (Studio)** | `@upscalerjs/esrgan-thick` (`2x` & `4x`) | Deep Heavyweight RRDB Network | `128×128` / `32×32` (`padding: 4`) | Fine hair strands, portrait skin micro-textures, architectural masonry, and anime line art. |

### Key Engineering Highlights
* **Smart Browser Weight Caching**: Once the Ultra HD neural weights (`~30MB` across 7 binary shards) are fetched on the first run, they are permanently cached in browser storage for instant, zero-latency execution on all subsequent runs.
* **VRAM OOM Protection (Adaptive Tiling)**: Images up to `1920px` (Desktop) and `1280px` (Mobile) are processed in padded tiles (`padding: 4px`) to prevent WebGL Timeout Detection and Recovery (TDR) crashes while maintaining seamless tile boundaries.
* **Edge-Aware Luminance Detail Filter**: Includes a custom post-processing pass (`applyAdaptiveDetailEnhancement`) that calculates local luminance gradients to selectively sharpen genuine high-frequency edges (eyelashes, fabric, text) while leaving flat regions (sky, smooth skin, gradients) completely noise-free.

---

## ✨ Key Features

* **🔒 100% Client-Side Privacy**: Zero bytes uploaded to any server. Works offline once model weights are cached in the browser.
* **🔍 Interactive Before/After Split Slider**: Real-time comparison viewport supporting mouse drag, touch gestures, keyboard navigation (`ArrowLeft` / `ArrowRight`), and a **2x Loupe Magnification** toggle.
* **🖼️ Live Visual Showcase**: Interactive pre-rendered comparison gallery featuring **Portrait & Skin Detail**, **Architecture & Stone**, and **Anime & Digital Art** with 1-click live loading into the AI workspace.
* **📦 Multi-Format High-Res Export**: Export upscaled artwork up to **4x resolution** (`7680×4320` 8K support) in **PNG (Lossless)**, **WebP (Ultra Compact)**, or **JPEG (95% High Quality)**.
* **🌍 Full 6-Language Localization (`i18n`)**: Statically generated localized landing pages for English (`/ `), Spanish (`/es/`), Portuguese (`/pt/`), German (`/de/`), French (`/fr/`), and Japanese (`/ja/`).
* **🌗 Adaptive Light & Dark Theme**: Flash-free (`is:inline` FOUC guard) theme engine featuring a signature **Burgundy & Rose Coral** aesthetic.

---

## 🏆 Technical SEO & Accessibility (`100 / 100`)

Engineered from the ground up for maximum search visibility and Core Web Vitals performance:

1. **Quadruple JSON-LD Structured Data Graphs** (`src/components/SEO.astro`):
   * `WebSite` Schema (Publisher, Language Matrix, Canonical Identity)
   * `WebApplication` Schema (`MultimediaApplication`, Free Offer `$0.00 USD`, Feature List, `AggregateRating`)
   * `BreadcrumbList` Schema (Hierarchical position mapping for root and localized routes)
   * `FAQPage` Schema (Synchronized with visible semantic `<details>` / `<summary>` accordions)
2. **International SEO & Image Sitemap** (`src/pages/sitemap.xml.ts`):
   * Reciprocal `<link rel="alternate" hreflang="..." />` tags + `x-default` fallback in both HTML `<head>` and XML Sitemap.
   * Includes the **Google Image Sitemap extension (`xmlns:image`)** with localized image titles and captions.
3. **WCAG AA Accessibility Compliance**:
   * Full keyboard operability and ARIA state bindings (`role="slider"`, `role="progressbar"`, `role="group"`, `aria-pressed`, `role="alert"`).
4. **Deferred Island Hydration**:
   * TensorFlow.js and UpscalerJS model chunks are pre-bundled as standalone UMD modules and dynamically imported only on user interaction, ensuring near-instant First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

---

## 🎨 Design System & Color Tokens

| Token Role | Light Mode (`Default`) | Dark Mode (`.dark`) | Usage |
| :--- | :---: | :---: | :--- |
| **Primary Background** | `#FFF9F2` *(Warm Off-White)* | `#1A0408` *(Deep Velvet Wine)* | Page canvas & main viewport |
| **Elevated Card Surface** | `#FFFFFF` *(Pure White)* | `#2C0911` *(Rich Burgundy Surface)* | Interactive workspace cards & modals |
| **Secondary Surface / Pill** | `#F3E6D5` *(Warm Cream)* | `#541523` *(Muted Wine Border)* | Badges, borders, and dropzone states |
| **Primary Brand Accent** | `#800020` *(Deep Burgundy)* | `#FFF9F2` *(Crisp Cream Text)* | Headings, primary active buttons, typography |
| **Interactive Highlight** | `#D45060` *(Vibrant Rose Coral)* | `#D45060` *(Vibrant Rose Coral)* | Active toggles, glow effects, slider handle |

---

## 📂 Project Structure

```text
upscaleimage.github.io/
├── public/
│   ├── favicon.svg                  # Brand vector icon
│   ├── og-cover.svg                 # Local vector fallback graphic
│   └── robots.txt                   # Crawler directives & Sitemap pointer
├── src/
│   ├── components/
│   │   ├── BeforeAfterShowcase.tsx  # Interactive category showcase island (client:visible)
│   │   ├── Footer.astro             # Semantic footer with privacy & developer links
│   │   ├── ImageUpscaler.tsx        # Core AI Upscaler engine & UI workspace (client:load)
│   │   ├── LandingView.astro        # Main landing template (Hero, Breadcrumbs, Features, FAQ)
│   │   ├── Navbar.astro             # Responsive sticky header, i18n switcher & theme toggle
│   │   └── SEO.astro                # Meta tags, Open Graph, GTag (GA4), and 4 JSON-LD schemas
│   ├── i18n/
│   │   └── translations.ts          # Strongly-typed dictionary for EN, ES, PT, DE, FR, JA
│   ├── layouts/
│   │   └── BaseLayout.astro         # Master HTML shell with anti-FOUC theme script
│   ├── pages/
│   │   ├── [lang]/index.astro       # Dynamic static generator for localized subpaths
│   │   ├── index.astro              # Root English landing page (https://upscaleimage.github.io/)
│   │   └── sitemap.xml.ts           # Dynamic XML Sitemap with xhtml:link & image:image
│   └── styles/
│       └── global.css               # Tailwind directives, custom scrollbars & checkerboard CSS
├── astro.config.mjs                 # Astro SSG config + Vite UMD alias resolution for UpscalerJS
├── tailwind.config.mjs              # Custom palette, typography & glow shadows
└── package.json                     # Project dependencies & build scripts
```

---

## 🛠️ Local Development & Deployment

### Prerequisites
* **Node.js**: `v18.18.0+` or `v20.0.0+`
* **npm**: `v9+`

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/upscaleimage/upscaleimage.github.io.git
cd upscaleimage.github.io
npm install --legacy-peer-deps
```

### 2. Start Development Server
```bash
npm run dev
```
> Open **`http://localhost:4321/`** in your browser. Hot Module Replacement (HMR) is enabled for both Astro templates and React islands.

### 3. Build for Production
```bash
npm run build
```
> Generates a 100% static, pre-rendered production bundle inside `./dist/` (including all 6 language routes and `/sitemap.xml`).

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 💖 Author & Support

Designed and engineered by **Kishara Dilz**.

If **UpscaleImage** saved you time or helped enhance your creative work, consider supporting ongoing open-source development:

[![Buy Me A Coffee](https://img.shields.io/badge/Support_on-Buy_Me_a_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/kisharadilz)

---

<div align="center">
  <sub>Built with ❤️ using Astro, React, Tailwind CSS, and TensorFlow.js • 100% Client-Side AI</sub>
</div>
