# Section System Documentation

Sistema padronizado de seções para o portfolio Nauiter Master.

## Componentes

### 1. `<Section>` - Componente Wrapper

Componente principal que combina título, container, padding e background.

```tsx
import { Section } from "@/components/ui/section";

<Section
  id="projects"
  title={{
    title: "Showcase Projects",
    subtitle: "My latest work",
    gradient: "primary",
    align: "center"
  }}
  background="gradient-dark"
  containerWidth="7xl"
  paddingY="lg"
  dataTour="projects-section"
>
  {/* Your content here */}
</Section>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Section ID para navegação/âncoras |
| `title` | `SectionTitleProps` | - | Configuração do título |
| `children` | `ReactNode` | - | Conteúdo da seção |
| `background` | `'dark' \| 'cosmic' \| 'gradient-dark' \| 'gradient-light' \| 'custom'` | `'gradient-dark'` | Variante de background |
| `containerWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' \| '7xl' \| 'full'` | `'7xl'` | Largura máxima do container |
| `paddingY` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'none'` | `'lg'` | Padding vertical |
| `paddingX` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'none'` | `'md'` | Padding horizontal |
| `showTitle` | `boolean` | `true` | Mostrar título da seção |
| `dataTour` | `string` | - | Data attribute para tour |

---

### 2. `useSection()` - Hook de Configuração

Hook que retorna classes otimizadas para seções customizadas.

```tsx
import { useSection } from "@/hooks/useSection";

const { sectionClasses, containerClasses } = useSection({
  containerWidth: '7xl',
  paddingY: 'lg',
  background: 'gradient-dark'
});

return (
  <section className={sectionClasses}>
    <div className={containerClasses}>
      <SectionTitle title="My Section" />
      {/* Content */}
    </div>
  </section>
);
```

#### Return Values

| Propriedade | Type | Description |
|-------------|------|-------------|
| `sectionClasses` | `string` | Classes CSS combinadas para section |
| `containerClasses` | `string` | Classes CSS combinadas para container |
| `containerWidth` | `string` | Classe de largura do container |
| `paddingY` | `string` | Classe de padding vertical |
| `paddingX` | `string` | Classe de padding horizontal |
| `background` | `string` | Classe de background |

---

### 3. `<SectionTitle>` - Componente de Título

Componente standalone para títulos de seção (usado internamente pelo `<Section>`).

```tsx
import { SectionTitle } from "@/components/ui/section-title";

<SectionTitle
  title="Showcase Projects"
  subtitle="Intersection of AI, storytelling, and digital strategy."
  align="center"
  gradient="primary"
  as="h2"
/>
```

---

## Variantes de Background

```tsx
// Background escuro sólido
background="dark"
// bg-[#0B1623]

// Background cósmico com gradiente triplo
background="cosmic"
// bg-gradient-to-b from-[#05010E] via-[#0A1A2F] to-[#0C1222]

// Gradiente escuro (claro → escuro)
background="gradient-dark"
// bg-gradient-to-b from-[#0C1222] to-[#05010E]

// Gradiente claro (médio → médio-escuro)
background="gradient-light"
// bg-gradient-to-b from-[#0A1A2F] to-[#0C1222]

// Custom (requer backgroundClassName)
background="custom"
backgroundClassName="bg-red-500"
```

---

## Larguras de Container

| Preset | Largura Máxima | Uso Recomendado |
|--------|----------------|-----------------|
| `sm` | `max-w-2xl` (672px) | Texto simples, forms |
| `md` | `max-w-3xl` (768px) | Artigos, conteúdo |
| `lg` | `max-w-4xl` (896px) | Conteúdo editorial |
| `xl` | `max-w-5xl` (1024px) | Seções médias |
| `2xl` | `max-w-6xl` (1152px) | Grids de cards |
| `3xl` | `max-w-7xl` (1280px) | **Padrão** - Maioria das seções |
| `4xl` | `max-w-screen-xl` | Layouts largos |
| `5xl` | `max-w-screen-2xl` | Extra large |
| `6xl` | `max-w-[1600px]` | Dashboards |
| `7xl` | `max-w-[1800px]` | Full-width sections |
| `full` | `max-w-full` | 100% da largura |

---

## Padding System

### Vertical (paddingY)

