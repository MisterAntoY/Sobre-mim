# 🚀 Roadmap — IM Portfolio

Plano estratégico de novas features, priorizado por impacto e complexidade.

**Atualizado:** 2026-06-27  
**Status Atual:** v1.0 Completo (5 projetos, seções base, PWA, Android Capacitor)

---

## 📊 Matriz de Priorização

| Feature | Impacto | Complexidade | Tempo | Prioridade | Phase |
|---------|---------|-------------|-------|-----------|-------|
| **Dark Mode Toggle** | Alto | Baixa | 1 dia | 🔴 P0 | Phase 1 |
| **GitHub Activity Feed** | Alto | Média | 1-2 dias | 🔴 P0 | Phase 1 |
| **PDF CV Generator** | Médio | Baixa | 0.5 dia | 🔴 P0 | Phase 1 |
| **i18n PT/EN** | Muito Alto | Alta | 3-4 dias | 🟠 P1 | Phase 2 |
| **Blog / Artigos** | Alto | Alta | 2-3 dias | 🟠 P1 | Phase 2 |
| **Newsletter Signup** | Médio | Média | 1 dia | 🟠 P1 | Phase 2 |
| **Certificações / Badges** | Médio | Baixa | 1 dia | 🟡 P2 | Phase 2 |
| **Testimonials Section** | Médio | Média | 2 dias | 🟡 P2 | Phase 3 |
| **Email Backend (Node)** | Alto | Alta | 2-3 dias | 🟡 P2 | Phase 3 |
| **Analytics (Plausible)** | Médio | Baixa | 0.5 dia | 🟡 P2 | Phase 3 |
| **Headless CMS (Sanity)** | Muito Alto | Muito Alta | 5-7 dias | 🟢 P3 | Phase 4 |
| **Advanced 3D Elements** | Baixo | Muito Alta | 5+ dias | 🔵 Backlog | Later |

---

## Phase 1: Foundation (1 semana) — **P0 Quick Wins**

### 1.1 Dark Mode Toggle ⭐

**Por quê:** Muitos visitantes preferem light mode. Acessibilidade melhorada. Implementação trivial.

**O quê:**
- Toggle em Navbar (icon: Sun/Moon)
- CSS custom properties para cores (`--bg-primary`, `--text-primary`)
- localStorage para preferência persistida
- Respeitar `prefers-color-scheme` média query

**Arquivos a criar/modificar:**
```
- src/hooks/useDarkMode.ts (novo)
- src/components/Navbar.tsx (adicionar toggle)
- src/index.css (rever Tailwind dark: prefix)
- tailwind.config.js (adicionar darkMode: 'class')
```

**Checklist:**
- [ ] Hook `useDarkMode()` com localStorage + media query
- [ ] Toggle button em Navbar com ícone de transição
- [ ] Aplicar `.dark` class ao `<html>`
- [ ] Testar em DevTools (prefers-color-scheme toggle)
- [ ] Testar persistência (reload página)
- [ ] Certificar que todas as cores têm modo claro/escuro

**Esforço:** 1 dia  
**Branches:** `feat/dark-mode`

---

### 1.2 GitHub Activity Feed 📊

**Por quê:** Prova atividade contínua. Contadores reais > hardcoded stats. Atrai recrutadores.

**O quê:**
- Seção "Activity" (novo) com últimas X contribuições (7/30/90 dias)
- Heatmap de commits (estilo GitHub Contributions)
- Top 5 linguagens usadas (pie chart com Recharts)
- Integração GitHub GraphQL API (público, sem auth necessária)

**Dados a exibir:**
```
- Commits últimos 30 dias
- Contribuições top repos
- Linguagens by % (Python, JavaScript, TypeScript, Go, etc.)
- Streaks (dias consecutivos com commits)
```

**Arquivos a criar/modificar:**
```
- src/lib/github.ts (novo — GraphQL queries)
- src/components/Activity.tsx (novo)
- src/components/ActivityChart.tsx (novo — Recharts)
- src/App.tsx (adicionar seção antes de Footer)
- package.json (sem deps novas — Recharts já tem)
```

**GraphQL Query Exemplo:**
```graphql
query {
  viewer {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { days { contributionCount date } }
      }
      totalContributions(from: "2026-05-27T00:00:00Z")
    }
    repositoriesContributedTo(first: 10) {
      nodes { name primaryLanguage { name } }
    }
    topRepositories(first: 5, orderBy: { field: STARGAZERS, direction: DESC }) {
      nodes { name stargazerCount }
    }
  }
}
```

