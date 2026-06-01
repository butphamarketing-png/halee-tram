import { useCallback, useEffect, useRef, useState } from "react";
import { Copy, RefreshCw, Trash2, Upload } from "lucide-react";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { Button } from "@/components/ui/button";
import { deleteMedia, listMedia, uploadMediaFile, type MediaItem } from "@/lib/admin-api";
import { toast } from "@/hooks/use-toast";

export function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setMedia(await listMedia());
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onUploadFiles = async (files: File[]) => {
    if (files.length === 0) return;
    setUploading(true);
    let ok = 0;
    let lastError = "";
    for (const file of files) {
      const result = await uploadMediaFile(file);
      if ("url" in result) ok += 1;
      else lastError = result.error;
    }
    setUploading(false);
    if (ok > 0) {
      toast({ title: `Đã tải ${ok} file vào kho` });
      await refresh();
    } else if (lastError) {
      toast({ title: lastError, variant: "destructive" });
    } else {
      toast({ title: "Upload thất bại", variant: "destructive" });
    }
  };

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-primary">Thư viện ảnh & video</h2>
          <p className="text-sm text-muted-foreground">
            Kho media dùng chung — chọn khi viết bài, đổi slideshow, ảnh giới thiệu, bác sĩ...
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => void refresh()} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Làm mới
          </Button>
          <Button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? "Đang tải..." : "Tải lên"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/mp4,video/webm,video/quicktime"
            multiple
            className="sr-only"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              void onUploadFiles(files);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Đang tải thư viện...</p>
      ) : media.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <p className="text-muted-foreground">Chưa có file trong kho.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Bấm <strong>Tải lên</strong> — sau đó chọn ảnh từ kho ở Bài viết, Trang chủ (banner), Bác sĩ...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {media.map((item) => (
            <div key={item.url} className="group overflow-hidden rounded-xl border bg-white shadow-sm">
              {item.type === "video" ? (
                <video src={item.url} className="aspect-square w-full object-cover" muted />
              ) : (
                <img src={item.url} alt={item.name} className="aspect-square w-full object-cover" />
              )}
              <div className="p-2">
                <p className="truncate text-xs font-medium">{item.name}</p>
                <div className="mt-1 flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 flex-1 text-xs"
                    onClick={() => {
                      void navigator.clipboard.writeText(item.url);
                      toast({ title: "Đã copy URL" });
                    }}
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    Copy
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-destructive hover:text-destructive"
                    onClick={async () => {
                      if (!confirm(`Xóa ${item.name}?`)) return;
                      if (await deleteMedia(item.name)) {
                        toast({ title: "Đã xóa" });
                        void refresh();
                      } else {
                        toast({ title: "Không xóa được", variant: "destructive" });
                      }
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
