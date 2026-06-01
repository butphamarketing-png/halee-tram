import { getAdminToken } from "@/lib/admin-auth";
import type { BookingSubmission } from "@/types/site-content";

export type MediaItem = {
  name: string;
  url: string;
  type?: "image" | "video";
};

const apiBase = () => import.meta.env.BASE_URL.replace(/\/$/, "");

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${getAdminToken()}`,
    "Content-Type": "application/json",
  };
}

/** Giới hạn body Vercel serverless (~4.5MB) — giữ dưới 4MB cho an toàn */
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

const ALLOWED_UPLOAD_TYPES = /^image\/(png|jpe?g|webp|gif|svg\+xml|svg|avif)|^video\/(mp4|webm|quicktime|ogg)$/i;
const ALLOWED_EXT = /\.(png|jpe?g|webp|gif|svg|mp4|webm|mov)$/i;

function isAllowedFile(file: File): boolean {
  if (file.type && ALLOWED_UPLOAD_TYPES.test(file.type)) return true;
  return ALLOWED_EXT.test(file.name);
}

async function parseApiJson(res: Response): Promise<Record<string, unknown>> {
  const ct = res.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) {
    return {
      error:
        "Máy chủ chưa có API upload (trả về trang web thay vì JSON). Cần deploy lại code mới trên Vercel.",
    };
  }
  return (await res.json()) as Record<string, unknown>;
}

export async function uploadMediaFile(
  file: File,
): Promise<{ url: string } | { error: string }> {
  if (!isAllowedFile(file)) {
    return {
      error:
        "Định dạng không hỗ trợ. Dùng JPG, PNG, WebP, GIF, SVG hoặc MP4/WebM. (Ảnh iPhone HEIC: chuyển sang JPG trước.)",
    };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "File quá lớn (tối đa ~4MB). Hãy nén ảnh/video rồi tải lại." };
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Không đọc được file"));
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
    const json = await parseApiJson(res);
    if (typeof json.error === "string") {
      return { error: json.error };
    }
    if (!res.ok) {
      return { error: `Upload thất bại (${res.status})` };
    }
    const url = json.url;
    if (typeof url !== "string" || !url) return { error: "Server không trả URL" };
    const base = apiBase();
    const fullUrl = url.startsWith("http") ? url : `${base}${url}`;
    return { url: fullUrl };
  } catch {
    return { error: "Không kết nối được máy chủ. Kiểm tra mạng hoặc deploy API upload." };
  }
}

/** @deprecated dùng uploadMediaFile để có thông báo lỗi */
export async function uploadImage(file: File): Promise<string | null> {
  const result = await uploadMediaFile(file);
  return "url" in result ? result.url : null;
}

export async function listMedia(): Promise<MediaItem[]> {
  try {
    const res = await fetch(`${apiBase()}/api/admin/media`, {
      headers: { Authorization: `Bearer ${getAdminToken()}` },
    });
    const ct = res.headers.get("content-type") ?? "";
    if (!res.ok || !ct.includes("application/json")) return [];
    const items = (await res.json()) as MediaItem[];
    const base = apiBase();
    return items.map((item) => ({
      ...item,
      url: item.url.startsWith("http") ? item.url : `${base}${item.url}`,
    }));
  } catch {
    return [];
  }
}

export async function deleteMedia(name: string): Promise<boolean> {
  try {
    const res = await fetch(`${apiBase()}/api/admin/media?name=${encodeURIComponent(name)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getAdminToken()}` },
    });
    return res.ok;
  } catch {
    return false;
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
