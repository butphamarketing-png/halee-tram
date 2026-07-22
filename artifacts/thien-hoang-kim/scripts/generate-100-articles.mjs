/**
 * Generates 100 SEO articles from Halee Trâm service keywords.
 * Output: src/data/articles.batch-100.ts + scripts/articles-batch-100.json (prerender)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/** @typedef {{ slug: string, kp: string, title: string, h1: string, desc: string, metaTitle: string, metaDesc: string, category: string, body: string[], faqs?: { question: string, answer: string }[] }} Spec */

/** @type {Spec[]} */
const specs = [];

function add(spec) {
  specs.push(spec);
}

function clampTitle(s, max = 58) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

function clampDesc(s, min = 120, max = 158) {
  let t = s.trim().replace(/\s+/g, " ");
  const cta = " Đặt lịch Halee Trâm Quận 7 — 0938 162 662.";
  if (t.length < min) t = (t + cta).trim();
  if (t.length > max) {
    t = t.slice(0, max - 1);
    const cut = Math.max(t.lastIndexOf(" "), t.lastIndexOf("—"), t.lastIndexOf(","));
    if (cut > 80) t = t.slice(0, cut);
    t = t.replace(/[,\s—-]+$/, "") + ".";
  }
  if (t.length < min) t = (t.replace(/\.$/, "") + cta).slice(0, max);
  return t;
}

function body(...paras) {
  return paras;
}

const CTA = "Halee Trâm tại 793/62 Trần Xuân Soạn, Quận 7 — hotline 0938 162 662.";

/** @type {Record<string, { href: string, label: string, tip: string }>} */
const CAT_HUB = {
  "Nối mi": {
    href: "/lam-dep/noi-mi",
    label: "dịch vụ nối mi Quận 7",
    tip: "Classic, hybrid hay volume đều gắn cách chân mi; keo ít cay, chỉnh mi trong 7 ngày đầu nếu lệch kỹ thuật.",
  },
  Nails: {
    href: "/lam-dep/nails",
    label: "dịch vụ nails Quận 7",
    tip: "Gel chính hãng, base–màu–top hấp LED; tránh bóc gel tay để không làm yếu móng.",
  },
  "Uốn mi": {
    href: "/lam-dep/uon-mi",
    label: "dịch vụ uốn mi Quận 7",
    tip: "Pad theo form mắt, 24 giờ đầu tránh nước/xông hơi để nếp cong ổn định.",
  },
  "Chân mày": {
    href: "/lam-dep/dinh-hinh-chan-may",
    label: "định hình chân mày Quận 7",
    tip: "Đo tỷ lệ đầu–đỉnh–đuôi trước khi wax/chỉ; tô viền hoặc shading khi mày thưa.",
  },
  "Spa chân": {
    href: "/lam-dep/cha-got-chan",
    label: "chà gót chân Quận 7",
    tip: "Ngâm thảo dược + chà gót định kỳ 3–4 tuần giúp giảm nứt nẻ hiệu quả hơn làm một lần.",
  },
  "Gội đầu": {
    href: "/lam-dep/goi-dau",
    label: "gội đầu thư giãn Quận 7",
    tip: "Massage da đầu kích thích tuần hoàn; có thể combo cùng nails hoặc mi trong một buổi.",
  },
  "Đào tạo": {
    href: "/dao-tao",
    label: "khóa đào tạo nghề Halee Trâm",
    tip: "Lớp sĩ số nhỏ, thực hành model thật; hỗ trợ chứng nhận và tư vấn mở tiệm sau khóa.",
  },
  "Kiến thức": {
    href: "/lam-dep",
    label: "dịch vụ làm đẹp Quận 7",
    tip: "Nails, nối mi, uốn mi, chân mày, spa chân và gội đầu — đặt lịch trước để tránh chờ.",
  },
};

function enrichBodiesAndFaqs() {
  const slugs = specs.map((s) => s.slug);
  specs.forEach((s, i) => {
    const hub = CAT_HUB[s.category] || CAT_HUB["Kiến thức"];
    const sib1 = slugs[(i + 11) % slugs.length];
    const sib2 = slugs[(i + 37) % slugs.length];
    const topic = s.h1.replace(/\?$/, "");
    s.body = [
      `${topic} là chủ đề nhiều khách tìm khi quan tâm **${s.kp}** tại Quận 7. Halee Trâm tư vấn theo nhu cầu thực tế (đi làm, dự tiệc, lần đầu) trước khi thực hiện.`,
      `Xem thêm [${hub.label}](${hub.href}) để biết quy trình và đặt lịch. Bài liên quan: [${s.kp}](/tin-tuc/${sib1}).`,
      hub.tip,
      `Muốn so sánh thêm góc nhìn khác, đọc [bài viết cùng chủ đề](/tin-tuc/${sib2}). ${CTA}`,
    ];
    s.faqs = [
      {
        question: `${s.kp} tại Halee Trâm có cần đặt lịch trước không?`,
        answer: `Nên đặt trước, đặc biệt cuối tuần. Gọi hoặc nhắn 0938 162 662 — salon tại 793/62 Trần Xuân Soạn, Quận 7.`,
      },
      {
        question: `Làm dịch vụ liên quan ${s.kp} mất bao lâu?`,
        answer: `Tùy hạng mục: uốn mi khoảng 45–60 phút, gel cơ bản 45–60 phút, nối mi classic/volume thường 90–150 phút. Chuyên viên báo thời gian khi tư vấn.`,
      },
      {
        question: `${topic} có phù hợp người lần đầu không?`,
        answer: `Có. Halee Trâm ưu tiên tư vấn nhẹ – an toàn cho khách mới, giải thích quy trình và cách chăm sóc sau làm trước khi bắt đầu.`,
      },
    ];
  });
}

