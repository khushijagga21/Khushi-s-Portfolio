import { useEffect } from 'react'

export function CustomCursor() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || reduced) return

    const cursor = document.createElement('div')
    cursor.className = 'cursor'
    document.body.appendChild(cursor)
    document.body.classList.add('has-cursor')

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let cx = x
    let cy = y
    let raf = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      cursor.classList.remove('is-hidden')
    }

    const onLeave = () => cursor.classList.add('is-hidden')

    const loop = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      cursor.style.left = `${cx}px`
      cursor.style.top = `${cy}px`
      raf = requestAnimationFrame(loop)
    }

    const hoverables = 'a, button, .project, .service-item, .nav-toggle, input, textarea, select, .contact-link'
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(hoverables)) cursor.classList.add('is-hover')
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(hoverables)) cursor.classList.remove('is-hover')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cursor.remove()
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return null
}
