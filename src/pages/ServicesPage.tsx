import { servicesDetail } from '../data/content'
import { ArrowIcon, Button } from '../components/ui'

export function ServicesPage() {
  return (
    <div id="services" className="page-block">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Services</p>
          <h1>Simple services. Serious results.</h1>
          <p>
            Whether you need a website that converts, AI marketing videos that stop the scroll, or AI features
            inside your product — here’s how I can help.
          </p>
        </div>
      </section>

      <section>
        {servicesDetail.map((s) => (
          <article className="service-detail__row reveal" key={s.num}>
            <div className="service-detail__index">{s.num}</div>
            <div className="service-detail__body">
              <h2 className="service-detail__title">{s.title}</h2>
              <p className="lead">{s.lead}</p>
              <div className="service-detail__list">
                {s.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '36rem' }}>
          <p className="eyebrow reveal">Better together</p>
          <h2 className="section__title reveal reveal-d1" style={{ marginBottom: '1rem' }}>
            Want the full stack?
          </h2>
          <p className="lead reveal reveal-d2" style={{ marginInline: 'auto' }}>
            Website + AI marketing + AI integration make a powerful mix. Tell me what you’re aiming for and
            I’ll suggest a package that fits your goals and budget.
          </p>
          <div className="reveal reveal-d3" style={{ marginTop: '2rem' }}>
            <Button to="#contact" variant="primary">
              <span>Request a Quote</span>
              <ArrowIcon />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
