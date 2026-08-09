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
    `My name is ${safeName}. I’m interested in ${safeService}.\n\n` +
    `I’d love to discuss the project, timeline, and how we can work together.\n\n` +
    `Looking forward to hearing from you.\n\n` +
    `Thanks!`
  const subject = `Project inquiry — ${safeService}`
  return { body, subject }
}

function buildWhatsAppMessage(name: string, service: string) {
  const safeName = name.trim()
  const safeService = service.trim()

  if (safeName && safeService) {
    return `Hi Khushi! I’m ${safeName}. Interested in ${safeService}.`
  }
  if (safeName) {
    return `Hi Khushi! I’m ${safeName}. I’d like to discuss a project.`
  }
  if (safeService) {
    return `Hi Khushi! I’m interested in ${safeService}.`
  }
  return `Hi Khushi! I’d like to discuss a project.`
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
            <h1>Let’s turn your idea into something real.</h1>
            <p>
              Tell me what you’re building, where you’re stuck, or what you want to launch next. I’ll reply with
              clear next steps — no jargon, no fluff.
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
                <span className="contact-link__label">Email</span>
                <span className="contact-link__value">{CONTACT.email}</span>
              </a>
              <a
                className="contact-link"
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault()
                  openWhatsApp()
                }}
              >
                <span className="contact-link__label">WhatsApp</span>
                <span className="contact-link__value">{CONTACT.whatsappDisplay}</span>
              </a>
              <a className="contact-link" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="contact-link__label">LinkedIn</span>
                <span className="contact-link__value">{CONTACT.linkedinDisplay}</span>
              </a>
              <div className="contact-link">
                <span className="contact-link__label">Location</span>
                <span className="contact-link__value">{CONTACT.location}</span>
              </div>
            </div>
          </div>

          <div className="contact-panel reveal reveal-d1">
            <p className="contact-panel__label">Start a conversation</p>
            <p className="contact-panel__hint">
              Choose Email or WhatsApp — a ready message will open so you can send it in one tap.
            </p>

            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="What should I call you?"
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
                <span>Contact on Email</span>
              </Button>
              <Button type="button" variant="whatsapp" className="contact-action" onClick={openWhatsApp}>
                <span>Contact on WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
