export type AuthHeaders = {
  authorization?: string | string[];
  Authorization?: string | string[];
};

function readAuthHeader(headers: AuthHeaders): string {
  const raw = headers.authorization ?? headers.Authorization ?? "";
  const value = Array.isArray(raw) ? raw[0] ?? "" : raw;
  return value.replace(/^Bearer\s+/i, "").trim();
}

export function isAdminAuthed(req: { headers: AuthHeaders }): boolean {
  const expectedUser =
    process.env.ADMIN_USERNAME ?? process.env.VITE_ADMIN_USERNAME ?? "admin";
  const expectedPass =
    process.env.ADMIN_TOKEN ?? process.env.VITE_ADMIN_PASSWORD ?? "admin123";
  const raw = readAuthHeader(req.headers);

  if (raw.includes(":")) {
    const colon = raw.indexOf(":");
    const user = raw.slice(0, colon);
    const pass = raw.slice(colon + 1);
    return user === expectedUser && pass === expectedPass;
  }

  return raw === expectedPass;
}
