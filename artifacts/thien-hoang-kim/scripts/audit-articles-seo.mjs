/** One-off audit: meta title, description, slug vs SEO standards */
const SITE_NAME = "Halee Trâm — Eyelash / Nail / Academy";
const SEP = " | ";
const TITLE_MAX = 60;
const DESC_MAX = 160;

const articles = [
  ["noi-mi-classic-hay-volume", "Nối mi Classic hay Volume — chọn loại nào phù hợp?", "So sánh nối mi classic, volume và hybrid — giúp bạn chọn dáng mi hợp mắt và phong cách hàng ngày."],
  ["son-gel-bao-lau-va-cach-giu-mau", "Sơn gel bền bao lâu? Cách giữ móng đẹp lâu hơn", "Sơn gel tại salon có thể giữ 2–3 tuần — kèm mẹo chăm sóc móng tại nhà từ Halee Trâm."],
  ["uon-mi-co-dau-khong", "Uốn mi có đau không? Ai nên uốn mi?", "Uốn mi lash lift giúp mi cong tự nhiên 6–8 tuần — nhẹ nhàng, không cần nối thêm sợi."],
  ["dinh-hinh-chan-may-chon-dang-nao", "Định hình chân mày — chọn dáng nào hợp khuôn mặt?", "Dáng chân mày ngang, cong hay sắc nét — bí quyết cân đối khuôn mặt từ chuyên viên Halee Trâm."],
  ["khoa-noi-mi-salon-co-gi", "Khóa nối mi salon tại Halee Trâm học những gì?", "Lộ trình khóa nối mi thực chiến — từ cơ bản đến ra nghề mở tiệm."],
  ["cham-soc-da-chan-tai-nha", "Chà gót chân định kỳ — vì sao nên làm mỗi tháng?", "Gót khô, nứt nẻ không chỉ mất thẩm mỹ mà còn dễ đau khi đi lại. Spa chân giúp phục hồi mềm mại."],
  ["goi-dau-thu-gian-quan-7", "Gội đầu thư giãn sau ngày dài — trải nghiệm tại Quận 7", "Gội đầu kết hợp massage da đầu giúp giảm căng thẳng, tóc bồng bền hơn."],
  ["khoa-nail-chuyen-nghiep-ra-nghe", "Khóa nail chuyên nghiệp — bao lâu thì ra nghề?", "Lộ trình học nail cơ bản đến nâng cao, thực hành đến khi tự tin nhận khách."],
  ["khoa-noi-mi-dinh-cu-hoc-gi", "Khóa nối mi định cư — chuẩn quốc tế học những gì?", "Khóa nối mi định cư tại Halee Trâm — kỹ thuật chuẩn salon quốc tế, portfolio và mock test."],
  ["khoa-cham-soc-mong-ai-nen-hoc", "Khóa chăm sóc móng — ai nên học và học được gì?", "Chuyên sâu dưỡng móng, cuticle và phục hồi móng yếu — bổ trợ hoàn hảo cho thợ nails."],
  ["khoa-dinh-hinh-chan-may-lo-trinh", "Khóa định hình chân mày — lộ trình thực hành tại Halee Trâm", "Từ đo tỷ lệ vàng đến wax, shading và phun nhẹ — học đến khi tự tin nhận khách."],
  ["khoa-hoc-uon-mi-mo-dich-vu", "Khóa uốn mi — mở thêm dịch vụ salon chỉ trong vài ngày", "Học lash lift an toàn, chọn pad, thời gian thuốc và chăm sóc sau uốn — ROI nhanh cho tiệm."],
  ["xu-huong-nail-art-2026", "Xu hướng nail art 2026 — 5 style đang hot tại Halee Trâm", "Chrome, aura, french mới và móng trong suốt tự nhiên — cập nhật xu hướng làm móng năm nay."],
  ["cham-soc-mi-sau-noi", "5 điều cần nhớ sau khi nối mi — giữ mi bền 3–4 tuần", "Tránh nước, chải mi đúng cách và không bôi dầu — mẹo chăm sóc mi từ Halee Trâm."],
  ["chon-salon-noi-mi-quan-7", "Cách chọn salon nối mi uy tín tại Quận 7", "Tiêu chí vệ sinh, mi chính hãng, ảnh thật và bảo hành — checklist trước khi đặt lịch."],
  ["combo-nail-noi-mi-tiet-kiem", "Combo nails + nối mi — tiết kiệm thời gian một buổi làm đẹp", "Ghép dịch vụ tay và mi trong cùng lần ghé — gợi ý lịch trình tại Halee Trâm Quận 7."],
  ["uon-mi-hay-noi-mi-nen-chon", "Uốn mi hay nối mi — nên chọn dịch vụ nào?", "So sánh chi phí, thời gian bảo trì và vẻ ngoài — giúp bạn quyết định nhanh."],
  ["mo-tiem-nail-can-chuan-bi-gi", "Mở tiệm nail nhỏ tại nhà — cần chuẩn bị gì?", "Dụng cụ, vốn, kỹ năng và marketing cơ bản — lộ trình từ học viên Halee Trâm."],
  ["nail-ombre-huong-dan-mau", "Nail ombre — gợi ý phối màu nude, hồng và đen bóng", "Ombre gel là một trong những thiết kế được yêu thích nhất — dễ đẹp, hợp mọi dáng tay."],
  ["huong-dan-dat-lich-halee-tram", "Hướng dẫn đặt lịch online tại Halee Trâm", "3 cách đặt lịch nhanh — form website, hotline và nhắn tin — xác nhận trong 15 phút."],
];

