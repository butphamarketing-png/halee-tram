import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getAdminClient,
  isAllowedMedia,
  MEDIA_BUCKET,
  mediaKind,
  safeMediaFilename,
} from "../lib/supabase-admin";
import { isAdminAuthed } from "./verify-auth";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!isAdminAuthed(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const filename = safeMediaFilename(String(body.filename ?? "file"));
    const data = String(body.data ?? "");

    const match = data.match(/^data:(image|video)\/([\w+.-]+);base64,(.+)$/);
    if (!match) {
      res.status(400).json({ error: "Invalid media data" });
      return;
    }

    const ext = match[2].replace(/\+xml$/, "svg").replace(/^jpeg$/, "jpg");
    const baseName = filename.includes(".") ? filename : `${filename}.${ext}`;
    const safeName = safeMediaFilename(baseName);
    if (!isAllowedMedia(safeName)) {
      res.status(400).json({ error: "File type not allowed" });
      return;
    }

    const buffer = Buffer.from(match[3], "base64");
    const contentType = `${match[1]}/${match[2]}`;

    const supabase = getAdminClient();
    const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(safeName, buffer, {
      contentType,
      upsert: true,
    });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    const { data: urlData } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(safeName);
    res.status(200).json({
      url: urlData.publicUrl,
      name: safeName,
      type: mediaKind(safeName),
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
