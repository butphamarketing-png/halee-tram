import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";

export function AdminPriceListPage() {
  const { content, updateContent } = useSiteContent();
  const { priceList } = content;

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-primary">Bảng giá (hình ảnh)</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload ảnh menu bảng giá — hiển thị dạng gallery tại /bang-gia
          </p>
        </div>
        <Button
          type="button"
          onClick={() =>
            updateContent((p) => ({
              ...p,
              priceList: {
                ...p.priceList,
                images: [
                  ...p.priceList.images,
                  { id: crypto.randomUUID(), title: "", category: "", src: "", alt: "" },
                ],
              },
            }))
          }
        >
          + Thêm ảnh bảng giá
        </Button>
      </div>

      <div className="mb-8 space-y-4 rounded-xl border bg-white p-5 shadow-sm">
        <AdminField
          label="Tiêu đề trang"
          value={priceList.title}
          onChange={(v) => updateContent((p) => ({ ...p, priceList: { ...p.priceList, title: v } }))}
        />
        <AdminField
          label="Mô tả ngắn"
          value={priceList.description}
          onChange={(v) => updateContent((p) => ({ ...p, priceList: { ...p.priceList, description: v } }))}
        />
        <AdminField
          label="Ghi chú dưới tiêu đề"
          value={priceList.note}
          onChange={(v) => updateContent((p) => ({ ...p, priceList: { ...p.priceList, note: v } }))}
          multiline
        />
      </div>

      <div className="space-y-4">
        {priceList.images.map((img, i) => (
          <div key={img.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex justify-between">
              <span className="font-semibold">{img.title || `Ảnh ${i + 1}`}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  updateContent((p) => ({
                    ...p,
                    priceList: {
                      ...p.priceList,
                      images: p.priceList.images.filter((x) => x.id !== img.id),
                    },
                  }))
                }
              >
                Xóa
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <AdminField
                label="Tiêu đề ảnh"
                value={img.title}
                onChange={(v) =>
                  updateContent((p) => {
                    const images = [...p.priceList.images];
                    images[i] = { ...images[i], title: v };
                    return { ...p, priceList: { ...p.priceList, images } };
                  })
                }
              />
              <AdminField
                label="Danh mục (Làm đẹp / Đào tạo…)"
                value={img.category ?? ""}
                onChange={(v) =>
                  updateContent((p) => {
                    const images = [...p.priceList.images];
                    images[i] = { ...images[i], category: v };
                    return { ...p, priceList: { ...p.priceList, images } };
                  })
                }
              />
              <AdminImageField
                label="Ảnh bảng giá"
                value={img.src}
                onChange={(v) =>
                  updateContent((p) => {
                    const images = [...p.priceList.images];
                    images[i] = { ...images[i], src: v };
                    return { ...p, priceList: { ...p.priceList, images } };
                  })
                }
              />
              <AdminField
                label="Alt text (SEO)"
                value={img.alt}
                onChange={(v) =>
                  updateContent((p) => {
                    const images = [...p.priceList.images];
                    images[i] = { ...images[i], alt: v };
                    return { ...p, priceList: { ...p.priceList, images } };
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
