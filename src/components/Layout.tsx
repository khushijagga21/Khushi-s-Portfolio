import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollProgress } from './ScrollProgress'
import { SiteAssistant } from './SiteAssistant'
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
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <SoftTransition />
      <ScrollProgress />
      <div className="site">
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </div>
      <SiteAssistant />
    </>
  )
}
