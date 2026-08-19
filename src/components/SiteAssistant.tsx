import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { replyTo, WELCOME, type AssistantLink } from '../data/assistant'
import { scrollToId } from '../utils/scroll'

type ChatMessage = {
  id: string
  from: 'bot' | 'user'
  text: string
  links?: AssistantLink[]
  suggestions?: string[]
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function SiteAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      from: 'bot',
      text: WELCOME.text,
      suggestions: WELCOME.suggestions,
    },
  ])

  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const titleId = useId()

  useEffect(() => {
    const node = listRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [messages, pending, open])

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 180)
    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const ask = (text: string) => {
    const q = text.trim()
    if (!q || pending) return

    setInput('')
    setPending(true)

    setMessages((prev) => {
      const userMsg: ChatMessage = { id: uid(), from: 'user', text: q }
      const next = [...prev, userMsg]
      const history = next.map((m) => ({ from: m.from, text: m.text }))

      window.setTimeout(() => {
        const reply = replyTo(q, history)
        setMessages((cur) => [
          ...cur,
          {
            id: uid(),
            from: 'bot',
            text: reply.text,
            links: reply.links,
            suggestions: reply.suggestions,
          },
        ])
        setPending(false)
      }, 280)

      return next
    })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    ask(input)
  }

  const onLink = (link: AssistantLink) => {
    if (link.external || link.href.startsWith('mailto:') || link.href.startsWith('http')) {
      window.open(link.href, '_blank', 'noopener,noreferrer')
      return
    }
    const id = link.href.replace(/^#/, '')
    if (id) scrollToId(id)
  }

  return (
    <div className={`assistant${open ? ' is-open' : ''}`}>
      {open ? (
        <section className="assistant__panel" role="dialog" aria-modal="false" aria-labelledby={titleId}>
          <header className="assistant__head">
            <div>
              <p className="assistant__kicker">Assistant</p>
              <h2 id={titleId}>Pricing, product, services</h2>
            </div>
            <button type="button" className="assistant__close" onClick={() => setOpen(false)} aria-label="Close chat">
              <span />
              <span />
            </button>
          </header>

          <div className="assistant__thread" ref={listRef}>
            {messages.map((msg, index) => {
              const lastBotIndex = messages.reduce((acc, m, i) => (m.from === 'bot' ? i : acc), -1)
              const showSuggestions =
                msg.from === 'bot' && Boolean(msg.suggestions?.length) && index === lastBotIndex && !pending

              return (
                <article key={msg.id} className={`assistant__msg assistant__msg--${msg.from}`}>
                  <p>{msg.text}</p>
                  {msg.links?.length ? (
                    <div className="assistant__links">
                      {msg.links.map((link) => (
                        <button key={`${msg.id}-${link.label}`} type="button" onClick={() => onLink(link)}>
                          {link.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {showSuggestions ? (
                    <div className="assistant__chips">
                      {msg.suggestions!.map((chip) => (
                        <button key={`${msg.id}-${chip}`} type="button" onClick={() => ask(chip)}>
                          {chip}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </article>
              )
            })}
            {pending ? (
              <p className="assistant__typing" aria-live="polite">
                Thinking
              </p>
            ) : null}
          </div>

          <form className="assistant__form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="assistant-input">
              Ask a question
            </label>
            <input
              id="assistant-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, product, or services…"
              autoComplete="off"
              maxLength={400}
            />
            <button type="submit" disabled={pending || !input.trim()} aria-label="Send">
              Send
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className="assistant__fab"
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M4 12a8 8 0 0 1 8-8h.5A7.5 7.5 0 0 1 20 11.5V12a8 8 0 0 1-8 8H8l-4 3v-5.2A8 8 0 0 1 4 12z" />
          </svg>
        )}
      </button>
    </div>
  )
}
