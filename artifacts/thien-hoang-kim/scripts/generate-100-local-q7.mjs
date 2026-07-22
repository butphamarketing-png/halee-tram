/**
 * Generates 100 short local-SEO articles for Quận 7 keywords.
 * Output: src/data/articles.batch-200.ts + scripts/articles-batch-200.json
 * Also merges slugs into article-slugs-fallback (original 20 + batch 100 + batch 200).
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

function pushRows(rows, category) {
  for (const [slug, kp, short, h1, desc] of rows) {
    add({
      slug,
      kp,
      title: h1,
      h1,
      desc: clampDesc(desc),
      metaTitle: clampTitle(`${short} | Halee Trâm`),
      metaDesc: clampDesc(`${desc} ${CTA}`),
      category,
      body: body(`${h1} — ${kp}. ${CTA}`),
    });
  }
}

// ——— NỐI MI ngắn + local (22) ———
pushRows(
  [
    ["noi-mi-quan-7", "nối mi Quận 7", "Nối mi Quận 7", "Nối mi Quận 7 — salon uy tín", "Salon nối mi Quận 7: classic, volume, hybrid. Tư vấn form mắt tại Halee Trâm."],
    ["tiem-noi-mi-quan-7", "tiệm nối mi Quận 7", "Tiệm nối mi Quận 7", "Tiệm nối mi Quận 7 gần bạn", "Tiệm nối mi gần Trần Xuân Soạn. Đặt lịch Halee Trâm 0938 162 662."],
    ["salon-noi-mi-quan-7", "salon nối mi Quận 7", "Salon nối mi Quận 7", "Salon nối mi Quận 7 — Halee Trâm", "Salon nối mi chuẩn kỹ thuật, bảo hành 7 ngày tại Quận 7."],
    ["noi-mi-gan-day-quan-7", "nối mi gần đây Quận 7", "Nối mi gần đây Quận 7", "Nối mi gần đây Quận 7 — tìm salon", "Tìm nối mi gần đây tại Tân Hưng, Quận 7. Halee Trâm mở cửa theo lịch hẹn."],
    ["noi-mi-tan-hung", "nối mi Tân Hưng", "Nối mi Tân Hưng", "Nối mi Tân Hưng Quận 7", "Nối mi tại Phường Tân Hưng — 793/62 Trần Xuân Soạn. Halee Trâm."],
    ["noi-mi-phu-my-hung", "nối mi Phú Mỹ Hưng", "Nối mi Phú Mỹ Hưng", "Nối mi gần Phú Mỹ Hưng", "Gần Phú Mỹ Hưng, di chuyển nhanh tới Halee Trâm Quận 7."],
    ["noi-mi-nguyen-thi-thap", "nối mi Nguyễn Thị Thập", "Nối mi Nguyễn Thị Thập", "Nối mi gần Nguyễn Thị Thập", "Salon nối mi gần Nguyễn Thị Thập Quận 7 — Halee Trâm."],
    ["noi-mi-le-van-luong", "nối mi Lê Văn Lương", "Nối mi Lê Văn Lương", "Nối mi gần Lê Văn Lương", "Gần trục Lê Văn Lương Quận 7. Đặt lịch nối mi Halee Trâm."],
    ["noi-mi-huynh-tan-phat", "nối mi Huỳnh Tấn Phát", "Nối mi Huỳnh Tấn Phát", "Nối mi gần Huỳnh Tấn Phát", "Khách khu Huỳnh Tấn Phát dễ ghé Halee Trâm Quận 7."],
    ["noi-mi-tan-phong", "nối mi Tân Phong", "Nối mi Tân Phong", "Nối mi Tân Phong Quận 7", "Phục vụ khách Tân Phong — nối mi classic/volume tại Halee Trâm."],
    ["noi-mi-tan-quy", "nối mi Tân Quy", "Nối mi Tân Quy", "Nối mi Tân Quy Quận 7", "Nối mi cho khách Tân Quy. Hotline Halee Trâm 0938 162 662."],
    ["noi-mi-tan-kieng", "nối mi Tân Kiểng", "Nối mi Tân Kiểng", "Nối mi Tân Kiểng Quận 7", "Salon nối mi phục vụ Tân Kiểng. Halee Trâm Quận 7."],
    ["fill-mi-quan-7", "fill mi Quận 7", "Fill mi Quận 7", "Fill mi Quận 7 — bổ sung mi rụng", "Fill mi 2–3 tuần/lần giữ dáng đẹp. Đặt lịch Halee Trâm Quận 7."],
    ["goi-mi-quan-7", "gội mi Quận 7", "Gội mi Quận 7", "Gội mi Quận 7 — làm sạch chân mi", "Gội mi nhẹ trước nối/fill. Dịch vụ tại Halee Trâm Quận 7."],
    ["noi-mi-gia-re-quan-7", "nối mi giá rẻ Quận 7", "Nối mi giá rẻ Quận 7", "Nối mi Quận 7 giá hợp lý", "Giá minh bạch, chất lượng salon. Halee Trâm Quận 7."],
    ["noi-mi-uy-tin-quan-7", "nối mi uy tín Quận 7", "Nối mi uy tín Quận 7", "Nối mi uy tín Quận 7 — chọn salon nào?", "Ưu tiên keo chuẩn, bảo hành, ảnh thật. Halee Trâm Quận 7."],
    ["eyelash-quan-7", "eyelash Quận 7", "Eyelash Quận 7", "Eyelash extension Quận 7", "Eyelash classic & volume tại Halee Trâm Quận 7."],
    ["noi-mi-dep-quan-7", "nối mi đẹp Quận 7", "Nối mi đẹp Quận 7", "Nối mi đẹp Quận 7 — dáng theo mắt", "Tư vấn dáng mi theo form mắt tại Halee Trâm Quận 7."],
    ["noi-mi-nhanh-quan-7", "nối mi nhanh Quận 7", "Nối mi nhanh Quận 7", "Nối mi nhanh Quận 7 — đặt lịch trước", "Đặt trước để giảm chờ. Classic/volume tại Halee Trâm."],
    ["remo-mi-quan-7", "remo mi Quận 7", "Remo mi Quận 7", "Remo mi Quận 7 — gỡ an toàn", "Gỡ mi bằng remo chuyên dụng tại Halee Trâm Quận 7."],
    ["noi-mi-q7", "nối mi Q7", "Nối mi Q7", "Nối mi Q7 — Halee Trâm", "Nối mi Q7 tại 793/62 Trần Xuân Soạn. Hotline 0938 162 662."],
    ["mi-noi-quan-7", "mi nối Quận 7", "Mi nối Quận 7", "Mi nối Quận 7 — bền đẹp", "Mi nối chuẩn salon, chăm sóc đúng cách. Halee Trâm Quận 7."],
  ],
  "Nối mi",
);

// ——— NAILS ngắn + local (22) ———
pushRows(
  [
    ["nail-quan-7", "nail Quận 7", "Nail Quận 7", "Nail Quận 7 — sơn gel & art", "Tiệm nail Quận 7: gel, french, chrome. Halee Trâm 0938 162 662."],
    ["tiem-nail-quan-7", "tiệm nail Quận 7", "Tiệm nail Quận 7", "Tiệm nail Quận 7 uy tín", "Tiệm nail gần Trần Xuân Soạn. Đặt lịch Halee Trâm Quận 7."],
    ["son-gel-quan-7", "sơn gel Quận 7", "Sơn gel Quận 7", "Sơn gel Quận 7 — bền màu", "Sơn gel chính hãng, giữ 2–3 tuần tại Halee Trâm Quận 7."],
    ["lam-mong-quan-7", "làm móng Quận 7", "Làm móng Quận 7", "Làm móng Quận 7 — gel chuẩn", "Làm móng tay/chân gel tại Halee Trâm Quận 7."],
    ["nail-tan-hung", "nail Tân Hưng", "Nail Tân Hưng", "Nail Tân Hưng Quận 7", "Salon nails Phường Tân Hưng — Halee Trâm."],
    ["nail-phu-my-hung", "nail Phú Mỹ Hưng", "Nail Phú Mỹ Hưng", "Nail gần Phú Mỹ Hưng", "Gần Phú Mỹ Hưng, ghé làm nail tại Halee Trâm Quận 7."],
    ["nail-tran-xuan-soan", "nail Trần Xuân Soạn", "Nail Trần Xuân Soạn", "Nail Trần Xuân Soạn Quận 7", "Tiệm nail 793/62 Trần Xuân Soạn — Halee Trâm."],
    ["nail-nguyen-van-linh", "nail Nguyễn Văn Linh", "Nail Nguyễn Văn Linh", "Nail gần Nguyễn Văn Linh", "Khách khu Nguyễn Văn Linh dễ đặt nail Halee Trâm."],
    ["nail-tan-thuan", "nail Tân Thuận", "Nail Tân Thuận", "Nail Tân Thuận Quận 7", "Phục vụ Tân Thuận Đông/Tây — nails Halee Trâm."],
    ["nail-binh-thuan-q7", "nail Bình Thuận Q7", "Nail Bình Thuận Q7", "Nail Bình Thuận Quận 7", "Salon nails gần Bình Thuận Quận 7. Halee Trâm."],
    ["go-gel-quan-7", "gỡ gel Quận 7", "Gỡ gel Quận 7", "Gỡ gel Quận 7 — không bóc tay", "Gỡ gel an toàn tại salon. Halee Trâm Quận 7."],
    ["nail-art-gan-day", "nail art gần đây", "Nail art gần đây", "Nail art gần đây Quận 7", "Tìm nail art gần đây tại Quận 7 — Halee Trâm."],
    ["mong-tay-quan-7", "móng tay Quận 7", "Móng tay Quận 7", "Móng tay Quận 7 — đẹp bền", "Làm móng tay gel Quận 7 tại Halee Trâm."],
    ["mong-chan-quan-7", "móng chân Quận 7", "Móng chân Quận 7", "Móng chân Quận 7 — gel bền", "Sơn gel móng chân bền lâu tại Halee Trâm Quận 7."],
    ["nail-gia-re-quan-7", "nail giá rẻ Quận 7", "Nail giá rẻ Quận 7", "Nail Quận 7 giá hợp lý", "Bảng giá rõ, gel chuẩn salon. Halee Trâm Quận 7."],
    ["tiem-son-gel-quan-7", "tiệm sơn gel Quận 7", "Tiệm sơn gel Quận 7", "Tiệm sơn gel Quận 7 gần bạn", "Tiệm sơn gel Quận 7 — Halee Trâm, đặt trước tránh chờ."],
    ["nail-q7", "nail Q7", "Nail Q7", "Nail Q7 — Halee Trâm", "Nail Q7 tại Tân Hưng. Hotline 0938 162 662."],
    ["lam-nail-quan-7", "làm nail Quận 7", "Làm nail Quận 7", "Làm nail Quận 7 — đặt lịch", "Làm nail gel/art tại Halee Trâm Quận 7."],
    ["nail-dep-quan-7", "nail đẹp Quận 7", "Nail đẹp Quận 7", "Nail đẹp Quận 7 — theo mẫu", "Mang ảnh mẫu, chuyên viên tư vấn. Halee Trâm Quận 7."],
    ["french-nail-quan-7", "french nail Quận 7", "French nail Quận 7", "French nail Quận 7 — thanh lịch", "French trắng/nude tại Halee Trâm Quận 7."],
    ["nail-ombre-quan-7", "nail ombre Quận 7", "Nail ombre Quận 7", "Nail ombre Quận 7 — chuyển màu", "Ombre gel mềm mại tại Halee Trâm Quận 7."],
    ["salon-nail-quan-7", "salon nail Quận 7", "Salon nail Quận 7", "Salon nail Quận 7 — vệ sinh sạch", "Salon nail dụng cụ tiệt trùng. Halee Trâm Quận 7."],
  ],
  "Nails",
);

// ——— UỐN MI ngắn + local (12) ———
pushRows(
  [
    ["uon-mi-quan-7", "uốn mi Quận 7", "Uốn mi Quận 7", "Uốn mi Quận 7 — lash lift", "Uốn mi giữ cong 6–8 tuần tại Halee Trâm Quận 7."],
    ["tiem-uon-mi-quan-7", "tiệm uốn mi Quận 7", "Tiệm uốn mi Quận 7", "Tiệm uốn mi Quận 7 gần bạn", "Tiệm uốn mi Tân Hưng — Halee Trâm Quận 7."],
    ["lash-lift-gan-day", "lash lift gần đây", "Lash lift gần đây", "Lash lift gần đây Quận 7", "Tìm lash lift gần đây tại Quận 7. Đặt Halee Trâm."],
    ["uon-mi-tan-hung", "uốn mi Tân Hưng", "Uốn mi Tân Hưng", "Uốn mi Tân Hưng Quận 7", "Uốn mi tại Phường Tân Hưng. Halee Trâm 0938 162 662."],
    ["uon-mi-phu-my-hung", "uốn mi Phú Mỹ Hưng", "Uốn mi Phú Mỹ Hưng", "Uốn mi gần Phú Mỹ Hưng", "Gần Phú Mỹ Hưng — uốn mi Halee Trâm Quận 7."],
    ["nhuom-mi-quan-7", "nhuộm mi Quận 7", "Nhuộm mi Quận 7", "Nhuộm mi Quận 7 — đôi mắt rõ", "Nhuộm đen mi + uốn tại Halee Trâm Quận 7."],
    ["uon-mi-q7", "uốn mi Q7", "Uốn mi Q7", "Uốn mi Q7 — chuẩn salon", "Uốn mi Q7 tại 793/62 Trần Xuân Soạn."],
    ["uon-mi-dep-quan-7", "uốn mi đẹp Quận 7", "Uốn mi đẹp Quận 7", "Uốn mi đẹp Quận 7 — pad đúng form", "Chọn pad theo form mắt tại Halee Trâm Quận 7."],
    ["uon-mi-gan-day-quan-7", "uốn mi gần đây Quận 7", "Uốn mi gần đây Quận 7", "Uốn mi gần đây Quận 7 — đặt sớm", "Uốn mi gần đây Quận 7: đặt trước cuối tuần."],
    ["combo-uon-mi-nhuom", "combo uốn mi nhuộm", "Combo uốn mi nhuộm", "Combo uốn mi + nhuộm Quận 7", "Combo tiết kiệm thời gian tại Halee Trâm Quận 7."],
    ["uon-mi-tran-xuan-soan", "uốn mi Trần Xuân Soạn", "Uốn mi Trần Xuân Soạn", "Uốn mi Trần Xuân Soạn Quận 7", "Uốn mi tại Trần Xuân Soạn — Halee Trâm."],
    ["lash-perm-quan-7", "lash perm Quận 7", "Lash perm Quận 7", "Lash perm Quận 7 — uốn mi thật", "Lash perm / lash lift tại Halee Trâm Quận 7."],
  ],
  "Uốn mi",
);

// ——— CHÂN MÀY ngắn + local (10) ———
pushRows(
  [
    ["chan-may-quan-7", "chân mày Quận 7", "Chân mày Quận 7", "Chân mày Quận 7 — tạo dáng", "Tạo dáng chân mày Quận 7 tại Halee Trâm."],
    ["wax-may-quan-7", "wax mày Quận 7", "Wax mày Quận 7", "Wax mày Quận 7 — nhanh gọn", "Wax chân mày sạch sẽ tại Halee Trâm Quận 7."],
    ["tao-may-quan-7", "tạo mày Quận 7", "Tạo mày Quận 7", "Tạo mày Quận 7 — theo tỷ lệ", "Đo tỷ lệ vàng trước khi tạo dáng. Halee Trâm Quận 7."],
    ["dinh-hinh-may-quan-7", "định hình mày Quận 7", "Định hình mày Quận 7", "Định hình mày Quận 7 — wax & chỉ", "Định hình chân mày chuẩn tỷ lệ tại Halee Trâm."],
    ["shading-may-quan-7", "shading mày Quận 7", "Shading mày Quận 7", "Shading mày Quận 7 — mềm tự nhiên", "Shading nhẹ làm đầy mày thưa. Halee Trâm Quận 7."],
    ["chan-may-tan-hung", "chân mày Tân Hưng", "Chân mày Tân Hưng", "Chân mày Tân Hưng Quận 7", "Định hình mày tại Tân Hưng — Halee Trâm."],
    ["to-vien-may-quan-7", "tô viền mày Quận 7", "Tô viền mày Quận 7", "Tô viền mày Quận 7 — rõ nét", "Tô viền chân mày tự nhiên tại Halee Trâm Quận 7."],
    ["lam-may-quan-7", "làm mày Quận 7", "Làm mày Quận 7", "Làm mày Quận 7 — gọn mặt", "Làm mày gọn, hợp khuôn mặt tại Halee Trâm."],
    ["chan-may-q7", "chân mày Q7", "Chân mày Q7", "Chân mày Q7 — Halee Trâm", "Chân mày Q7: wax, tô viền, shading. Hotline 0938 162 662."],
    ["may-dep-quan-7", "mày đẹp Quận 7", "Mày đẹp Quận 7", "Mày đẹp Quận 7 — tư vấn dáng", "Tư vấn dáng mày theo khuôn mặt tại Halee Trâm."],
  ],
  "Chân mày",
);

// ——— SPA + GỘI ngắn + local (10) ———
pushRows(
  [
    ["cha-got-quan-7", "chà gót Quận 7", "Chà gót Quận 7", "Chà gót Quận 7 — da mềm", "Chà gót chân định kỳ tại Halee Trâm Quận 7."],
    ["spa-chan-gan-day", "spa chân gần đây", "Spa chân gần đây", "Spa chân gần đây Quận 7", "Spa chân gần đây Quận 7 — Halee Trâm Tân Hưng."],
    ["goi-dau-quan-7", "gội đầu Quận 7", "Gội đầu Quận 7", "Gội đầu Quận 7 — thư giãn", "Gội đầu massage da đầu tại Halee Trâm Quận 7."],
    ["goi-dau-tan-hung", "gội đầu Tân Hưng", "Gội đầu Tân Hưng", "Gội đầu Tân Hưng Quận 7", "Gội đầu thư giãn tại Tân Hưng — Halee Trâm."],
    ["cham-soc-chan-quan-7", "chăm sóc chân Quận 7", "Chăm sóc chân Quận 7", "Chăm sóc chân Quận 7 — spa gót", "Chăm sóc da chân, chà gót tại Halee Trâm Quận 7."],
    ["massage-da-dau-quan-7", "massage da đầu Quận 7", "Massage da đầu Quận 7", "Massage da đầu Quận 7 — giảm stress", "Massage da đầu kèm gội tại Halee Trâm Quận 7."],
    ["spa-got-chan-quan-7", "spa gót chân Quận 7", "Spa gót chân Quận 7", "Spa gót chân Quận 7 — ngâm thảo dược", "Spa gót + ngâm thảo dược tại Halee Trâm Quận 7."],
    ["goi-dau-q7", "gội đầu Q7", "Gội đầu Q7", "Gội đầu Q7 — Halee Trâm", "Gội đầu Q7, có thể combo nails/mi. 0938 162 662."],
    ["thu-gian-quan-7", "thư giãn Quận 7", "Thư giãn Quận 7", "Thư giãn Quận 7 — gội & spa", "Gói thư giãn gội đầu + spa chân tại Halee Trâm."],
    ["combo-spa-goi-dau", "combo spa gội đầu", "Combo spa gội đầu", "Combo spa chân + gội đầu Quận 7", "Combo thư giãn một buổi tại Halee Trâm Quận 7."],
  ],
  "Spa chân",
);

// Fix category for gội-related rows in spaGoi-style list
for (const s of specs) {
  if (
    s.slug.includes("goi-dau") ||
    s.slug.includes("massage-da-dau") ||
    s.kp.includes("gội đầu") ||
    s.kp.includes("massage da đầu")
  ) {
    if (s.category === "Spa chân") s.category = "Gội đầu";
  }
  if (s.slug === "thu-gian-quan-7" || s.slug === "combo-spa-goi-dau") {
    s.category = "Kiến thức";
  }
}

// ——— ĐÀO TẠO ngắn + local (12) ———
pushRows(
  [
    ["hoc-noi-mi-quan-7", "học nối mi Quận 7", "Học nối mi Quận 7", "Học nối mi Quận 7 — academy", "Khóa nối mi thực chiến tại Halee Trâm Quận 7."],
    ["hoc-nail-quan-7", "học nail Quận 7", "Học nail Quận 7", "Học nail Quận 7 — ra nghề", "Khóa nail cơ bản đến nâng cao tại Quận 7."],
    ["dao-tao-nail-quan-7", "đào tạo nail Quận 7", "Đào tạo nail Quận 7", "Đào tạo nail Quận 7 — lớp nhỏ", "Lớp nail sĩ số nhỏ tại Halee Trâm Academy."],
    ["dao-tao-noi-mi-quan-7", "đào tạo nối mi Quận 7", "Đào tạo nối mi Quận 7", "Đào tạo nối mi Quận 7 — model thật", "Học nối mi có model, giám sát sát sao. Halee Trâm."],
    ["khoa-hoc-nail-quan-7", "khóa học nail Quận 7", "Khóa học nail Quận 7", "Khóa học nail Quận 7 — lịch khai giảng", "Nhận lịch khai giảng qua 0938 162 662."],
    ["khoa-hoc-noi-mi-quan-7", "khóa học nối mi Quận 7", "Khóa học nối mi Quận 7", "Khóa học nối mi Quận 7 — salon", "Khóa nối mi salon tại Halee Trâm Quận 7."],
    ["hoc-uon-mi-quan-7", "học uốn mi Quận 7", "Học uốn mi Quận 7", "Học uốn mi Quận 7 — mở dịch vụ", "Khóa uốn mi ngắn ngày tại Halee Trâm Quận 7."],
    ["academy-nail-quan-7", "academy nail Quận 7", "Academy nail Quận 7", "Academy nail Quận 7 — Halee Trâm", "Academy nail thực chiến Quận 7. Liên hệ Halee Trâm."],
    ["hoc-nghe-nail-q7", "học nghề nail Q7", "Học nghề nail Q7", "Học nghề nail Q7 — thực hành", "Học nghề nail Q7 với model thật. Halee Trâm."],
    ["hoc-nghe-noi-mi-q7", "học nghề nối mi Q7", "Học nghề nối mi Q7", "Học nghề nối mi Q7 — chứng nhận", "Học nghề nối mi Q7, hỗ trợ chứng nhận. Halee Trâm."],
    ["trung-tam-dao-tao-nail-quan-7", "trung tâm đào tạo nail Quận 7", "Trung tâm đào tạo nail Q7", "Trung tâm đào tạo nail Quận 7", "Trung tâm đào tạo nail tại Quận 7 — Halee Trâm."],
    ["lop-hoc-noi-mi-quan-7", "lớp học nối mi Quận 7", "Lớp học nối mi Quận 7", "Lớp học nối mi Quận 7 — sĩ số nhỏ", "Lớp nối mi nhỏ, sát sao từng học viên. Halee Trâm."],
  ],
  "Đào tạo",
);

// ——— LOCAL / brand / combo ngắn (12) ———
pushRows(
  [
    ["lam-dep-quan-7", "làm đẹp Quận 7", "Làm đẹp Quận 7", "Làm đẹp Quận 7 — nails & mi", "Một điểm đến nails, mi, mày tại Halee Trâm Quận 7."],
    ["salon-quan-7", "salon Quận 7", "Salon Quận 7", "Salon Quận 7 — Halee Trâm", "Salon làm đẹp Quận 7 tại Trần Xuân Soạn."],
    ["tiem-lam-dep-quan-7", "tiệm làm đẹp Quận 7", "Tiệm làm đẹp Quận 7", "Tiệm làm đẹp Quận 7 gần bạn", "Tiệm làm đẹp Tân Hưng — Halee Trâm Quận 7."],
    ["halee-tram-quan-7", "Halee Trâm Quận 7", "Halee Trâm Quận 7", "Halee Trâm Quận 7 — địa chỉ", "Halee Trâm: 793/62 Trần Xuân Soạn, Quận 7. 0938 162 662."],
    ["dat-lich-quan-7", "đặt lịch Quận 7", "Đặt lịch Quận 7", "Đặt lịch Quận 7 — Halee Trâm", "Đặt lịch nails/mi Quận 7 qua hotline 0938 162 662."],
    ["lam-dep-tan-phong", "làm đẹp Tân Phong", "Làm đẹp Tân Phong", "Làm đẹp Tân Phong Quận 7", "Khách Tân Phong ghé Halee Trâm làm nails/mi."],
    ["lam-dep-tan-quy", "làm đẹp Tân Quy", "Làm đẹp Tân Quy", "Làm đẹp Tân Quy Quận 7", "Làm đẹp gần Tân Quy — Halee Trâm Quận 7."],
    ["gan-crescent-mall", "làm đẹp gần Crescent Mall", "Gần Crescent Mall", "Làm đẹp gần Crescent Mall Quận 7", "Gần Crescent Mall — ghé Halee Trâm Quận 7."],
    ["gan-sc-vivocity", "làm đẹp gần SC VivoCity", "Gần SC VivoCity", "Làm đẹp gần SC VivoCity", "Gần SC VivoCity Quận 7 — salon Halee Trâm."],
    ["combo-nail-noi-mi-quan-7", "combo nail nối mi Quận 7", "Combo nail nối mi Q7", "Combo nail + nối mi Quận 7", "Combo full look một buổi tại Halee Trâm Quận 7."],
    ["beauty-salon-quan-7", "beauty salon Quận 7", "Beauty salon Quận 7", "Beauty salon Quận 7 — Halee Trâm", "Beauty salon nails & lash tại Quận 7."],
    ["dia-chi-halee-tram", "địa chỉ Halee Trâm", "Địa chỉ Halee Trâm", "Địa chỉ Halee Trâm Quận 7", "Địa chỉ: 793/62 Trần Xuân Soạn, Tân Hưng, Quận 7."],
  ],
  "Kiến thức",
);

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

// Conflict check vs batch 100
const batch100Path = path.join(root, "scripts/articles-batch-100.json");
if (fs.existsSync(batch100Path)) {
  const batch100 = JSON.parse(fs.readFileSync(batch100Path, "utf8"));
  for (const a of batch100) {
    if (slugs.has(a.slug)) {
      console.error(`Slug conflicts with batch-100: ${a.slug}`);
      process.exit(1);
    }
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

const ts = `/* Auto-generated by scripts/generate-100-local-q7.mjs — do not edit by hand */
import { DEFAULT_ARTICLE_SEO } from "@/lib/seo-defaults";
import type { SiteArticle } from "@/types/site-content";

