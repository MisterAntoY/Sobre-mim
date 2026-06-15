import { skills } from '@/data/projects'
import { useInView } from '@/hooks/useInView'

const colorMap = {
  green:  { heading: 'text-brand-400',   bg: 'bg-brand-950/50 border-brand-800/40',   tag: 'tag-green'  },
  purple: { heading: 'text-violet-400',  bg: 'bg-violet-950/50 border-violet-800/40', tag: 'tag-purple' },
  blue:   { heading: 'text-cyan-400',    bg: 'bg-cyan-950/50 border-cyan-800/40',     tag: 'tag'        },
  amber:  { heading: 'text-amber-400',   bg: 'bg-amber-950/50 border-amber-800/40',   tag: 'tag'        },
}

export function Skills() {
  const { ref, inView } = useInView()

  return (
    <section
      id="competencias"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-brand-400 font-mono text-sm mb-3 tracking-widest uppercase">
            // competências
          </p>
          <h2 className="section-title">
            Ferramentas <span className="gradient-text">& Stack</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Tecnologias que uso no dia a dia para construir produtos modernos e rápidos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map(({ category, color, items }, i) => {
            const c = colorMap[color]
            return (
              <div
                key={category}
                className={`card border p-6 ${c.bg} transition-all duration-700 hover:-translate-y-1 hover:shadow-xl ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className={`font-semibold text-sm mb-4 ${c.heading} uppercase tracking-wider`}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className={`tag ${c.tag}`}>{item}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
