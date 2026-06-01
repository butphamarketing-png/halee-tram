import type { Plugin } from "vite";
import { mkdir, readFile, writeFile, readdir, unlink } from "fs/promises";
import path from "path";

const ADMIN_USER = process.env.VITE_ADMIN_USERNAME ?? "admin";
const ADMIN_PASS = process.env.VITE_ADMIN_PASSWORD ?? "admin123";

function readBody(req: import("http").IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function isAuthed(req: import("http").IncomingMessage): boolean {
  const raw = req.headers.authorization?.replace(/^Bearer\s+/i, "").trim() ?? "";
  if (raw.includes(":")) {
    const colon = raw.indexOf(":");
    return raw.slice(0, colon) === ADMIN_USER && raw.slice(colon + 1) === ADMIN_PASS;
  }
  return raw === ADMIN_PASS;
}

function sendJson(res: import("http").ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export function thkAdminApiPlugin(rootDir: string): Plugin {
  const contentFile = path.join(rootDir, "public/data/site-content.json");
  const bookingsFile = path.join(rootDir, "public/data/bookings.json");
  const uploadsDir = path.join(rootDir, "public/uploads");

  return {
    name: "thk-admin-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (!url.startsWith("/api/admin")) {
          next();
          return;
        }

        try {
          if (url === "/api/admin/content" && req.method === "GET") {
            const raw = await readFile(contentFile, "utf-8");
            res.setHeader("Content-Type", "application/json");
            res.end(raw);
            return;
          }

          if (url === "/api/admin/content" && req.method === "PUT") {
            if (!isAuthed(req)) {
              sendJson(res, 401, { error: "Unauthorized" });
              return;
            }
            const body = await readBody(req);
            await mkdir(path.dirname(contentFile), { recursive: true });
            await writeFile(contentFile, body, "utf-8");
            sendJson(res, 200, { ok: true });
            return;
          }

          if (url === "/api/admin/bookings" && req.method === "GET") {
            if (!isAuthed(req)) {
              sendJson(res, 401, { error: "Unauthorized" });
              return;
            }
            try {
              const raw = await readFile(bookingsFile, "utf-8");
              res.setHeader("Content-Type", "application/json");
              res.end(raw);
            } catch {
              res.end("[]");
            }
            return;
          }

          if (url === "/api/admin/bookings" && req.method === "PUT") {
            if (!isAuthed(req)) {
              sendJson(res, 401, { error: "Unauthorized" });
              return;
            }
            const body = await readBody(req);
            await mkdir(path.dirname(bookingsFile), { recursive: true });
            await writeFile(bookingsFile, body, "utf-8");
            sendJson(res, 200, { ok: true });
            return;
          }

          if (url === "/api/admin/media" && req.method === "DELETE") {
            if (!isAuthed(req)) {
              sendJson(res, 401, { error: "Unauthorized" });
              return;
            }
            const q = new URL(req.url ?? "", "http://local").searchParams;
            const name = q.get("name")?.replace(/[^a-zA-Z0-9._-]/g, "_") ?? "";
            if (!name) {
              sendJson(res, 400, { error: "Invalid filename" });
              return;
            }
            try {
              await unlink(path.join(uploadsDir, name));
              sendJson(res, 200, { ok: true });
            } catch {
              sendJson(res, 404, { error: "Not found" });
            }
            return;
          }

          if (url === "/api/admin/media" && req.method === "GET") {
            if (!isAuthed(req)) {
              sendJson(res, 401, { error: "Unauthorized" });
              return;
            }
            await mkdir(uploadsDir, { recursive: true });
            const files = await readdir(uploadsDir);
            const base = "/uploads/";
            const mediaExt = /\.(png|jpe?g|webp|gif|svg|avif|mp4|webm|mov|ogg)$/i;
            const items = files
              .filter((f) => mediaExt.test(f))
              .map((f) => ({
                name: f,
                url: `${base}${f}`,
                type: /\.(mp4|webm|mov|ogg)$/i.test(f) ? "video" : "image",
              }));
            sendJson(res, 200, items);
            return;
          }

          if (url === "/api/admin/upload" && req.method === "POST") {
            if (!isAuthed(req)) {
              sendJson(res, 401, { error: "Unauthorized" });
              return;
            }
            const body = JSON.parse(await readBody(req)) as {
              filename: string;
              data: string;
            };
            const safeName = body.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
            const match = body.data.match(/^data:(image|video)\/[\w+.-]+;base64,(.+)$/);
            if (!match) {
              sendJson(res, 400, { error: "Invalid media data" });
              return;
            }
            await mkdir(uploadsDir, { recursive: true });
            const filePath = path.join(uploadsDir, safeName);
            await writeFile(filePath, Buffer.from(match[2], "base64"));
            const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(safeName);
            sendJson(res, 200, {
              url: `/uploads/${safeName}`,
              name: safeName,
              type: isVideo ? "video" : "image",
            });
            return;
          }
        } catch (err) {
          sendJson(res, 500, { error: String(err) });
          return;
        }

        next();
      });
    },
  };
}
