const SESSION_KEY = "thk_admin_session";
const PASSWORD_OVERRIDE_KEY = "thk_admin_password_override";

const DEFAULT_PASSWORD =
  (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? "admin123";

function getPassword(): string {
  return localStorage.getItem(PASSWORD_OVERRIDE_KEY) ?? DEFAULT_PASSWORD;
}

export function loginAdmin(password: string): boolean {
  if (password !== getPassword()) return false;
  sessionStorage.setItem(SESSION_KEY, "1");
  return true;
}

export function changeAdminPassword(current: string, next: string): boolean {
  if (current !== getPassword() || next.length < 6) return false;
  localStorage.setItem(PASSWORD_OVERRIDE_KEY, next);
  return true;
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function getAdminToken(): string {
  return getPassword();
}
