

## Plano: Padronizar Tags Mobile pelo Sweet Life Academy

### Análise Visual

**Sweet Life Academy (Modelo):**
- Tags com fundo escuro sólido
- Texto branco nítido
- Bordas definidas
- Visual limpo e consistente

**Sweet Life Animes (Problema):**
- Tags com fundo transparente demais
- Efeito "lavado" ou esbranquiçado
- Fundo do card vazando através das tags

---

### Problema Identificado

O estilo atual das tags (linha 205):
```tsx
className="px-3 py-1.5 rounded-full bg-white/5 text-white/90 text-sm font-medium border border-white/20"
```

O `bg-white/5` é muito transparente, fazendo com que o conteúdo atrás vaze e crie inconsistências visuais entre os diferentes cards.

---

### Solução Proposta

Alterar o estilo das tags para usar um fundo escuro mais opaco, igual ao visual do Sweet Life Academy:

**Arquivo:** `src/components/sections/ProjectsSection.tsx`
**Linha:** 203-208

**De:**
```tsx
<span
  className="px-3 py-1.5 rounded-full bg-white/5 text-white/90 text-sm font-medium border border-white/20 transition-all duration-300"
>
```

**Para:**
```tsx
<span
  className="px-3 py-1.5 rounded-full bg-[#1a1f2e] text-white text-sm font-medium border border-white/20 transition-all duration-300"
>
```

---

### Mudanças Específicas

| Propriedade | Antes | Depois | Motivo |
|-------------|-------|--------|--------|
| background | `bg-white/5` | `bg-[#1a1f2e]` | Fundo sólido escuro, sem transparência |
| text | `text-white/90` | `text-white` | Texto totalmente branco para máximo contraste |

---

### Resultado Esperado

Todas as tags em todos os 5 projetos terão:
- Fundo escuro sólido e consistente
- Visual idêntico ao Sweet Life Academy
- Sem efeito de transparência problemático
- Legibilidade máxima em mobile

---

### Arquivo a Modificar

| Arquivo | Linha | Alteração |
|---------|-------|-----------|
| `src/components/sections/ProjectsSection.tsx` | 203-208 | Ajustar classes CSS das tags |

