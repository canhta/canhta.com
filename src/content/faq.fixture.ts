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
      en: 'Fixed scope, fixed price, agreed in writing before anything starts. You never get an invoice you did not expect.',
      vi: 'Phạm vi cố định, giá cố định, chốt bằng văn bản trước khi bắt đầu. Bạn không bao giờ nhận một hoá đơn ngoài dự tính.',
    },
  },
  {
    __fixture: true,
    id: 'ownership',
    order: 2,
    question: { en: 'Who owns the code?', vi: 'Code thuộc về ai?' },
    answer: {
      en: 'You do — code, accounts and infrastructure. Handover is part of the job, not an extra.',
      vi: 'Của bạn — code, tài khoản và hạ tầng. Bàn giao là một phần công việc, không tính thêm.',
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
      en: 'Yes. Turning it into something specific is the first step we do together, and it is the step that saves the most money.',
      vi: 'Đủ. Biến nó thành thứ cụ thể là bước đầu tiên chúng ta làm cùng nhau, và đó là bước tiết kiệm tiền nhất.',
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
      en: 'Yes. I can build alongside them, or build it and hand it over so they can carry it forward.',
      vi: 'Được. Tôi có thể xây cùng họ, hoặc xây xong bàn giao để họ tiếp tục.',
    },
  },
  {
    __fixture: true,
    id: 'after',
    order: 5,
    question: { en: 'What happens after launch?', vi: 'Sau khi ra mắt thì sao?' },
    answer: {
      en: 'Either I stay on to run and improve it, or I hand it over clean and documented. Both are normal.',
      vi: 'Hoặc tôi ở lại vận hành và cải tiến, hoặc bàn giao gọn gàng kèm tài liệu. Cả hai đều bình thường.',
    },
  },
  {
    __fixture: true,
    id: 'agency',
    order: 6,
    question: { en: 'Why you and not an agency?', vi: 'Sao là anh mà không phải một agency?' },
    answer: {
      en: 'You talk to the person building it. No account manager in between, and no juniors learning on your budget.',
      vi: 'Bạn nói chuyện thẳng với người đang xây. Không có account manager ở giữa, không có bạn junior học nghề bằng tiền của bạn.',
    },
  },
]
