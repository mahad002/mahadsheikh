# Portfolio performance analysis

Your site is slow mainly due to **heavy JavaScript** (3D, particles, two chart libs, two carousel libs), **images not optimized**, and **layout rendering nothing until the client mounts**. Below is what to cut, what to optimize, and what was already fixed in code.

---

## What’s making it slow

| Cause | Impact |
|-------|--------|
| **3D hero (ThreeScene)** on home | Three.js + Fiber + Drei + postprocessing (Bloom, ChromaticAberration) + 200 particles + 3 crystals. Loaded immediately on every visit. |
| **WorldAnalytics** on /work | Full 3D globe + Canvas. Already dynamic; still heavy when that section is in view. |
| **Unused bundles** | `ParticlesContainer` imported on home but **never rendered** → pulls in `tsparticles` for nothing. `recharts` + `components/ui/chart.tsx` **never used** anywhere. |
| **Two chart libs** | Chart.js (WorkAnalytics, ClientAnalytics) + Recharts (only in unused `chart.tsx`) → extra weight. |
| **Two carousel libs** | Swiper (testimonials) + Embla — keep one. |
| **Images** | `next.config.js` had `images: { unoptimized: true }` → no Next.js image optimization. WorkSlider uses `backgroundImage` instead of `next/image` → no lazy loading or modern formats. |
| **Layout** | Returned `null` until `mounted` → blank screen until JS runs, bad First Contentful Paint (FCP). |
| **Heavy fonts** | Sora with 8 weights loaded for the whole site. |

---

## What to cut (for maximum speed on light servers)

### 1. **Replace or remove the 3D hero (biggest win)**

- **Option A (recommended):** Remove `ThreeScene` from the home page and use a **static hero**: gradient + your headline + CTA. No Three.js on the critical path.
- **Option B:** Keep 3D but **lazy-load** it (e.g. only load after first paint or when hero is in view). Implemented as a first step; you can still remove it later for even more speed.

Cutting the 3D hero entirely will make the home page load much faster on weak devices and cheap hosting.

### 2. **Remove or hide WorldAnalytics on /work**

- Either **remove** the “Global Impact” 3D globe section from `/work`, or
- Make it **optional** (e.g. “Load visualization” button) so the rest of the page is fast and the globe loads on demand.

### 3. **Remove unused dependencies and files**

- **recharts** — Not used (only in unused `components/ui/chart.tsx`). Safe to remove.
- **react-tsparticles** + **tsparticles** — Only used by `ParticlesContainer`, which is imported on home but never rendered. Remove the import (done) and then remove these packages.
- **components/ui/chart.tsx** — Unused; can delete or leave if you plan to use it with Recharts later (then keep recharts).
- **public/world-110m.json** — Not referenced in code; dead asset. Delete to save bandwidth.

### 4. **Use a single carousel library**

- You have **Swiper** (testimonials) and **Embla**. Use one across the site and remove the other to reduce bundle size.

### 5. **Reduce Sora font weights**

- You load 8 weights. Only declare the weights you actually use (e.g. 400, 500, 600, 700) in `Layout.jsx` to reduce font payload.

---

## What was optimized in code (already done)

1. **ParticlesContainer** — Removed from `pages/index.jsx`; uninstalled `react-tsparticles` and `tsparticles`.
2. **Image optimization** — `next.config.js`: `images: { unoptimized: false }` so Next.js optimizes and serves WebP/AVIF.
3. **Layout** — Renders a minimal shell immediately (no blank screen until mount); **Sora font** reduced to 4 weights (400, 500, 600, 700).
4. **Home page** — **3D hero removed**; replaced with a static gradient hero. No Three.js on the home route (biggest win). Timeline import removed; stats/services use ref-based animation.
5. **Work page** — **WorldAnalytics** loads only when the user clicks “Load global impact visualization” (saves 3D bundle on initial /work load).
6. **WorkSlider** — Project images use `next/image` with `loading="lazy"` and `sizes` for optimized delivery.
7. **Testimonials page** — **TestimonialSlider** (Swiper) is lazy-loaded with `next/dynamic` so Swiper is not in the main bundle.
8. **Dead asset** — `public/world-110m.json` removed. **recharts** and **components/ui/chart.tsx** removed (unused).

---

## Optional next steps

- **WorkSlider** — Use `next/image` for project images (with `sizes` and `loading="lazy"`) instead of `backgroundImage` so images are optimized and lazy-loaded.
- **Bundle analysis** — Add `@next/bundle-analyzer`, run `ANALYZE=true npm run build`, and remove or replace the largest chunks.
- **Single source for reviews** — Use either `data/Client_Reviews.json` or `public/Client_Reviews.json`, not both.

---

## Summary: “Cut list” for super fast on light servers

| Priority | Action |
|----------|--------|
| 1 | Remove 3D hero (ThreeScene) from home and use a static/gradient hero. |
| 2 | Remove or make optional the WorldAnalytics 3D globe on /work. |
| 3 | Remove packages: `recharts`, `react-tsparticles`, `tsparticles`. Delete or repurpose `components/ui/chart.tsx`, remove `public/world-110m.json`. |
| 4 | Use one carousel library (Swiper or Embla) and remove the other. |
| 5 | Reduce Sora to 2–4 font weights you actually use. |

After these cuts and the applied optimizations, the site should be noticeably faster and more sellable on lighter servers.