// ——— NỐI MI (22) ———
const noiMi = [
  ["gia-noi-mi-quan-7", "giá nối mi Quận 7", "Giá nối mi Quận 7 cập nhật", "Giá nối mi Quận 7 — tham khảo bao nhiêu?", "Bảng giá nối mi classic, volume tại Quận 7. Tư vấn form mắt miễn phí trước khi làm tại Halee Trâm."],
  ["noi-mi-tu-nhien-quan-7", "nối mi tự nhiên Quận 7", "Nối mi tự nhiên Quận 7", "Nối mi tự nhiên Quận 7 — dáng nhẹ đi làm", "Nối mi classic tự nhiên, không nặng hốc mắt. Phù hợp công sở tại Halee Trâm Quận 7."],
  ["noi-mi-volume-quan-7", "nối mi volume Quận 7", "Nối mi Volume Quận 7", "Nối mi Volume Quận 7 — mi dày sắc nét", "Nối mi volume 2D–6D tạo mắt to rõ. Bảo hành chỉnh mi 7 ngày tại Halee Trâm Quận 7."],
  ["noi-mi-hybrid-la-gi", "nối mi hybrid", "Nối mi Hybrid là gì?", "Nối mi Hybrid là gì — cân bằng classic & volume", "Hybrid kết hợp classic trong, volume ngoài. Tư vấn dáng mi tại Halee Trâm Quận 7."],
  ["noi-mi-2d-3d-6d", "nối mi 2D 3D 6D", "Nối mi 2D 3D 6D khác nhau", "Nối mi 2D, 3D, 6D — chọn độ dày nào?", "Giải thích độ dày fan mi 2D đến 6D. Chuyên viên Halee Trâm tư vấn theo form mắt."],
  ["noi-mi-mega-volume", "nối mi mega volume", "Nối mi Mega Volume", "Nối mi Mega Volume — khi nào nên làm?", "Mega volume cho dáng mi cực dày, hợp dự tiệc. Làm tại Halee Trâm Quận 7."],
  ["noi-mi-co-dau-khong", "nối mi có đau không", "Nối mi có đau không?", "Nối mi có đau không — cảm giác thực tế", "Nối mi đúng kỹ thuật gần như không đau. Quy trình êm tại Halee Trâm Quận 7."],
  ["noi-mi-bao-hanh", "nối mi bảo hành", "Nối mi bảo hành thế nào?", "Nối mi bảo hành — chính sách chỉnh mi 7 ngày", "Chỉnh mi miễn phí 7 ngày đầu nếu lệch do kỹ thuật. Halee Trâm Quận 7 rõ ràng, minh bạch."],
  ["remo-mi-an-toan", "remo mi an toàn", "Remo mi an toàn", "Remo mi an toàn — không làm yếu mi thật", "Gỡ mi bằng remo chuyên dụng, không bóc tay. Dịch vụ remo tại Halee Trâm Quận 7."],
  ["mi-noi-ben-bao-lau", "mi nối bền bao lâu", "Mi nối bền bao lâu?", "Mi nối bền bao lâu — giữ 3–4 tuần", "Mi nối trung bình 3–4 tuần nếu chăm sóc đúng. Mẹo giữ mi từ Halee Trâm Quận 7."],
  ["noi-mi-du-tiec", "nối mi dự tiệc", "Nối mi dự tiệc", "Nối mi dự tiệc — dáng volume nổi bật", "Gợi ý dáng mi volume/hybrid cho tiệc cưới, sự kiện. Đặt lịch Halee Trâm Quận 7."],
  ["noi-mi-cong-so", "nối mi công sở", "Nối mi công sở", "Nối mi công sở — tự nhiên nhẹ nhàng", "Dáng classic/hybrid nhẹ phù hợp đi làm. Salon nối mi Quận 7 Halee Trâm."],
  ["noi-mi-mat-sau", "nối mi mắt sâu", "Nối mi cho mắt sâu", "Nối mi mắt sâu — chọn độ cong nào?", "Tư vấn độ cong C/D và độ dài cho mắt sâu tại Halee Trâm Quận 7."],
  ["noi-mi-lan-dau", "nối mi lần đầu", "Nối mi lần đầu nên chọn gì?", "Nối mi lần đầu — nên bắt đầu classic", "Người mới nên classic hoặc hybrid nhẹ. Tư vấn miễn phí tại Halee Trâm Quận 7."],
  ["keo-noi-mi-an-toan", "keo nối mi an toàn", "Keo nối mi an toàn", "Keo nối mi an toàn — ít cay, ít kích ứng", "Halee Trâm dùng keo chuẩn salon, test dị ứng khi cần. Nối mi Quận 7 an toàn."],
  ["noi-mi-va-deo-kinh", "nối mi đeo kính", "Nối mi khi đeo kính", "Nối mi đeo kính — tránh chạm gọng", "Chọn độ dài vừa phải khi đeo kính. Tư vấn tại Halee Trâm Quận 7."],
  ["noi-mi-truoc-cuoi", "nối mi trước cưới", "Nối mi trước ngày cưới", "Nối mi trước cưới — nên làm trước mấy ngày?", "Nên nối mi 2–3 ngày trước cưới. Đặt lịch sớm tại Halee Trâm Quận 7."],
  ["salon-noi-mi-tran-xuan-soan", "nối mi Trần Xuân Soạn", "Nối mi Trần Xuân Soạn", "Nối mi gần Trần Xuân Soạn Quận 7", "Salon nối mi tại 793/62 Trần Xuân Soạn — Halee Trâm. Đặt lịch 0938 162 662."],
  ["noi-mi-khong-nang-mat", "nối mi không nặng mắt", "Nối mi không nặng mắt", "Nối mi không nặng mắt — kỹ thuật cách chân", "Kỹ thuật cách chân mi đúng giúp nhẹ hốc mắt. Halee Trâm Quận 7."],
  ["cham-soc-mi-noi-mua-mua", "chăm sóc mi nối mùa mưa", "Chăm sóc mi nối mùa mưa", "Chăm sóc mi nối mùa mưa — tránh ẩm ướt", "Mẹo giữ mi bền khi trời mưa tại TP.HCM. Tư vấn Halee Trâm Quận 7."],
  ["noi-mi-cho-mat-mot", "nối mi mắt một mí", "Nối mi cho mắt một mí", "Nối mi mắt một mí — tạo chiều sâu", "Gợi ý độ cong và độ dài cho mắt một mí tại Halee Trâm Quận 7."],
  ["tai-sao-mi-noi-rung-som", "mi nối rụng sớm", "Vì sao mi nối rụng sớm?", "Mi nối rụng sớm — nguyên nhân và cách xử lý", "Rụng sớm do dầu, nước sớm hoặc kỹ thuật. Kiểm tra tại Halee Trâm Quận 7."],
];

