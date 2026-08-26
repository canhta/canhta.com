import type { Profile, FixtureMarked } from './types'

export const profileFixture: Profile & FixtureMarked = {
  __fixture: true,
  name: 'Canh Ta',
  location: { en: 'Vietnam', vi: 'Việt Nam' },
  hook: {
    en: 'I build agentic systems, mobile apps and mini-SaaS — and I ship them.',
    vi: 'Tôi xây hệ thống agentic, app mobile và mini-SaaS — và tôi ship chúng.',
  },
  /**
   * This used to open "Bring me a messy process" / "Đưa tôi một quy trình lộn
   * xộn". It reads as calling the visitor's own operation sloppy before they
   * have said a word — the reader is the person who built that process. The
   * barrier being removed is the same one ("you don't need this worked out
   * already"), but the subject is now the situation, not their competence.
   */
  supporting: {
    en: 'You do not need a spec. Tell me where the work is stuck, and I turn it into a system that runs itself — and a product people use.',
    vi: 'Bạn không cần có sẵn spec. Cứ nói chỗ công việc đang vướng, tôi biến nó thành hệ thống tự chạy — và một sản phẩm có người dùng.',
  },
  ctaLabel: { en: 'Book a conversation', vi: 'Đặt lịch nói chuyện' },
  ctaHref: 'mailto:hello@canhta.com?subject=Project%20inquiry%20from%20canhta.com',
  avatar: '/avatar.jpg',
  available: true,
  availabilityLabel: { en: 'Taking projects', vi: 'Đang nhận dự án' },
  /**
   * Four facts, not six. `Builds` was a fourth wording of the same taxonomy that
   * FIG. 3 and the schedule's KIND column already name, and `Engagements` was a
   * teaser for FIG. 4 sitting two screens above it. What is left is the four
   * things a stranger in another timezone actually needs and cannot get anywhere
   * else on the page.
   */
  spec: [
    {
      label: { en: 'Based in', vi: 'Làm việc tại' },
      value: { en: 'Vietnam · GMT+7', vi: 'Việt Nam · GMT+7' },
    },
    {
      label: { en: 'Works in', vi: 'Ngôn ngữ' },
      value: { en: 'English · Tiếng Việt', vi: 'Tiếng Việt · English' },
    },
    {
      label: { en: 'Replies within', vi: 'Phản hồi trong' },
      value: { en: 'One working day', vi: 'Một ngày làm việc' },
    },
    {
      // Was "Kite — private beta". Kite was a fixture product that has since been
      // deleted, so the title block was naming a product that does not exist.
      label: { en: 'Now building', vi: 'Đang xây' },
      value: { en: 'inluv · PixelBid', vi: 'inluv · PixelBid' },
    },
  ],
}
