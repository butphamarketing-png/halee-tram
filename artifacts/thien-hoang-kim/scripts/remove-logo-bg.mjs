import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = process.argv[2] ?? path.resolve(__dirname, "../public/logo.tachnen.png");
const output = input;

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const lum = (r + g + b) / 3;
  if (lum < 55) data[i + 3] = 0;
  else if (lum < 90) data[i + 3] = Math.round(((lum - 55) / 35) * 255);
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 10 })
  .png({ compressionLevel: 9 })
  .toFile(output + ".tmp");

import { rename } from "fs/promises";
await rename(output + ".tmp", output);
console.log("OK: transparent logo saved to", output);
