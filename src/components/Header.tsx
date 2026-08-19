import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { NAV_LINKS, type PageId } from '../data/site'
import { useHeaderScroll } from '../hooks/useUi'
import { scrollToId } from '../utils/scroll'
import { Logo } from './ui'

const DESKTOP_MQ = '(min-width: 1025px)'

export function Header() {
  const scrolled = useHeaderScroll()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<PageId>('home')
  const linksWrapRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  const moveIndicator = useCallback((target: HTMLElement | null) => {
    const indicator = indicatorRef.current
    const wrap = linksWrapRef.current
    if (!indicator || !wrap || !target) {
      indicator?.classList.remove('is-ready')
      return
    }
    const wrapRect = wrap.getBoundingClientRect()
    const linkRect = target.getBoundingClientRect()
    indicator.style.width = `${linkRect.width}px`
    indicator.style.left = `${linkRect.left - wrapRect.left}px`
    indicator.classList.add('is-ready')
  }, [])

  const syncIndicator = useCallback(() => {
    if (!window.matchMedia(DESKTOP_MQ).matches) {
      indicatorRef.current?.classList.remove('is-ready')
      return
    }
    const activeLink = linksWrapRef.current?.querySelector<HTMLElement>(
      `.nav__link[data-nav="${active}"]`
    )
    moveIndicator(activeLink ?? null)
  }, [active, moveIndicator])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const marker = window.scrollY + Math.min(180, window.innerHeight * 0.28)
        let current: PageId = 'home'

        for (const link of NAV_LINKS) {
          const el = document.getElementById(link.id)
          if (!el) continue
          const top = el.getBoundingClientRect().top + window.scrollY
          if (top <= marker) current = link.id
        }

        setActive((prev) => (prev === current ? prev : current))
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(syncIndicator)
    window.addEventListener('resize', syncIndicator)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', syncIndicator)
    }
  }, [syncIndicator, open])

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ)
    const onChange = () => {
      if (mq.matches) {
        setOpen(false)
        document.body.style.overflow = ''
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      document.body.style.overflow = ''
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const goTo = (id: PageId) => {
    setOpen(false)
    document.body.style.overflow = ''
    setActive(id)
    scrollToId(id)
  }

  const toggleMenu = () => {
    setOpen((prev) => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  }

  const onLinkEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia(DESKTOP_MQ).matches) return
    moveIndicator(e.currentTarget)
  }

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header__inner">
        <Logo onClick={() => goTo('home')} />
        <button
          className={`nav-toggle${open ? ' is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={toggleMenu}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="primary-nav"
          className={`nav${open ? ' is-open' : ''}`}
          aria-label="Primary"
          onClick={(e) => {
            if (e.target === e.currentTarget && open) toggleMenu()
          }}
        >
          <div className="nav__links" ref={linksWrapRef} onMouseLeave={syncIndicator}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.hash}
                className={`nav__link${active === link.id ? ' is-active' : ''}`}
                data-nav={link.id}
                onMouseEnter={onLinkEnter}
                onClick={(e) => {
                  e.preventDefault()
                  goTo(link.id)
                }}
              >
                {link.label}
              </a>
            ))}
            <span className="nav__indicator" aria-hidden="true" ref={indicatorRef} />
          </div>
          <a
            href="#contact"
            className={`nav__cta${active === 'contact' ? ' is-active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              goTo('contact')
            }}
          >
            Let's Talk
          </a>
        </nav>
      </div>
      {active !== 'contact' && !open ? (
        <a
          href="#contact"
          className="mobile-cta"
          onClick={(e) => {
            e.preventDefault()
            goTo('contact')
          }}
        >
          Let's Talk
        </a>
      ) : null}
    </header>
  )
}
