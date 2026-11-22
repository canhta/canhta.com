import type { PagesCopy } from '../pages'

const EMAIL = { label: 'hello@canhta.com', url: 'mailto:hello@canhta.com' }

/** Viết riêng cho người đọc tiếng Việt, không dịch từng câu từ bản tiếng Anh. */
export const viPages: PagesCopy = {
  about: {
    h1: 'Về chúng tôi',
    intro:
      'Chúng tôi giúp cửa hàng, doanh nghiệp nhỏ và cá nhân đưa công việc lên phần mềm. Sau đó AI làm các bước lặp lại, còn bạn là người duyệt.',
    sections: [
      {
        id: 'what',
        heading: 'Chúng tôi làm gì',
        paragraphs: [
          'Nhiều cửa hàng vẫn chạy bằng tin nhắn Zalo, sổ tay và file Excel. Khách nhắn đơn qua Zalo, người bán ghi vào sổ, cuối ngày lại gõ vào Excel. Chúng tôi gom việc đó về một phần mềm. Đơn nhập một lần, kho và công nợ tự cập nhật theo.',
          'Khi phần mềm đã có số liệu thật, AI mới phát huy tác dụng. Chatbot trả lời khách theo đúng bảng giá của bạn. Trợ lý AI soạn sẵn đơn hay nhập hóa đơn nhà cung cấp, rồi người bạn chọn bấm duyệt những gì liên quan đến tiền hoặc đơn hàng.',
          'Việc chúng tôi nhận rất rộng: ERP, CRM, chatbot, website, app trên web và điện thoại, báo cáo số liệu, AI agent, thiết bị cảm biến kết nối mạng, và thêm người cho nhóm đang triển khai sản phẩm.',
        ],
        links: [{ label: 'Xem các dịch vụ', page: 'services' }],
      },
      {
        id: 'how',
        heading: 'Cách chúng tôi làm',
        paragraphs: [
          'Chúng tôi bắt đầu từ việc đang làm bạn tốn nhiều thời gian hay tiền nhất. Hai bên cùng xem việc thực tế, ví dụ một đơn hàng từ lúc khách nhắn tới lúc giao, để tìm chỗ phải gõ lại hay dễ sót.',
          'Sau đó chúng tôi triển khai một bản chạy thử nhỏ trên chính công việc của bạn. Bản chạy thử không tính phí. Nó cho bạn thấy chúng tôi làm được gì và thay đổi đó đáng giá thế nào.',
          'Chỉ khi bạn đã thấy giá trị, chúng tôi mới gửi báo giá cụ thể, kế hoạch có thời gian rõ ràng và cách bảo trì, hỗ trợ. Dự án nào cũng có hợp đồng ký kết, và phần mềm làm ra thuộc về bạn.',
        ],
      },
      {
        id: 'who',
        heading: 'Chúng tôi là ai',
        paragraphs: [
          'Canh Ta là tên chúng tôi dùng khi làm việc, tại canhta.com. Chúng tôi ở Việt Nam, làm việc bằng tiếng Việt và tiếng Anh.',
          'Chúng tôi từng làm các sản phẩm có hàng trăm nghìn người dùng, ở vai trò lập trình, xử lý dữ liệu và quản lý sản phẩm.',
        ],
      },
      {
        id: 'products',
        heading: 'App chúng tôi tự làm',
        paragraphs: [
          'Ngoài dự án cho khách, chúng tôi tự triển khai và chăm chút vài app của riêng mình. Đó là cách chúng tôi giữ tay nghề, và cũng để bạn thấy chúng tôi kỹ đến từng chi tiết nhỏ.',
        ],
        items: [
          'Scori ghi điểm khi chơi bài và board game, có trên iPhone và Android.',
          'Remoti biến iPhone thành điều khiển cho Android TV và Google TV.',
          'Piggo cập nhật giá vàng của các tiệm vàng lớn ở Việt Nam.',
          'AI Engineering Atlas là lộ trình học mở cho lập trình viên chuyển sang AI.',
          'copycat-skills giúp xem thị trường trước khi bắt tay làm app.',
        ],
        links: [
          { label: 'Scori', page: 'scori' },
          { label: 'Remoti', page: 'remoti' },
          { label: 'Piggo', page: 'piggo' },
          { label: 'Tất cả sản phẩm', page: 'products' },
        ],
      },
      {
        id: 'promises',
        heading: 'Những điều chắc chắn',
        paragraphs: ['Dự án lớn hay nhỏ cũng vậy.'],
        items: [
          'Bản chạy thử không tính phí.',
          'Dự án nào cũng có hợp đồng ký kết.',
          'Phần mềm làm cho bạn thuộc về bạn.',
          'Chúng tôi nói rõ dịch vụ AI nhận những thông tin khách hàng nào.',
          'Chúng tôi trả lời trong một ngày làm việc.',
        ],
      },
      {
        id: 'reach',
        heading: 'Liên hệ',
        paragraphs: [
          'Gửi email, hoặc nhắn Zalo hay WhatsApp cho chúng tôi. Mã nguồn công khai và các ghi chép của chúng tôi có trên GitHub, X và LinkedIn.',
        ],
        links: [
          EMAIL,
          { label: 'Nhận tư vấn', page: 'contact' },
          { label: 'GitHub', url: 'https://github.com/canhta' },
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/canhta' },
        ],
      },
    ],
  },

  privacy: {
    h1: 'Chính sách quyền riêng tư',
    intro:
      'Trang web này ghi nhận gì khi bạn ghé thăm hay liên hệ, Google dùng cookie để hiện quảng cáo ở đây ra sao, và cách tắt.',
    updated: 'Cập nhật ngày 22/11/2026',
    sections: [
      {
        id: 'scope',
        heading: 'Phạm vi',
        paragraphs: [
          'Chính sách này áp dụng cho trang web www.canhta.com do Canh Ta vận hành. "Chúng tôi" là chúng tôi, "bạn" là bất kỳ ai ghé thăm trang.',
          'Các app Scori, Remoti và Piggo có chính sách quyền riêng tư riêng trên trang web của từng app. Khi bạn dùng app, chính sách của app đó được áp dụng.',
        ],
        links: [
          { label: 'Quyền riêng tư của Scori', url: 'https://scori.canhta.com/vi/privacy/' },
          { label: 'Quyền riêng tư của Remoti', url: 'https://remoti.canhta.com/vi/privacy/' },
          { label: 'Quyền riêng tư của Piggo', url: 'https://piggo.canhta.com/chinh-sach-quyen-rieng-tu' },
        ],
      },
      {
        id: 'contact',
        heading: 'Khi bạn liên hệ',
        paragraphs: [
          'Trang không có biểu mẫu và không cần đăng ký tài khoản. Muốn liên hệ, bạn bấm vào đường dẫn để mở ứng dụng email, Zalo, WhatsApp hoặc gọi điện. Bạn tự bấm gửi thì chúng tôi mới nhận được.',
          'Chúng tôi nhận những gì bạn chọn gửi. Thường là tên, email hoặc số điện thoại, và nội dung bạn kể về vấn đề muốn giải quyết.',
          'Chúng tôi dùng thông tin đó để trả lời, tư vấn, và nếu hai bên hợp tác thì để triển khai dự án. Chúng tôi không bán thông tin của bạn và không tự thêm bạn vào danh sách gửi thư. Tin nhắn qua Zalo, WhatsApp hay email đi theo chính sách riêng của từng dịch vụ đó.',
        ],
      },
      {
        id: 'visits',
        heading: 'Khi bạn xem trang',
        paragraphs: [
          'Trang được đặt trên máy chủ của Vercel. Như mọi máy chủ web, Vercel nhận địa chỉ IP, địa chỉ trang bạn mở, thời gian và loại trình duyệt, để gửi trang cho bạn và chặn truy cập phá hoại.',
          'Chúng tôi đếm lượt xem bằng Vercel Web Analytics và đo tốc độ trang bằng Vercel Speed Insights. Cả hai không dùng cookie. Chúng chỉ cho biết con số tổng, ví dụ bao nhiêu người mở trang dịch vụ, không cho biết bạn là ai.',
          'Phông chữ được lưu ngay trên máy chủ của chúng tôi, nên mở trang không kết nối tới Google Fonts. Bản thân trang không đặt cookie nào. Quảng cáo nói ở phần dưới thì có.',
        ],
      },
      {
        id: 'ads',
        heading: 'Quảng cáo của Google',
        paragraphs: [
          'Trang hiện quảng cáo do Google AdSense cung cấp. Google chọn quảng cáo bạn thấy, không phải chúng tôi.',
          'Các nhà cung cấp bên thứ ba, trong đó có Google, dùng cookie để hiện quảng cáo dựa trên những lần bạn đã vào trang này hoặc các trang web khác.',
          'Cookie quảng cáo của Google cho phép Google và đối tác hiện quảng cáo cho bạn dựa trên lượt bạn ghé trang này và các trang khác trên internet. Để hiện quảng cáo, đo hiệu quả và chống gian lận, Google cũng có thể nhận địa chỉ IP, thông tin thiết bị, trình duyệt và cách bạn tương tác với quảng cáo.',
          'Chúng tôi không gửi cho Google tên, email hay tin nhắn của bạn, và không xem được cookie mà Google đặt.',
        ],
        links: [
          { label: 'Cách Google dùng cookie trong quảng cáo', url: 'https://policies.google.com/technologies/ads?hl=vi' },
          {
            label: 'Cách Google dùng thông tin từ các trang đối tác',
            url: 'https://policies.google.com/technologies/partner-sites?hl=vi',
          },
        ],
      },
      {
        id: 'opt-out',
        heading: 'Tắt quảng cáo cá nhân hóa',
        paragraphs: [
          'Muốn Google ngừng hiện quảng cáo theo sở thích của bạn, hãy tắt quảng cáo cá nhân hóa trong phần Cài đặt quảng cáo của Google.',
          'Nhiều nhà cung cấp quảng cáo khác cho phép tắt cùng lúc tại aboutads.info. Ở châu Âu, trang youronlinechoices.eu làm việc tương tự.',
          'Bạn cũng có thể chặn hoặc xóa cookie trong phần cài đặt của trình duyệt. Quảng cáo vẫn hiện, nhưng không còn dựa trên những lần bạn đã ghé thăm.',
        ],
        links: [
          { label: 'Cài đặt quảng cáo của Google', url: 'https://www.google.com/settings/ads' },
          { label: 'aboutads.info', url: 'https://www.aboutads.info' },
          { label: 'Tắt ở các nhà cung cấp khác', url: 'https://www.aboutads.info/choices/' },
          { label: 'youronlinechoices.eu', url: 'https://www.youronlinechoices.eu' },
        ],
      },
      {
        id: 'eea',
        heading: 'Ở EEA, Anh và Thụy Sĩ',
        paragraphs: [
          'Nếu bạn truy cập từ Khu vực Kinh tế châu Âu (EEA), Vương quốc Anh hoặc Thụy Sĩ, Google sẽ hiện thông báo xin đồng ý trước khi dùng cookie quảng cáo. Bạn có thể đồng ý, từ chối, hoặc chọn theo từng mục đích.',
          'Nếu bạn từ chối, Google vẫn có thể hiện quảng cáo không dựa trên lịch sử ghé thăm. Bạn đổi lựa chọn bất cứ lúc nào qua đường dẫn cài đặt quyền riêng tư và cookie trên trang.',
        ],
      },
      {
        id: 'keep',
        heading: 'Lưu giữ bao lâu',
        paragraphs: [
          'Chúng tôi giữ tin nhắn của bạn trong thời gian hai bên còn trao đổi hay hợp tác, và sau đó trong thời gian hợp đồng hoặc pháp luật yêu cầu. Số liệu lượt xem không có tên ai.',
        ],
      },
      {
        id: 'rights',
        heading: 'Quyền của bạn',
        paragraphs: [
          'Bạn có thể hỏi chúng tôi đang giữ thông tin gì về bạn, yêu cầu sửa hoặc xóa. Gửi email tới hello@canhta.com, chúng tôi trả lời trong một ngày làm việc.',
          'Tùy nơi bạn sống, pháp luật có thể cho bạn thêm quyền khác, ví dụ khiếu nại tới cơ quan bảo vệ dữ liệu cá nhân ở nước bạn.',
        ],
        links: [EMAIL],
      },
      {
        id: 'children',
        heading: 'Trẻ em',
        paragraphs: [
          'Trang dành cho người lớn đang tìm phần mềm cho công việc kinh doanh hay ý tưởng của mình. Trang không hướng tới trẻ em, và chúng tôi không cố ý thu thập thông tin của trẻ em.',
        ],
      },
      {
        id: 'changes',
        heading: 'Khi chính sách thay đổi',
        paragraphs: [
          'Khi trang ghi nhận thêm hay bớt điều gì, ví dụ thêm loại quảng cáo mới hay cách liên hệ mới, chúng tôi cập nhật trang này và ngày ở trên cùng.',
        ],
      },
    ],
  },

  terms: {
    h1: 'Điều khoản sử dụng',
    intro: 'Quy định khi dùng trang web này. Công việc chúng tôi làm cho bạn có hợp đồng ký kết riêng.',
    updated: 'Cập nhật ngày 22/11/2026',
    sections: [
      {
        id: 'accept',
        heading: 'Về điều khoản',
        paragraphs: [
          'Điều khoản này áp dụng khi bạn dùng www.canhta.com do Canh Ta vận hành. Dùng trang nghĩa là bạn đồng ý với điều khoản. Nếu không đồng ý, xin bạn đừng dùng trang.',
        ],
      },
      {
        id: 'info',
        heading: 'Trang dùng để làm gì',
        paragraphs: [
          'Trang giới thiệu dịch vụ và một vài sản phẩm của chúng tôi. Đây là thông tin chung, không phải lời chào bán, báo giá hay tư vấn thuế, pháp lý.',
          'Chúng tôi chỉ đưa giá trong báo giá bằng văn bản, sau khi bạn đã xem bản chạy thử. Công việc hai bên làm cùng nhau theo hợp đồng ký kết. Chỗ nào hợp đồng khác với trang này thì theo hợp đồng.',
        ],
      },
      {
        id: 'ownership',
        heading: 'Quyền sở hữu nội dung',
        paragraphs: [
          'Chữ, hình và thiết kế trên trang thuộc về chúng tôi. Tên và nhãn hiệu của công ty khác như Zalo, Google, Apple hay Android thuộc về chủ sở hữu của họ.',
          'Bạn được dẫn link tới bất kỳ trang nào và trích một đoạn ngắn kèm link về trang gốc. Xin đừng sao chép cả trang hoặc phần lớn nội dung.',
        ],
      },
      {
        id: 'fair-use',
        heading: 'Dùng trang đúng mực',
        paragraphs: [
          'Không cố xâm nhập, làm quá tải trang, hay dùng trang để phát tán thư rác hoặc mã độc. Không dùng công cụ tự động để sao chép hàng loạt.',
        ],
      },
      {
        id: 'apps',
        heading: 'Các app của chúng tôi',
        paragraphs: [
          'Scori, Remoti và Piggo có trang web riêng với trang hỗ trợ và quyền riêng tư riêng. Scori và Piggo còn có điều khoản riêng. Khi dùng app thì áp dụng các trang đó. Việc mua trong app do Apple hoặc Google xử lý.',
        ],
        links: [
          { label: 'Điều khoản của Scori', url: 'https://scori.canhta.com/vi/terms/' },
          { label: 'Điều khoản của Piggo', url: 'https://piggo.canhta.com/dieu-khoan-su-dung' },
          { label: 'Hỗ trợ Remoti', url: 'https://remoti.canhta.com/vi/support/' },
        ],
      },
      {
        id: 'links',
        heading: 'Đường dẫn ra ngoài',
        paragraphs: [
          'Trang có đường dẫn tới trang khác như Zalo, WhatsApp, GitHub và trang của các app. Chúng tôi không quản lý những trang đó, nên không chịu trách nhiệm về nội dung hay cách họ xử lý thông tin của bạn.',
        ],
      },
      {
        id: 'ads',
        heading: 'Quảng cáo',
        paragraphs: [
          'Trang có quảng cáo do Google cung cấp. Quảng cáo không phải lời giới thiệu của chúng tôi. Chính sách quyền riêng tư giải thích quảng cáo dùng cookie thế nào và cách tắt quảng cáo cá nhân hóa.',
        ],
        links: [{ label: 'Chính sách quyền riêng tư', page: 'privacy' }],
      },
      {
        id: 'warranty',
        heading: 'Không bảo đảm tuyệt đối',
        paragraphs: [
          'Chúng tôi cố giữ trang chính xác và luôn chạy, nhưng không thể hứa trang lúc nào cũng truy cập được hay không có sai sót. Trang được cung cấp đúng như hiện có.',
          'Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm về thiệt hại phát sinh từ việc dùng trang hay dựa vào nội dung trên trang. Điều này không làm mất những quyền mà pháp luật bảo vệ cho bạn.',
        ],
      },
      {
        id: 'law',
        heading: 'Luật áp dụng',
        paragraphs: ['Điều khoản này tuân theo pháp luật Việt Nam.'],
      },
      {
        id: 'changes',
        heading: 'Thay đổi và câu hỏi',
        paragraphs: [
          'Chúng tôi có thể cập nhật điều khoản. Ngày ở trên cùng cho biết bản mới nhất. Có câu hỏi, xin gửi tới hello@canhta.com.',
        ],
        links: [EMAIL],
      },
    ],
  },

  apps: {
    scori: {
      h1: 'Scori giữ điểm giúp bạn',
      intro: 'Một bảng điểm cho mọi ván bài và board game. Cả bàn cùng thấy một con số.',
      audience:
        'Cho nhóm bạn và gia đình hay chơi bài, board game hay trò chơi tập thể, ngại ghi điểm ra giấy rồi cộng nhầm. Một người ghi điểm, những người khác xem ngay trên điện thoại của mình.',
      features: [
        {
          name: 'Trò nào cũng được',
          detail: 'Thêm người chơi, ghi điểm từng ván và xem ai đang dẫn. Dùng cho bài, board game hay bất cứ trò gì có tính điểm.',
        },
        {
          name: 'Không cần mạng',
          detail: 'Ván chơi, lịch sử và việc sửa điểm đều chạy trên một máy, không cần internet.',
        },
        {
          name: 'Vào xem bằng mã QR',
          detail: 'Bạn bè quét mã hoặc mở đường dẫn là xem điểm trên điện thoại của mình, trong app hoặc trên trình duyệt.',
        },
        {
          name: 'Sửa khi ghi nhầm',
          detail: 'Mở lịch sử ván, chọn lượt cần sửa rồi xác nhận. Nút hoàn tác đưa lại thay đổi gần nhất.',
        },
        {
          name: 'Chia sẻ kết quả',
          detail: 'Gửi bảng điểm cuối cùng cho cả nhóm dưới dạng ảnh.',
        },
        {
          name: 'Mười ngôn ngữ',
          detail:
            'Tiếng Việt, tiếng Anh, tiếng Trung giản thể và phồn thể, tiếng Nhật, tiếng Hàn, tiếng Đức, tiếng Pháp, tiếng Tây Ban Nha và tiếng Bồ Đào Nha (Brazil). App theo ngôn ngữ của điện thoại.',
        },
      ],
      platforms: 'iPhone và Android. Dành cho người từ 13 tuổi.',
      notes: [
        {
          id: 'privacy',
          heading: 'Thông tin của bạn',
          paragraphs: [
            'Ván chơi trên một máy nằm luôn trên máy đó, không cần tài khoản. Khi chia sẻ ván, tên và điểm được lưu trên Firebase để mọi người thấy cùng một bảng. Đăng nhập bằng Apple hay Google là tùy bạn, và bạn có thể xóa tài khoản trong phần Cài đặt.',
          ],
        },
      ],
      links: [
        { label: 'Trang Scori', url: 'https://scori.canhta.com/vi/' },
        { label: 'Hỗ trợ', url: 'https://scori.canhta.com/vi/support/' },
        { label: 'Quyền riêng tư', url: 'https://scori.canhta.com/vi/privacy/' },
        { label: 'Điều khoản', url: 'https://scori.canhta.com/vi/terms/' },
      ],
    },
    remoti: {
      h1: 'iPhone thành điều khiển TV',
      intro: 'Remoti điều khiển Android TV và Google TV ngay trên iPhone, qua Wi-Fi ở nhà.',
      audience:
        'Cho người dùng Android TV hay Google TV hay để lạc điều khiển, hết pin giữa chừng, hoặc ngại bấm từng chữ bằng phím mũi tên.',
      features: [
        {
          name: 'Bốn kiểu bố trí',
          detail: 'Classic Pad, Large Controls, Touch Pad và Hybrid Pad. Phím bấm quen thuộc, và Remoti nhớ kiểu bạn chọn.',
        },
        {
          name: 'Vùng vuốt',
          detail: 'Vuốt và chạm để di chuyển trong menu của TV.',
        },
        {
          name: 'Gõ chữ bằng iPhone',
          detail: 'Gõ vào ô nhập chữ trên TV bằng bàn phím iPhone, tiếng Việt hoặc tiếng Anh, ở những ô TV hỗ trợ.',
        },
        {
          name: 'Lưu nhiều TV',
          detail: 'Lưu nhiều TV và kết nối lại với TV dùng gần nhất.',
        },
        {
          name: 'Cài đặt đơn giản',
          detail: 'Cho iPhone và TV dùng chung Wi-Fi, chọn TV, rồi nhập mã ghép nối hiện trên màn hình.',
        },
      ],
      platforms: 'iPhone chạy iOS 17 trở lên. Dùng với Android TV và Google TV.',
      notes: [
        {
          id: 'privacy',
          heading: 'Thông tin của bạn',
          paragraphs: [
            'TV đã lưu và thông tin ghép nối nằm trên iPhone của bạn. Chữ bạn gõ chỉ gửi tới TV đã ghép nối, Remoti không lưu lại.',
          ],
        },
      ],
      links: [
        { label: 'Trang Remoti', url: 'https://remoti.canhta.com/vi/' },
        { label: 'Hỗ trợ', url: 'https://remoti.canhta.com/vi/support/' },
        { label: 'Quyền riêng tư', url: 'https://remoti.canhta.com/vi/privacy/' },
      ],
    },
    piggo: {
      h1: 'Piggo theo dõi giá vàng',
      intro: 'Giá vàng của các tiệm vàng lớn ở Việt Nam gom về một chỗ, có biểu đồ, công cụ tính và sổ ghi tài sản.',
      audience:
        'Cho người mua vàng hay gửi tiết kiệm, muốn xem giá trước khi ra tiệm vàng hay ra ngân hàng.',
      features: [
        {
          name: 'Giá vàng hôm nay',
          detail:
            'Giá mua, giá bán vàng miếng SJC, nhẫn 9999, vàng 18K và 24K của 13 thương hiệu như SJC, DOJI, PNJ, Bảo Tín Minh Châu, kèm giờ niêm yết.',
        },
        {
          name: 'Biểu đồ và so sánh',
          detail: 'Xem giá lên xuống thế nào và so sánh các thương hiệu cạnh nhau.',
        },
        {
          name: 'Vàng thế giới, tỷ giá',
          detail: 'Giá vàng thế giới, tỷ giá ngoại tệ và lãi suất tiết kiệm ngân hàng, đặt cạnh giá trong nước.',
        },
        {
          name: 'Công cụ tính',
          detail: 'Tính lãi lỗ vàng đang giữ, quy đổi đơn vị vàng, và tính lãi tiết kiệm.',
        },
        {
          name: 'Cảnh báo giá',
          detail: 'Nhận thông báo khi giá chạm mức bạn đặt. Không cần tài khoản.',
        },
        {
          name: 'Sổ tài sản',
          detail:
            'Ghi lại vàng và tiền tiết kiệm bạn đang có. Đăng nhập Google hoặc Apple để đồng bộ, xuất ra tệp CSV, và khóa app bằng khuôn mặt hoặc vân tay.',
        },
      ],
      platforms: 'Trang web piggo.canhta.com bằng tiếng Việt và tiếng Anh, cùng app cho iPhone và Android.',
      notes: [
        {
          id: 'privacy',
          heading: 'Thông tin của bạn',
          paragraphs: [
            'Giá, biểu đồ, danh sách theo dõi và cài đặt nằm trên máy của bạn. Piggo không thu số điện thoại, tên hay email. Chỉ cần đăng nhập khi muốn đồng bộ sổ tài sản, và bạn xuất hay xóa sổ lúc nào cũng được.',
          ],
        },
      ],
      links: [
        { label: 'Trang Piggo', url: 'https://piggo.canhta.com/' },
        { label: 'Quyền riêng tư', url: 'https://piggo.canhta.com/chinh-sach-quyen-rieng-tu' },
        { label: 'Điều khoản', url: 'https://piggo.canhta.com/dieu-khoan-su-dung' },
      ],
    },
  },
}
