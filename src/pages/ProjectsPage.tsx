import { aiVideoProjects, websiteProjects } from '../data/content'
import { CtaBand } from '../components/ui'
import { VideoProject } from '../components/VideoProject'

export function ProjectsPage() {
  return (
    <div id="projects" className="page-block">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Projects</p>
          <h1>Work that tells a story.</h1>
          <p>Browse by category — websites and AI creatives.</p>
          <div className="project-jump">
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
            <p>Fast, polished websites built to look premium and convert visitors into clients.</p>
          </div>
          <div className="projects-grid projects-grid--section">
            {websiteProjects.map((p) => {
              const media =
                'image' in p && p.image ? (
                  <div
                    className="project__media project__media--img"
                    style={{
                      backgroundImage: `url('${p.image}')`,
                      backgroundPosition: 'imagePosition' in p ? p.imagePosition : 'center',
                    }}
                  />
                ) : (
                  <div className={`project__media ${'mediaClass' in p ? p.mediaClass : ''}`} />
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

              const cls = `project${'feature' in p && p.feature ? ' project--feature' : ''} reveal-scale`

              return (
                <a
                  key={p.title}
                  className={cls}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
            <p>AI-crafted reels, ads, and campaign videos made to stop the scroll and grow your brand.</p>
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

      <p className="projects-coming-soon reveal">More projects coming soon</p>

      <CtaBand
        title="Want your project here next?"
        text="Tell me what you’re building. I’ll help map the right mix of website, design, and AI creatives."
        ctaLabel="Start a Project"
      />
    </div>
  )
}
