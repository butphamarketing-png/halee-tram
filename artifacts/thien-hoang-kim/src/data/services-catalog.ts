export type ServiceCategoryId = "lam-dep" | "dao-tao";

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

const LAM_DEP_ITEMS: ServiceCatalogItem[] = [
  { slug: "nails", label: "Nails", description: "Làm móng, sơn gel, thiết kế nail art theo xu hướng.", articleSlug: "son-gel-bao-lau-va-cach-giu-mau" },
  { slug: "noi-mi", label: "Nối Mi", description: "Nối mi classic, volume, hybrid — tự nhiên, bền và đẹp.", articleSlug: "noi-mi-classic-hay-volume" },
  { slug: "uon-mi", label: "Uốn Mi", description: "Uốn mi tự nhiên, giữ cong lâu, phù hợp mọi dáng mắt.", articleSlug: "uon-mi-co-dau-khong" },
  {
    slug: "dinh-hinh-chan-may",
    label: "Định Hình Chân Mày",
    description: "Tạo dáng, tô viền và định hình chân mày hài hòa với khuôn mặt.",
    articleSlug: "dinh-hinh-chan-may-chon-dang-nao",
  },
  { slug: "cha-got-chan", label: "Chà Gót Chân", description: "Chà gót, dưỡng da chân mềm mịn và thư giãn.", articleSlug: "cham-soc-da-chan-tai-nha" },
  { slug: "goi-dau", label: "Gội Đầu", description: "Gội đầu thư giãn, chăm sóc tóc và da đầu tại salon.", articleSlug: "goi-dau-thu-gian-quan-7" },
];

const DAO_TAO_ITEMS: ServiceCatalogItem[] = [
  { slug: "khoa-noi-mi-salon", label: "Khóa Nối Mi Salon", description: "Đào tạo nối mi chuyên nghiệp cho môi trường salon.", articleSlug: "khoa-noi-mi-salon-co-gi" },
  { slug: "khoa-noi-mi-dinh-cu", label: "Khóa Nối Mi Định Cư", description: "Khóa nối mi định cư — kỹ năng và chứng chỉ theo chuẩn quốc tế.", articleSlug: "khoa-noi-mi-dinh-cu-hoc-gi" },
  { slug: "khoa-nail-chuyen-nghiep", label: "Khóa Nail Chuyên Nghiệp", description: "Học nail từ cơ bản đến nâng cao, thực hành trên model thật.", articleSlug: "khoa-nail-chuyen-nghiep-ra-nghe" },
  { slug: "khoa-cham-soc-mong", label: "Khóa Chăm Sóc Móng", description: "Kỹ thuật chăm sóc, dưỡng và phục hồi móng tay chuyên nghiệp.", articleSlug: "khoa-cham-soc-mong-ai-nen-hoc" },
  {
    slug: "khoa-dinh-hinh-chan-may",
    label: "Khóa Định Hình Chân Mày",
    description: "Đào tạo kỹ thuật định hình, phun và tô chân mày chuẩn tỷ lệ.",
    articleSlug: "khoa-dinh-hinh-chan-may-lo-trinh",
  },
  { slug: "khoa-hoc-uon-mi", label: "Khóa Học Uốn Mi", description: "Uốn mi an toàn, giữ nếp bền — phù hợp mở dịch vụ hoặc nâng tay nghề.", articleSlug: "khoa-hoc-uon-mi-mo-dich-vu" },
];

export const SERVICE_CATEGORIES: Record<ServiceCategoryId, ServiceCategory> = {
  "lam-dep": {
    id: "lam-dep",
    path: "/lam-dep",
    title: "DỊCH VỤ LÀM ĐẸP",
    eyebrow: "Dịch vụ tại salon",
    description: "Nails, mi, chân mày, chăm sóc chân và gội đầu — tận tâm từng chi tiết.",
  },
  "dao-tao": {
    id: "dao-tao",
    path: "/dao-tao",
    title: "ĐÀO TẠO NGHỀ",
    eyebrow: "Khóa học chuyên nghiệp",
    description: "Các khóa nail, nối mi, uốn mi và định hình chân mày — học thực chiến, ra nghề nhanh.",
  },
};

export const SERVICE_ITEMS: Record<ServiceCategoryId, ServiceCatalogItem[]> = {
  "lam-dep": LAM_DEP_ITEMS,
  "dao-tao": DAO_TAO_ITEMS,
};

export function getServiceItem(categoryId: ServiceCategoryId, slug: string) {
  return SERVICE_ITEMS[categoryId].find((s) => s.slug === slug) ?? null;
}

export function getServiceHref(categoryId: ServiceCategoryId, slug: string) {
  return `${SERVICE_CATEGORIES[categoryId].path}/${slug}`;
}

/** Chuyển /dich-vu/slug cũ sang /lam-dep/slug hoặc /dao-tao/slug */
export function resolveLegacyServicePath(path: string): string | null {
  const match = path.match(/^\/dich-vu\/([^/]+)$/);
  if (!match) return null;
  const slug = match[1];
  if (getServiceItem("lam-dep", slug)) return getServiceHref("lam-dep", slug);
  if (getServiceItem("dao-tao", slug)) return getServiceHref("dao-tao", slug);
  return null;
}

export function buildNavServiceItems(categoryId: ServiceCategoryId) {
  return SERVICE_ITEMS[categoryId].map((item) => ({
    label: item.label,
    href: getServiceHref(categoryId, item.slug),
  }));
}
