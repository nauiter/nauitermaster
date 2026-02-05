

## Plano: Correção de Leads + Auto-Scroll do Chat Lucy

---

## Problema 1: Leads Não Estão Sendo Salvos

### Diagnóstico
Os logs da Edge Function mostram o erro:
```
Error saving lead: {
  code: "42P10",
  message: "there is no unique or exclusion constraint matching the ON CONFLICT specification"
}
```

A tabela `mentorship_leads` **não tem constraint UNIQUE** na coluna `email`. O código tenta fazer `upsert(..., { onConflict: "email" })`, mas o Postgres requer uma constraint UNIQUE para isso funcionar.

### Solução
Criar uma constraint UNIQUE na coluna `email`:

```sql
ALTER TABLE mentorship_leads 
ADD CONSTRAINT mentorship_leads_email_unique UNIQUE (email);
```

---

## Problema 2: Scroll Não Acompanha Novas Mensagens

### Diagnóstico
O componente `ScrollArea` usa Radix UI. O `ref` está sendo passado para o `Root`, mas o elemento que realmente faz scroll é o `Viewport` interno.

No `LucyAssistant.tsx`:
```tsx
<ScrollArea className="flex-1 p-4" ref={scrollRef}>
```

O `scrollRef.current.scrollTop` não funciona porque está no elemento errado.

### Solução
Duas alterações necessárias:

1. **Modificar `scroll-area.tsx`**: Expor uma ref para o Viewport para controle externo do scroll

2. **Modificar `LucyAssistant.tsx`**: Usar uma ref direta no container interno das mensagens e fazer scroll no elemento correto

---

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| Migration SQL | Adicionar UNIQUE constraint na coluna `email` |
| `src/components/ui/scroll-area.tsx` | Expor ref do Viewport |
| `src/components/LucyAssistant.tsx` | Corrigir lógica de auto-scroll |

---

## Implementação Detalhada

### 1. Migration para UNIQUE constraint

```sql
ALTER TABLE mentorship_leads 
ADD CONSTRAINT mentorship_leads_email_unique UNIQUE (email);
```

### 2. LucyAssistant.tsx - Nova lógica de scroll

Em vez de tentar controlar o ScrollArea via ref (que é complexo), usar um div interno com ref e `scrollIntoView`:

```tsx
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

// No final do container de mensagens:
<div ref={messagesEndRef} />
```

---

## Validação

1. Testar chat Lucy fornecendo um email
2. Verificar se lead aparece no painel admin
3. Verificar se scroll acompanha automaticamente novas mensagens
4. Confirmar que streaming de tokens não causa problemas de scroll

