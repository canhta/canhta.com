import type { ContentCopy } from '../types'

/** Written as one Vietnamese page, not translated field-by-field from English. */
export const viContent: ContentCopy = {
  profile: {
    location: 'Việt Nam',
    hook: 'Đơn hàng chỉ phải nhập một lần.',
    supporting:
      'Đơn hàng, kho và công nợ nằm chung một hệ thống, không ai phải gõ lại. Sau đó AI đọc tin nhắn và hóa đơn, ghi sẵn vào đó, chờ một người duyệt.',
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
        'Đơn hàng, khách, hàng trong kho và công nợ đều có một chỗ ghi duy nhất, không ai phải gõ lại. Nhập đơn một lần, kho tự trừ và công nợ của khách tự cập nhật.',
      examples: ['ERP', 'CRM', 'đơn hàng và kho', 'công nợ'],
    },
    {
      id: 'ai',
      name: 'AI agent và chatbot',
      detail:
        'AI đọc tin nhắn đặt hàng hoặc hóa đơn gửi đến, ghi vào hệ thống và soạn sẵn câu trả lời. Việc nào tốn tiền hoặc sửa đơn hàng đều chờ một người duyệt, và mọi bước được ghi lại.',
      examples: ['Chatbot trả lời khách', 'đọc đơn hàng và hóa đơn', 'báo cáo hằng tuần'],
    },
    {
      id: 'data',
      name: 'Số liệu và báo cáo',
      detail:
        'Số liệu bán hàng, kho và khách từ Excel và các app, gom thành một báo cáo tự cập nhật. Sáng thứ Hai bạn xem được tình hình mà không phải hỏi ai.',
      examples: ['Bảng số liệu', 'báo cáo hằng tuần', 'dọn file Excel lộn xộn'],
    },
    {
      id: 'web',
      name: 'Website và ứng dụng',
      detail:
        'Website cho khách đặt hàng hoặc đặt lịch, đơn về thẳng hệ thống của bạn. Cũng triển khai ứng dụng web và điện thoại cho ý tưởng riêng của bạn.',
      examples: ['Website', 'ứng dụng web', 'ứng dụng iPhone và Android'],
    },
    {
      id: 'iot',
      name: 'Thiết bị kết nối (IoT)',
      detail:
        'Cảm biến bán sẵn gửi nhiệt độ và độ ẩm về một màn hình, và bạn nhận cảnh báo khi số đo vượt mức bạn đặt. Số đo thường ngày, không có chứng nhận.',
      examples: ['Nhiệt độ và độ ẩm', 'bảng theo dõi', 'cảnh báo'],
    },
    {
      id: 'team',
      name: 'Hỗ trợ đội kỹ thuật của bạn',
      detail:
        'Chúng tôi cùng triển khai với đội của bạn một thời gian, hoặc nhận riêng một phần, như ứng dụng điện thoại hay phần nối hai hệ thống. Triển khai trên hệ thống bạn đang dùng, theo cách đội bạn làm việc.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'Tính tiền thế nào?',
      answer:
        'Bạn nhận kế hoạch và báo giá trước khi triển khai. Bản chạy thử nhỏ báo giá riêng, ổn rồi mới bàn phần tiếp theo.',
    },
    {
      id: 'timeline',
      question: 'Làm mất bao lâu?',
      answer: 'Kế hoạch ghi rõ bản chạy thử nhỏ triển khai trong bao lâu. Mỗi phần tiếp theo có thời gian riêng trước khi bắt đầu.',
    },
    {
      id: 'existing',
      question: 'Có thật sự cần phần mềm riêng không?',
      answer: 'Nhiều khi không. Nếu phần mềm bán sẵn đã đủ dùng, chúng tôi sẽ nói, và chỉ triển khai phần nó chưa đáp ứng được.',
    },
    {
      id: 'agent',
      question: 'Tôi cần AI agent, hay chỉ cần chatbot?',
      answer:
        'Chatbot trả lời câu hỏi theo bảng giá của bạn. AI agent còn đọc đơn hàng, kiểm tra kho và soạn câu trả lời, và nhiều khi chatbot là đủ.',
    },
    {
      id: 'wrong',
      question: 'AI có thể sai. Ai kiểm tra?',
      answer:
        'Một người cụ thể, chốt từ đầu, duyệt mọi việc tốn tiền hoặc làm thay đổi đơn hàng và thông tin đã lưu. AI đánh dấu chỗ đáng ngờ, như tổng hóa đơn không khớp, và ghi lại mọi bước.',
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
      question: 'Triển khai xong, sản phẩm là của ai?',
      answer: 'Của bạn. Mọi thứ đứng tên bạn, chúng tôi có thể triển khai tiếp hoặc bàn giao kèm hướng dẫn.',
    },
    {
      id: 'idea',
      question: 'Tôi mới có ý tưởng thôi thì sao?',
      answer: 'Vẫn được. Cho biết bạn muốn làm gì và cho ai dùng, chúng tôi bắt đầu từ bản nhỏ nhất.',
    },
  ],
}
