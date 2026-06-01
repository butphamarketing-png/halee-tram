import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const MEDIA_BUCKET = "media";

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov|ogg)$/i;

export function getAdminClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase server env");
  return createClient(url, key);
}

export function mediaKind(filename: string): "image" | "video" | "other" {
  if (VIDEO_EXT.test(filename)) return "video";
  if (IMAGE_EXT.test(filename)) return "image";
  return "other";
}

export function isAllowedMedia(filename: string): boolean {
  return mediaKind(filename) !== "other";
}

export function safeMediaFilename(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9._-]/g, "_");
}
