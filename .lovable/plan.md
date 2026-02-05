

## Plano de Implementacao: Mentorias, Lucy AI e Painel /fimo_admin

Este plano implementa uma evolucao estrategica em 3 frentes: painel administrativo, secao de mentorias e assistente Lucy AI.

---

## Fase 1: Estrutura do Banco de Dados

### 1.1 Novas Tabelas

```text
+----------------------+     +----------------------+     +----------------------+
|   mentorship_tiers   |     |   mentorship_leads   |     |   lucy_knowledge     |
+----------------------+     +----------------------+     +----------------------+
| id (uuid PK)         |     | id (uuid PK)         |     | id (uuid PK)         |
| tier_key (text)      |     | name (text)          |     | category (text)      |
| name_pt (text)       |     | email (text)         |     | question_pt (text)   |
| name_en (text)       |     | phone (text)         |     | question_en (text)   |
| description_pt       |     | company (text)       |     | answer_pt (text)     |
| description_en       |     | interest_tier        |     | answer_en (text)     |
| price (text)         |     | qualification_score  |     | priority (int)       |
| features_pt (jsonb)  |     | conversation (jsonb) |     | is_active (boolean)  |
| features_en (jsonb)  |     | status (text)        |     | created_at           |
| is_available (bool)  |     | qualified_at         |     | updated_at           |
| display_order (int)  |     | created_at           |     +----------------------+
| created_at           |     | updated_at           |
| updated_at           |     +----------------------+
+----------------------+

+----------------------+     +----------------------+
|   site_settings      |     |   lucy_conversations |
+----------------------+     +----------------------+
| id (uuid PK)         |     | id (uuid PK)         |
| key (text UNIQUE)    |     | session_id (text)    |
| value (jsonb)        |     | messages (jsonb)     |
| updated_at           |     | user_info (jsonb)    |
| updated_by (uuid)    |     | lead_id (uuid FK)    |
+----------------------+     | created_at           |
                             | updated_at           |
                             +----------------------+
```

### 1.2 Politicas RLS

- **mentorship_tiers**: SELECT publico (todos podem ver), UPDATE/INSERT/DELETE apenas admin
- **mentorship_leads**: SELECT/INSERT/UPDATE apenas admin
- **lucy_knowledge**: SELECT publico, UPDATE/INSERT/DELETE apenas admin
- **lucy_conversations**: INSERT publico (visitantes podem criar), SELECT apenas admin
- **site_settings**: SELECT publico, UPDATE apenas admin

---

## Fase 2: Edge Function - Lucy AI Chat

### 2.1 Arquivo: `supabase/functions/lucy-chat/index.ts`

**Responsabilidades:**
- Receber mensagens do usuario
- Consultar a base de conhecimento (`lucy_knowledge`)
- Chamar a Lovable AI Gateway (modelo `google/gemini-3-flash-preview`)
- Qualificar leads e salvar conversas
- Retornar streaming de resposta

**System Prompt da Lucy:**
```
Voce e Lucy, Assistente Estrategica do Nauiter Master. Sua missao e:
1. Responder perguntas sobre o ecossistema e servicos
2. Qualificar interessados em mentorias (entender nivel, budget, objetivos)
3. Quando qualificado, fornecer link de agendamento
4. Manter tom profissional, acolhedor e estrategico

Base de Conhecimento Dinamica: [injetada do banco]
```

---

## Fase 3: Componentes React

### 3.1 MentorshipSection.tsx

**Localizacao:** `src/components/sections/MentorshipSection.tsx`

**Estrutura:**
- 3 cards de servico (Strategic Insight, Ecosystem Builder, Private Partnership)
- Design minimalista com gradientes premium
- Botao "Aplicar" que abre o chat da Lucy
- Indicadores de disponibilidade de vagas
- Suporte completo i18n

### 3.2 LucyAssistant.tsx

**Localizacao:** `src/components/LucyAssistant.tsx`

**Funcionalidades:**
- Floating button no canto inferior direito
- Chat expandivel com animacao
- Streaming de mensagens em tempo real
- Historico de conversa na sessao
- Auto-detectar idioma do usuario

### 3.3 Pagina /fimo_admin

**Novos arquivos:**
- `src/pages/FimoAdmin.tsx` - Layout principal
- `src/components/admin/AdminSidebar.tsx` - Navegacao lateral
- `src/components/admin/MentorshipManager.tsx` - CRUD de tiers
- `src/components/admin/LeadsTable.tsx` - Lista de leads qualificados
- `src/components/admin/LucyKnowledgeEditor.tsx` - Editor da base
- `src/components/admin/SettingsPanel.tsx` - Toggles de configuracao

---

## Fase 4: Traducoes i18n

### 4.1 Adicoes ao translations.ts

```typescript
mentorship: {
  title: string;
  subtitle: string;
  tiers: {
    strategicInsight: { name, description, features, cta };
    ecosystemBuilder: { name, description, features, cta };
    privatePartnership: { name, description, features, cta };
  };
  spotsRemaining: string;
  applyNow: string;
};

lucy: {
  greeting: string;
  placeholder: string;
  thinking: string;
  qualificationComplete: string;
  scheduleLink: string;
};

admin: {
  title: string;
  sidebar: { mentorship, leads, knowledge, settings };
  // ... demais labels
};
```

---

## Fase 5: Rotas e Autenticacao

### 5.1 App.tsx - Novas Rotas

```typescript
// Rota protegida do admin
<Route path="/fimo_admin/*" element={<ProtectedRoute><FimoAdmin /></ProtectedRoute>} />
<Route path="/login" element={<AdminLogin />} />
```

### 5.2 ProtectedRoute.tsx

- Verificar se usuario esta autenticado via Supabase Auth
- Verificar se usuario tem role 'admin' usando `has_role()`
- Redirecionar para `/login` se nao autorizado

---

## Fase 6: Integracao na Index

### 6.1 Posicionamento da MentorshipSection

Adicionar apos `ContactSection` e antes do Footer:

```tsx
{/* Mentorship Programs */}
<MentorshipSection />
```

### 6.2 LucyAssistant Global

Adicionar no App.tsx como componente global:

```tsx
<LucyAssistant />
```

---

## Resumo de Arquivos

| Tipo | Arquivos |
|------|----------|
| **Banco** | 5 novas tabelas + RLS policies |
| **Edge Function** | `supabase/functions/lucy-chat/index.ts` |
| **Componentes** | MentorshipSection, LucyAssistant, AdminSidebar, MentorshipManager, LeadsTable, LucyKnowledgeEditor, SettingsPanel |
| **Paginas** | FimoAdmin, AdminLogin |
| **Hooks** | useAdmin, useLucy |
| **Traducoes** | +150 linhas em translations.ts |
| **Config** | config.toml atualizado |

---

## Ordem de Implementacao

1. Criar tabelas no banco de dados
2. Implementar edge function lucy-chat
3. Criar componentes admin
4. Criar MentorshipSection
5. Criar LucyAssistant
6. Adicionar traducoes
7. Configurar rotas protegidas
8. Integrar na Index
9. Testar fluxo completo

---

## Notas de Seguranca

- Admin verificado via `has_role(_user_id, 'admin')` (funcao ja existente)
- Conversas da Lucy armazenadas para auditoria
- Rate limiting na edge function
- Nenhuma informacao sensivel exposta no frontend

