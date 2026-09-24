# Reforçar o nome "Nauiter Master" para o Google

Hoje o nome aparece no título da página, no grande título da capa e no rodapé — por isso o Google já mostra o resultado com esse nome. Faltam alguns pontos que os buscadores usam para confirmar a marca e para exibir o nome do site abaixo do link.

## O que será feito

1. **Nome do site nas metatags**
   Declarar "Nauiter Master" como nome oficial do site (aparece acima do link nos resultados e nas pré-visualizações em redes sociais).

2. **Identidade do site nos dados estruturados**
   Acrescentar um bloco de identificação do site com nome oficial e variações que as pessoas digitam ("Nauiter", "Nauiter Master Portfolio", "nauitermaster.com"), além de uma página de perfil ligando o site ao autor. Isso ajuda o Google a entender que site, marca e pessoa são a mesma entidade.

3. **Nome nos títulos internos das seções**
   Incluir o nome de forma natural em 3 a 4 títulos de seção (por exemplo "Projetos de Nauiter Master", "Certificações de Nauiter Master"), em português e inglês, sem poluir o texto e mantendo um único título principal na página.

4. **Descrição das imagens**
   Padronizar o texto alternativo das imagens de projetos, logos e certificados para começar com "Nauiter Master — ...". Isso também faz o nome aparecer na busca por imagens.

5. **Texto de abertura e rodapé**
   Ajustar a primeira frase da capa e a linha do rodapé para conterem o nome por extenso junto da atividade e da cidade ("Nauiter Master — estrategista de IA em Macapá, Brasil"), que é o formato que o Google costuma reaproveitar.

6. **Arquivos lidos por buscadores e IAs**
   Reforçar o nome no arquivo destinado a assistentes de IA e manter as datas do mapa do site atualizadas.

## O que não muda

Layout, cores, animações e estrutura das seções permanecem iguais. Nenhum preço, mentoria ou conteúdo novo é adicionado.

## Detalhes técnicos

- `index.html`: `<meta property="og:site_name" content="Nauiter Master">` e `<meta name="application-name">`.
- `src/components/SEOHead.tsx`: novo JSON-LD `WebSite` (`name`, `alternateName[]`, `url`, `publisher` → `Person`) e `ProfilePage` com `mainEntity` apontando para o `Person` existente; manter `Organization`, `ItemList`, `FAQPage`, `Service`, `BreadcrumbList`.
- `src/lib/translations.ts`: chaves de títulos de seção e `alt` revisadas em PT/EN com o nome da marca.
- `src/components/sections/ProjectsSection.tsx`, `CertificationsSection.tsx`, `ExperienceSection.tsx`, `EcosystemCarousel.tsx`: `alt` no formato `Nauiter Master — <contexto>`.
- `src/components/sections/HeroSection.tsx`: subtítulo com nome + função + localidade; `<h1>` continua único.
- `public/llms.txt`: título e resumo reforçando a grafia da marca.
- `public/sitemap.xml`: `lastmod` da home PT/EN para a data da alteração.
- Verificação: `bunx tsc --noEmit`, build, Playwright em 375/768/1440 px e nova varredura de SEO.
- Os metadados só valem no endereço público após o próximo deploy.
