## Plano: Remover Sweet Life Animes e Sweet Life Academy

Os dois projetos foram desativados e devem sair de toda a UI, dados estruturados (JSON-LD), traduções e métricas.

---

## Arquivos e Alterações

### 1. `src/components/sections/ProjectsSection.tsx`
- Remover imports `sweetLifeAnimes` e `sweetLifeAcademy`.
- Remover os 2 objetos do array de projetos do carrossel (Sweet Life Animes e Sweet Life Academy).

### 2. `src/pages/Index.tsx` (Ecosystem Carousel)
- Remover imports das imagens `sweetLifeAnimes` e `sweetLifeAcademy`.
- Remover as 2 entradas correspondentes no array `projects` passado para `<EcosystemCarousel />`.

### 3. `src/components/sections/ExperienceSection.tsx`
- Remover import `sweetLifeAnimesLogo`.
- Remover a entrada `Sweet Life Animes` do array `experiences` (resta 7 organizações).

### 4. `src/lib/translations.ts`
- Remover chaves `sweetLifeAnimes` e `sweetLifeAcademy` em:
  - `projects.sweetLifeAnimes/Academy` (PT e EN)
  - `ecosystem.projects.sweetLifeAnimes/Academy` (PT e EN)
- Remover do tipo `ProjectData` as propriedades `sweetLifeAnimes` e `sweetLifeAcademy`.
- Atualizar descrições do Hero (PT e EN) de "6+ plataformas ativas" → "4+ plataformas ativas".

### 5. `src/lib/constants.ts`
- `ACTIVE_PROJECTS: 6` → `ACTIVE_PROJECTS: 4`.
- Remover `SWEET_LIFE_ANIMES` e `SWEET_LIFE_ACADEMY` de `PROJECT_URLS`.

### 6. `src/components/SEOHead.tsx`
- Remover Sweet Life Animes do schema `ItemList`/`hasOfferCatalog` (linhas ~188 e ~222).
- Remover Sweet Life Academy do schema (linha ~231).
- Atualizar respostas FAQ (PT linha 97, EN linha 110) removendo "através da Sweet Life Academy" — substituir por "através de programas de mentoria" / "through mentorship programs".

### 7. `index.html`
- Remover entradas Sweet Life Animes/Academy do JSON-LD (linhas ~118, ~132, ~142).
- Remover blocos `<h3>Sweet Life Animes</h3>` e `<h3>Sweet Life Academy</h3>` do `<noscript>` PT (linhas ~253, ~258) e EN (linhas ~366, ~371).
- Remover bullet "Sweet Life Academy: Fundador e Educador em IA" (linha ~323).
- Atualizar meta descriptions e textos do noscript (PT e EN): "6+ plataformas ativas" → "4+ plataformas ativas" (linhas 23, 94, 220, 221, 230, 235, 346, 351).
- Atualizar resposta FAQ EN (linha 404) removendo menção a Sweet Life Academy.

### 8. Assets (opcional — manter ou deletar)
- Manter os arquivos `src/assets/sweet-life-animes.webp`, `sweet-life-academy.webp` e `experience/sweet_life_animes_logo.webp` no repositório por enquanto (não referenciados não impactam build). Se preferir limpeza total, podem ser deletados — confirmar.

### 9. `public/sitemap.xml`
- Sem entradas específicas dos projetos; nenhuma alteração necessária.

---

## Resultado Esperado

- Carrossel de Projetos: 4 projetos (O Verme Passeia, Figueiredo Law, Avalia Macapá, Chaos Oracle).
- Ecosystem: 4 projetos.
- Experience: 7 organizações.
- Métrica "Active Projects": 4.
- Hero/SEO descriptions: "4+ plataformas ativas".
- Nenhuma referência a sweetlifeanimes.com ou sweetlifeacademy.coursify.me em código, JSON-LD ou noscript.

## Pergunta opcional
Deseja que eu delete os arquivos `.webp` de Sweet Life dos assets também? (Padrão: manter no repo)
