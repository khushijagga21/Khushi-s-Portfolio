import { useEffect, useRef } from 'react'

export function useScrollReveal(deps: unknown[] = []) {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current ?? document
    const reveals = root.querySelectorAll<HTMLElement>('.reveal, .reveal-scale')
    if (!reveals.length) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )

    reveals.forEach((el) => {
      el.classList.remove('is-in')
      io.observe(el)
    })

    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return rootRef
}

export function usePrefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
