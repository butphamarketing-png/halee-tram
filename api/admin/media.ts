import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getAdminClient,
  isAllowedMedia,
  MEDIA_BUCKET,
  mediaKind,
  safeMediaFilename,
} from "../lib/supabase-admin";
import { isAdminAuthed } from "./verify-auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAdminAuthed(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const supabase = getAdminClient();

    if (req.method === "GET") {
      const { data: files, error } = await supabase.storage.from(MEDIA_BUCKET).list("", {
        limit: 500,
        sortBy: { column: "created_at", order: "desc" },
      });

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      const items = (files ?? [])
        .filter((f) => f.id != null && isAllowedMedia(f.name))
        .map((f) => {
          const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(f.name);
          return {
            name: f.name,
            url: data.publicUrl,
            type: mediaKind(f.name),
          };
        });

      res.status(200).json(items);
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

      const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([safeName]);
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
