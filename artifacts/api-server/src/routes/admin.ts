import { Router, type IRouter } from "express";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router: IRouter = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_FILE =
  process.env.SITE_CONTENT_FILE ??
  path.resolve(__dirname, "../../../thien-hoang-kim/public/data/site-content.json");

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? process.env.VITE_ADMIN_PASSWORD ?? "admin123";

function checkAuth(authHeader: string | undefined): boolean {
  if (!authHeader?.startsWith("Bearer ")) return false;
  return authHeader.slice(7) === ADMIN_TOKEN;
}

router.get("/admin/content", async (_req, res) => {
  try {
    const raw = await readFile(CONTENT_FILE, "utf-8");
    res.type("json").send(raw);
  } catch {
    res.status(404).json({ error: "Content file not found" });
  }
});

router.put("/admin/content", async (req, res) => {
  if (!checkAuth(req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    await mkdir(path.dirname(CONTENT_FILE), { recursive: true });
    await writeFile(CONTENT_FILE, JSON.stringify(req.body, null, 2), "utf-8");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
