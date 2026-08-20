import { useState } from 'react'
import { CONTACT } from '../data/site'
import { Button } from '../components/ui'

const SERVICE_OPTIONS = [
  'Website Development',
  'AI Creative Marketing',
  'AI Integration',
  'Full Brand Package',
]

function buildEmailMessage(name: string, service: string) {
  const safeName = name.trim() || 'there'
  const safeService = service || 'a new project'
  const body =
    `Hi Khushi,\n\n` +
    `I’m ${safeName}. I’m looking for help with ${safeService}.\n\n` +
    `I can share more on the project and timeline.\n\n` +
    `Thanks`
  const subject = `Project inquiry — ${safeService}`
  return { body, subject }
}

function buildWhatsAppMessage(name: string, service: string) {
  const safeName = name.trim()
  const safeService = service.trim()

  if (safeName && safeService) {
    return `Hi Khushi, I’m ${safeName}. Interested in ${safeService}.`
  }
  if (safeName) {
    return `Hi Khushi, I’m ${safeName}. I’d like to talk about a project.`
  }
  if (safeService) {
    return `Hi Khushi, I’m interested in ${safeService}.`
  }
  return `Hi Khushi, I’d like to talk about a project.`
}

export function ContactPage() {
  const [name, setName] = useState('')
  const [service, setService] = useState('')

  const openEmail = () => {
    const { subject, body } = buildEmailMessage(name, service)
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const openWhatsApp = () => {
    const text = buildWhatsAppMessage(name, service)
    window.open(
      `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div id="contact" className="page-block">
      <section className="section section--tight">
        <div className="container contact-layout">
          <div className="contact-info reveal">
            <p className="eyebrow">Contact</p>
            <h1>Tell me what you need.</h1>
            <p>
              Your name, the work, and a deadline if you have one. I reply myself — usually the same day.
            </p>

            <div className="contact-links">
              <a
                className="contact-link"
                href={`mailto:${CONTACT.email}`}
                onClick={(e) => {
                  e.preventDefault()
                  openEmail()
                }}
              >
                <span className="contact-link__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M4 7l8 6 8-6" />
                  </svg>
                </span>
                <span className="contact-link__text">
                  <span className="contact-link__label">Email</span>
                  <span className="contact-link__value">{CONTACT.email}</span>
                </span>
              </a>
              <a className="contact-link" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="contact-link__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
                  </svg>
                </span>
                <span className="contact-link__text">
                  <span className="contact-link__label">LinkedIn</span>
                  <span className="contact-link__value">{CONTACT.linkedinDisplay}</span>
                </span>
              </a>
              <div className="contact-link">
                <span className="contact-link__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </span>
                <span className="contact-link__text">
                  <span className="contact-link__label">Location</span>
                  <span className="contact-link__value">{CONTACT.location}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="contact-panel reveal-scale reveal-d1">
            <p className="contact-panel__label">Start here</p>
            <p className="contact-panel__hint">
              Email or WhatsApp. A message opens with the basics filled in — you just send it.
            </p>

            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                enterKeyHint="next"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="service">What do you need?</label>
              <select
                id="service"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">Pick a service</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-actions">
              <Button type="button" variant="primary" className="contact-action" onClick={openEmail}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
                <span>Email</span>
              </Button>
              <Button type="button" variant="whatsapp" className="contact-action" onClick={openWhatsApp}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.4A11 11 0 1 0 20.5 3.5zM12 20.2a9.1 9.1 0 0 1-4.64-1.27l-.33-.2-3.15.83.84-3.07-.22-.34A9.12 9.12 0 1 1 12 20.2zm5.28-6.83c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.15-1.21-.45-2.3-1.42-.85-.76-1.42-1.7-1.59-1.98-.17-.29-.02-.44.13-.59.13-.13.29-.33.43-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.03 2.82 1.17 3.01c.15.19 2.03 3.1 4.92 4.35.69.3 1.22.47 1.64.61.69.22 1.32.19 1.82.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33z" />
                </svg>
                <span>WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
