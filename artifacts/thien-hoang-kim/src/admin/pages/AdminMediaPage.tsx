import { useCallback, useEffect, useState } from "react";
import { Copy, RefreshCw, Upload } from "lucide-react";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { Button } from "@/components/ui/button";
import { listMedia, uploadImage } from "@/lib/admin-api";
import { toast } from "@/hooks/use-toast";

export function AdminMediaPage() {
  const [media, setMedia] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setMedia(await listMedia());
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-primary">Thư viện ảnh</h2>
          <p className="text-sm text-muted-foreground">Ảnh lưu trong public/uploads — dùng cho bài viết, bác sĩ, banner...</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => void refresh()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Làm mới
          </Button>
          <label>
            <Button type="button" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Tải ảnh lên
              </span>
            </Button>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={async (e) => {
                const files = Array.from(e.target.files ?? []);
                for (const file of files) {
                  const url = await uploadImage(file);
                  if (url) toast({ title: `Đã tải: ${file.name}` });
                }
                void refresh();
              }}
            />
          </label>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Đang tải thư viện...</p>
      ) : media.length === 0 ? (
        <p className="rounded-xl border bg-white p-8 text-center text-muted-foreground">Chưa có ảnh. Tải lên để bắt đầu.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {media.map((item) => (
            <div key={item.url} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <img src={item.url} alt={item.name} className="aspect-square w-full object-cover" />
              <div className="p-2">
                <p className="truncate text-xs font-medium">{item.name}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-1 h-7 w-full text-xs"
                  onClick={() => {
                    void navigator.clipboard.writeText(item.url);
                    toast({ title: "Đã copy URL" });
                  }}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy URL
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
