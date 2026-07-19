import type { ApiRequest, ApiResponse } from "../_lib/http";
import { readJsonBody } from "../_lib/http";
import { isAllowedMedia, safeMediaFilename } from "../../server/lib/media-utils";
import { storeMedia } from "../../server/lib/media-storage";
import { isAdminAuthed } from "../../server/lib/verify-auth";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!isAdminAuthed(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const body = readJsonBody<{ filename?: string; data?: string }>(req);
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

    const stored = await storeMedia(safeName, buffer, contentType);
    res.status(200).json({
      url: stored.url,
      name: stored.name,
      type: stored.type,
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
