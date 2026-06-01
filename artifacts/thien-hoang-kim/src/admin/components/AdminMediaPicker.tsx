import { useCallback, useEffect, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteMedia, listMedia, uploadMediaFile, type MediaItem } from "@/lib/admin-api";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type MediaFilter = "all" | "image" | "video";

type AdminMediaPickerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onSelect: (url: string) => void;
  /** Chỉ hiện ảnh, video, hoặc cả hai */
  filter?: MediaFilter;
  selectedUrl?: string;
};

export function AdminMediaPicker({
  open,
  onOpenChange,
  title,
  onSelect,
  filter = "image",
  selectedUrl,
}: AdminMediaPickerProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const accept =
    filter === "video"
      ? "video/mp4,video/webm,video/quicktime"
      : filter === "all"
        ? "image/*,video/mp4,video/webm,video/quicktime"
        : "image/*";

  const loadMedia = useCallback(async () => {
    setLoading(true);
    const items = await listMedia();
    setMedia(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (open) void loadMedia();
  }, [open, loadMedia]);

  const visible = media.filter((item) => {
    if (filter === "all") return true;
    if (filter === "video") return item.type === "video";
    return item.type !== "video";
  });

  const onUpload = async (file: File) => {
    setUploading(true);
    const result = await uploadMediaFile(file);
    setUploading(false);
    if ("error" in result) {
      toast({ title: result.error, variant: "destructive" });
      return;
    }
    onSelect(result.url);
    toast({ title: "Đã tải lên và chọn" });
    onOpenChange(false);
    await loadMedia();
  };

  const onDelete = async (item: MediaItem) => {
    if (!confirm(`Xóa "${item.name}" khỏi kho? Ảnh/video đang dùng trên site có thể bị lỗi.`)) return;
    const ok = await deleteMedia(item.name);
    if (!ok) {
      toast({ title: "Không xóa được", variant: "destructive" });
      return;
    }
    toast({ title: "Đã xóa" });
    await loadMedia();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Chọn từ kho hoặc tải mới — dùng chung cho bài viết, banner, slideshow...
        </p>
        <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4 py-2 text-sm hover:bg-muted">
          <Upload className="h-4 w-4" />
          {uploading ? "Đang tải..." : "Tải file mới"}
          <input
            type="file"
            accept={accept}
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files[0]) void onUpload(files[0]);
              e.target.value = "";
            }}
          />
        </label>
        {loading ? (
          <p className="text-sm text-muted-foreground">Đang tải kho...</p>
        ) : visible.length === 0 ? (
          <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            Kho trống. Tải ảnh/video lên hoặc vào mục Thư viện ảnh.
          </p>
        ) : (
          <div className="grid max-h-[min(420px,50vh)] grid-cols-3 gap-3 overflow-y-auto sm:grid-cols-4">
            {visible.map((item) => (
              <div
                key={item.url}
                className={cn(
                  "group relative overflow-hidden rounded-lg border",
                  selectedUrl === item.url && "ring-2 ring-primary",
                )}
              >
                <button
                  type="button"
                  className="block w-full"
                  onClick={() => {
                    onSelect(item.url);
                    onOpenChange(false);
                  }}
                >
                  {item.type === "video" ? (
                    <video src={item.url} className="aspect-square w-full object-cover" muted />
                  ) : (
                    <img src={item.url} alt={item.name} className="aspect-square w-full object-cover" />
                  )}
                </button>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-1 top-1 h-7 w-7 opacity-0 transition group-hover:opacity-100"
                  title="Xóa khỏi kho"
                  onClick={(e) => {
                    e.stopPropagation();
                    void onDelete(item);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Nút mở picker — dùng cùng AdminImageField hoặc độc lập */
export function AdminMediaPickerTrigger({
  onClick,
  title = "Chọn từ kho",
}: {
  onClick: () => void;
  title?: string;
}) {
  return (
    <Button type="button" variant="outline" size="icon" title={title} onClick={onClick}>
      <ImagePlus className="h-4 w-4" />
    </Button>
  );
}
