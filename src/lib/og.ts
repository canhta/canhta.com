/** The pages that each get their own share card, in the order `generateImageMetadata` lists them. */
export const OG_PAGES = ['home', 'services', 'products', 'contact'] as const
export type OgPage = (typeof OG_PAGES)[number]
