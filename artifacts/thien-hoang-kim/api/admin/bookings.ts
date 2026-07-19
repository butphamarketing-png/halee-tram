import type { ApiRequest, ApiResponse } from "../_lib/http";
import { readJsonBody } from "../_lib/http";
import { getAdminClient } from "../../server/lib/supabase-admin";
import { isAdminAuthed } from "../../server/lib/verify-auth";

export default async function handler(req: ApiRequest, res: ApiResponse) {
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
      const bookings = readJsonBody<
        Array<{
          id: string;
          name: string;
          phone: string;
          service: string;
          date: string;
          notes?: string;
          status: string;
          created_at?: string;
          createdAt?: string;
        }>
      >(req);

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
      const { id, status } = readJsonBody<{ id: string; status: string }>(req);
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(200).json({ ok: true });
      return;
    }

    if (req.method === "DELETE") {
      const body = readJsonBody<{ id?: string }>(req);
      const id = (typeof req.query?.id === "string" ? req.query.id : undefined) ?? body?.id;
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
