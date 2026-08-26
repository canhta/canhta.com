import type { Build, FixtureMarked } from './types'

export const buildsFixture: (Build & FixtureMarked)[] = [
  {
    __fixture: true,
    slug: 'atlas',
    order: 1,
    name: 'Atlas',
    status: 'live',
    tagline: {
      en: 'An agent that clears the ticket queue before anyone opens it',
      vi: 'Một agent dọn sạch hàng đợi ticket trước khi có ai kịp mở',
    },
    problem: {
      en: 'Support drowned in repetitive tickets nobody had time to triage.',
      vi: 'Đội hỗ trợ chìm trong ticket lặp lại, không ai kịp phân loại.',
    },
    built: {
      en: 'An agent loop that reads, reasons, acts, and escalates to a human.',
      vi: 'Vòng lặp agent đọc, suy luận, hành động, và chuyển người thật khi cần.',
    },
    result: {
      en: 'Runs unattended overnight; the morning queue starts near empty.',
      vi: 'Chạy không người trực qua đêm; sáng ra hàng đợi gần như trống.',
    },
    cover: '/builds/atlas.svg',
    url: 'https://example.com',
    proof: { label: { en: 'tickets/day', vi: 'ticket/ngày' }, value: '1.2k' },
  },
  {
    __fixture: true,
    slug: 'lumen',
    order: 2,
    name: 'Lumen',
    status: 'shipped',
    tagline: {
      en: 'A mobile app people actually open on day thirty',
      vi: 'Một app mobile mà người ta vẫn mở vào ngày thứ ba mươi',
    },
    problem: {
      en: 'A useful service nobody could reach without a laptop.',
      vi: 'Một dịch vụ hữu ích nhưng không ai dùng được nếu thiếu laptop.',
    },
    built: {
      en: 'A native-feeling cross-platform app with offline-first sync.',
      vi: 'App đa nền tảng cảm giác native, đồng bộ ưu tiên offline.',
    },
    result: {
      en: 'Shipped to both stores and maintained through four releases.',
      vi: 'Đã lên cả hai store và duy trì qua bốn bản phát hành.',
    },
    cover: '/builds/lumen.svg',
    url: 'https://example.com',
  },
  {
    __fixture: true,
    slug: 'kite',
    order: 3,
    name: 'Kite',
    status: 'building',
    tagline: {
      en: 'A mini-SaaS that does one job and bills for it',
      vi: 'Một mini-SaaS làm đúng một việc và thu tiền cho việc đó',
    },
    problem: {
      en: 'A workflow everyone solved badly with spreadsheets.',
      vi: 'Một quy trình ai cũng đang xử lý tạm bằng bảng tính.',
    },
    built: {
      en: 'A focused product: one screen, one job, billing from day one.',
      vi: 'Sản phẩm gọn: một màn hình, một việc, thu tiền từ ngày đầu.',
    },
    result: {
      en: 'In private beta with its first paying users.',
      vi: 'Đang beta kín với những người dùng trả tiền đầu tiên.',
    },
    cover: '/builds/kite.svg',
  },
]