| Preset | Classe | Pixels | Uso Recomendado |
|--------|--------|--------|-----------------|
| `none` | `py-0` | 0px | Seções sem espaçamento |
| `sm` | `py-12` | 48px (3rem) | Seções compactas |
| `md` | `py-16` | 64px (4rem) | Seções médias |
| `lg` | `py-24` | **96px (6rem)** | **Padrão** - Maioria das seções |
| `xl` | `py-32` | 128px (8rem) | Hero sections |

### Horizontal (paddingX)

| Preset | Classe | Pixels | Uso Recomendado |
|--------|--------|--------|-----------------|
| `none` | `px-0` | 0px | Full-width |
| `sm` | `px-4` | 16px (1rem) | Mobile tight |
| `md` | `px-6` | **24px (1.5rem)** | **Padrão** - Mobile/Desktop |
| `lg` | `px-8` | 32px (2rem) | Desktop generoso |
| `xl` | `px-12` | 48px (3rem) | Extra space |

---

## Gradientes de Título

```tsx
// Gradiente Primário (Violet → Cyan)
gradient="primary"
// from-[#7A5FFF] to-[#00C4FF]

// Gradiente Secundário (Cyan → Violet)
gradient="secondary"
// from-[#00C4FF] to-[#7A5FFF]

// Gradiente Accent (Orange → Green)
gradient="accent"
// from-[#FF9800] to-[#4CAF50]

// Sem gradiente (branco sólido)
gradient="none"
```

---

## Exemplos de Uso

### Exemplo 1: Seção de Projetos

```tsx
<Section
  id="projects"
  title={{
    title: "Showcase Projects",
    subtitle: "Intersection of AI, storytelling, and digital strategy.",
    gradient: "primary",
    align: "center"
  }}
  background="gradient-dark"
  containerWidth="7xl"
  paddingY="lg"
  dataTour="projects"
>
  <Carousel>
    <ProjectCard />
    <ProjectCard />
  </Carousel>
</Section>
```

### Exemplo 2: Seção de Contact (Cosmic Background)

```tsx
<Section
  id="contact"
  title={{
    title: "Let's Co-Create the Future",
    subtitle: "If your vision connects with mine...",
    gradient: "primary",
    align: "center"
  }}
  background="cosmic"
  containerWidth="3xl"
  paddingY="xl"
>
  <ContactForm />
</Section>
```

### Exemplo 3: Usando Hook Diretamente

```tsx
function CustomSection() {
  const { sectionClasses, containerClasses } = useSection({
    containerWidth: '5xl',
    paddingY: 'lg',
    background: 'gradient-light'
  });

  return (
    <section id="custom" className={sectionClasses}>
      <div className={containerClasses}>
        <SectionTitle title="Custom Section" gradient="accent" />
        <CustomContent />
      </div>
    </section>
  );
}
```

### Exemplo 4: Sem Título

```tsx
<Section
  id="hero"
  showTitle={false}
  background="cosmic"
  paddingY="xl"
>
  <HeroContent />
</Section>
```

---

## Benefícios

✅ **Consistência** - Todos os espaçamentos e backgrounds padronizados  
✅ **Manutenibilidade** - Mudanças em 1 lugar afetam todas as seções  
✅ **SEO** - Títulos sempre visíveis e indexáveis  
✅ **Performance** - Classes memoizadas no hook  
✅ **Type-Safe** - TypeScript completo  
✅ **Acessibilidade** - Estrutura semântica correta  
✅ **Responsividade** - Mobile-first automático  

---

## Migração de Seções Antigas

### Antes (Manual)
```tsx
<section
  id="projects"
  className="py-24 bg-gradient-to-b from-[#0C1222] to-[#05010E]"
  data-tour="projects"
>
  <div className="max-w-7xl mx-auto px-6">
    <motion.h2 className="...">
      {t.projects.title}
    </motion.h2>
    <motion.p className="...">
      {t.projects.subtitle}
    </motion.p>
    {/* Content */}
  </div>
</section>
```

### Depois (Componente)
```tsx
<Section
  id="projects"
  title={{
    title: t.projects.title,
    subtitle: t.projects.subtitle,
    gradient: "primary"
  }}
  background="gradient-dark"
  dataTour="projects"
>
  {/* Content */}
</Section>
```

**Redução de código: ~70%**

---

## Seções Refatoradas

- ✅ ProjectsSection
- ✅ AIToolsSection
- ✅ ImpactMetrics
- ✅ SkillsSection (parcial)
- ✅ ContactSection (parcial)
- ✅ EcosystemCarousel (parcial)
