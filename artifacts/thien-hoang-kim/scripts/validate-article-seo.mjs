/** Validate ARTICLE_SEO char lengths (title ≤60, desc 120–160) */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(dir, "../src/data/articles.defaults.ts"), "utf8");
const block = src.match(/const ARTICLE_SEO[^=]*=\s*\{([\s\S]*?)\n\};/);
if (!block) {
  console.error("ARTICLE_SEO block not found");
  process.exit(1);
}

const entries = [...block[1].matchAll(/a\d+:\s*\{([\s\S]*?)\n\s*\}/g)];
let fail = 0;
for (const [, body] of entries) {
  const id = body.match(/^(a\d+)/)?.[1] ?? "?";
  const title = body.match(/metaTitle:\s*"([^"]*)"/)?.[1] ?? "";
  const desc = body.match(/metaDescription:\s*\n?\s*"([^"]*)"/s)?.[1] ?? "";
  const kp = body.match(/focusKeyphrase:\s*"([^"]*)"/)?.[1] ?? "";
  const tOk = title.length > 0 && title.length <= 60;
  const dOk = desc.length >= 120 && desc.length <= 160;
  const kOk = kp.length >= 2;
  if (!tOk || !dOk || !kOk) fail++;
  const flag = tOk && dOk && kOk ? "OK" : "FAIL";
  console.log(
    `${flag} ${id}: title=${title.length}/60 desc=${desc.length}/120-160 kp=${kp ? "yes" : "no"}`,
  );
  if (!tOk) console.log(`  title: ${title}`);
  if (!dOk) console.log(`  desc: ${desc}`);
}
console.log(fail ? `\n${fail} entries need fix` : "\nAll 20 articles pass SEO limits");
process.exit(fail ? 1 : 0);
