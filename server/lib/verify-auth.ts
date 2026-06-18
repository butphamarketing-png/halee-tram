import type { VercelRequest } from "@vercel/node";

export function isAdminAuthed(req: VercelRequest): boolean {
  const expectedUser =
    process.env.ADMIN_USERNAME ?? process.env.VITE_ADMIN_USERNAME ?? "admin";
  const expectedPass =
    process.env.ADMIN_TOKEN ?? process.env.VITE_ADMIN_PASSWORD ?? "admin123";
  const raw = req.headers.authorization?.replace(/^Bearer\s+/i, "").trim() ?? "";

  if (raw.includes(":")) {
    const colon = raw.indexOf(":");
    const user = raw.slice(0, colon);
    const pass = raw.slice(colon + 1);
    return user === expectedUser && pass === expectedPass;
  }

  return raw === expectedPass;
}
