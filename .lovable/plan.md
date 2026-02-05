

## Plano: Correção do Email Admin + Legibilidade da Lucy

---

## Problema 1: Email Admin Incorreto

### Situação Atual
O email cadastrado no banco é `nauiter-master@hotmail.com` (com hífen).
O email correto deve ser `nauitermaster@hotmail.com` (sem hífen).

### Solução
Atualizar o email do usuário admin via Supabase Auth usando uma Edge Function temporária que usa a Admin API.

---

## Problema 2: Texto Ilegível na Lucy

### Situação Atual
- Fundo das mensagens: `bg-white/5` (5% opacidade - muito transparente)
- Texto: `text-gray-200` (cinza claro com baixo contraste)
- Markdown não herda estilos de texto adequados

### Solução

**Arquivo:** `src/components/LucyAssistant.tsx`

| Linha | Atual | Novo |
|-------|-------|------|
| 104 | `bg-white/5 ... text-gray-200` | `bg-white/10 ... text-white` |
| 125 | `bg-white/5 text-gray-200` | `bg-white/10 text-white` |
| 129 | `prose prose-sm prose-invert` | `prose prose-sm prose-invert [&>*]:text-white [&_p]:text-white [&_li]:text-white` |
| 145 | `bg-white/5` | `bg-white/10` |

---

## Fluxo de Implementação

1. Criar Edge Function temporária para atualizar email do admin
2. Executar função e confirmar atualização
3. Deletar Edge Function (segurança)
4. Atualizar estilos do `LucyAssistant.tsx`

---

## Validação

- Login com `nauitermaster@hotmail.com` + `nN!120895` funciona
- Mensagens da Lucy são claramente legíveis
- Markdown renderizado com texto branco visível

