import type { ContentCopy } from '../types'

/** Written as one Vietnamese page, not translated field-by-field from English. */
export const viContent: ContentCopy = {
  profile: {
    location: 'Việt Nam',
    hook: 'Số hóa cách bạn làm việc, rồi để AI lo phần việc lặp lại.',
    supporting:
      'Cho cửa hàng và doanh nghiệp nhỏ. Khi đơn hàng còn nhập tay và hàng tồn nằm trong Excel, chúng tôi gom tất cả về một hệ thống. AI lo các bước lặp lại, còn việc quan trọng thì có người duyệt.',
    headerCta: 'Nhắn chúng tôi',
    availabilityLabel: 'Đang nhận dự án mới',
  },
  builds: [
    {
      slug: 'scori',
      tagline: 'Ghi điểm khi chơi bài và board game.',
      summary:
        'Thêm người chơi, ghi điểm, xem ai đang dẫn đầu. Không cần mạng. Bạn bè xem bảng điểm bằng cách quét mã QR.',
      availability: 'Chưa có trên App Store hay Google Play. iPhone và Android, 10 ngôn ngữ.',
    },
    {
      slug: 'remoti',
      tagline: 'Dùng iPhone điều khiển Android TV hoặc Google TV.',
      summary:
        'Có nút bấm, vùng vuốt và gõ chữ bằng bàn phím iPhone. Đang làm thêm: phát ảnh, video, chiếu màn hình và trình chiếu file PDF lên TV.',
      availability: 'Chưa phát hành. Chỉ có cho iPhone.',
    },
    {
      slug: 'ai-engineering-atlas',
      tagline: 'Lộ trình học AI cho lập trình viên, bắt đầu từ chỗ bạn còn thiếu.',
      summary:
        'Làm một bài kiểm tra ngắn để biết mình thiếu gì, rồi học theo lộ trình lấp chỗ thiếu.',
      availability: 'Mã nguồn mở, có tiếng Anh và tiếng Việt.',
    },
    {
      slug: 'copycat-skills',
      tagline: 'Xem thị trường trước khi quyết định làm app.',
      summary:
        'Công cụ cho trợ lý AI lập trình. Tự tìm đối thủ và nhu cầu, rồi gợi ý nên làm, nên dừng hay nên đổi hướng.',
      availability: 'Cài từ skills.sh. Mã nguồn trên GitHub.',
    },
  ],
  offers: [
    {
      id: 'systems',
      name: 'Hệ thống quản lý',
      detail:
        'ERP, CRM và hệ thống nội bộ cho đơn hàng, kho, công nợ và báo cáo, thay cho việc nhắn Zalo và ghi Excel.',
      examples: ['ERP', 'CRM', 'đơn hàng và kho', 'công nợ'],
    },
    {
      id: 'ai',
      name: 'AI agent và chatbot',
      detail:
        'AI đọc đơn hàng và hóa đơn vào hệ thống, soạn sẵn câu trả lời cho nhân viên duyệt và tìm câu trả lời trong tài liệu của bạn. Một người cụ thể duyệt mọi việc tốn tiền hoặc làm thay đổi đơn hàng và thông tin đã lưu. Chatbot nói chuyện với khách chỉ trả lời theo thông tin bạn đã đưa, nói rõ đây là trả lời tự động và chuyển cho nhân viên khi không chắc.',
      examples: ['Chatbot trả lời khách', 'đọc đơn hàng và hóa đơn', 'báo cáo hằng tuần'],
    },
    {
      id: 'data',
      name: 'Số liệu và báo cáo',
      detail:
        'Gom số liệu bán hàng, kho và khách hàng từ Excel và các app về một chỗ, rồi làm thành báo cáo để bạn quyết định.',
      examples: ['Bảng số liệu', 'báo cáo hằng tuần', 'dọn file Excel lộn xộn'],
    },
    {
      id: 'web',
      name: 'Website và ứng dụng',
      detail:
        'Website, ứng dụng web và ứng dụng điện thoại, cho việc kinh doanh hoặc ý tưởng của riêng bạn.',
      examples: ['Website', 'ứng dụng web', 'ứng dụng iPhone và Android'],
    },
    {
      id: 'iot',
      name: 'Thiết bị kết nối (IoT)',
      detail:
        'Bảng theo dõi và cảnh báo trên cảm biến, thiết bị bán sẵn, ví dụ nhiệt độ và độ ẩm. Bạn xem số ở một chỗ và nhận tin báo khi có gì bất thường. Đây là số đo dùng hằng ngày, không phải số đo có chứng nhận.',
      examples: ['Nhiệt độ và độ ẩm', 'bảng theo dõi', 'cảnh báo'],
    },
    {
      id: 'team',
      name: 'Hỗ trợ đội kỹ thuật của bạn',
      detail:
        'Chúng tôi làm cùng đội kỹ thuật của bạn, hoặc nhận một phần việc, ngay trên hệ thống bạn đang dùng.',
      examples: [],
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'Tính tiền thế nào?',
      answer:
        'Chúng tôi gửi kế hoạch và báo giá trước khi làm. Dự án bắt đầu bằng một bản chạy thử nhỏ. Dùng ổn rồi mới làm tiếp.',
    },
    {
      id: 'timeline',
      question: 'Làm mất bao lâu?',
      answer:
        'Tùy việc bạn cần. Kế hoạch ghi rõ bản chạy thử đầu tiên làm trong bao lâu, để bạn biết trước khi chúng tôi bắt đầu.',
    },
    {
      id: 'existing',
      question: 'Có thật sự cần làm phần mềm riêng không?',
      answer:
        'Nhiều khi không. Chúng tôi thử cách đơn giản nhất trước. Nếu phần mềm bán sẵn đã đủ dùng, chúng tôi sẽ nói để bạn khỏi tốn tiền.',
    },
    {
      id: 'agent',
      question: 'Tôi cần AI agent, hay chỉ cần chatbot?',
      answer:
        'Chatbot trả lời tin nhắn. AI agent làm thêm các bước trong hệ thống của bạn, ví dụ đọc một đơn hàng rồi ghi vào phần mềm. Nhiều khi chatbot hoặc một quy tắc tự động đơn giản là đủ, và khi đó chúng tôi làm đúng như vậy.',
    },
    {
      id: 'wrong',
      question: 'AI có thể sai. Ai kiểm tra?',
      answer:
        'Một người cụ thể duyệt mọi việc tốn tiền hoặc làm thay đổi đơn hàng và thông tin đã lưu, trước khi việc đó diễn ra. Thường là bạn hoặc một nhân viên của bạn. Chúng tôi chốt người đó ngay từ đầu. Chatbot nói chuyện với khách chỉ trả lời theo thông tin bạn đã đưa, và chuyển cho nhân viên khi không chắc.',
    },
    {
      id: 'customers',
      question: 'AI có nhắn tin với khách của tôi được không?',
      answer:
        'Được. AI nói rõ với khách đây là trả lời tự động và chỉ trả lời theo thông tin bạn đã đưa. Khi không chắc, hoặc khi khách muốn nói chuyện với người, AI chuyển cho nhân viên.',
    },
    {
      id: 'data',
      question: 'Thông tin khách hàng của tôi đi đâu khi dùng AI?',
      answer:
        'Chúng tôi chỉ lấy thông tin dự án cần. Trước khi bắt đầu, chúng tôi nói rõ dịch vụ AI nào sẽ nhận thông tin gì, và thống nhất ai là chủ của thông tin đó. Chúng tôi không tư vấn pháp lý.',
    },
    {
      id: 'ownership',
      question: 'Sản phẩm làm xong là của ai?',
      answer:
        'Của bạn. Mọi thứ chúng tôi làm đều đứng tên bạn, kể cả phần mềm và tài khoản. Làm xong, chúng tôi có thể tiếp tục sửa và làm thêm, hoặc bàn giao kèm hướng dẫn để bạn tự dùng.',
    },
    {
      id: 'idea',
      question: 'Tôi mới có ý tưởng thôi thì sao?',
      answer:
        'Vẫn được. Bạn cho biết muốn làm gì và cho ai dùng, chúng tôi giúp bạn bắt đầu từ bản nhỏ nhất.',
    },
  ],
}
