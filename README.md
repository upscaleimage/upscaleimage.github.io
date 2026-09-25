# UpscaleImage | Free Local AI Image Enhancer (`upscaleimage.github.io`)

A **100% client-side, zero-server AI image upscaler** built with **Astro**, **React Islands**, **Tailwind CSS**, and **UpscalerJS (TensorFlow.js)**. Designed for maximum SEO, high performance, and absolute privacy.

- **Live URL**: [https://upscaleimage.github.io](https://upscaleimage.github.io)
- **Support the Developer**: [https://buymeacoffee.com/kisharadilz](https://buymeacoffee.com/kisharadilz)

---

## Key Features & Architecture

1. **Zero-Server Client-Side AI (`UpscalerJS` + `TensorFlow.js`)**:
   - Dual Quality Architecture:
     - ⚡ **Balanced (Fast)**: Uses `@upscalerjs/esrgan-medium` for sub-3-second high-speed enhancements.
     - 💎 **Ultra HD (Studio Quality)**: Uses `@upscalerjs/esrgan-thick` with deepest Residual-in-Residual Dense Blocks (RRDB) for maximum texture and edge reconstruction.
   - Smart Browser Caching: Deep neural weights are cached in browser storage after the first run for instant zero-latency future runs.
   - Built-in `patchSize` and `padding` chunking automatically avoids memory spikes and mobile crashes.
   - Supports **JPEG**, **PNG** (preserving transparency), and **WebP** files with **2x** and **4x** AI magnification plus Adaptive Edge-Aware Detail Sharpening.
2. **Interactive Before/After Comparison Slider**:
   - Real-time split comparison slider with touch, mouse pointer, and keyboard navigation, plus a **2x Loupe Zoom** mode.
3. **Design System (Light & Dark Mode)**:
   - **Colors**: Burgundy (`#800020`), Warm Cream (`#F3E6D5`), Warm Off-White (`#FFF9F2`), and Vibrant Rose Coral (`#D45060`).
   - **Light Mode**: Background `#FFF9F2`, Surface `#FFFFFF`, Deep Burgundy `#800020` headings, Coral `#D45060` interactive highlights.
   - **Dark Mode**: Rich Velvet Wine Background `#1A0408`, Card Surface `#2C0911`, Warm Text `#FFF9F2`, Coral Accent `#D45060`.
4. **Technical SEO & Static i18n Subpath Routing**:
   - Generates localized static routes for 6 languages: `/` (`en`), `/es/`, `/pt/`, `/de/`, `/fr/`, and `/ja/`.
   - Includes `<meta property="og:site_name" content="UpscaleImage">` and native JSON-LD schemas (`WebSite`, `WebApplication`, and `FAQPage`) in the `<head>`.

---

## Development & Build Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start local dev server
npm run dev

# Build static production site into ./dist
npm run build

# Preview production build locally
npm run preview
```
