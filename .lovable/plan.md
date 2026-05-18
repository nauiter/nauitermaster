## Adicionar QA Master + Atualizar Contadores (4 → 5)

### 1. Asset
- Copiar `user-uploads://Screenshot_6.webp` → `src/assets/qa-master.webp`.
- (URL pública pendente — usar placeholder `#` no card até você fornecer)

### 2. `src/lib/translations.ts`
- Adicionar tipo `qaMaster: ProjectData` em `projects` e em `ecosystem.projects` (PT e EN).
- Conteúdo:
  - **PT title:** "QA Master"
  - **PT description:** "Plataforma local-first de auditoria e controle de qualidade estratégico. Sistematiza fluxos de testes em arquitetura multi-projeto escalável, transformando QA em processo ágil, rastreável e gamificado."
  - **EN description:** "Local-first platform for strategic auditing and quality control. Systematizes testing flows through a scalable multi-project architecture, turning QA into an agile, traceable and gamified process."
  - **tools:** `["React","TypeScript","Local-First","Gamification","QA"]`
  - **ecosystem.type PT:** "Auditoria & QA" | **EN:** "Auditing & QA"
- Substituir todas as 4 ocorrências de `4+ plataformas ativas` / `4+ active platforms` → `5+`.

### 3. `src/components/sections/ProjectsSection.tsx`
- Importar `qaMaster from "@/assets/qa-master.webp"`.
- Adicionar 5º objeto no array (categoria **Experimental Concepts** ciano, `url: "#"` temporário).

### 4. `src/pages/Index.tsx` (Ecosystem)
- Importar asset + adicionar 5ª entrada (mesma categoria/cor ciano).

### 5. `src/lib/constants.ts`
- `ACTIVE_PROJECTS: 4` → `5`.
- Adicionar `QA_MASTER: '#'` em `PROJECT_URLS` (atualizar depois).

### 6. `src/components/SEOHead.tsx`
- Adicionar QA Master ao `ItemList`/`hasOfferCatalog` (CreativeWork).
- Atualizar contagens "4+" → "5+" em descrições/FAQ se houver.

### 7. `index.html`
- Adicionar item QA Master no JSON-LD ItemList (linhas ~140-150).
- Adicionar `<h3>QA Master</h3>` + parágrafo no `<noscript>` PT e EN.
- Substituir todas as 4 ocorrências `4+ plataformas/active platforms` → `5+`.

### Observações
- URL fica `#` até você enviar; deixar TODO comment.
- Não atualizo `ExperienceSection` (QA Master não é parceria/organização).
- Não atualizo memórias do projeto agora (faço junto ao deploy se quiser).

### Pergunta pendente
Confirma os textos PT/EN propostos acima ou prefere ajustar antes de implementar?
