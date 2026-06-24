import { useCallback, useEffect, useRef, useState } from 'react'

interface Options {
  enterDelay?: number
  leaveDelay?: number
}

export function useHoverIntent({ enterDelay = 380, leaveDelay = 220 }: Options = {}) {
  const [active, setActive] = useState(false)
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const supportsHover = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    supportsHover.current = mq.matches
    const onChange = () => { supportsHover.current = mq.matches }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const clear = useCallback(() => {
    if (enterTimer.current) { clearTimeout(enterTimer.current); enterTimer.current = null }
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
  }, [])

  const onEnter = useCallback(() => {
    if (!supportsHover.current) return
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
    enterTimer.current = setTimeout(() => setActive(true), enterDelay)
  }, [enterDelay])

  const onLeave = useCallback(() => {
    if (!supportsHover.current) return
    if (enterTimer.current) { clearTimeout(enterTimer.current); enterTimer.current = null }
    leaveTimer.current = setTimeout(() => setActive(false), leaveDelay)
  }, [leaveDelay])

  const close = useCallback(() => {
    clear()
    setActive(false)
  }, [clear])

  useEffect(() => () => clear(), [clear])

  return { active, onEnter, onLeave, close }
}
