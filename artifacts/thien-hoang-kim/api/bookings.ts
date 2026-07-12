import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAdminClient } from "../server/lib/supabase-admin";
import { isEmailConfigured, sendBookingNotification } from "../server/lib/send-email";

type BookingBody = {
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
  notes?: string;
};

function cleanText(value: unknown, maxLen: number): string {
  return String(value ?? "")
    .trim()
    .slice(0, maxLen);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as BookingBody;

    const name = cleanText(body.name, 120);
    const phone = cleanText(body.phone, 20);
    const service = cleanText(body.service, 200);
    const date = cleanText(body.date, 40);
    const notes = cleanText(body.notes, 1000) || undefined;

    if (name.length < 2) {
      res.status(400).json({ error: "Vui lòng nhập họ tên" });
      return;
    }
    if (phone.replace(/\D/g, "").length < 9) {
      res.status(400).json({ error: "Số điện thoại không hợp lệ" });
      return;
    }
    if (!service) {
      res.status(400).json({ error: "Vui lòng chọn dịch vụ" });
      return;
    }
    if (!date) {
      res.status(400).json({ error: "Vui lòng chọn ngày" });
      return;
    }

    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        name,
        phone,
        service,
        date,
        notes: notes ?? null,
        status: "new",
      })
      .select()
      .single();

    if (error || !data) {
      res.status(500).json({ error: error?.message ?? "Không lưu được đơn đặt lịch" });
      return;
    }

    if (isEmailConfigured()) {
      try {
        await sendBookingNotification({ name, phone, service, date, notes });
      } catch (mailErr) {
        console.error("Booking email failed:", mailErr);
      }
    }

    res.status(200).json({
      id: data.id,
      name: data.name,
      phone: data.phone,
      service: data.service,
      date: data.date,
      notes: data.notes ?? undefined,
      status: data.status,
      createdAt: data.created_at,
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
