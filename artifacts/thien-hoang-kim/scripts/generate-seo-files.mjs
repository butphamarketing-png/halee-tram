/**
 * Build-time SEO: sitemap, robots, and prerendered HTML shells for every public route.
 * Static HTML is served to crawlers even when Vercel serverless APIs are down.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../dist/public");
const baseUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://www.haleetram.com").replace(
  /\/$/,
  "",
);
const today = new Date().toISOString().slice(0, 10);
const siteName = "Halee Trâm — Eyelash / Nail / Academy";
const defaultOg = `${baseUrl}/slideshow123.jpg`;

const lamDep = [
  {
    slug: "nails",
    title: "Nails — Sơn gel & nail art Quận 7 | Halee Trâm",
    description:
      "Làm móng, sơn gel, nail art theo xu hướng tại Halee Trâm Quận 7. Dụng cụ tiệt trùng, tư vấn design miễn phí. Đặt lịch 0938 162 662.",
    h1: "Nails",
    body: "Dịch vụ nails tại Halee Trâm: sơn gel, french, ombre, chrome và nail art theo yêu cầu. Địa chỉ 793/62 Trần Xuân Soạn, Quận 7.",
  },
  {
    slug: "noi-mi",
    title: "Nối mi Classic & Volume Quận 7 | Halee Trâm",
    description:
      "Nối mi classic, volume, hybrid — tự nhiên, bền đẹp tại Halee Trâm Quận 7. Bảo hành chỉnh mi 7 ngày. Đặt lịch 0938 162 662.",
    h1: "Nối Mi",
    body: "Nối mi classic, volume và hybrid tại Halee Trâm. Chuyên viên tư vấn dáng mi theo form mắt. Hotline 0938 162 662.",
  },
  {
    slug: "uon-mi",
    title: "Uốn mi (Lash Lift) Quận 7 | Halee Trâm",
    description:
      "Uốn mi lash lift giữ cong 6–8 tuần, nhẹ nhàng trên mi thật. Halee Trâm Quận 7 — đặt lịch 0938 162 662.",
    h1: "Uốn Mi",
    body: "Uốn mi (lash lift) giúp mi cong từ gốc, mắt sáng hơn mà không cần nối sợi. Phù hợp mi thật dài/vừa.",
  },
  {
    slug: "dinh-hinh-chan-may",
    title: "Định hình chân mày Quận 7 | Halee Trâm",
    description:
      "Tạo dáng, wax, tô viền và shading chân mày hợp khuôn mặt tại Halee Trâm Quận 7. Đặt lịch 0938 162 662.",
    h1: "Định Hình Chân Mày",
    body: "Định hình chân mày theo tỷ lệ vàng khuôn mặt — wax/chỉ, tô viền, shading nhẹ tại Halee Trâm.",
  },
  {
    slug: "cha-got-chan",
    title: "Chà gót chân Quận 7 | Halee Trâm",
    description:
      "Spa chân, chà gót chuyên nghiệp giúp da mềm, hạn chế nứt nẻ. Halee Trâm Quận 7 — đặt lịch 0938 162 662.",
    h1: "Chà Gót Chân",
    body: "Chà gót chân định kỳ 3–4 tuần/lần giúp da gót mềm mại, giảm nứt nẻ và đau chân.",
  },
  {
    slug: "goi-dau",
    title: "Gội đầu thư giãn Quận 7 | Halee Trâm",
    description:
      "Gội đầu kết hợp massage da đầu giảm căng thẳng tại Halee Trâm Quận 7. Đặt lịch 0938 162 662.",
    h1: "Gội Đầu",
    body: "Gội đầu thư giãn, massage da đầu — có thể combo cùng nails hoặc nối mi trong một buổi.",
  },
];

const daoTao = [
  {
    slug: "khoa-noi-mi-salon",
    title: "Khóa nối mi salon TP.HCM | Halee Trâm",
    description:
      "Khóa nối mi salon thực chiến: classic, volume, remo, mở tiệm. Thực hành model thật tại Halee Trâm Quận 7. Gọi 0938 162 662.",
    h1: "Khóa Nối Mi Salon",
    body: "Đào tạo nối mi chuyên nghiệp cho môi trường salon — học viên thực hành trên model thật, cấp chứng nhận.",
  },
  {
    slug: "khoa-noi-mi-dinh-cu",
    title: "Khóa nối mi định cư | Halee Trâm",
    description:
      "Khóa nối mi định cư chuẩn quốc tế — volume, mega volume, portfolio, mock test. Halee Trâm Quận 7. Gọi 0938 162 662.",
    h1: "Khóa Nối Mi Định Cư",
    body: "Chương trình nối mi định cư với tiêu chuẩn kỹ thuật khắt khe, hỗ trợ portfolio và mock test.",
  },
  {
    slug: "khoa-nail-chuyen-nghiep",
    title: "Khóa nail chuyên nghiệp Quận 7 | Halee Trâm",
    description:
      "Học nail cơ bản đến nâng cao, 4–8 tuần ra nghề. Lớp nhỏ, thực hành model tại Halee Trâm. Liên hệ 0938 162 662.",
    h1: "Khóa Nail Chuyên Nghiệp",
    body: "Lộ trình học nail: sơn gel, ombre, nail art — trung bình 4–8 tuần tự tin nhận khách.",
  },
  {
    slug: "khoa-cham-soc-mong",
    title: "Khóa chăm sóc móng | Halee Trâm",
    description:
      "Học dưỡng móng, cuticle, phục hồi móng yếu tại Halee Trâm Academy Quận 7. Đăng ký 0938 162 662.",
    h1: "Khóa Chăm Sóc Móng",
    body: "Chuyên sâu sức khỏe móng — bổ trợ hoàn hảo cho thợ nails và chủ spa.",
  },
  {
    slug: "khoa-dinh-hinh-chan-may",
    title: "Khóa định hình chân mày | Halee Trâm",
    description:
      "Học đo tỷ lệ vàng, wax, shading chân mày trên model thật. Halee Trâm Quận 7 — 0938 162 662.",
    h1: "Khóa Định Hình Chân Mày",
    body: "Đào tạo định hình chân mày từ lý thuyết đến thực hành, cấp chứng nhận cuối khóa.",
  },
  {
    slug: "khoa-hoc-uon-mi",
    title: "Khóa học uốn mi | Halee Trâm",
    description:
      "Học lash lift an toàn, mở thêm dịch vụ salon nhanh. Khóa uốn mi Halee Trâm Quận 7 — 0938 162 662.",
    h1: "Khóa Học Uốn Mi",
    body: "Học uốn mi (lash lift): chọn pad, quy trình thuốc, nhuộm mi — triển khai ngay tại tiệm.",
  },
];

/** Synced with articles.defaults.ts ARTICLE_SEO */
const articlePages = [
  {
    slug: "noi-mi-classic-hay-volume",
    title: "Nối mi Classic hay Volume — nên chọn loại nào? | Halee Trâm",
    description:
      "So sánh nối mi classic, volume và hybrid — ưu nhược điểm, form mắt phù hợp từng dáng. Tư vấn miễn phí tại Halee Trâm Quận 7. Gọi 0938 162 662 đặt lịch.",
    h1: "Nối mi Classic hay Volume — chọn loại nào phù hợp?",
    body: "Nối mi Classic (1:1) tạo vẻ tự nhiên. Volume (2D–6D) dày rõ hơn. Hybrid cân bằng cả hai. Halee Trâm tư vấn theo form mắt tại Quận 7.",
  },
  {
    slug: "son-gel-bao-lau-va-cach-giu-mau",
    title: "Sơn gel bền bao lâu? Mẹo giữ móng đẹp | Halee Trâm",
    description:
      "Sơn gel giữ màu 2–3 tuần với chăm sóc đúng cách. Bí quyết giữ móng bền, tránh bong gel và gỡ gel an toàn tại salon nails Quận 7 Halee Trâm. Đặt lịch ngay.",
    h1: "Sơn gel bền bao lâu? Cách giữ móng đẹp lâu hơn",
    body: "Sơn gel trung bình giữ 2–3 tuần. Tránh cạy vật cứng, dưỡng cuticle, gỡ gel đúng cách tại salon.",
  },
  {
    slug: "uon-mi-co-dau-khong",
    title: "Uốn mi có đau không? Ai nên uốn mi? | Halee Trâm",
    description:
      "Uốn mi (lash lift) êm nhẹ, giữ cong 6–8 tuần — phù hợp mi thật dài, thích vẻ tự nhiên. Quy trình và chăm sóc sau uốn tại Halee Trâm Quận 7. Gọi 0938 162 662.",
    h1: "Uốn mi có đau không? Ai nên uốn mi?",
    body: "Uốn mi hầu hết không đau — chỉ hơi ấm nhẹ. Phù hợp mi thật dài/vừa, muốn vẻ tự nhiên.",
  },
  {
    slug: "dinh-hinh-chan-may-chon-dang-nao",
    title: "Định hình chân mày — chọn dáng hợp mặt | Halee Trâm",
    description:
      "Bí quyết chọn dáng chân mày ngang, cong hay sắc nét theo khuôn mặt tròn, dài, vuông. Wax, tô viền, shading tại Halee Trâm Quận 7. Đặt lịch 0938 162 662.",
    h1: "Định hình chân mày — chọn dáng nào hợp khuôn mặt?",
    body: "Mặt tròn hợp mày cong; mặt dài hợp mày ngang; mặt vuông nên đuôi mày mềm. Halee Trâm đo tỷ lệ trước khi làm.",
  },
  {
    slug: "khoa-noi-mi-salon-co-gi",
    title: "Khóa nối mi salon học gì? Lộ trình ra nghề | Halee Trâm",
    description:
      "Khóa nối mi salon: classic, volume, vệ sinh, remo, chăm sóc khách. Thực hành model thật, cấp chứng nhận, hỗ trợ mở tiệm tại Halee Trâm Quận 7. Gọi 0938 162 662.",
    h1: "Khóa nối mi salon tại Halee Trâm học những gì?",
    body: "Nội dung: vệ sinh salon, classic/volume, remo, chăm sóc khách. Thực hành model thật, hỗ trợ mở tiệm.",
  },
  {
    slug: "cha-got-chan-dinh-ky",
    title: "Chà gót chân định kỳ — vì sao nên làm? | Halee Trâm",
    description:
      "Chà gót chân chuyên nghiệp giúp da gót mềm, hạn chế nứt nẻ và đau chân. Spa chân tại Halee Trâm Quận 7 — nên duy trì 3–4 tuần/lần. Đặt lịch 0938 162 662.",
    h1: "Chà gót chân định kỳ — vì sao nên làm mỗi tháng?",
    body: "Chà gót loại bỏ lớp da già, dưỡng ẩm sâu. Nên duy trì 3–4 tuần/lần tại Halee Trâm Quận 7.",
  },
  {
    slug: "goi-dau-thu-gian-quan-7",
    title: "Gội đầu thư giãn Quận 7 — massage da đầu | Halee Trâm",
    description:
      "Gội đầu kết hợp massage da đầu giúp giảm căng thẳng, tóc bồng óng hơn. Dịch vụ thư giãn sau giờ làm tại Halee Trâm 793/62 Trần Xuân Soạn. Đặt lịch 0938 162 662.",
    h1: "Gội đầu thư giãn sau ngày dài — trải nghiệm tại Quận 7",
    body: "Gội đầu massage da đầu giúp giảm căng thẳng. Có thể combo nails hoặc nối mi cùng buổi.",
  },
  {
    slug: "khoa-nail-chuyen-nghiep-ra-nghe",
    title: "Khóa nail chuyên nghiệp — bao lâu ra nghề? | Halee Trâm",
    description:
      "Học nail cơ bản đến nâng cao: sơn gel, ombre, nail art. Trung bình 4–8 tuần tự tin nhận khách. Lớp nhỏ, thực hành model tại Halee Trâm Quận 7. Gọi 0938 162 662.",
    h1: "Khóa nail chuyên nghiệp — bao lâu thì ra nghề?",
    body: "Trung bình 4–8 tuần ra nghề cơ bản. Lớp linh hoạt, hỗ trợ portfolio và tư vấn mở tiệm.",
  },
  {
    slug: "khoa-noi-mi-dinh-cu-hoc-gi",
    title: "Khóa nối mi định cư — chuẩn quốc tế | Halee Trâm",
    description:
      "Khóa nối mi định cư chuẩn quốc tế — volume, mega volume, portfolio, mock test. Halee Trâm Quận 7 giảng trực tiếp, hỗ trợ hồ sơ nghề. Gọi 0938 162 662.",
    h1: "Khóa nối mi định cư — chuẩn quốc tế học những gì?",
    body: "Classic nâng cao, volume 3D–6D, mega volume, remo an toàn, mock test và portfolio chuẩn quốc tế.",
  },
  {
    slug: "khoa-cham-soc-mong-ai-nen-hoc",
    title: "Khóa chăm sóc móng — ai nên học? | Halee Trâm",
    description:
      "Học dưỡng móng, cuticle, phục hồi móng yếu và tư vấn liệu trình 4–6 tuần. Bổ trợ hoàn hảo cho thợ nails và chủ spa. Halee Trâm Quận 7 — đăng ký 0938 162 662.",
    h1: "Khóa chăm sóc móng — ai nên học và học được gì?",
    body: "Phù hợp thợ nail, chủ spa hoặc người mới. Học phân loại móng, cuticle, dưỡng và tư vấn liệu trình.",
  },
  {
    slug: "khoa-dinh-hinh-chan-may-lo-trinh",
    title: "Khóa định hình chân mày — lộ trình thực hành | Halee Trâm",
    description:
      "Học đo tỷ lệ vàng, wax/chỉ tạo dáng, shading và phun nhẹ trên model thật. Lớp nhỏ, cấp chứng nhận, hỗ trợ portfolio. Halee Trâm Academy Quận 7 — 0938 162 662.",
    h1: "Khóa định hình chân mày — lộ trình thực hành tại Halee Trâm",
    body: "Lý thuyết tỷ lệ khuôn mặt + thực hành wax, tô viền, shading trên model thật.",
  },
  {
    slug: "khoa-hoc-uon-mi-mo-dich-vu",
    title: "Khóa uốn mi — mở dịch vụ salon nhanh | Halee Trâm",
    description:
      "Học lash lift an toàn: chọn pad, thuốc uốn, nhuộm mi và xử lý lỗi. Triển khai dịch vụ ngay tại tiệm sau khóa học. Khóa uốn mi Halee Trâm Quận 7 — 0938 162 662.",
    h1: "Khóa uốn mi — mở thêm dịch vụ salon chỉ trong vài ngày",
    body: "Học xong có thể mở dịch vụ uốn mi ngay — vốn thấp, khách quay lại 6–8 tuần/lần.",
  },
  {
    slug: "xu-huong-nail-art-2026",
    title: "Xu hướng nail art 2026 — 5 style hot | Halee Trâm",
    description:
      "5 xu hướng nail 2026: clean girl, aura gradient, chrome, french đen, đá tinh tế. Đặt lịch nail art Halee Trâm Quận 7 — tư vấn design miễn phí. Gọi 0938 162 662.",
    h1: "Xu hướng nail art 2026 — 5 style đang hot tại Halee Trâm",
    body: "Clean girl, aura, chrome nhẹ, french đen–nude và đá tinh tế — các style đặt nhiều nhất tại Halee Trâm.",
  },
  {
    slug: "cham-soc-mi-sau-noi",
    title: "Chăm sóc mi sau nối — 5 điều cần nhớ | Halee Trâm",
    description:
      "Giữ mi nối bền 3–4 tuần: tránh nước 48h đầu, chải mi đúng cách, tẩy trang không dầu và remo an toàn. Mẹo từ chuyên viên Halee Trâm Quận 7. Bảo hành 7 ngày.",
    h1: "5 điều cần nhớ sau khi nối mi — giữ mi bền 3–4 tuần",
    body: "48 giờ đầu tránh nước; chải spoolie nhẹ; tẩy trang không dầu; không bóc mi; bảo hành 7 ngày tại Halee Trâm.",
  },
  {
    slug: "chon-salon-noi-mi-quan-7",
    title: "Chọn salon nối mi uy tín Quận 7 | Halee Trâm",
    description:
      "Checklist chọn salon nối mi: vệ sinh dụng cụ, mi keo chính hãng, ảnh khách thật, bảo hành và remo an toàn. Halee Trâm Quận 7 — đặt lịch 0938 162 662.",
    h1: "Cách chọn salon nối mi uy tín tại Quận 7",
    body: "Kiểm tra vệ sinh, nguồn mi/keo, ảnh thật, tư vấn form mắt và chính sách bảo hành trước khi đặt lịch.",
  },
  {
    slug: "combo-nail-noi-mi-tiet-kiem",
    title: "Combo nails + nối mi — tiết kiệm thời gian | Halee Trâm",
    description:
      "Làm nails và nối mi (hoặc uốn mi) trong cùng một buổi tại Halee Trâm Quận 7. Gợi ý lịch trình 2–3 giờ và combo phổ biến. Gọi 0938 162 662 đặt lịch cuối tuần.",
    h1: "Combo nails + nối mi — tiết kiệm thời gian một buổi làm đẹp",
    body: "Ghép nails và nối mi trong 2–3 giờ — full look một lần ghé Halee Trâm Quận 7.",
  },
  {
    slug: "uon-mi-hay-noi-mi-nen-chon",
    title: "Uốn mi hay nối mi — nên chọn gì? | Halee Trâm",
    description:
      "So sánh uốn mi và nối mi: chi phí, thời gian bảo trì, vẻ ngoài tự nhiên vs đậm. Tư vấn miễn phí theo form mắt tại Halee Trâm Quận 7. Hotline 0938 162 662.",
    h1: "Uốn mi hay nối mi — nên chọn dịch vụ nào?",
    body: "Uốn mi giữ 6–8 tuần, tự nhiên. Nối mi tùy độ dày, bảo trì 2–3 tuần. Có thể xen kẽ để mi thật phục hồi.",
  },
  {
    slug: "mo-tiem-nail-can-chuan-bi-gi",
    title: "Mở tiệm nail tại nhà — cần chuẩn bị gì? | Halee Trâm",
    description:
      "Checklist mở tiệm nail nhỏ: dụng cụ tối thiểu, tiệt trùng, pháp lý, marketing TikTok/Instagram. Tư vấn miễn phí cho học viên Halee Trâm Quận 7 sau tốt nghiệp.",
    h1: "Mở tiệm nail nhỏ tại nhà — cần chuẩn bị gì?",
    body: "Cần kỹ năng, dụng cụ tối thiểu, quy trình vệ sinh và marketing cơ bản. Halee Trâm tư vấn học viên tốt nghiệp.",
  },
  {
    slug: "nail-ombre-huong-dan-mau",
    title: "Nail ombre — gợi ý phối màu đẹp | Halee Trâm",
    description:
      "Gợi ý phối màu nail ombre gel: nude, hồng baby, đen bóng và cam đào. Kỹ thuật gradient chuẩn salon, 60–75 phút. Đặt lịch nails Halee Trâm Quận 7 — 0938 162 662.",
    h1: "Nail ombre — gợi ý phối màu nude, hồng và đen bóng",
    body: "Ombre gel chuyển màu mềm — nude, hồng, đen bóng và tông ấm hợp da châu Á tại Halee Trâm.",
  },
  {
    slug: "huong-dan-dat-lich-halee-tram",
    title: "Đặt lịch Halee Trâm — 3 cách nhanh nhất | Halee Trâm",
    description:
      "Hướng dẫn đặt lịch online qua form website, hotline 0938 162 662 hoặc nhắn tin Facebook/TikTok. Xác nhận trong 15 phút. 793/62 Trần Xuân Soạn, Quận 7, TP.HCM.",
    h1: "Hướng dẫn đặt lịch online tại Halee Trâm",
    body: "Đặt lịch qua form website, gọi 0938 162 662 hoặc nhắn tin. Xác nhận khoảng 15 phút. Nên đặt trước cuối tuần.",
  },
];

