# Adicionar projeto Nyet Future

## Objetivo
Adicionar o canal **Nyet Future** (música dark/atmospheric gerada com Suno AI, nicho darkwave/coldwave/doomer/post-punk, público internacional em inglês) como sexto projeto do portfólio, atualizando contadores e dados.

## Alterações

### 1. Asset de imagem
- Usar `logo_nyet.png` (enviado) como capa do projeto: otimizar para WebP e salvar como `src/assets/nyet-future.webp` (padrão dos demais projetos).

### 2. Contadores e URLs — `src/lib/constants.ts`
- `ACTIVE_PROJECTS: 5` → `6`
- Adicionar `NYET_FUTURE: 'https://www.youtube.com/@nyetfuture'` em `PROJECT_URLS`

### 3. Traduções — `src/lib/translations.ts` (PT/EN)
- Nova chave `projects.nyetFuture` com título, descrição e ferramentas:
  - **Descrição EN:** "Dark/atmospheric music channel built with Suno AI for the international darkwave/coldwave/doomer/post-punk scene. Born as a single channel, it expanded into a 3-channel network: Nyet Future, Dead Signal and Fading Protocol."
  - **Descrição PT:** "Canal de música dark/atmospheric criado com Suno AI para o público internacional de darkwave/coldwave/doomer/post-punk. Nasceu como canal único e expandiu para uma rede de 3 canais: Nyet Future, Dead Signal e Fading Protocol."
  - Tools: Suno AI, YouTube, AI Music Production, Creative Direction
- Nova chave `ecosystem.projects.nyetFuture` (name, purpose, type)
- Atualizar textos "5+ active platforms" / "5+ plataformas ativas" → "6+"

### 4. Carrossel de Projetos — `src/components/sections/ProjectsSection.tsx`
- Nova entrada com capa, alt-text bilíngue, URL do YouTube e categoria **Creative Universe** (violeta `text-[#7A5FFF]`), mesma estrutura flex dos demais cards (sem `min-h`).

### 5. Ecosystem — `src/pages/Index.tsx`
- Nova entrada no grid com gradiente `from-red-600 to-violet-500` (combina com a arte dark/vermelha) e URL do YouTube.

### 6. SEO/JSON-LD — `src/components/SEOHead.tsx`
- Adicionar Nyet Future ao `ItemList` de projetos (nome + URL do YouTube).

### 7. Verificação
- `bunx tsc --noEmit` e build log OK
- Playwright em 375/768/1440px: alturas iguais dos cards, sem overflow, imagem carregando

## Observações
- Categoria escolhida: **Creative Universe** (projeto criativo/musical, como O Verme Passeia). Se preferir "Experimental Concepts", avise.
- Não será adicionado favicon novo — a imagem é capa de projeto, não marca do site.
