import type { Faq, FixtureMarked } from './types'

/**
 * The questions people actually ask before they write to a solo builder.
 * These are commercial commitments — every answer needs Canh's sign-off before
 * it goes near production.
 *
 * The Vietnamese questions deliberately carry no pronoun for Canh. See the
 * register note at the top of `src/lib/text.ts`: the answers say `tôi` and the
 * rest of the site says `bạn`, so a question that called him `anh` made the
 * reader address him two different ways on one screen.
 */
export const faqFixture: (Faq & FixtureMarked)[] = [
  {
    __fixture: true,
    id: 'pricing',
    order: 1,
    question: { en: 'How do you price work?', vi: 'Chi phí tính thế nào?' },
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
      vi: 'Code, tài khoản và hạ tầng đều là của bạn. Bàn giao là một phần của công việc.',
    },
  },
  {
    __fixture: true,
    id: 'vague',
    order: 3,
    question: {
      en: 'I only have a rough idea. Is that enough?',
      vi: 'Mới có ý tưởng sơ sài thì đủ chưa?',
    },
    answer: {
      en: 'Yes. Making it specific is the first thing we do together.',
      vi: 'Đủ. Làm rõ nó là việc đầu tiên chúng ta làm cùng nhau.',
    },
  },
  {
    __fixture: true,
    id: 'team',
    order: 4,
    question: {
      en: 'Can you work with my existing team?',
      vi: 'Làm cùng team sẵn có được không?',
    },
    answer: {
      en: 'Yes. I can build alongside your team, or build it and hand it over to them.',
      vi: 'Được. Tôi làm cùng team của bạn, hoặc làm xong rồi bàn giao lại.',
    },
  },
  {
    __fixture: true,
    id: 'after',
    order: 5,
    question: { en: 'What happens after launch?', vi: 'Sau khi ra mắt thì sao?' },
    answer: {
      en: 'I either stay on to run and improve it, or hand it over documented. Your call.',
      vi: 'Tôi ở lại vận hành và cải tiến tiếp, hoặc bàn giao kèm tài liệu. Tuỳ bạn chọn.',
    },
  },
  {
    __fixture: true,
    id: 'agency',
    order: 6,
    question: { en: 'Why you and not an agency?', vi: 'Sao không thuê agency?' },
    answer: {
      en: 'You talk to the person writing the code, not to an account manager.',
      vi: 'Bạn nói chuyện thẳng với người viết code, không qua account manager.',
    },
  },
]
