import { Mail, Github, Linkedin, MessageSquare, ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mendesisidro964@gmail.com',
    href: 'mailto:mendesisidro964@gmail.com',
    color: 'hover:text-brand-400 hover:border-brand-500/30',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/isidro-mendes',
    href: '#',
    color: 'hover:text-slate-200 hover:border-slate-500/30',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/isidro-mendes',
    href: '#',
    color: 'hover:text-blue-400 hover:border-blue-500/30',
  },
]

export function Contact() {
  const { ref, inView } = useInView()

  return (
    <section
      id="contacto"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-brand-400 font-mono text-sm mb-3 tracking-widest uppercase">
            // contacto
          </p>
          <h2 className="section-title">
            Vamos <span className="gradient-text">conversar</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-lg">
            Estou disponível para projetos freelance, oportunidades de emprego ou
            simplesmente uma conversa sobre tecnologia.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* CTA card */}
          <div className="card p-8 border-brand-800/30 bg-brand-950/20 flex flex-col justify-between gap-6">
            <div>
              <MessageSquare size={28} className="text-brand-400 mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">
                Pronto para começar?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Se tens um projeto em mente ou precisas de reforçar a tua
                equipa de frontend, entra em contacto — respondo em menos de 24h.
              </p>
            </div>
            <a
              href="mailto:mendesisidro964@gmail.com"
              className="btn-primary self-start"
            >
              Enviar email
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            {links.map(({ icon: Icon, label, value, href, color }, i) => (
              <a
                key={label}
                href={href}
                className={`card p-4 flex items-center gap-4 border border-slate-800/60
                  transition-all duration-300 ${color} group
                  ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-slate-700 transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-sm text-slate-300 font-medium">{value}</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-slate-600 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
