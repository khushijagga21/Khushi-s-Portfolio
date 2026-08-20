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

const contactLinks: AssistantLink[] = [
  { label: 'Email', href: `mailto:${CONTACT.email}`, external: true },
  { label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp}`, external: true },
  { label: 'Contact page', href: '#contact' },
]

const START = `Email ${CONTACT.email} or WhatsApp ${CONTACT.whatsappDisplay} with your name, the work, and a deadline. I reply myself — usually the same day.`

export const SERVICE_CHIPS = [
  'Website Development',
  'AI Creative Marketing',
  'AI Integration',
] as const

const ALL_PRICING = 'See all pricing'
const START_PROJECT = 'Start a project'

const websiteFollowUp = [ALL_PRICING, 'AI Creative Marketing', 'AI Integration', START_PROJECT]
const creativeFollowUp = [ALL_PRICING, 'Website Development', 'AI Integration', START_PROJECT]
const integrationFollowUp = [ALL_PRICING, 'Website Development', 'AI Creative Marketing', START_PROJECT]
const pricingFollowUp = [
  '₹3,000 — simple site',
  '₹5,000 — complex site',
  '₹8,000 — unlimited changes',
  '₹15,000 — AI on existing site',
  'Website Development',
  'AI Creative Marketing',
  START_PROJECT,
]

const PRICING_LIST = `Here’s everything I charge:

Websites
• Simple website — ₹3,000 per website, regardless of pages. You can request 5–6 changes.
• Complex website — ₹5,000 per website. Includes a database and a more complex UI with animations and transitions. Payments are not included.
• Unlimited changes — ₹8,000 per website. Payment integration is not included.

AI integration on an existing website
• ₹15,000. It’s a different job — it takes time to understand the codebase.

AI creative marketing (reels, shorts, carousels)
• Quoted from your brief: platform, length, and how many pieces.`

export const WELCOME: AssistantReply = {
  text: `Hey — what's on your mind today?\n\nWhat service do you need? Click one below, or type it.\n\n• Website Development\n• AI Creative Marketing\n• AI Integration`,
  suggestions: [...SERVICE_CHIPS, ALL_PRICING],
}

