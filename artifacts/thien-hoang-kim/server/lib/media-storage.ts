import { getAdminClient } from "./supabase-admin";
import { MEDIA_BUCKET, mediaKind } from "./media-utils";
import {
  deleteFromR2,
  isR2Configured,
  listFromR2,
  uploadToR2,
} from "./r2-storage";

export type MediaRecord = {
  name: string;
  url: string;
  type: ReturnType<typeof mediaKind>;
};

export function getMediaBackend(): "r2" | "supabase" {
  return isR2Configured() ? "r2" : "supabase";
}

export async function storeMedia(
  name: string,
  buffer: Buffer,
  contentType: string,
): Promise<MediaRecord> {
  if (isR2Configured()) {
    const item = await uploadToR2(name, buffer, contentType);
    return { ...item, type: mediaKind(name) };
  }

  const supabase = getAdminClient();
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(name, buffer, {
    contentType,
    upsert: true,
  });

  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(name);
  return {
    name,
    url: urlData.publicUrl,
    type: mediaKind(name),
  };
}

export async function listMedia(): Promise<MediaRecord[]> {
  if (isR2Configured()) {
    const items = await listFromR2();
    return items.map((item) => ({ ...item, type: mediaKind(item.name) }));
  }

  const supabase = getAdminClient();
  const { data: files, error } = await supabase.storage.from(MEDIA_BUCKET).list("", {
    limit: 500,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) throw new Error(error.message);

  type StorageListedFile = { id?: string | null; name: string };

  return ((files ?? []) as StorageListedFile[])
    .filter((f: StorageListedFile) => f.id != null)
    .map((f: StorageListedFile) => {
      const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(f.name);
      return {
        name: f.name,
        url: data.publicUrl,
        type: mediaKind(f.name),
      };
    });
}

export async function removeMedia(name: string): Promise<void> {
  if (isR2Configured()) {
    await deleteFromR2(name);
    return;
  }

  const supabase = getAdminClient();
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([name]);
  if (error) throw new Error(error.message);
}
