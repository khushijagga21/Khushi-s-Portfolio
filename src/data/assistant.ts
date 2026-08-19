import { CONTACT } from './site'
import { aiIntegrationPricing, websitePricing } from './content'

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

const PRICING_TEXT = [
  ...websitePricing.map((pkg) => `• ${pkg.title} — ${pkg.text}`),
  `• ${aiIntegrationPricing.title} — ${aiIntegrationPricing.text}`,
].join('\n')

const contactLinks: AssistantLink[] = [
  { label: 'Contact', href: '#contact' },
  { label: 'Email', href: `mailto:${CONTACT.email}`, external: true },
  { label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsapp}`, external: true },
]

const pricingLinks: AssistantLink[] = [
  { label: 'Website pricing', href: '#pricing' },
  ...contactLinks,
]

const START = `Email ${CONTACT.email} or WhatsApp ${CONTACT.whatsappDisplay} with your name, the work, and a deadline.`

export const WELCOME: AssistantReply = {
  text: `I help with pricing, the product, and the services I provide.\n\nWhat do you need?`,
  suggestions: [
    'New website',
    'AI on my existing site',
    'AI videos / creatives',
    'See all pricing',
  ],
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
    id: 'all-pricing',
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
      'package',
      'packages',
      '3000',
      '5000',
      '8000',
      '15000',
      '15k',
      'inr',
      'rs',
      'rupee',
    ],
    phrases: [
      'how much',
      'what does it cost',
      'your rates',
      'see all pricing',
      'all pricing',
      'website pricing',
      'price list',
    ],
    answer: `Full pricing for what I provide:\n\n${PRICING_TEXT}\n\nAI videos / creatives are quoted from your brief (platform, length, brand).\n\nWhich of these are you looking at?`,
    links: pricingLinks,
    suggestions: ['₹3,000 simple site', '₹5,000 complex site', '₹8,000 unlimited changes', '₹15,000 AI on existing site'],
  },
  {
    id: 'simple-3k',
    keywords: ['3000', '3,000', 'simple', 'basic', 'landing', 'brochure', 'static'],
    phrases: ['simple website', '3000', '₹3,000 simple site', 'pages only'],
    answer: `₹3,000 per website — same price no matter how many pages.\n\nWhat’s in it: a new site with pages and layout that work on phone and desktop. No database, no login system, no payment gateway.\n\nChanges: 5–6 rounds after you see it.\n\nIf you later need a database, animations, or login, that becomes the ₹5,000 package.\n\nDo you need a database or login, or are pages enough?`,
    links: pricingLinks,
    suggestions: ['Pages are enough', 'I need a database', 'Unlimited changes instead', 'How do I start?'],
  },
  {
    id: 'complex-5k',
    keywords: ['5000', '5,000', 'complex', 'database', 'db', 'animation', 'animations', 'transition', 'transitions'],
    phrases: ['complex website', '5000', '₹5,000 complex site', 'need a database', 'i need a database'],
    answer: `₹5,000 per website.\n\nWhat’s in it: database (MongoDB, Firebase, or MySQL), a more complex UI, animations and transitions. APIs and login/auth usually sit in this tier if the product needs accounts.\n\nPayments are not included.\n\nIf you want unlimited changes after launch, that’s ₹8,000 instead — still without payments.\n\nDo you need unlimited revisions, or is ₹5,000 with a normal change round enough?`,
    links: pricingLinks,
    suggestions: ['₹5,000 is enough', 'I want unlimited changes', 'I need payments', 'How do I start?'],
  },
  {
    id: 'unlimited-8k',
    keywords: ['8000', '8,000', 'unlimited', 'revisions', 'changes'],
    phrases: ['unlimited changes', '8000', '₹8,000 unlimited changes', 'unlimited revisions'],
    answer: `₹8,000 per website, with unlimited changes.\n\nPayment integration is not included — not Razorpay, Stripe, checkout, or UPI.\n\nUse this when the site will keep evolving after launch. If you also need payments, say that in the brief; it’s scoped extra.\n\nIs this for a new site, or do you already have one?`,
    links: pricingLinks,
    suggestions: ['New website', 'I already have a site', 'I need payments', 'How do I start?'],
  },
  {
    id: 'ai-15k',
    keywords: ['15000', '15k', '15,000', 'existing', 'codebase', 'chatbot', 'integrate', 'integration'],
    phrases: [
      'ai on my existing site',
      'existing website',
      'existing site',
      'add ai',
      'ai integration',
      'add a chatbot',
      '₹15,000 ai on existing site',
    ],
    answer: `${aiIntegrationPricing.text}\n\nProduct: I add AI into the site you already have — chat assistant, smart search, or small automations, plus login/user flow if the product needs it.\n\nWhy ₹15,000: I have to read your repo, understand routing, APIs, and data, then ship without breaking what’s live. That’s not the ₹3,000 / ₹5,000 / ₹8,000 new-site packages.\n\nWhat do you want added — chatbot, search, or automation?`,
    links: contactLinks,
    suggestions: ['Chatbot', 'Smart search', 'Automation', 'How do I start?'],
  },
  {
    id: 'services',
    keywords: ['service', 'services', 'offer', 'provide', 'product', 'products'],
    phrases: ['what do you offer', 'what services', 'what can you do', 'your services', 'what you provide'],
    answer: `Services I provide:\n\n1. Website development — new sites. ₹3,000 / ₹5,000 / ₹8,000 depending on pages-only vs database + animations vs unlimited changes. Payments not in these.\n2. AI creative marketing — reels, shorts, carousels, campaign clips. Quoted from your brief.\n3. AI integration — AI inside a product or website you already have. ₹15,000.\n\nWhich service is this for?`,
    links: pricingLinks,
    suggestions: ['New website', 'AI on my existing site', 'AI videos / creatives', 'See all pricing'],
  },
  {
    id: 'videos',
    keywords: ['video', 'videos', 'reel', 'reels', 'shorts', 'carousel', 'creative', 'campaign', 'promo'],
    phrases: ['ai videos', 'ai videos / creatives', 'ai creative', 'marketing video', 'ai videos / creatives'],
    answer: `AI creatives: reels, shorts, carousels, and campaign clips. I generate with AI, then edit so it matches your brand.\n\nThis is not a website package. Price depends on length, platform, and how many assets.\n\nWhat do you need — reels, a campaign film, or carousels?`,
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
    answer: `How I build the product:\n\n• Front-end: React, Next.js\n• Back-end: Node.js, Express\n• Data: MongoDB, Firebase, or MySQL\n• Git\n• Gen AI where it speeds the work\n\nPages-only → ₹3,000. Database / APIs / login / heavier UI + motion → ₹5,000. Unlimited changes → ₹8,000 (still no payments).\n\nWhich of those does your product need?`,
    links: pricingLinks,
    suggestions: ['Pages only', 'Database + login', 'AI on existing site', 'How do I start?'],
  },
  {
    id: 'payments',
    keywords: ['payment', 'payments', 'razorpay', 'stripe', 'checkout', 'upi', 'gateway', 'cart', 'ecommerce'],
    phrases: ['need payments', 'i need payments', 'payment integration', 'accept payments', 'do you do payments'],
    answer: `Payments are not included in ₹3,000, ₹5,000, or ₹8,000.\n\nIf the product needs Razorpay, Stripe, UPI, or checkout, say that in the brief — it’s a separate scope from the website tiers and from ₹15,000 AI-on-existing-site.\n\nBesides payments, is this a new website or an existing one?`,
    links: contactLinks,
    suggestions: ['New website', 'Existing site', 'See all pricing', 'How do I start?'],
  },
  {
    id: 'compare',
    keywords: ['difference', 'vs', 'versus', 'compare', 'which package', 'or'],
    phrases: ['3000 vs 5000', '3k vs 5k', '5000 vs 8000', 'which package', 'what’s the difference'],
    answer: `₹3,000 vs ₹5,000 vs ₹8,000 vs ₹15,000:\n\n• ₹3,000 — new site, any number of pages, no database. 5–6 changes.\n• ₹5,000 — new site + database + complex UI + animations/transitions. Login/APIs if needed. Payments no.\n• ₹8,000 — new site with unlimited changes. Payments still no.\n• ₹15,000 — not a new site. I work in your existing codebase and add AI.\n\nWhich sounds closest to your product?`,
    links: pricingLinks,
    suggestions: ['₹3,000 simple site', '₹5,000 complex site', '₹8,000 unlimited changes', '₹15,000 AI on existing site'],
  },
  {
    id: 'included',
    keywords: ['include', 'included', 'includes', 'get', 'features', 'scope'],
    phrases: ['what is included', 'what do i get', 'what’s included'],
    answer: `Included by package:\n\n₹3,000 — pages, responsive layout, 5–6 change rounds. Not included: database, login, payments, AI in an old codebase.\n₹5,000 — database, richer UI, animations/transitions, APIs/login if needed. Not included: payments, unlimited changes, AI-on-existing.\n₹8,000 — unlimited changes on the site. Not included: payment integration.\n₹15,000 — AI (chat, search, automation) inside a site you already have, after I understand that codebase.\n\nWant me to map your product to one of these?`,
    links: pricingLinks,
    suggestions: ['Map my product', 'See all pricing', 'How do I start?'],
  },
  {
    id: 'pages',
    keywords: ['pages', 'page', 'how many'],
    phrases: ['how many pages', 'regardless of pages', 'number of pages'],
    answer: `Page count does not change the ₹3,000 price — it’s per website, not per page.\n\nMore pages with a database, login, or heavy motion still push you to ₹5,000, not extra per page on ₹3,000.\n\nIs your site mostly content pages, or a product with users and data?`,
    links: pricingLinks,
    suggestions: ['Mostly pages', 'Users and data', 'See all pricing'],
  },
  {
    id: 'revisions',
    keywords: ['revision', 'revisions', 'change', 'changes', 'edits', 'fix'],
    phrases: ['how many changes', 'how many revisions', '5-6', '5–6'],
    answer: `₹3,000 includes 5–6 rounds of changes.\n₹8,000 includes unlimited changes.\n₹5,000 is the complex build; if you know you’ll keep changing it after launch, take ₹8,000.\n₹15,000 is AI in an existing repo — changes to that AI work are part of getting it live, not the website revision packs.\n\nDo you expect a few edits, or ongoing changes?`,
    links: pricingLinks,
    suggestions: ['A few edits (₹3,000)', 'Unlimited (₹8,000)', 'How do I start?'],
  },
  {
    id: 'login-auth',
    keywords: ['login', 'auth', 'authentication', 'signup', 'account', 'users', 'user'],
    phrases: ['user login', 'need login', 'need accounts'],
    answer: `Login / signup / user accounts need a database and APIs — that’s the ₹5,000 complex website, not ₹3,000.\n\nIf those accounts already exist on a live site and you want AI on top, that’s ₹15,000.\n\nDoes the product need accounts, or is it a public site?`,
    links: pricingLinks,
    suggestions: ['Needs accounts', 'Public site only', 'AI on existing site', 'How do I start?'],
  },
  {
    id: 'timeline',
    keywords: ['time', 'timeline', 'long', 'deadline', 'days', 'weeks', 'when'],
    phrases: ['how long', 'how soon', 'delivery time'],
    answer: `Timeline depends on the package (pages vs database vs existing-code AI). I don’t put a fake number here.\n\nSend the deadline with the brief — I reply myself, usually the same day, with a plan.\n\n${START}\n\nWhich service is the deadline for?`,
    links: contactLinks,
    suggestions: ['New website', 'AI on my existing site', 'AI videos / creatives'],
  },
  {
    id: 'start',
    keywords: ['start', 'hire', 'contact', 'email', 'whatsapp', 'begin', 'brief'],
    phrases: ['how do i start', 'how to start', 'get started', 'start a project', 'get in touch'],
    answer: `To start: name, what you need, deadline if you have one. I reply myself — usually the same day.\n\n${START}\n\nIn that message, say: new website (₹3k / ₹5k / ₹8k), AI on an existing site (₹15k), or AI creatives.\n\nWhich one should I expect?`,
    links: contactLinks,
    suggestions: ['New website', 'AI on my existing site', 'AI videos / creatives', 'See all pricing'],
  },
  {
    id: 'process',
    keywords: ['process', 'work', 'flow', 'steps', 'how you work'],
    phrases: ['how do you work', 'what’s the process', 'how it works'],
    answer: `Process: you send a brief → I confirm the package (₹3k / ₹5k / ₹8k / ₹15k or a video quote) → I build → you review.\n\n₹3,000: up to 5–6 change rounds.\n₹8,000: unlimited changes.\n₹15,000: I start by reading your existing code, then add the AI.\n\nReady to send a brief, or still choosing a package?`,
    links: contactLinks,
    suggestions: ['See all pricing', 'How do I start?', 'What stack?'],
  },
  {
    id: 'hosting',
    keywords: ['hosting', 'domain', 'deploy', 'vercel', 'server'],
    phrases: ['do you host', 'include hosting', 'buy a domain'],
    answer: `Hosting and domain are not listed as part of ₹3,000 / ₹5,000 / ₹8,000. I can deploy the site (I ship on stacks like Next.js that go live easily). Domain purchase is usually in your name.\n\nConfirm that on the brief so it’s scoped.\n\nIs the main ask a new site or AI on an existing one?`,
    links: contactLinks,
    suggestions: ['New website', 'AI on my existing site', 'How do I start?'],
  },
  {
    id: 'source',
    keywords: ['source', 'code', 'github', 'repo', 'ownership'],
    phrases: ['do i get the code', 'source code', 'github repo'],
    answer: `You get the codebase for work I build for you. For ₹15,000 I work inside your existing repo.\n\nShare GitHub access (or a zip) when we start AI-on-existing.\n\nIs this a new build or your current site?`,
    links: contactLinks,
    suggestions: ['New website', 'AI on my existing site', 'How do I start?'],
  },
  {
    id: 'mix',
    keywords: ['both', 'combo', 'together', 'and videos', 'package deal'],
    phrases: ['website and videos', 'site and ai', 'all three'],
    answer: `You can combine services. They’re priced separately:\n\n• New website ₹3,000 / ₹5,000 / ₹8,000\n• AI on an existing site ₹15,000 (if the site already exists)\n• AI creatives quoted from the brief\n\nA brand-new site with AI built in from day one is a website package plus the AI scope — tell me in the brief so I don’t treat it as ₹15,000-on-old-code unless it is.\n\nWhat are you combining?`,
    links: contactLinks,
    suggestions: ['Website + videos', 'Website + AI', 'See all pricing', 'How do I start?'],
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

/** Short answers to the questions the bot asked (chips + yes/no). */
function fromConversation(query: string, history: ChatTurn[]): AssistantReply | null {
  const lastBot = [...history].reverse().find((t) => t.from === 'bot')?.text.toLowerCase() ?? ''

  if (has(query, 'new website', 'a new site', 'new site', 'build me a site', 'i need a website')) {
    return {
      text: `New website — pick by what the product needs:\n\n• Mostly pages, no database → ₹3,000 (any page count, 5–6 changes).\n• Database, login, complex UI, animations → ₹5,000.\n• That plus unlimited changes after launch → ₹8,000. Payments not included.\n\nWhat does this product need?`,
      links: pricingLinks,
      suggestions: ['Pages only', 'Database + login + animations', 'Unlimited changes', 'I need payments'],
    }
  }

  if (has(query, 'pages only', 'mostly pages', 'pages are enough', 'public site only', 'brochure')) {
    return fromKnowledge('simple website')
  }

  if (has(query, 'database + login', 'database + login + animations', 'users and data', 'needs accounts', 'i need a database')) {
    return fromKnowledge('complex website')
  }

  if (has(query, 'a few edits', '5-6', '₹5,000 is enough')) {
    return {
      text: `Then stay on ₹3,000 if it’s pages-only, or ₹5,000 if there’s a database / login / motion.\n\n${START}\n\nWhich of those two is it?`,
      links: contactLinks,
      suggestions: ['₹3,000 simple site', '₹5,000 complex site', 'How do I start?'],
    }
  }

  if (has(query, 'chatbot', 'smart search', 'automation') && (lastBot.includes('15,000') || lastBot.includes('existing') || lastBot.includes('chatbot'))) {
    return {
      text: `That’s ₹15,000 AI integration on your existing site. I’ll need the repo (or access) to understand the codebase, then add that feature.\n\n${START}\n\nDo you have the code ready to share?`,
      links: contactLinks,
      suggestions: ['Yes, I have the code', 'Not yet', 'See all pricing', 'How do I start?'],
    }
  }

  if (has(query, 'reels', 'shorts', 'campaign film', 'carousels')) {
    return {
      text: `AI creative work — I’ll quote from the brief (how many pieces, length, Instagram / YouTube / etc.).\n\n${START}\n\nInclude references if you have them.\n\nAnything else — a website as well?`,
      links: contactLinks,
      suggestions: ['Also a website', 'That’s all', 'How do I start?'],
    }
  }

  if (has(query, 'yes i have the code', 'i have the code', 'repo')) {
    return {
      text: `Good. ₹15,000 to add AI into that codebase.\n\n${START}\nSay it’s existing-site AI and what to add (chat / search / automation).`,
      links: contactLinks,
      suggestions: ['How do I start?', 'See all pricing'],
    }
  }

  if (has(query, 'map my product', 'not sure', 'help me choose', 'which one')) {
    return {
      text: `Answer these:\n\n1. New website, or a site that already exists?\n2. If new: pages only, or users + database + animations?\n3. Need unlimited changes after launch?\n4. Need payments? (not in ₹8,000)\n5. Need AI inside current code? (₹15,000)\n6. Need reels / campaign video?\n\nStart with question 1.`,
      links: pricingLinks,
      suggestions: ['New website', 'AI on my existing site', 'AI videos / creatives', 'See all pricing'],
    }
  }

  return null
}

export function replyTo(message: string, history: ChatTurn[] = []): AssistantReply {
  const raw = message.trim()
  if (!raw) return WELCOME

  const query = normalize(raw)

  if (/^(hi|hii|hey|hello|yo|namaste)\b/.test(raw) && query.split(' ').length < 4) {
    return WELCOME
  }

  const conversational = fromConversation(query, history)
  if (conversational) return conversational

  const hit = fromKnowledge(query)
  if (hit) return hit

  return {
    text: `Ask me anything about pricing, the product, or the services I provide.\n\n${PRICING_TEXT}\n\nI also cover stack (React, Next.js, Node, databases), login, payments (not in ₹8,000), revisions, and how to start.\n\nWhat do you need?`,
    links: pricingLinks,
    suggestions: WELCOME.suggestions,
  }
}
