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
  status: 'Concluído' | 'Em desenvolvimento' | 'MVP'
  year: string
}

export const projects: Project[] = [
  {
    id: 'a2ie',
    title: 'A2IE — Expense Analyzer',
    tagline: 'Gestão financeira pessoal com análise inteligente',
    description:
      'Aplicação web completa para registo e análise de despesas e receitas pessoais, com dashboard interativo, gráficos por categoria, metas de poupança e relatórios mensais.',
    longDescription:
      'Construída em Next.js 16 com React 19, a aplicação partiu de um protótipo monolítico gerado em v0.app e foi totalmente re-arquitetada: domínio isolado em lib/, componentes de feature em components/feature/, e persistência tipada em localStorage. Implementa Recharts para visualizações, Zod para validação, Sonner para toasts e react-hook-form para formulários — bibliotecas que já estavam declaradas no package.json mas inutilizadas.',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'shadcn/ui',
      'Recharts',
      'Zod',
      'react-hook-form',
      'Sonner',
      'date-fns',
    ],
    highlights: [
      'Dashboard com cards de resumo financeiro em tempo real',
      'Gráficos interativos por categoria (Recharts)',
      'CRUD completo com categorias personalizáveis',
      'Metas de poupança com alertas de orçamento',
      'Relatórios mensais com tendências',
      'Modo escuro / claro com next-themes',
      'Persistência local com validação Zod',
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
      'Construída com React 18, TypeScript e Vite, a aplicação integra MediaPipe FaceLandmarker via WASM para detetar 468 landmarks faciais e posicionar os brincos com precisão geométrica (rotate, scale, translate). Usa Zustand para estado global, CSS Modules com design tokens, e inclui componentes avançados como Hero animado, galeria filtrada por favoritos, sugestões de IA e exportação PNG.',
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'MediaPipe',
      'Zustand',
      'CSS Modules',
      'Canvas 2D API',
      'ESLint',
    ],
    highlights: [
      'Deteção de 468 landmarks faciais com MediaPipe WASM',
      'Posicionamento geométrico preciso (rotate, scale, translate)',
      'Sugestões de IA baseadas em formato de rosto e tom de pele',
      'Galeria com sistema de favoritos e filtros',
      'Hero interativo com animações',
      'Exportação do resultado como PNG',
      'Warmup automático do modelo para latência mínima',
    ],
    color: 'purple',
    icon: '💍',
    status: 'MVP',
    year: '2026',
  },
]

export const skills = [
  {
    category: 'Frontend',
    color: 'green' as const,
    items: [
      'React 18/19',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'CSS Modules',
      'Vite',
      'shadcn/ui',
    ],
  },
  {
    category: 'Estado & Dados',
    color: 'purple' as const,
    items: [
      'Zustand',
      'react-hook-form',
      'Zod',
      'localStorage',
      'Context API',
    ],
  },
  {
    category: 'UI & Visualização',
    color: 'blue' as const,
    items: [
      'Recharts',
      'Canvas 2D API',
      'Radix UI',
      'Lucide React',
      'Framer Motion',
      'CSS Animations',
    ],
  },
  {
    category: 'IA & Multimédia',
    color: 'amber' as const,
    items: [
      'MediaPipe',
      'WebAssembly',
      'Face Landmark Detection',
      'Canvas Image Processing',
    ],
  },
  {
    category: 'Tooling',
    color: 'green' as const,
    items: [
      'Git',
      'ESLint',
      'TypeScript strict',
      'Vite',
      'npm / pnpm',
    ],
  },
]
