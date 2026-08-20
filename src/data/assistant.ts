import { CONTACT } from './site'

export type AssistantLink = {
  label: string
  href: string
  external?: boolean
}

export type AssistantReply = {
  text: string
  links?: AssistantLink[]
  suggestions?: string[]
}

export type ChatTurn = {
  from: 'bot' | 'user'
  text: string
}

type KnowledgeItem = {
  id: string
  keywords: string[]
  phrases: string[]
  answer: string
  links?: AssistantLink[]
  suggestions?: string[]
}

const contactLinks: AssistantLink[] = [
  { label: 'Contact', href: '#contact' },
  { label: 'Email', href: `mailto:${CONTACT.email}`, external: true },
  { label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp}`, external: true },
]

const serviceLinks: AssistantLink[] = [
  { label: 'Services', href: '#services' },
  ...contactLinks,
]

const START = `Email ${CONTACT.email} or WhatsApp ${CONTACT.whatsappDisplay} with your name, the work, and a deadline.`

const QUOTE =
  'I don’t list charges here. Share the brief on Email or WhatsApp and I’ll come back with a plan.'

export const MENU = ['Pricing', 'Services', 'Contact'] as const

export const WELCOME: AssistantReply = {
  text: `Hey — what's on your mind today?\n\nWhat service do you need? Pick one below, or type it.`,
  suggestions: [...MENU],
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9.+#\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function has(query: string, ...needles: string[]) {
  return needles.some((n) => query.includes(n))
}

function phraseHits(query: string, phrase: string) {
  if (query.includes(phrase)) return true
  const words = phrase.split(' ').filter((w) => w.length > 1)
  return words.length >= 2 && words.every((w) => query.includes(w))
}

const knowledge: KnowledgeItem[] = [
  {
    id: 'quote',
    keywords: [
      'price',
      'pricing',
      'cost',
      'budget',
      'rate',
      'rates',
      'fee',
      'charge',
      'charges',
      'quote',
      'how much',
      'rupee',
      'inr',
      'rs',
    ],
    phrases: [
      'pricing',
      'how much',
      'what does it cost',
      'your rates',
      'see all pricing',
      'website pricing',
      'price list',
      'charges',
    ],
    answer: `${QUOTE}\n\nTell me if it’s a new website, AI on a site you already have, or AI videos — that changes the brief.\n\n${START}`,
    links: contactLinks,
    suggestions: ['Services', 'Contact', 'New website'],
  },
  {
    id: 'services',
    keywords: ['service', 'services', 'offer', 'provide', 'product', 'products', 'package'],
    phrases: ['services', 'what do you offer', 'what services', 'what can you do', 'your services', 'what you provide'],
    answer: `Services I provide:\n\n1. Website development — new sites: pages, full-stack, database, animations, responsive layouts.\n2. AI creative marketing — reels, shorts, carousels, campaign clips.\n3. AI integration — chat, search, or automation inside a product you already have. That means reading your codebase first.\n\nWhich of these is the product?`,
    links: serviceLinks,
    suggestions: ['New website', 'AI on my existing site', 'AI videos / creatives', 'Pricing', 'Contact'],
  },
  {
    id: 'websites',
    keywords: ['website', 'websites', 'web', 'landing', 'pages', 'business site'],
    phrases: ['new website', 'build a website', 'make a website', 'website development', 'landing page'],
    answer: `For a new website I can do landing pages through full-stack builds: React / Next.js on the front, Node.js + Express when you need APIs or login, and MongoDB, Firebase, or MySQL for data.\n\nPages-only is simpler. Database, login, and animations is a bigger product.\n\nWhat does this site need — mostly pages, or users and data?`,
    links: serviceLinks,
    suggestions: ['Mostly pages', 'Users and data', 'How do I start?'],
  },
  {
    id: 'ai-integration',
    keywords: [
      'chatbot',
      'assistant',
      'automation',
      'integrate',
      'integration',
      'existing',
      'codebase',
    ],
    phrases: [
      'ai on my existing site',
      'existing website',
      'existing site',
      'add ai',
      'ai integration',
      'add a chatbot',
    ],
    answer: `If you already have a website and want AI in it — chat assistant, smart search, or automations — I work in your existing code. That’s a different job from a new site because I have to understand the repo first.\n\nWhat do you want added — chatbot, search, or automation?`,
    links: contactLinks,
    suggestions: ['Chatbot', 'Smart search', 'Automation', 'How do I start?'],
  },
  {
    id: 'videos',
    keywords: ['video', 'videos', 'reel', 'reels', 'shorts', 'carousel', 'creative', 'campaign', 'promo'],
    phrases: ['ai videos', 'ai videos / creatives', 'ai creative', 'marketing video'],
    answer: `AI creatives: reels, shorts, carousels, and campaign clips — generated with AI, then edited to match your brand.\n\nSend platform and how many pieces in the brief.\n\nWhat do you need — reels, a campaign film, or carousels?`,
    links: contactLinks,
    suggestions: ['Reels / shorts', 'Campaign film', 'Carousels', 'How do I start?'],
  },
  {
    id: 'stack',
    keywords: [
      'tech',
      'stack',
      'react',
      'next',
      'next.js',
      'node',
      'express',
      'mongodb',
      'firebase',
      'mysql',
      'git',
      'frontend',
      'backend',
      'fullstack',
      'api',
    ],
    phrases: ['what stack', 'which stack', 'what tech', 'do you use react', 'tools you use'],
    answer: `How I build:\n\n• Front-end: React, Next.js\n• Back-end: Node.js, Express\n• Data: MongoDB, Firebase, or MySQL\n• Git\n• Gen AI where it speeds the work\n\nWhich of those does your product need?`,
    links: serviceLinks,
    suggestions: ['New website', 'AI on my existing site', 'How do I start?'],
  },
  {
    id: 'payments',
    keywords: ['payment', 'payments', 'razorpay', 'stripe', 'checkout', 'upi', 'gateway', 'cart', 'ecommerce'],
    phrases: ['need payments', 'payment integration', 'accept payments', 'do you do payments'],
    answer: `Yes, payment integration can be part of a build — Razorpay, Stripe, checkout, UPI — but it’s scoped in the brief, not as a public rate card.\n\nIs this a new website or an existing one?`,
    links: contactLinks,
    suggestions: ['New website', 'Existing site', 'How do I start?'],
  },
  {
    id: 'login-auth',
    keywords: ['login', 'auth', 'authentication', 'signup', 'account', 'users', 'user', 'database', 'db'],
    phrases: ['user login', 'need login', 'need accounts', 'need a database'],
    answer: `Login, signup, and user data need a database and APIs — that’s a full product, not a static page site.\n\nIf accounts already exist and you want AI on top, that’s existing-site AI integration.\n\nDoes the product need accounts, or is it a public site?`,
    links: serviceLinks,
    suggestions: ['Needs accounts', 'Public site only', 'AI on existing site', 'How do I start?'],
  },
  {
    id: 'start',
    keywords: ['start', 'hire', 'contact', 'email', 'whatsapp', 'begin', 'brief'],
    phrases: ['contact', 'how do i start', 'how to start', 'get started', 'start a project', 'get in touch'],
    answer: `Send a short brief: your name, what you need, and a deadline if you have one. I reply myself — usually the same day.\n\n${START}\n\nWhich service should I expect?`,
    links: contactLinks,
    suggestions: ['Pricing', 'Services', 'New website'],
  },
  {
    id: 'process',
    keywords: ['process', 'flow', 'steps'],
    phrases: ['how do you work', 'what’s the process', 'how it works'],
    answer: `You send a brief → I confirm the scope → I build → you review.\n\nFor AI on an existing site I start by reading your code.\n\nReady to send a brief?`,
    links: contactLinks,
    suggestions: ['How do I start?', 'What stack?', 'What services?'],
  },
  {
    id: 'mix',
    keywords: ['both', 'combo', 'together'],
    phrases: ['website and videos', 'site and ai', 'all three'],
    answer: `You can combine a website, AI creatives, and AI inside a product. They’re scoped as one brief if you want one person on all of it.\n\nWhat are you combining?`,
    links: contactLinks,
    suggestions: ['Website + videos', 'Website + AI', 'How do I start?'],
  },
]

