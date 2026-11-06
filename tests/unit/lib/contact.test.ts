import { describe, expect, it } from 'vitest'
import { mailContact } from '@/lib/contact'

describe('mailContact', () => {
  it.each(['en', 'vi'] as const)('breaks body lines with CRLF (RFC 6068) in %s', (locale) => {
    const body = new URL(mailContact(locale).href).search.split('&body=')[1] ?? ''
    expect(body).toContain('%0D%0A')
    expect(body.replaceAll('%0D%0A', '')).not.toContain('%0A')
  })
})
