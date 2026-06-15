import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { useInView } from '@/hooks/useInView'

export function Projects() {
  const { ref, inView } = useInView(0.05)

  return (
    <section
      id="projetos"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 px-6 relative"
    >
      {/* subtle bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-brand-400 font-mono text-sm mb-3 tracking-widest uppercase">
            // projetos
          </p>
          <h2 className="section-title">
            O que já <span className="gradient-text">construí</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Projetos reais, com código real — desde a ideia à arquitetura final.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
