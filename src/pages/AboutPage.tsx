import { CONTACT } from '../data/site'
import { ArrowIcon, Button } from '../components/ui'

export function AboutPage() {
  return (
    <div id="about" className="page-block">
      <section className="section section--tight">
        <div className="container about-hero">
          <div className="about-portrait reveal">
            <img
              src="/assets/khushi-portrait.png"
              alt="Khushi Jagga"
              className="about-portrait__img"
              width={680}
              height={850}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 960px) 72vw, 340px"
            />
          </div>
          <div className="about-copy reveal reveal-d1">
            <p className="eyebrow">About</p>
            <h1>Hi, I’m Khushi.</h1>
            <p>
              I live in Gurugram. I’m growing at Siemens as a GET in power automation systems — that’s the
              full-time job, and I’m still early in it.
            </p>
            <p>
              Alongside that I’m a software developer. I work with AI technologies — Gen AI, website
              development, and vibe coding. I’ve had hands-on with React, Next.js, Node.js, Express, MongoDB,
              Firebase, MySQL, version control, and many more technologies. I’ve worked with 5+ clients so
              far.
            </p>
            <p>
              I’m also a content creator on{' '}
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              . I post about the work, the stack, and what I’m actually building — that’s usually how people
              find me.
            </p>
            <Button to="#contact" variant="primary" className="about-cta">
              <span>Work with me</span>
              <ArrowIcon />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