const staticPages = [
  {
    path: "/",
    title: "Halee Trâm | Nails, Nối Mi, Uốn Mi & Đào Tạo Nghề",
    description:
      "Halee Trâm Eyelash / Nail / Academy tại Quận 7, TP.HCM — nails, nối mi, uốn mi, định hình chân mày, spa chân, gội đầu và khóa đào tạo nghề. Đặt lịch 0938 162 662.",
    h1: "Halee Trâm — Eyelash / Nail / Academy",
    body: "Studio làm đẹp và đào tạo nghề tại 793/62 Trần Xuân Soạn, Quận 7. Nails, nối mi, uốn mi và khóa học nghề.",
  },
  {
    path: "/gioi-thieu",
    title: `Giới thiệu | ${siteName}`,
    description:
      "Halee Trâm Eyelash / Nail / Academy — studio làm đẹp và đào tạo nghề tại Quận 7 với 6 năm kinh nghiệm.",
    h1: "Giới thiệu Halee Trâm",
    body: "Halee Trâm phục vụ khách làm đẹp và đào tạo học viên ra nghề tại Quận 7, TP.HCM.",
  },
  {
    path: "/gioi-thieu/cau-chuyen-thuong-hieu",
    title: `Câu chuyện thương hiệu | ${siteName}`,
    description: "Hành trình từ đam mê làm đẹp đến academy đào tạo nghề của Halee Trâm.",
    h1: "Câu chuyện thương hiệu",
    body: "Từ tiệm nhỏ đến academy — Halee Trâm đồng hành cùng khách hàng và học viên tại Quận 7.",
  },
  {
    path: "/gioi-thieu/co-so-vat-chat",
    title: `Cơ sở vật chất | ${siteName}`,
    description: "Không gian ấm cúng, sạch sẽ — ghế nails, giường nối mi và khu đào tạo riêng tại Halee Trâm.",
    h1: "Cơ sở vật chất",
    body: "Studio tông nâu kem, dụng cụ tiệt trùng, sản phẩm chính hãng, khu đào tạo có model thực hành.",
  },
  {
    path: "/gioi-thieu/doi-ngu-bac-si",
    title: `Đội ngũ | ${siteName}`,
    description: "Đội ngũ chuyên viên nails, mi và giảng viên đào tạo tại Halee Trâm Quận 7.",
    h1: "Đội ngũ Halee Trâm",
    body: "Chuyên viên được đào tạo bài bản, cập nhật xu hướng và phục vụ tận tâm.",
  },
  {
    path: "/dich-vu",
    title: `Dịch vụ & Đào tạo làm đẹp | ${siteName}`,
    description:
      "Nails, nối mi, uốn mi, định hình chân mày, spa chân, gội đầu và khóa học nghề tại Halee Trâm Quận 7.",
    h1: "Dịch vụ & Đào tạo",
    body: "Trọn bộ dịch vụ làm đẹp và chương trình đào tạo nghề tại Halee Trâm.",
  },
  {
    path: "/lam-dep",
    title: `Dịch vụ làm đẹp Quận 7 | ${siteName}`,
    description: "Nails, mi, chân mày, chăm sóc chân và gội đầu — tận tâm từng chi tiết tại Halee Trâm.",
    h1: "Dịch vụ làm đẹp",
    body: "Nails, nối mi, uốn mi, định hình chân mày, chà gót chân và gội đầu tại Quận 7.",
  },
  {
    path: "/dao-tao",
    title: `Đào tạo nghề làm đẹp TP.HCM | ${siteName}`,
    description: "Các khóa nail, nối mi, uốn mi và định hình chân mày — học thực chiến, ra nghề nhanh.",
    h1: "Đào tạo nghề",
    body: "Khóa học nghề nails, nối mi, uốn mi, chân mày — thực hành model thật tại Halee Trâm.",
  },
  {
    path: "/khach-hang",
    title: `Thư viện ảnh khách hàng | ${siteName}`,
    description: "Hình ảnh nails, nối mi và kết quả đào tạo thực tế tại Halee Trâm Quận 7.",
    h1: "Thư viện ảnh khách hàng",
    body: "Album ảnh khách thật — nails, nối mi và học viên tại Halee Trâm.",
  },
  {
    path: "/bang-gia",
    title: `Bảng giá nails & nối mi Quận 7 | ${siteName}`,
    description: "Bảng giá tham khảo nails, nối mi, uốn mi và khóa đào tạo tại Halee Trâm. Hotline 0938 162 662.",
    h1: "Bảng giá tham khảo",
    body: "Giá dịch vụ và khóa học có thể thay đổi theo mẫu và combo. Liên hệ 0938 162 662 để báo giá chi tiết.",
  },
  {
    path: "/tin-tuc",
    title: `Tin tức & Kiến thức làm đẹp | ${siteName}`,
    description: "Cẩm nang nails, mi và mẹo chăm sóc từ Halee Trâm Quận 7.",
    h1: "Tin tức & Kiến thức làm đẹp",
    body: "Bài viết kiến thức nối mi, nails, uốn mi và đào tạo nghề từ Halee Trâm.",
  },
  {
    path: "/tin-tuc/kien-thuc",
    title: `Kiến thức làm đẹp | ${siteName}`,
    description: "Kiến thức chăm sóc nails, mi và chân mày từ Halee Trâm.",
    h1: "Kiến thức",
    body: "Chuyên mục kiến thức làm đẹp — mẹo chăm sóc và chọn dịch vụ phù hợp.",
  },
  {
    path: "/tin-tuc/tin-tuc",
    title: `Tin tức Halee Trâm | ${siteName}`,
    description: "Tin tức và cập nhật từ Halee Trâm Eyelash / Nail / Academy.",
    h1: "Tin tức",
    body: "Cập nhật dịch vụ, khóa học và ưu đãi từ Halee Trâm.",
  },
  {
    path: "/lien-he",
    title: `Liên hệ & Đặt lịch | ${siteName}`,
    description:
      "Liên hệ Halee Trâm — 793/62 Trần Xuân Soạn, Quận 7. Hotline 0938 162 662. Đặt lịch nails, nối mi hoặc tư vấn khóa học.",
    h1: "Liên hệ & Đặt lịch",
    body: "Địa chỉ: 793/62 Trần Xuân Soạn, Phường Tân Hưng, Quận 7, TP.HCM. Hotline 0938 162 662. Giờ 09:00–20:00 hàng ngày.",
  },
];

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPageList() {
  const pages = [...staticPages];
  for (const s of lamDep) {
    pages.push({
      path: `/lam-dep/${s.slug}`,
      title: s.title,
      description: s.description,
      h1: s.h1,
      body: s.body,
      ogType: "website",
    });
  }
  for (const s of daoTao) {
    pages.push({
      path: `/dao-tao/${s.slug}`,
      title: s.title,
      description: s.description,
      h1: s.h1,
      body: s.body,
      ogType: "website",
    });
  }
  for (const a of articlePages) {
    pages.push({
      path: `/tin-tuc/${a.slug}`,
      title: a.title,
      description: a.description,
      h1: a.h1,
      body: a.body,
      ogType: "article",
    });
  }
  return pages;
}

