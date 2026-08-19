import { useEffect, useRef } from 'react'

/** Thin progress line under the navbar — tracks how far you've scrolled. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let ticking = false
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      bar.style.transform = `scaleX(${progress})`
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" ref={barRef} />
    </div>
  )
}
