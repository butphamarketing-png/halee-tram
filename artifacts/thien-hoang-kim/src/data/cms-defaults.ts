import { SERVICE_PAGE_COPY } from "@/data/service-pages.defaults";
import {
  SERVICE_CATEGORIES,
  SERVICE_ITEMS,
  getServiceHref,
  type ServiceCategoryId,
} from "@/data/services-catalog";
import type {
  SiteNavItem,
  SitePageBlock,
  SitePageContent,
  SiteServiceCatalog,
} from "@/types/site-content";

function p(...paragraphs: string[]): SitePageBlock {
  return { paragraphs };
}

export const DEFAULT_NAVIGATION: SiteNavItem[] = [
  { label: "TRANG CHỦ", href: "/" },
  {
    label: "GIỚI THIỆU",
    href: "/gioi-thieu",
    children: [
      { label: "Câu Chuyện Thương Hiệu", href: "/gioi-thieu/cau-chuyen-thuong-hieu" },
      { label: "Đội Ngũ Nhân Viên", href: "/gioi-thieu/doi-ngu-bac-si" },
      { label: "Cơ Sở Vật Chất", href: "/gioi-thieu/co-so-vat-chat" },
    ],
  },
  { label: "DỊCH VỤ", href: "/dich-vu" },
  { label: "THƯ VIỆN ẢNH", href: "/khach-hang" },
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

export const DEFAULT_SERVICE_CATALOG: SiteServiceCatalog = {
  categories: {
    "lam-dep": { ...SERVICE_CATEGORIES["lam-dep"] },
    "dao-tao": { ...SERVICE_CATEGORIES["dao-tao"] },
  },
  items: {
    "lam-dep": SERVICE_ITEMS["lam-dep"].map((item) => ({ ...item })),
    "dao-tao": SERVICE_ITEMS["dao-tao"].map((item) => ({ ...item })),
  },
};

const STATIC_PAGES: Record<string, SitePageContent> = {
  "/gioi-thieu": {
    eyebrow: "Giới thiệu",
    title: "Halee Trâm — Eyelash & Nail Academy",
    description:
      "Studio làm đẹp và đào tạo nghề tại Quận 7 — nơi bạn tỏa sáng và học nghề bài bản.",
    blocks: [
      p(
        "Halee Trâm Eyelash & Nail Academy ra đời từ đam mê làm đẹp và mong muốn mang đến dịch vụ nails, nối mi chất lượng cao cho phụ nữ tại TP.HCM.",
        "Tọa lạc tại 793/62 Trần Xuân Soạn, Phường Tân Hưng, Quận 7 — chúng tôi phục vụ khách làm đẹp và đào tạo học viên ra nghề với phương pháp thực chiến, dễ áp dụng.",
        "Với 6 năm kinh nghiệm, Halee Trâm đã đồng hành cùng hàng nghìn khách hàng và hàng trăm học viên mở salon, tiệm nails và dịch vụ mi riêng.",
      ),
      {
        title: "Sứ mệnh",
        paragraphs: [
          "Mang đến vẻ đẹp tự nhiên, an toàn và dịch vụ tận tâm.",
          "Đào tạo nghề minh bạch — học viên tự tin ra nghề, có thu nhập ổn định.",
        ],
      },
    ],
  },
  "/gioi-thieu/cau-chuyen-thuong-hieu": {
    eyebrow: "Giới thiệu",
    title: "Câu chuyện thương hiệu",
    description: "Hành trình từ đam mê làm đẹp đến academy đào tạo nghề.",
    blocks: [
      p(
        "Halee Trâm bắt đầu với một tiệm nhỏ và tình yêu với nghề nối mi, nails. Khách hàng quay lại nhiều, giới thiệu bạn bè — đó là động lực để mở rộng studio và lớp đào tạo.",
        "Chúng tôi tin rằng làm đẹp không chỉ là thay đổi diện mạo mà còn giúp phụ nữ tự tin hơn mỗi ngày.",
        "Hôm nay, Halee Trâm vừa là điểm hẹn làm đẹp uy tín tại Quận 7, vừa là nơi học viên từ khắp miền đến học nghề nối mi, nail và uốn mi.",
      ),
    ],
  },
  "/gioi-thieu/co-so-vat-chat": {
    eyebrow: "Giới thiệu",
    title: "Cơ sở vật chất",
    description: "Không gian ấm cúng, sạch sẽ — ghế nails, giường nối mi và khu đào tạo riêng.",
    blocks: [
      p(
        "Studio thiết kế hiện đại theo tông nâu kem ấm áp, tạo cảm giác thư giãn ngay khi bước vào.",
        "Dụng cụ tiệt trùng sau mỗi khách, sản phẩm gel – keo – mi nhập chính hãng. Khu đào tạo có model thực hành và giáo trình bài bản.",
        "Bãi xe thuận tiện quanh khu vực Trần Xuân Soạn, Quận 7.",
      ),
    ],
  },
  "/bang-gia": {
    eyebrow: "Bảng giá",
    title: "Bảng giá tham khảo",
    description: "Giá có thể thay đổi theo mẫu và combo. Hotline 0938 162 662.",
    blocks: [
      {
        title: "Dịch vụ làm đẹp",
        paragraphs: [
          "Nails sơn gel cơ bản: từ 150.000đ",
          "Nối mi Classic: từ 350.000đ",
          "Uốn mi (lash lift): từ 120.000đ",
        ],
      },
      {
        title: "Khóa đào tạo",
        paragraphs: [
          "Khóa Nối Mi Salon: từ 5.000.000đ",
          "Khóa Nail Chuyên Nghiệp: từ 4.500.000đ",
        ],
      },
    ],
  },
  "/dich-vu": {
    eyebrow: "Dịch vụ",
    title: "Dịch vụ & Đào tạo",
    description:
      "Trọn bộ dịch vụ nails, mi, chân mày, spa chân, gội đầu và các khóa học nghề tại Halee Trâm.",
    blocks: [
      p(
        "Halee Trâm cung cấp dịch vụ làm đẹp chuyên nghiệp và chương trình đào tạo bài bản.",
        "Đặt lịch online hoặc gọi 0938 162 662 — 793/62 Trần Xuân Soạn, Quận 7.",
      ),
    ],
  },
};

function buildServicePages(catalog: SiteServiceCatalog): Record<string, SitePageContent> {
  const pages: Record<string, SitePageContent> = {};
  for (const categoryId of ["lam-dep", "dao-tao"] as ServiceCategoryId[]) {
    const cat = catalog.categories[categoryId];
    for (const item of catalog.items[categoryId]) {
      const href = getServiceHref(categoryId, item.slug);
      const copy = SERVICE_PAGE_COPY[href];
      pages[href] = {
        eyebrow: cat.title,
        title: item.label,
        description: copy?.description ?? item.description ?? `${item.label} tại Halee Trâm — hotline 0938 162 662.`,
        blocks: copy?.blocks ?? [
          p(
            `Dịch vụ ${item.label} được thực hiện bởi chuyên viên có kinh nghiệm.`,
            "Đặt lịch trước để được phục vụ đúng giờ.",
          ),
        ],
      };
    }
  }
  return pages;
}

export function buildDefaultPages(catalog = DEFAULT_SERVICE_CATALOG): Record<string, SitePageContent> {
  return { ...STATIC_PAGES, ...buildServicePages(catalog) };
}

export const DEFAULT_PAGES = buildDefaultPages();
