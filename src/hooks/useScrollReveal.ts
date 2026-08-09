import { useEffect, useRef } from 'react'

const REVEAL_SEL = '.reveal, .reveal-scale, .reveal-left, .reveal-right'

export function useScrollReveal(deps: unknown[] = []) {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current ?? document
    const reveals = root.querySelectorAll<HTMLElement>(REVEAL_SEL)
    if (!reveals.length) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-in'))
      return
    }

    // Auto-stagger siblings that share a parent
    const groups = new Map<Element, HTMLElement[]>()
    reveals.forEach((el) => {
      const parent = el.parentElement
      if (!parent) return
      const list = groups.get(parent) ?? []
      list.push(el)
      groups.set(parent, list)
    })
    groups.forEach((list) => {
      list.forEach((el, i) => {
        if (el.style.transitionDelay) return
        if (el.className.includes('reveal-d')) return
        el.style.transitionDelay = `${Math.min(i * 0.09, 0.45)}s`
      })
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
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
