import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useSiteContent } from "@/context/SiteContentContext";
import { exportContentJson, saveContentToStorage } from "@/lib/site-content-storage";
import type { SiteContent } from "@/types/site-content";
import { cn } from "@/lib/utils";

export function AdminSaveBar() {
  const { content, saveContent, resetContent, publishContent, updateContent, isDirty } = useSiteContent();

  const importJson = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const parsed = JSON.parse(await file.text()) as SiteContent;
        updateContent(() => parsed);
        saveContentToStorage(parsed);
        toast({ title: "Đã nhập JSON" });
      } catch {
        toast({ title: "File JSON không hợp lệ", variant: "destructive" });
      }
    };
    input.click();
  };

  return (
    <div className="sticky top-0 z-20 -mx-6 mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-border bg-[#f4f6f5] px-6 py-3">
      <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        onClick={() => {
          saveContent();
          toast({ title: "Đã lưu", description: "Nội dung cập nhật trên trình duyệt này." });
        }}
      >
        Lưu thay đổi
      </Button>
      <Button
        type="button"
        variant="default"
        className="bg-primary"
        onClick={async () => {
          saveContent();
          const result = await publishContent();
          if (!result.ok) {
            toast({
              title: "Xuất bản qua file JSON thất bại",
              description: "Đã lưu local. Chạy dev server hoặc bật API.",
              variant: "destructive",
            });
            return;
          }

          const indexNow = result.indexNow;
          if (indexNow?.ok && indexNow.submitted > 0) {
            toast({
              title: "Xuất bản thành công",
              description: `Đã gửi ${indexNow.submitted} URL lập chỉ mục qua IndexNow (Bing).`,
            });
            return;
          }

          if (indexNow?.skipped) {
            toast({
              title: "Xuất bản thành công",
              description:
                indexNow.reason === "INDEXNOW_KEY chưa cấu hình"
                  ? "Website đã cập nhật. Thêm INDEXNOW_KEY trên Vercel để tự gửi lập chỉ mục."
                  : "Website đã cập nhật.",
            });
            return;
          }

          toast({
            title: "Xuất bản thành công",
            description: indexNow?.error
              ? `Website đã cập nhật. IndexNow báo lỗi: ${indexNow.error}`
              : "Website đã cập nhật.",
            variant: indexNow?.error ? "destructive" : "default",
          });
        }}
      >
        Xuất bản website
      </Button>
      <Button type="button" variant="outline" onClick={() => exportContentJson(content)}>
        Xuất JSON
      </Button>
      <Button type="button" variant="outline" onClick={importJson}>
        Nhập JSON
      </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            if (confirm("Khôi phục nội dung mặc định?")) {
              resetContent();
              toast({ title: "Đã khôi phục mặc định" });
            }
          }}
        >
          Mặc định
        </Button>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
            isDirty ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800",
          )}
        >
          {isDirty ? "Chưa lưu" : "Đã lưu"}
        </span>
      </div>
    </div>
  );
}
