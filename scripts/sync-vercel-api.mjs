import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const artifactRoot = path.join(repoRoot, "artifacts", "thien-hoang-kim");

function copyRecursive(src, dest) {
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
}

copyRecursive(path.join(artifactRoot, "api"), path.join(repoRoot, "api"));
copyRecursive(path.join(artifactRoot, "server"), path.join(repoRoot, "server"));
fs.copyFileSync(path.join(artifactRoot, "middleware.ts"), path.join(repoRoot, "middleware.ts"));

console.log("Synced Vercel API from artifacts/thien-hoang-kim to repo root.");
