/** Base path for admin panel (no trailing slash). */
export const ADMIN_BASE =
  String(import.meta.env.VITE_ADMIN_BASE_PATH ?? "/adminbp").replace(/\/$/, "") || "/adminbp";

export function adminPath(subpath = ""): string {
  const sub = subpath.replace(/^\//, "");
  return sub ? `${ADMIN_BASE}/${sub}` : ADMIN_BASE;
}

export function isAdminLocation(location: string): boolean {
  return location === ADMIN_BASE || location.startsWith(`${ADMIN_BASE}/`);
}
