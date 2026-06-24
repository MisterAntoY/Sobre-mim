import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollTop}
      aria-label="Voltar ao topo"
      type="button"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-brand-500/20 backdrop-blur border border-brand-500/40 text-brand-300 hover:bg-brand-500/30 hover:scale-110 shadow-lg shadow-brand-500/20
        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500/40
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <ArrowUp size={18} className="mx-auto" />
    </button>
  )
}
