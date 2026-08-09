import { CONTACT, NAV_LINKS } from '../data/site'
import { scrollToId } from '../utils/scroll'
import { Logo } from './ui'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Logo asLink={false} />
            <p className="footer__tag">
              Building websites, AI marketing, and smart product integrations that people notice.
            </p>
          </div>
          <nav className="footer__nav" aria-label="Footer">
            {NAV_LINKS.filter((l) => l.id !== 'home').map((link) => (
              <a
                key={link.id}
                href={link.hash}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(link.id)
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer__bottom">
          <p>© {year} Khushi. All rights reserved.</p>
          <div className="socials">
            <a href={`mailto:${CONTACT.email}`}>Email</a>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
