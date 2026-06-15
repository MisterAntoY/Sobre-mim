import { CheckCircle2, Calendar, Tag } from 'lucide-react'
import type { Project } from '@/data/projects'

const colorMap = {
  green:  { tag: 'tag-green',  dot: 'bg-brand-400',   glow: 'hover:shadow-brand-500/10',  border: 'hover:border-brand-500/30',  accent: 'text-brand-400',  bar: 'bg-brand-500', badge: 'bg-brand-950 text-brand-400 border-brand-800/50' },
  purple: { tag: 'tag-purple', dot: 'bg-violet-400',  glow: 'hover:shadow-violet-500/10', border: 'hover:border-violet-500/30', accent: 'text-violet-400', bar: 'bg-violet-500', badge: 'bg-violet-950 text-violet-400 border-violet-800/50' },
  blue:   { tag: 'tag',        dot: 'bg-cyan-400',    glow: 'hover:shadow-cyan-500/10',   border: 'hover:border-cyan-500/30',   accent: 'text-cyan-400',   bar: 'bg-cyan-500',   badge: 'bg-cyan-950 text-cyan-400 border-cyan-800/50' },
  amber:  { tag: 'tag',        dot: 'bg-amber-400',   glow: 'hover:shadow-amber-500/10',  border: 'hover:border-amber-500/30',  accent: 'text-amber-400',  bar: 'bg-amber-500',  badge: 'bg-amber-950 text-amber-400 border-amber-800/50' },
}

interface Props {
  project: Project
  index: number
  inView: boolean
}

export function ProjectCard({ project, index, inView }: Props) {
  const c = colorMap[project.color]
  const isEven = index % 2 === 0

  return (
    <article
      className={`card card-hover ${c.border} ${c.glow} p-0 overflow-hidden
        transition-all duration-700 hover:shadow-2xl
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Top color bar */}
      <div className={`h-1 w-full ${c.bar} opacity-70`} />

      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
        {/* Visual panel */}
        <div className="lg:w-2/5 bg-slate-900 flex items-center justify-center p-12 relative overflow-hidden min-h-52">
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(ellipse at center, ${project.color === 'green' ? 'rgba(34,197,94,0.08)' : 'rgba(139,92,246,0.08)'} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <span className="text-8xl select-none relative z-10 animate-float"
            style={{ animationDelay: `${index * 1.2}s` }}>
            {project.icon}
          </span>
        </div>

        {/* Content panel */}
        <div className="lg:w-3/5 p-8 flex flex-col justify-between gap-6">
          <div>
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                {project.status}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <Calendar size={11} />
                {project.year}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className={`${c.accent} text-sm font-medium mb-3`}>{project.tagline}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={11} />
              Destaques
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4">
              {project.highlights.slice(0, 6).map(h => (
                <li key={h} className="text-xs text-slate-400 flex items-start gap-1.5">
                  <span className={`${c.accent} mt-0.5 shrink-0`}>›</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag size={11} />
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className={`tag ${c.tag} text-xs`}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
