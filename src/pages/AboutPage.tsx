import { ArrowIcon, Button } from '../components/ui'

export function AboutPage() {
  return (
    <div id="about" className="page-block">
      <section className="section section--tight">
        <div className="container about-hero">
          <div className="about-portrait reveal-scale">
            <img
              src="/assets/khushi-portrait.png"
              alt="Khushi Jagga"
              className="about-portrait__img"
            />
          </div>
          <div className="about-copy reveal reveal-d1">
            <p className="eyebrow">About</p>
            <h1>Curious builder. Hands-on learner. Always figuring out how ideas become real products.</h1>
            <p>
              I’m Khushi — a Graduate Engineer Trainee at Siemens, working in the power automation sector. I get
              to learn great tech every day while building a strong foundation across digital products,
              electronics, and real-world engineering systems.
            </p>
            <p>
              Alongside that, I work hands-on with AI tools — using them to create smarter workflows, sharper
              content, and digital experiences that feel useful, not complicated. I love connecting code,
              creativity, and technology in ways that actually help people.
            </p>
            <p>
              Outside work, I’m a content creator on LinkedIn, where I share what I’m learning around marketing,
              personal branding, and building in public. Design, development, and storytelling all interest me —
              and I’m here to keep growing through all of them.
            </p>
            <Button to="#contact" variant="primary" className="about-cta">
              <span>Work With Me</span>
              <ArrowIcon />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
