

## Scan de Melhoria SEO / GEO

---

## Problemas Encontrados

| # | Categoria | Arquivo | Problema | Severidade |
|---|-----------|---------|----------|------------|
| 1 | SEO | `public/robots.txt` | Falta `Disallow` para rotas privadas `/login`, `/fimo_admin` — crawlers podem indexar paginas de admin | Alta |
| 2 | SEO | `public/sitemap.xml` | `lastmod` desatualizado (2026-02-14) — deveria refletir a data atual (2026-02-26) | Media |
| 3 | SEO | `index.html` | Falta `og:title` e `og:description` dinamicos no HTML estatico — estao em linhas separadas (218-221) sem estar dentro do `<head>` de forma agrupada, mas o principal e que faltam `twitter:title` e `twitter:description` no head estatico (so sao setados via JS) | Baixa |
| 4 | SEO | `index.html` | OG image URL usa link temporario do Google Cloud Storage com `Expires=1772029814` (expira ~2026) — deveria usar URL permanente do dominio proprio | Alta |
| 5 | SEO | `index.html` | Noscript footer diz "© 2025" — deveria ser "© 2025-2026" ou "© 2026" | Baixa |
| 6 | GEO | `index.html` | Noscript falta conteudo em ingles — todo o fallback e em portugues, crawlers EN nao encontram conteudo relevante | Media |
| 7 | SEO | `public/robots.txt` | Falta `Disallow` para `/api/` em agentes especificos (GPTBot, etc.) — so esta no wildcard `*` | Baixa |
| 8 | SEO | `src/components/SEOHead.tsx` | Falta atualizar `canonical` dinamico nas paginas de Privacy/Terms — SEOHead so e usado no Index, nao nas paginas legais | Media |
| 9 | GEO | `src/components/SEOHead.tsx` | Schema `Service` nao inclui `offers` ou `priceRange` — adicionar `priceRange` melhora visibilidade em buscas de servicos | Baixa |
| 10 | SEO | `src/pages/Index.tsx` | Footer copyright diz "© 2025" — deveria ser atualizado para "© 2025-2026" | Baixa |

---

## Alteracoes por Arquivo

### 1. public/robots.txt — Bloquear rotas privadas

Adicionar regras `Disallow` para `/login` e `/fimo_admin` no wildcard e nos agentes de IA:

```
Disallow: /api/
Disallow: /login
Disallow: /fimo_admin
```

### 2. public/sitemap.xml — Atualizar lastmod

Atualizar todas as datas `<lastmod>` de `2026-02-14` para `2026-02-26`.

### 3. index.html — OG image permanente + copyright

- Substituir a URL temporaria do Google Cloud Storage na `og:image` e `twitter:image` por `https://nauitermaster.com/og-image.png` (ja existe no `/public/og-image.png`)
- Atualizar copyright no noscript de "2025" para "2025-2026"

### 4. index.html — Noscript bilingue (GEO)

Adicionar bloco em ingles no noscript para que crawlers EN encontrem conteudo relevante. Adicionar apos o bloco PT:

```html
<hr>
<header>
  <h1>Nauiter Master | AI Strategist, Digital Art & Automation</h1>
  <p><strong>14+ years in technology | 6+ active platforms | React, TypeScript & Supabase</strong></p>
</header>
```

Com secoes resumidas em ingles (About, Services, Projects, Contact).

### 5. src/pages/Index.tsx — Footer copyright

Atualizar "© 2025" para "© 2025-2026".

### 6. src/components/SEOHead.tsx — PriceRange no Service schema

Adicionar `"priceRange": "$$"` ao schema Service para melhorar visibilidade em buscas de servicos.

---

## Resumo

| Arquivo | Alteracao | Impacto |
|---------|----------|---------|
| `public/robots.txt` | Bloquear `/login`, `/fimo_admin` | Previne indexacao de paginas admin |
| `public/sitemap.xml` | Atualizar lastmod para 2026-02-26 | Sinaliza conteudo atualizado ao Google |
| `index.html` | OG image permanente + noscript EN + copyright | Previne link quebrado + GEO bilingue |
| `src/pages/Index.tsx` | Copyright 2025-2026 | Consistencia |
| `src/components/SEOHead.tsx` | PriceRange no Service | Rich snippets de servico |

