

## Plano: Corrigir Duplicação do FAQPage Schema

### Problema Detectado pelo Google Search Console

O erro "O campo FAQPage está duplicado" ocorre porque o schema `FAQPage` está sendo definido em **dois lugares diferentes**:

| Localização | Tipo | Linhas |
|-------------|------|--------|
| `index.html` | Estático | 184-216 |
| `SEOHead.tsx` | Dinâmico (React) | 263-277 |

Quando a aplicação carrega, ambos os scripts `application/ld+json` com `@type: FAQPage` são renderizados no DOM, causando duplicação.

---

### Solução Recomendada

**Remover o FAQPage do `index.html`** e manter apenas a versão dinâmica no `SEOHead.tsx`.

**Motivos:**
1. A versão no `SEOHead.tsx` é **bilíngue** (muda conforme o idioma PT/EN)
2. A versão no `index.html` é estática (apenas PT)
3. Para SEO multilíngue, a versão dinâmica é a correta

---

### Alterações Necessárias

**Arquivo:** `index.html`

**Remover linhas 184-216:**
```html
<!-- Structured Data - FAQPage (GEO Optimization) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ...
  ]
}
</script>
```

---

### Verificação Pós-Deploy

Após aplicar a correção:

1. Usar o [Rich Results Test](https://search.google.com/test/rich-results) do Google para validar que apenas 1 FAQPage existe
2. Aguardar reindexação no Search Console (solicitar via "Inspecionar URL" > "Solicitar indexação")

---

### Resultado Esperado

- Apenas 1 schema FAQPage por página
- FAQPage dinâmico em PT quando `/pt`
- FAQPage dinâmico em EN quando `/en`
- Erro do Search Console resolvido

