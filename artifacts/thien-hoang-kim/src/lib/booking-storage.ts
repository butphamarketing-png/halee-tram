import { fetchBookingsFromServer, syncBookingsToServer } from "@/lib/admin-api";
import {
  fetchBookingsFromSupabase,
  insertBookingToSupabase,
} from "@/lib/supabase-content";
import type { BookingSubmission } from "@/types/site-content";

const BOOKINGS_KEY = "thk_bookings_v1";

function persistLocal(list: BookingSubmission[]) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
}

export function loadBookings(): BookingSubmission[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BookingSubmission[];
  } catch {
    return [];
  }
}

export async function loadBookingsMerged(): Promise<BookingSubmission[]> {
  const fromSupabase = await fetchBookingsFromSupabase();
  const fromApi = (await fetchBookingsFromServer()) ?? [];
  const local = loadBookings();

  const map = new Map<string, BookingSubmission>();
  for (const b of [...fromSupabase, ...fromApi, ...local]) map.set(b.id, b);

  const merged = [...map.values()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  persistLocal(merged);
  return merged;
}

function persistAll(list: BookingSubmission[]) {
  persistLocal(list);
  void syncBookingsToServer(list);
}

export async function saveBooking(
  entry: Omit<BookingSubmission, "id" | "createdAt" | "status">,
): Promise<BookingSubmission> {
  const fromDb = await insertBookingToSupabase(entry);
  if (fromDb) {
    const list = loadBookings();
    persistAll([fromDb, ...list]);
    return fromDb;
  }

  const list = loadBookings();
  const item: BookingSubmission = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  persistAll([item, ...list]);
  return item;
}

export function updateBookingStatus(id: string, status: BookingSubmission["status"]): void {
  const list = loadBookings().map((b) => (b.id === id ? { ...b, status } : b));
  persistAll(list);
}

export function deleteBooking(id: string): void {
  const list = loadBookings().filter((b) => b.id !== id);
  persistAll(list);
}
