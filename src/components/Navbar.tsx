import { useState, useEffect } from 'react'
import { Menu, X, Command, FileDown } from 'lucide-react'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#competencias', label: 'Competências' },
  { href: '#contacto', label: 'Contacto' },
]

interface Props {
  onOpenCommand: () => void
  onDownloadResume: () => void
}

export function Navbar({ onOpenCommand, onDownloadResume }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/i.test(navigator.platform))
  }, [])

  function handleLinkClick() {
    setOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/60 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#inicio"
          className="font-mono font-bold text-brand-400 text-lg hover:text-brand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 rounded"
        >
          &lt;IM /&gt;
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-slate-400 hover:text-brand-400 transition-colors font-medium relative group focus:outline-none focus:text-brand-400"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenCommand}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-400 hover:text-slate-200 transition-colors text-xs"
            aria-label="Abrir paleta de comandos"
            type="button"
          >
            <Command size={12} />
            <span className="hidden lg:inline">Procurar</span>
            <kbd className="font-mono text-[10px] border border-slate-700 rounded px-1.5 py-0.5">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
          <button
            onClick={onDownloadResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-300 hover:bg-brand-500/25 transition-colors text-xs font-semibold"
            type="button"
          >
            <FileDown size={12} />
            CV
          </button>
        </div>

        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 rounded"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={handleLinkClick}
                  className="block text-slate-300 hover:text-brand-400 transition-colors font-medium py-1"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => { onOpenCommand(); setOpen(false) }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-800 text-slate-300 text-sm"
                type="button"
              >
                <Command size={14} />
                Paleta de comandos
              </button>
              <button
                onClick={() => { onDownloadResume(); setOpen(false) }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-300 text-sm font-semibold"
                type="button"
              >
                <FileDown size={14} />
                Descarregar CV
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