for (const [slug, kp, short, h1, desc] of noiMi) {
  add({
    slug,
    kp,
    title: h1,
    h1,
    desc: clampDesc(desc),
    metaTitle: clampTitle(`${short} | Halee Trâm`),
    metaDesc: clampDesc(`${desc} ${CTA}`),
    category: "Nối mi",
    body: body(
      `${h1.replace(/\?$/, "")} là chủ đề nhiều khách hỏi tại Halee Trâm. Từ khóa mục tiêu: ${kp} — chúng tôi tư vấn theo form mắt, độ dài mi thật và thói quen makeup hàng ngày.`,
      `Quy trình nối mi chuẩn salon: vệ sinh mi, chọn độ cong – độ dài, gắn sợi cách chân mi an toàn, kiểm tra đối xứng hai mắt. Dụng cụ tiệt trùng, keo ít cay.`,
      `Sau nối mi: 24–48 giờ đầu tránh nước và hơi nước; chải spoolie nhẹ; tẩy trang không dầu. ${CTA}`,
    ),
  });
}

// ——— NAILS (20) ———
const nails = [
  ["gia-son-gel-quan-7", "giá sơn gel Quận 7", "Giá sơn gel Quận 7", "Giá sơn gel Quận 7 — tham khảo mới nhất", "Bảng giá sơn gel cơ bản và nail art tại Quận 7. Đặt lịch Halee Trâm 0938 162 662."],
  ["nail-art-quan-7", "nail art Quận 7", "Nail art Quận 7", "Nail art Quận 7 — thiết kế theo yêu cầu", "Nail art ombre, đá, chrome, french tại Halee Trâm Quận 7. Tư vấn design miễn phí."],
  ["son-gel-cong-so", "sơn gel công sở", "Sơn gel công sở", "Sơn gel công sở — nude và french thanh lịch", "Tone nude, french mỏng hợp công sở. Salon nails Quận 7 Halee Trâm."],
  ["french-nails-quan-7", "french nails", "French nails Quận 7", "French nails — cổ điển và biến tấu mới", "French trắng, đen, nude tại Halee Trâm. Đặt lịch nails Quận 7."],
  ["nail-chrome-la-gi", "nail chrome", "Nail chrome là gì?", "Nail chrome — hiệu ứng gương sang trọng", "Chrome nhẹ bụng móng, hợp chụp hình. Làm tại Halee Trâm Quận 7."],
  ["nail-clean-girl", "nail clean girl", "Nail clean girl", "Nail clean girl — móng trong suốt tự nhiên", "Xu hướng móng trong, tối giản. Sơn gel clean girl tại Halee Trâm Quận 7."],
  ["go-gel-dung-cach", "gỡ gel đúng cách", "Gỡ gel đúng cách", "Gỡ gel đúng cách — không bóc tay tại nhà", "Gỡ gel tại salon tránh yếu móng. Dịch vụ nails Quận 7 Halee Trâm."],
  ["mong-yeu-nen-lam-gi", "móng yếu sau gel", "Móng yếu sau gel", "Móng yếu sau gel — cách phục hồi", "Dưỡng cuticle, nghỉ gel và chăm sóc móng. Tư vấn tại Halee Trâm Quận 7."],
  ["nail-dinh-da", "nail đính đá", "Nail đính đá", "Nail đính đá tinh tế — không quá tải", "1–2 viên đá mỗi tay vừa đẹp vừa tiện. Nail art Halee Trâm Quận 7."],
  ["son-gel-mong-chan", "sơn gel móng chân", "Sơn gel móng chân", "Sơn gel móng chân bền 3–4 tuần", "Gel chân giữ lâu hơn tay. Combo spa chân tại Halee Trâm Quận 7."],
  ["lam-mong-tay-dep-quan-7", "làm móng tay đẹp Quận 7", "Làm móng tay đẹp Quận 7", "Làm móng tay đẹp Quận 7 — gel chuẩn salon", "Shape móng, cắt da, sơn gel bền màu. Halee Trâm 793/62 Trần Xuân Soạn."],
  ["nail-nude-hot", "nail nude", "Nail nude đang hot", "Nail nude — dễ phối đồ mỗi ngày", "Tone nude châu Á tại Halee Trâm. Đặt lịch nails Quận 7."],
  ["son-gel-bi-bong", "sơn gel bị bong", "Sơn gel bị bong phải làm sao?", "Sơn gel bị bong — nguyên nhân thường gặp", "Bong do dầu, nước nóng hoặc base mỏng. Kiểm tra tại Halee Trâm Quận 7."],
  ["thiet-ke-mong-theo-yeu-cau", "thiết kế móng theo yêu cầu", "Thiết kế móng theo yêu cầu", "Thiết kế móng theo yêu cầu tại Quận 7", "Mang ảnh mẫu, chuyên viên tư vấn khả thi. Halee Trâm nails Quận 7."],
  ["nail-aura-gradient", "nail aura", "Nail aura / gradient", "Nail aura gradient — chuyển màu mềm", "Aura quanh cuticle đang hot 2026. Làm tại Halee Trâm Quận 7."],
  ["tiem-nail-gan-day-quan-7", "tiệm nail gần đây Quận 7", "Tiệm nail gần đây Quận 7", "Tiệm nail gần đây Quận 7 — Halee Trâm", "Gần Trần Xuân Soạn, Tân Hưng. Đặt lịch 0938 162 662 tránh chờ."],
  ["son-gel-cho-mong-ngan", "sơn gel móng ngắn", "Sơn gel cho móng ngắn", "Sơn gel móng ngắn vẫn đẹp", "Form oval/squoval giúp móng ngắn dài ra ảo. Halee Trâm Quận 7."],
  ["cham-soc-mong-sau-gel", "chăm sóc móng sau gel", "Chăm sóc móng sau gel", "Chăm sóc móng sau gel — giữ bền màu", "Dưỡng cuticle, đeo găng rửa bát. Mẹo từ Halee Trâm Quận 7."],
  ["nail-du-tiec-cuoi", "nail dự tiệc cưới", "Nail dự tiệc cưới", "Nail dự tiệc cưới — sang và bền", "Chrome, đá tinh tế, french đen. Đặt lịch sớm Halee Trâm Quận 7."],
  ["lam-nail-bao-lau", "làm nail bao lâu", "Làm nail bao lâu?", "Làm nail bao lâu — thời gian thực tế", "Gel cơ bản 45–60 phút, nail art 75–90 phút tại Halee Trâm Quận 7."],
];

