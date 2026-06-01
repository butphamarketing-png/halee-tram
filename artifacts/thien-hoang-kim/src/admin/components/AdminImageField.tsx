import { useRef, useState } from "react";
import { Link2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminMediaPicker, AdminMediaPickerTrigger } from "@/admin/components/AdminMediaPicker";
import { uploadMediaFile } from "@/lib/admin-api";
import { toast } from "@/hooks/use-toast";

type AdminImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** Cho phép chọn video (ví dụ banner động) */
  allowVideo?: boolean;
};

export function AdminImageField({ label, value, onChange, allowVideo = false }: AdminImageFieldProps) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isVideo = /\.(mp4|webm|mov|ogg)(\?|$)/i.test(value);

  const accept = allowVideo
    ? "image/*,video/mp4,video/webm,video/quicktime"
    : "image/*";

  const handleUpload = async (file: File) => {
    setUploading(true);
    const result = await uploadMediaFile(file);
    setUploading(false);
    if ("error" in result) {
      toast({ title: result.error, variant: "destructive" });
      return;
    }
    onChange(result.url);
    toast({ title: "Đã tải lên" });
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="flex flex-wrap gap-2">
        <Input
          className="min-w-[200px] flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL hoặc chọn / tải ảnh"
        />
        <AdminMediaPickerTrigger onClick={() => setOpen(true)} title="Chọn từ kho" />
        <Button
          type="button"
          variant="outline"
          size="icon"
          title="Tải file mới lên kho"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleUpload(f);
            e.target.value = "";
          }}
        />
      </div>
      <AdminMediaPicker
        open={open}
        onOpenChange={setOpen}
        title={`Chọn — ${label}`}
        filter={allowVideo ? "all" : "image"}
        selectedUrl={value}
        onSelect={onChange}
      />
      {value ? (
        isVideo ? (
          <video src={value} className="mt-2 h-24 max-w-full rounded-lg border object-cover" muted controls />
        ) : (
          <img src={value} alt="" className="mt-2 h-24 w-auto max-w-full rounded-lg border object-cover" />
        )
      ) : (
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link2 className="h-3 w-3" />
          Chưa có xem trước
        </p>
      )}
    </div>
  );
}
