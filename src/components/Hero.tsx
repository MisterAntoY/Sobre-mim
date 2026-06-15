import { ArrowDown, Github, Mail, Linkedin, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const roles = [
  'Frontend Developer',
  'React & TypeScript',
  'UI/UX Enthusiast',
  'Criador de Experiências',
]

const codeLines = [
  { indent: 0, content: 'const dev = {', color: 'text-slate-300' },
  { indent: 1, content: 'name: "Isidro Mendes",', color: 'text-slate-400' },
  { indent: 1, content: 'stack: ["React", "TS", "Vite"],', color: 'text-slate-400' },
  { indent: 1, content: 'passion: "UI que encanta",', color: 'text-slate-400' },
  { indent: 1, content: 'ai: true,', color: 'text-brand-400' },
  { indent: 1, content: 'open: true,', color: 'text-violet-400' },
  { indent: 0, content: '}', color: 'text-slate-300' },
]

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 58)
      } else {
        timeout = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
      } else {
        setRoleIndex(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIndex])

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= codeLines.length) clearInterval(id)
    }, 180)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 70% 30%, rgba(34,197,94,0.08) 0%, transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(139,92,246,0.07) 0%, transparent 50%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Orbs */}
      <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-brand-500/4 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-violet-500/5 blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: '2.5s' }} />

      {/* Content — 2-column on large screens */}
      <div className="relative z-10 max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left column — text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-400 mb-7 animate-fade-in">
              <span className="glow-dot" />
              Disponível para novos projetos
              <Sparkles size={11} className="text-brand-400" />
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 animate-slide-up leading-[1.08]">
              Isidro{' '}
              <span className="gradient-text">Mendes</span>
            </h1>

            {/* Typewriter */}
            <p className="text-xl md:text-2xl font-mono text-slate-400 mb-5 h-8 animate-slide-up animate-delay-100">
              <span className="text-brand-400 font-bold">&gt;</span>{' '}
              <span className="text-slate-200">{displayed}</span>
              <span className="animate-blink text-brand-400 font-bold">_</span>
            </p>

            {/* Description */}
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-9 animate-slide-up animate-delay-200 max-w-lg lg:max-w-none">
              Construo interfaces modernas com{' '}
              <span className="text-brand-400 font-semibold">React</span> e{' '}
              <span className="text-brand-400 font-semibold">TypeScript</span> — desde
              analisadores financeiros a experiências de realidade aumentada com IA.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10 animate-slide-up animate-delay-300">
              <a href="#projetos" className="btn-primary">
                Ver Projetos
                <ArrowDown size={15} />
              </a>
              <a href="#contacto" className="btn-ghost">
                <Mail size={15} />
                Contactar
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center lg:justify-start gap-5 animate-fade-in animate-delay-500">
              <a href="mailto:mendesisidro964@gmail.com"
                className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-xs group">
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Email</span>
              </a>
              <a href="https://github.com/isidro-mendes"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-slate-200 transition-colors text-xs group">
                <Github size={16} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/isidro-mendes"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors text-xs group">
                <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right column — code card */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in animate-delay-400">
            <div className="w-full max-w-sm relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 rounded-2xl bg-brand-500/10 blur-2xl scale-110" />

              {/* Card */}
              <div className="relative bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl">
                {/* Window bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/80">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-brand-500/70" />
                  <span className="ml-3 text-xs text-slate-500 font-mono">dev.ts</span>
                </div>

                {/* Code */}
                <div className="p-5 font-mono text-sm space-y-1">
                  {codeLines.map(({ indent, content, color }, i) => (
                    <div
                      key={i}
                      className={`${color} transition-all duration-300 ${
                        i < visibleLines ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}
                      style={{ paddingLeft: `${indent * 16}px` }}
                    >
                      {content}
                    </div>
                  ))}

                  {/* blinking cursor */}
                  <div className="flex items-center gap-1 pt-1">
                    <span className="text-slate-600 font-mono text-xs">$</span>
                    <span className="w-2 h-4 bg-brand-400 animate-blink rounded-sm" />
                  </div>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-brand-950/60 border-t border-brand-900/50 text-xs font-mono">
                  <span className="text-brand-400">✓ TypeScript Strict</span>
                  <span className="text-slate-500">0 errors</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll arrow */}
      <a href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-brand-400 transition-colors animate-bounce"
        aria-label="Rolar para baixo">
        <ArrowDown size={22} />
      </a>
    </section>
  )
}
