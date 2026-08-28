import type { Faq, FixtureMarked } from './types'

/**
 * The questions people actually ask before they write to a solo builder.
 * These are commercial commitments — every answer needs Canh's sign-off before
 * it goes near production.
 */
export const faqFixture: (Faq & FixtureMarked)[] = [
  {
    __fixture: true,
    id: 'pricing',
    order: 1,
    question: { en: 'How do you price work?', vi: 'Anh tính giá thế nào?' },
    answer: {
      en: 'Fixed scope and fixed price, agreed in writing before any work starts.',
      vi: 'Phạm vi cố định, giá cố định, chốt bằng văn bản trước khi bắt đầu làm.',
    },
  },
  {
    __fixture: true,
    id: 'ownership',
    order: 2,
    question: { en: 'Who owns the code?', vi: 'Code thuộc về ai?' },
    answer: {
      en: 'You own the code, the accounts and the infrastructure. Handover is part of the job.',
      vi: 'Bạn sở hữu code, tài khoản và hạ tầng. Bàn giao nằm trong phần việc.',
    },
  },
  {
    __fixture: true,
    id: 'vague',
    order: 3,
    question: {
      en: 'I only have a rough idea. Is that enough?',
      vi: 'Tôi mới có ý tưởng sơ sài. Vậy đủ chưa?',
    },
    answer: {
      en: 'Yes. Making it specific is the first thing we do together.',
      vi: 'Đủ. Làm cho nó cụ thể là việc đầu tiên chúng ta làm cùng nhau.',
    },
  },
  {
    __fixture: true,
    id: 'team',
    order: 4,
    question: {
      en: 'Can you work with my existing team?',
      vi: 'Anh làm cùng team sẵn có của tôi được không?',
    },
    answer: {
      en: 'Yes. I can build alongside your team, or build it and hand it over to them.',
      vi: 'Được. Tôi có thể xây cùng đội của bạn, hoặc xây xong rồi bàn giao lại.',
    },
  },
  {
    __fixture: true,
    id: 'after',
    order: 5,
    question: { en: 'What happens after launch?', vi: 'Sau khi ra mắt thì sao?' },
    answer: {
      en: 'I either stay on to run and improve it, or hand it over documented. Your call.',
      vi: 'Tôi ở lại vận hành và cải tiến, hoặc bàn giao kèm tài liệu. Tuỳ bạn chọn.',
    },
  },
  {
    __fixture: true,
    id: 'agency',
    order: 6,
    question: { en: 'Why you and not an agency?', vi: 'Sao là anh mà không phải một agency?' },
    answer: {
      en: 'You talk to the person writing the code, not to an account manager.',
      vi: 'Bạn nói chuyện thẳng với người viết code, không phải với account manager.',
    },
  },
]
