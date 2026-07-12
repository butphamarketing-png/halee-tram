import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export {
  isAllowedMedia,
  mediaKind,
  MEDIA_BUCKET,
  safeMediaFilename,
} from "./media-utils";

export function getAdminClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase server env");
  return createClient(url, key);
}
