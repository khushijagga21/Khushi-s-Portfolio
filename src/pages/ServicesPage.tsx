import { servicesDetail, servicesIntro } from '../data/content'

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
    </div>
  )
}
