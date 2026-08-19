type Props = {
  title: string
  cat: string
  meta: string
  video: string
  feature?: boolean
}

export function VideoProject({ title, cat, meta, video, feature }: Props) {
  const openInNewTab = () => {
    window.open(video, '_blank', 'noopener,noreferrer')
  }

  return (
    <article
      className={`project${feature ? ' project--feature' : ''} project--video reveal-scale`}
      onClick={openInNewTab}
      role="link"
      tabIndex={0}
      aria-label={`Open ${title} in a new tab`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openInNewTab()
        }
      }}
    >
      <div className="project__media project__media--video" />
      <div className="project__overlay" />
      <div className="project__play" aria-hidden="true">
        <span>OPEN</span>
      </div>
      <div className="project__content">
        <p className="project__cat">{cat}</p>
        <h3 className="project__title">{title}</h3>
        <p className="project__meta">{meta}</p>
      </div>
    </article>
  )
}
