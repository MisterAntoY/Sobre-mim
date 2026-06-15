import { useInView } from '@/hooks/useInView'

interface SkillBar {
  name: string
  level: number
}

interface Category {
  category: string
  color: 'green' | 'purple' | 'blue' | 'amber'
  items: SkillBar[]
}

const skills: Category[] = [
  {
    category: 'React Ecosystem',
    color: 'green',
    items: [
      { name: 'React 18/19', level: 92 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 88 },
      { name: 'Vite', level: 90 },
    ],
  },
  {
    category: 'Estilo & UI',
    color: 'purple',
    items: [
      { name: 'Tailwind CSS', level: 90 },
      { name: 'CSS Modules', level: 85 },
      { name: 'shadcn/ui', level: 80 },
      { name: 'Radix UI', level: 75 },
    ],
  },
  {
    category: 'Estado & Dados',
    color: 'blue',
    items: [
      { name: 'Zustand', level: 82 },
      { name: 'react-hook-form', level: 80 },
      { name: 'Zod', level: 78 },
      { name: 'Context API', level: 88 },
    ],
  },
  {
    category: 'Visualização & IA',
    color: 'amber',
    items: [
      { name: 'Recharts', level: 78 },
      { name: 'Canvas 2D API', level: 72 },
      { name: 'MediaPipe', level: 68 },
      { name: 'WebAssembly', level: 62 },
    ],
  },
]

const colorMap = {
  green:  { heading: 'text-brand-400',  bar: 'bg-brand-500',   bg: 'bg-brand-950/40 border-brand-900/50',  track: 'bg-brand-950' },
  purple: { heading: 'text-violet-400', bar: 'bg-violet-500',  bg: 'bg-violet-950/40 border-violet-900/50', track: 'bg-violet-950' },
  blue:   { heading: 'text-cyan-400',   bar: 'bg-cyan-500',    bg: 'bg-cyan-950/40 border-cyan-900/50',     track: 'bg-cyan-950' },
  amber:  { heading: 'text-amber-400',  bar: 'bg-amber-500',   bg: 'bg-amber-950/40 border-amber-900/50',   track: 'bg-amber-950' },
}

function SkillRow({ name, level, bar, track, active, delay }: SkillBar & { bar: string; track: string; active: boolean; delay: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-slate-300 font-medium">{name}</span>
        <span className="text-[10px] text-slate-500 font-mono">{level}%</span>
      </div>
      <div className={`h-1.5 rounded-full ${track} overflow-hidden`}>
        <div
          className={`h-full rounded-full ${bar} transition-all duration-1000 ease-out`}
          style={{ width: active ? `${level}%` : '0%', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      id="competencias"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-brand-400 font-mono text-sm mb-3 tracking-widest uppercase">
            // competências
          </p>
          <h2 className="section-title">
            Ferramentas <span className="gradient-text">& Stack</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Tecnologias que domino para construir produtos modernos e rápidos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {skills.map(({ category, color, items }, ci) => {
            const c = colorMap[color]
            return (
              <div
                key={category}
                className={`card border p-6 ${c.bg} transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${ci * 90}ms` }}
              >
                <h3 className={`font-bold text-sm mb-5 ${c.heading} uppercase tracking-widest`}>
                  {category}
                </h3>
                <div className="flex flex-col gap-3.5">
                  {items.map(({ name, level }, si) => (
                    <SkillRow
                      key={name}
                      name={name}
                      level={level}
                      bar={c.bar}
                      track={c.track}
                      active={inView}
                      delay={ci * 90 + si * 80}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
