# Verificação final do plano anterior + documentação

## Situação: o que já está concluído

Conferido arquivo por arquivo:

- Resumo para assistentes de IA (`/llms.txt`): reescrito, sem mentoria, com os 6 projetos.
- Datas do mapa do site: home PT/EN em 23/09; páginas legais mantidas em 26/02 (não mudaram).
- Código dividido em blocos de cache (React, animações, gráficos, interface, backend, partículas, carrossel).
- Google Analytics adiado para depois do primeiro desenho da tela; conexões antecipadas com backend e analytics.
- Partículas do fundo só no computador e só quando a área entra na tela.
- Imagens pesadas comprimidas: Avalia Macapá 1,5 MB → 122 KB; logo 347 KB → 7 KB.
- Robots: assistentes de resposta liberados, coletores em massa bloqueados, auditores limitados.
- Perguntas e respostas estruturadas: 3 → 6 em português e inglês; YouTube incluído no perfil.
- Conteúdo alternativo sem JavaScript já descreve os 6 projetos.
- Verificado: sem erros de build, celular e desktop sem rolagem horizontal, varredura de SEO 100% aprovada.

## Faltou um item do plano

A prioridade de carregamento das imagens não foi aplicada: a primeira imagem visível do site ainda carrega com a mesma prioridade das de baixo da página. É o item que mais mexe na nota de velocidade do Google.

Ajuste: dar prioridade alta à primeira imagem visível e manter as demais em carregamento tardio, com decodificação fora do caminho da tela.

## Documentação a atualizar

1. Novo documento `docs/PERFORMANCE_SEO_GEO_2026-09.md` — registro desta rodada: o que foi mudado, por quê, os números antes/depois das imagens e dos blocos de código, e as regras de robots adotadas (quem pode ler o site e quem foi bloqueado).
2. `README.md` — atualizar a contagem de projetos (6), retirar qualquer menção a mentorias/valores e apontar para o novo documento.
3. `docs/IMAGE_OPTIMIZATION.md` — acrescentar as compressões feitas e o limite recomendado por imagem.
4. `ANALISE_TECNICA_PROJETO.md` — atualizar a seção de desempenho e SEO com o estado atual.

## Pendências que dependem de você

- Google Search Console: ainda não conectado; preciso da sua autorização para ligar a conta e enviar o mapa do site.
- Guia bilíngue "o que é engenharia de prompt" (74 mil buscas/mês): etapa separada, se quiser.
- As mudanças de metadados só passam a valer no endereço público após o deploy.

## Detalhes técnicos

- `src/components/LazyImage.tsx`: aceitar `priority?: boolean`; quando verdadeiro → `loading="eager"`, `fetchPriority="high"`; caso contrário `loading="lazy"`, `fetchPriority="low"`; sempre `decoding="async"`.
- `src/components/sections/ProjectsSection.tsx` e `EcosystemCarousel.tsx`: `priority` apenas no primeiro slide (`index === 0`).
- Verificação: `bunx tsc --noEmit`, build, e Playwright em 375/768/1440 px confirmando que todas as imagens carregam e nada quebra.
- Documentação em markdown, sem alterar código ao escrevê-la.
