import type { ContentCopy } from '../types'

/** Written as one Vietnamese page, not translated field-by-field from English. */
export const viContent: ContentCopy = {
  profile: {
    location: 'Việt Nam',
    hook: 'Chuyển đổi số và AI cho doanh\u00a0nghiệp nhỏ',
    supporting:
      'Tin nhắn Zalo, file Excel, sổ sách về chung một phần mềm. AI nhập đơn, trả lời khách, bạn bấm duyệt.',
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
      tagline: 'Dùng iPhone làm điều khiển cho Android TV và Google TV.',
      summary: 'Có phím bấm, vùng vuốt, và gõ chữ bằng bàn phím iPhone.',
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
        'Phần mềm bổ sung cho trợ lý AI lập trình. Nó tìm đối thủ và nhu cầu thị trường, rồi gợi ý nên triển khai tiếp, dừng lại hay đổi hướng.',
      availability: 'Mã nguồn trên GitHub.',
    },
  ],
  offers: [
    {
      id: 'systems',
      name: 'Phần mềm quản lý',
      detail:
        'Nhập đơn một lần, kho và công nợ tự cập nhật. Ai nghe máy cũng thấy khách từng mua gì, còn nợ bao nhiêu.',
      examples: ['ERP', 'CRM'],
    },
    {
      id: 'ai',
      name: 'AI agent và chatbot',
      detail:
        'Chatbot trả lời khách theo bảng giá của bạn. AI nhập sẵn hóa đơn, người của bạn duyệt.',
      examples: ['AI agent', 'chatbot trả lời khách', 'trả lời theo tài liệu của bạn'],
    },
    {
      id: 'data',
      name: 'Số liệu và báo cáo',
      detail:
        'Số bán hàng, kho và khách hàng gom về một báo cáo. Sáng thứ Hai mở ra là biết tình hình.',
      examples: ['Bảng số liệu', 'sắp xếp lại file Excel'],
    },
    {
      id: 'web',
      name: 'Website và app',
      detail:
        'Website cho khách đặt hàng, đặt lịch, đơn về thẳng phần mềm. Có ý tưởng riêng thì chúng tôi triển khai thành app.',
      examples: [],
    },
    {
      id: 'iot',
      name: 'Thiết bị kết nối (IoT)',
      detail:
        'Cảm biến mua sẵn báo nhiệt độ, độ ẩm về một màn hình, vượt ngưỡng là có cảnh báo. Dùng để theo dõi, không thay thiết bị kiểm định.',
      examples: [],
    },
    {
      id: 'team',
      name: 'Thêm người cho đội bạn',
      detail:
        'Chúng tôi vào làm cùng đội bạn, hoặc nhận trọn một phần như app điện thoại. Làm trên hệ thống và theo nếp của đội bạn.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'Chi phí bao nhiêu?',
      answer:
        'Bản chạy thử không tính phí. Bạn thấy nó chạy rồi mới nhận báo giá, kèm kế hoạch và bảo trì.',
    },
    {
      id: 'timeline',
      question: 'Bao lâu thì xong?',
      answer:
        'Bản chạy thử có sớm. Thời gian các phần sau ghi trong kế hoạch.',
    },
    {
      id: 'apps',
      question: 'Phần mềm tôi đang dùng có kết nối được không?',
      answer:
        'Lúc tìm hiểu vấn đề, chúng tôi xem phần nào kết nối được.',
    },
    {
      id: 'agent',
      question: 'Tôi cần AI agent hay chatbot là đủ?',
      answer:
        'Chatbot trả lời câu hỏi. AI agent làm thêm các bước trong phần mềm, có người duyệt. Thường chatbot là đủ.',
    },
    {
      id: 'wrong',
      question: 'AI có lúc sai. Ai kiểm tra?',
      answer:
        'Hai bên chọn một người duyệt từ đầu. Việc dính tới tiền hay sửa đơn, sổ sách đều qua người đó.',
    },
    {
      id: 'customers',
      question: 'AI nhắn tin với khách giúp tôi được không?',
      answer:
        'Được, nếu câu trả lời có trong thông tin bạn đưa. AI báo đây là tin tự động, không chắc thì chuyển cho người.',
    },
    {
      id: 'data',
      question: 'Thông tin khách hàng của tôi đi đâu khi dùng AI?',
      answer:
        'Chỉ lấy thông tin dự án cần, và thống nhất trước AI nào nhận gì. Đây không phải tư vấn pháp lý.',
    },
    {
      id: 'ownership',
      question: 'Phần mềm triển khai xong là của ai?',
      answer: 'Thuộc về bạn, ghi rõ trong hợp đồng.',
    },
    {
      id: 'support',
      question: 'Đưa vào dùng rồi thì sao?',
      answer:
        'Bảo trì và hỗ trợ ghi rõ trong báo giá.',
    },
    {
      id: 'idea',
      question: 'Tôi mới chỉ có ý tưởng thì sao?',
      answer: 'Vẫn được. Cho biết bạn muốn đạt gì, ai sẽ dùng, rồi cùng tính bản chạy thử.',
    },
  ],
}