**Checklist:**
- [ ] Criar lib/github.ts com queries GraphQL
- [ ] Componente Activity com 3 cards (total commits, top repos, languages)
- [ ] ActivityChart com Recharts pie/bar (linguagens)
- [ ] Cache em localStorage para reduzir API calls
- [ ] Fallback se GitHub API falhar (mostrar message)
- [ ] Testar com várias contas (viewer genérico)

**Esforço:** 1-2 dias  
**Branches:** `feat/github-activity`

---

### 1.3 PDF CV Generator 📄

**Por quê:** Recrutadores querem PDF legítimo, não Markdown. Quick win com impacto alto.

**O quê:**
- Gerar PDF dinâmico a partir dos dados (projetos + skills)
- Estilos profissionais (branco/cinzento, tipografia)
- Download com nome `CV_Isidro_Mendes_2026.pdf`
- Botão em Navbar similar a "Download CV (Markdown)"

**Dependências:**
- `pdfkit` (npm install pdfkit) — 3.5KB gzip

**Arquivos a criar/modificar:**
```
- src/lib/pdf-cv.ts (novo — geração PDF)
- src/components/Navbar.tsx (modificar CV button → dropdown com PDF/MD)
- package.json (adicionar pdfkit)
```

**Estrutura PDF:**
```
┌─────────────────────────────────┐
│      ISIDRO MENDES              │
│   Frontend Developer            │
│  React • TypeScript • Next.js   │
├─────────────────────────────────┤
│ ABOUT                           │
│ [bio de 2-3 linhas]             │
├─────────────────────────────────┤
│ EXPERIENCE                      │
│ 5 Projetos (A2IE, Ring2, etc.)  │
├─────────────────────────────────┤
│ SKILLS                          │
│ React 18/19, TypeScript, Vite,  │
│ Tailwind, Zustand, ...          │
├─────────────────────────────────┤
│ LINKS                           │
│ GitHub | LinkedIn | Email       │
└─────────────────────────────────┘
```

**Checklist:**
- [ ] Instalar pdfkit
- [ ] Criar lib/pdf-cv.ts com função generatePDF()
- [ ] Testar PDF output (abrir em browser/Adobe)
- [ ] Adicionar dropdown em Navbar (Markdown / PDF)
- [ ] Certificar que PDF tem formatting correto
- [ ] Testar download (filename correto)

**Esforço:** 0.5-1 dia  
**Branches:** `feat/pdf-cv`

---

## Phase 2: Reach & Content (2 semanas) — **P1 Major Features**

### 2.1 Internacionalização (i18n) PT/EN 🌐

**Por quê:** Abre portfolio a recrutadores internacionais. Triplicar audience potencial.

**O quê:**
- Toggle PT/EN em Navbar
- JSON translations (`src/i18n/pt.json`, `en.json`)
- Hook `useTranslation()` para componentes
- localStorage para preferência
- Alterar URL com query param (`?lang=en`)

**Estrutura:**
```
src/i18n/
  ├── pt.json (português)
  ├── en.json (english)
  └── index.ts (context + hook)

src/components/
  └── LanguageToggle.tsx (novo — flag icons)
```

**Arquivos a criar/modificar:**
```
- src/i18n/pt.json (novo)
- src/i18n/en.json (novo)
- src/i18n/index.ts (novo — createContext)
- src/hooks/useTranslation.ts (novo)
- src/App.tsx (adicionar I18nProvider)
- src/components/Navbar.tsx (adicionar toggle)
- TODOS os componentes (envolver strings em t("key"))
```

**JSON Structure Exemplo:**
```json
{
  "nav": {
    "projects": "Projects",
    "about": "About",
    "skills": "Skills",
    "contact": "Contact"
  },
  "hero": {
    "roles": [
      "Frontend Developer",
      "React & TypeScript"
    ]
  }
}
```

**Checklist:**
- [ ] Criar i18n context + Provider
- [ ] Traduzir TODOS os textos (Hero, About, Projects, Contact, etc.)
- [ ] Aplicar `useTranslation()` em componentes
- [ ] Toggle com flag icons (PT/GB)
- [ ] localStorage para preferência
- [ ] URL param `?lang=en` (opcional mas nice-to-have)
- [ ] Testar switching languages
- [ ] Certificar que projects em inglês fazem sentido

