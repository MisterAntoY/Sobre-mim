import { ArrowDown, Github, Mail, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'

const roles = [
  'Frontend Developer',
  'React & TypeScript',
  'UI/UX Enthusiast',
  'Criador de Experiências',
]

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
      } else {
        timeout = setTimeout(() => setTyping(false), 2200)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
      } else {
        setRoleIndex(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIndex])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 60% 40%, rgba(34,197,94,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.06) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-brand-500/5 blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-1/3 left-1/5 w-48 h-48 rounded-full bg-violet-500/5 blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: '3s' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-400 mb-8 animate-fade-in">
          <span className="glow-dot" />
          Disponível para novos projetos
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 animate-slide-up">
          Isidro{' '}
          <span className="gradient-text">Mendes</span>
        </h1>

        {/* Typewriter */}
        <p className="text-xl md:text-2xl font-mono text-slate-400 mb-6 h-8 animate-slide-up animate-delay-100">
          <span className="text-brand-400">&gt;</span>{' '}
          <span className="text-slate-200">{displayed}</span>
          <span className="animate-blink text-brand-400">|</span>
        </p>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed mb-10 animate-slide-up animate-delay-200">
          Construo interfaces modernas com{' '}
          <span className="text-brand-400 font-medium">React</span> e{' '}
          <span className="text-brand-400 font-medium">TypeScript</span> — desde
          analisadores financeiros a experiências de realidade aumentada com IA.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14 animate-slide-up animate-delay-300">
          <a href="#projetos" className="btn-primary">
            Ver Projetos
            <ArrowDown size={16} />
          </a>
          <a href="#contacto" className="btn-ghost">
            <Mail size={16} />
            Contactar
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 animate-fade-in animate-delay-500">
          <a
            href="mailto:mendesisidro964@gmail.com"
            className="text-slate-500 hover:text-brand-400 transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-brand-400 transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-brand-400 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-brand-400 transition-colors animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  )
}
