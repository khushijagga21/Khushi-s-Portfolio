export const CONTACT = {
  email: 'khushijagga14@gmail.com',
  whatsapp: '919817326283',
  whatsappDisplay: '+91 98173 26283',
  linkedin: 'https://www.linkedin.com/in/khushi-jagga21/',
  linkedinDisplay: 'linkedin.com/in/khushi-jagga21',
  location: 'Gurugram, Haryana',
} as const

export const NAV_LINKS = [
  { id: 'home', label: 'Home', hash: '#home' },
  { id: 'about', label: 'About', hash: '#about' },
  { id: 'services', label: 'Services', hash: '#services' },
  { id: 'projects', label: 'Projects', hash: '#projects' },
  { id: 'contact', label: 'Contact', hash: '#contact' },
] as const

export type PageId = (typeof NAV_LINKS)[number]['id']
