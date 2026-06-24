import { projects, skills } from '@/data/projects'

function safeFilename(name: string) {
  return name.replace(/[^a-z0-9-_]/gi, '_')
}

export function generateResumeMarkdown(): string {
  const today = new Date().toISOString().slice(0, 10)

  const sections: string[] = [
    '# Isidro Mendes',
    '**Frontend Developer · React + TypeScript**',
    '',
    `Atualizado: ${today}`,
    '',
    '- Email: mendesisidro964@gmail.com',
    '- GitHub: https://github.com/isidro-mendes',
    '- LinkedIn: https://linkedin.com/in/isidro-mendes',
    '',
    '## Sobre',
    'Desenvolvedor frontend focado em React e TypeScript, com experiência em re-arquitetura de protótipos para produtos robustos. Construo interfaces que combinam estética, performance e acessibilidade.',
    '',
    '## Projetos',
  ]

  projects.forEach(p => {
    sections.push(`### ${p.title} (${p.year}) — ${p.status}`)
    sections.push(`*${p.tagline}*`)
    sections.push('')
    sections.push(p.description)
    sections.push('')
    sections.push('**Destaques:**')
    p.highlights.forEach(h => sections.push(`- ${h}`))
    sections.push('')
    sections.push(`**Stack:** ${p.stack.join(', ')}`)
    if (p.liveUrl) sections.push(`**Demo:** ${p.liveUrl}`)
    if (p.repoUrl) sections.push(`**Código:** ${p.repoUrl}`)
    sections.push('')
  })

  sections.push('## Competências')
  skills.forEach(s => {
    sections.push(`- **${s.category}:** ${s.items.join(', ')}`)
  })
  sections.push('')

  return sections.join('\n')
}

export function downloadResume() {
  const md = generateResumeMarkdown()
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = safeFilename(`CV_Isidro_Mendes_${new Date().toISOString().slice(0, 10)}`) + '.md'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
