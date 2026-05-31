/**
 * Crop assets from the design mockup PNG (percent-based regions).
 * Run: node scripts/crop-from-design.mjs
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SOURCE = process.env.DESIGN_SOURCE ?? path.resolve(
  root,
  "../../../.cursor/projects/c-Users-Admin-Downloads-Thien-Hoang-Kim/assets/c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_951d2ca8d622e6402f4e6d80f37b4226_images_image-7c6b11fd-5939-4783-bbee-1ee387291f09.png",
);

const OUT = process.env.OUT_DIR ?? path.resolve(root, "src/assets/design-crops");

/** @type {{ name: string; left: number; top: number; width: number; height: number }[]} */
const REGIONS = [
  { name: "01-logo-header", left: 0.02, top: 0.045, width: 0.2, height: 0.065 },
  { name: "02-hero-full-banner", left: 0, top: 0.115, width: 1, height: 0.42 },
  { name: "03-hero-visual-right", left: 0.48, top: 0.12, width: 0.52, height: 0.4 },
  { name: "04-hero-banner-right", left: 0.32, top: 0.115, width: 0.68, height: 0.42 },
  { name: "04b-hero-banner-center", left: 0.15, top: 0.115, width: 0.85, height: 0.42 },
  { name: "05-commitments-section", left: 0, top: 0.52, width: 1, height: 0.48 },
  { name: "06-commitment-icon-1", left: 0.04, top: 0.68, width: 0.14, height: 0.12 },
  { name: "07-commitment-icon-2", left: 0.2, top: 0.68, width: 0.14, height: 0.12 },
  { name: "08-commitment-icon-3", left: 0.36, top: 0.68, width: 0.14, height: 0.12 },
  { name: "09-commitment-icon-4", left: 0.52, top: 0.68, width: 0.14, height: 0.12 },
  { name: "10-commitment-icon-5", left: 0.68, top: 0.68, width: 0.14, height: 0.12 },
  { name: "11-commitment-icon-6", left: 0.84, top: 0.68, width: 0.14, height: 0.12 },
];

async function main() {
  const img = sharp(SOURCE);
  const meta = await img.metadata();
  const W = meta.width ?? 0;
  const H = meta.height ?? 0;

  if (!W || !H) {
    console.error("Could not read image:", SOURCE);
    process.exit(1);
  }

  console.log(`Source: ${SOURCE}`);
  console.log(`Size: ${W} x ${H}`);
  await mkdir(OUT, { recursive: true });

  const manifest = [];

  for (const r of REGIONS) {
    const left = Math.round(r.left * W);
    const top = Math.round(r.top * H);
    const width = Math.min(Math.round(r.width * W), W - left);
    const height = Math.min(Math.round(r.height * H), H - top);

    const outPath = path.join(OUT, `${r.name}.png`);
    await sharp(SOURCE).extract({ left, top, width, height }).png().toFile(outPath);
    manifest.push({ name: r.name, file: `design-crops/${r.name}.png`, width, height, left, top });
    console.log(`OK ${r.name} (${width}x${height})`);
  }

  await sharp(SOURCE)
    .resize(1920, null, { withoutEnlargement: true })
    .png()
    .toFile(path.join(OUT, "00-design-full-reference.png"));

  const fs = await import("fs/promises");
  await fs.writeFile(
    path.join(OUT, "manifest.json"),
    JSON.stringify({ sourceSize: { W, H }, crops: manifest }, null, 2),
  );

  console.log(`\nSaved to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