const img = \`\${import.meta.env.BASE_URL}\${encodeURI("gioithieu.1.png")}\`.replace(/([^:]\\/)\\/+/g, "$1");

function dayOffset(i: number): string {
  const d = new Date(2026, 6, 22); // 22/07/2026 base (batch 2)
  d.setDate(d.getDate() - i);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return \`\${dd}/\${mm}/\${d.getFullYear()}\`;
}

export const BATCH_200_ARTICLES: SiteArticle[] = [
${specs
  .map((s, i) => {
    const id = `c${i + 1}`;
    const bodyText = s.body.map((p) => esc(p)).join("\\n\\n");
    return `  {
    id: "${id}",
    slug: "${s.slug}",
    category: "${esc(s.category)}",
    image: img,
    title: \`${esc(s.h1)}\`,
    date: dayOffset(${i}),
    description: \`${esc(s.desc)}\`,
    body: \`${bodyText}\`,
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
  const d = new Date(2026, 6, 22);
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

const batch100Slugs = fs.existsSync(batch100Path)
  ? JSON.parse(fs.readFileSync(batch100Path, "utf8")).map((a) => a.slug)
  : [];
const allFallbackSlugs = [...ORIGINAL_FALLBACK_SLUGS, ...batch100Slugs, ...specs.map((s) => s.slug)];

fs.writeFileSync(path.join(root, "src/data/articles.batch-200.ts"), ts, "utf8");
fs.writeFileSync(path.join(root, "scripts/articles-batch-200.json"), JSON.stringify(json, null, 2), "utf8");
fs.writeFileSync(
  path.join(root, "scripts/article-slugs-fallback.json"),
  JSON.stringify(allFallbackSlugs, null, 2),
  "utf8",
);
const slugTs = `/* Auto-generated by scripts/generate-100-local-q7.mjs — do not edit by hand */
export const DEFAULT_ARTICLE_SLUGS: string[] = ${JSON.stringify(allFallbackSlugs, null, 2)};
`;
fs.writeFileSync(path.join(root, "server/lib/article-slugs-fallback.ts"), slugTs, "utf8");
console.log(`Wrote ${specs.length} local-Q7 articles + ${allFallbackSlugs.length} fallback slugs.`);
