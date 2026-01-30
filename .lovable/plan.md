
## Plano: Adicionar 2 Novas Empresas + Layout Horizontal

### Visao Geral
Adicionar as duas novas empresas (Advocacia Figueiredo e Avalia Macapa) na secao Experience & Partnerships e ajustar o grid para exibir todos os 8 logos lado a lado em uma linha horizontal.

---

### 1. Copiar Novas Imagens

**Destino:** `src/assets/experience/`

Arquivos a copiar:
- `adv-figueiredo.webp` → `advocacia_figueiredo_logo.webp`
- `avalia-macapa.webp` → `avalia_macapa_logo.webp`

---

### 2. Atualizar ExperienceSection.tsx

**Arquivo:** `src/components/sections/ExperienceSection.tsx`

#### 2.1 Adicionar Novos Imports

```typescript
import advocaciaFigueiredoLogo from '@/assets/experience/advocacia_figueiredo_logo.webp';
import avaliaMacapaLogo from '@/assets/experience/avalia_macapa_logo.webp';
```

#### 2.2 Adicionar Novas Empresas ao Array

```typescript
{
  name: 'Advocacia Figueiredo',
  logo: advocaciaFigueiredoLogo,
  period: { en: 'Project', pt: 'Projeto' },
  role: { en: 'Web Development', pt: 'Desenvolvimento Web' },
  url: 'https://advocaciafigueiredo.adv.br',
},
{
  name: 'Avalia Macapá',
  logo: avaliaMacapaLogo,
  period: { en: 'Project', pt: 'Projeto' },
  role: { en: 'Platform Development', pt: 'Desenvolvimento de Plataforma' },
  url: 'https://avaliamacapa.com.br',
},
```

#### 2.3 Atualizar Layout do Grid

**De:**
```tsx
className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 mt-12"
```

**Para:**
```tsx
className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12"
```

Isso cria um layout flexivel horizontal onde todos os icones ficam lado a lado, quebrando linha apenas quando necessario em telas menores.

#### 2.4 Ajustar Tamanho dos Cards

Para acomodar 8 logos, reduzir levemente o tamanho dos cards:

**De:**
```tsx
className="... p-4 md:p-6 ... min-h-[100px] md:min-h-[120px]"
```

**Para:**
```tsx
className="... p-3 md:p-4 ... min-h-[80px] md:min-h-[100px] w-[100px] md:w-[120px]"
```

---

### 3. Resultado Visual Esperado

**Desktop (8 icones em linha):**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     EXPERIENCE & PARTNERSHIPS                                │
│                                                                             │
│  [EB]  [Google]  [Blizz]  [10x]  [LH]  [SLA]  [Figueiredo]  [Avalia]       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Mobile (4 icones por linha):**
```
┌─────────────────────────┐
│  EXPERIENCE & PARTNERS  │
│                         │
│  [EB]  [Goo]  [Blz] [10]│
│  [LH]  [SLA] [Fig] [Ava]│
│                         │
└─────────────────────────┘
```

---

### 4. Arquivos a Modificar

| Arquivo | Acao |
|---------|------|
| `src/assets/experience/advocacia_figueiredo_logo.webp` | Copiar imagem |
| `src/assets/experience/avalia_macapa_logo.webp` | Copiar imagem |
| `src/components/sections/ExperienceSection.tsx` | Adicionar logos + ajustar layout |

---

### 5. Detalhes das Novas Empresas

| Empresa | Tipo | URL |
|---------|------|-----|
| Advocacia Figueiredo | Desenvolvimento Web (Escritorio de advocacia) | https://advocaciafigueiredo.adv.br |
| Avalia Macapa | Desenvolvimento de Plataforma (Avaliacoes) | https://avaliamacapa.com.br |

---

### Beneficios

- 8 empresas demonstrando experiencia diversificada
- Layout horizontal mantendo todos os logos visiveis
- Responsivo com quebra automatica em mobile
- Icones uniformes e alinhados