for (const [slug, kp, short, h1, desc] of nails) {
  add({
    slug,
    kp,
    title: h1,
    h1,
    desc: clampDesc(desc),
    metaTitle: clampTitle(`${short} | Halee Trâm`),
    metaDesc: clampDesc(`${desc} ${CTA}`),
    category: "Nails",
    body: body(
      `Bài viết xoay quanh từ khóa ${kp} — nhu cầu tìm nails/sơn gel tại Quận 7 ngày càng cao. Halee Trâm cập nhật xu hướng và quy trình vệ sinh chuẩn salon.`,
      `Quy trình nails: làm sạch, cắt da an toàn, dũa form, base – màu – top coat hấp thụ đèn LED. Gel chính hãng giúp màu bền 2–3 tuần.`,
      `Muốn bền màu: tránh cạy vật cứng, dưỡng cuticle mỗi tối. ${CTA}`,
    ),
  });
}

// ——— UỐN MI (12) ———
const uonMi = [
  ["gia-uon-mi-quan-7", "giá uốn mi Quận 7", "Giá uốn mi Quận 7", "Giá uốn mi Quận 7 — lash lift bao nhiêu?", "Tham khảo giá uốn mi và nhuộm mi tại Halee Trâm Quận 7. Hotline 0938 162 662."],
  ["uon-mi-ben-bao-lau", "uốn mi bền bao lâu", "Uốn mi bền bao lâu?", "Uốn mi bền bao lâu — giữ 6–8 tuần", "Lash lift giữ cong trung bình 6–8 tuần tùy chu kỳ mi. Halee Trâm Quận 7."],
  ["uon-mi-tu-nhien", "uốn mi tự nhiên", "Uốn mi tự nhiên", "Uốn mi tự nhiên — không cần nối sợi", "Cong từ gốc mi thật, mắt sáng hơn. Dịch vụ uốn mi Quận 7 Halee Trâm."],
  ["nhuom-mi-uon-mi", "nhuộm mi uốn mi", "Nhuộm mi kết hợp uốn", "Nhuộm mi + uốn mi — đôi mắt rõ nét", "Combo nhuộm đen tăng độ rõ sau uốn. Halee Trâm Quận 7."],
  ["cham-soc-sau-uon-mi", "chăm sóc sau uốn mi", "Chăm sóc sau uốn mi", "Chăm sóc sau uốn mi — 24 giờ đầu", "Tránh nước, xông hơi 24h đầu; chải mi nhẹ. Hướng dẫn tại Halee Trâm."],
  ["uon-mi-cho-mi-ngan", "uốn mi mi ngắn", "Uốn mi cho mi ngắn", "Uốn mi mi ngắn — có hiệu quả không?", "Mi ngắn vẫn cong rõ nếu chọn pad đúng. Tư vấn Halee Trâm Quận 7."],
  ["uon-mi-va-makeup", "uốn mi và makeup", "Uốn mi và makeup", "Uốn mi giúp makeup nhanh hơn", "Mi đã cong sẵn, mascara nhẹ là đủ. Uốn mi Quận 7 tại Halee Trâm."],
  ["lash-lift-quan-7", "lash lift Quận 7", "Lash lift Quận 7", "Lash lift Quận 7 — chuẩn salon", "Lash lift chuyên nghiệp tại 793/62 Trần Xuân Soạn. Halee Trâm."],
  ["uon-mi-truoc-su-kien", "uốn mi trước sự kiện", "Uốn mi trước sự kiện", "Uốn mi trước sự kiện — nên làm khi nào?", "Làm trước 1–2 ngày để mi set nếp. Đặt lịch Halee Trâm Quận 7."],
  ["uon-mi-khong-phu-hop", "ai không nên uốn mi", "Ai không nên uốn mi?", "Ai không nên uốn mi — lưu ý an toàn", "Viêm mắt, mới phẫu thuật mắt nên trì hoãn. Báo chuyên viên Halee Trâm."],
  ["so-sanh-uon-mi-noi-mi-chi-phi", "chi phí uốn mi nối mi", "Chi phí uốn mi vs nối mi", "Chi phí uốn mi và nối mi — cái nào tiết kiệm?", "Uốn ít bảo trì hơn; nối linh hoạt dáng. Tư vấn Halee Trâm Quận 7."],
  ["uon-mi-gia-re-quan-7", "uốn mi Quận 7 giá rẻ", "Uốn mi Quận 7 giá hợp lý", "Uốn mi Quận 7 giá hợp lý — chất lượng salon", "Giá minh bạch, quy trình chuẩn. Halee Trâm — 0938 162 662."],
];

