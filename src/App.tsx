import { useCallback, useEffect, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Hero } from '@/components/Hero'
import { Stats } from '@/components/Stats'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { CommandPalette } from '@/components/CommandPalette'
import { BackToTop } from '@/components/BackToTop'
import { downloadResume } from '@/lib/resume'
import { impactLight } from '@/lib/native'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  const handleDownload = useCallback(() => {
    try {
      void impactLight()
      downloadResume()
    } catch (e) {
      console.error('Erro ao gerar CV:', e)
    }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isK = e.key === 'k' || e.key === 'K'
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setPaletteOpen(o => !o)
      } else if (e.key === '/' && !paletteOpen) {
        const target = e.target as HTMLElement | null
        const tag = target?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen])

  return (
    <>
      <a href="#inicio-conteudo" className="skip-link">Saltar para o conteúdo</a>
      <ScrollProgress />
      <Navbar onOpenCommand={() => setPaletteOpen(true)} onDownloadResume={handleDownload} />
      <main id="inicio-conteudo">
        <Hero />
        <Stats />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onDownloadResume={handleDownload}
      />
    </>
  )
}
