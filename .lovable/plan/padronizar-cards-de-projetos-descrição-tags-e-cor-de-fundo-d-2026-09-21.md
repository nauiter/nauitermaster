# Padronizar cards de projetos: descrição, tags e cor de fundo das tags

## Problema

No carrossel de projetos:
- Algumas descrições têm 2 linhas (Figueiredo Law) e outras 4-5 (Nyet Future, QA Master, Chaos Oracle), deixando os cards visualmente desequilibrados.
- O número de tags varia de 3 a 5 por projeto.
- As tags usam um cinza-escuro chapado, sem o tom suave ligado à cor da categoria do projeto.

## Solução

### 1. Descrições com tamanho uniforme (PT e EN)
Reescrever as descrições dos 6 projetos para o mesmo intervalo (aprox. 150-185 caracteres), preservando a mensagem de cada um. As mais curtas ganham uma frase de valor; as mais longas são condensadas. Exemplos:
- Figueiredo Law: ampliar para incluir o foco em direito, ética e tecnologia aplicada a IA.
- Nyet Future: manter nicho, Suno AI e a rede de 3 canais em forma mais enxuta.
- QA Master / Chaos Oracle: condensar mantendo o diferencial (local-first / teoria do caos).

Resultado: 3 linhas no desktop e altura de bloco consistente no mobile.

### 2. Número fixo de tags
Padronizar em **4 tags por projeto** (hoje varia entre 3 e 5), escolhendo as 4 mais representativas. Aplicado em PT e EN para as tags refletirem a mesma ordem e quantidade.

### 3. Tags com fundo suave e tonalizado
Trocar o fundo chapado por um tom translúcido da cor da categoria do card:
- Universo Criativo (violeta) e Conceitos Experimentais (ciano) ganham fundo e borda na própria cor com baixa opacidade, texto claro.
- Cada card passa a receber a cor da tag junto da cor da categoria, mantendo o padrão do design cósmico.

### 4. Reserva de altura para as tags
Como todas passam a ter 4 tags, a linha de tags fica estável sem precisar de altura mínima fixa — o padrão de flexbox atual (sem `min-h`) continua valendo.

## Detalhes técnicos

- `src/lib/translations.ts`: reescrever `projects.<slug>.description` e igualar `tools` em 4 itens, nos blocos EN e PT.
- `src/components/sections/ProjectsSection.tsx`: adicionar campo `tagClass` em cada item do array `projects` (variante violeta ou ciano) e usá-lo na `<span>` das tags, substituindo `bg-[#1a1f2e] border-white/20`.
- Sem mudanças de layout estrutural: `CarouselItem`/card seguem o padrão flex já estabelecido, sem reintroduzir `min-h-[...]`.
- Verificação com Playwright em 375px, 768px e 1440px: conferir altura igual dos 6 cards e leitura das tags.
