# Desativar Mentorias e Valores (mantendo contato ativo)

## Objetivo
Remover a vitrine de mentorias/preços do site (nada à venda no momento), preservando todos os canais de contato: seção de Contato, Lucy AI (captura de leads) e ícones sociais.

## Mudanças

### 1. Seção de Mentorias (o que some da tela)
- Remover `<MentorshipSection />` de `src/pages/Index.tsx` (import + render).
- Manter o arquivo `MentorshipSection.tsx` e as tabelas `mentorship_tiers` / `mentorship_leads` intactos no backend — apenas desativado na interface, fácil de reativar no futuro.
- Remover chaves de tradução de mentoria não utilizadas em `src/lib/translations.ts` (PT/EN).

### 2. Lucy AI (deixa de vender)
- `supabase/functions/lucy-chat/index.ts`: remover a busca de `mentorship_tiers` e os blocos "PROGRAMAS DE MENTORIA" / "MENTORSHIP PROGRAMS" do prompt.
- Ajustar as instruções: se perguntarem sobre serviços/mentoria/valores, Lucy responde que no momento não há programas pagos ativos e direciona para os canais de contato (e continua capturando o lead normalmente).

### 3. SEO / Conteúdo para buscadores
- `index.html` (`<noscript>` PT/EN): remover o bloco "Mentoria em IA" e a menção "Cursos e mentorias" da lista de serviços; manter consultoria, desenvolvimento e educação em IA de forma genérica (sem venda).
- `src/components/SEOHead.tsx`: ajustar as respostas do FAQ (JSON-LD) que citam "programas de mentoria personalizados" e as descrições das páginas de Termos de Uso que citam "mentoria".

### 4. O que NÃO muda
- Seção de Contato, ícones e canais (e-mail, redes sociais) permanecem.
- Lucy continua ativa como assistente e captura de leads.
- Painel `/fimo_admin` e dados de leads/tiers preservados (sem apagar nada).

## Verificação
- `bunx tsc --noEmit` sem erros e build OK.
- Playwright em 375px e 1440px: seção de mentorias ausente, Contato e Lucy funcionando, sem links quebrados.
