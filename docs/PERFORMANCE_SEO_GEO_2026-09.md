# Performance, SEO, GEO & Indexing — September 2026

Round of improvements applied on 2026-09-23. All changes verified with
`bunx tsc --noEmit`, a production build, Playwright at 375/768/1440 px and a
fresh SEO foundations scan (100% passing).

---

## 1. Assets & images

| Asset | Before | After | Method |
|---|---|---|---|
| `src/assets/avalia-macapa.webp` | 1,535 KB (1858x927) | 122 KB (1200x599) | `ffmpeg` scale + libwebp q80 |
| `src/assets/experience/avalia_macapa_logo.webp` | 347 KB (1024x1024) | 7 KB (512x512) | `ffmpeg` scale + libwebp q85 |

Guideline going forward: project card images max 1200 px wide / ~150 KB;
logowall logos max 512 px / ~30 KB. Source was fully opaque, so no alpha
channel was lost.

### Loading priority

`src/components/LazyImage.tsx` now accepts `priority?: boolean`:

- `priority` → `loading="eager"`, `fetchPriority="high"`, skips the observer.
- default → `loading="lazy"`, `fetchPriority="low"`, IntersectionObserver gate.
- always → `decoding="async"`.

Applied to the first project slide only (`priority={index === 0}`) in
`ProjectsSection.tsx`. The hero avatar already used `eager` + high priority.

---

## 2. Bundle splitting

`vite.config.ts` → `build.rollupOptions.output.manualChunks` groups long-lived
dependencies into stable, cacheable chunks:

`vendor-react`, `vendor-motion`, `vendor-charts` (recharts/d3),
`vendor-particles` (@tsparticles), `vendor-supabase`, `vendor-radix`,
`vendor-carousel` (embla), `vendor-markdown`, `vendor` (rest).

Result: no single monolithic bundle; the admin panel, charts and Lucy stay out
of the first-visit critical path (route-level `lazy()` was already in place).
`chunkSizeWarningLimit` raised to 900 KB to keep build output readable.

---

## 3. Third-party & runtime deferral

- **GA4 (`G-8H9Z89M76D`)** in `index.html`: the config snippet still runs
  inline (so early events queue in `dataLayer`), but `gtag/js` is injected only
  after `window.load`. It no longer competes with LCP.
- **Resource hints** added: `preconnect` + `dns-prefetch` for the Supabase
  backend, `dns-prefetch` for googletagmanager and google-analytics. Font hints
  were already in place.
- **Particles** (`HeroSection.tsx`): desktop only (`useIsMobile`), engine
  imported only when the hero intersects the viewport (`IntersectionObserver`,
  `rootMargin: 100px`), then scheduled through `requestIdleCallback`
  (timeout 2000 ms, `setTimeout(600)` fallback). Cleanup guards against
  state updates after unmount.

---

## 4. Robots policy (`public/robots.txt`)

Deliberate split between **answer engines** (we want citations) and **bulk
dataset harvesters** (no benefit, only bandwidth):

**Allowed** — Googlebot, Bingbot, Twitterbot, facebookexternalhit, GPTBot,
OAI-SearchBot, ChatGPT-User, Claude-Web, ClaudeBot, PerplexityBot,
Google-Extended, Applebot-Extended.

**Blocked (`Disallow: /`)** — Bytespider, CCBot, DataForSeoBot, Omgilibot,
Omgili, Amazonbot, meta-externalagent.

**Throttled (`Crawl-delay: 10`)** — SemrushBot, AhrefsBot, MJ12bot.

Every allowed crawler keeps `Disallow: /api/`, `/login`, `/fimo_admin`.
`Sitemap: https://nauitermaster.com/sitemap.xml` retained.

---

## 5. SEO & GEO (structured data)

- `public/llms.txt` rewritten: summary, `## Pages` (PT/EN routes + legal),
  `## Projects` (all 6 with URL and one-line description), `## Topics`,
  `## Optional` (résumé PDF). All mentorship/pricing references removed.
- `src/components/SEOHead.tsx`: `FAQPage` expanded from 3 to 6 Q&A in both
  languages (who is Nauiter Master, prompt engineering, which AI tools,
  services offered, automation for creators, tech stack). `Person.sameAs` now
  includes `https://www.youtube.com/@nyetfuture`. `BreadcrumbList`,
  `Organization`, `CreativeWork` and `Service` (`priceRange: "$$"`) unchanged.
- `public/sitemap.xml`: home PT/EN `lastmod` 2026-09-23; legal pages left at
  2026-02-26 because their content did not change.
- `index.html` `<noscript>` already describes all 6 active projects in PT/EN.

---

## 6. Open items (owner action required)

- **Google Search Console** is not connected. Without it there is no click,
  query or coverage data and no official sitemap submission. Requires the
  owner to authorize the Google account; verification + submission can then be
  automated.
- **Content opportunity**: bilingual guide "what is prompt engineering"
  (~74k searches/month) — separate, larger task (new route, Article schema,
  sitemap entry, menu link).
- Head/metadata changes only take effect on the public domain after a deploy.
