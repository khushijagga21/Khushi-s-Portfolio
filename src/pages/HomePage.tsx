import { CONTACT } from '../data/site'
import { ArrowIcon, Button } from '../components/ui'
import { HeroOrbs } from '../components/HeroOrbs'

const marqueeItems = [
  'Website Development',
  'AI Creative Marketing',
  'AI Integration',
]

/** Home = hero intro only. About / Services / Projects / Contact follow below. */
export function HomePage() {
  return (
    <div id="home" className="page-block">
      <section className="hero">
        <HeroOrbs />
        <div className="hero__content">
          <h1 className="hero__brand" aria-label="Khushi">
            <span className="char">K</span>
            <span className="char">H</span>
            <span className="char">U</span>
            <em>
              <span className="char">S</span>
              <span className="char">H</span>
              <span className="char">I</span>
            </em>
          </h1>
          <p className="hero__role">Software developer · Content creator · Freelancer</p>
          <a
            className="hero__linkedin"
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Khushi on LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <div className="hero__accent-line" aria-hidden="true" />
          <div className="hero__row">
            <p className="hero__headline">I write code, make content, and take on freelance work.</p>
            <div className="hero__copy-wrap">
              <p className="hero__copy">
                I’m Khushi, from Gurugram. Software developer, LinkedIn content creator, and freelancer —
                Gen AI, websites, vibe coding. I’ve worked with 5+ clients so far.
              </p>
              <div className="hero__actions">
                <Button to="#projects" variant="primary">
                  <span>View Work</span>
                  <ArrowIcon />
                </Button>
                <Button to="#contact" variant="ghost">
                  <span>Start a Project</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div className="marquee__item" key={`${item}-${i}`}>
              <span className="marquee__dot" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