function scoreItem(query: string, item: KnowledgeItem) {
  let score = 0
  for (const phrase of item.phrases) {
    if (phraseHits(query, phrase)) score += 16
  }
  for (const keyword of item.keywords) {
    if (query.includes(keyword)) score += keyword.length > 6 ? 4 : 2
  }
  return score
}

function fromKnowledge(query: string): AssistantReply | null {
  const ranked = knowledge
    .map((item) => ({ item, score: scoreItem(query, item) }))
    .sort((a, b) => b.score - a.score)
  const best = ranked[0]
  if (!best || best.score < 3) return null
  return {
    text: best.item.answer,
    links: best.item.links,
    suggestions: best.item.suggestions,
  }
}

function fromConversation(query: string): AssistantReply | null {
  if (query === 'pricing') return fromKnowledge('pricing')
  if (query === 'services') return fromKnowledge('services')
  if (query === 'contact') return fromKnowledge('contact')

  if (has(query, 'new website', 'a new site', 'new site', 'build me a site', 'i need a website')) {
    return fromKnowledge('new website')
  }
  if (has(query, 'mostly pages', 'pages only', 'public site only')) {
    return {
      text: `That’s a simpler website — pages and layout, phone and desktop.\n\n${QUOTE}\n\n${START}`,
      links: contactLinks,
      suggestions: ['Users and data instead', 'How do I start?'],
    }
  }
  if (has(query, 'users and data', 'needs accounts', 'database + login')) {
    return {
      text: `That’s a fuller product: database, APIs, login if you need accounts, richer UI.\n\n${QUOTE}\n\n${START}`,
      links: contactLinks,
      suggestions: ['How do I start?', 'What stack?'],
    }
  }
  if (has(query, 'chatbot', 'smart search', 'automation')) {
    return {
      text: `That’s AI on a site you already have. I’ll need the repo to understand the codebase, then add that feature.\n\n${START}`,
      links: contactLinks,
      suggestions: ['How do I start?', 'What stack?'],
    }
  }
  if (has(query, 'reels', 'shorts', 'campaign film', 'carousels')) {
    return {
      text: `Send platform, length, and how many pieces in the brief.\n\n${START}`,
      links: contactLinks,
      suggestions: ['Also a website', 'How do I start?'],
    }
  }
  return null
}

export function replyTo(message: string, _history: ChatTurn[] = []): AssistantReply {
  const raw = message.trim()
  if (!raw) return WELCOME

  const query = normalize(raw)

  if (/^(hi|hii|hey|hello|yo|namaste)\b/.test(raw) && query.split(' ').length < 4) {
    return WELCOME
  }

  const conversational = fromConversation(query)
  if (conversational) return conversational

  const hit = fromKnowledge(query)
  if (hit) return hit

  return {
    text: `I can help with websites, AI creatives, and AI inside a product you already have — plus how I’d build it.\n\n${QUOTE}\n\nWhat do you need?`,
    links: contactLinks,
    suggestions: [...MENU],
  }
}