for (const [slug, kp, short, h1, desc] of uonMi) {
  add({
    slug,
    kp,
    title: h1,
    h1,
    desc: clampDesc(desc),
    metaTitle: clampTitle(`${short} | Halee Trâm`),
    metaDesc: clampDesc(`${desc} ${CTA}`),
    category: "Uốn mi",
    body: body(
      `Từ khóa ${kp} phản ánh nhu cầu uốn mi / lash lift tại Quận 7. Halee Trâm dùng pad theo form mắt và thuốc uốn chuyên dụng.`,
      `Quy trình: làm sạch mi, chọn size pad, thuốc uốn – cố định – dưỡng, tùy chọn nhuộm đen. Thời gian khoảng 45–60 phút.`,
      `Sau uốn: 24 giờ tránh nước. ${CTA}`,
    ),
  });
}

// ——— CHÂN MÀY (10) ———
const chanMay = [
  ["tao-dang-chan-may-quan-7", "tạo dáng chân mày Quận 7", "Tạo dáng chân mày Quận 7", "Tạo dáng chân mày Quận 7 — wax & chỉ", "Wax/chỉ tạo dáng chuẩn tỷ lệ tại Halee Trâm Quận 7. Đặt lịch 0938 162 662."],
  ["wax-chan-may", "wax chân mày", "Wax chân mày", "Wax chân mày — nhanh và gọn", "Wax chân mày sạch sẽ, định hình rõ. Dịch vụ tại Halee Trâm Quận 7."],
  ["phun-shading-chan-may", "phun shading chân mày", "Phun shading chân mày", "Phun shading chân mày — tự nhiên mềm", "Shading nhẹ giúp mày đầy đặn tự nhiên. Tư vấn Halee Trâm Quận 7."],
  ["chan-may-mat-tron", "chân mày mặt tròn", "Chân mày cho mặt tròn", "Chân mày mặt tròn — nên chọn dáng nào?", "Mặt tròn hợp mày cong cao vừa phải. Định hình tại Halee Trâm."],
  ["chan-may-mat-dai", "chân mày mặt dài", "Chân mày cho mặt dài", "Chân mày mặt dài — dáng ngang mềm", "Mày ngang mềm cân tỷ lệ mặt dài. Halee Trâm Quận 7."],
  ["chan-may-nam", "định hình chân mày nam", "Định hình chân mày nam", "Định hình chân mày nam — gọn tự nhiên", "Dáng mày nam rõ nét, không quá mỏng. Halee Trâm Quận 7."],
  ["cham-soc-sau-dinh-hinh-may", "chăm sóc sau định hình mày", "Chăm sóc sau định hình mày", "Chăm sóc sau định hình chân mày", "24h tránh xông hơi, kem dầu vùng mày. Hướng dẫn Halee Trâm."],
  ["chan-may-thua-xu-ly", "chân mày thưa", "Chân mày thưa xử lý thế nào?", "Chân mày thưa — tô viền và shading", "Tô viền, shading làm đầy khoảng thưa. Halee Trâm Quận 7."],
  ["ty-le-vang-chan-may", "tỷ lệ vàng chân mày", "Tỷ lệ vàng chân mày", "Tỷ lệ vàng chân mày — đo điểm đầu đỉnh đuôi", "Đo tỷ lệ trước khi tạo dáng tại Halee Trâm Quận 7."],
  ["gia-dinh-hinh-chan-may", "giá định hình chân mày", "Giá định hình chân mày", "Giá định hình chân mày Quận 7", "Tham khảo giá tạo dáng, tô viền, shading. Halee Trâm 0938 162 662."],
];

for (const [slug, kp, short, h1, desc] of chanMay) {
  add({
    slug,
    kp,
    title: h1,
    h1,
    desc: clampDesc(desc),
    metaTitle: clampTitle(`${short} | Halee Trâm`),
    metaDesc: clampDesc(`${desc} ${CTA}`),
    category: "Chân mày",
    body: body(
      `Nội dung tối ưu cho từ khóa ${kp}. Chân mày ảnh hưởng lớn đến thần thái khuôn mặt — Halee Trâm đo tỷ lệ trước khi làm.`,
      `Dịch vụ gồm wax/chỉ tạo dáng, tô viền, shading nhẹ. Sản phẩm an toàn với da nhạy cảm.`,
      `${CTA}`,
    ),
  });
}

