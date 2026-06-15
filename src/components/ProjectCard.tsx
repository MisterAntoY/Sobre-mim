import { CheckCircle2, Calendar, Tag } from 'lucide-react'
import type { Project } from '@/data/projects'

const colorMap = {
  green:  { tag: 'tag-green',  dot: 'bg-brand-400',   glow: 'hover:shadow-brand-500/10',  border: 'hover:border-brand-500/30',  accent: 'text-brand-400',  bar: 'bg-brand-500', badge: 'bg-brand-950 text-brand-400 border-brand-800/50', chart: 'bg-brand-500', chart2: 'bg-brand-700' },
  purple: { tag: 'tag-purple', dot: 'bg-violet-400',  glow: 'hover:shadow-violet-500/10', border: 'hover:border-violet-500/30', accent: 'text-violet-400', bar: 'bg-violet-500', badge: 'bg-violet-950 text-violet-400 border-violet-800/50', chart: 'bg-violet-500', chart2: 'bg-violet-700' },
  blue:   { tag: 'tag',        dot: 'bg-cyan-400',    glow: 'hover:shadow-cyan-500/10',   border: 'hover:border-cyan-500/30',   accent: 'text-cyan-400',   bar: 'bg-cyan-500',   badge: 'bg-cyan-950 text-cyan-400 border-cyan-800/50', chart: 'bg-cyan-500', chart2: 'bg-cyan-700' },
  amber:  { tag: 'tag',        dot: 'bg-amber-400',   glow: 'hover:shadow-amber-500/10',  border: 'hover:border-amber-500/30',  accent: 'text-amber-400',  bar: 'bg-amber-500',  badge: 'bg-amber-950 text-amber-400 border-amber-800/50', chart: 'bg-amber-500', chart2: 'bg-amber-700' },
}

function ExpenseMockUI({ c }: { c: typeof colorMap['green'] }) {
  const bars = [65, 40, 85, 55, 70, 30]
  return (
    <div className="w-full max-w-[240px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-[10px] font-mono shadow-xl">
      {/* header */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800 bg-slate-900">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-brand-500/60" />
        <span className="ml-2 text-slate-500">A2IE</span>
      </div>
      {/* cards row */}
      <div className="grid grid-cols-3 gap-1.5 p-2">
        {['€ 2.430', '€ 820', '€ 1.610'].map((v, i) => (
          <div key={i} className="bg-slate-900 rounded-lg p-1.5">
            <div className="text-slate-500 text-[8px]">{['Total','Despesas','Saldo'][i]}</div>
            <div className={`font-bold ${i === 2 ? 'text-brand-400' : i === 1 ? 'text-red-400' : 'text-white'}`}>{v}</div>
          </div>
        ))}
      </div>
      {/* chart */}
      <div className="px-2 pb-2">
        <div className="bg-slate-900 rounded-lg p-2">
          <div className="text-slate-500 mb-1.5 text-[8px]">Despesas / mês</div>
          <div className="flex items-end gap-1 h-12">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div
                  className={`${i === 2 ? c.chart : c.chart2} rounded-sm opacity-80`}
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-1 mt-1">
            {['J','F','M','A','M','J'].map(m => (
              <div key={m} className="flex-1 text-center text-slate-600 text-[7px]">{m}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EarringMockUI({ c }: { c: typeof colorMap['purple'] }) {
  return (
    <div className="w-full max-w-[240px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-[10px] font-mono shadow-xl">
      {/* header */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800 bg-slate-900">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-violet-500/60" />
        <span className="ml-2 text-slate-500">Ring2 Try-On</span>
      </div>
      {/* face preview area */}
      <div className="relative mx-2 mt-2 bg-slate-900 rounded-lg h-24 flex items-center justify-center overflow-hidden">
        {/* face silhouette */}
        <div className="relative">
          <div className="w-16 h-20 bg-slate-700/60 rounded-[50%_50%_45%_45%] relative">
            {/* eyes */}
            <div className="absolute top-6 left-3 w-2.5 h-1.5 bg-slate-500 rounded-full" />
            <div className="absolute top-6 right-3 w-2.5 h-1.5 bg-slate-500 rounded-full" />
            {/* landmark dots */}
            {[
              { top: '28%', left: '14%' }, { top: '28%', right: '14%' },
              { top: '62%', left: '25%' }, { top: '62%', right: '25%' },
            ].map((s, i) => (
              <div key={i} className="absolute w-1 h-1 rounded-full bg-violet-400 shadow-[0_0_4px_2px_rgba(167,139,250,0.5)]" style={s} />
            ))}
          </div>
          {/* earrings */}
          <div className="absolute -left-3 top-8 w-2 h-4 bg-gradient-to-b from-violet-400 to-violet-600 rounded-full shadow-[0_0_6px_rgba(167,139,250,0.7)]" />
          <div className="absolute -right-3 top-8 w-2 h-4 bg-gradient-to-b from-violet-400 to-violet-600 rounded-full shadow-[0_0_6px_rgba(167,139,250,0.7)]" />
        </div>
        {/* AI badge */}
        <div className="absolute top-1.5 right-1.5 bg-violet-950/80 border border-violet-800/50 text-violet-400 text-[7px] px-1.5 py-0.5 rounded-full">
          MediaPipe ✓
        </div>
      </div>
      {/* gallery row */}
      <div className="flex gap-1.5 p-2">
        {[c.chart, 'bg-amber-700', 'bg-rose-700', c.chart2].map((bg, i) => (
          <div key={i} className={`flex-1 h-8 rounded-md ${i === 0 ? 'ring-1 ring-violet-400' : ''} ${bg} opacity-80`} />
        ))}
      </div>
    </div>
  )
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
      style={{ transitionDelay: `${index * 140}ms` }}
    >
      <div className={`h-px w-full ${c.bar} opacity-60`} />

      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Visual panel */}
        <div className="lg:w-[42%] bg-slate-900/70 flex items-center justify-center p-8 md:p-10 relative overflow-hidden min-h-56">
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(ellipse at center, ${
                project.color === 'green' ? 'rgba(34,197,94,0.07)' : 'rgba(139,92,246,0.07)'
              } 0%, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative z-10 animate-float" style={{ animationDelay: `${index * 1.5}s` }}>
            {project.id === 'a2ie'
              ? <ExpenseMockUI c={c} />
              : <EarringMockUI c={c} />
            }
          </div>
        </div>

        {/* Content panel */}
        <div className="lg:w-[58%] p-7 md:p-9 flex flex-col gap-5">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
              {project.status}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={11} /> {project.year}
            </span>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{project.title}</h3>
            <p className={`${c.accent} text-sm font-semibold mb-3`}>{project.tagline}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={10} /> Destaques
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
              {project.highlights.slice(0, 6).map(h => (
                <li key={h} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className={`${c.accent} mt-0.5 shrink-0 font-bold`}>›</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Tag size={10} /> Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map(tech => (
                <span key={tech} className={`tag ${c.tag} text-[11px]`}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
