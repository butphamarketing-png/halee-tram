import { DEFAULT_ARTICLES } from "@/data/articles.defaults";
import type { SiteContent } from "@/types/site-content";

const publicAsset = (file: string) =>
  `${import.meta.env.BASE_URL}${file}`.replace(/([^:]\/)\/+/g, "$1");

const slide = publicAsset("slideshow.1.png");
const intro = publicAsset("gioithieu.1.png");

export const DEFAULT_SITE_CONTENT: SiteContent = {
  version: 2,
  settings: {
    clinicName: "THIÊN HOÀNG KIM",
    clinicSubtitle: "Aesthetic Clinic",
    slogan: "Nâng Tầm Nhan Sắc",
    address: "323-325 Hùng Vương, Phường An Đông, TP Hồ Chí Minh",
    phone: "0938673996",
    email: "contact@thienhoangkim.vn",
    hours: "08:00 - 20:00 (Thứ 2 - Chủ Nhật)",
    messengerSlug: "thienhoangkim",
    topbarAddress: "323-325 Hùng Vương, Phường An Đông, TP. Hồ Chí Minh",
    topbarHours: "Thứ 2 - Chủ nhật: 08:00 - 20:00",
    websiteUrl: "/",
    websiteLabel: "thienhoangkim.vn",
    facebookUrl: "#",
    tiktokUrl: "#",
    youtubeUrl: "#",
    seo: {
      title: "Thiên Hoàng Kim Aesthetic Clinic | Nâng Tầm Nhan Sắc",
      description:
        "Phòng khám thẩm mỹ chuẩn y khoa tại TP.HCM — nâng mũi, cắt mí, filler, botox, trẻ hóa da và spa chăm sóc da chuyên sâu.",
      keywords: "thẩm mỹ, phòng khám thẩm mỹ, nâng mũi, cắt mí, filler, Thiên Hoàng Kim",
      ogImage: slide,
    },
  },
  home: {
    heroSlides: [
      {
        id: "slideshow-1",
        src: slide,
        alt: "Thiên Hoàng Kim Aesthetic Clinic — Nâng Tầm Nhan Sắc",
      },
    ],
    commitmentsTitle: "CAM KẾT TỪ THIÊN HOÀNG KIM",
    commitmentsSubtitle:
      "Chúng tôi cam kết mang đến dịch vụ thẩm mỹ an toàn – chất lượng – tận tâm nhất",
    commitments: [
      {
        id: "c1",
        icon: "Shield",
        title: "AN TOÀN LÀ ƯU TIÊN",
        desc: "Quy trình chuẩn y khoa, đảm bảo an toàn tuyệt đối cho khách hàng",
      },
      {
        id: "c2",
        icon: "Stethoscope",
        title: "BÁC SĨ CHUYÊN MÔN CAO",
        desc: "Đội ngũ bác sĩ giàu kinh nghiệm, chuyên môn sâu và tận tâm",
      },
      {
        id: "c3",
        icon: "TestTube",
        title: "CÔNG NGHỆ HIỆN ĐẠI",
        desc: "Ứng dụng công nghệ tiên tiến, thiết bị nhập khẩu chính hãng",
      },
      {
        id: "c4",
        icon: "Heart",
        title: "DỊCH VỤ TẬN TÂM",
        desc: "Chăm sóc khách hàng chu đáo, trước, trong và sau khi làm đẹp",
      },
      {
        id: "c5",
        icon: "Sparkles",
        title: "KẾT QUẢ TỰ NHIÊN",
        desc: "Mang đến vẻ đẹp hài hòa, tự nhiên và bền vững theo thời gian",
      },
      {
        id: "c6",
        icon: "FileText",
        title: "BẢO HÀNH RÕ RÀNG",
        desc: "Chính sách bảo hành minh bạch, đảm bảo quyền lợi khách hàng",
      },
    ],
    aboutEyebrow: "GIỚI THIỆU",
    aboutTitle: "THIÊN HOÀNG KIM",
    aboutSubtitle: "Aesthetic Clinic",
    aboutParagraphs: [
      "Thiên Hoàng Kim Aesthetic Clinic là phòng khám thẩm mỹ chuẩn y khoa, tiên phong ứng dụng công nghệ hiện đại và quy tụ đội ngũ bác sĩ chuyên môn cao, giàu kinh nghiệm.",
      "Chúng tôi cam kết mang đến những giải pháp làm đẹp an toàn, hiệu quả và phù hợp với từng cá nhân, kiến tạo vẻ đẹp tự nhiên, hài hòa và bền vững theo thời gian.",
    ],
    aboutStats: [
      { value: "15+", title: "Năm kinh nghiệm", sub: "Trong lĩnh vực thẩm mỹ" },
      { value: "5000+", title: "Khách hàng", sub: "Đã tin tưởng lựa chọn" },
      { value: "98%", title: "Khách hàng hài lòng", sub: "Về chất lượng dịch vụ" },
    ],
    aboutImage: intro,
    featuredServiceImages: [slide, intro],
    bookingImage: intro,
    testimonialsBackground: slide,
    ctaTitle: "SẴN SÀNG NÂNG TẦM NHAN SẮC?",
    ctaDescription:
      "Liên hệ ngay để được đội ngũ chuyên gia tư vấn miễn phí và đặt lịch nhanh chóng.",
    ctaImage: intro,
    footerDescription:
      "Phòng khám chuyên khoa thẩm mỹ uy tín, chất lượng với đội ngũ bác sĩ chuyên gia hàng đầu. Kiến tạo vẻ đẹp tự nhiên, an toàn và bền vững.",
  },
  footer: {
    featuredTitle: "DỊCH VỤ NỔI BẬT",
    featuredServices: [
      { label: "Nâng mũi cấu trúc", href: "/dich-vu/nang-mui" },
      { label: "Cắt mí tự nhiên", href: "/dich-vu/cat-mi" },
      { label: "Tiêm filler - Botox", href: "/dich-vu/filler" },
      { label: "Điều trị da chuyên sâu", href: "/dich-vu/dieu-tri-mun" },
      { label: "Trẻ hóa công nghệ cao", href: "/dich-vu/tre-hoa-da" },
    ],
    quickLinksTitle: "LIÊN KẾT NHANH",
    quickLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Giới thiệu", href: "/gioi-thieu" },
      { label: "Dịch vụ", href: "/dich-vu" },
      { label: "Khách hàng thực tế", href: "/khach-hang" },
      { label: "Bảng giá", href: "/bang-gia" },
      { label: "Tin tức", href: "/tin-tuc" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
    copyright: "© 2026 Thiên Hoàng Kim Aesthetic Clinic. All Rights Reserved.",
    designCreditLabel: "Butphamarketing.com",
    designCreditUrl: "https://butphamarketing.com",
  },
  handbook: {
    title: "CẨM NANG LÀM ĐẸP",
    viewAllLabel: "XEM TẤT CẢ BÀI VIẾT",
    viewAllHref: "/tin-tuc",
  },
  bookingServices: [
    { value: "nangmui", label: "Nâng mũi cấu trúc" },
    { value: "catmi", label: "Cắt mí tự nhiên" },
    { value: "filler", label: "Tiêm Filler/Botox" },
    { value: "trehoa", label: "Trẻ hóa da công nghệ cao" },
    { value: "spa", label: "Chăm sóc da (Spa)" },
    { value: "khac", label: "Khác" },
  ],
  doctors: [
    {
      id: "d1",
      img: slide,
      name: "TS.BS NGUYỄN VĂN ANH",
      spec: "Chuyên khoa Phẫu thuật thẩm mỹ",
      exp: "15 NĂM KINH NGHIỆM",
      bio: "Hơn 15 năm gắn bó với nghề, kiến tạo vẻ đẹp hoàn mỹ cho hàng ngàn khách hàng bằng chữ Tâm.",
    },
    {
      id: "d2",
      img: intro,
      name: "BS.CKII TRẦN QUỐC BẢO",
      spec: "Chuyên khoa Thẩm mỹ nội khoa",
      exp: "12 NĂM KINH NGHIỆM",
      bio: "Chuyên gia hàng đầu về trẻ hóa da công nghệ cao và các liệu trình thẩm mỹ không xâm lấn.",
    },
    {
      id: "d3",
      img: slide,
      name: "BS.CKI LÊ THỊ HÀ MY",
      spec: "Chuyên khoa Da liễu thẩm mỹ",
      exp: "10 NĂM KINH NGHIỆM",
      bio: "Luôn cập nhật những xu hướng và công nghệ điều trị da tiên tiến nhất trên thế giới.",
    },
  ],
  articles: DEFAULT_ARTICLES,
  testimonials: [
    {
      id: "t1",
      name: "Minh Anh",
      initials: "MA",
      avatar: slide,
      text: "Mình đã điều trị mụn tại Thiên Hoàng Kim được 3 tháng, da sáng mịn và đều màu hơn rất nhiều.",
    },
    {
      id: "t2",
      name: "Thanh Huyền",
      initials: "TH",
      avatar: intro,
      text: "Dịch vụ ở đây rất chuyên nghiệp, cơ sở vật chất hiện đại.",
    },
    {
      id: "t3",
      name: "Kim Ngân",
      initials: "KN",
      avatar: slide,
      text: "Sau liệu trình trị mụn và sẹo rỗ, da mình cải thiện hơn 80%.",
    },
    {
      id: "t4",
      name: "Hoài Phương",
      initials: "HP",
      avatar: intro,
      text: "Tôi rất hài lòng với kết quả căng bóng và trẻ hóa da.",
    },
  ],
  customerCases: [
    { id: "cr1", label: "Nâng Mũi Cấu Trúc", before: slide, after: intro },
    { id: "cr2", label: "Cắt Mí Tự Nhiên", before: intro, after: slide },
    { id: "cr3", label: "Filler – Trẻ Hóa", before: slide, after: intro },
  ],
  processSteps: [
    {
      id: "s1",
      title: "TIẾP NHẬN & TƯ VẤN",
      desc: "Đội ngũ tiếp nhận thông tin và tư vấn sơ bộ",
      image: intro,
    },
    {
      id: "s2",
      title: "THĂM KHÁM & SOI DA",
      desc: "Bác sĩ trực tiếp thăm khám và phân tích tình trạng",
      image: slide,
    },
    {
      id: "s3",
      title: "LÊN PHÁC ĐỒ CÁ NHÂN",
      desc: "Đề xuất liệu trình phù hợp với nhu cầu",
      image: intro,
    },
    {
      id: "s4",
      title: "TIẾN HÀNH ĐIỀU TRỊ",
      desc: "Thực hiện theo đúng quy trình chuẩn Y khoa",
      image: slide,
    },
    {
      id: "s5",
      title: "HƯỚNG DẪN CHĂM SÓC",
      desc: "Hướng dẫn chăm sóc tại nhà để duy trì kết quả",
      image: intro,
    },
    {
      id: "s6",
      title: "TÁI KHÁM & THEO DÕI",
      desc: "Theo dõi tiến trình để đạt kết quả tối ưu nhất",
      image: slide,
    },
  ],
};
