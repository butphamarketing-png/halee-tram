import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAdminClient } from "../../server/lib/supabase-admin";
import { isAdminAuthed } from "../../server/lib/verify-auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const supabase = getAdminClient();

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("site_content")
        .select("payload")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.status(200).json(data?.payload ?? null);
      return;
    }

    if (req.method === "PUT") {
      if (!isAdminAuthed(req)) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

      const { error } = await supabase.from("site_content").upsert({
        id: 1,
        payload,
        updated_at: new Date().toISOString(),
      });

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
