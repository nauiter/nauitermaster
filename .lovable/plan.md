

## Plano: Ajustes Visuais e Revisao Final

Analise das imagens revelou os seguintes problemas a corrigir:

---

### 1. Impact Metrics - Padronizar Altura dos Cards

**Problema Identificado (imagem 117):**
- Cards tem alturas diferentes porque os labels tem tamanhos variados
- "Creative Ecosystems Built" ocupa 2 linhas
- "Ideas in Motion" ocupa 1 linha
- Isso causa desalinhamento visual

**Arquivo:** `src/components/sections/ImpactMetrics.tsx`

**Solucao:** Adicionar altura minima fixa para a area de texto

```tsx
// Linha 56 - Adicionar min-height ao paragrafo
className="text-gray-300 text-sm min-h-[2.5rem]"
```

Isso garante que todos os labels ocupem o mesmo espaco vertical, independente do numero de linhas.

---

### 2. Experience & Partnerships - Remover Tooltip/Popup

**Problema Identificado (imagem 119):**
- O popup com nome da empresa, role e periodo aparece ao hover
- Usuario quer manter APENAS o efeito de iluminacao (glow/scale)

**Arquivo:** `src/components/sections/ExperienceSection.tsx`

**Solucao:**
1. Remover imports do Tooltip
2. Remover TooltipProvider, Tooltip, TooltipTrigger, TooltipContent
3. Manter o LogoWrapper com os estilos de hover existentes

**De:**
```tsx
<TooltipProvider delayDuration={100}>
  <motion.div>
    {experiences.map((exp) => (
      <motion.div key={exp.name} variants={itemVariants}>
        <Tooltip>
          <TooltipTrigger asChild>
            <LogoWrapper>...</LogoWrapper>
          </TooltipTrigger>
          <TooltipContent>...</TooltipContent>
        </Tooltip>
      </motion.div>
    ))}
  </motion.div>
</TooltipProvider>
```

**Para:**
```tsx
<motion.div>
  {experiences.map((exp) => (
    <motion.div key={exp.name} variants={itemVariants}>
      <LogoWrapper>...</LogoWrapper>
    </motion.div>
  ))}
</motion.div>
```

---

### 3. Showcase Projects - Tags Mobile Feias

**Problema Identificado (imagem 120):**
- As tags de ferramentas (AI, Digital Art, Community) aparecem com fundo cinza escuro e parecem "sujas"
- O problema e que o fundo `bg-white/10` nao contrasta bem no mobile

**Arquivo:** `src/components/sections/ProjectsSection.tsx`

**Solucao:** Melhorar contraste e estilo das tags

**De (linha 203-208):**
```tsx
<span
  className="px-3 py-1.5 rounded-full bg-white/10 text-gray-300 text-sm backdrop-blur-md border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
>
```

**Para:**
```tsx
<span
  className="px-3 py-1.5 rounded-full bg-white/5 text-white/90 text-sm font-medium border border-white/20 transition-all duration-300"
>
```

Mudancas:
- `bg-white/10` → `bg-white/5` (mais sutil)
- `text-gray-300` → `text-white/90` (mais visivel)
- Adicionar `font-medium` para melhor legibilidade
- `border-white/10` → `border-white/20` (borda mais visivel)
- Remover `backdrop-blur-md` (causa o efeito "sujo")

---

### 4. Analise Visual dos Anexos

| Imagem | Analise | Status |
|--------|---------|--------|
| image-117 (Impact) | Cards desalinhados por altura variavel | Corrigir |
| image-118 (Experience) | 8 logos bem distribuidos, layout OK | OK |
| image-119 (Tooltip) | Popup indesejado aparecendo | Remover |
| image-120 (Projects) | Tags com visual problematico | Corrigir |

---

### 5. Checklist Final Pre-Deploy

| Item | Status | Acao |
|------|--------|------|
| Impact Metrics altura uniforme | Pendente | Aplicar min-h |
| Experience tooltip removido | Pendente | Remover Tooltip |
| Projects tags mobile | Pendente | Ajustar estilos |
| Console.log removido | OK | Feito anteriormente |
| URLs nauitermaster.com | OK | Todas corretas |
| Schema.org atualizado | OK | Inclui worksFor |
| Sitemap atualizado | OK | Data 2026-01-30 |
| Responsive layout | OK | Testado |

---

### Resumo de Arquivos a Modificar

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/sections/ImpactMetrics.tsx` | Adicionar min-height aos labels |
| `src/components/sections/ExperienceSection.tsx` | Remover Tooltip/popup |
| `src/components/sections/ProjectsSection.tsx` | Melhorar estilo das tags |

---

### Resultado Esperado

1. **Impact Metrics:** Todos os 5 cards com altura identica
2. **Experience:** Logos com efeito de iluminacao/zoom sem popup
3. **Projects:** Tags limpas e legiveis em mobile