const replies = {
  welcome: WELCOME,

  website: {
    text: `Website development — I build the site from scratch: landing pages, business sites, and full-stack products.

What's included
• Front-end, back-end, and database when the product needs data
• Layouts that work on a phone and a laptop
• Animations and transitions
• Login and APIs if you have users

Pricing (per website)
• Simple — ₹3,000. Any number of pages. 5–6 rounds of changes. No database, no login, no payments.
• Complex — ₹5,000. Database, richer UI, animations and transitions. Login sits here if you need accounts.
• Unlimited changes — ₹8,000. Payment integration is not included.

Want the full price list, another service, or shall we start a brief?`,
    links: contactLinks,
    suggestions: websiteFollowUp,
  },

  creative: {
    text: `AI creative marketing — reels, shorts, carousels, and campaign clips.

What's included
• Script and visuals generated with AI, then edited so it still sounds like your brand
• Reels and shorts for Instagram, YouTube, or LinkedIn
• Carousels and promo / campaign clips

Pricing
This one is quoted from your brief — platform, length, and how many pieces. A 15-second reel and a full campaign film are different jobs, so there isn’t one public rate.

Website and AI-integration prices are fixed. Want those, or send a brief for videos?`,
    links: contactLinks,
    suggestions: creativeFollowUp,
  },

  integration: {
    text: `AI integration — if you already have a website or product, I add AI inside it.

What's included
• Chat assistants
• Smart search
• Small automations
• Custom AI features
• I work in your existing code. I have to understand the repo first — that’s why this is a separate job from a new website.

Pricing
₹15,000 if you already have a website and need AI added.

Need a new website instead, the full price list, or shall we start?`,
    links: contactLinks,
    suggestions: integrationFollowUp,
  },

  pricing: {
    text: `${PRICING_LIST}\n\nWhich of these are you looking at?`,
    links: contactLinks,
    suggestions: pricingFollowUp,
  },

  simple: {
    text: `Simple website — ₹3,000 per website.

What's included
• A new site with pages and layout
• Works on phone and desktop
• Same price regardless of how many pages
• 5–6 rounds of changes after you see it

Not included: database, login, payments, or unlimited revisions.

If you later need a database, animations, or login, that becomes the ₹5,000 package.

Want the other website prices, or start a brief?`,
    links: contactLinks,
    suggestions: ['₹5,000 — complex site', '₹8,000 — unlimited changes', ALL_PRICING, START_PROJECT],
  },

  complex: {
    text: `Complex website — ₹5,000 per website.

What's included
• Database (MongoDB, Firebase, or MySQL)
• A more complex UI
• Animations and transitions
• APIs and login if the product needs accounts

Not included: payment integration.

If you want unlimited changes after launch, that’s ₹8,000 instead — still without payments.

Want the full list, or start a brief?`,
    links: contactLinks,
    suggestions: ['₹3,000 — simple site', '₹8,000 — unlimited changes', ALL_PRICING, START_PROJECT],
  },

  unlimited: {
    text: `Website with unlimited changes — ₹8,000 per website.

What's included
• The website build
• Unlimited changes after you see it

Not included: payment integration (Razorpay, Stripe, checkout, UPI). Payments are scoped separately in the brief.

If you don’t need unlimited revisions, ₹5,000 covers database + animations, or ₹3,000 covers a pages-only site.

Want another package, or start a brief?`,
    links: contactLinks,
    suggestions: ['₹3,000 — simple site', '₹5,000 — complex site', ALL_PRICING, START_PROJECT],
  },

  aiPrice: {
    text: `AI integration on an existing website — ₹15,000.

What's included
• Chat, search, or automations inside a product you already have
• Work in your existing codebase

Why this price: it’s a different job from a new site. I have to read and understand your repo before I add anything.

If you need a new website instead, that’s ₹3,000 / ₹5,000 / ₹8,000 depending on the build.

Want all pricing, or start a brief?`,
    links: contactLinks,
    suggestions: ['Website Development', ALL_PRICING, START_PROJECT],
  },

  start: {
    text: `Send a short brief: your name, what you need, and a deadline if you have one.\n\n${START}\n\nWhich service should I expect?`,
    links: contactLinks,
    suggestions: [...SERVICE_CHIPS, ALL_PRICING],
  },

  payments: {
    text: `Payment integration (Razorpay, Stripe, checkout, UPI) can be part of a build, but it is not included in the ₹8,000 unlimited-changes package — or in ₹3,000 / ₹5,000.\n\nTell me in the brief if you need payments and I’ll scope it.\n\nIs this a new website or an existing one?`,
    links: contactLinks,
    suggestions: ['Website Development', 'AI Integration', ALL_PRICING, START_PROJECT],
  },

  stack: {
    text: `How I build:\n\n• Front-end: React, Next.js\n• Back-end: Node.js, Express\n• Data: MongoDB, Firebase, or MySQL\n• Git\n• Gen AI where it speeds the work\n\nWhich service is this for?`,
    links: contactLinks,
    suggestions: [...SERVICE_CHIPS, ALL_PRICING, START_PROJECT],
  },

  fallback: {
    text: `I can walk you through the services I provide, what’s included, and the pricing.\n\nClick one below, or type it.`,
    suggestions: [...SERVICE_CHIPS, ALL_PRICING, START_PROJECT],
  },
} satisfies Record<string, AssistantReply>

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/₹/g, '')
    .replace(/,/g, '')
    .replace(/[^a-z0-9.+#\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function has(query: string, ...needles: string[]) {
  return needles.some((n) => query.includes(n))
}

function intentOf(query: string): keyof typeof replies {
  if (
    has(
      query,
      'see all pricing',
      'all pricing',
      'full price',
      'price list',
      'pricing details',
      'different pricing',
      'your rates',
      'how much',
      'what does it cost'
    ) ||
    query === 'pricing' ||
    query === 'prices' ||
    query === 'cost' ||
    query === 'charges'
  ) {
    return 'pricing'
  }

  if (
    has(query, '3000', '3 000', 'simple website', 'simple site', 'pages only', 'mostly pages')
  ) {
    return 'simple'
  }

  if (
    has(query, '5000', '5 000', 'complex website', 'complex site', 'users and data', 'need a database')
  ) {
    return 'complex'
  }

  if (has(query, '8000', '8 000', 'unlimited changes', 'unlimited revisions')) {
    return 'unlimited'
  }

  if (
    has(
      query,
      '15000',
      '15 000',
      '15k',
      'ai on existing site',
      'ai on an existing',
      'existing website'
    )
  ) {
    return 'aiPrice'
  }

  if (
    has(
      query,
      'ai creative',
      'creative marketing',
      'ai videos',
      'ai video',
      'reels',
      'shorts',
      'carousel',
      'carousels',
      'campaign film',
      'promo'
    )
  ) {
    return 'creative'
  }

  if (
    has(
      query,
      'ai integration',
      'existing site',
      'existing product',
      'add ai',
      'chatbot',
      'smart search',
      'automation'
    )
  ) {
    return 'integration'
  }

  if (
    has(
      query,
      'website development',
      'new website',
      'new site',
      'build a website',
      'make a website',
      'landing page',
      'business site'
    ) ||
    query === 'website' ||
    query === 'websites' ||
    query === 'web'
  ) {
    return 'website'
  }

  if (has(query, 'payment', 'razorpay', 'stripe', 'checkout', 'upi', 'gateway')) {
    return 'payments'
  }

  if (has(query, 'tech stack', 'what stack', 'react', 'next.js', 'node', 'mongodb', 'firebase', 'mysql')) {
    return 'stack'
  }

  if (
    has(
      query,
      'start a project',
      'how do i start',
      'get started',
      'get in touch',
      'contact',
      'hire',
      'email',
      'whatsapp'
    )
  ) {
    return 'start'
  }

  if (has(query, 'other services', 'what services', 'your services', 'what do you offer', 'what can you do')) {
    return 'welcome'
  }

  return 'fallback'
}

export function replyTo(message: string, _history: ChatTurn[] = []): AssistantReply {
  const raw = message.trim()
  if (!raw) return WELCOME

  const query = normalize(raw)

  if (/^(hi|hii|hey|hello|yo|namaste)\b/.test(query) && query.split(' ').length < 4) {
    return WELCOME
  }

  return replies[intentOf(query)]
}
