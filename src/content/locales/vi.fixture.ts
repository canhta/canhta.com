import type { ContentCopy } from '../types'

/** Written as one Vietnamese page, not translated field-by-field from English. */
export const viContent: ContentCopy = {
  profile: {
    location: 'Việt Nam',
    hook: 'Số hóa công việc, AI lo việc lặp lại.',
    supporting:
      'Cho cửa hàng và doanh nghiệp nhỏ. Bạn kể vấn đề, chúng tôi cùng bạn tìm giải pháp. Có thể là một chỗ ghi chung cho mọi đơn hàng, món hàng và khoản nợ, không ai phải gõ lại.',
    headerCta: 'Gọi chúng tôi',
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
      tagline: 'Xem thị trường trước khi triển khai app.',
      summary:
        'Công cụ cho trợ lý AI lập trình. Tìm đối thủ và nhu cầu, rồi gợi ý nên làm, nên dừng hay nên đổi hướng.',
      availability: 'Mã nguồn trên GitHub.',
    },
  ],
  offers: [
    {
      id: 'systems',
      name: 'Hệ thống quản lý',
      detail:
        'Nhập đơn một lần, kho tự trừ và công nợ của khách tự cập nhật. Ai nghe điện thoại cũng thấy ngay khách từng mua gì và đang nợ bao nhiêu.',
      examples: ['ERP', 'CRM'],
    },
    {
      id: 'ai',
      name: 'AI agent và chatbot',
      detail:
        'Khách hỏi giá hay còn hàng không trên tin nhắn, AI soạn sẵn câu trả lời từ bảng giá của bạn. Hóa đơn nhà cung cấp thì AI đọc vào hệ thống và báo khi tổng tiền không khớp.',
      examples: ['AI agent', 'Chatbot trả lời khách', 'Trả lời từ tài liệu của bạn'],
    },
    {
      id: 'data',
      name: 'Số liệu và báo cáo',
      detail:
        'Số liệu bán hàng, kho và khách từ Excel và các app, gom thành một báo cáo tự cập nhật. Sáng thứ Hai bạn xem được tình hình mà không phải hỏi ai.',
      examples: ['Bảng số liệu', 'Dọn file Excel lộn xộn'],
    },
    {
      id: 'web',
      name: 'Website và ứng dụng',
      detail:
        'Website cho khách đặt hàng hoặc đặt lịch, đơn về thẳng hệ thống của bạn. Cũng triển khai ứng dụng web và điện thoại cho ý tưởng riêng của bạn.',
      examples: [],
    },
    {
      id: 'iot',
      name: 'Thiết bị kết nối (IoT)',
      detail:
        'Cảm biến bán sẵn gửi nhiệt độ và độ ẩm về một màn hình, và bạn nhận cảnh báo khi số đo vượt mức bạn đặt. Số đo thường ngày, không có chứng nhận.',
      examples: [],
    },
    {
      id: 'team',
      name: 'Hỗ trợ đội kỹ thuật của bạn',
      detail:
        'Chúng tôi tham gia cùng đội của bạn một thời gian, hoặc nhận riêng một phần việc triển khai, như ứng dụng điện thoại hay phần nối hai hệ thống. Làm việc trên hệ thống bạn đang dùng, theo cách đội bạn quen.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'Tính tiền thế nào?',
      answer:
        'Bạn xem bản chạy thử nhỏ trước, rồi chúng tôi mới đưa báo giá rõ ràng. Báo giá đi kèm kế hoạch có thời gian, cách bảo trì và hỗ trợ.',
    },
    {
      id: 'timeline',
      question: 'Triển khai mất bao lâu?',
      answer:
        'Bản chạy thử nhỏ triển khai trước, nên bạn thấy nó chạy sớm. Kế hoạch đi kèm báo giá ghi thời gian từng phần.',
    },
    {
      id: 'apps',
      question: 'Các app tôi đang dùng có nối được không?',
      answer:
        'Thường là được, như file Excel, Zalo hay phần mềm bán hàng. Chúng tôi kiểm tra ngay từ lúc tìm hiểu vấn đề, và báo rõ chỗ nào nối được, chỗ nào không.',
    },
    {
      id: 'agent',
      question: 'Tôi cần AI agent, hay chỉ cần chatbot?',
      answer:
        'Chatbot trả lời câu hỏi theo bảng giá của bạn. AI agent còn làm việc trong hệ thống, như tạo đơn hay cập nhật kho, và nhiều khi chatbot là đủ.',
    },
    {
      id: 'wrong',
      question: 'AI có thể sai. Ai kiểm tra?',
      answer:
        'Một người cụ thể, chốt từ đầu, duyệt mọi việc tốn tiền hoặc làm thay đổi đơn hàng và thông tin đã lưu. Mọi bước AI làm đều được ghi lại.',
    },
    {
      id: 'customers',
      question: 'AI có nhắn tin với khách của tôi được không?',
      answer:
        'Được. AI nói rõ đây là trả lời tự động, chỉ trả lời theo thông tin bạn đã đưa, và chuyển cho nhân viên khi không chắc hoặc khi khách muốn.',
    },
    {
      id: 'data',
      question: 'Thông tin khách hàng của tôi đi đâu khi dùng AI?',
      answer:
        'Chúng tôi chỉ lấy thông tin dự án cần, và thống nhất trước dịch vụ AI nào nhận gì, ai là chủ. Chúng tôi không tư vấn pháp lý.',
    },
    {
      id: 'ownership',
      question: 'Phần mềm triển khai xong là của ai?',
      answer: 'Của bạn. Mọi thứ đứng tên bạn.',
    },
    {
      id: 'support',
      question: 'Sau khi chạy rồi thì sao?',
      answer:
        'Chúng tôi duy trì và cải thiện tiếp, hoặc bàn giao kèm hướng dẫn. Cách làm nằm trong báo giá, để bạn biết trước khi quyết định.',
    },
    {
      id: 'idea',
      question: 'Tôi mới có ý tưởng thôi thì sao?',
      answer: 'Vẫn được. Cho biết bạn muốn đạt được gì và ai sẽ dùng, chúng tôi cùng tính xem bản chạy thử nhỏ cần có gì.',
    },
  ],
}
