import { aiIntegrationPricing, servicesDetail, servicesIntro, websitePricing } from '../data/content'

export function ServicesPage() {
  return (
    <div id="services" className="page-block">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal">Services</p>
          <h1 className="reveal reveal-d1">What I take on.</h1>
          <p className="reveal reveal-d2">{servicesIntro}</p>
        </div>
      </section>

      <section>
        {servicesDetail.map((s, i) => (
          <article
            className={`service-detail__row reveal${i ? ` reveal-d${Math.min(i, 3)}` : ''}`}
            key={s.num}
          >
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

      <section className="section" id="pricing">
        <div className="container">
          <p className="eyebrow reveal">Website pricing</p>
          <h2 className="section__title reveal reveal-d1" style={{ marginBottom: '2rem' }}>
            What a website costs.
          </h2>
          <div className="pricing-grid">
            {websitePricing.map((pkg) => (
              <article className="pricing-card reveal" key={pkg.title}>
                <h3>{pkg.title}</h3>
                <p className="pricing-card__price">{pkg.price}</p>
                <p>{pkg.text}</p>
              </article>
            ))}
            <article className="pricing-card pricing-card--wide reveal">
              <h3>{aiIntegrationPricing.title}</h3>
              <p className="pricing-card__price">{aiIntegrationPricing.price}</p>
              <p>{aiIntegrationPricing.text}</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
