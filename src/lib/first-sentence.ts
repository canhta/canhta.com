/** The first sentence of a short text, for places that show only a teaser. */
export function firstSentence(text: string): string {
  return text.split(/(?<=[.!?])\s/)[0] ?? text
}