// ——— SPA CHÂN + GỘI ĐẦU (10) ———
const spaGoi = [
  ["spa-chan-quan-7", "spa chân Quận 7", "Spa chân Quận 7", "Spa chân Quận 7 — chà gót thư giãn", "Spa chân, chà gót, ngâm thảo dược tại Halee Trâm Quận 7."],
  ["got-chan-nut-ne", "gót chân nứt nẻ", "Gót chân nứt nẻ", "Gót chân nứt nẻ — nên chà gót định kỳ", "Chà gót giúp giảm nứt, da mềm. Spa chân Halee Trâm Quận 7."],
  ["cha-got-bao-lau-mot-lan", "chà gót bao lâu một lần", "Chà gót bao lâu một lần?", "Chà gót bao lâu một lần — 3–4 tuần", "Duy trì 3–4 tuần/lần cho da gót khỏe. Halee Trâm Quận 7."],
  ["ngam-chan-thao-duoc", "ngâm chân thảo dược", "Ngâm chân thảo dược", "Ngâm chân thảo dược trước chà gót", "Quy trình spa chân thư giãn tại Halee Trâm Quận 7."],
  ["goi-dau-massage-quan-7", "gội đầu massage Quận 7", "Gội đầu massage Quận 7", "Gội đầu massage Quận 7 — giảm stress", "Massage da đầu kích thích tuần hoàn. Halee Trâm Quận 7."],
  ["goi-dau-truoc-su-kien", "gội đầu trước sự kiện", "Gội đầu trước sự kiện", "Gội đầu trước sự kiện — tóc bồng đẹp", "Gội + tạo kiểu nhẹ trước tiệc. Đặt lịch Halee Trâm."],
  ["combo-goi-dau-nails", "combo gội đầu nails", "Combo gội đầu + nails", "Combo gội đầu và nails một buổi", "Tiết kiệm thời gian tại Halee Trâm Quận 7. Hotline 0938 162 662."],
  ["cham-soc-da-chan-kho", "chăm sóc da chân khô", "Chăm sóc da chân khô", "Chăm sóc da chân khô tại nhà và spa", "Kem dưỡng gót buổi tối + chà gót định kỳ. Halee Trâm."],
  ["goi-dau-toc-kho", "gội đầu tóc khô xơ", "Gội đầu cho tóc khô xơ", "Gội đầu tóc khô xơ — dưỡng ẩm", "Dầu gội dưỡng, xả mềm tại Halee Trâm Quận 7."],
  ["thu-gian-sau-gio-lam", "thư giãn sau giờ làm", "Thư giãn sau giờ làm Quận 7", "Thư giãn sau giờ làm — gội đầu & spa chân", "Reset cơ thể sau ngày dài tại Halee Trâm Quận 7."],
];

for (const [slug, kp, short, h1, desc] of spaGoi) {
  add({
    slug,
    kp,
    title: h1,
    h1,
    desc: clampDesc(desc),
    metaTitle: clampTitle(`${short} | Halee Trâm`),
    metaDesc: clampDesc(`${desc} ${CTA}`),
    category: slug.includes("goi") || short.includes("Gội") ? "Gội đầu" : "Spa chân",
    body: body(
      `Bài viết phục vụ từ khóa ${kp}. Halee Trâm kết hợp dịch vụ thư giãn với quy trình sạch sẽ, dụng cụ riêng từng khách.`,
      `Bạn có thể đặt combo cùng nails hoặc nối mi trong một lần ghé để tiết kiệm di chuyển.`,
      `${CTA}`,
    ),
  });
}

