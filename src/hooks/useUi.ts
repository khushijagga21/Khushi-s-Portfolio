import { useEffect, useState } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}

export function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      setScrolled(window.scrollY > 20)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrolled
}
