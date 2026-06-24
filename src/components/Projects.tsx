import { useMemo, useState } from 'react'
import { Search, X, Filter } from 'lucide-react'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectPreviewModal } from '@/components/ProjectPreviewModal'
import { useInView } from '@/hooks/useInView'

const ALL_STATUSES: Project['status'][] = ['Em produção', 'Em desenvolvimento', 'MVP', 'Concluído']

export function Projects() {
  const { ref, inView } = useInView(0.05)
  const [preview, setPreview] = useState<Project | null>(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<Project['status'] | null>(null)
  const [techFilter, setTechFilter] = useState<string | null>(null)

  const techTags = useMemo(() => {
    const set = new Set<string>()
    projects.forEach(p => p.stack.forEach(t => set.add(t)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter(p => {
      if (statusFilter && p.status !== statusFilter) return false
      if (techFilter && !p.stack.includes(techFilter)) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.stack.some(t => t.toLowerCase().includes(q))
      )
    })
  }, [query, statusFilter, techFilter])

  const hasFilters = !!query || !!statusFilter || !!techFilter

  return (
    <section
      id="projetos"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 px-6 relative"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-brand-400 font-mono text-sm mb-3 tracking-widest uppercase">
            // projetos
          </p>
          <h2 className="section-title">
            O que já <span className="gradient-text">construí</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Projetos reais, com código real — desde a ideia à arquitetura final.
          </p>
        </div>

        {/* Search + filters */}
        <div className={`mb-10 transition-all duration-700 delay-100 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <label className="relative flex-1 group">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value.slice(0, 64))}
                placeholder="Procurar por nome, descrição ou tecnologia…"
                aria-label="Procurar projetos"
                maxLength={64}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-900/70 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                  aria-label="Limpar pesquisa"
                  type="button"
                >
                  <X size={14} />
                </button>
              )}
            </label>
            {hasFilters && (
              <button
                onClick={() => { setQuery(''); setStatusFilter(null); setTechFilter(null) }}
                className="px-4 py-2.5 text-xs font-semibold text-slate-400 border border-slate-800 rounded-xl hover:text-white hover:border-slate-700 transition-colors"
                type="button"
              >
                Limpar filtros
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-widest mr-1">
                <Filter size={10} /> Estado
              </span>
              {ALL_STATUSES.map(s => {
                const active = statusFilter === s
                return (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(active ? null : s)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      active
                        ? 'bg-brand-500/15 border-brand-500/40 text-brand-300'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                    type="button"
                  >
                    {s}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-widest mr-1">
                <Filter size={10} /> Stack
              </span>
              {techTags.slice(0, 14).map(t => {
                const active = techFilter === t
                return (
                  <button
                    key={t}
                    onClick={() => setTechFilter(active ? null : t)}
                    className={`text-[11px] px-2 py-0.5 rounded-full border transition-all ${
                      active
                        ? 'bg-violet-500/15 border-violet-500/40 text-violet-300'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                    }`}
                    type="button"
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500" aria-live="polite">
            {filtered.length === projects.length
              ? `${projects.length} projetos`
              : `${filtered.length} de ${projects.length} projetos`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-400 mb-2">Nenhum projeto corresponde aos filtros</p>
            <button
              onClick={() => { setQuery(''); setStatusFilter(null); setTechFilter(null) }}
              className="text-brand-400 text-sm hover:underline"
              type="button"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
                onPreview={() => setPreview(project)}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectPreviewModal project={preview} onClose={() => setPreview(null)} />
    </section>
  )
}
