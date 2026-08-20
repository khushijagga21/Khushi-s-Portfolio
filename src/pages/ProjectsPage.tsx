import { aiVideoProjects, websiteProjects } from '../data/content'
import { CtaBand } from '../components/ui'
import { VideoProject } from '../components/VideoProject'

export function ProjectsPage() {
  return (
    <div id="projects" className="page-block">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal">Projects</p>
          <h1 className="reveal reveal-d1">Work that’s live.</h1>
          <p className="reveal reveal-d2">
            Websites and an AI campaign video. Click any card — it opens the real thing.
          </p>
          <div className="project-jump reveal reveal-d3">
            <a href="#websites">Website</a>
            <a href="#ai-videos">AI Videos</a>
          </div>
        </div>
      </section>

      <section className="project-section" id="websites">
        <div className="container--wide">
          <div className="project-section__head reveal">
            <div>
              <p className="eyebrow">01</p>
              <h2>Website</h2>
            </div>
          </div>
          <div className="projects-grid projects-grid--section">
            {websiteProjects.map((p) => {
              const media = p.image ? (
                <div className="project__media project__media--img">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={750}
                    sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 640px"
                    style={{ objectPosition: p.imagePosition ?? 'center' }}
                  />
                </div>
              ) : (
                <div className={`project__media ${p.mediaClass ?? ''}`} />
              )

              const content = (
                <>
                  {media}
                  <div className="project__overlay" />
                  <div className="project__content">
                    <p className="project__cat">{p.cat}</p>
                    <h3 className="project__title">{p.title}</h3>
                    <p className="project__meta">{p.meta}</p>
                  </div>
                </>
              )

              const cls = `project${p.feature ? ' project--feature' : ''} reveal-scale`

              return (
                <a
                  key={p.title}
                  className={cls}
                  href={p.href}
                  {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={p.external ? `${p.title} — opens live site` : p.title}
                >
                  {content}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="project-section" id="ai-videos">
        <div className="container--wide">
          <div className="project-section__head reveal">
            <div>
              <p className="eyebrow">02</p>
              <h2>AI Videos</h2>
            </div>
          </div>
          <div className="projects-grid projects-grid--section">
            {aiVideoProjects.map((p) => {
              if ('video' in p && p.video) {
                return (
                  <VideoProject
                    key={p.title}
                    title={p.title}
                    cat={p.cat}
                    meta={p.meta}
                    video={p.video}
                    feature={'feature' in p && Boolean(p.feature)}
                  />
                )
              }

              const image = 'image' in p ? p.image : undefined

              return (
                <article key={p.title} className="project reveal-scale">
                  <div
                    className="project__media project__media--img"
                    style={{
                      backgroundImage: image ? `url('${image}')` : undefined,
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="project__overlay" />
                  <div className="project__content">
                    <p className="project__cat">{p.cat}</p>
                    <h3 className="project__title">{p.title}</h3>
                    <p className="project__meta">{p.meta}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need something like this for your brand?"
        text="Send the name and the deadline. I’ll write back with a plan."
        ctaLabel="Start a project"
      />
    </div>
  )
}
