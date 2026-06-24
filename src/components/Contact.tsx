import { Mail, Github, Linkedin, MessageSquare, ArrowRight, Phone, Send } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { ContactForm } from '@/components/ContactForm'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

const EXTERNAL_ATTRS = {
  target: '_blank' as const,
  rel: 'noopener noreferrer',
}

const socialLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mendesisidro964@gmail.com',
    href: 'mailto:mendesisidro964@gmail.com',
    hoverColor: 'hover:text-brand-400 hover:border-brand-500/30',
    external: false,
  },
  {
    icon: Phone,
    label: 'Telefone / WhatsApp',
    value: '+351 912 345 678',
    href: 'tel:+351912345678',
    hoverColor: 'hover:text-brand-400 hover:border-brand-500/30',
    external: false,
  },
  {
    icon: Send,
    label: 'Telegram',
    value: '@isidro_mendes',
    href: 'https://t.me/isidro_mendes',
    hoverColor: 'hover:text-cyan-400 hover:border-cyan-500/30',
    external: true,
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@isidro.mendes.dev',
    href: 'https://instagram.com/isidro.mendes.dev',
    hoverColor: 'hover:text-pink-400 hover:border-pink-500/30',
    external: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/isidro-mendes',
    href: 'https://github.com/isidro-mendes',
    hoverColor: 'hover:text-slate-200 hover:border-slate-500/30',
    external: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/isidro-mendes',
    href: 'https://linkedin.com/in/isidro-mendes',
    hoverColor: 'hover:text-blue-400 hover:border-blue-500/30',
    external: true,
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
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
            Disponível para projetos freelance, emprego ou simplesmente uma conversa sobre tecnologia.
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
            <div className="flex flex-col gap-3">
              <a
                href="mailto:mendesisidro964@gmail.com"
                className="btn-primary self-start"
              >
                Enviar email
                <ArrowRight size={16} />
              </a>
              <a
                href="https://t.me/isidro_mendes"
                {...EXTERNAL_ATTRS}
                className="btn-ghost self-start"
              >
                <Send size={15} />
                Mensagem no Telegram
              </a>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-1 gap-3">
            {socialLinks.map(({ icon: Icon, label, value, href, hoverColor, external }, i) => (
              <a
                key={label}
                href={href}
                {...(external ? EXTERNAL_ATTRS : {})}
                className={`card p-3.5 flex items-center gap-3 border border-slate-800/60
                  transition-all duration-300 ${hoverColor} group
                  ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${300 + i * 60}ms` }}
              >
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-slate-700 transition-colors">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500">{label}</p>
                  <p className="text-sm text-slate-300 font-medium truncate">{value}</p>
                </div>
                <ArrowRight size={13} className="ml-auto text-slate-600 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            ))}
          </div>
        </div>

        <div
          className={`mt-8 transition-all duration-700 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
