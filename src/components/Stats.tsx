import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'

interface Stat {
  value: number
  suffix: string
  label: string
  description: string
}

const stats: Stat[] = [
  { value: 2,   suffix: '',  label: 'Projetos',        description: 'Aplicações completas entregues' },
  { value: 15,  suffix: '+', label: 'Tecnologias',     description: 'Ferramentas dominadas' },
  { value: 468, suffix: '',  label: 'Landmarks',       description: 'Pontos faciais detetados com IA' },
  { value: 100, suffix: '%', label: 'TypeScript',      description: 'Sem any implícito, strict mode' },
]

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true

    const duration = 1400
    const steps = 40
    const interval = duration / steps
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current = Math.min(current + increment, target)
      setCount(Math.round(current))
      if (current >= target) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [active, target])

  return (
    <span>
      {count.toLocaleString('pt-PT')}{suffix}
    </span>
  )
}

export function Stats() {
  const { ref, inView } = useInView(0.3)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 px-6 border-y border-slate-800/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, suffix, label, description }, i) => (
            <div
              key={label}
              className={`text-center transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-4xl md:text-5xl font-extrabold gradient-text tabular-nums">
                <Counter target={value} suffix={suffix} active={inView} />
              </p>
              <p className="text-white font-semibold mt-1 mb-0.5">{label}</p>
              <p className="text-slate-500 text-xs">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
