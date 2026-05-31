import { DEFAULT_SITE_CONTENT } from "@/data/site-content.defaults";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { BookingSubmission, SiteContent } from "@/types/site-content";

function mergeContent(partial: Partial<SiteContent>): SiteContent {
  return {
    ...DEFAULT_SITE_CONTENT,
    ...partial,
    settings: {
      ...DEFAULT_SITE_CONTENT.settings,
      ...partial.settings,
      seo: {
        ...DEFAULT_SITE_CONTENT.settings.seo,
        ...partial.settings?.seo,
      },
    },
    home: { ...DEFAULT_SITE_CONTENT.home, ...partial.home },
  };
}

export async function fetchContentFromSupabase(): Promise<SiteContent | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("site_content")
    .select("payload")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data?.payload) return null;
  return mergeContent(data.payload as Partial<SiteContent>);
}

export async function insertBookingToSupabase(
  entry: Omit<BookingSubmission, "id" | "createdAt" | "status">,
): Promise<BookingSubmission | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      name: entry.name,
      phone: entry.phone,
      service: entry.service,
      date: entry.date,
      notes: entry.notes ?? null,
      status: "new",
    })
    .select()
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    phone: data.phone,
    service: data.service,
    date: data.date,
    notes: data.notes ?? undefined,
    status: data.status as BookingSubmission["status"],
    createdAt: data.created_at,
  };
}

export async function fetchBookingsFromSupabase(): Promise<BookingSubmission[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    service: row.service,
    date: row.date,
    notes: row.notes ?? undefined,
    status: row.status as BookingSubmission["status"],
    createdAt: row.created_at,
  }));
}
