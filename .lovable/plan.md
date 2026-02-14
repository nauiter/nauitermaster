

## Plano: Revisao Geral + SEO/GEO + Documentacao

---

## Problemas Encontrados

| # | Arquivo | Problema |
|---|---------|----------|
| 1 | `index.html` noscript | Falta projeto Chaos Oracle na lista |
| 2 | `index.html` structured data | Falta Chaos Oracle no CreativeWorks schema |
| 3 | `index.html` meta description | Diz "5+ plataformas" - deveria ser "6+" |
| 4 | `index.html` noscript footer | Copyright diz "2024" - deveria ser "2025" |
| 5 | `SEOHead.tsx` CreativeWorks | Falta Chaos Oracle no schema |
| 6 | `SEOHead.tsx` description | Diz "5+ active platforms" - deveria ser "6+" |
| 7 | `SEOHead.tsx` Person worksFor | Falta Chaos Oracle na lista de organizacoes |
| 8 | `public/sitemap.xml` | lastmod desatualizado (2026-01-30 -> 2026-02-14) |
| 9 | `src/lib/constants.ts` | Falta AVALIA_MACAPA em PROJECT_URLS |
| 10 | `README.md` | Lista de projetos desatualizada (falta Chaos Oracle e Avalia Macapa) |
| 11 | `.lovable/plan.md` | Nao reflete estado atual do projeto |

---

## Alteracoes por Arquivo

### 1. index.html

- Adicionar Chaos Oracle no noscript (artigo com descricao e link)
- Adicionar Chaos Oracle no schema CreativeWorks (ItemList)
- Atualizar meta description: "5+" para "6+"
- Atualizar OG description: "5+" para "6+"
- Atualizar Twitter description: "5+" para "6+"
- Corrigir copyright noscript: "2024" para "2025"

**Chaos Oracle noscript:**
```html
<article>
  <h3>Chaos Oracle</h3>
  <p>Experiencia digital inspirada na teoria do caos, criada para ajudar pessoas indecisas a tomar decisoes. Um oraculo moderno que abraca a incerteza como metodo.</p>
  <p><a href="https://chaos-bloom-decision.lovable.app/">Visitar Chaos Oracle</a></p>
</article>
```

**Chaos Oracle schema:**
```json
{
  "@type": "WebApplication",
  "name": "Chaos Oracle",
  "description": "Experiencia digital inspirada na teoria do caos para tomada de decisoes",
  "url": "https://chaos-bloom-decision.lovable.app/",
  "creator": { "@type": "Person", "name": "Nauiter Master" }
}
```

### 2. SEOHead.tsx

- Atualizar descriptions PT/EN: "5+" para "6+"
- Adicionar Chaos Oracle no CreativeWorks ItemList
- Adicionar Chaos Oracle no Person worksFor array

### 3. public/sitemap.xml

- Atualizar todas as datas lastmod para 2026-02-14

### 4. src/lib/constants.ts

- Adicionar `AVALIA_MACAPA: 'https://avaliamacapa.com.br'` em PROJECT_URLS

### 5. README.md

- Atualizar lista de projetos no "Project Overview" para incluir Chaos Oracle e Avalia Macapa
- Atualizar "5+" para "6+" na descricao do hero

### 6. .lovable/plan.md

- Substituir conteudo com resumo completo do estado atual do projeto incluindo todas as funcionalidades implementadas

---

## Detalhes Tecnicos SEO/GEO

### Schema.org Updates

O Chaos Oracle sera adicionado como `WebApplication` no schema (mesmo tipo do Avalia Macapa), pois e uma aplicacao web interativa.

### Noscript GEO Content

O conteudo noscript sera expandido com o Chaos Oracle para manter paridade com os projetos visíveis na SPA, garantindo que crawlers de motores de IA (ChatGPT, Perplexity) indexem todos os 6 projetos.

### Meta Descriptions

Atualizacao de "5+" para "6+" em todas as instancias:
- `index.html` meta description
- `index.html` OG description
- `index.html` Twitter description
- `SEOHead.tsx` PT description
- `SEOHead.tsx` EN description

---

## Resultado Esperado

- 6 projetos documentados em todos os canais (schema, noscript, sitemap, README)
- Metricas consistentes em todo o codebase ("6+ plataformas")
- Datas de sitemap atualizadas
- Documentacao completa e atualizada

