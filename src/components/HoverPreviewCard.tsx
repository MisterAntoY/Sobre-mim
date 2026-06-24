import { useEffect, useState } from 'react'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ProjectPreview } from '@/components/previews'

const colorMap = {
  green:  { accent: 'text-brand-400',  bar: 'bg-brand-500',  badge: 'bg-brand-950 text-brand-400 border-brand-800/50' },
  purple: { accent: 'text-violet-400', bar: 'bg-violet-500', badge: 'bg-violet-950 text-violet-400 border-violet-800/50' },
  blue:   { accent: 'text-cyan-400',   bar: 'bg-cyan-500',   badge: 'bg-cyan-950 text-cyan-400 border-cyan-800/50' },
  amber:  { accent: 'text-amber-400',  bar: 'bg-amber-500',  badge: 'bg-amber-950 text-amber-400 border-amber-800/50' },
}

interface Props {
  project: Project
  onEnter?: () => void
  onLeave?: () => void
  onExpand: () => void
}

export function HoverPreviewCard({ project, onEnter, onLeave, onExpand }: Props) {
  const c = colorMap[project.color]
  const [show, setShow] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      className={`absolute inset-x-3 top-3 z-30 transition-all duration-200 ease-out
        ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1 scale-[0.99]'}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      role="dialog"
      aria-label={`Pré-visualização rápida de ${project.title}`}
    >
      <div className="bg-slate-950/95 backdrop-blur-md rounded-2xl border border-slate-700/70 shadow-2xl shadow-black/40 overflow-hidden">
        <div className={`h-px w-full ${c.bar} opacity-70`} />
        <div className="p-3 sm:p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <h4 className="text-white font-bold text-sm truncate">{project.title}</h4>
              <p className={`${c.accent} text-[11px] font-semibold truncate`}>{project.tagline}</p>
            </div>
            <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${c.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${c.bar}`} />
              {project.status}
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800/80">
            <div className="scale-[0.92] origin-top transform-gpu">
              <ProjectPreview project={project} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <button
              onClick={onExpand}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border ${c.badge} hover:opacity-90 transition-opacity`}
            >
              Ver detalhes
              <ArrowUpRight size={12} />
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800/60 transition-colors"
              >
                <ExternalLink size={12} />
                Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800/60 transition-colors"
              >
                <Github size={12} />
                Repo
              </a>
            )}
            <span className="ml-auto text-[10px] text-slate-600 hidden sm:block">
              Clica para abrir
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
