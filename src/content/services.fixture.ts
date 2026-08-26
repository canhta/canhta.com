import type { Service, FixtureMarked } from './types'

export const servicesFixture: (Service & FixtureMarked)[] = [
  {
    __fixture: true,
    id: 'advisory',
    order: 1,
    name: { en: 'Solution advisory', vi: 'Tư vấn giải pháp' },
    output: {
      en: 'A written architecture and a build sequence you could hand to anyone.',
      vi: 'Một bản kiến trúc viết ra và trình tự thi công đưa cho ai cũng làm được.',
    },
    suitedTo: {
      en: 'You know the problem, not yet the shape of the answer.',
      vi: 'Bạn biết vấn đề, chưa biết hình dạng lời giải.',
    },
  },
  {
    __fixture: true,
    id: 'sprint',
    order: 2,
    name: { en: 'Focused build sprint', vi: 'Sprint xây tập trung' },
    output: {
      en: 'One working piece in production — not a prototype, not a deck.',
      vi: 'Một mảnh chạy thật trên production — không phải prototype, không phải slide.',
    },
    suitedTo: {
      en: 'You need proof it works before you commit further.',
      vi: 'Bạn cần bằng chứng nó chạy được trước khi cam kết thêm.',
    },
  },
  {
    __fixture: true,
    id: 'endToEnd',
    order: 3,
    name: { en: 'End-to-end product build', vi: 'Xây sản phẩm trọn gói' },
    output: {
      en: 'A product with users, shipped and maintained through real releases.',
      vi: 'Một sản phẩm có người dùng, đã ship và duy trì qua các bản phát hành thật.',
    },
    suitedTo: {
      en: 'You want one person accountable from idea to launch.',
      vi: 'Bạn muốn một người chịu trách nhiệm từ ý tưởng tới lúc ra mắt.',
    },
  },
]
