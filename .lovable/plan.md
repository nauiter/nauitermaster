# Análise geral: mobile, desktop, SEO e GEO

Revisão feita com navegador real em 375px (celular) e 1440px (desktop), nas páginas inicial (PT/EN), política de privacidade e termos de uso, mais a varredura de SEO do projeto.

## O que está bom

- Página inicial responde corretamente, sem rolagem horizontal em nenhum tamanho.
- Título e descrição da página, ícone do site, prévia para redes sociais, robots.txt e resumo para assistentes de IA (/llms.txt): todos aprovados.
- Todas as imagens têm texto alternativo; páginas legais já têm título principal correto.
- Cards de projetos agora com altura padronizada (correção anterior confirmada).

## Correções propostas

### 1. Alvos de toque pequenos no celular (acessibilidade e usabilidade)

Medidos abaixo do mínimo recomendado de 44x44 px:
- setas do carrossel de projetos: 32x32
- bolinhas indicadoras de projeto: 8x8
- setas do carrossel de certificações: 38x38
- link "Ver Credencial": 23x23
- botão do menu no topo: 48x36

Ajuste: aumentar a área clicável desses elementos para no mínimo 44x44 px, mantendo o desenho visual atual (área invisível ao redor quando o ponto precisa continuar pequeno).

### 2. Conteúdo demora a aparecer (afeta SEO/GEO e sensação de lentidão)

O título principal só aparece depois de uma espera artificial embutida na página (800 ms de "carregando" propositais), somada à animação de partículas no desktop. Nos testes, o título levou 4,2 s no celular e 7,8 s no desktop.

Ajuste: remover/reduzir drasticamente a espera artificial, mostrar o conteúdo real assim que estiver pronto e carregar as partículas depois do primeiro desenho da tela.

### 3. Avisos no console

- Aviso do React sobre passagem de referência para um componente de seção (corrigir com encaminhamento de referência).
- Regra de segurança `frame-ancestors` declarada em etiqueta HTML, onde os navegadores a ignoram: remover a linha ineficaz para limpar o aviso.

### 4. SEO / GEO

- Mapa do site: a varredura aponta falta de `/privacy-policy`, `/terms-of-use` e `/login`. As duas primeiras já constam do arquivo; `/login` é área administrativa e deve continuar fora. Vou confirmar após nova varredura e registrar o item como resolvido se for apenas resultado antigo.
- Datas do mapa do site ainda em fevereiro/2026: atualizar apenas as páginas que realmente mudaram (inicial, projetos).
- Páginas de login e de erro 404 já têm título e prévia próprios; será confirmado na nova varredura.
- Google Search Console ainda não está conectado: depende de você autorizar o acesso e confirmar a propriedade do domínio. Posso conduzir isso quando quiser.
- Oportunidade de conteúdo (Semrush): guia "o que é engenharia de prompt" (74 mil buscas/mês). Fora deste escopo; se quiser, faço depois como página bilíngue.

## Detalhes técnicos

- `ProjectsSection.tsx`: `CarouselPrevious/Next` com `h-11 w-11`; bolinhas com wrapper `p-2 -m-2` ou `min-h-11` mantendo o traço visual de 8px.
- `CertificationsSection.tsx`: setas `h-11 w-11`; link "Ver Credencial" com `min-h-11 min-w-11 inline-flex items-center justify-center`.
- Header: botão de menu `min-h-11 min-w-11`.
- `usePageLoading(800)` → reduzir para 0/150 ms e manter os esqueletos apenas enquanto os dados/imagens não estiverem prontos; `HeroSection` carrega as partículas em `requestIdleCallback`.
- `src/components/ui/section.tsx`: converter para `React.forwardRef` (hoje `ProjectsSection` passa `ref` para um componente de função).
- `index.html`: remover `frame-ancestors` do `<meta http-equiv="Content-Security-Policy">` (mantendo as outras diretivas).
- `public/sitemap.xml`: `lastmod` apenas onde houve mudança real de conteúdo.
- Verificação final: script Playwright em 375/768/1440 medindo alvos de toque, tempo até o título e ausência de rolagem horizontal; depois `seo--trigger_scan` e atualização dos achados.
