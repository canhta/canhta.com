import type { Build, FixtureMarked } from './types'

export const buildsFixture: (Build & FixtureMarked)[] = [
  {
    __fixture: true,
    slug: 'atlas',
    order: 1,
    name: 'Atlas',
    status: 'live',
    year: '2026',
    kind: 'agent',
    featured: true,
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
    links: [
      { kind: 'web', url: 'https://example.com' },
      { kind: 'docs', url: 'https://example.com/docs' },
    ],
    proof: { label: { en: 'tickets/day', vi: 'ticket/ngày' }, value: '1.2k' },
  },
  {
    __fixture: true,
    slug: 'lumen',
    order: 2,
    name: 'Lumen',
    status: 'shipped',
    year: '2025',
    kind: 'mobile',
    featured: true,
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
    links: [
      { kind: 'appstore', url: 'https://apps.apple.com/app/id000000000' },
      { kind: 'playstore', url: 'https://play.google.com/store/apps/details?id=com.example' },
    ],
  },
  {
    __fixture: true,
    slug: 'kite',
    order: 3,
    name: 'Kite',
    status: 'building',
    year: '2026',
    kind: 'saas',
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
    links: [{ kind: 'web', url: 'https://example.com' }],
  },
  {
    __fixture: true,
    slug: 'ledger-skill',
    order: 4,
    name: 'Ledger',
    status: 'live',
    year: '2026',
    kind: 'skill',
    tagline: {
      en: 'An agent skill that reconciles books without being asked twice',
      vi: 'Kỹ năng agent đối soát sổ sách mà không phải nhắc hai lần',
    },
    problem: {
      en: 'Month-end reconciliation ate two days of a finance lead.',
      vi: 'Đối soát cuối tháng ngốn hai ngày của trưởng phòng tài chính.',
    },
    built: {
      en: 'A skill an agent loads on demand, with a human sign-off step.',
      vi: 'Một kỹ năng agent nạp khi cần, có bước người xác nhận.',
    },
    result: {
      en: 'Reconciliation now finishes before the finance lead arrives.',
      vi: 'Đối soát xong trước khi trưởng phòng tới văn phòng.',
    },
    cover: '/builds/atlas.svg',
    links: [{ kind: 'github', url: 'https://github.com/canhta' }],
  },
  {
    __fixture: true,
    slug: 'plumb',
    order: 5,
    name: 'Plumb',
    status: 'shipped',
    year: '2025',
    kind: 'tool',
    tagline: {
      en: 'A small tool that makes a slow build observable',
      vi: 'Công cụ nhỏ giúp nhìn thấy vì sao build chậm',
    },
    problem: {
      en: 'Nobody could say which step made the pipeline slow.',
      vi: 'Không ai chỉ ra được bước nào làm pipeline chậm.',
    },
    built: {
      en: 'A CLI that traces each step and prints where the time went.',
      vi: 'Một CLI theo dấu từng bước và in ra thời gian đi đâu.',
    },
    result: {
      en: 'Used on every project since, including this one.',
      vi: 'Dùng cho mọi dự án từ đó, kể cả trang này.',
    },
    cover: '/builds/kite.svg',
    links: [{ kind: 'github', url: 'https://github.com/canhta' }],
  },
]