import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../dist/public");
const baseUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://www.haleetram.com").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

const lamDep = ["nails", "noi-mi", "uon-mi", "dinh-hinh-chan-may", "cha-got-chan", "goi-dau"];
const daoTao = [
  "khoa-noi-mi-salon",
  "khoa-noi-mi-dinh-cu",
  "khoa-nail-chuyen-nghiep",
  "khoa-cham-soc-mong",
  "khoa-dinh-hinh-chan-may",
  "khoa-hoc-uon-mi",
];
const articles = [
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

const paths = [
  "/",
  "/gioi-thieu",
  "/gioi-thieu/cau-chuyen-thuong-hieu",
  "/gioi-thieu/co-so-vat-chat",
  "/gioi-thieu/doi-ngu-bac-si",
  "/dich-vu",
  "/lam-dep",
  "/dao-tao",
  "/khach-hang",
  "/bang-gia",
  "/tin-tuc",
  "/tin-tuc/kien-thuc",
  "/tin-tuc/tin-tuc",
  "/lien-he",
  ...lamDep.map((s) => `/lam-dep/${s}`),
  ...daoTao.map((s) => `/dao-tao/${s}`),
  ...articles.map((s) => `/tin-tuc/${s}`),
];

const uniquePaths = [...new Set(paths)];
const urls = uniquePaths
  .map((p) => {
    const priority = p === "/" ? "1.0" : p.startsWith("/tin-tuc/") ? "0.7" : "0.8";
    const changefreq = p === "/" ? "daily" : p.startsWith("/tin-tuc/") ? "monthly" : "weekly";
    return `  <url>
    <loc>${baseUrl}${p}</loc>
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
console.log(`SEO files written to ${outDir} (${uniquePaths.length} URLs)`);
