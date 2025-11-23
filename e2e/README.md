# E2E Test Suite - Nauiter Master Portfolio

Suite completa de testes end-to-end usando Playwright para validar fluxos críticos do portfolio.

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Instalar browsers do Playwright
npx playwright install
```

## 🧪 Executando Testes

```bash
# Executar todos os testes
npm run test:e2e

# Modo UI interativo
npm run test:e2e:ui

# Modo debug (breakpoints)
npm run test:e2e:debug

# Ver relatório HTML
npm run test:e2e:report
```

## 📋 Cobertura de Testes

### 1. Language Navigation (`language-navigation.spec.ts`)
- ✅ Carregamento da versão EN por padrão
- ✅ Troca EN → PT via botão
- ✅ Troca PT → EN
- ✅ Persistência de preferência no localStorage
- ✅ Atualização de títulos de seções
- ✅ Manutenção da posição de scroll

### 2. Project Carousel (`project-carousel.spec.ts`)
- ✅ Renderização do carrossel
- ✅ Navegação next/previous
- ✅ Exibição de todos os projetos
- ✅ Abertura de links em nova aba
- ✅ Responsividade mobile

### 3. Contact Interactions (`contact-interactions.spec.ts`)
- ✅ Exibição da seção de contato
- ✅ CTA "Book a Call" com mailto
- ✅ Ícones de redes sociais
- ✅ Links externos com target="_blank"
- ✅ Aria-labels para acessibilidade
- ✅ Efeitos de hover
- ✅ Navegação para seção de projetos

### 4. Particle Interactions (`particle-interactions.spec.ts`)
- ✅ Renderização de partículas em seções cósmicas
- ✅ Múltiplas partículas com posições diferentes
- ✅ Animações suaves
- ✅ Efeito magnético no hover
- ✅ Cores diferentes por seção
- ✅ Performance

### 5. Responsive Behavior (`responsive-behavior.spec.ts`)
- ✅ Renderização em Mobile (375px)
- ✅ Renderização em Tablet (768px)
- ✅ Renderização em Desktop (1920px)
- ✅ Navegação mobile
- ✅ Touch interactions
- ✅ Legibilidade em tablet
- ✅ Adaptação de grids

### 6. Accessibility (`accessibility.spec.ts`)
- ✅ Hierarquia de headings (H1 único)
- ✅ Navegação por teclado
- ✅ Alt text em todas as imagens
- ✅ Aria-labels em elementos interativos
- ✅ Contraste de cores suficiente
- ✅ HTML semântico

## 🎯 Browsers Testados

- ✅ Chromium (Desktop)
- ✅ Firefox (Desktop)
- ✅ WebKit/Safari (Desktop)
- ✅ Chrome Mobile (Pixel 5)
- ✅ Safari Mobile (iPhone 12)

## 📊 Relatórios

Os testes geram relatórios HTML automáticos com:
- Screenshots de falhas
- Vídeos de execução (em falhas)
- Trace viewer para debugging
- Métricas de performance

## 🔄 CI/CD

GitHub Actions workflow configurado em `.github/workflows/e2e-tests.yml`:
- Executa em push para `main` e `develop`
- Executa em Pull Requests
- Gera artefatos de relatórios (30 dias de retenção)

## 🛠️ Estrutura dos Testes

Cada arquivo de teste segue o padrão:
```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup
  });

  test('should do something', async ({ page }) => {
    // Arrange
    // Act
    // Assert
  });
});
```

## 📈 Métricas de Qualidade

- **Cobertura de Fluxos Críticos**: 100%
- **Cobertura de Responsividade**: Mobile, Tablet, Desktop
- **Cobertura de Acessibilidade**: WCAG AA
- **Total de Testes**: 40+
- **Browsers**: 5 configurações diferentes

## 🚀 Próximos Passos

1. Integração com Lighthouse CI para métricas de performance
2. Testes de carga com K6
3. Visual regression testing com Percy/Chromatic
4. Smoke tests para deploys de produção
