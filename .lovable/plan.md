
## Plano: Adicionar Secao "Experience & Partnerships"

### Visao Geral
Criar uma nova secao de experiencia profissional exibindo os logos das empresas/organizacoes onde voce trabalhou, posicionada estrategicamente apos a secao de Impact Metrics.

---

### 1. Copiar Imagens para o Projeto

**Destino:** `src/assets/experience/`

Arquivos a copiar:
- `10xbank_logo.webp`
- `blizzard_entertainment_logo.webp`
- `exercitobrasileiro_logo.webp`
- `google_logo.webp`
- `local_host_solues_em_tecnologia_logo.webp`
- `sweet_life_hentai_logo.webp` (renomear para `sweet_life_animes_logo.webp`)

---

### 2. Criar Componente ExperienceSection

**Arquivo:** `src/components/sections/ExperienceSection.tsx`

**Design:**
- Faixa horizontal com logos em grid ou scroll infinito
- Logos em escala de cinza com efeito de cor no hover
- Tooltip com nome da empresa e periodo/cargo
- Animacao de entrada suave

**Estrutura Visual:**
```
┌─────────────────────────────────────────────────────────────┐
│              EXPERIENCE & PARTNERSHIPS                       │
│       "Organizations I've collaborated with"                 │
│                                                             │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐│
│   │Google│  │Blizz │  │ EB   │  │10xBnk│  │ LH   │  │ SLA  ││
│   └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Configuracao de Dados:**
```typescript
const experiences = [
  {
    name: 'Exercito Brasileiro',
    logo: exercitoBrasileiro,
    period: '10+ anos',
    role: 'Militar de Telecomunicacoes',
    url: 'https://www.eb.mil.br/',
  },
  {
    name: 'Google',
    logo: googleLogo,
    period: 'Certificacoes',
    role: 'Cloud Partner',
    url: 'https://cloud.google.com/',
  },
  {
    name: 'Blizzard Entertainment',
    logo: blizzardLogo,
    period: 'Colaboracao',
    role: 'Community',
    url: 'https://www.blizzard.com/',
  },
  {
    name: '10xBank',
    logo: tenXBankLogo,
    period: 'Projeto',
    role: 'Development',
    url: null,
  },
  {
    name: 'Local Host Solucoes',
    logo: localHostLogo,
    period: 'Freelance',
    role: 'Tech Solutions',
    url: null,
  },
  {
    name: 'Sweet Life Animes',
    logo: sweetLifeAnimesLogo,
    period: 'Atual',
    role: 'Founder & Creator',
    url: 'https://sweetlifeanimes.com/',
  },
];
```

---

### 3. Adicionar Traducoes

**Arquivo:** `src/lib/translations.ts`

Adicionar ao objeto de traducoes:

**Ingles:**
```typescript
experience: {
  title: 'Experience & Partnerships',
  subtitle: 'Organizations and brands I have collaborated with throughout my career',
},
```

**Portugues:**
```typescript
experience: {
  title: 'Experiencia & Parcerias',
  subtitle: 'Organizacoes e marcas com as quais colaborei ao longo da minha carreira',
},
```

---

### 4. Integrar na Pagina Index

**Arquivo:** `src/pages/Index.tsx`

Adicionar apos ImpactMetrics:

```tsx
import { ExperienceSection } from "@/components/sections/ExperienceSection";

// ... dentro do JSX, apos ImpactMetrics:

{/* Impact Metrics Section */}
<ImpactMetrics />

{/* NEW: Experience & Partnerships Section */}
<ExperienceSection />

{/* Skills & Competencies Section */}
<SkillsSection />
```

---

### 5. Estilo e Comportamento

**Desktop:**
- Grid de 6 colunas com logos centralizados
- Tamanho dos logos: 80-100px de altura
- Espacamento uniforme entre logos

**Mobile:**
- Grid de 3 colunas ou scroll horizontal
- Tamanho reduzido: 60px de altura
- Touch-friendly

**Efeitos:**
- Logos em `grayscale(100%)` por padrao
- No hover/tap: `grayscale(0%)` + leve escala (1.1)
- Tooltip mostrando nome, periodo e cargo
- Glow sutil no hover

**Animacoes:**
- Entrada com fade-in staggered (delay entre cada logo)
- Usando Framer Motion como nas outras secoes

---

### Resultado Esperado

```
┌─────────────────────────────────────────────────────────────┐
│                    IMPACT METRICS                            │
│          (secao existente com numeros)                       │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│            EXPERIENCE & PARTNERSHIPS                         │ ← NOVA
│                                                             │
│   [EB]    [Google]    [Blizz]    [10x]    [LH]    [SLA]   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              SKILLS & COMPETENCIES                           │
│          (secao existente com skills)                        │
└─────────────────────────────────────────────────────────────┘
```

---

### Arquivos a Modificar/Criar

| Arquivo | Acao |
|---------|------|
| `src/assets/experience/*.webp` | Copiar 6 logos |
| `src/components/sections/ExperienceSection.tsx` | Criar componente |
| `src/lib/translations.ts` | Adicionar traducoes PT/EN |
| `src/pages/Index.tsx` | Importar e adicionar secao |

---

### Beneficios

- Adiciona credibilidade profissional
- Mostra diversidade de experiencia (militar, big tech, fintech, gaming)
- Design consistente com o resto do portfolio
- Totalmente responsivo
- Suporte a PT/EN
