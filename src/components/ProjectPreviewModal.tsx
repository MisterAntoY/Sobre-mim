import { useEffect, useCallback, useRef } from 'react'
import { X, ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ProjectPreview } from '@/components/previews'

const colorMap = {
  green:  { accent: 'text-brand-400',  border: 'border-brand-800/40',  bg: 'bg-brand-950/30',  bar: 'bg-brand-500',  badge: 'bg-brand-950 text-brand-400 border-brand-800/50' },
  purple: { accent: 'text-violet-400', border: 'border-violet-800/40', bg: 'bg-violet-950/30', bar: 'bg-violet-500', badge: 'bg-violet-950 text-violet-400 border-violet-800/50' },
  blue:   { accent: 'text-cyan-400',   border: 'border-cyan-800/40',   bg: 'bg-cyan-950/30',   bar: 'bg-cyan-500',   badge: 'bg-cyan-950 text-cyan-400 border-cyan-800/50' },
  amber:  { accent: 'text-amber-400',  border: 'border-amber-800/40',  bg: 'bg-amber-950/30',  bar: 'bg-amber-500',  badge: 'bg-amber-950 text-amber-400 border-amber-800/50' },
}

interface Props {
  project: Project | null
  onClose: () => void
}

export function ProjectPreviewModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null)

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!project) return
    document.addEventListener('keydown', handleKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const previouslyFocused = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus?.()
    }
  }, [project, handleKey])

  if (!project) return null

  const c = colorMap[project.color]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={`Pré-visualização: ${project.title}`}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl outline-none focus:ring-2 focus:ring-brand-500/30"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur border-b border-slate-800">
          <div>
            <h2 className="text-white font-bold text-lg">{project.title}</h2>
            <p className={`text-sm ${c.accent}`}>{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Pré-visualização interativa</p>
            <ProjectPreview project={project} />
          </div>

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
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${c.border} ${c.bg} ${c.accent} hover:opacity-90`}
                >
                  <ExternalLink size={15} />
                  Ver demo
                </a>
              ) : (
                <div className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm text-slate-600 border-slate-800 cursor-not-allowed`}>
                  <ExternalLink size={15} />
                  Em breve
                </div>
              )}
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold hover:bg-slate-800 transition-all"
                >
                  <Github size={15} />
                  GitHub
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 text-slate-600 text-sm cursor-not-allowed">
                  <Github size={15} />
                  Privado
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
