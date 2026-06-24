import { CheckCircle2, Calendar, Tag, Eye, ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/data/projects'
import { useHoverIntent } from '@/hooks/useHoverIntent'
import { HoverPreviewCard } from '@/components/HoverPreviewCard'

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
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800 bg-slate-900">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-brand-500/60" />
        <span className="ml-2 text-slate-500">A2IE</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-2">
        {['€ 2.430', '€ 820', '€ 1.610'].map((v, i) => (
          <div key={i} className="bg-slate-900 rounded-lg p-1.5">
            <div className="text-slate-500 text-[8px]">{['Total','Despesas','Saldo'][i]}</div>
            <div className={`font-bold ${i === 2 ? 'text-brand-400' : i === 1 ? 'text-red-400' : 'text-white'}`}>{v}</div>
          </div>
        ))}
      </div>
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
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800 bg-slate-900">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-violet-500/60" />
        <span className="ml-2 text-slate-500">Ring2 Try-On</span>
      </div>
      <div className="relative mx-2 mt-2 bg-slate-900 rounded-lg h-24 flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className="w-16 h-20 bg-slate-700/60 rounded-[50%_50%_45%_45%] relative">
            <div className="absolute top-6 left-3 w-2.5 h-1.5 bg-slate-500 rounded-full" />
            <div className="absolute top-6 right-3 w-2.5 h-1.5 bg-slate-500 rounded-full" />
            {[
              { top: '28%', left: '14%' }, { top: '28%', right: '14%' },
              { top: '62%', left: '25%' }, { top: '62%', right: '25%' },
            ].map((s, i) => (
              <div key={i} className="absolute w-1 h-1 rounded-full bg-violet-400 shadow-[0_0_4px_2px_rgba(167,139,250,0.5)]" style={s} />
            ))}
          </div>
          <div className="absolute -left-3 top-8 w-2 h-4 bg-gradient-to-b from-violet-400 to-violet-600 rounded-full shadow-[0_0_6px_rgba(167,139,250,0.7)]" />
          <div className="absolute -right-3 top-8 w-2 h-4 bg-gradient-to-b from-violet-400 to-violet-600 rounded-full shadow-[0_0_6px_rgba(167,139,250,0.7)]" />
        </div>
        <div className="absolute top-1.5 right-1.5 bg-violet-950/80 border border-violet-800/50 text-violet-400 text-[7px] px-1.5 py-0.5 rounded-full">
          MediaPipe ✓
        </div>
      </div>
      <div className="flex gap-1.5 p-2">
        {[c.chart, 'bg-amber-700', 'bg-rose-700', c.chart2].map((bg, i) => (
          <div key={i} className={`flex-1 h-8 rounded-md ${i === 0 ? 'ring-1 ring-violet-400' : ''} ${bg} opacity-80`} />
        ))}
      </div>
    </div>
  )
}

