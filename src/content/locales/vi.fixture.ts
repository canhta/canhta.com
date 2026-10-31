import type { ContentCopy } from '../types'

/** Written as one Vietnamese page, not translated field-by-field from English. */
export const viContent: ContentCopy = {
  profile: {
    location: 'Việt Nam',
    hook: 'Số hóa công việc, AI lo việc lặp lại.',
    supporting: 'Cho cửa hàng và doanh nghiệp nhỏ. Đơn hàng và hàng tồn về một hệ thống, AI lo các bước lặp lại.',
    headerCta: 'Nhắn chúng tôi',
    availabilityLabel: 'Đang nhận dự án mới',
  },
  builds: [
    {
      slug: 'scori',
      tagline: 'Ghi điểm khi chơi bài và board game.',
      summary: 'Thêm người chơi, ghi điểm, xem ai dẫn đầu. Không cần mạng. Bạn bè xem điểm bằng mã QR.',
      availability: 'iPhone và Android, 10 ngôn ngữ.',
    },
    {
      slug: 'remoti',
      tagline: 'Dùng iPhone điều khiển Android TV hoặc Google TV.',
      summary: 'Có nút bấm, vùng vuốt và gõ chữ bằng bàn phím iPhone.',
      availability: 'Chỉ dành cho iPhone.',
    },
    {
      slug: 'ai-engineering-atlas',
      tagline: 'Lộ trình học AI cho lập trình viên.',
      summary: 'Làm một bài kiểm tra ngắn, rồi học theo lộ trình lấp chỗ thiếu.',
      availability: 'Mã nguồn mở, có tiếng Anh và tiếng Việt.',
    },
    {
      slug: 'copycat-skills',
      tagline: 'Xem thị trường trước khi làm app.',
      summary:
        'Công cụ cho trợ lý AI lập trình. Tìm đối thủ và nhu cầu, rồi gợi ý nên làm, nên dừng hay nên đổi hướng.',
      availability: 'Mã nguồn trên GitHub.',
    },
  ],
  offers: [
    {
      id: 'systems',
      name: 'Hệ thống quản lý',
      detail: 'ERP và CRM cho đơn hàng, kho, công nợ và báo cáo.',
      examples: ['ERP', 'CRM', 'đơn hàng và kho', 'công nợ'],
    },
    {
      id: 'ai',
      name: 'AI agent và chatbot',
      detail: 'AI đọc đơn hàng và hóa đơn, soạn câu trả lời cho nhân viên và tìm trong tài liệu của bạn.',
      examples: ['Chatbot trả lời khách', 'đọc đơn hàng và hóa đơn', 'báo cáo hằng tuần'],
    },
    {
      id: 'data',
      name: 'Số liệu và báo cáo',
      detail: 'Gom số liệu bán hàng, kho và khách từ Excel và các app thành một báo cáo.',
      examples: ['Bảng số liệu', 'báo cáo hằng tuần', 'dọn file Excel lộn xộn'],
    },
    {
      id: 'web',
      name: 'Website và ứng dụng',
      detail: 'Website, ứng dụng web và ứng dụng điện thoại, cho việc kinh doanh hoặc ý tưởng của bạn.',
      examples: ['Website', 'ứng dụng web', 'ứng dụng iPhone và Android'],
    },
    {
      id: 'iot',
      name: 'Thiết bị kết nối (IoT)',
      detail:
        'Bảng theo dõi và cảnh báo cho cảm biến bán sẵn, như nhiệt độ và độ ẩm (số đo thường ngày, không có chứng nhận).',
      examples: ['Nhiệt độ và độ ẩm', 'bảng theo dõi', 'cảnh báo'],
    },
    {
      id: 'team',
      name: 'Hỗ trợ đội kỹ thuật của bạn',
      detail: 'Chúng tôi làm cùng đội của bạn, hoặc nhận một phần việc, trên hệ thống bạn đang dùng.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'Tính tiền thế nào?',
      answer: 'Bạn nhận kế hoạch và báo giá trước khi chúng tôi làm. Bắt đầu bằng bản chạy thử nhỏ, ổn mới làm tiếp.',
    },
    {
      id: 'timeline',
      question: 'Làm mất bao lâu?',
      answer: 'Kế hoạch ghi rõ bản chạy thử đầu tiên làm trong bao lâu.',
    },
    {
      id: 'existing',
      question: 'Có thật sự cần làm phần mềm riêng không?',
      answer: 'Nhiều khi không. Nếu phần mềm bán sẵn đã đủ dùng, chúng tôi sẽ nói.',
    },
    {
      id: 'agent',
      question: 'Tôi cần AI agent, hay chỉ cần chatbot?',
      answer:
        'Chatbot trả lời tin nhắn. AI agent còn làm các bước trong hệ thống của bạn, và nhiều khi chatbot là đủ.',
    },
    {
      id: 'wrong',
      question: 'AI có thể sai. Ai kiểm tra?',
      answer:
        'Một người cụ thể, chốt từ đầu, duyệt mọi việc tốn tiền hoặc làm thay đổi đơn hàng và thông tin đã lưu. Chatbot nói chuyện với khách chỉ trả lời theo thông tin bạn đã đưa.',
    },
    {
      id: 'customers',
      question: 'AI có nhắn tin với khách của tôi được không?',
      answer: 'Được. AI nói rõ đây là trả lời tự động, và chuyển cho nhân viên khi không chắc hoặc khi khách muốn.',
    },
    {
      id: 'data',
      question: 'Thông tin khách hàng của tôi đi đâu khi dùng AI?',
      answer:
        'Chúng tôi chỉ lấy thông tin dự án cần, và thống nhất trước dịch vụ AI nào nhận gì, ai là chủ. Chúng tôi không tư vấn pháp lý.',
    },
    {
      id: 'ownership',
      question: 'Sản phẩm làm xong là của ai?',
      answer: 'Của bạn. Mọi thứ đứng tên bạn, chúng tôi có thể làm tiếp hoặc bàn giao kèm hướng dẫn.',
    },
    {
      id: 'idea',
      question: 'Tôi mới có ý tưởng thôi thì sao?',
      answer: 'Vẫn được. Cho biết bạn muốn làm gì và cho ai dùng, chúng tôi bắt đầu từ bản nhỏ nhất.',
    },
  ],
}
