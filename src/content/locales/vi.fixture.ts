import type { ContentCopy } from '../types'

/** Written as one Vietnamese page, not translated field-by-field from English. */
export const viContent: ContentCopy = {
  profile: {
    location: 'Việt Nam',
    hook: 'Sửa đúng chỗ đang làm doanh nghiệp chậm lại.',
    supporting:
      'Tôi cùng bạn bóc tách quy trình, rồi mới quyết định: dùng công cụ có sẵn, nối các hệ thống, làm phần mềm riêng hay áp dụng AI. Có plan và báo giá trước khi code.',
    ctaLabel: 'Gửi bài toán đang vướng',
    availabilityLabel: 'Đang nhận dự án mới',
    spec: [
      { id: 'location', label: 'Làm việc tại', value: 'Việt Nam · GMT+7' },
      { id: 'languages', label: 'Làm việc bằng', value: 'Tiếng Việt · English' },
      { id: 'replyTime', label: 'Thường trả lời trong', value: '1 ngày làm việc' },
      { id: 'nowBuilding', label: 'Đang làm', value: 'Reupmatic · PixelBid' },
    ],
  },
  builds: [
    {
      slug: 'reupmatic',
      tagline: 'Desktop app xử lý một loạt video Douyin ngay trên máy.',
      problem: 'Mỗi video phải qua cùng một loạt bước: tải, chỉnh, làm phụ đề và tạo giọng đọc.',
      built: 'Gom các bước đó thành một hàng đợi tự chạy cho cả loạt video.',
      result: 'Bản alpha đã chạy trên macOS và Windows. Tôi đang làm tiếp tính năng đăng trực tiếp.',
    },
    {
      slug: 'ai-engineering-atlas',
      tagline: 'Roadmap AI bắt đầu từ phần người học còn thiếu.',
      problem: 'Dev đã đi làm thường biết AI không đều, nhưng phần lớn roadmap vẫn bắt học lại từ đầu.',
      built: 'Một bài kiểm tra tìm lỗ hổng, rồi tạo lộ trình ngắn nhất kèm project thực hành.',
      result: 'Mã nguồn mở và bản web đều đang chạy; nội dung tiếp tục được bổ sung.',
    },
    {
      slug: 'copycat-skills',
      tagline: 'Kiểm tra thị trường trước khi quyết định có nên làm app.',
      problem: 'Chỉ nhìn một sản phẩm rồi đoán thị trường rất dễ dẫn đến làm nhầm thứ.',
      built: 'Agent skill tự tìm đối thủ, tín hiệu nhu cầu và đề xuất làm, bỏ hoặc đổi hướng.',
      result: 'Đã phát hành trên skills.sh, có mã nguồn công khai.',
    },
    {
      slug: 'pixelbid',
      tagline: 'Bản dựng chạy được của một game đấu giá từng nổi trên X.',
      problem: 'Tôi muốn hiểu cơ chế đấu giá thật sự, không chỉ nhìn giao diện rồi đoán.',
      built: 'Một chợ mua sự chú ý bằng credit: mỗi lượt mở hợp lệ trừ một credit.',
      result: 'Đang làm như side project. Ý tưởng gốc từ outbid.lol.',
    },
  ],
  capabilities: [
    {
      id: 'agentic',
      name: 'AI cho phần việc lặp lại',
      bestFor: 'Team đang đọc, phân loại, tổng hợp hoặc trả lời cùng một loại dữ liệu mỗi ngày.',
      canDeliver: 'AI xử lý phần lặp lại trong hệ thống đang dùng; việc quan trọng vẫn chuyển cho người phụ trách duyệt.',
    },
    {
      id: 'mobile',
      name: 'Đưa việc hiện trường lên hệ thống',
      bestFor: 'Nhân viên đang nhận việc, ghi chép hoặc báo cáo bằng giấy, chat và bảng tính.',
      canDeliver: 'App mobile bám đúng luồng công việc và vẫn dùng được khi mạng yếu.',
    },
    {
      id: 'web',
      name: 'Nối một quy trình đang rời rạc',
      bestFor: 'Dữ liệu phải copy qua nhiều file, nhóm chat hoặc phần mềm không nói chuyện với nhau.',
      canDeliver: 'Phần mềm nội bộ nối các bước lại, giảm nhập tay và cho biết mỗi việc đang ở đâu.',
    },
    {
      id: 'saas',
      name: 'Thử một sản phẩm số mới',
      bestFor: 'Doanh nghiệp có một dịch vụ hoặc nguồn doanh thu mới nhưng chưa biết khách có dùng không.',
      canDeliver: 'Bản SaaS nhỏ đủ để khách dùng thật, trả tiền và cho biết phần nào đáng làm tiếp.',
    },
  ],
  services: [
    {
      id: 'advisory',
      name: 'Tìm đúng nút thắt',
      output: 'Quy trình hiện tại, hướng xử lý, phần nên làm trước, plan và báo giá.',
      suitedTo: 'Bạn thấy công việc đang chậm nhưng chưa biết nên sửa quy trình hay làm phần mềm.',
    },
    {
      id: 'sprint',
      name: 'Cho một luồng chạy thật',
      output: 'Một luồng quan trọng được team dùng với dữ liệu thật.',
      suitedTo: 'Bạn muốn kiểm chứng hiệu quả trước khi mở rộng sang cả hệ thống.',
    },
    {
      id: 'endToEnd',
      name: 'Làm trọn hệ thống',
      output: 'Phần mềm đã đưa vào vận hành, kèm tài liệu, bàn giao và phương án bảo trì.',
      suitedTo: 'Bạn muốn một người chịu trách nhiệm từ lúc bóc tách đến khi hệ thống chạy ổn.',
    },
  ],
  faq: [
    {
      id: 'pricing',
      question: 'Chi phí tính thế nào?',
      answer: 'Sau khi bóc tách quy trình và chốt phần cần làm, tôi gửi plan, mốc bàn giao và báo giá trước khi code.',
    },
    {
      id: 'ownership',
      question: 'Code thuộc về ai?',
      answer: 'Code, tài khoản và hạ tầng đều là của bạn. Tôi bàn giao đầy đủ khi xong.',
    },
    {
      id: 'vague',
      question: 'Chưa biết nên dùng phần mềm, automation hay AI thì sao?',
      answer: 'Không sao. Chúng ta bắt đầu từ người đang làm, các bước đang chạy và kết quả cần đạt. Công nghệ được chọn sau; có khi kết luận là chưa cần code.',
    },
    {
      id: 'team',
      question: 'Làm cùng team hiện tại được không?',
      answer: 'Được. Tôi có thể làm cùng team của bạn, hoặc làm xong rồi bàn giao để team tiếp tục.',
    },
    {
      id: 'after',
      question: 'Sau khi ra mắt thì sao?',
      answer:
        'Tôi có thể tiếp tục sửa và cải tiến, hoặc bàn giao kèm tài liệu để team bạn tiếp quản.',
    },
    {
      id: 'agency',
      question: 'Khi nào nên làm phần mềm theo yêu cầu?',
      answer:
        'Khi công cụ có sẵn buộc team phải lách quá nhiều, nhập lại dữ liệu hoặc không theo được quy trình cốt lõi. Nếu tool có sẵn đã đủ, nên dùng nó thay vì viết lại từ đầu.',
    },
  ],
}