// ——— ĐÀO TẠO (20) ———
const daoTao = [
  ["hoc-phi-khoa-noi-mi", "học phí khóa nối mi", "Học phí khóa nối mi", "Học phí khóa nối mi salon bao nhiêu?", "Tham khảo học phí và lộ trình khóa nối mi tại Halee Trâm Quận 7."],
  ["hoc-phi-khoa-nail", "học phí khóa nail", "Học phí khóa nail", "Học phí khóa nail chuyên nghiệp", "Học phí nail cơ bản đến nâng cao. Đăng ký Halee Trâm 0938 162 662."],
  ["hoc-noi-mi-bao-lau", "học nối mi bao lâu", "Học nối mi bao lâu ra nghề?", "Học nối mi bao lâu thì ra nghề?", "Thời gian ra nghề tùy thực hành. Lộ trình tại Halee Trâm Academy."],
  ["hoc-nail-co-ban", "học nail cơ bản", "Học nail cơ bản", "Học nail cơ bản — gel, shape, cuticle", "Khóa cơ bản cho người mới tại Halee Trâm Quận 7."],
  ["chung-chi-noi-mi", "chứng chỉ nối mi", "Chứng chỉ nối mi salon", "Chứng chỉ nối mi sau khóa học", "Cấp chứng nhận hoàn thành khóa. Halee Trâm Quận 7."],
  ["hoc-noi-mi-co-model", "học nối mi có model", "Học nối mi có model thật không?", "Học nối mi có thực hành model thật", "Thực hành model có giám sát tại Halee Trâm Academy."],
  ["dao-tao-eyelash-tphcm", "đào tạo eyelash TP.HCM", "Đào tạo eyelash TP.HCM", "Đào tạo eyelash extension TP.HCM", "Khóa nối mi salon & định cư tại Quận 7. Halee Trâm."],
  ["hoc-uon-mi-mo-dich-vu", "học uốn mi mở dịch vụ", "Học uốn mi mở dịch vụ", "Học uốn mi để mở thêm dịch vụ salon", "ROI nhanh, vốn thấp. Khóa uốn mi Halee Trâm Quận 7."],
  ["lop-hoc-nail-nho", "lớp học nail nhỏ", "Lớp học nail sĩ số nhỏ", "Lớp nail sĩ số nhỏ — sát sao từng học viên", "Lớp ghép nhỏ tại Halee Trâm Quận 7."],
  ["hoc-nail-online-offline", "học nail offline", "Học nail offline hay online?", "Học nail offline thực chiến tốt hơn", "Thực hành trực tiếp tại Halee Trâm Academy Quận 7."],
  ["tu-van-mo-tiem-sau-khoa", "tư vấn mở tiệm sau khóa", "Tư vấn mở tiệm sau khóa", "Tư vấn mở tiệm sau tốt nghiệp", "Hỗ trợ học viên mở tiệm nail/mi. Halee Trâm Quận 7."],
  ["khoa-noi-mi-cho-nguoi-moi", "khóa nối mi người mới", "Khóa nối mi cho người mới", "Khóa nối mi cho người mới bắt đầu", "Từ vệ sinh đến classic/volume. Halee Trâm Quận 7."],
  ["portfolio-hoc-vien-nail", "portfolio học viên nail", "Portfolio học viên nail", "Làm portfolio nail sau khóa học", "Hỗ trợ chụp ảnh tay nghề. Halee Trâm Academy."],
  ["khoa-cham-soc-mong-tho-nail", "khóa chăm sóc móng thợ nail", "Khóa chăm sóc móng cho thợ", "Khóa chăm sóc móng bổ trợ thợ nail", "Dưỡng móng, cuticle, móng yếu. Halee Trâm Quận 7."],
  ["lich-khai-giang-khoa-nail", "lịch khai giảng khóa nail", "Lịch khai giảng khóa nail", "Lịch khai giảng khóa nail Quận 7", "Nhận lịch khai giảng qua 0938 162 662. Halee Trâm."],
  ["hoc-dinh-hinh-chan-may", "học định hình chân mày", "Học định hình chân mày", "Học định hình chân mày — wax & shading", "Khóa chân mày thực hành model. Halee Trâm Quận 7."],
  ["khoa-noi-mi-co-viec-lam", "khóa nối mi có việc làm", "Khóa nối mi có việc làm không?", "Sau khóa nối mi — cơ hội việc làm", "Hỗ trợ tư vấn salon tuyển dụng. Halee Trâm Academy."],
  ["dung-cu-hoc-nail-can-gi", "dụng cụ học nail", "Dụng cụ học nail cần gì?", "Dụng cụ học nail cần chuẩn bị gì?", "Gợi ý bộ dụng cụ cơ bản. Tư vấn Halee Trâm Quận 7."],
  ["khoa-uon-mi-bao-nhieu-ngay", "khóa uốn mi bao nhiêu ngày", "Khóa uốn mi bao nhiêu ngày?", "Khóa uốn mi hoàn thành trong vài ngày", "Lộ trình ngắn, triển khai dịch vụ nhanh. Halee Trâm."],
  ["hoc-vien-halee-tram-review", "học viên Halee Trâm", "Học viên Halee Trâm nói gì?", "Học viên Halee Trâm — trải nghiệm thực tế", "Academy thực chiến tại Quận 7. Liên hệ 0938 162 662."],
];

for (const [slug, kp, short, h1, desc] of daoTao) {
  add({
    slug,
    kp,
    title: h1,
    h1,
    desc: clampDesc(desc),
    metaTitle: clampTitle(`${short} | Halee Trâm`),
    metaDesc: clampDesc(`${desc} ${CTA}`),
    category: "Đào tạo",
    body: body(
      `Bài viết nhắm từ khóa ${kp} — nhóm học nghề nails/mi tại TP.HCM. Halee Trâm Academy dạy thực chiến, lớp nhỏ.`,
      `Học viên thực hành trên model, nhận feedback trực tiếp, được hỗ trợ chứng nhận và tư vấn mở tiệm khi hoàn thành lộ trình.`,
      `Nhận lịch khai giảng và học phí chi tiết: ${CTA}`,
    ),
  });
}

// ——— LOCAL / COMBO / FAQ (6) ———
const local = [
  ["salon-lam-dep-tan-hung", "salon làm đẹp Tân Hưng", "Salon làm đẹp Tân Hưng", "Salon làm đẹp Tân Hưng Quận 7", "Halee Trâm phục vụ Phường Tân Hưng — nails, mi, đào tạo."],
  ["combo-nail-uon-mi", "combo nail uốn mi", "Combo nail + uốn mi", "Combo nails và uốn mi một buổi", "Full look tiết kiệm thời gian tại Halee Trâm Quận 7."],
  ["dat-lich-cuoi-tuan-quan-7", "đặt lịch cuối tuần Quận 7", "Đặt lịch cuối tuần Quận 7", "Đặt lịch cuối tuần Quận 7 — nên đặt sớm", "Cuối tuần đông, đặt trước 1–2 ngày. Halee Trâm 0938 162 662."],
  ["review-salon-nails-quan-7", "review salon nails Quận 7", "Review salon nails Quận 7", "Review salon nails Quận 7 — Halee Trâm", "Album khách thật, vệ sinh rõ ràng. Ghé 793/62 Trần Xuân Soạn."],
  ["lam-dep-gan-phu-my-hung", "làm đẹp gần Phú Mỹ Hưng", "Làm đẹp gần Phú Mỹ Hưng", "Làm đẹp gần Phú Mỹ Hưng — Quận 7", "Gần khu Phú Mỹ Hưng, di chuyển thuận tiện tới Halee Trâm."],
  ["uu-dai-nails-noi-mi", "ưu đãi nails nối mi", "Ưu đãi nails & nối mi", "Ưu đãi nails và nối mi tại Halee Trâm", "Theo dõi ưu đãi combo. Đặt lịch 0938 162 662."],
];

for (const [slug, kp, short, h1, desc] of local) {
  add({
    slug,
    kp,
    title: h1,
    h1,
    desc: clampDesc(desc),
    metaTitle: clampTitle(`${short} | Halee Trâm`),
    metaDesc: clampDesc(`${desc} ${CTA}`),
    category: "Kiến thức",
    body: body(
      `Nội dung local SEO cho từ khóa ${kp}. Halee Trâm là điểm hẹn làm đẹp và đào tạo nghề tại Quận 7.`,
      `Dịch vụ: nails, nối mi, uốn mi, chân mày, spa chân, gội đầu và các khóa học nghề.`,
      `${CTA}`,
    ),
  });
}

