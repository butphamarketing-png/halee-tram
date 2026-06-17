const SESSION_KEY = "thk_admin_session";
const USERNAME_OVERRIDE_KEY = "thk_admin_username_override";
const PASSWORD_OVERRIDE_KEY = "thk_admin_password_override";

const DEFAULT_USERNAME =
  (import.meta.env.VITE_ADMIN_USERNAME as string | undefined) ?? "admin";

const DEFAULT_PASSWORD =
  (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? "admin123";

function getUsername(): string {
  return localStorage.getItem(USERNAME_OVERRIDE_KEY) ?? DEFAULT_USERNAME;
}

function getPassword(): string {
  return localStorage.getItem(PASSWORD_OVERRIDE_KEY) ?? DEFAULT_PASSWORD;
}

export function loginAdmin(username: string, password: string): boolean {
  if (username.trim() !== getUsername() || password !== getPassword()) return false;
  sessionStorage.setItem(SESSION_KEY, "1");
  return true;
}

/** Verify admin password without starting a CMS session (e.g. renewal info). */
export function verifyAdminPassword(password: string): boolean {
  return password === getPassword();
}

export function changeAdminCredentials(
  currentUsername: string,
  currentPassword: string,
  nextUsername: string,
  nextPassword: string,
): boolean {
  if (currentUsername.trim() !== getUsername() || currentPassword !== getPassword()) {
    return false;
  }
  if (nextUsername.trim().length < 2 || nextPassword.length < 6) return false;
  localStorage.setItem(USERNAME_OVERRIDE_KEY, nextUsername.trim());
  localStorage.setItem(PASSWORD_OVERRIDE_KEY, nextPassword);
  return true;
}

/** @deprecated use changeAdminCredentials */
export function changeAdminPassword(current: string, next: string): boolean {
  return changeAdminCredentials(getUsername(), current, getUsername(), next);
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

/** Bearer token for API: `username:password` */
export function getAdminToken(): string {
  return `${getUsername()}:${getPassword()}`;
}
