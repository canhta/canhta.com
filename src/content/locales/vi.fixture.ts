import type { ContentCopy } from '../types'

/** Written as one Vietnamese page, not translated field-by-field from English. */
export const viContent: ContentCopy = {
  profile: {
    location: 'Việt Nam',
    hook: 'Số hóa cách bạn làm việc, rồi để AI làm thay phần lặp lại.',
    supporting:
      'ERP, CRM, chatbot, website, dữ liệu, IoT và AI agent cho doanh nghiệp nhỏ và cá nhân. Chúng tôi bắt đầu từ cách bạn đang làm việc, rồi chuyển dần sang hệ thống mới.',
    headerCta: 'Liên hệ',
    availabilityLabel: 'Đang nhận dự án mới',
  },
  builds: [
    {
      slug: 'scori',
      tagline: 'Ghi điểm khi chơi bài và board game.',
      summary:
        'Thêm người chơi, ghi điểm, xem ai đang dẫn đầu. Không cần mạng. Bạn bè xem bảng điểm bằng cách quét mã QR.',
      availability: 'Chưa có trên cửa hàng ứng dụng. iPhone và Android, 10 ngôn ngữ.',
    },
    {
      slug: 'remoti',
      tagline: 'Dùng iPhone điều khiển Android TV hoặc Google TV.',
      summary:
        'Có nút bấm, bàn di chuột và gõ chữ bằng bàn phím iPhone. Đang làm thêm: phát ảnh, video, chiếu màn hình và trình chiếu file PDF lên TV.',
      availability: 'Chưa phát hành. Chỉ có cho iPhone.',
    },
    {
      slug: 'ai-engineering-atlas',
      tagline: 'Lộ trình học AI cho lập trình viên, bắt đầu từ chỗ bạn còn thiếu.',
      summary:
        'Làm một bài kiểm tra ngắn để biết mình thiếu gì, rồi nhận lộ trình ngắn nhất đến một dự án thực hành.',
      availability: 'Mã nguồn mở, có tiếng Anh và tiếng Việt.',
    },
    {
      slug: 'copycat-skills',
      tagline: 'Xem thị trường trước khi quyết định làm app.',
      summary:
        'Công cụ cho trợ lý AI lập trình: tự tìm đối thủ và nhu cầu, rồi gợi ý nên làm, nên dừng hay nên đổi hướng.',
      availability: 'Cài từ skills.sh. Mã nguồn trên GitHub.',
    },
  ],
  offers: [
    {
      id: 'systems',
      name: 'Hệ thống quản lý',
      detail:
        'ERP, CRM, đơn hàng, kho và hệ thống nội bộ, thay cho việc nhắn Zalo và ghi Excel.',
      examples: ['ERP', 'CRM', 'Đơn hàng và kho', 'Hệ thống nội bộ'],
    },
    {
      id: 'ai',
      name: 'AI agent và chatbot',
      detail:
        'AI đọc, trả lời và làm các bước lặp lại ngay trong hệ thống của bạn. Việc quan trọng vẫn do người duyệt.',
      examples: ['Chatbot chăm sóc khách', 'Đọc đơn hàng và chứng từ', 'Tự động hóa quy trình'],
    },
    {
      id: 'data',
      name: 'Dữ liệu và báo cáo',
      detail:
        'Gom dữ liệu rải rác về một chỗ, làm sạch, rồi thành báo cáo để bạn ra quyết định.',
      examples: ['Biểu đồ quản trị', 'Báo cáo', 'Làm sạch dữ liệu'],
    },
    {
      id: 'web',
      name: 'Website và ứng dụng',
      detail:
        'Website, ứng dụng web và ứng dụng điện thoại, cho doanh nghiệp hoặc ý tưởng của riêng bạn.',
      examples: ['Website', 'Ứng dụng web', 'Ứng dụng iPhone và Android'],
    },
    {
      id: 'iot',
      name: 'Thiết bị kết nối (IoT)',
      detail:
        'Kết nối cảm biến và thiết bị vào hệ thống để theo dõi và điều khiển ở một nơi.',
      examples: ['Cảm biến', 'Theo dõi thiết bị', 'Cảnh báo'],
    },
    {
      id: 'team',
      name: 'Thêm người cho đội của bạn',
      detail:
        'Chúng tôi làm cùng đội lập trình của bạn, hoặc nhận một phần việc, ngay trên hệ thống bạn đang dùng.',
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
      id: 'ownership',
      question: 'Sản phẩm làm xong là của ai?',
      answer: 'Của bạn. Mã nguồn, tài khoản và hệ thống đều đứng tên bạn.',
    },
    {
      id: 'existing',
      question: 'Có thật sự cần làm phần mềm riêng không?',
      answer:
        'Nhiều khi không. Nếu phần mềm bán sẵn đã đủ dùng, chúng tôi sẽ nói để bạn khỏi tốn tiền.',
    },
    {
      id: 'idea',
      question: 'Tôi mới có ý tưởng thôi thì sao?',
      answer:
        'Vẫn được. Bạn cho biết muốn làm gì và cho ai dùng, chúng tôi giúp bạn bắt đầu từ bản nhỏ nhất.',
    },
    {
      id: 'team',
      question: 'Làm chung với đội của tôi được không?',
      answer: 'Được. Chúng tôi làm cùng đội của bạn, hoặc nhận một phần việc rồi bàn giao.',
    },
    {
      id: 'after',
      question: 'Làm xong rồi thì sao?',
      answer:
        'Chúng tôi có thể tiếp tục sửa và cải tiến, hoặc bàn giao kèm hướng dẫn để bạn tự vận hành.',
    },
  ],
}
