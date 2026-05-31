export type NavLinkItem = {
  label: string;
  href: string;
};

export type NavMegaColumn = {
  title: string;
  items: NavLinkItem[];
};

export type NavItem = {
  label: string;
  href: string;
  /** Danh sách đơn (Giới thiệu, Tin tức) */
  children?: NavLinkItem[];
  /** Menu 2 cột (Dịch vụ) */
  columns?: NavMegaColumn[];
};

export const MAIN_NAV: NavItem[] = [
  { label: "TRANG CHỦ", href: "/" },
  {
    label: "GIỚI THIỆU",
    href: "/gioi-thieu",
    children: [
      { label: "Câu Chuyện Thương Hiệu", href: "/gioi-thieu/cau-chuyen-thuong-hieu" },
      { label: "Đội Ngũ Bác Sĩ", href: "/gioi-thieu/doi-ngu-bac-si" },
      { label: "Công Nghệ Thẩm Mỹ", href: "/gioi-thieu/cong-nghe-tham-my" },
      { label: "Cơ Sở Vật Chất", href: "/gioi-thieu/co-so-vat-chat" },
    ],
  },
  {
    label: "DỊCH VỤ",
    href: "/dich-vu",
    columns: [
      {
        title: "THẨM MỸ Y KHOA",
        items: [
          { label: "Nâng Mũi", href: "/dich-vu/nang-mui" },
          { label: "Cắt Mí", href: "/dich-vu/cat-mi" },
          { label: "Filler", href: "/dich-vu/filler" },
          { label: "Botox", href: "/dich-vu/botox" },
          { label: "Căng Chỉ", href: "/dich-vu/cang-chi" },
          { label: "Điều Trị Mụn", href: "/dich-vu/dieu-tri-mun" },
          { label: "Điều Trị Nám", href: "/dich-vu/dieu-tri-nam" },
          { label: "Trẻ Hóa Da", href: "/dich-vu/tre-hoa-da" },
        ],
      },
      {
        title: "SPA & CHĂM SÓC DA",
        items: [
          { label: "Chăm Sóc Da", href: "/dich-vu/cham-soc-da" },
          { label: "Facial", href: "/dich-vu/facial" },
          { label: "Peel Da", href: "/dich-vu/peel-da" },
          { label: "Điện Di", href: "/dich-vu/dien-di" },
          { label: "Phục Hồi Da", href: "/dich-vu/phuc-hoi-da" },
          { label: "Gội Đầu Dưỡng Sinh", href: "/dich-vu/goi-dau-duong-sinh" },
          { label: "Massage", href: "/dich-vu/massage" },
          { label: "Chăm Sóc Cơ Thể", href: "/dich-vu/cham-soc-co-the" },
        ],
      },
    ],
  },
  { label: "KHÁCH HÀNG", href: "/khach-hang" },
  { label: "BẢNG GIÁ", href: "/bang-gia" },
  {
    label: "TIN TỨC",
    href: "/tin-tuc",
    children: [
      { label: "Kiến Thức", href: "/tin-tuc/kien-thuc" },
      { label: "Tin Tức", href: "/tin-tuc/tin-tuc" },
    ],
  },
  { label: "LIÊN HỆ", href: "/lien-he" },
];
