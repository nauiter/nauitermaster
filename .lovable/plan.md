# Melhorias: desempenho, SEO, GEO, robots e indexação

Levantamento feito no mapa do site, no arquivo para IAs (`/llms.txt`), no robots, nas metatags e na varredura de SEO. As fundações estão aprovadas — o que segue são ganhos visíveis e fáceis de mostrar em relatório.

## 1. Corrigir informação desatualizada para buscadores e IAs (prioridade alta)

O `/llms.txt` — o texto que ChatGPT, Claude e Perplexity leem sobre o site — ainda anuncia "mentorship programs" e "AI mentorship", que foram desativados. Também não cita QA Master nem Nyet Future.

Ajuste: reescrever o resumo, listar os 6 projetos ativos com link e descrição curta, remover qualquer menção a mentoria/valores e atualizar os tópicos.

## 2. Datas do mapa do site

As páginas legais estão com data de fevereiro e a home com 18/09, mas houve mudanças depois (novos projetos, remoção de mentorias). Atualizar apenas as datas das páginas que realmente mudaram.

## 3. Ganhos de velocidade (o que o Google mede)

- Dividir o código em blocos maiores e estáveis (React, animações, gráficos, componentes de interface) para o primeiro carregamento ficar mais leve.
- Antecipar a conexão com os serviços externos usados no início (fontes, analytics, backend) e adiar o Google Analytics para depois do primeiro desenho da tela.
- Carregar a biblioteca de partículas só quando a seção inicial estiver visível e apenas no desktop; no celular ela não agrega e consome tempo.
- Dar prioridade de carregamento à primeira imagem visível e manter as demais em carregamento tardio.
- Gerar o painel administrativo, os gráficos e o assistente em blocos separados, fora do caminho da primeira visita.

## 4. Robots e indexadores

- Adicionar bloqueio explícito para os robôs de IA mais agressivos que ainda não estão listados (Meta, Amazon, Applebot-Extended, Google-Extended, Omgili/DataForSeo) — ou liberá-los de propósito, conforme sua escolha.
- Declarar `Crawl-delay` para os coletores de dados em massa e manter Google/Bing sem limite.
- Incluir o mapa do site também em um cabeçalho de resposta não é possível neste tipo de site; manter a linha `Sitemap:` já presente (correta).

## 5. GEO (ser citado por assistentes de IA)

- Ampliar o bloco de perguntas frequentes com perguntas que as pessoas realmente fazem ("quem é Nauiter Master", "o que é engenharia de prompt", "quais ferramentas de IA usar"), em PT e EN — é o formato que os assistentes mais reaproveitam.
- Acrescentar dados estruturados de navegação (trilha de páginas) e de perfil profissional com as redes já existentes, para os assistentes ligarem site e autor.
- Garantir que o conteúdo alternativo sem JavaScript (`<noscript>`) descreva os 6 projetos com o mesmo texto do site.

## 6. Conteúdo que traz visitas novas (opcional, maior esforço)

A varredura aponta a oportunidade "o que é engenharia de prompt" (74 mil buscas/mês). Seria uma página nova bilíngue (`/pt/blog/...` e `/en/blog/...`), com dados estruturados de artigo, entrada no mapa do site e link no menu. Posso fazer depois, em etapa separada.

## 7. Google Search Console (depende de você)

Ainda não está conectado — sem isso não há dados de cliques, consultas nem envio oficial do mapa do site. Preciso que você autorize o acesso à sua conta Google; a verificação da propriedade e o envio do mapa eu faço na sequência.

## Detalhes técnicos

- `public/llms.txt`: reescrever resumo + seções `## Pages`, `## Projects`, `## Topics`; remover mentorship.
- `public/sitemap.xml`: `lastmod` 2026-09-23 na home PT/EN; legais conforme última alteração real.
- `vite.config.ts`: `build.rollupOptions.output.manualChunks` (react, framer-motion, recharts, radix, supabase).
- `index.html`: `preconnect`/`dns-prefetch` para fontes, GA4 e backend; GA4 carregado após `load`.
- `HeroSection.tsx`: partículas via `IntersectionObserver` + `useIsMobile()` (desktop apenas), mantendo o `requestIdleCallback` atual como fallback.
- `LazyImage.tsx` / primeiro card: `fetchpriority="high"` e `loading="eager"` na primeira imagem acima da dobra; restante `lazy` + `decoding="async"`.
- `public/robots.txt`: novos blocos `meta-externalagent`, `Amazonbot`, `Applebot-Extended`, `Google-Extended`, `Omgilibot`, `DataForSeoBot`; `Crawl-delay: 10` nos coletores em massa.
- `SEOHead.tsx`: expandir `FAQPage` (4-6 perguntas PT/EN), adicionar `BreadcrumbList` e `ProfilePage`/`sameAs` consolidado.
- Verificação: `tsc`, build, Playwright em 375/768/1440 px e nova varredura de SEO ao final.
