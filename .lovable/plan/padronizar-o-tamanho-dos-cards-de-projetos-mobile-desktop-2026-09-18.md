# Padronizar o tamanho dos cards de Projetos (mobile + desktop)

## O problema

No celular, cada projeto do carrossel tem uma altura diferente: descrições mais longas e mais etiquetas (React, TypeScript, etc.) empurram o botão "Visitar Projeto" para baixo. Resultado: ao deslizar entre projetos o card "pula" de tamanho, e em alguns casos o botão fica cortado na parte de baixo.

Hoje isso é contornado com alturas mínimas fixas para o texto e para as etiquetas, o que funciona para um tamanho de tela e falha em outros.

## A correção

1. Todos os cards de projeto passam a ter a mesma altura, definida pelo projeto mais alto — sem saltos ao deslizar, em qualquer tela.
2. O botão "Visitar Projeto" fica sempre ancorado na base do card, na mesma posição em todos os projetos.
3. A imagem de topo passa a ter a mesma proporção em todos os cards (mesma altura em mobile e em desktop).
4. Remoção das alturas mínimas improvisadas do texto e das etiquetas, que hoje criam espaços vazios diferentes em cada tela.
5. Ajuste leve de espaçamentos e tamanho de texto no celular, para o card caber na tela sem corte (hoje o conteúdo do Chaos Oracle passa da área visível).

## Revisão geral das outras seções

Mesma verificação e, quando necessário, o mesmo padrão nas listas de cards das seções de Certificações, Ecossistema, Competências, Tecnologias e Mentoria: cards da mesma linha com altura igual e botões/rodapés alinhados. Só serão alterados os pontos onde existir desalinhamento real.

## Detalhes técnicos

- `src/components/ui/carousel.tsx`: `CarouselContent` recebe `items-stretch` e `CarouselItem` `h-full`, para que os slides compartilhem a altura do mais alto (hoje cada slide se ajusta ao próprio conteúdo).
- `src/components/sections/ProjectsSection.tsx`:
  - wrapper do slide e card interno com `h-full flex flex-col`;
  - bloco de conteúdo `flex-1 flex flex-col`; descrição em `flex-1`; CTA com `mt-auto`;
  - remover `min-h-[4.5rem] sm:min-h-[5rem]` da descrição e `min-h-[5rem] sm:min-h-[4.5rem]` das etiquetas;
  - imagem: proporção única (`aspect-video` em todas as larguras) em vez de `aspect-video md:aspect-[21/9]`;
  - badge de categoria reposicionado para `top-4 left-4` no mobile, evitando sobrepor a imagem de forma desigual;
  - reduzir paddings/typo no mobile (`p-5`, descrição `text-base`) para o card caber na viewport.
- Como as animações usam `opacity`/`translate` por slide, a altura compartilhada não interfere no efeito de entrada.
- Verificação final com Playwright em 375px, 763px e 1440px, comparando a altura dos 5 cards.

## Memória

Atualizar a memória "Responsive Project Cards" para registrar o padrão de altura igual por flexbox, substituindo a regra antiga de alturas mínimas.
