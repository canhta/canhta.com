import { describe, expect, it } from 'vitest'
import { mountScene } from '@/components/hero-scene-three'

/**
 * No WebGL means no scene: `mountScene` must return null so the static drawing
 * underneath stays as the picture. jsdom has no WebGL context, which is exactly
 * that situation.
 */
describe('hero scene without WebGL', () => {
  it('returns null and adds nothing to the page', () => {
    const host = document.createElement('div')
    expect(mountScene(host, { sources: [], title: '', rows: [], tag: '' })).toBeNull()
    expect(host.children).toHaveLength(0)
  })
})
