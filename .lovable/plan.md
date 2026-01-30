

## Plano: Padronizar Altura das Tags de Projetos

### Problema Identificado

Na imagem, as tags "AI Education", "Automation" e "Strategy" apresentam alturas visuais ligeiramente diferentes. Isso ocorre porque o padding vertical (`py-1.5`) não garante uma altura consistente quando combinado com diferentes conteúdos de texto.

---

### Solução Proposta

Adicionar uma altura fixa às tags para garantir uniformidade visual em todas elas.

**Arquivo:** `src/components/sections/ProjectsSection.tsx`
**Linha:** 203-208

**De:**
```tsx
<span
  className="px-3 py-1.5 rounded-full bg-[#1a1f2e] text-white text-sm font-medium border border-white/20 transition-all duration-300"
>
```

**Para:**
```tsx
<span
  className="px-3 h-8 inline-flex items-center rounded-full bg-[#1a1f2e] text-white text-sm font-medium border border-white/20 transition-all duration-300"
>
```

---

### Mudanças Específicas

| Propriedade | Antes | Depois | Motivo |
|-------------|-------|--------|--------|
| height | - | `h-8` | Altura fixa de 32px para todas as tags |
| display | inline | `inline-flex items-center` | Centraliza o texto verticalmente |
| padding-y | `py-1.5` | (removido) | Não necessário com altura fixa |

---

### Resultado Esperado

- Todas as tags terão exatamente a mesma altura (32px)
- Texto centralizado verticalmente
- Bordas e cantos arredondados uniformes
- Visual consistente em todos os 5 projetos

