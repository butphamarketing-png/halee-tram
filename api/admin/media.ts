import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAllowedMedia, safeMediaFilename } from "../lib/media-utils";
import { listMedia, removeMedia } from "../lib/media-storage";
import { isAdminAuthed } from "./verify-auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAdminAuthed(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    if (req.method === "GET") {
      const items = (await listMedia()).filter((item) => isAllowedMedia(item.name));
      res.status(200).json(
        items.map(({ name, url, type }) => ({ name, url, type })),
      );
      return;
    }

    if (req.method === "DELETE") {
      const name =
        typeof req.query.name === "string"
          ? req.query.name
          : typeof req.body === "object" && req.body?.name
            ? String(req.body.name)
            : "";

      const safeName = safeMediaFilename(name);
      if (!safeName || !isAllowedMedia(safeName)) {
        res.status(400).json({ error: "Invalid filename" });
        return;
      }

      await removeMedia(safeName);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