**Esforço:** 3-4 dias  
**Branches:** `feat/i18n-pt-en`

---

### 2.2 Blog Section 📝

**Por quê:** Thought leadership. SEO. Conteúdo evergreen. Diferencia de portfolios genéricos.

**O quê:**
- Seção "Blog" nova com artigos técnicos (3-5 posts iniciais)
- Suporte Markdown (usar `react-markdown`)
- Index com previews (title, date, excerpt, reading time)
- Artigos completos com syntax highlighting (use `highlight.js`)
- Tags (React, TypeScript, Performance, Security, etc.)

**Artigos propostos:**
1. "Re-architecting a V0 Prototype: A2IE Case Study"
2. "Building AR Try-On with MediaPipe: Ring2 Deep Dive"
3. "Rate-Limiting & Security in Frontend Forms"
4. "Obsidian-to-Portfolio: Automating CV Generation"
5. "PWA Service Workers: Offline Strategy Patterns"

**Estrutura:**
```
src/blog/
  ├── posts/
  │   ├── 2026-06-27-a2ie-architecture.md
  │   ├── 2026-06-20-mediapipe-ar.md
  │   └── ...
  └── index.ts (metadata extraction)

src/components/
  ├── Blog.tsx (index page)
  ├── BlogPost.tsx (single post view)
  └── BlogCard.tsx (preview card)
```

**Arquivos a criar/modificar:**
```
- src/blog/ (novo folder)
- src/components/Blog.tsx (novo)
- src/components/BlogPost.tsx (novo)
- src/components/BlogCard.tsx (novo)
- src/App.tsx (adicionar rota #blog)
- package.json (adicionar react-markdown, highlight.js)
```

**Checklist:**
- [ ] Criar pasta blog/ com 3-5 posts MD
- [ ] Setup react-markdown + highlight.js
- [ ] Componente Blog (index com previews)
- [ ] Componente BlogPost (fullscreen)
- [ ] Extrair metadata (date, title, tags) de files
- [ ] Sorting by date (newest first)
- [ ] Filter by tags (opcional)
- [ ] Reading time estimate
- [ ] SEO (meta tags per post)

**Esforço:** 2-3 dias  
**Branches:** `feat/blog`

---

### 2.3 Newsletter Signup 📬

**Por quê:** Captura leads. Email list para future announcements.

**O quê:**
- Input email em Contact section (ou novo footer widget)
- Integração Mailchimp (free tier) ou EmailJS
- Validação email
- Obrigatoriedade de consentimento LGPD

**Arquivos a criar/modificar:**
```
- src/components/NewsletterSignup.tsx (novo)
- src/lib/newsletter.ts (novo)
- src/App.tsx ou Contact.tsx (adicionar componente)
- package.json (adicionar @mailchimp/mailchimp_marketing ou emailjs-com)
```

**Checklist:**
- [ ] Criar Mailchimp audience e obter API key
- [ ] Input + validação + submit
- [ ] Success/error messages (Sonner toasts)
- [ ] Checkbox consentimento LGPD
- [ ] Rate-limit (1 submit/min por IP — client-side OK)
- [ ] Testar submissão real

**Esforço:** 1 dia  
**Branches:** `feat/newsletter`

---

### 2.4 Certificações / Badges Section 🏅

**Por quê:** Social proof. Credibilidade. Extra na seção About.

**O quê:**
- Adicionar card "Certifications" em About ou nova seção
- Badges de certificações (AWS, Google Cloud, Coursera, etc.)
- Links to credential verification

**Certificações propostas (se tiver):**
- TypeScript Specialist (Coursera)
- AWS Solutions Architect (se tiver)
- Trusted Web Developer (Google)

**Checklist:**
- [ ] Listar certificações reais (não fake)
- [ ] Adicionar badges visuais ou grid
- [ ] Links to credential pages
- [ ] Data de emissão

**Esforço:** 1 dia  
**Branches:** `feat/certifications`

---

## Phase 3: Engagement & Polish (2-3 semanas) — **P2 Refinements**

### 3.1 Email Backend (Node.js / Vercel)

**Por quê:** Hoje formulário abre `mailto:`. Real backend confirma que funciona.

**O quê:**
- Vercel Function (Node.js) que recebe formulário
- Enviar email via SendGrid ou Nodemailer
- Rate-limit servidor-side (por IP)
- Validação servidor-side (re-sanitize)

