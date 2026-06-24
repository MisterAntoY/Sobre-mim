import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Search, ArrowRight, Mail, Github, Linkedin, Send,
  Home, User, Briefcase, Cpu, MessageSquare, FileDown, X,
  type LucideIcon,
} from 'lucide-react'
import { projects } from '@/data/projects'

interface Action {
  id: string
  label: string
  hint?: string
  icon: LucideIcon
  keywords?: string
  run: () => void
}

interface Props {
  open: boolean
  onClose: () => void
  onDownloadResume: () => void
}

const sectionsScroll = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const openExternal = (url: string) => () => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function CommandPalette({ open, onClose, onDownloadResume }: Props) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const actions = useMemo<Action[]>(() => [
    { id: 'home',    label: 'Ir para Início',         icon: Home,            keywords: 'top inicio',         run: sectionsScroll('inicio') },
    { id: 'sobre',   label: 'Ir para Sobre',          icon: User,            keywords: 'about bio',           run: sectionsScroll('sobre') },
    { id: 'proj',    label: 'Ir para Projetos',       icon: Briefcase,       keywords: 'projects portfolio',  run: sectionsScroll('projetos') },
    { id: 'comp',    label: 'Ir para Competências',   icon: Cpu,             keywords: 'skills tools',        run: sectionsScroll('competencias') },
    { id: 'contact', label: 'Ir para Contacto',       icon: MessageSquare,   keywords: 'contact email',       run: sectionsScroll('contacto') },
    { id: 'cv',      label: 'Descarregar CV (Markdown)', icon: FileDown,    keywords: 'resume curriculum download', run: onDownloadResume },
    { id: 'email',   label: 'Enviar Email',           icon: Mail,            keywords: 'contact reach',       run: () => { window.location.href = 'mailto:mendesisidro964@gmail.com' } },
    { id: 'gh',      label: 'Abrir GitHub',           icon: Github,          keywords: 'code repos',          run: openExternal('https://github.com/isidro-mendes') },
    { id: 'li',      label: 'Abrir LinkedIn',         icon: Linkedin,        keywords: 'social profile',      run: openExternal('https://linkedin.com/in/isidro-mendes') },
    { id: 'tg',      label: 'Abrir Telegram',         icon: Send,            keywords: 'chat message',        run: openExternal('https://t.me/isidro_mendes') },
    ...projects.map(p => ({
      id: `proj-${p.id}`,
      label: `Projeto: ${p.title}`,
      hint: p.tagline,
      icon: Briefcase,
      keywords: `${p.stack.join(' ')} ${p.status}`,
      run: () => {
        document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      },
    })),
  ], [onDownloadResume])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter(a => {
      const hay = `${a.label} ${a.hint ?? ''} ${a.keywords ?? ''}`.toLowerCase()
      return hay.includes(q)
    })
  }, [query, actions])

  useEffect(() => { setActiveIndex(0) }, [query, open])

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 30)
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        clearTimeout(id)
        document.body.style.overflow = prevOverflow
      }
    }
  }, [open])

  if (!open) return null

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const action = results[activeIndex]
      if (action) {
        action.run()
        onClose()
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center p-4 sm:pt-24 bg-black/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Paleta de comandos"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-xl bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden"
        onKeyDown={handleKey}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
          <Search size={16} className="text-slate-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value.slice(0, 80))}
            placeholder="Procurar comando ou projeto…"
            className="flex-1 bg-transparent text-slate-200 placeholder:text-slate-600 text-sm outline-none"
            maxLength={80}
            aria-label="Procurar"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="sm:hidden text-slate-500 hover:text-slate-300 p-1"
            aria-label="Fechar"
          >
            <X size={14} />
          </button>
        </div>

        <ul className="max-h-[55vh] overflow-y-auto py-2">
          {results.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-slate-500">
              Sem resultados para “{query}”
            </li>
          ) : (
            results.map((a, i) => {
              const Icon = a.icon
              const active = i === activeIndex
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => { a.run(); onClose() }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      active ? 'bg-slate-800/80 text-white' : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${active ? 'bg-brand-500/15 text-brand-300' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm truncate">{a.label}</p>
                      {a.hint && <p className="text-[11px] text-slate-500 truncate">{a.hint}</p>}
                    </div>
                    <ArrowRight size={13} className={active ? 'text-brand-400' : 'text-slate-600'} />
                  </button>
                </li>
              )
            })
          )}
        </ul>

        <div className="border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span><kbd className="border border-slate-700 rounded px-1">↑↓</kbd> navegar</span>
            <span><kbd className="border border-slate-700 rounded px-1">↵</kbd> executar</span>
          </div>
          <span>{results.length} resultado{results.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  )
}