function PricenMockUI({ c: _c }: { c: typeof colorMap['amber'] }) {
  const materials = [
    { name: 'Cimento Portland',  unit: 'saco 50kg', p1: '4.500', p2: '4.200', p3: '4.800' },
    { name: 'Varão Ø12 A500NR', unit: 'barra 12m',  p1: '2.100', p2: '2.350', p3: '1.980' },
    { name: 'Tijolo Furado',     unit: 'milheiro',   p1: '18.500', p2: '17.900', p3: '19.200' },
  ]
  return (
    <div className="w-full max-w-[260px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-[9px] font-mono shadow-xl">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800 bg-slate-900">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-amber-500/60" />
        <span className="ml-2 text-slate-400">Pricen · Comparador</span>
      </div>
      <div className="grid grid-cols-4 gap-px px-2 pt-2 pb-1 text-[8px] text-slate-500">
        <span>Material</span>
        <span className="text-center">Forn. A</span>
        <span className="text-center">Forn. B</span>
        <span className="text-center">Forn. C</span>
      </div>
      <div className="px-1 pb-2 space-y-1">
        {materials.map(({ name, unit, p1, p2, p3 }, i) => {
          const prices = [p1, p2, p3].map(Number)
          const min = Math.min(...prices)
          return (
            <div key={i} className="grid grid-cols-4 gap-px bg-slate-900 rounded-md px-1.5 py-1.5 items-center">
              <div>
                <div className="text-slate-300 font-medium leading-tight">{name}</div>
                <div className="text-slate-600 text-[7px]">{unit}</div>
              </div>
              {[p1, p2, p3].map((p, j) => (
                <div key={j} className={`text-center font-bold rounded px-0.5 py-0.5 ${
                  Number(p) === min ? 'text-amber-400 bg-amber-950/50' : 'text-slate-400'
                }`}>
                  {p} Kz
                </div>
              ))}
            </div>
          )
        })}
      </div>
      <div className="mx-2 mb-2 bg-amber-950/30 border border-amber-900/40 rounded-lg p-2 flex items-center justify-between">
        <span className="text-amber-400">Total estimado</span>
        <span className="text-amber-300 font-bold">1.234.500 Kz</span>
      </div>
    </div>
  )
}

