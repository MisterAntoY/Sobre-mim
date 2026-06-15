import { Code2, Cpu, Palette, Zap } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const traits = [
  {
    icon: Code2,
    title: 'Código Limpo',
    description:
      'TypeScript estrito, sem any, sem comentários desnecessários. O código comunica intenção.',
    color: 'text-brand-400',
    bg: 'bg-brand-950/50 border-brand-800/40',
  },
  {
    icon: Palette,
    title: 'UI Cuidada',
    description:
      'Design tokens, CSS Modules, componentes acessíveis. A interface é o produto.',
    color: 'text-violet-400',
    bg: 'bg-violet-950/50 border-violet-800/40',
  },
  {
    icon: Cpu,
    title: 'IA Integrada',
    description:
      'MediaPipe, WebAssembly, canvas 2D — experiências que vão além do browser tradicional.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-950/50 border-cyan-800/40',
  },
  {
    icon: Zap,
    title: 'Performance',
    description:
      'Vite, code splitting, memoização cirúrgica. Rápido por defeito, não por acidente.',
    color: 'text-amber-400',
    bg: 'bg-amber-950/50 border-amber-800/40',
  },
]

export function About() {
  const { ref, inView } = useInView()

  return (
    <section
      id="sobre"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Text */}
          <div>
            <p className="text-brand-400 font-mono text-sm mb-3 tracking-widest uppercase">
              // sobre mim
            </p>
            <h2 className="section-title">
              Construo com cuidado,<br />
              <span className="gradient-text">entrego com qualidade</span>
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed mt-6">
              <p>
                Sou um desenvolvedor frontend com foco em React e TypeScript,
                apaixonado por interfaces que combinam estética e funcionalidade.
                Cada projeto é uma oportunidade de criar algo que as pessoas
                genuinamente gostem de usar.
              </p>
              <p>
                Venho de uma abordagem de{' '}
                <span className="text-slate-200">re-arquitetura progressiva</span>:
                pego em protótipos e transformo-os em produtos robustos, com
                domínio isolado, componentes coesos e zero débito técnico
                desnecessário.
              </p>
              <p>
                Quando não estou a codificar, estou a explorar novas APIs do
                browser, a experimentar com IA generativa ou a otimizar a minha
                configuração de desenvolvimento.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <span className="tag tag-green">Open to Work</span>
              <span className="tag">📍 Portugal</span>
              <span className="tag">🇵🇹 / 🇬🇧</span>
            </div>
          </div>

          {/* Traits grid */}
          <div className="grid grid-cols-2 gap-4">
            {traits.map(({ icon: Icon, title, description, color, bg }, i) => (
              <div
                key={title}
                className={`card p-5 border ${bg} transition-all duration-500 hover:-translate-y-1 hover:shadow-lg`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Icon size={22} className={`${color} mb-3`} />
                <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
