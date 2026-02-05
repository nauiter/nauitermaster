

## Plano: i18n de Precos e Configuracao de Acesso Admin

---

## Problema 1: Internacionalizacao de Precos

### Situacao Atual

A tabela `mentorship_tiers` tem apenas uma coluna `price` com valores em Reais:
- Strategic Insight: `R$ 497`
- Ecosystem Builder: `R$ 1.997/mes`
- Private Partnership: `Sob consulta`

### Solucao: Adicionar colunas `price_pt` e `price_en`

**Alteracoes no Banco de Dados:**
```sql
-- Adicionar novas colunas
ALTER TABLE mentorship_tiers ADD COLUMN price_pt text;
ALTER TABLE mentorship_tiers ADD COLUMN price_en text;

-- Migrar dados existentes
UPDATE mentorship_tiers SET 
  price_pt = price,
  price_en = CASE 
    WHEN tier_key = 'strategic_insight' THEN 'US$ 97'
    WHEN tier_key = 'ecosystem_builder' THEN 'US$ 397/month'
    WHEN tier_key = 'private_partnership' THEN 'Upon request'
  END;

-- Remover coluna antiga
ALTER TABLE mentorship_tiers DROP COLUMN price;
```

**Alteracoes no Componente `MentorshipSection.tsx`:**
- Linha 15: Atualizar interface para `price_pt` e `price_en`
- Linha 162: Usar `language === "pt" ? tier.price_pt : tier.price_en`

**Alteracoes no Admin `MentorshipManager.tsx`:**
- Adicionar campos separados para editar `price_pt` e `price_en`

---

## Problema 2: Configuracao de Acesso Administrativo

### Situacao Atual

A tabela `user_roles` esta **vazia** - nenhum admin configurado.

### Solucao: Criar usuario admin via Supabase Auth

**Passo 1:** Criar usuario no Supabase Auth com as credenciais fornecidas:
- Email: `nauiter-master@hotmail.com`
- Senha: `nN!120895`

**Passo 2:** Atribuir role admin na tabela `user_roles`:
```sql
INSERT INTO user_roles (user_id, role) 
VALUES ('<uid-do-usuario>', 'admin');
```

**Nota de Seguranca:** O usuario sera criado via Edge Function dedicada para garantir que a senha seja tratada de forma segura. O UID sera automaticamente inserido na tabela `user_roles` apos a criacao.

---

## Arquivos a Modificar

| Arquivo | Alteracoes |
|---------|------------|
| Banco de dados | Adicionar `price_pt`, `price_en`, migrar dados |
| `MentorshipSection.tsx` | Atualizar interface e exibicao de preco |
| `MentorshipManager.tsx` | Campos separados para precos PT/EN |
| `useAdmin.tsx` | Suportar novos campos de preco |
| `types.ts` | Sera auto-atualizado |

---

## Fluxo de Implementacao

1. Executar migracao SQL para adicionar colunas de preco
2. Atualizar componente `MentorshipSection.tsx` para exibir preco por idioma
3. Atualizar painel admin para editar precos em ambos idiomas
4. Criar usuario admin e atribuir role
5. Testar login e acesso ao `/fimo_admin`

---

## Checklist de Validacao

- Versao EN exibe precos em US$
- Versao PT exibe precos em R$
- Admin pode editar precos em ambos idiomas
- Login com credenciais fornecidas funciona
- `/fimo_admin` acessivel apos login
- Acesso anonimo redireciona para `/login`

