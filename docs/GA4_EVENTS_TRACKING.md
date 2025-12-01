# Google Analytics 4 - Event Tracking Documentation

## Overview

Sistema completo de rastreamento de eventos personalizados do GA4 implementado em todo o portfólio para análise detalhada do comportamento do usuário.

## Utility File

**Arquivo:** `src/lib/analytics.ts`

Funções centralizadas para envio de eventos ao GA4 usando `window.gtag()`.

## Eventos Implementados

### 1. CTA Clicks (`cta_click`)

**Função:** `trackCTAClick(ctaName, location)`

**Onde está implementado:**
- Hero Section: Botão "View Projects"
- Contact Section: Botão "View Projects"

**Parâmetros:**
- `cta_name`: Nome do CTA clicado
- `cta_location`: Seção onde o CTA está localizado
- `timestamp`: ISO timestamp do evento

**Exemplo de evento:**
```javascript
{
  event: 'cta_click',
  cta_name: 'view_projects',
  cta_location: 'hero_section',
  timestamp: '2025-12-01T19:30:00.000Z'
}
```

---

### 2. CV Downloads (`cv_download`)

**Função:** `trackCVDownload(source)`

**Onde está implementado:**
- Hero Section: Botão "Download CV"

**Parâmetros:**
- `download_source`: Origem do download (hero_section)
- `file_name`: Nome do arquivo baixado
- `timestamp`: ISO timestamp do evento

**Exemplo de evento:**
```javascript
{
  event: 'cv_download',
  download_source: 'hero_section',
  file_name: 'Nauiter_Master_Profile.pdf',
  timestamp: '2025-12-01T19:30:00.000Z'
}
```

---

### 3. Project Navigation (`project_navigation`)

**Função:** `trackProjectNavigation(projectName, navigationMethod, projectIndex)`

**Onde está implementado:**
- Projects Section: Navegação do carousel (setas, dots, autoplay)

**Parâmetros:**
- `project_name`: Nome do projeto visualizado
- `navigation_method`: Método de navegação ('arrow', 'dot', 'autoplay')
- `project_index`: Índice do projeto (0-3)
- `timestamp`: ISO timestamp do evento

**Exemplo de evento:**
```javascript
{
  event: 'project_navigation',
  project_name: 'Sweet Life Animes',
  navigation_method: 'dot',
  project_index: 0,
  timestamp: '2025-12-01T19:30:00.000Z'
}
```

---

### 4. Project Visits (`project_visit`)

**Função:** `trackProjectVisit(projectName, projectUrl)`

**Onde está implementado:**
- Projects Section: Botão "Visit Project" em cada card

**Parâmetros:**
- `project_name`: Nome do projeto visitado
- `project_url`: URL externa do projeto
- `timestamp`: ISO timestamp do evento

**Exemplo de evento:**
```javascript
{
  event: 'project_visit',
  project_name: 'Sweet Life Academy',
  project_url: 'https://sweetlifeacademy.coursify.me',
  timestamp: '2025-12-01T19:30:00.000Z'
}
```

---

### 5. Language Changes (`language_change`)

**Função:** `trackLanguageChange(fromLanguage, toLanguage, currentPage)`

**Onde está implementado:**
- Language Toggle Component (navbar)

**Parâmetros:**
- `from_language`: Idioma anterior (pt/en)
- `to_language`: Novo idioma selecionado (pt/en)
- `current_page`: Rota atual onde ocorreu a mudança
- `timestamp`: ISO timestamp do evento

**Exemplo de evento:**
```javascript
{
  event: 'language_change',
  from_language: 'en',
  to_language: 'pt',
  current_page: '/en',
  timestamp: '2025-12-01T19:30:00.000Z'
}
```

---

### 6. Social Link Clicks (`social_click`)

**Função:** `trackSocialClick(platform, location)`

**Onde está implementado:**
- Contact Section: Links sociais (Email, Facebook, Instagram, LinkedIn)
- Footer: Links sociais (LinkedIn, Instagram, Facebook)

**Parâmetros:**
- `social_platform`: Plataforma social clicada
- `click_location`: Onde o link foi clicado ('contact_section', 'footer')
- `timestamp`: ISO timestamp do evento

**Exemplo de evento:**
```javascript
{
  event: 'social_click',
  social_platform: 'linkedin',
  click_location: 'footer',
  timestamp: '2025-12-01T19:30:00.000Z'
}
```

---

### 7. Contact Interactions (`contact_interaction`)

**Função:** `trackContactInteraction(interactionType)`

**Onde está implementado:**
- Contact Section: Botão "Book a Discovery Call"

**Parâmetros:**
- `interaction_type`: Tipo de interação ('email_click', 'call_booking')
- `timestamp`: ISO timestamp do evento

**Exemplo de evento:**
```javascript
{
  event: 'contact_interaction',
  interaction_type: 'call_booking',
  timestamp: '2025-12-01T19:30:00.000Z'
}
```

---

### 8. Section Views (`section_view`)

**Função:** `trackSectionView(sectionName)`

**Onde pode ser implementado (futuro):**
- Qualquer seção principal usando IntersectionObserver

**Parâmetros:**
- `section_name`: Nome da seção visualizada
- `timestamp`: ISO timestamp do evento

---

## Análise no Google Analytics 4

### Como visualizar os eventos no GA4:

1. **Acesse GA4 Dashboard** → Reports → Engagement → Events
2. **Eventos personalizados criados:**
   - `cta_click`
   - `cv_download`
   - `project_navigation`
   - `project_visit`
   - `language_change`
   - `social_click`
   - `contact_interaction`

### Métricas importantes para analisar:

1. **Funil de conversão:**
   - `section_view` → `cta_click` → `contact_interaction`

2. **Engajamento com projetos:**
   - `project_navigation` (método preferido: arrows vs dots vs autoplay)
   - `project_visit` (qual projeto tem mais cliques)

3. **Internacionalização:**
   - `language_change` (preferência de idioma dos usuários)

4. **Downloads:**
   - `cv_download` (conversão de visitantes para interessados)

5. **Social engagement:**
   - `social_click` (qual plataforma e onde tem mais cliques)

---

## Configuração no Google Analytics 4

### Eventos automáticos já configurados:
- `page_view`
- `scroll` (90% depth)
- `click` (outbound links)
- `file_download` (extensões específicas)

### Eventos personalizados adicionados:
- Todos os 7 eventos listados acima

### Conversões recomendadas:
Marque como "Conversões" no GA4:
- `cv_download`
- `contact_interaction`
- `project_visit`

---

## Benefícios do Sistema

✅ **Rastreamento completo** de todas as interações principais do usuário  
✅ **Insights sobre engajamento** com projetos e CTAs  
✅ **Análise de preferências** de idioma e navegação  
✅ **Dados para otimização** de taxa de conversão  
✅ **Centralizado e manutenível** via `analytics.ts`

---

## Próximos Passos (Opcional)

- [ ] Implementar `trackSectionView()` com IntersectionObserver
- [ ] Adicionar eventos de scroll profundo por seção
- [ ] Rastrear tempo de permanência em cada projeto do carousel
- [ ] Eventos de interação com badges/skills (hover analytics)
- [ ] A/B testing com diferentes CTAs

---

**Última atualização:** 2025-12-01  
**Status:** ✅ Produção
