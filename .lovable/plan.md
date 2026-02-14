

## Plano: Adicionar Projeto "Chaos Oracle" ao Portfolio

---

## Resumo

Adicionar o projeto **Chaos Oracle** como 6o projeto ativo no carousel de projetos e no ecossistema criativo. A imagem da borboleta roxa sera usada como imagem do projeto.

---

## Arquivos a Modificar

| Arquivo | Alteracao |
|---------|-----------|
| `src/assets/chaos-oracle.webp` | Copiar imagem uploadada |
| `src/lib/translations.ts` | Adicionar textos PT/EN para o projeto (tipo + ecosystem) |
| `src/components/sections/ProjectsSection.tsx` | Adicionar card no carousel |
| `src/pages/Index.tsx` | Adicionar entrada no EcosystemCarousel + importar imagem |
| `src/lib/constants.ts` | Adicionar URL + atualizar ACTIVE_PROJECTS para 6 |

---

## Detalhes por Arquivo

### 1. Imagem do Projeto

Copiar `user-uploads://purple-butterfly-with-soft-glow.webp` para `src/assets/chaos-oracle.webp`.

### 2. translations.ts

**Tipo:** Adicionar `chaosOracle` no type interface e nas traducoes EN/PT.

**EN:**
```
chaosOracle: {
  title: 'Chaos Oracle',
  description: 'A digital experience inspired by chaos theory, designed to help indecisive people make decisions without overthinking. Click, accept, and embrace uncertainty.',
  tools: ['Chaos Theory', 'Generative Design', 'Ambient Sound', 'Lovable'],
}
```

**PT:**
```
chaosOracle: {
  title: 'Chaos Oracle',
  description: 'Uma experiencia digital inspirada na teoria do caos, criada para ajudar pessoas indecisas a tomar decisoes sem recorrer a logica excessiva. Clique, aceite e abrace a incerteza.',
  tools: ['Teoria do Caos', 'Design Generativo', 'Som Ambiente', 'Lovable'],
}
```

**Ecosystem EN:**
```
chaosOracle: {
  name: 'Chaos Oracle',
  purpose: 'Digital oracle embracing uncertainty as method.',
  type: 'Chaos & Philosophy'
}
```

**Ecosystem PT:**
```
chaosOracle: {
  name: 'Chaos Oracle',
  purpose: 'Oraculo digital que abraca a incerteza como metodo.',
  type: 'Caos & Filosofia'
}
```

### 3. ProjectsSection.tsx

Adicionar novo projeto ao array `projects` com:
- Imagem: `chaos-oracle.webp`
- URL: `https://chaos-bloom-decision.lovable.app/`
- Categoria: `experimentalConcepts` (cor `text-[#00C4FF]`)

### 4. Index.tsx

Adicionar entrada no array `EcosystemCarousel projects`:
```
{
  name: t.ecosystem.projects.chaosOracle.name,
  purpose: t.ecosystem.projects.chaosOracle.purpose,
  type: t.ecosystem.projects.chaosOracle.type,
  color: "from-violet-500 to-purple-400",
  image: chaosOracle,
  url: "https://chaos-bloom-decision.lovable.app/"
}
```

### 5. constants.ts

- Adicionar `CHAOS_ORACLE: 'https://chaos-bloom-decision.lovable.app/'` em PROJECT_URLS
- Atualizar `ACTIVE_PROJECTS: 6`

---

## Resultado

- 6 projetos ativos no carousel (era 5)
- Chaos Oracle aparece no carousel e no ecossistema
- Metricas atualizadas para refletir 6 projetos
- Categoria: Experimental Concepts (azul)