**Arquivos a criar/modificar:**
```
- api/contact.js (Vercel Function novo)
- src/components/ContactForm.tsx (modificar para POST)
- .env.local (adicionar SENDGRID_API_KEY)
```

**Checklist:**
- [ ] Criar Vercel Function
- [ ] Setup SendGrid (ou Nodemailer + Gmail)
- [ ] Receber + validar POST payload
- [ ] Rate-limit servidor-side
- [ ] Enviar email
- [ ] Responder com JSON success/error
- [ ] Testar end-to-end

**Esforço:** 2-3 dias  
**Branches:** `feat/email-backend`

---

### 3.2 Testimonials / Social Proof

**Por quê:** Aumenta trust. Diferencia de portfolio genérico.

**O quê:**
- Seção com quotes de clientes/colegas (3-5)
- Avatar + nome + role + quote
- Carrossel ou grid (mobile: 1 col, desktop: 2-3 cols)

**Checklist:**
- [ ] Coletar testimonials reais
- [ ] Design card com avatar + quote
- [ ] Responsive grid/carousel
- [ ] Animações suaves

**Esforço:** 1-2 dias  
**Branches:** `feat/testimonials`

---

### 3.3 Analytics (Plausible)

**Por quê:** Entender audiência. Sem rastrear PII (LGPD-safe).

**O quê:**
- Integrar Plausible (GDPR-compliant, ~$9/mo)
- Script no `<head>`
- Dashboard privado para ver stats

**Checklist:**
- [ ] Inscrever em Plausible
- [ ] Adicionar script a index.html
- [ ] Testar em DevTools (Network → check for plausible request)

**Esforço:** 0.5 dia  
**Branches:** `feat/analytics`

---

## Phase 4: Enterprise / Advanced — **P3 Future**

### 4.1 Headless CMS (Sanity)

**Por quê:** Editar projetos sem rebuild. CRUD real. Escalabilidade.

**O quê:**
- Integrar Sanity Studio (CMS visual)
- Sincronizar projetos/blog posts com Sanity
- Queries dinâmicas vs hardcoded data

**Esforço:** 5-7 dias (fora do escopo Phase 1-3)

---

### 4.2 Advanced 3D Elements

**Por quê:** Diferencia visual. Wow factor.

**O quê:**
- Three.js scene na Hero (animação 3D)
- Cube/torus rotativo com brand colors
- Parallax effects

**Esforço:** 3-5 dias (complexo, lower ROI)

---

## 📅 Timeline Recomendado

```
Week 1 (Phase 1 — P0 Quick Wins):
  Mon-Wed: Dark Mode + GitHub Activity + PDF CV
  Thu-Fri: Testing + Polish

Week 2-3 (Phase 2 — P1 Major):
  Mon-Wed: i18n PT/EN
  Thu-Fri: Blog Section + Newsletter

Week 4 (Phase 3 — P2 Refinements):
  Mon-Tue: Email Backend (if time)
  Wed-Thu: Testimonials + Analytics
  Fri: Testing + Merge to main
```

---

## 🎯 Success Metrics

| Feature | Success Metric | Target |
|---------|---|---|
| **Dark Mode** | User toggle adoption | >30% dark mode users |
| **GitHub Activity** | Visitor engagement | +20% time on site |
| **PDF CV** | Download clicks | >50% of visitors |
| **i18n** | EN language views | >40% new visitors |
| **Blog** | Organic traffic | +30% from search |
| **Newsletter** | Signup rate | >5% of visitors |
| **Email Backend** | Form submissions | >80% delivery rate |

---

## 🚀 Getting Started

**Phase 1 (Today):**

```bash
# Start dark mode
git checkout -b feat/dark-mode
# ... implement

# Then GitHub activity
git checkout -b feat/github-activity
# ... implement

# Then PDF CV
git checkout -b feat/pdf-cv
# ... implement
```

**Each PR should:**
1. Pass TypeScript + tests
2. No regressions (manual testing)
3. Include security review if applicable
4. Update docs/SECURITY-CHECKLIST.md if needed

---

## 📝 Notes

- **Dark mode:** Tailwind has built-in support, low risk
- **GitHub API:** Public queries, no auth needed, free tier generous
- **i18n:** Largest scope, plan carefully (translation strings everywhere)
- **Blog:** Markdown-based = easy to maintain, great for SEO
- **Email backend:** Requires Vercel deployment, not local-only

---

**Owner:** Isidro Mendes  
**Last Updated:** 2026-06-27  
**Next Review:** 2026-07-01
