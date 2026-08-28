import type { Profile, FixtureMarked } from './types'

export const profileFixture: Profile & FixtureMarked = {
  __fixture: true,
  name: 'Canh Ta',
  location: { en: 'Vietnam', vi: 'Việt Nam' },
  hook: {
    en: 'I build agent systems, mobile apps and small SaaS products.',
    vi: 'Tôi làm hệ thống agent, app mobile và SaaS nhỏ.',
  },
  /**
   * This used to open "Bring me a messy process" / "Đưa tôi một quy trình lộn
   * xộn". It reads as calling the visitor's own operation sloppy before they
   * have said a word — the reader is the person who built that process. The
   * barrier being removed is the same one ("you don't need this worked out
   * already"), but the subject is now the situation, not their competence.
   *
   * The second half used to read "...and I turn it into a system that runs
   * itself — and a product people use". Two abstractions joined by a dash,
   * neither of which a reader could picture. It says the three things that
   * actually happen instead.
   */
  supporting: {
    en: 'You do not need a spec to start. Tell me which part of your work is slow or still done by hand, and I will design it, build it and run it in production.',
    vi: 'Bạn không cần có sẵn spec. Cứ nói phần việc nào đang chậm hoặc còn làm tay, tôi lo từ thiết kế, code cho tới lúc lên production.',
  },
  ctaLabel: { en: 'Email me', vi: 'Gửi email cho tôi' },
  ctaHref: 'mailto:hello@canhta.com?subject=Project%20inquiry%20from%20canhta.com',
  avatar: '/avatar.jpg',
  available: true,
  availabilityLabel: { en: 'Available for work', vi: 'Đang nhận dự án' },
  /**
   * Four facts, not six. `Builds` was a fourth wording of the same taxonomy the
   * scope section and each project's KIND label already name, and `Engagements`
   * was a teaser for a section two screens below it. What is left is the four
   * things a stranger in another timezone actually needs and cannot get anywhere
   * else on the page.
   */
  spec: [
    {
      label: { en: 'Based in', vi: 'Làm việc tại' },
      value: { en: 'Vietnam · GMT+7', vi: 'Việt Nam · GMT+7' },
    },
    {
      label: { en: 'Works in', vi: 'Làm việc bằng' },
      value: { en: 'English · Tiếng Việt', vi: 'Tiếng Việt · English' },
    },
    {
      label: { en: 'Replies within', vi: 'Trả lời trong' },
      value: { en: 'One working day', vi: '1 ngày làm việc' },
    },
    {
      // Was "Kite — private beta". Kite was a fixture product that has since
      // been deleted, so this was naming a product that does not exist.
      label: { en: 'Now building', vi: 'Đang làm' },
      value: { en: 'inluv · PixelBid', vi: 'inluv · PixelBid' },
    },
  ],
}