const SERVICE_COPY = {
  "/lam-dep/nails":
    "Dịch vụ Nails tại Halee Trâm mang đến bộ móng bền màu, thiết kế tinh tế và quy trình vệ sinh chuẩn salon. Sơn gel nhập chính hãng, giữ màu 2–3 tuần. Cập nhật ombre, đá, chrome và móng clean girl phù hợp công sở lẫn dự tiệc.",
  "/lam-dep/noi-mi":
    "Nối mi classic, volume và hybrid tại Halee Trâm. Phân tích form mắt và phong cách makeup để chọn độ dày, độ cong phù hợp. Mi cao cấp, keo không cay, bảo hành chỉnh mi 7 ngày đầu. Thời gian làm khoảng 90–120 phút.",
  "/lam-dep/uon-mi":
    "Uốn mi (lash lift) giữ cong 6–8 tuần trên mi thật — phù hợp ai muốn mắt to, sáng mà không nối sợi. Có thể kết hợp nhuộm đen mi. Tránh ướt mi và xông hơi 24 giờ đầu.",
  "/lam-dep/dinh-hinh-chan-may":
    "Định hình chân mày theo tỷ lệ vàng khuôn mặt: wax/chỉ, tô viền, shading. Sản phẩm an toàn, không kích ứng. Giúp khuôn mặt cân đối và trẻ trung hơn.",
  "/lam-dep/cha-got-chan":
    "Chà gót chân loại bỏ da già, ngăn nứt nẻ, ngâm thảo dược và massage thư giãn. Dụng cụ riêng, tiệt trùng sau mỗi khách. Nên duy trì 3–4 tuần/lần.",
  "/lam-dep/goi-dau":
    "Gội đầu kết hợp massage da đầu giảm căng thẳng, kích thích tuần hoàn. Có thể combo cùng nails hoặc nối mi trong một buổi tại Quận 7.",
  "/dao-tao/khoa-noi-mi-salon":
    "Khóa nối mi salon: classic, volume, vệ sinh, remo, chăm sóc khách. Thực hành model thật, cấp chứng nhận, hỗ trợ mở tiệm. Lớp nhỏ tại Halee Trâm Quận 7.",
  "/dao-tao/khoa-noi-mi-dinh-cu":
    "Khóa nối mi định cư chuẩn quốc tế — volume, mega volume, portfolio và mock test. Phù hợp học viên hướng thị trường nước ngoài hoặc salon cao cấp.",
  "/dao-tao/khoa-nail-chuyen-nghiep":
    "Học nail cơ bản đến nâng cao: sơn gel, ombre, nail art. Trung bình 4–8 tuần ra nghề. Tư vấn dụng cụ, định giá và portfolio.",
  "/dao-tao/khoa-cham-soc-mong":
    "Chuyên sâu dưỡng móng, cuticle, phục hồi móng yếu — bổ trợ thợ nails và chủ spa muốn thêm dịch vụ chăm sóc.",
  "/dao-tao/khoa-dinh-hinh-chan-may":
    "Học đo tỷ lệ vàng, wax/chỉ, shading trên model thật. Lớp nhỏ, cấp chứng nhận tại Halee Trâm Academy.",
  "/dao-tao/khoa-hoc-uon-mi":
    "Học lash lift an toàn: chọn pad, thuốc uốn, nhuộm mi. Mở thêm dịch vụ salon nhanh với vốn đầu tư thấp.",
};

