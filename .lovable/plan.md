

## Plano: Corrigir Erros de Indexacao do Google Search Console

---

## Diagnostico

O Google Search Console reporta 4 paginas nao indexadas:

| Erro | Qtd | Causa |
|------|-----|-------|
| Pagina alternativa com tag canonica adequada | 3 | As paginas `/pt/privacy-policy`, `/pt/terms-of-use` e `/pt` sao vistas como alternativas da versao EN (canonical aponta para a raiz `/` que redireciona) |
| Pagina com redirecionamento | 1 | A raiz `/` (canonical no index.html) e uma pagina de redirect, nao conteudo real |

**Causa raiz:** O `index.html` declara `<link rel="canonical" href="https://nauitermaster.com/" />` — mas `/` e uma pagina de redirect (302/JS redirect para `/pt` ou `/en`). O Google indexa a canonical `/` como redirect e marca as variantes linguisticas como "alternativas com canonical adequada" (nao indexaveis independentemente).

---

## Alteracoes

### 1. index.html - Corrigir canonical e og:url

O canonical estatico no `index.html` deve apontar para `/en` (a pagina x-default real com conteudo), nao para `/` (redirect).

- Linha 28: `canonical` de `https://nauitermaster.com/` para `https://nauitermaster.com/en`
- Linha 35: `og:url` de `https://nauitermaster.com/` para `https://nauitermaster.com/en`

### 2. LanguageRedirect.tsx - Adicionar noindex na pagina de redirect

A pagina `/` (redirect) deve sinalizar ao Google que nao deve ser indexada, apenas seguida.

- Adicionar `<meta name="robots" content="noindex, follow" />` via `useEffect` quando a rota e `/`
- Remover o meta ao desmontar o componente

### 3. LegalPageRedirect.tsx - Adicionar noindex nas paginas de redirect legal

As rotas `/privacy-policy` e `/terms-of-use` (sem prefixo de idioma) tambem sao redirects.

- Adicionar `<meta name="robots" content="noindex, follow" />` da mesma forma

### 4. SEOHead.tsx - Garantir canonical correto por rota

O SEOHead ja gera canonical dinamico com `fullUrl`, mas quando esta em `/pt` gera canonical `https://nauitermaster.com/pt` e em `/en` gera `https://nauitermaster.com/en` — isso esta correto. Nenhuma alteracao necessaria.

---

## Resultado Esperado

- `/` deixa de ser indexada (noindex) — resolve "Pagina com redirecionamento"
- Canonical aponta para `/en` (conteudo real) — resolve "Pagina alternativa com tag canonica adequada"
- `/pt` e `/en` sao indexadas independentemente via seus proprios canonicals dinamicos
- As 3 paginas alternativas passam a ser indexadas corretamente na proxima re-crawl

