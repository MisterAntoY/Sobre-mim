import { useEffect, useCallback } from 'react'
import { X, ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/data/projects'

const colorMap = {
  green:  { accent: 'text-brand-400',  border: 'border-brand-800/40',  bg: 'bg-brand-950/30',  bar: 'bg-brand-500',  badge: 'bg-brand-950 text-brand-400 border-brand-800/50' },
  purple: { accent: 'text-violet-400', border: 'border-violet-800/40', bg: 'bg-violet-950/30', bar: 'bg-violet-500', badge: 'bg-violet-950 text-violet-400 border-violet-800/50' },
  blue:   { accent: 'text-cyan-400',   border: 'border-cyan-800/40',   bg: 'bg-cyan-950/30',   bar: 'bg-cyan-500',   badge: 'bg-cyan-950 text-cyan-400 border-cyan-800/50' },
  amber:  { accent: 'text-amber-400',  border: 'border-amber-800/40',  bg: 'bg-amber-950/30',  bar: 'bg-amber-500',  badge: 'bg-amber-950 text-amber-400 border-amber-800/50' },
}

function A2IEPreview() {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
  const bars   = [55, 38, 72, 48, 88, 62]
  const categories = [
    { label: 'Alimentação', pct: 35, color: 'bg-brand-500' },
    { label: 'Transporte',  pct: 18, color: 'bg-violet-500' },
    { label: 'Lazer',       pct: 22, color: 'bg-cyan-500' },
    { label: 'Saúde',       pct: 15, color: 'bg-amber-500' },
    { label: 'Outros',      pct: 10, color: 'bg-slate-500' },
  ]
  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
      {/* titlebar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-brand-500/70" />
        <span className="ml-2 text-slate-400 text-[11px]">A2IE — Expense Analyzer</span>
        <span className="ml-auto text-[10px] text-brand-400 border border-brand-800/50 bg-brand-950/50 px-2 py-0.5 rounded-full">Dashboard</span>
      </div>
      {/* summary cards */}
      <div className="grid grid-cols-3 gap-3 p-4">
        {[
          { l: 'Receitas',  v: '€ 3.250', c: 'text-brand-400' },
          { l: 'Despesas',  v: '€ 1.820', c: 'text-red-400' },
          { l: 'Poupança',  v: '€ 1.430', c: 'text-cyan-400' },
        ].map(({ l, v, c }) => (
          <div key={l} className="bg-slate-900 rounded-lg p-3 border border-slate-800">
            <p className="text-slate-500 text-[10px] mb-1">{l}</p>
            <p className={`text-base font-bold ${c}`}>{v}</p>
          </div>
        ))}
      </div>
      {/* bar chart */}
      <div className="mx-4 mb-4 bg-slate-900 rounded-lg p-3 border border-slate-800">
        <p className="text-slate-500 text-[10px] mb-3">Despesas mensais</p>
        <div className="flex items-end gap-2 h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-sm transition-all duration-700 ${i === 4 ? 'bg-brand-500' : 'bg-brand-900'}`}
                style={{ height: `${h}%` }}
              />
              <span className="text-slate-600 text-[9px]">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* categories */}
      <div className="mx-4 mb-4 bg-slate-900 rounded-lg p-3 border border-slate-800">
        <p className="text-slate-500 text-[10px] mb-3">Por categoria</p>
        <div className="space-y-2">
          {categories.map(({ label, pct, color }) => (
            <div key={label}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-slate-500">{pct}%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Ring2Preview() {
  const gallery = [
    { color: 'bg-violet-700', label: 'Argola Prata', active: true },
    { color: 'bg-amber-700',  label: 'Gota Dourada', active: false },
    { color: 'bg-rose-800',   label: 'Pérola Rosa',  active: false },
    { color: 'bg-cyan-800',   label: 'Pendente Azul', active: false },
  ]
  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-violet-500/70" />
        <span className="ml-2 text-slate-400 text-[11px]">Ring2 — Virtual Try-On</span>
        <span className="ml-auto text-[10px] text-violet-400 border border-violet-800/50 bg-violet-950/50 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
          MediaPipe ativo
        </span>
      </div>
      {/* face preview */}
      <div className="relative mx-4 mt-4 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ height: 180 }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 65%)' }}
        />
        {/* face */}
        <div className="relative">
          <div className="w-24 h-28 bg-slate-700/60 rounded-[50%_50%_45%_45%] relative flex items-center justify-center">
            {/* eyes */}
            <div className="absolute top-8 left-4 w-4 h-2.5 bg-slate-500 rounded-full" />
            <div className="absolute top-8 right-4 w-4 h-2.5 bg-slate-500 rounded-full" />
            {/* nose */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-2 h-3 bg-slate-600 rounded-b-full" />
            {/* mouth */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-slate-600 rounded-full" />
            {/* landmark dots */}
            {[
              { top: '26%', left: '18%' }, { top: '26%', right: '18%' },
              { top: '66%', left: '28%' }, { top: '66%', right: '28%' },
              { top: '46%', left: '48%' },
            ].map((s, i) => (
              <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_4px_2px_rgba(167,139,250,0.6)]" style={s} />
            ))}
          </div>
          {/* earrings */}
          <div className="absolute -left-4 top-10 w-3 h-6 rounded-full bg-gradient-to-b from-violet-300 to-violet-600 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
          <div className="absolute -right-4 top-10 w-3 h-6 rounded-full bg-gradient-to-b from-violet-300 to-violet-600 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
        </div>
        {/* AI info overlays */}
        <div className="absolute top-2 left-2 bg-slate-900/90 border border-slate-700 rounded-lg px-2 py-1 text-[9px] text-slate-400">
          <span className="text-violet-400">468</span> landmarks
        </div>
        <div className="absolute top-2 right-2 bg-slate-900/90 border border-slate-700 rounded-lg px-2 py-1 text-[9px] text-slate-400">
          Face Shape: <span className="text-violet-400">Oval</span>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-brand-950/90 border border-brand-800/50 rounded-lg px-3 py-1 text-[9px] text-brand-400">
          ✓ Deteção ativa
        </div>
      </div>
      {/* gallery */}
      <div className="p-4">
        <p className="text-slate-500 text-[10px] mb-2">Catálogo de brincos</p>
        <div className="grid grid-cols-4 gap-2">
          {gallery.map(({ color, label, active }) => (
            <div key={label}
              className={`rounded-lg p-2 text-center cursor-pointer border transition-colors ${
                active
                  ? 'border-violet-500/60 bg-violet-950/40'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700'
              }`}>
              <div className={`w-full h-8 rounded-md ${color} mb-1 opacity-80`} />
              <span className="text-[9px] text-slate-400">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-[10px] py-1.5 rounded-lg transition-colors font-sans">
            Gerar Preview
          </button>
          <button className="flex-1 border border-slate-700 text-slate-400 text-[10px] py-1.5 rounded-lg transition-colors font-sans hover:border-slate-600">
            Download PNG
          </button>
        </div>
      </div>
    </div>
  )
}

interface Props {
  project: Project | null
  onClose: () => void
}

export function ProjectPreviewModal({ project, onClose }: Props) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!project) return
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [project, handleKey])

  if (!project) return null

  const c = colorMap[project.color]

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={`Pré-visualização: ${project.title}`}
    >
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl">
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur border-b border-slate-800">
          <div>
            <h2 className="text-white font-bold text-lg">{project.title}</h2>
            <p className={`text-sm ${c.accent}`}>{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* preview panel */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Pré-visualização interativa</p>
            {project.id === 'a2ie' ? <A2IEPreview /> : <Ring2Preview />}
          </div>

          {/* info panel */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Sobre o projeto</p>
              <p className="text-slate-300 text-sm leading-relaxed">{project.longDescription}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Destaques</p>
              <ul className="space-y-1.5">
                {project.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className={`${c.accent} mt-0.5 font-bold shrink-0`}>›</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Stack completa</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map(t => (
                  <span key={t} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${c.badge}`}>{t}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${c.border} ${c.bg} ${c.accent} hover:opacity-90`}
              >
                <ExternalLink size={15} />
                Ver demo
              </a>
              <a
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold hover:bg-slate-800 transition-all"
              >
                <Github size={15} />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
