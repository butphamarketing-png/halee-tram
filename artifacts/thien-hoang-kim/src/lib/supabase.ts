import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (client !== undefined) return client;
  client = createClient(url, anonKey, {
    global: {
      fetch: (input, init) => {
        const ctrl = new AbortController();
        const parent = init?.signal;
        if (parent) {
          if (parent.aborted) ctrl.abort(parent.reason);
          else parent.addEventListener("abort", () => ctrl.abort(parent.reason), { once: true });
        }
        const timer = setTimeout(() => ctrl.abort(), 2500);
        return fetch(input, { ...init, signal: ctrl.signal }).finally(() => clearTimeout(timer));
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return client;
}
