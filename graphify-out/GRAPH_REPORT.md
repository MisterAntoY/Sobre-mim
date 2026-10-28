# Graph Report - Minha-vida  (2026-10-28)

## Corpus Check
- 54 files · ~26,768 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .xml 11, (none) 3, .properties 2)

## Summary
- 401 nodes · 541 edges · 30 communities (16 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8374cfe5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- package.json
- 🛡️ Auditoria de Segurança — IM Portfolio
- ProjectCard.tsx
- Segurança — IM Portfolio
- native.ts
- 🚀 Roadmap — IM Portfolio
- Security Checklist — IM Portfolio
- compilerOptions
- Detalhes por Achado
- compilerOptions
- Plano de Pentest — IM Portfolio
- ExampleInstrumentedTest.java
- Templates de Prompts para Auditoria de Segurança — IM Portfolio
- ✓ Checklist de Auditoria
- Versão Android (Capacitor)
- ignore.md
- MainActivity.java
- tsconfig.json
- sw.js

## God Nodes (most connected - your core abstractions)
1. `Security Checklist — IM Portfolio` - 18 edges
2. `compilerOptions` - 17 edges
3. `react` - 16 edges
4. `App()` - 16 edges
5. `🛡️ Auditoria de Segurança — IM Portfolio` - 15 edges
6. `compilerOptions` - 14 edges
7. `lucide-react` - 13 edges
8. `Plano de Pentest — IM Portfolio` - 13 edges
9. `useInView()` - 11 edges
10. `Templates de Prompts para Auditoria de Segurança — IM Portfolio` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Achados` --references--> `sanitize()`  [INFERRED]
  docs/SECURITY-AUDIT.md → src/components/ContactForm.tsx
- `ContactForm (`src/components/ContactForm.tsx`)` --references--> `sanitize()`  [INFERRED]
  @doctork.md → src/components/ContactForm.tsx
- `3. Validação e Sanitização de Input` --references--> `sanitize()`  [INFERRED]
  docs/SECURITY.md → src/components/ContactForm.tsx
- `4. Sanitização de Input Inefetiva` --references--> `sanitize()`  [INFERRED]
  docs/SECURITY-TESTING.md → src/components/ContactForm.tsx
- `4. Rate Limiting e Anti-Bot` --references--> `ContactForm()`  [INFERRED]
  docs/SECURITY.md → src/components/ContactForm.tsx

## Import Cycles
- None detected.

## Communities (30 total, 14 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.07
Nodes (33): lucide-react@^0.460.0, lucide-react, react, App(), About(), traits, BackToTop(), Action (+25 more)

### Community 1 - "package.json"
Cohesion: 0.06
Nodes (36): config, devDependencies, autoprefixer@^10.4.20, @capacitor/android@^8.4.1, @capacitor/cli@^8.4.1, postcss@^8.4.49, tailwindcss@^3.4.15, @types/react@^18.3.12 (+28 more)

### Community 2 - "🛡️ Auditoria de Segurança — IM Portfolio"
Cohesion: 0.05
Nodes (37): 1. ContactForm: Rate-limit e Honeypot, 2. Headers de Segurança, 3. CSP Forte, 4. Service Worker Seguro, 5. Validação e Sanitização, 🛡️ Auditoria de Segurança — IM Portfolio, Avaliação LGPD, Build (+29 more)

### Community 3 - "ProjectCard.tsx"
Cohesion: 0.12
Nodes (29): colorMap, HoverPreviewCard(), Props, A2IEPreview(), JerryPreview(), MyTubePreview(), PricenPreview(), ProjectPreview() (+21 more)

### Community 4 - "Segurança — IM Portfolio"
Cohesion: 0.08
Nodes (28): 1. XSS (Cross-Site Scripting), 2. CSRF (Cross-Site Request Forgery), 3. Validação e Sanitização de Input, 4. Rate Limiting e Anti-Bot, 5. Exposição de Dados Sensíveis, 6. Service Worker / PWA Security, 7. Headers e Configuração de Segurança, 8. LGPD e Conformidade de Privacidade (+20 more)

### Community 5 - "native.ts"
Cohesion: 0.11
Nodes (22): dependencies, @capacitor/app@^8.1.0, @capacitor/browser@^8.0.3, @capacitor/core@^8.4.1, @capacitor/haptics@^8.0.2, @capacitor/splash-screen@^8.0.1, @capacitor/status-bar@^8.0.2, react@^18.3.1 (+14 more)

### Community 6 - "🚀 Roadmap — IM Portfolio"
Cohesion: 0.09
Nodes (22): 1.1 Dark Mode Toggle ⭐, 1.2 GitHub Activity Feed 📊, 1.3 PDF CV Generator 📄, 2.1 Internacionalização (i18n) PT/EN 🌐, 2.2 Blog Section 📝, 2.3 Newsletter Signup 📬, 2.4 Certificações / Badges Section 🏅, 3.1 Email Backend (Node.js / Vercel) (+14 more)

### Community 7 - "Security Checklist — IM Portfolio"
Cohesion: 0.09
Nodes (21): Acesso & Permissões, Autenticação & Autorização, CSRF (Cross-Site Request Forgery), Curto Prazo (Se escalar para back-end), Dados Sensíveis, Dependências & Vulnerabilidades, Headers & Configuração de Segurança, LGPD & Privacidade de Dados (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

### Community 9 - "Detalhes por Achado"
Cohesion: 0.12
Nodes (16): Achado #1: Email Público Exposto, Achado #2: Rate-Limit Client-Side, Achado #3: localStorage Falsificável, Achado #4: XSS em Campos, Achado #5: Service Worker Stale Cache, Achado #6: LGPD — Dados Pessoais, Achado #7: Headers de Segurança, Achado #8: Sanitização de Input (+8 more)

### Community 10 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit (+7 more)

### Community 11 - "Plano de Pentest — IM Portfolio"
Cohesion: 0.14
Nodes (13): Checklist de Execução, Plano de Pentest — IM Portfolio, Próximas Rodadas, Setup Inicial, Teste 1: XSS em ContactForm, Teste 2: Rate-Limiting Bypass, Teste 3: Honeypot Inefetivo, Teste 4: Max-Length Bypass (+5 more)

### Community 13 - "Templates de Prompts para Auditoria de Segurança — IM Portfolio"
Cohesion: 0.17
Nodes (11): Como Estruturar Achados para docs/SECURITY-AUDIT.md, Como Usar Este Arquivo, Links Úteis, Próximas Auditorias, Template 1: Auditoria de Categoria Específica, Template 2: Verificação Pontual, Template 3: Novo Recurso — Auditoria Pré-Mergedesktop, Template 4: Pós-Deploy — Validação em Produção (+3 more)

### Community 14 - "✓ Checklist de Auditoria"
Cohesion: 0.25
Nodes (8): ✓ Checklist de Auditoria, ContactForm (`src/components/ContactForm.tsx`), CSRF (Cross-Site Request Forgery), Front-end: Dados Sensíveis, Front-end: Manipulação via DevTools/F12, localStorage e Storage, Validações e Sanitização, XSS (Cross-Site Scripting)

### Community 15 - "Versão Android (Capacitor)"
Cohesion: 0.29
Nodes (6): Build de produção (Release / Play Store), Fluxo de desenvolvimento, Funcionalidades nativas integradas, Identificadores, Pré-requisitos, Versão Android (Capacitor)

### Community 17 - "ignore.md"
Cohesion: 0.50
Nodes (3): Minha-Vida, Pricen:, Ring2

## Knowledge Gaps
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sanitize()` connect `Segurança — IM Portfolio` to `Detalhes por Achado`, `✓ Checklist de Auditoria`?**
  _High betweenness centrality (0.184) - this node is a cross-community bridge._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07184325108853411 - nodes in this community are weakly interconnected._
- **Why does `react` connect `App.tsx` to `package.json`, `ProjectCard.tsx`, `Segurança — IM Portfolio`, `native.ts`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0641025641025641 - nodes in this community are weakly interconnected._
- **Why does `ContactForm (`src/components/ContactForm.tsx`)` connect `✓ Checklist de Auditoria` to `Segurança — IM Portfolio`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `🛡️ Auditoria de Segurança — IM Portfolio` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `ProjectCard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11746031746031746 - nodes in this community are weakly interconnected._