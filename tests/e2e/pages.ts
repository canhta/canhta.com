/** Every page the site serves, in both languages, and its counterpart. */
export const SITE = 'https://canhta.com'

export interface PageCase {
  locale: 'en' | 'vi'
  key: 'home' | 'services' | 'products' | 'contact'
  path: string
  /** The same page in the other language. */
  other: string
}

export const PAGES: PageCase[] = [
  { locale: 'en', key: 'home', path: '/', other: '/vi' },
  { locale: 'en', key: 'services', path: '/services', other: '/vi/dich-vu' },
  { locale: 'en', key: 'products', path: '/products', other: '/vi/san-pham' },
  { locale: 'en', key: 'contact', path: '/contact', other: '/vi/lien-he' },
  { locale: 'vi', key: 'home', path: '/vi', other: '/' },
  { locale: 'vi', key: 'services', path: '/vi/dich-vu', other: '/services' },
  { locale: 'vi', key: 'products', path: '/vi/san-pham', other: '/products' },
  { locale: 'vi', key: 'contact', path: '/vi/lien-he', other: '/contact' },
]

export const canonicalOf = (path: string) => (path === '/' ? SITE : `${SITE}${path}`)
