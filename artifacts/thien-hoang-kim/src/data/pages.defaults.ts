import { MAIN_NAV } from "@/config/navigation";
import { SERVICE_PAGE_COPY } from "@/data/service-pages.defaults";

export type PageBlock = {
  title?: string;
  paragraphs: string[];
};

export type SitePageContent = {
  title: string;
  eyebrow?: string;
  description: string;
  blocks: PageBlock[];
};

const intro =
  `${import.meta.env.BASE_URL}gioithieu.1.png`.replace(/([^:]\/)\/+/g, "$1");

function p(...text: string[]): PageBlock {
  return { paragraphs: text };
}

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
        "Với hơn 8 năm kinh nghiệm, Halee Trâm đã đồng hành cùng hàng nghìn khách hàng và hàng trăm học viên mở salon, tiệm nails và dịch vụ mi riêng.",
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
        "Chúng tôi tin rằng làm đẹp không chỉ là thay đổi diện mạo mà còn giúp phụ nữ tự tin hơn mỗi ngày. Mỗi bộ mi, bộ móng hoàn thiện đều được làm bằng sự tỉ mỉ và tôn trọng thời gian của khách.",
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
        "Studio thiết kế hiện đại theo tông nâu kem ấm áp, tạo cảm giác thư giãn ngay khi bước vào. Khu vực làm nails và nối mi riêng biệt, đảm bảo riêng tư.",
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
          "Nail art / đá / ombre: từ 250.000đ",
          "Nối mi Classic: từ 350.000đ",
          "Nối mi Volume: từ 450.000đ",
          "Uốn mi (lash lift): từ 120.000đ",
          "Định hình chân mày: từ 200.000đ",
          "Chà gót chân + dưỡng: từ 180.000đ",
          "Gội đầu thư giãn: từ 100.000đ",
          "Combo nails + mi: liên hệ ưu đãi",
        ],
      },
      {
        title: "Khóa đào tạo",
        paragraphs: [
          "Khóa Nối Mi Salon: từ 5.000.000đ",
          "Khóa Nối Mi Định Cư: liên hệ",
          "Khóa Nail Chuyên Nghiệp: từ 4.500.000đ",
          "Khóa Chăm Sóc Móng: từ 2.500.000đ",
          "Khóa Định Hình Chân Mày: từ 3.000.000đ",
          "Khóa Học Uốn Mi: từ 2.000.000đ",
          "Hỗ trợ trả góp / học nhóm — liên hệ trực tiếp.",
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
        "Halee Trâm cung cấp dịch vụ làm đẹp chuyên nghiệp và chương trình đào tạo bài bản. Dù bạn cần làm đẹp cho bản thân hay học nghề mở tiệm, chúng tôi đều có giải pháp phù hợp.",
        "Đặt lịch online hoặc gọi 0938 162 662 — 793/62 Trần Xuân Soạn, Quận 7.",
      ),
    ],
  },
};

function buildServicePages(): Record<string, SitePageContent> {
  const pages: Record<string, SitePageContent> = {};
  const servicesNav = MAIN_NAV.find((n) => n.href === "/dich-vu");
  if (!servicesNav?.columns) return pages;

  for (const col of servicesNav.columns) {
    for (const item of col.items) {
      const copy = SERVICE_PAGE_COPY[item.href];
      pages[item.href] = {
        eyebrow: col.title,
        title: item.label,
        description: copy?.description ?? `${item.label} tại Halee Trâm — hotline 0938 162 662.`,
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

export const ALL_PAGES: Record<string, SitePageContent> = {
  ...STATIC_PAGES,
  ...buildServicePages(),
};

export function getPageContent(path: string): SitePageContent | null {
  const normalized = path.replace(/\/$/, "") || "/";
  return ALL_PAGES[normalized] ?? null;
}

export const DEFAULT_HERO_IMAGE = intro;
