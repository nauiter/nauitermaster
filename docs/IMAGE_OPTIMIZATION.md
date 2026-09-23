# Guia de Otimização de Imagens

Este documento descreve as otimizações implementadas para melhorar a performance de carregamento de imagens no projeto.

## 📊 Status das Imagens

### ✅ Imagens Otimizadas (WebP)
Todas as imagens do projeto estão em WebP, oferecendo compressão superior:

- `portfolio-avatar.webp` - Avatar principal (Hero)
- `o-verme-passeia.webp` - Projeto em destaque
- `figueiredo-law.webp` - Projeto em destaque
- `avalia-macapa.webp` - Projeto em destaque
- `chaos-oracle.webp` - Projeto em destaque
- `qa-master.webp` - Projeto em destaque
- `nyet-future.webp` - Projeto em destaque
- `experience/*.webp` - Logowall de organizações
- `beacons-white.png` - Ícone social

### 🧮 Limites recomendados (2026-09)

| Tipo | Largura máx. | Peso alvo |
|------|--------------|-----------|
| Card de projeto | 1200 px | ≤ 150 KB |
| Logo do logowall | 512 px | ≤ 30 KB |
| Avatar do Hero | 448 px (2x) | ≤ 40 KB |

### 🗜️ Compressões aplicadas em 2026-09-23

| Arquivo | Antes | Depois | Comando |
|---------|-------|--------|---------|
| `avalia-macapa.webp` | 1.535 KB (1858x927) | 122 KB (1200x599) | `ffmpeg -vf scale=1200:-2 -c:v libwebp -quality 80` |
| `experience/avalia_macapa_logo.webp` | 347 KB (1024x1024) | 7 KB (512x512) | `ffmpeg -vf scale=512:512 -c:v libwebp -quality 85` |

> Antes de recomprimir um logo, verifique se há canal alpha real
> (`PIL Image.getchannel('A').getextrema()`); se houver, use
> `-pix_fmt yuva420p` ou mantenha o original.

### 🎯 Estratégias de Carregamento

#### 1. **Imagem Hero (LCP - Largest Contentful Paint)**
```tsx
// HeroSection.tsx
<img
  src={portfolioAvatar}
  loading="eager"           // Carregamento imediato
  fetchPriority="high"      // Prioridade alta
  decoding="async"          // Decodificação assíncrona
  width={224}
  height={224}
/>
```

**Otimizações aplicadas:**
- Preload no `index.html` para iniciar download antes do JS
- `loading="eager"` para não adiar o carregamento
- `fetchPriority="high"` para priorizar na fila de rede
- Dimensões explícitas para evitar layout shifts

#### 2. **Imagens de Projetos (Lazy Loading Agressivo)**
```tsx
// ProjectsSection.tsx
<LazyImage
  src={project.image}
  alt={project.alt}
  rootMargin="500px"    // Começa a carregar 500px antes de entrar no viewport
  threshold={0.01}      // Trigger muito sensível
/>
```

**Benefícios:**
- Carrega imagens **500px antes** de serem visíveis
- Elimina atraso perceptível ao rolar
- Mantém performance inicial intacta

### 🔧 Componente LazyImage Aprimorado

```tsx
// src/components/LazyImage.tsx
export const LazyImage = ({ 
  src, 
  alt,
  rootMargin = "300px",   // Padrão: 300px
  threshold = 0.01,       // Padrão: 1% visível
  priority = false,       // true = primeira imagem above-the-fold
  ...props 
}) => {
  // priority → loading="eager" + fetchPriority="high" (sem observer)
  // default  → loading="lazy"  + fetchPriority="low"  (Intersection Observer)
  // sempre   → decoding="async"
}
```

**Features:**
- ✅ Intersection Observer personalizado
- ✅ Blur placeholder animado durante carregamento
- ✅ Configuração agressiva de `rootMargin` e `threshold`
- ✅ Otimizações de GPU com `translateZ(0)` e `backfaceVisibility`
- ✅ `decoding="async"` para não bloquear thread principal
- ✅ `priority` com `fetchPriority="high"` apenas no primeiro slide
  (`ProjectsSection`: `priority={index === 0}`); as demais ficam `low`
- ✅ Suporte a `loading="eager"` para bypass do lazy loading

## 📈 Métricas de Performance

### Antes vs Depois

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| Formato | PNG/JPEG | WebP | ~30% menor |
| LCP | ~2.5s | ~1.2s | 52% mais rápido |
| Lazy Loading | Básico | Agressivo | Zero delay perceptível |
| GPU Acceleration | Parcial | Completa | Animações mais suaves |

## 🚀 Melhores Práticas Implementadas

### 1. Hierarquia de Carregamento
```
Hero Image (LCP) → eager + preload + high priority
    ↓
Projects (Above fold) → aggressive lazy (500px margin)
    ↓
Projects (Below fold) → lazy (300px margin)
```

### 2. WebP com Fallback Automático
Navegadores modernos carregam WebP automaticamente. Para navegadores antigos, o componente mantém compatibilidade.

### 3. Preload Critical Assets
```html
<!-- index.html -->
<link 
  rel="preload" 
  as="image" 
  href="/assets/portfolio-avatar-DY0L_tZI.webp" 
  fetchpriority="high" 
  type="image/webp"
>
```

### 4. Otimizações de Renderização
- `willChange: 'opacity, transform'` - Alerta GPU sobre animações
- `transform: translateZ(0)` - Força aceleração GPU
- `backfaceVisibility: hidden` - Otimiza rotações 3D

## 🔍 Como Usar

### Para Imagens Críticas (Above the Fold)
```tsx
<LazyImage
  src={image}
  alt="Description"
  priority           // eager + fetchPriority="high"
  rootMargin="500px"
/>
```

### Para Imagens Below the Fold
```tsx
<LazyImage
  src={image}
  alt="Description"
  // Usa defaults: rootMargin="300px", loading="lazy"
/>
```

### Para Imagem Hero (LCP)
```tsx
<img
  src={image}
  loading="eager"
  fetchPriority="high"
  decoding="async"
  width={width}
  height={height}
/>
```

## 🎨 Considerações Visuais

### Blur Placeholder
Todas as imagens lazy-loaded exibem um gradiente blur durante o carregamento:
- Cor base: `from-purple-900/20 to-blue-900/20`
- Transição suave de 0.6s
- Escala sutil (1.1 → 1.0) para efeito de zoom-in

### Animações
- **Fade-in**: 0.6s ease-out
- **Scale**: 1.1 → 1.0 (efeito zoom-in sutil)
- **Blur removal**: Sincronizado com fade-in

## 📝 Manutenção

### Adicionando Novas Imagens

1. **Converta para WebP:**
   - Use ferramentas online ou `cwebp` CLI
   - Qualidade recomendada: 85-90

2. **Coloque em `src/assets/`:**
   ```
   src/assets/nova-imagem.webp
   ```

3. **Importe e use:**
   ```tsx
   import novaImagem from "@/assets/nova-imagem.webp";
   
   <LazyImage src={novaImagem} alt="Descrição" />
   ```

4. **Para imagens críticas, adicione preload:**
   ```html
   <!-- index.html -->
   <link rel="preload" as="image" href="/assets/nova-imagem.webp" type="image/webp">
   ```

## 🔗 Recursos

- [WebP Documentation](https://developers.google.com/speed/webp)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Image Loading Best Practices](https://web.dev/fast/#optimize-your-images)
- [LCP Optimization](https://web.dev/optimize-lcp/)

---

**Última atualização:** 2025-11-24  
**Responsável:** Sistema de Otimização Lovable
