export function scrollToId(id: string, replaceHash = true) {
  const el = document.getElementById(id)
  if (!el) return

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })

  if (replaceHash) {
    const next = `#${id}`
    if (window.location.hash !== next) {
      history.replaceState(null, '', next)
    }
  }
}

export function scrollToHashOnLoad() {
  const id = window.location.hash.replace(/^#/, '')
  if (!id) return

  window.setTimeout(() => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, 80)
}