function relatedLinks(path) {
  const links = [
    { href: "/lam-dep", label: "Dịch vụ làm đẹp" },
    { href: "/dao-tao", label: "Khóa đào tạo" },
    { href: "/bang-gia", label: "Bảng giá" },
    { href: "/tin-tuc", label: "Tin tức & kiến thức" },
    { href: "/lien-he", label: "Đặt lịch" },
  ];
  if (path.startsWith("/lam-dep/") && path !== "/lam-dep") {
    links.unshift({ href: "/lam-dep/noi-mi", label: "Nối mi" });
    links.unshift({ href: "/lam-dep/nails", label: "Nails" });
  }
  if (path.startsWith("/dao-tao/") && path !== "/dao-tao") {
    links.unshift({ href: "/dao-tao/khoa-noi-mi-salon", label: "Khóa nối mi salon" });
    links.unshift({ href: "/dao-tao/khoa-nail-chuyen-nghiep", label: "Khóa nail" });
  }
  if (path.startsWith("/tin-tuc/")) {
    links.unshift({ href: "/lam-dep/noi-mi", label: "Dịch vụ nối mi" });
    links.unshift({ href: "/lam-dep/nails", label: "Dịch vụ nails" });
  }
  const seen = new Set();
  return links.filter((l) => {
    if (l.href === path || seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  }).slice(0, 6);
}

function buildBreadcrumbs(path, h1) {
  const crumbs = [{ name: "Trang chủ", url: `${baseUrl}/` }];
  if (path === "/") return crumbs;
  if (path.startsWith("/lam-dep")) {
    crumbs.push({ name: "Làm đẹp", url: `${baseUrl}/lam-dep` });
  } else if (path.startsWith("/dao-tao")) {
    crumbs.push({ name: "Đào tạo", url: `${baseUrl}/dao-tao` });
  } else if (path.startsWith("/tin-tuc")) {
    crumbs.push({ name: "Tin tức", url: `${baseUrl}/tin-tuc` });
  } else if (path.startsWith("/gioi-thieu")) {
    crumbs.push({ name: "Giới thiệu", url: `${baseUrl}/gioi-thieu` });
  }
  if (path !== "/lam-dep" && path !== "/dao-tao" && path !== "/tin-tuc" && path !== "/gioi-thieu") {
    crumbs.push({ name: h1, url: `${baseUrl}${path}` });
  }
  return crumbs;
}

function buildJsonLd(page, canonical) {
  const orgId = `${baseUrl}/#organization`;
  const siteId = `${baseUrl}/#website`;
  const graphs = [];

  graphs.push({
    "@type": ["BeautySalon", "LocalBusiness"],
    "@id": orgId,
    name: "Halee Trâm",
    alternateName: siteName,
    description:
      "Eyelash / Nail / Academy tại Quận 7 — nails, nối mi, uốn mi, định hình chân mày và đào tạo nghề.",
    url: baseUrl,
    image: defaultOg,
    telephone: "+84938162662",
    email: "haleetram@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "793/62 Trần Xuân Soạn, Phường Tân Hưng",
      addressLocality: "Quận 7",
      addressRegion: "TP. Hồ Chí Minh",
      postalCode: "700000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.7415,
      longitude: 106.702,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Quận 7, TP. Hồ Chí Minh",
    },
  });

  graphs.push({
    "@type": "WebSite",
    "@id": siteId,
    url: baseUrl,
    name: siteName,
    publisher: { "@id": orgId },
    inLanguage: "vi-VN",
  });

  const crumbs = buildBreadcrumbs(page.path, page.h1);
  if (crumbs.length > 1) {
    graphs.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
    });
  }

  if (page.ogType === "article") {
    graphs.push({
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: page.h1,
      description: page.description,
      url: canonical,
      image: defaultOg,
      inLanguage: "vi-VN",
      isPartOf: { "@id": siteId },
      publisher: { "@id": orgId },
      mainEntityOfPage: canonical,
    });
  } else if (page.path.startsWith("/dao-tao/") && page.path !== "/dao-tao") {
    graphs.push({
      "@type": "Course",
      "@id": `${canonical}#course`,
      name: page.h1,
      description: page.description,
      url: canonical,
      provider: { "@id": orgId },
      inLanguage: "vi-VN",
    });
  } else if (page.path.startsWith("/lam-dep/") && page.path !== "/lam-dep") {
    graphs.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: page.h1,
      description: page.description,
      url: canonical,
      provider: { "@id": orgId },
      areaServed: "Quận 7, TP. Hồ Chí Minh",
    });
  }

  graphs.push({
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": siteId },
    about: page.path === "/" ? { "@id": orgId } : undefined,
    breadcrumb: crumbs.length > 1 ? { "@id": `${canonical}#breadcrumb` } : undefined,
    inLanguage: "vi-VN",
  });

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graphs,
  });
}

