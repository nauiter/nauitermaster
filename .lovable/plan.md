

## Plano: Analise Geral - SEO, GEO, Index e Tipografia

---

## Problemas Encontrados

| # | Categoria | Arquivo | Problema | Severidade |
|---|-----------|---------|----------|------------|
| 1 | SEO | `src/lib/translations.ts` | Hero description diz "5+ plataformas/platforms" - deveria ser "6+" | Alta |
| 2 | SEO | `public/robots.txt` | Falta regras para crawlers de IA (GPTBot, Claude-Web, etc.) | Media |
| 3 | GEO | `index.html` | Noscript falta secao de "Mentoria" como servico oferecido | Baixa |
| 4 | SEO | `index.html` | CSP expoe ID do projeto Supabase (udzjrhvimujhofmlndqt) | Baixa |
| 5 | Tipografia | `src/index.css` | `section h2` force `!important` em font-size, impedindo responsividade natural | Media |
| 6 | SEO | `src/components/SEOHead.tsx` | `hreflang` no index.html usa `x-default` apontando para "/" (redirect), enquanto SEOHead usa "/" tambem - deveria ser consistente com "/en" | Media |
| 7 | GEO | `src/components/SEOHead.tsx` | Falta schema `BreadcrumbList` para melhorar navegacao em resultados de busca | Baixa |
| 8 | Tipografia | Hero mobile | Subtitle (gradient text) muito grande no mobile (390px), ocupa 4+ linhas | Media |
| 9 | SEO | `src/components/sections/ExperienceSection.tsx` | Falta Chaos Oracle na lista de experiencias | Baixa |

---

## Alteracoes por Arquivo

### 1. src/lib/translations.ts

**Problema:** Hero description em PT e EN ainda diz "5+" em vez de "6+".

**Correcao:**
- Linha ~350 (EN): `"Developer of 5+ active platforms"` -> `"Developer of 6+ active platforms"`
- Linha ~862 (PT): `"Desenvolvedor de 5+ plataformas ativas"` -> `"Desenvolvedor de 6+ plataformas ativas"`

### 2. public/robots.txt

**Problema:** Nao inclui regras para crawlers de motores de IA generativa. Esses crawlers indexam conteudo para ChatGPT, Perplexity, etc.

**Adicionar:**
```
User-agent: GPTBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /
```

Isso garante que o portfolio seja indexado por motores de IA generativa (GEO).

### 3. src/components/SEOHead.tsx

**Melhorias:**
- Adicionar schema `BreadcrumbList` para navegacao estruturada
- Alterar `x-default` de `"/"` para `"/en"` para evitar apontar para pagina de redirect

**BreadcrumbList Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nauitermaster.com/pt" },
    { "@type": "ListItem", "position": 2, "name": "Projetos", "item": "https://nauitermaster.com/pt#projects" }
  ]
}
```

### 4. index.html

**Melhorias:**
- Atualizar `x-default` hreflang de `"/"` para `"/en"` (linha 31)
- Adicionar secao de mentoria no noscript para enriquecer conteudo GEO

**Noscript - Adicionar apos FAQ:**
```html
<section>
  <h2>Mentoria em IA</h2>
  <p>Programas de mentoria personalizados em inteligencia artificial, automacao criativa e prompt engineering. Acompanhamento individual para criadores, empreendedores e profissionais de tecnologia que desejam integrar IA em seus workflows.</p>
</section>
```

### 5. src/index.css - Tipografia

**Problema:** Os `!important` em `section h2` com media queries forcam tamanhos fixos que podem conflitar com componentes.

**Correcao:** Remover os `!important` das regras de `section h2` e confiar no sistema de design do Tailwind/componentes:

```css
@media (max-width: 768px) {
  section h2 {
    font-size: 1.5rem;
    line-height: 1.8rem;
    padding: 0 1rem;
  }
}

@media (max-width: 375px) {
  section h2 {
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
}

@media (min-width: 769px) {
  section h2 {
    font-size: 3rem;
    line-height: 1.2;
  }
}
```

### 6. src/components/sections/HeroSection.tsx - Tipografia Mobile

**Problema:** O subtitle com gradient text ocupa muitas linhas em telas de 390px porque usa `text-2xl` (1.5rem/24px) no menor breakpoint.

**Correcao:** Reduzir tamanho do subtitle no mobile:
```tsx
// De:
<span className="block text-2xl sm:text-3xl md:text-4xl ...">
// Para:
<span className="block text-xl sm:text-3xl md:text-4xl ...">
```

Isso reduz de 24px para 20px no mobile, encaixando melhor em 3 linhas em vez de 4+.

---

## Resumo de Alteracoes

| Arquivo | Tipo | Impacto |
|---------|------|---------|
| `src/lib/translations.ts` | SEO | Corrige "5+" para "6+" no hero |
| `public/robots.txt` | GEO | Permite indexacao por crawlers de IA |
| `src/components/SEOHead.tsx` | SEO | BreadcrumbList + x-default fix |
| `index.html` | GEO/SEO | x-default fix + noscript mentoria |
| `src/index.css` | Tipografia | Remove `!important` das section h2 |
| `src/components/sections/HeroSection.tsx` | Tipografia | Subtitle menor no mobile |

---

## Resultado Esperado

- Metricas consistentes em todo o codebase ("6+" em vez de "5+")
- Portfolio indexavel por GPTBot, PerplexityBot e outros crawlers de IA
- Schema BreadcrumbList para rich snippets de navegacao
- Tipografia do hero mais equilibrada no mobile (20px em vez de 24px)
- Hierarquia tipografica h2 sem `!important` conflitantes

