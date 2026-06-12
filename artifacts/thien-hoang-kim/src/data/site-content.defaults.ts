import { DEFAULT_ARTICLES } from "@/data/articles.defaults";
import type { SiteContent } from "@/types/site-content";

const publicAsset = (file: string) =>
  `${import.meta.env.BASE_URL}${encodeURI(file)}`.replace(/([^:]\/)\/+/g, "$1");

const slideshow = publicAsset("Slideshow.png");
const slideshow2 = publicAsset("slideshow2.png");
const slideshow3 = publicAsset("slideshow3.jpg");
const slideshow123 = publicAsset("slideshow123.jpg");
const haleeTram = publicAsset("Halee Trâm.jpg");
const haleeTram1 = publicAsset("Halee Trâm 1.jpg");
const gioithieu = publicAsset("gioithieu.1.png");
const mssNhan = publicAsset("Mss Nhàn.jpg");
const mssThuLee = publicAsset("Mss Thu Lee.jpg");
const feedbackHV = publicAsset("Feedback HV 1.jpg");
const feedbackKH = publicAsset("Feedback KH 1.jpg");

export const DEFAULT_SITE_CONTENT: SiteContent = {
  version: 3,
  settings: {
    clinicName: "HALEE TRÂM",
    clinicSubtitle: "Eyelash / Nail / Academy",
    slogan: "Tỏa Sáng Vẻ Đẹp Của Bạn",
    address: "793/62 Trần Xuân Soạn, Phường Tân Hưng, Quận 7, TP. Hồ Chí Minh",
    phone: "0938162662",
    email: "haleetram.studio@gmail.com",
    hours: "09:00 - 20:00 (Thứ 2 - Chủ Nhật)",
    messengerSlug: "haleetram",
    topbarAddress: "793/62 Trần Xuân Soạn, Phường Tân Hưng, Quận 7, TP. Hồ Chí Minh",
    topbarHours: "Thứ 2 - Chủ nhật: 09:00 - 20:00",
    websiteUrl: "/",
    websiteLabel: "haleetram.studio",
    facebookUrl: "#",
    tiktokUrl: "#",
    youtubeUrl: "#",
    seo: {
      siteName: "Halee Trâm — Eyelash / Nail / Academy",
      siteUrl: "https://haleetram.vercel.app",
      title: "Halee Trâm | Nails, Nối Mi, Uốn Mi & Đào Tạo Nghề",
      titleSeparator: " | ",
      description:
        "Halee Trâm Eyelash / Nail / Academy tại Quận 7 — nails, nối mi, uốn mi, định hình chân mày và khóa đào tạo nghề. Hotline 0938 162 662.",
      keywords:
        "Halee Trâm, nối mi Quận 7, nails Quận 7, uốn mi, đào tạo nối mi, học nail, eyelash academy, salon làm đẹp TP.HCM",
      ogImage: slideshow123,
      ogTitle: "Halee Trâm | Eyelash / Nail / Academy",
      ogDescription:
        "Làm đẹp & đào tạo nghề tại Quận 7 — đặt lịch 0938 162 662.",
      twitterCard: "summary_large_image",
      robots: "index,follow",
      locale: "vi_VN",
      googleSiteVerification: "",
      bingSiteVerification: "",
      facebookAppId: "",
      schemaEnabled: true,
      breadcrumbsEnabled: true,
      organizationType: "BeautySalon",
      organizationLogo: publicAsset("logo-halee-tram.jpg"),
      priceRange: "$$",
      robotsTxtExtra: "",
    },
  },
  home: {
    heroSlides: [
      {
        id: "slideshow-1",
        src: slideshow123,
        alt: "Halee Trâm — Eyelash / Nail / Academy",
      },
    ],
    commitmentsTitle: "CAM KẾT TỪ HALEE TRÂM",
    commitmentsSubtitle:
      "Chất lượng sản phẩm, kỹ thuật chuẩn salon và phục vụ tận tâm — Halee Trâm cam kết với từng khách hàng và học viên",
    commitments: [
      {
        id: "c1",
        icon: "Shield",
        title: "SẢN PHẨM CHẤT LƯỢNG",
        desc: "Mực, keo, sơn và dụng cụ đạt chuẩn, an toàn cho da và móng",
      },
      {
        id: "c2",
        icon: "Sparkles",
        title: "KỸ THUẬT CHUYÊN NGHIỆP",
        desc: "Đội ngũ được đào tạo bài bản, cập nhật xu hướng làm đẹp mới",
      },
      {
        id: "c3",
        icon: "Heart",
        title: "PHỤC VỤ TẬN TÂM",
        desc: "Lắng nghe mong muốn và tư vấn phong cách phù hợp từng khách",
      },
      {
        id: "c4",
        icon: "Stethoscope",
        title: "VỆ SINH CHUẨN SALON",
        desc: "Dụng cụ tiệt trùng, không gian sạch sẽ và riêng tư",
      },
      {
        id: "c5",
        icon: "FileText",
        title: "BẢO HÀNH DỊCH VỤ",
        desc: "Hỗ trợ chỉnh sửa mi, móng trong thời gian bảo hành",
      },
      {
        id: "c6",
        icon: "TestTube",
        title: "ĐÀO TẠO THỰC CHIẾN",
        desc: "Khóa học có lộ trình rõ ràng, thực hành trên model thật",
      },
    ],
    aboutEyebrow: "GIỚI THIỆU",
    aboutTitle: "HALEE TRÂM",
    aboutSubtitle: "Eyelash / Nail / Academy",
    aboutParagraphs: [
      "Halee Trâm Eyelash / Nail / Academy là studio làm đẹp và trung tâm đào tạo nghề tại Quận 7, TP.HCM. Chúng tôi chuyên nails, nối mi, uốn mi, định hình chân mày, chà gót chân và gội đầu thư giãn.",
      "Không chỉ là nơi làm đẹp, Halee Trâm còn mở các khóa học nối mi salon, nail chuyên nghiệp, uốn mi và định hình chân mày — giúp học viên nắm kỹ thuật vững, tự tin ra nghề và mở tiệm riêng.",
      "Hotline đặt lịch: 0938 162 662 — 793/62 Trần Xuân Soạn, Phường Tân Hưng, Quận 7.",
    ],
    aboutStats: [
      { value: "6", title: "Năm kinh nghiệm", sub: "Trong ngành làm đẹp" },
      { value: "1000+", title: "Khách hàng", sub: "Đã tin tưởng lựa chọn" },
      { value: "200+", title: "Học viên", sub: "Đã tốt nghiệp khóa học" },
    ],
    aboutImage: haleeTram,
    featuredServiceImages: [gioithieu, gioithieu],
    bookingImage: gioithieu,
    testimonialsBackground: slideshow,
    ctaTitle: "ĐẶT LỊCH NGAY — ƯU ĐÃI HÔM NAY",
    ctaDescription:
      "Đặt lịch online hoặc gọi 0938 162 662. Halee Trâm hỗ trợ tư vấn dịch vụ làm đẹp và khóa học nghề miễn phí.",
    ctaImage: slideshow123,
    footerDescription:
      "Eyelash / Nail / Academy tại Quận 7 — dịch vụ nails, mi chuyên nghiệp và đào tạo nghề bài bản. Halee Trâm — nơi bạn tỏa sáng và học nghề vững tay.",
  },
  footer: {
    featuredTitle: "DỊCH VỤ NỔI BẬT",
    featuredServices: [
      { label: "Nails", href: "/lam-dep/nails" },
      { label: "Nối Mi", href: "/lam-dep/noi-mi" },
      { label: "Uốn Mi", href: "/lam-dep/uon-mi" },
      { label: "Định Hình Chân Mày", href: "/lam-dep/dinh-hinh-chan-may" },
      { label: "Khóa Nối Mi Salon", href: "/dao-tao/khoa-noi-mi-salon" },
    ],
    quickLinksTitle: "LIÊN KẾT NHANH",
    quickLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Giới thiệu", href: "/gioi-thieu" },
      { label: "Dịch vụ", href: "/dich-vu" },
      { label: "Thư viện hình ảnh", href: "/khach-hang" },
      { label: "Bảng giá", href: "/bang-gia" },
      { label: "Tin tức", href: "/tin-tuc" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
    copyright: "© 2026 Halee Trâm Eyelash / Nail / Academy. All Rights Reserved.",
    designCreditLabel: "Butphamarketing.com",
    designCreditUrl: "https://butphamarketing.com",
  },
  handbook: {
    title: "CẨM NANG LÀM ĐẸP",
    viewAllLabel: "XEM TẤT CẢ BÀI VIẾT",
    viewAllHref: "/tin-tuc",
  },
  priceList: {
    title: "Bảng giá tham khảo",
    description: "Giá có thể thay đổi theo mẫu và combo. Hotline 0938 162 662.",
    note: "Bấm vào hình để xem phóng to. Upload ảnh bảng giá thật trong Admin → Bảng giá.",
    images: [
      {
        id: "pl1",
        title: "Dịch vụ làm đẹp",
        category: "Làm đẹp",
        src: publicAsset("bang-gia-lam-dep.svg"),
        alt: "Bảng giá dịch vụ làm đẹp Halee Trâm",
      },
      {
        id: "pl2",
        title: "Khóa đào tạo nghề",
        category: "Đào tạo",
        src: publicAsset("bang-gia-dao-tao.svg"),
        alt: "Bảng giá khóa học Halee Trâm",
      },
    ],
  },
  bookingServices: [
    { value: "nails", label: "Nails" },
    { value: "noimi", label: "Nối Mi" },
    { value: "uonmi", label: "Uốn Mi" },
    { value: "chanmay", label: "Định Hình Chân Mày" },
    { value: "chagot", label: "Chà Gót Chân" },
    { value: "goidau", label: "Gội Đầu" },
    { value: "daotao", label: "Tư vấn khóa học" },
    { value: "khac", label: "Khác" },
  ],
  doctors: [
    {
      id: "d2",
      img: haleeTram1,
      name: "Halee Trâm",
      spec: "Giáo viên Nối Mi / Uốn Mi / Định Hình Lông Mày",
      exp: "6 NĂM KINH NGHIỆM",
      bio: "Sáng lập và trực tiếp giảng dạy các khoá học nối mi, uốn mi và định hình lông mày trong và ngoài nước với phương pháp dễ hiểu, dễ áp dụng vào thực chiến.",
    },
    {
      id: "d1",
      img: mssNhan,
      name: "Miss. Nhàn",
      spec: "Giáo viên Nail Art & Chăm Sóc Móng / Waxing",
      exp: "6 NĂM KINH NGHIỆM",
      bio: "Giảng dạy nail art, chăm sóc móng và waxing với kỹ thuật chuẩn salon, tận tâm với học viên.",
    },
    {
      id: "d3",
      img: mssThuLee,
      name: "Miss.Thu Lee",
      spec: "KTV chính Nail / Mi / Gội",
      exp: "KTV CHÍNH",
      bio: "Phục vụ nails, mi và gội đầu với sự tận tâm, nhẹ tay và chuyên nghiệp.",
    },
  ],
  articles: DEFAULT_ARTICLES,
  testimonials: [
    {
      id: "t1",
      name: "Lan Anh",
      initials: "LA",
      avatar: feedbackHV,
      text: "Cô chỉ dạy cho em, thời gian học chưa nhiều nhưng giúp em tự tin làm khách hơn.",
      albumImages: [feedbackHV],
      category: "student",
    },
    {
      id: "t2",
      name: "Thuỳ Dung",
      initials: "TD",
      avatar: feedbackHV,
      text: "Được cô Halee hướng dẫn tận tình từng thao tác — em tự tin hơn khi thực hành trên khách.",
      albumImages: [feedbackHV],
      category: "student",
    },
    {
      id: "t3",
      name: "Kim Ngân",
      initials: "KN",
      avatar: feedbackHV,
      text: "Học khóa nối mi salon xong mở được tiệm, được hướng dẫn rất kỹ.",
      albumImages: [feedbackHV],
      category: "student",
    },
    {
      id: "t4",
      name: "Hoài Phương",
      initials: "HP",
      avatar: feedbackHV,
      text: "Khóa học thực chiến, cô sửa tay nghề từng bước — em ra nghề nhanh và vững kỹ thuật.",
      albumImages: [feedbackHV],
      category: "student",
    },
    {
      id: "t5",
      name: "Minh Thư",
      initials: "MT",
      avatar: feedbackKH,
      text: "Nối mi volume tự nhiên, đi làm và đi chơi đều được khen.",
      albumImages: [feedbackKH],
      category: "service",
    },
    {
      id: "t6",
      name: "Hà My",
      initials: "HM",
      avatar: feedbackKH,
      text: "Nail art xinh, bền màu — nhân viên nhẹ tay và tư vấn nhiệt tình.",
      albumImages: [feedbackKH],
      category: "service",
    },
  ],
  customerCases: [
    {
      id: "cr1",
      label: "Nối Mi Volume",
      cover: gioithieu,
      images: [gioithieu],
    },
    {
      id: "cr2",
      label: "Nail Art Gel",
      cover: gioithieu,
      images: [gioithieu],
    },
    {
      id: "cr3",
      label: "Định Hình Chân Mày",
      cover: gioithieu,
      images: [gioithieu],
    },
    {
      id: "cr4",
      label: "Uốn Mi Classic",
      cover: gioithieu,
      images: [gioithieu],
    },
  ],
  luckyWheel: {
    enabled: false,
    title: "Vòng Quay May Mắn",
    subtitle: "Quay để nhận ưu đãi đặc biệt hôm nay!",
    autoShowDelay: 5,
    spinButtonLabel: "QUAY NGAY",
    resultHeading: "Chúc mừng! Bạn đã trúng:",
    resultDescription: "Điền thông tin để nhận ưu đãi và đặt lịch nhanh chóng.",
    segments: [
      { id: "w1", label: "Giảm 20%", color: "#c9a66b", weight: 20 },
      { id: "w2", label: "Tư vấn miễn phí", color: "#6e473b", weight: 25 },
      { id: "w3", label: "Giảm 10%", color: "#e5d8ca", weight: 25 },
      { id: "w4", label: "Quà tặng bí ẩn", color: "#5a3a30", weight: 15 },
      { id: "w5", label: "Giảm 30%", color: "#a88450", weight: 10 },
      { id: "w6", label: "Combo nails + mi", color: "#8b6b4f", weight: 5 },
    ],
  },
  processSteps: [
    {
      id: "s1",
      title: "TIẾP NHẬN & TƯ VẤN",
      desc: "Lắng nghe nhu cầu và gợi ý phong cách phù hợp",
      image: gioithieu,
    },
    {
      id: "s2",
      title: "CHUẨN BỊ & VỆ SINH",
      desc: "Làm sạch, sát khuẩn dụng cụ và khu vực thực hiện",
      image: gioithieu,
    },
    {
      id: "s3",
      title: "THỰC HIỆN DỊCH VỤ",
      desc: "Tiến hành nails, mi hoặc chân mày theo quy trình chuẩn",
      image: gioithieu,
    },
    {
      id: "s4",
      title: "HOÀN THIỆN",
      desc: "Kiểm tra kỹ từng chi tiết trước khi bàn giao",
      image: gioithieu,
    },
    {
      id: "s5",
      title: "HƯỚNG DẪN CHĂM SÓC",
      desc: "Hướng dẫn giữ mi, móng bền và đẹp tại nhà",
      image: gioithieu,
    },
    {
      id: "s6",
      title: "HỖ TRỢ SAU DỊCH VỤ",
      desc: "Bảo hành và chỉnh sửa trong thời gian cam kết",
      image: gioithieu,
    },
  ],
};