function injectSeo(html, page) {
  const canonical = `${baseUrl}${page.path === "/" ? "/" : page.path}`;
  const ogType = page.ogType || "website";
  const jsonLd = buildJsonLd(page, canonical);
  const longBody = SERVICE_COPY[page.path] || page.body;
  const links = relatedLinks(page.path)
    .map((l) => `<li><a href="${baseUrl}${l.href}">${escapeHtml(l.label)}</a></li>`)
    .join("");

  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<meta\s+name="keywords"[^>]*>/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<script[^>]*id="thk-json-ld"[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<main[^>]*id="thk-ssr-content"[^>]*>[\s\S]*?<\/main>/gi, "");

  const tags = [
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />`,
    `<meta name="geo.region" content="VN-SG" />`,
    `<meta name="geo.placename" content="Quận 7, TP. Hồ Chí Minh" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:type" content="${escapeHtml(ogType)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(defaultOg)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(page.h1)}" />`,
    `<meta property="og:locale" content="vi_VN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(defaultOg)}" />`,
    `<script id="thk-json-ld" type="application/ld+json">${jsonLd}</script>`,
  ].join("\n    ");

  out = out.replace(/<\/head>/i, `    ${tags}\n  </head>`);

  const ssr = `<main id="thk-ssr-content">
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(longBody)}</p>
      <p>${escapeHtml(page.body)}</p>
      <p><strong>Địa chỉ:</strong> 793/62 Trần Xuân Soạn, Phường Tân Hưng, Quận 7, TP.HCM — <strong>Hotline:</strong> <a href="tel:0938162662">0938 162 662</a></p>
      <nav aria-label="Liên kết liên quan"><ul>${links}</ul></nav>
      <p><a href="${baseUrl}/lien-he">Đặt lịch Halee Trâm ngay</a></p>
    </main>`;
  if (/<div id="root"><\/div>/i.test(out)) {
    out = out.replace(/<div id="root"><\/div>/i, `<div id="root"></div>\n    ${ssr}`);
  } else {
    out = out.replace(/<\/body>/i, `    ${ssr}\n  </body>`);
  }
  return out;
}

function writePrerender(shellHtml, page) {
  const html = injectSeo(shellHtml, page);
  if (page.path === "/") {
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
    return;
  }
  const dir = path.join(outDir, page.path.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

const pages = buildPageList();
const uniquePaths = [...new Set(pages.map((p) => p.path))];

const urls = uniquePaths
  .map((p) => {
    const priority = p === "/" ? "1.0" : p.startsWith("/tin-tuc/") && p !== "/tin-tuc" ? "0.7" : "0.8";
    const changefreq = p === "/" ? "daily" : p.startsWith("/tin-tuc/") ? "monthly" : "weekly";
    return `  <url>
    <loc>${baseUrl}${p === "/" ? "/" : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /adminbp
Disallow: /adminbp/

Sitemap: ${baseUrl}/sitemap.xml
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(outDir, "robots.txt"), robots, "utf8");

const shellPath = path.join(outDir, "index.html");
if (!fs.existsSync(shellPath)) {
  console.error("index.html missing — run vite build first");
  process.exit(1);
}
const shellHtml = fs.readFileSync(shellPath, "utf8");
for (const page of pages) {
  writePrerender(shellHtml, page);
}

console.log(`SEO prerender: ${pages.length} HTML pages + sitemap/robots → ${outDir}`);
