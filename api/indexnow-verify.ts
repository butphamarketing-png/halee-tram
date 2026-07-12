import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const key = process.env.INDEXNOW_KEY?.trim();
    if (!key) {
      res.status(404).send("Not configured");
      return;
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(key);
  } catch (err) {
    res.status(500).send(String(err));
  }
}
