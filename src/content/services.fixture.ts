import type { Service, FixtureMarked } from './types'

export const servicesFixture: (Service & FixtureMarked)[] = [
  {
    __fixture: true,
    id: 'advisory',
    order: 1,
    name: { en: 'Solution advisory', vi: 'Tư vấn giải pháp' },
    output: {
      en: 'A written architecture and a build order you can hand to any developer.',
      vi: 'Tài liệu kiến trúc và thứ tự làm, đưa cho dev nào cũng theo được.',
    },
    suitedTo: {
      en: 'You know the problem but not how to build the answer.',
      vi: 'Bạn biết vấn đề nhưng chưa biết giải thế nào.',
    },
  },
  {
    __fixture: true,
    id: 'sprint',
    order: 2,
    name: { en: 'Focused build sprint', vi: 'Sprint tập trung' },
    output: {
      en: 'One working piece of the product, running in production.',
      vi: 'Một phần sản phẩm chạy được, đã lên production.',
    },
    suitedTo: {
      en: 'You want to see it work before committing to the whole build.',
      vi: 'Bạn muốn thấy nó chạy được rồi mới quyết làm trọn gói.',
    },
  },
  {
    __fixture: true,
    id: 'endToEnd',
    order: 3,
    name: { en: 'End-to-end product build', vi: 'Làm sản phẩm trọn gói' },
    output: {
      en: 'The finished product, released to users and maintained after launch.',
      vi: 'Sản phẩm hoàn chỉnh, đưa ra cho người dùng và bảo trì sau khi ra mắt.',
    },
    suitedTo: {
      en: 'You want one person responsible from the first idea to launch.',
      vi: 'Bạn muốn một người chịu trách nhiệm từ ý tưởng đầu tiên đến lúc ra mắt.',
    },
  },
]