function JerryMockUI({ c: _c }: { c: typeof colorMap['blue'] }) {
  const quests = [
    { name: 'Leitura diária',  xp: 50,  done: true },
    { name: 'Exercício físico', xp: 80, done: true },
    { name: 'Projeto pessoal', xp: 120, done: false },
  ]
  return (
    <div className="w-full max-w-[240px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-[9px] font-mono shadow-xl">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800 bg-slate-900">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-cyan-500/60" />
        <span className="ml-2 text-slate-400">Jerry · Modo RPG</span>
        <span className="ml-auto text-cyan-400 text-[7px] border border-cyan-800/50 bg-cyan-950/50 px-1.5 py-0.5 rounded-full">Lvl 12</span>
      </div>
      <div className="p-2 space-y-1.5">
        <div>
          <div className="flex justify-between text-[8px] mb-0.5">
            <span className="text-red-400">❤️ HP</span><span className="text-slate-500">78 / 100</span>
          </div>
          <div className="h-2 bg-red-950 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: '78%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[8px] mb-0.5">
            <span className="text-cyan-400">⚡ XP</span><span className="text-slate-500">2.340 / 3.000</span>
          </div>
          <div className="h-2 bg-cyan-950 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full" style={{ width: '78%' }} />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[8px] pt-0.5">
          <span className="text-orange-400">🔥 Streak: <span className="font-bold text-orange-300">14 dias</span></span>
          <span className="text-slate-600">|</span>
          <span className="text-violet-400">🛡 Escudos: <span className="font-bold">2</span></span>
        </div>
      </div>
      <div className="px-2 pb-2">
        <div className="text-slate-500 text-[7px] uppercase tracking-wider mb-1">Missões de hoje</div>
        {quests.map(({ name, xp, done }) => (
          <div key={name} className={`flex items-center gap-2 py-1 px-2 rounded-md mb-1 ${done ? 'bg-cyan-950/30' : 'bg-slate-900'}`}>
            <span className={`w-3 h-3 rounded border flex-shrink-0 flex items-center justify-center text-[8px] ${done ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400' : 'border-slate-700'}`}>
              {done ? '✓' : ''}
            </span>
            <span className={`flex-1 ${done ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{name}</span>
            <span className="text-cyan-400 text-[7px]">+{xp}xp</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MyTubeMockUI({ c: _c }: { c: typeof colorMap['purple'] }) {
  return (
    <div className="w-[140px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-[9px] font-mono shadow-xl relative" style={{ height: 220 }}>
      <div className="flex items-center justify-between px-2 py-1 bg-black text-[7px] text-slate-400">
        <span>9:41</span><span>●●● WiFi</span>
      </div>
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-900" style={{ height: 140 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[12px] border-l-white ml-1" />
          </div>
        </div>
        <div className="absolute right-1.5 bottom-2 flex flex-col items-center gap-2.5">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-slate-700 border border-violet-500/50 flex items-center justify-center text-[8px]">🎬</div>
          </div>
          {[['♥','1.2k'],['💬','89'],['↗','34']].map(([icon, count]) => (
            <div key={icon} className="flex flex-col items-center">
              <span className="text-base leading-none">{icon}</span>
              <span className="text-white text-[7px]">{count}</span>
            </div>
          ))}
        </div>
        <div className="absolute left-2 bottom-2 right-10">
          <div className="text-white text-[8px] font-bold">@criador_top</div>
          <div className="text-slate-300 text-[7px] truncate">Vídeo incrível #trending</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-700">
          <div className="h-full bg-violet-500 w-2/5" />
        </div>
      </div>
      <div className="flex items-center justify-around px-1 py-1.5 bg-black border-t border-slate-800">
        {['🏠','🔍','➕','🔔','👤'].map((icon, i) => (
          <span key={i} className={`text-sm ${i === 0 ? 'text-white' : 'text-slate-600'}`}>{icon}</span>
        ))}
      </div>
      <div className="absolute top-8 left-1.5 bg-violet-600/90 text-white text-[7px] px-1 py-0.5 rounded-full">
        Chat Live
      </div>
    </div>
  )
}

interface Props {
  project: Project
  index: number
  inView: boolean
  onPreview: () => void
}

export function ProjectCard({ project, index, inView, onPreview }: Props) {
  const c = colorMap[project.color]
  const isEven = index % 2 === 0
  const hover = useHoverIntent({ enterDelay: 420, leaveDelay: 260 })

  return (
    <article
      className={`card card-hover ${c.border} ${c.glow} p-0 overflow-hidden relative
        transition-all duration-700 hover:shadow-2xl focus-within:ring-2 focus-within:ring-brand-500/30
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 140}ms` }}
      onMouseEnter={hover.onEnter}
      onMouseLeave={hover.onLeave}
    >
      <div className={`h-px w-full ${c.bar} opacity-60`} />

      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        <div className="lg:w-[42%] bg-slate-900/70 flex items-center justify-center p-8 md:p-10 relative overflow-hidden min-h-56">
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(ellipse at center, ${
                project.color === 'green'  ? 'rgba(34,197,94,0.07)'  :
                project.color === 'purple' ? 'rgba(139,92,246,0.07)' :
                project.color === 'blue'   ? 'rgba(6,182,212,0.07)'  :
                                             'rgba(245,158,11,0.07)'
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
          <div className="relative z-10 animate-float motion-reduce:animate-none" style={{ animationDelay: `${index * 1.5}s` }}>
            {project.id === 'a2ie'    ? <ExpenseMockUI c={c} />
            : project.id === 'ring2'  ? <EarringMockUI c={c} />
            : project.id === 'pricen' ? <PricenMockUI c={c} />
            : project.id === 'jerry'  ? <JerryMockUI c={c} />
            :                           <MyTubeMockUI c={c} />}
          </div>
        </div>

        <div className="lg:w-[58%] p-7 md:p-9 flex flex-col gap-5">
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

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onPreview}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                border ${c.badge} transition-all duration-200 hover:opacity-80 hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-500/40`}
            >
              <Eye size={14} />
              Ver pré-visualização
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800/60 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              >
                <ExternalLink size={14} />
                Live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800/60 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              >
                <Github size={14} />
                Código
              </a>
            )}
          </div>
        </div>
      </div>

      {hover.active && (
        <HoverPreviewCard
          project={project}
          onEnter={hover.onEnter}
          onLeave={hover.onLeave}
          onExpand={() => { hover.close(); onPreview() }}
        />
      )}
    </article>
  )
}
