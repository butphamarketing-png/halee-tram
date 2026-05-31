import { useState } from "react";
import { ImagePlus, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { uploadImage, listMedia } from "@/lib/admin-api";
import { toast } from "@/hooks/use-toast";

type AdminImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
};

export function AdminImageField({ label, value, onChange }: AdminImageFieldProps) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMedia = async () => {
    setLoading(true);
    const items = await listMedia();
    setMedia(items);
    setLoading(false);
  };

  const onUpload = async (file: File) => {
    const url = await uploadImage(file);
    if (!url) {
      toast({ title: "Upload thất bại", variant: "destructive" });
      return;
    }
    onChange(url);
    toast({ title: "Đã tải ảnh lên" });
    await loadMedia();
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL ảnh hoặc chọn từ thư viện" />
        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (v) void loadMedia();
          }}
        >
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="icon" title="Chọn ảnh">
              <ImagePlus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chọn ảnh — {label}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4 py-2 text-sm hover:bg-muted">
                <ImagePlus className="h-4 w-4" />
                Tải ảnh mới
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void onUpload(f);
                  }}
                />
              </label>
            </div>
            {loading ? (
              <p className="text-sm text-muted-foreground">Đang tải...</p>
            ) : (
              <div className="grid max-h-[360px] grid-cols-3 gap-3 overflow-y-auto sm:grid-cols-4">
                {media.map((item) => (
                  <button
                    key={item.url}
                    type="button"
                    className="overflow-hidden rounded-lg border hover:ring-2 hover:ring-primary"
                    onClick={() => {
                      onChange(item.url);
                      setOpen(false);
                    }}
                  >
                    <img src={item.url} alt={item.name} className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      {value ? (
        <img src={value} alt="" className="mt-2 h-24 w-auto max-w-full rounded-lg border object-cover" />
      ) : (
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link2 className="h-3 w-3" />
          Chưa có ảnh xem trước
        </p>
      )}
    </div>
  );
}
