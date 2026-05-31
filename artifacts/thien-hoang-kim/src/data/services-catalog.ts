export type ServiceCategoryId = "tham-my" | "spa";

export type ServiceCatalogItem = {
  slug: string;
  label: string;
  /** Slug bài viết tin tức (nếu có) để hiển thị nội dung chi tiết */
  articleSlug?: string;
  description?: string;
};

export type ServiceCategory = {
  id: ServiceCategoryId;
  path: string;
  title: string;
  eyebrow: string;
  description: string;
};

const THAM_MY_ITEMS: ServiceCatalogItem[] = [
  { slug: "nang-mui", label: "Nâng Mũi", articleSlug: "nang-mui-bao-lau-thi-dep-tu-nhien" },
  { slug: "cat-mi", label: "Cắt Mí", articleSlug: "cat-mi-co-de-lai-seo-khong" },
  { slug: "filler", label: "Filler", articleSlug: "tiem-filler-giu-duoc-bao-lau" },
  { slug: "botox", label: "Botox", articleSlug: "botox-la-gi-khi-nao-nen-tiem" },
  { slug: "cang-chi", label: "Căng Chỉ", description: "Nâng cơ, trẻ hóa vùng mặt bằng chỉ sinh học an toàn." },
  { slug: "dieu-tri-mun", label: "Điều Trị Mụn", articleSlug: "dieu-tri-mun-boc-hieu-qua" },
  { slug: "dieu-tri-nam", label: "Điều Trị Nám", description: "Phác đồ trị nám, tàn nhang cá nhân hóa theo từng loại da." },
  { slug: "tre-hoa-da", label: "Trẻ Hóa Da", articleSlug: "tre-hoa-da-hifu" },
];

const SPA_ITEMS: ServiceCatalogItem[] = [
  { slug: "cham-soc-da", label: "Chăm Sóc Da", description: "Liệu trình chăm sóc da chuyên sâu, phục hồi và cân bằng." },
  { slug: "facial", label: "Facial", description: "Facial thư giãn, làm sạch và cung cấp dưỡng chất cho da." },
  { slug: "peel-da", label: "Peel Da", description: "Peel da y khoa giúp sáng mịn, mờ thâm và se khít lỗ chân lông." },
  { slug: "dien-di", label: "Điện Di", description: "Đưa tinh chất vào sâu da bằng dòng điện siêu vi." },
  { slug: "phuc-hoi-da", label: "Phục Hồi Da", description: "Phục hồi da sau điều trị, laser hoặc tổn thương nhẹ." },
  { slug: "goi-dau-duong-sinh", label: "Gội Đầu Dưỡng Sinh", description: "Gội đầu thảo dược thư giãn, kích thích tuần hoàn." },
  { slug: "massage", label: "Massage", description: "Massage body thư giãn, giảm căng cơ và mệt mỏi." },
  { slug: "cham-soc-co-the", label: "Chăm Sóc Cơ Thể", description: "Liệu trình chăm sóc toàn thân cao cấp tại spa." },
];

export const SERVICE_CATEGORIES: Record<ServiceCategoryId, ServiceCategory> = {
  "tham-my": {
    id: "tham-my",
    path: "/tham-my",
    title: "DỊCH VỤ THẨM MỸ",
    eyebrow: "Thẩm mỹ y khoa",
    description: "Giải pháp thẩm mỹ chuẩn y khoa — an toàn, tự nhiên và hiệu quả lâu dài.",
  },
  spa: {
    id: "spa",
    path: "/spa",
    title: "DỊCH VỤ SPA",
    eyebrow: "Spa & chăm sóc da",
    description: "Chăm sóc da và thư giãn toàn diện trong không gian cao cấp.",
  },
};

export const SERVICE_ITEMS: Record<ServiceCategoryId, ServiceCatalogItem[]> = {
  "tham-my": THAM_MY_ITEMS,
  spa: SPA_ITEMS,
};

export function getServiceItem(categoryId: ServiceCategoryId, slug: string) {
  return SERVICE_ITEMS[categoryId].find((s) => s.slug === slug) ?? null;
}

export function getServiceHref(categoryId: ServiceCategoryId, slug: string) {
  return `${SERVICE_CATEGORIES[categoryId].path}/${slug}`;
}

/** Chuyển /dich-vu/slug cũ sang /tham-my/slug hoặc /spa/slug */
export function resolveLegacyServicePath(path: string): string | null {
  const match = path.match(/^\/dich-vu\/([^/]+)$/);
  if (!match) return null;
  const slug = match[1];
  if (getServiceItem("tham-my", slug)) return getServiceHref("tham-my", slug);
  if (getServiceItem("spa", slug)) return getServiceHref("spa", slug);
  return null;
}

export function buildNavServiceItems(categoryId: ServiceCategoryId) {
  return SERVICE_ITEMS[categoryId].map((item) => ({
    label: item.label,
    href: getServiceHref(categoryId, item.slug),
  }));
}
