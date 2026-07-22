import type { ArticleSeo } from "@/types/site-content";
import { DEFAULT_ARTICLE_SEO } from "@/lib/seo-defaults";

/** Per-service SEO — keeps SPA resolveServiceSeo aligned with prerender meta */
export const SERVICE_SEO_DEFAULTS: Record<string, Partial<ArticleSeo>> = {
  "/lam-dep/nails": {
    focusKeyphrase: "nails Quận 7",
    metaTitle: "Nails — Sơn gel & nail art Quận 7 | Halee Trâm",
    metaDescription:
      "Làm móng, sơn gel, nail art theo xu hướng tại Halee Trâm Quận 7. Dụng cụ tiệt trùng, tư vấn design miễn phí. Đặt lịch 0938 162 662.",
    keywords: "nails Quận 7, sơn gel Quận 7, nail art, làm móng Tân Hưng",
  },
  "/lam-dep/noi-mi": {
    focusKeyphrase: "nối mi Quận 7",
    metaTitle: "Nối mi Classic & Volume Quận 7 | Halee Trâm",
    metaDescription:
      "Nối mi classic, volume, hybrid — tự nhiên, bền đẹp tại Halee Trâm Quận 7. Bảo hành chỉnh mi 7 ngày. Đặt lịch 0938 162 662.",
    keywords: "nối mi Quận 7, nối mi classic, nối mi volume, salon nối mi",
  },
  "/lam-dep/uon-mi": {
    focusKeyphrase: "uốn mi Quận 7",
    metaTitle: "Uốn mi (Lash Lift) Quận 7 | Halee Trâm",
    metaDescription:
      "Uốn mi lash lift giữ cong 6–8 tuần, nhẹ nhàng trên mi thật. Halee Trâm Quận 7 — đặt lịch 0938 162 662.",
    keywords: "uốn mi Quận 7, lash lift, uốn mi tự nhiên",
  },
  "/lam-dep/dinh-hinh-chan-may": {
    focusKeyphrase: "định hình chân mày Quận 7",
    metaTitle: "Định hình chân mày Quận 7 | Halee Trâm",
    metaDescription:
      "Tạo dáng, wax, tô viền và shading chân mày hợp khuôn mặt tại Halee Trâm Quận 7. Đặt lịch 0938 162 662.",
    keywords: "định hình chân mày, tạo dáng chân mày Quận 7, wax chân mày",
  },
  "/lam-dep/cha-got-chan": {
    focusKeyphrase: "chà gót chân Quận 7",
    metaTitle: "Chà gót chân Quận 7 | Halee Trâm",
    metaDescription:
      "Spa chân, chà gót chuyên nghiệp giúp da mềm, hạn chế nứt nẻ. Halee Trâm Quận 7 — đặt lịch 0938 162 662.",
    keywords: "chà gót chân, spa chân Quận 7, chăm sóc gót chân",
  },
  "/lam-dep/goi-dau": {
    focusKeyphrase: "gội đầu thư giãn Quận 7",
    metaTitle: "Gội đầu thư giãn Quận 7 | Halee Trâm",
    metaDescription:
      "Gội đầu kết hợp massage da đầu giảm căng thẳng tại Halee Trâm Quận 7. Đặt lịch 0938 162 662.",
    keywords: "gội đầu thư giãn Quận 7, gội đầu massage, salon gội đầu",
  },
  "/dao-tao/khoa-noi-mi-salon": {
    focusKeyphrase: "khóa nối mi salon",
    metaTitle: "Khóa nối mi salon TP.HCM | Halee Trâm",
    metaDescription:
      "Khóa nối mi salon thực chiến: classic, volume, remo, mở tiệm. Thực hành model thật tại Halee Trâm Quận 7. Gọi 0938 162 662.",
    keywords: "học nối mi, khóa nối mi salon, đào tạo eyelash TP.HCM",
  },
  "/dao-tao/khoa-noi-mi-dinh-cu": {
    focusKeyphrase: "khóa nối mi định cư",
    metaTitle: "Khóa nối mi định cư | Halee Trâm",
    metaDescription:
      "Khóa nối mi định cư chuẩn quốc tế — volume, mega volume, portfolio, mock test. Halee Trâm Quận 7. Gọi 0938 162 662.",
    keywords: "khóa nối mi định cư, học nối mi quốc tế, portfolio nối mi",
  },
  "/dao-tao/khoa-nail-chuyen-nghiep": {
    focusKeyphrase: "khóa nail chuyên nghiệp",
    metaTitle: "Khóa nail chuyên nghiệp Quận 7 | Halee Trâm",
    metaDescription:
      "Học nail cơ bản đến nâng cao, 4–8 tuần ra nghề. Lớp nhỏ, thực hành model tại Halee Trâm. Liên hệ 0938 162 662.",
    keywords: "học nail Quận 7, khóa nail chuyên nghiệp, học nail TP.HCM",
  },
  "/dao-tao/khoa-cham-soc-mong": {
    focusKeyphrase: "khóa chăm sóc móng",
    metaTitle: "Khóa chăm sóc móng | Halee Trâm",
    metaDescription:
      "Học dưỡng móng, cuticle, phục hồi móng yếu tại Halee Trâm Academy Quận 7. Đăng ký 0938 162 662.",
    keywords: "khóa chăm sóc móng, học dưỡng móng, cuticle care",
  },
  "/dao-tao/khoa-dinh-hinh-chan-may": {
    focusKeyphrase: "khóa định hình chân mày",
    metaTitle: "Khóa định hình chân mày | Halee Trâm",
    metaDescription:
      "Học đo tỷ lệ vàng, wax, shading chân mày trên model thật. Halee Trâm Quận 7 — 0938 162 662.",
    keywords: "khóa định hình chân mày, học tạo dáng mày, brow training",
  },
  "/dao-tao/khoa-hoc-uon-mi": {
    focusKeyphrase: "khóa uốn mi",
    metaTitle: "Khóa học uốn mi | Halee Trâm",
    metaDescription:
      "Học lash lift an toàn, mở thêm dịch vụ salon nhanh. Khóa uốn mi Halee Trâm Quận 7 — 0938 162 662.",
    keywords: "khóa uốn mi, học lash lift, đào tạo uốn mi",
  },
};

export function getServiceSeoDefault(path: string): ArticleSeo {
  return { ...DEFAULT_ARTICLE_SEO, ...SERVICE_SEO_DEFAULTS[path] };
}
