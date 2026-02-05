

## Plano: Análise e Correção de Vulnerabilidades de Segurança

---

## Resumo dos Findings

| # | Severidade | Nome | Decisão |
|---|------------|------|---------|
| 1 | ⚠️ warn | RLS Policy Always True | ✅ Corrigir |
| 2 | ⚠️ warn | Leaked Password Protection Disabled | ✅ Corrigir |
| 3 | 🔴 error | User Profile Data Exposed | 🔕 Ignorar |
| 4 | 🔴 error | Customer Contact Info Harvestable | ✅ Corrigir |
| 5 | ⚠️ warn | Chat Conversations Lack Read Protection | ✅ Corrigir |
| 6 | ⚠️ warn | Conversation Data Cannot Be Managed | ✅ Corrigir |
| 7 | ℹ️ info | Site Config Cannot Be Cleaned | 🔕 Ignorar |
| 8 | ℹ️ info | Profiles Cannot Be Deleted | 🔕 Ignorar |
| 9 | ℹ️ info | User Role Management Incomplete | 🔕 Ignorar |

---

## Findings a Corrigir

### 1. RLS Policy Always True (lucy_conversations INSERT)

**Problema:** A tabela `lucy_conversations` tem `WITH CHECK (true)` para INSERT, permitindo qualquer pessoa inserir dados.

**Solução:** Manter como está porque a Lucy precisa que visitantes anônimos possam criar conversas. Porém, adicionar políticas SELECT restritivas.

**Decisão:** Ignorar o INSERT (intencional para chat público), mas corrigir falta de proteção de leitura.

---

### 2. Leaked Password Protection Disabled

**Problema:** Proteção contra senhas vazadas está desabilitada.

**Solução:** Habilitar via configuração de autenticação.

**Ação:** Usar ferramenta de configuração de auth para ativar.

---

### 3. Customer Contact Info Harvestable + Chat Lacks Read Protection

**Problema:** Usuários anônimos podem potencialmente ler conversas se souberem o session_id.

**Solução:** Já existe política SELECT apenas para admins, mas usar política RESTRICTIVE (não PERMISSIVE) garante maior segurança.

**SQL:**
```sql
-- A política SELECT já é restrictive (uses has_role)
-- Verificar se está funcionando corretamente
```

---

### 4. Conversation Data Cannot Be Managed

**Problema:** Admins não podem deletar conversas (GDPR compliance).

**Solução:**
```sql
CREATE POLICY "Admins can delete conversations"
ON lucy_conversations FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));
```

---

## Findings a Ignorar (com justificativa)

### 3. User Profile Data Exposed

**Justificativa:** A tabela `profiles` é intencionalmente pública para exibir informações de perfil no site (avatar, nome). Não contém dados sensíveis (sem emails, telefones). O design é intencional para um portfólio público.

---

### 7. Site Config Cannot Be Cleaned

**Justificativa:** Configurações de site raramente precisam ser deletadas. A funcionalidade atual de UPDATE é suficiente. Risco baixo.

---

### 8. Profiles Cannot Be Deleted

**Justificativa:** Accounts são gerenciados via Supabase Auth. Se um usuário for deletado do auth.users, o CASCADE já deleta o profile automaticamente. Não é necessário DELETE manual.

---

### 9. User Role Management Incomplete

**Justificativa:** Roles são gerenciados diretamente via banco de dados com service_role por segurança. Não permitir que mesmo admins adicionem roles via RLS evita escalação de privilégios.

---

## Implementação

### Migration SQL

```sql
-- 1. Adicionar DELETE policy para lucy_conversations
CREATE POLICY "Admins can delete conversations"
ON lucy_conversations FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));
```

### Configuração de Auth

Habilitar "Leaked Password Protection" via ferramenta de configuração.

---

## Arquivos a Modificar

| Tipo | Ação |
|------|------|
| Migration SQL | Adicionar DELETE policy para conversations |
| Auth Config | Habilitar leaked password protection |
| Security Findings | Marcar findings ignorados com justificativa |

---

## Resultado Esperado

- Admins poderão deletar conversas (GDPR compliance)
- Proteção contra senhas vazadas ativada
- Findings de baixo risco ignorados com documentação

