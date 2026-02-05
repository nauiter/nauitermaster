

## Plano: Melhorias no Painel Admin + Otimizacao da Lucy AI

---

## Resumo dos Problemas

1. **Lucy AI com respostas muito longas** - usuarios nao leem textos extensos
2. **Referencia ao Calendly inexistente** - precisa coletar leads diretamente
3. **Lucy nao esta salvando leads na tabela `mentorship_leads`** - apenas salva conversas
4. **Painel Admin pode ser melhorado** - funcionalidades extras para gestao de leads

---

## Parte 1: Otimizar Prompt da Lucy (Respostas Curtas)

**Arquivo:** `supabase/functions/lucy-chat/index.ts`

### Alteracoes no System Prompt

**Remover:**
- Link Calendly: `https://calendly.com/nauiter-master`
- Instrucao de fornecer link de agendamento

**Adicionar:**
- Regra de brevidade: "Responda em no maximo 2-3 frases curtas"
- Foco em coleta de dados: nome, email, interesse
- Quando qualificado, informar que a equipe entrara em contato

### Novo Prompt (PT):
```
Voce e Lucy, Assistente Estrategica do Nauiter Master. Sua missao e:
1. Responder perguntas de forma BREVE e direta (maximo 2-3 frases)
2. Qualificar interessados coletando: nome, email e principal desafio
3. Quando tiver os dados, informar que a equipe entrara em contato em breve

REGRAS CRITICAS:
- Seja EXTREMAMENTE concisa - usuarios nao leem textos longos
- Use frases curtas e objetivas
- Nao faca listas longas
- Quando qualificar, pergunte UMA informacao por vez
- Apos coletar email, agradeca e diga que entraremos em contato
```

---

## Parte 2: Salvar Leads Automaticamente

**Arquivo:** `supabase/functions/lucy-chat/index.ts`

### Logica de Extracao de Leads

Adicionar funcao para detectar quando o usuario fornece email/nome na conversa e salvar automaticamente na tabela `mentorship_leads`:

```typescript
// Detectar email no conteudo
const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
const emailMatch = lastUserMessage.match(emailRegex);

if (emailMatch) {
  // Salvar lead automaticamente
  await supabase.from("mentorship_leads").upsert({
    email: emailMatch[0],
    name: extractedName || "Lead via Lucy",
    conversation: allMessages,
    status: "new",
    qualification_score: 1,
  }, { onConflict: "email" });
}
```

---

## Parte 3: Melhorias no Painel Admin

### 3.1 Dashboard com Metricas

**Arquivo:** `src/pages/FimoAdmin.tsx`

Adicionar tab "Dashboard" com:
- Total de leads por status (novo, qualificado, contactado, convertido)
- Leads recentes (ultimos 7 dias)
- Taxa de conversao

### 3.2 Melhorar LeadsTable

**Arquivo:** `src/components/admin/LeadsTable.tsx`

Adicionar:
- Filtro por status
- Busca por nome/email
- Botao de exportar leads (CSV)
- Indicador de "qualification_score"
- Acao rapida para copiar email
- Destaque para leads novos

### 3.3 Novo Componente: AdminDashboard

**Criar:** `src/components/admin/AdminDashboard.tsx`

Cards com metricas:
- Total Leads
- Leads Novos (esta semana)
- Taxa de Qualificacao
- Leads por Tier de Interesse

---

## Arquivos a Modificar

| Arquivo | Alteracao |
|---------|-----------|
| `supabase/functions/lucy-chat/index.ts` | Prompt curto + salvar leads automaticamente |
| `src/pages/FimoAdmin.tsx` | Adicionar tab Dashboard |
| `src/components/admin/LeadsTable.tsx` | Filtros, busca, exportar, melhorias visuais |
| `src/components/admin/AdminDashboard.tsx` | CRIAR - metricas e overview |
| `src/hooks/useAdmin.tsx` | Adicionar funcao de stats |

---

## Fluxo de Qualificacao Atualizado

```text
Usuario abre chat -> Lucy cumprimenta brevemente
                          |
                          v
                  Pergunta objetivo (1 frase)
                          |
                          v
                  Pergunta email para contato
                          |
                          v
              Lead salvo automaticamente
                          |
                          v
        Lucy agradece: "Entraremos em contato!"
```

---

## Validacao

1. Testar chat Lucy - respostas curtas (2-3 frases)
2. Fornecer email no chat - verificar se lead aparece no admin
3. Verificar painel admin - dashboard com metricas
4. Testar filtros e busca na tabela de leads
5. Login admin funcionando com `nauitermaster@hotmail.com`

