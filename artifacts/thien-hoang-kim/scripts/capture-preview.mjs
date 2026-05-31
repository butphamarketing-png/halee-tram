import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = process.env.OUT_DIR ?? path.resolve(__dirname, "../src/assets/preview");
const url = process.env.PREVIEW_URL ?? "http://localhost:23943/";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const vp of viewports) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outDir, `current-ui-${vp.name}.png`),
    fullPage: true,
  });
  console.log(`Saved ${vp.name}`);
}

await browser.close();
