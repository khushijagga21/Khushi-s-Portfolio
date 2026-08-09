import type { ReactNode } from 'react'
import { scrollToId } from '../utils/scroll'

type ArrowProps = { className?: string }

export function ArrowIcon({ className }: ArrowProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

export function DiagonalArrow({ className }: ArrowProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  )
}

type BtnProps = {
  to?: string
  href?: string
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'whatsapp'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  target?: string
  rel?: string
  id?: string
}

export function Button({
  to,
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  target,
  rel,
  id,
}: BtnProps) {
  const cls = `btn btn--${variant} ${className}`.trim()

  if (to?.startsWith('#')) {
    return (
      <a
        href={to}
        className={cls}
        id={id}
        onClick={(e) => {
          e.preventDefault()
          scrollToId(to.slice(1))
          onClick?.()
        }}
      >
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <a href={href} className={cls} target={target} rel={rel} id={id} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick} id={id}>
      {children}
    </button>
  )
}

type CtaBandProps = {
  title: string
  text: string
  ctaLabel: string
  to?: string
}

export function CtaBand({ title, text, ctaLabel, to = '#contact' }: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <h2 className="reveal">{title}</h2>
        <div className="reveal reveal-d1">
          <p>{text}</p>
          <Button to={to} variant="primary">
            <span>{ctaLabel}</span>
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}

export function Logo({
  asLink = true,
  onClick,
}: {
  asLink?: boolean
  onClick?: () => void
}) {
  const inner = (
    <>
      <span className="logo__mark" aria-hidden="true">
        K
      </span>
      <span className="logo__text">
        KHU<span>SHI</span>
      </span>
    </>
  )

  if (asLink) {
    return (
      <a
        href="#home"
        className="logo"
        onClick={(e) => {
          e.preventDefault()
          if (onClick) onClick()
          else scrollToId('home')
        }}
      >
        {inner}
      </a>
    )
  }

  return <div className="footer__brand">{inner}</div>
}
