import { buildNavServiceItems } from "@/data/services-catalog";

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
        items: buildNavServiceItems("tham-my"),
      },
      {
        title: "SPA & CHĂM SÓC DA",
        items: buildNavServiceItems("spa"),
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
