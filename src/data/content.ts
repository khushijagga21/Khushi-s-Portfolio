export const servicesIntro =
  'Three things, done by me: the website, the AI content, and AI inside your product. You talk to one person from first message to launch.'

export const servicesPreview = [
  {
    num: '01',
    title: 'Website Development',
    text: 'Landing pages and full websites — front-end, back-end, database, and layouts that work on a phone.',
  },
  {
    num: '02',
    title: 'AI Creative Marketing',
    text: 'Reels, shorts, carousels, and promo clips made with AI, written to match your brand.',
  },
  {
    num: '03',
    title: 'AI Integration',
    text: 'Chat, search, and automation added to a site or product you already have.',
  },
] as const

export const servicesDetail = [
  {
    num: '01',
    title: 'Website Development',
    lead: 'Landing pages, business sites, and full-stack builds. I handle the design in the browser, the backend, and the database so the site holds up on a phone as well as a laptop.',
    tags: [
      'Landing Pages',
      'Full-Stack Websites',
      'Front-End',
      'Back-End',
      'Database Integration',
      'Animations & Transitions',
      'Business Sites',
      'Fully Responsive',
    ],
  },
  {
    num: '02',
    title: 'AI Creative Marketing',
    lead: 'Campaign videos, reels, shorts, and carousels. I use AI to move faster, then edit so it still sounds like your brand — not a generic script.',
    tags: ['Creatives', 'Reels & Shorts', 'Carousels', 'Promotion Clips', 'Brand Content'],
  },
  {
    num: '03',
    title: 'AI Integration',
    lead: 'If you already have a product, I add assistants, search, and small automations. Login and real user flows when the project needs them.',
    tags: [
      'Chat Assistants',
      'Smart Search',
      'Automation',
      'Custom AI Features',
      'Existing Product Upgrade',
    ],
  },
] as const

export type WebsiteProject = {
  title: string
  cat: string
  meta: string
  href: string
  image?: string
  imagePosition?: string
  mediaClass?: string
  feature?: boolean
  external?: boolean
}

export const websiteProjects: WebsiteProject[] = [
  {
    title: 'ARQO Design Collective',
    cat: 'Live Website',
    meta: 'Architecture studio website. Minimal, live at arqodesigncollective.com.',
    href: 'https://arqodesigncollective.com/',
    image: '/assets/projects/arqo-design-collective.jpg',
    imagePosition: 'center top',
    external: true,
  },
  {
    title: 'HP Power Lab',
    cat: 'Live Website',
    meta: 'Fuel delivery platform for farmers, drivers, and admins — built for HP Power Lab.',
    href: 'https://hp-power-lab-weld.vercel.app/',
    image: '/assets/projects/hp-powerlab-cover.jpg',
    imagePosition: 'center',
    external: true,
  },
  {
    title: 'workSphere',
    cat: 'Live Website',
    meta: 'Team workspace: chat, boards, whiteboard, meetings, and a code editor.',
    href: 'https://worksphere-six.vercel.app/',
    image: '/assets/projects/worksphere-cover.jpg',
    imagePosition: 'center top',
    external: true,
  },
  {
    title: 'MyPDF',
    cat: 'Live Website',
    meta: 'Browser PDF tools — merge, split, compress, convert, edit.',
    href: 'https://my-pdf-hazel.vercel.app/',
    image: '/assets/projects/mypdf-cover.jpg',
    imagePosition: 'center top',
    external: true,
  },
]

export const aiVideoProjects = [
  {
    title: 'Palmonas Campaign Video',
    cat: 'AI Marketing Video · Palmonas',
    meta: 'Marketing video generated with AI for Palmonas.',
    video: '/assets/projects/ai-marketing-heygen.mp4',
    feature: true,
  },
] as const

export const homeFeatured = [
  {
    title: 'ARQO Design Collective',
    cat: 'Website',
    meta: 'Architecture studio website. Live at arqodesigncollective.com.',
    href: 'https://arqodesigncollective.com/',
    image: '/assets/projects/arqo-design-collective.jpg',
    imagePosition: 'center top',
  },
  {
    title: 'HP Power Lab',
    cat: 'Website',
    meta: 'Fuel delivery platform from the HP Power Lab hackathon.',
    href: 'https://hp-power-lab-weld.vercel.app/',
    image: '/assets/projects/hp-powerlab-cover.jpg',
    imagePosition: 'center',
  },
  {
    title: 'workSphere',
    cat: 'Website',
    meta: 'Chat, boards, whiteboard, meet — one workspace.',
    href: 'https://worksphere-six.vercel.app/',
    image: '/assets/projects/worksphere-cover.jpg',
    imagePosition: 'center top',
  },
  {
    title: 'MyPDF',
    cat: 'Website',
    meta: 'PDF tools in the browser. Merge, split, convert.',
    href: 'https://my-pdf-hazel.vercel.app/',
    image: '/assets/projects/mypdf-cover.jpg',
    imagePosition: 'center top',
  },
] as const
