const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov|ogg)$/i;

export const MEDIA_BUCKET = "media";

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

export function mediaContentType(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".avif")) return "image/avif";
  if (lower.endsWith(".mp4")) return "video/mp4";
  if (lower.endsWith(".webm")) return "video/webm";
  if (lower.endsWith(".mov")) return "video/quicktime";
  if (lower.endsWith(".ogg")) return "video/ogg";
  return "application/octet-stream";
}
