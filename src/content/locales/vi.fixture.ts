import type { ContentCopy } from '../types'

/** Written as one Vietnamese page, not translated field-by-field from English. */
export const viContent: ContentCopy = {
  profile: {
    location: 'Việt Nam',
    hook: 'Zalo, Excel, sổ\u00a0sách về chung một hệ thống.',
    supporting:
      'Chúng tôi triển khai phần mềm quản lý, website, app và AI agent cho doanh nghiệp nhỏ và cá nhân. AI làm những bước như ghi đơn, nhắc công nợ, trả lời khách, và một người bên bạn duyệt trước khi chạy.',
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
        'Nhập đơn một lần, kho và công nợ tự cập nhật theo. Khách gọi tới, ai nghe máy cũng thấy ngay khách từng mua gì, còn nợ bao nhiêu.',
      examples: ['ERP', 'CRM'],
    },
    {
      id: 'ai',
      name: 'AI agent và chatbot',
      detail:
        'Khách nhắn hỏi giá, hỏi còn hàng không, chatbot trả lời theo bảng giá bạn đưa. AI cũng đọc được hóa đơn nhà cung cấp và nhập sẵn vào phần mềm, người của bạn chỉ cần kiểm tra lại. Việc gì dính tới tiền, hay sửa đơn hàng, sổ sách, đều phải có người bấm duyệt.',
      examples: ['AI agent', 'chatbot trả lời khách', 'trả lời theo tài liệu của bạn'],
    },
    {
      id: 'data',
      name: 'Số liệu và báo cáo',
      detail:
        'Số bán hàng, tồn kho và khách hàng từ file Excel và các app gom về một báo cáo luôn cập nhật. Sáng thứ Hai mở ra là biết tình hình, không cần đi hỏi từng người.',
      examples: ['Bảng số liệu', 'sắp xếp lại file Excel'],
    },
    {
      id: 'web',
      name: 'Website và app',
      detail:
        'Website để khách đặt hàng, đặt lịch, đơn về thẳng phần mềm của bạn. Bạn có ý tưởng riêng thì chúng tôi triển khai thành app web hoặc app điện thoại.',
      examples: [],
    },
    {
      id: 'iot',
      name: 'Thiết bị kết nối (IoT)',
      detail:
        'Cảm biến mua sẵn ngoài thị trường gửi nhiệt độ, độ ẩm về một màn hình. Số đo vượt ngưỡng bạn đặt là có cảnh báo. Số đo này dùng để theo dõi hằng ngày, không thay cho thiết bị đã kiểm định.',
      examples: [],
    },
    {
      id: 'team',
      name: 'Thêm người cho đội bạn',
      detail:
        'Chúng tôi vào làm cùng đội của bạn một thời gian, hoặc nhận trọn một phần việc, như app điện thoại hay phần kết nối hai phần mềm. Chúng tôi làm trên hệ thống bạn đang dùng, theo nếp làm việc của đội bạn.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'Chi phí bao nhiêu?',
      answer:
        'Bạn xem bản chạy thử trước. Thấy được việc rồi, chúng tôi mới gửi báo giá cụ thể, kèm kế hoạch, thời gian và cách bảo trì, hỗ trợ.',
    },
    {
      id: 'timeline',
      question: 'Bao lâu thì xong?',
      answer:
        'Bản chạy thử có trước, nên bạn sớm thấy kết quả. Thời gian cho từng phần sau đó được ghi rõ trong kế hoạch đi kèm báo giá.',
    },
    {
      id: 'apps',
      question: 'Phần mềm tôi đang dùng có kết nối được không?',
      answer:
        'Lúc tìm hiểu vấn đề, chúng tôi xem luôn phần nào kết nối được rồi báo bạn.',
    },
    {
      id: 'agent',
      question: 'Tôi cần AI agent hay chatbot là đủ?',
      answer:
        'Chatbot thì trả lời câu hỏi. AI agent làm thêm được các bước trong phần mềm của bạn, có người duyệt. Nhiều trường hợp chỉ cần chatbot.',
    },
    {
      id: 'wrong',
      question: 'AI có lúc sai. Ai kiểm tra?',
      answer:
        'Ngay từ đầu, hai bên thống nhất một người duyệt. Việc gì dính tới tiền, hay sửa đơn hàng, sổ sách, phải qua người đó bấm duyệt.',
    },
    {
      id: 'customers',
      question: 'AI nhắn tin với khách giúp tôi được không?',
      answer:
        'Được, nếu câu trả lời có trong thông tin bạn cung cấp. AI nói rõ đây là tin nhắn tự động. Khi không chắc, hoặc khách muốn nói chuyện với người, AI chuyển cho nhân viên của bạn.',
    },
    {
      id: 'data',
      question: 'Thông tin khách hàng của tôi đi đâu khi dùng AI?',
      answer:
        'Chúng tôi chỉ lấy thông tin dự án cần. Trước khi bắt đầu, hai bên thống nhất dịch vụ AI nào nhận thông tin gì, và ai là chủ sở hữu. Đây không phải tư vấn pháp lý.',
    },
    {
      id: 'ownership',
      question: 'Làm xong, phần mềm thuộc về ai?',
      answer: 'Thuộc về bạn. Mọi thứ đều đứng tên bạn.',
    },
    {
      id: 'support',
      question: 'Đưa vào dùng rồi thì sao?',
      answer:
        'Bảo trì và hỗ trợ thế nào được ghi rõ trong báo giá, để bạn biết trước khi quyết định.',
    },
    {
      id: 'idea',
      question: 'Tôi mới chỉ có ý tưởng thì sao?',
      answer: 'Vẫn được. Bạn cho biết muốn đạt điều gì và ai sẽ dùng, hai bên cùng tính xem bản chạy thử cần những gì.',
    },
  ],
}
