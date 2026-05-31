import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAdminAuthed } from "./verify-auth";

function getAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase server env");
  return createClient(url, key);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAdminAuthed(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const supabase = getAdminClient();

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(200).json(data ?? []);
      return;
    }

    if (req.method === "PUT") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const bookings = body as Array<{
        id: string;
        name: string;
        phone: string;
        service: string;
        date: string;
        notes?: string;
        status: string;
        created_at?: string;
        createdAt?: string;
      }>;

      for (const b of bookings) {
        await supabase.from("bookings").upsert({
          id: b.id,
          name: b.name,
          phone: b.phone,
          service: b.service,
          date: b.date,
          notes: b.notes ?? null,
          status: b.status,
          created_at: b.created_at ?? b.createdAt ?? new Date().toISOString(),
        });
      }

      res.status(200).json({ ok: true });
      return;
    }

    if (req.method === "PATCH") {
      const { id, status } = req.body as { id: string; status: string };
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(200).json({ ok: true });
      return;
    }

    if (req.method === "DELETE") {
      const id = (req.query.id as string) ?? req.body?.id;
      const { error } = await supabase.from("bookings").delete().eq("id", id);
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