// Ensure exactly 100
if (specs.length !== 100) {
  console.error(`Expected 100 articles, got ${specs.length}`);
  process.exit(1);
}

enrichBodiesAndFaqs();

const slugs = new Set();
for (const s of specs) {
  if (slugs.has(s.slug)) {
    console.error(`Duplicate slug: ${s.slug}`);
    process.exit(1);
  }
  slugs.add(s.slug);
  if (s.metaTitle.length > 60) console.warn(`Title long ${s.metaTitle.length}: ${s.slug}`);
  if (s.metaDesc.length > 160 || s.metaDesc.length < 120) {
    console.warn(`Desc ${s.metaDesc.length}: ${s.slug}`);
  }
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function faqsTs(faqs) {
  if (!faqs?.length) return "undefined";
  return `[${faqs
    .map(
      (f) =>
        `{ question: \`${esc(f.question)}\`, answer: \`${esc(f.answer)}\` }`,
    )
    .join(", ")}]`;
}

const ORIGINAL_FALLBACK_SLUGS = [
  "noi-mi-classic-hay-volume",
  "son-gel-bao-lau-va-cach-giu-mau",
  "uon-mi-co-dau-khong",
  "dinh-hinh-chan-may-chon-dang-nao",
  "khoa-noi-mi-salon-co-gi",
  "cha-got-chan-dinh-ky",
  "goi-dau-thu-gian-quan-7",
  "khoa-nail-chuyen-nghiep-ra-nghe",
  "khoa-noi-mi-dinh-cu-hoc-gi",
  "khoa-cham-soc-mong-ai-nen-hoc",
  "khoa-dinh-hinh-chan-may-lo-trinh",
  "khoa-hoc-uon-mi-mo-dich-vu",
  "xu-huong-nail-art-2026",
  "cham-soc-mi-sau-noi",
  "chon-salon-noi-mi-quan-7",
  "combo-nail-noi-mi-tiet-kiem",
  "uon-mi-hay-noi-mi-nen-chon",
  "mo-tiem-nail-can-chuan-bi-gi",
  "nail-ombre-huong-dan-mau",
  "huong-dan-dat-lich-halee-tram",
];

const ts = `/* Auto-generated by scripts/generate-100-articles.mjs — do not edit by hand */
import { DEFAULT_ARTICLE_SEO } from "@/lib/seo-defaults";
import type { SiteArticle } from "@/types/site-content";

const img = \`\${import.meta.env.BASE_URL}\${encodeURI("gioithieu.1.png")}\`.replace(/([^:]\\/)\\/+/g, "$1");

function dayOffset(i: number): string {
  const d = new Date(2026, 5, 20); // 20/06/2026 base
  d.setDate(d.getDate() - i);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return \`\${dd}/\${mm}/\${d.getFullYear()}\`;
}

export const BATCH_100_ARTICLES: SiteArticle[] = [
${specs
  .map((s, i) => {
    const id = `b${i + 1}`;
    const body = s.body.map((p) => esc(p)).join("\\n\\n");
    return `  {
    id: "${id}",
    slug: "${s.slug}",
    category: "${esc(s.category)}",
    image: img,
    title: \`${esc(s.h1)}\`,
    date: dayOffset(${i}),
    description: \`${esc(s.desc)}\`,
    body: \`${body}\`,
    published: true,
    faqs: ${faqsTs(s.faqs)},
    seo: {
      ...DEFAULT_ARTICLE_SEO,
      focusKeyphrase: \`${esc(s.kp)}\`,
      metaTitle: \`${esc(s.metaTitle)}\`,
      metaDescription: \`${esc(s.metaDesc)}\`,
      keywords: \`${esc(s.kp)}\`,
    },
  }`;
  })
  .join(",\n")}
];
`;

function dayOffsetIso(i) {
  const d = new Date(2026, 5, 20);
  d.setDate(d.getDate() - i);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const json = specs.map((s, i) => ({
  slug: s.slug,
  title: s.metaTitle,
  h1: s.h1,
  description: s.metaDesc,
  body: s.body.join(" "),
  date: dayOffsetIso(i),
  faqs: s.faqs,
  ogType: "article",
}));

const batch200Path = path.join(root, "scripts/articles-batch-200.json");
const batch200Slugs = fs.existsSync(batch200Path)
  ? JSON.parse(fs.readFileSync(batch200Path, "utf8")).map((a) => a.slug)
  : [];
const allFallbackSlugs = [...ORIGINAL_FALLBACK_SLUGS, ...specs.map((s) => s.slug), ...batch200Slugs];

fs.writeFileSync(path.join(root, "src/data/articles.batch-100.ts"), ts, "utf8");
fs.writeFileSync(path.join(root, "scripts/articles-batch-100.json"), JSON.stringify(json, null, 2), "utf8");
fs.writeFileSync(
  path.join(root, "scripts/article-slugs-fallback.json"),
  JSON.stringify(allFallbackSlugs, null, 2),
  "utf8",
);
const slugTs = `/* Auto-generated by scripts/generate-100-articles.mjs — do not edit by hand */
export const DEFAULT_ARTICLE_SLUGS: string[] = ${JSON.stringify(allFallbackSlugs, null, 2)};
`;
fs.writeFileSync(path.join(root, "server/lib/article-slugs-fallback.ts"), slugTs, "utf8");
console.log(`Wrote ${specs.length} articles + ${allFallbackSlugs.length} fallback slugs.`);
