import type { Profile, FixtureMarked } from './types'

export const profileFixture: Profile & FixtureMarked = {
  __fixture: true,
  name: 'Canh Ta',
  location: { en: 'Vietnam', vi: 'Việt Nam' },
  hook: {
    en: 'I build agentic systems, mobile apps and mini-SaaS — and I ship them.',
    vi: 'Tôi xây hệ thống agentic, app mobile và mini-SaaS — và tôi ship chúng.',
  },
  supporting: {
    en: 'Bring me a messy process. I turn it into a system that runs itself, and a product people use.',
    vi: 'Đưa tôi một quy trình lộn xộn. Tôi biến nó thành hệ thống tự chạy, và một sản phẩm có người dùng.',
  },
  ctaLabel: { en: 'Book a conversation', vi: 'Đặt lịch nói chuyện' },
  ctaHref: 'mailto:hello@canhta.com?subject=Project%20inquiry%20from%20canhta.com',
  avatar: '/avatar.svg',
  available: true,
  availabilityLabel: { en: 'Taking projects', vi: 'Đang nhận dự án' },
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
      label: { en: 'Engagements', vi: 'Hình thức' },
      value: { en: 'Advisory · Sprint · Full build', vi: 'Tư vấn · Sprint · Trọn gói' },
    },
    {
      label: { en: 'Builds', vi: 'Xây' },
      value: { en: 'Agents · Mobile · Web · SaaS', vi: 'Agent · Mobile · Web · SaaS' },
    },
    {
      label: { en: 'Now building', vi: 'Đang xây' },
      value: { en: 'Kite — private beta', vi: 'Kite — beta kín' },
    },
  ],
}
