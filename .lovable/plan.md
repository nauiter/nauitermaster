# Adicionar GitHub (https://github.com/nauiter)

## O que muda para o visitante
- Novo ícone do GitHub na seção de Contato, ao lado de LinkedIn/Instagram/Facebook.
- Novo ícone do GitHub no rodapé, junto às outras redes.
- Mesmo estilo, cores e animações dos ícones atuais; abre em nova aba.

## Para Google e IAs
- GitHub incluído na lista de perfis oficiais (`sameAs`) dos dados estruturados e do `index.html`.
- GitHub listado no conteúdo de fallback (PT/EN) e no `llms.txt`.

## Detalhes técnicos
- `src/lib/constants.ts`: `SOCIAL_LINKS.GITHUB = 'https://github.com/nauiter'`.
- `ContactSection.tsx` e rodapé em `src/pages/Index.tsx`: ícone `Github` (lucide-react), `aria-label` bilíngue via traduções, alvo de toque 44x44 px.
- `SEOHead.tsx` e `index.html` (JSON-LD `sameAs` + `<noscript>` PT/EN), `public/llms.txt`.
- Verificação: build, Playwright 375/1440px conferindo o link.
