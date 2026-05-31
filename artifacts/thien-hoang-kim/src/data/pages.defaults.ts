import { MAIN_NAV } from "@/config/navigation";

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
    title: "Thiên Hoàng Kim Aesthetic Clinic",
    description:
      "Phòng khám thẩm mỹ chuẩn y khoa — nơi kiến tạo vẻ đẹp tự nhiên, an toàn và bền vững.",
    blocks: [
      p(
        "Thiên Hoàng Kim Aesthetic Clinic là địa chỉ làm đẹp uy tín tại TP.HCM với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.",
        "Chúng tôi cam kết quy trình chuẩn y khoa, tư vấn trung thực và chăm sóc tận tâm trước – trong – sau điều trị.",
      ),
    ],
  },
  "/gioi-thieu/cau-chuyen-thuong-hieu": {
    eyebrow: "Giới thiệu",
    title: "Câu chuyện thương hiệu",
    description: "Hành trình xây dựng niềm tin và chất lượng dịch vụ thẩm mỹ.",
    blocks: [
      p(
        "Thiên Hoàng Kim ra đời từ khát vọng mang đến dịch vụ thẩm mỹ an toàn, minh bạch cho khách hàng Việt.",
        "Mỗi ca điều trị đều được đặt trên nền tảng chuyên môn, đạo đức nghề nghiệp và sự tôn trọng vẻ đẹp riêng của từng người.",
      ),
    ],
  },
  "/gioi-thieu/cong-nghe-tham-my": {
    eyebrow: "Giới thiệu",
    title: "Công nghệ thẩm mỹ",
    description: "Ứng dụng thiết bị và kỹ thuật tiên tiến trong điều trị.",
    blocks: [
      p(
        "Phòng khám đầu tư máy móc nhập khẩu chính hãng: laser, HIFU, peel, soi da chuyên sâu…",
        "Bác sĩ được đào tạo liên tục để cập nhật phác đồ điều trị phù hợp từng tình trạng da và cơ địa.",
      ),
    ],
  },
  "/gioi-thieu/co-so-vat-chat": {
    eyebrow: "Giới thiệu",
    title: "Cơ sở vật chất",
    description: "Không gian sang trọng, vô trùng và riêng tư.",
    blocks: [
      p(
        "Không gian phòng khám thiết kế hiện đại, ấm cúng, đảm bảo riêng tư cho khách hàng.",
        "Phòng thủ thuật, phòng hồi sức và khu tư vấn đạt tiêu chuẩn vệ sinh y tế.",
      ),
    ],
  },
  "/bang-gia": {
    eyebrow: "Bảng giá",
    title: "Bảng giá tham khảo",
    description: "Giá dịch vụ có thể thay đổi theo tình trạng và phác đồ cá nhân. Liên hệ để được báo giá chính xác.",
    blocks: [
      {
        title: "Thẩm mỹ y khoa",
        paragraphs: [
          "Nâng mũi cấu trúc: từ 45.000.000đ",
          "Cắt mí / nhấn mí: từ 8.000.000đ",
          "Filler / Botox: từ 3.000.000đ / vùng",
          "Trẻ hóa da công nghệ cao: từ 5.000.000đ / buổi",
        ],
      },
      {
        title: "Spa & chăm sóc da",
        paragraphs: [
          "Chăm sóc da cơ bản: từ 500.000đ",
          "Peel da y khoa: từ 1.200.000đ",
          "Gội đầu dưỡng sinh: từ 350.000đ",
        ],
      },
    ],
  },
};

function buildServicePages(): Record<string, SitePageContent> {
  const pages: Record<string, SitePageContent> = {};
  const servicesNav = MAIN_NAV.find((n) => n.href === "/dich-vu");
  if (!servicesNav?.columns) return pages;

  pages["/dich-vu"] = {
    eyebrow: "Dịch vụ",
    title: "Dịch vụ thẩm mỹ",
    description: "Giải pháp thẩm mỹ y khoa và spa chăm sóc da chuyên sâu tại Thiên Hoàng Kim.",
    blocks: [],
  };

  for (const col of servicesNav.columns) {
    for (const item of col.items) {
      pages[item.href] = {
        eyebrow: col.title,
        title: item.label,
        description: `Tư vấn và điều trị ${item.label.toLowerCase()} an toàn, hiệu quả tại Thiên Hoàng Kim.`,
        blocks: [
          p(
            `Dịch vụ ${item.label} được thực hiện bởi bác sĩ có chứng chỉ hành nghề, quy trình vô trùng và theo dõi sau điều trị.`,
            "Khách hàng được thăm khám, phân tích và lên phác đồ cá nhân trước khi tiến hành.",
            "Đặt lịch tư vấn miễn phí để được bác sĩ đánh giá tình trạng và báo giá chi tiết.",
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
