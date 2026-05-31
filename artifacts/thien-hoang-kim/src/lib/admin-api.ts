import { getAdminToken } from "@/lib/admin-auth";
import type { BookingSubmission } from "@/types/site-content";

const apiBase = () => import.meta.env.BASE_URL.replace(/\/$/, "");

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${getAdminToken()}`,
    "Content-Type": "application/json",
  };
}

export async function uploadImage(file: File): Promise<string | null> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  try {
    const res = await fetch(`${apiBase()}/api/admin/upload`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        filename: `${Date.now()}-${file.name}`,
        data: dataUrl,
      }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { url: string };
    const base = apiBase();
    return json.url.startsWith("http") ? json.url : `${base}${json.url}`;
  } catch {
    return null;
  }
}

export async function listMedia(): Promise<{ name: string; url: string }[]> {
  try {
    const res = await fetch(`${apiBase()}/api/admin/media`, {
      headers: { Authorization: `Bearer ${getAdminToken()}` },
    });
    if (!res.ok) return [];
    const items = (await res.json()) as { name: string; url: string }[];
    const base = apiBase();
    return items.map((item) => ({
      ...item,
      url: item.url.startsWith("http") ? item.url : `${base}${item.url}`,
    }));
  } catch {
    return [];
  }
}

export async function syncBookingsToServer(bookings: BookingSubmission[]): Promise<boolean> {
  try {
    const res = await fetch(`${apiBase()}/api/admin/bookings`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(bookings),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchBookingsFromServer(): Promise<BookingSubmission[] | null> {
  try {
    const res = await fetch(`${apiBase()}/api/admin/bookings`, {
      headers: { Authorization: `Bearer ${getAdminToken()}` },
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as Array<
      BookingSubmission & { created_at?: string }
    >;
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      service: row.service,
      date: row.date,
      notes: row.notes,
      status: row.status,
      createdAt: row.createdAt ?? row.created_at ?? new Date().toISOString(),
    }));
  } catch {
    return null;
  }
}