function buildTitle(h1) {
  if (h1.includes(SITE_NAME)) return h1;
  return `${h1}${SEP}${SITE_NAME}`;
}

function norm(s) {
  return s.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function slugMatchesTitle(slug, title) {
  const words = slug.split("-").filter((w) => w.length > 2);
  const t = norm(title);
  const matched = words.filter((w) => t.includes(w));
  return { ok: matched.length >= Math.min(2, words.length), matched, words };
}

let titleLong = 0;
let descShort = 0;
let descLong = 0;
let slugWeak = 0;

console.log("AUDIT SEO BAI VIET (fallback meta — chua co seo.metaTitle/metaDescription rieng)\n");

for (const [slug, h1, desc] of articles) {
  const metaTitle = buildTitle(h1);
  const tLen = metaTitle.length;
  const dLen = desc.length;
  const slugCheck = slugMatchesTitle(slug, h1);
  const issues = [];

  if (tLen > TITLE_MAX) {
    titleLong++;
    issues.push(`Title qua dai ${tLen}/${TITLE_MAX}`);
  }
  if (dLen < 70) {
    descShort++;
    issues.push(`Desc ngan ${dLen} (nen 120-160)`);
  }
  if (dLen > DESC_MAX) {
    descLong++;
    issues.push(`Desc qua dai ${dLen}/${DESC_MAX}`);
  }
  if (!slugCheck.ok) {
    slugWeak++;
    issues.push(`Slug/title lech tu khoa (${slugCheck.matched.join(", ") || "none"})`);
  }
  issues.push("Thieu focus keyphrase + meta rieng");

  console.log(`${slug}`);
  console.log(`  H1: ${h1}`);
  console.log(`  Meta title (${tLen}): ${metaTitle}`);
  console.log(`  Meta desc (${dLen}): ${desc}`);
  console.log(`  Van de: ${issues.join("; ")}`);
  console.log("");
}

console.log("=== TONG KET ===");
console.log(`Tong: ${articles.length} bai`);
console.log(`Title qua 60 ky tu: ${titleLong}/${articles.length}`);
console.log(`Desc < 70 ky tu: ${descShort}/${articles.length}`);
console.log(`Desc > 160 ky tu: ${descLong}/${articles.length}`);
console.log(`Slug khong khop title tot: ${slugWeak}/${articles.length}`);
console.log(`Co metaTitle/metaDescription rieng: 0/${articles.length}`);
console.log(`Co focusKeyphrase: 0/${articles.length}`);
