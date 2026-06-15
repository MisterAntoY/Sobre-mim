export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  longDescription: string
  stack: string[]
  highlights: string[]
  color: 'green' | 'purple' | 'blue' | 'amber'
  icon: string
  status: 'Concluído' | 'Em desenvolvimento' | 'MVP' | 'Em produção'
  year: string
  liveUrl?: string
  repoUrl?: string
}

export const projects: Project[] = [
  {
    id: 'a2ie',
    title: 'A2IE — Expense Analyzer',
    tagline: 'Gestão financeira pessoal com análise inteligente',
    description:
      'Aplicação web completa para registo e análise de despesas e receitas pessoais, com dashboard interativo, gráficos por categoria, metas de poupança e relatórios mensais.',
    longDescription:
      'Construída em Next.js 16 com React 19, a aplicação partiu de um protótipo monolítico gerado em v0.app e foi totalmente re-arquitetada: domínio isolado em lib/, componentes de feature em components/feature/, e persistência tipada em localStorage. Implementa Recharts para visualizações, Zod para validação, Sonner para toasts e react-hook-form para formulários.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'shadcn/ui', 'Recharts', 'Zod', 'react-hook-form', 'Sonner', 'date-fns'],
    highlights: [
      'Dashboard com cards de resumo financeiro em tempo real',
      'Gráficos interativos por categoria (Recharts)',
      'CRUD completo com categorias personalizáveis',
      'Metas de poupança com alertas de orçamento',
      'Relatórios mensais com tendências',
      'Modo escuro / claro com next-themes',
    ],
    color: 'green',
    icon: '💰',
    status: 'Concluído',
    year: '2026',
  },
  {
    id: 'ring2',
    title: 'Ring2 — Virtual Try-On',
    tagline: 'Experimenta brincos virtualmente com IA',
    description:
      'Aplicação web que usa deteção facial por IA (MediaPipe) para sobrepor brincos numa selfie em tempo real, com sugestões personalizadas baseadas no formato do rosto e tom de pele.',
    longDescription:
      'Construída com React 18, TypeScript e Vite, a aplicação integra MediaPipe FaceLandmarker via WASM para detetar 468 landmarks faciais e posicionar os brincos com precisão geométrica. Usa Zustand para estado global, CSS Modules com design tokens, e inclui galeria com favoritos, sugestões de IA e exportação PNG.',
    stack: ['React 18', 'TypeScript', 'Vite', 'MediaPipe', 'Zustand', 'CSS Modules', 'Canvas 2D API', 'ESLint'],
    highlights: [
      'Deteção de 468 landmarks faciais com MediaPipe WASM',
      'Posicionamento geométrico preciso (rotate, scale, translate)',
      'Sugestões de IA baseadas em formato de rosto e tom de pele',
      'Galeria com sistema de favoritos e filtros',
      'Exportação do resultado como PNG',
      'Warmup automático do modelo para latência mínima',
    ],
    color: 'purple',
    icon: '💍',
    status: 'MVP',
    year: '2026',
  },
  {
    id: 'pricen',
    title: 'Pricen — SaaS de Preços',
    tagline: 'Consulta e comparação de preços para a construção em Angola',
    description:
      'Plataforma SaaS B2B para orçamentistas da construção em Angola: consulta, compara e aplica preços de materiais em tempo real com base numa BD de preços curados entre fornecedores verificados.',
    longDescription:
      'Monorepo com npm workspaces: aplicação principal (orçamentistas), painel admin com RBAC e portal fornecedores (Fase 2). O pacote domain concentra toda a lógica de negócio com TDD via Vitest; o pacote database usa Prisma com Neon PostgreSQL serverless; o pacote ui expõe um design system próprio com tokens Tailwind. Core value: comparação de preços exclusiva dos planos pagos — o moat é a base de preços curados.',
    stack: ['Next.js', 'TypeScript', 'Tailwind 4', 'Prisma', 'Neon PostgreSQL', 'Vitest', 'npm workspaces', 'RBAC'],
    highlights: [
      'Monorepo npm workspaces (web + admin + fornecedores)',
      'Lógica de negócio isolada com TDD (Vitest)',
      'Comparação de preços entre fornecedores verificados',
      'Design system próprio com tokens Tailwind',
      'Prisma + Neon PostgreSQL serverless',
      'Painel admin com RBAC (roles e permissões)',
    ],
    color: 'amber',
    icon: '🏗️',
    status: 'Em desenvolvimento',
    year: '2026',
  },
  {
    id: 'jerry',
    title: 'Jerry — Progress Tracker',
    tagline: 'Acompanhamento pessoal com modo Corporativo & RPG',
    description:
      'Sistema multi-utilizador de acompanhamento de progresso pessoal, académico e profissional com dois modos visuais (Corporativo e RPG) sobre os mesmos dados, auth e APIs em produção.',
    longDescription:
      'Next.js 15 App Router com Supabase (Auth + Postgres + RLS multi-utilizador) e TanStack Query. Dois renderers visuais (Corporate/RPG) sobre o mesmo view-model. Funcionalidades em produção: HP/XP/níveis/streak, penalidade de HP por inatividade, escudos de ofensiva (boss quests), conquistas automáticas com modal de celebração, árvore de habilidades com 6 ramos, análise de tendências XP (7/30/90 dias) e CRUD completo de missões custom.',
    stack: ['Next.js 15', 'TypeScript strict', 'Tailwind 4', 'Supabase', 'TanStack Query', 'Zod', 'Vercel', 'Sentry'],
    highlights: [
      'Dois modos visuais (Corporativo + RPG) sobre os mesmos dados',
      'Sistema HP/XP/níveis/streak com penalidade por inatividade',
      'Escudos de ofensiva via boss quests (máx. 3 activos)',
      'Conquistas automáticas com modal de celebração',
      'Árvore de habilidades de 6 ramos (níveis 0–10)',
      'Deploy em produção: jerry-ap.vercel.app',
    ],
    color: 'blue',
    icon: '⚔️',
    status: 'Em produção',
    year: '2026',
    liveUrl: 'https://jerry-ap.vercel.app',
    repoUrl: 'https://github.com/profissionalantosteve-lab/Labs-test',
  },
  {
    id: 'mytube',
    title: 'MyTube — Rede Social',
    tagline: 'Rede social de vídeos estilo TikTok em PHP + Node.js',
    description:
      'Plataforma completa de partilha de vídeos com feed vertical estilo TikTok, chat privado/grupo via Socket.IO, sistema de amizades, notificações push e painel de moderação com RBAC.',
    longDescription:
      'Stack full-stack PHP 8+ com PDO/PDO_MySQL, MVC com camadas Repository/Service/Controller, APIs RESTful e Node.js + Socket.IO + JWT para chat em tempo real. Vídeos em streaming adaptativo com Cloudflare R2 opcional. Segurança: bcrypt, CSRF, rate limiting, sanitização EXIF/GPS, prevenção de path traversal, sessões HttpOnly/SameSite. 30/58 itens do checklist de segurança resolvidos.',
    stack: ['PHP 8+', 'MySQL 8', 'Node.js', 'Socket.IO', 'JWT', 'PDO', 'Cloudflare R2', 'JavaScript ES6+'],
    highlights: [
      'Feed vertical estilo TikTok com scroll snap e autoplay',
      'Chat privado e de grupo em tempo real (Socket.IO + JWT)',
      'Notificações push via VAPID (Web Push)',
      'Rankings semanais Best MyTuber por escola/global',
      'Painel de moderação com roles (admin/mod/vip/user)',
      'Segurança: CSRF, rate limiting, EXIF strip, path traversal fix',
    ],
    color: 'purple',
    icon: '🎬',
    status: 'Em produção',
    year: '2025',
    repoUrl: 'https://github.com/skantoni/mytube',
  },
]

export const skills = [
  { category: 'Frontend', color: 'green' as const, items: ['React 18/19', 'Next.js 15/16', 'TypeScript', 'Tailwind CSS', 'CSS Modules', 'Vite', 'shadcn/ui'] },
  { category: 'Estado & Dados', color: 'purple' as const, items: ['Zustand', 'TanStack Query', 'react-hook-form', 'Zod', 'Context API'] },
  { category: 'Backend & BD', color: 'blue' as const, items: ['PHP 8+', 'Node.js', 'Supabase', 'Prisma', 'MySQL', 'PostgreSQL', 'Socket.IO'] },
  { category: 'IA & Multimédia', color: 'amber' as const, items: ['MediaPipe', 'WebAssembly', 'Canvas 2D API', 'Recharts', 'Cloudflare R2'] },
  { category: 'Tooling & Deploy', color: 'green' as const, items: ['Git', 'Vite', 'Vercel', 'Vitest', 'ESLint', 'TypeScript strict', 'npm workspaces'] },
]
