import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { CustomCursor } from './CustomCursor'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollProgress } from './ScrollProgress'
import { SoftTransition } from './SoftTransition'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Layout({ children }: { children: ReactNode }) {
  useScrollReveal([])

  useEffect(() => {
    const t = window.setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 200)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <SoftTransition />
      <CustomCursor />
      <ScrollProgress />
      <div className="site">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
