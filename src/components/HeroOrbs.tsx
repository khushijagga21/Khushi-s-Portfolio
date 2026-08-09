import { useEffect } from 'react'

export function HeroOrbs() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const orbs = document.querySelectorAll<HTMLElement>('.hero__orb')
    if (!orbs.length || reduced) return

    let mx = 0
    let my = 0
    let tx = 0
    let ty = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const parallax = () => {
      tx += (mx - tx) * 0.06
      ty += (my - ty) * 0.06
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 12
        orb.style.translate = `${tx * depth}px ${ty * depth}px`
      })
      raf = requestAnimationFrame(parallax)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(parallax)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="hero__bg" aria-hidden="true">
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      <div className="hero__grid" />
    </div>
  )
}
