import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";
import type { CommitmentIconKey } from "@/types/site-content";

const ICON_OPTIONS: CommitmentIconKey[] = [
  "Shield",
  "Stethoscope",
  "TestTube",
  "Heart",
  "Sparkles",
  "FileText",
];

export function AdminHomePage() {
  const { content, updateContent } = useSiteContent();
  const h = content.home;

  return (
    <div className="space-y-8">
      <AdminSaveBar />
      <h2 className="font-serif text-2xl font-semibold text-primary">Nội dung trang chủ</h2>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Banner (Hero)</h3>
          <Button
            type="button"
            size="sm"
            onClick={() =>
              updateContent((p) => ({
                ...p,
                home: {
                  ...p.home,
                  heroSlides: [
                    ...p.home.heroSlides,
                    { id: crypto.randomUUID(), src: "", alt: "Halee Trâm — Eyelash / Nail / Academy" },
                  ],
                },
              }))
            }
          >
            + Thêm slide
          </Button>
        </div>
        {h.heroSlides.map((slide, i) => (
          <div key={slide.id} className="mb-4 grid gap-3 border-b pb-4 last:border-0">
            <AdminImageField
              label={`Slide ${i + 1} — ảnh / video banner`}
              value={slide.src}
              allowVideo
              onChange={(v) =>
                updateContent((prev) => {
                  const slides = [...prev.home.heroSlides];
                  slides[i] = { ...slides[i], src: v };
                  return { ...prev, home: { ...prev.home, heroSlides: slides } };
                })
              }
            />
            <AdminField
              label="Alt text"
              value={slide.alt}
              onChange={(v) =>
                updateContent((prev) => {
                  const slides = [...prev.home.heroSlides];
                  slides[i] = { ...slides[i], alt: v };
                  return { ...prev, home: { ...prev.home, heroSlides: slides } };
                })
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                updateContent((p) => ({
                  ...p,
                  home: { ...p.home, heroSlides: p.home.heroSlides.filter((_, idx) => idx !== i) },
                }))
              }
            >
              Xóa slide
            </Button>
          </div>
        ))}
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Dịch vụ nổi bật (2 thẻ ảnh)</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Ảnh nền hai cột Thẩm mỹ / Spa trên trang chủ — chọn từ kho hoặc tải mới.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <AdminImageField
            label="Ảnh cột Thẩm mỹ"
            value={h.featuredServiceImages[0]}
            onChange={(v) =>
              updateContent((p) => {
                const imgs = [...p.home.featuredServiceImages] as [string, string];
                imgs[0] = v;
                return { ...p, home: { ...p.home, featuredServiceImages: imgs } };
              })
            }
          />
          <AdminImageField
            label="Ảnh cột Spa"
            value={h.featuredServiceImages[1]}
            onChange={(v) =>
              updateContent((p) => {
                const imgs = [...p.home.featuredServiceImages] as [string, string];
                imgs[1] = v;
                return { ...p, home: { ...p.home, featuredServiceImages: imgs } };
              })
            }
          />
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Cam kết</h3>
          <Button
            type="button"
            size="sm"
            onClick={() =>
              updateContent((p) => ({
                ...p,
                home: {
                  ...p.home,
                  commitments: [
                    ...p.home.commitments,
                    { id: crypto.randomUUID(), icon: "Shield", title: "CAM KẾT MỚI", desc: "" },
                  ],
                },
              }))
            }
          >
            + Thêm cam kết
          </Button>
        </div>
        <AdminField label="Tiêu đề" value={h.commitmentsTitle} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, commitmentsTitle: v } }))} />
        <div className="mt-3">
          <AdminField label="Mô tả" value={h.commitmentsSubtitle} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, commitmentsSubtitle: v } }))} multiline />
        </div>
        <div className="mt-4 space-y-4">
          {h.commitments.map((c, i) => (
            <div key={c.id} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold">Ô {i + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    updateContent((p) => ({
                      ...p,
                      home: {
                        ...p.home,
                        commitments: p.home.commitments.filter((x) => x.id !== c.id),
                      },
                    }))
                  }
                >
                  Xóa
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Icon
                  <select
                    className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    value={c.icon}
                    onChange={(e) =>
                      updateContent((p) => {
                        const list = [...p.home.commitments];
                        list[i] = { ...list[i], icon: e.target.value as CommitmentIconKey };
                        return { ...p, home: { ...p.home, commitments: list } };
                      })
                    }
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <AdminField
                  label="Tiêu đề"
                  value={c.title}
                  onChange={(v) =>
                    updateContent((p) => {
                      const list = [...p.home.commitments];
                      list[i] = { ...list[i], title: v };
                      return { ...p, home: { ...p.home, commitments: list } };
                    })
                  }
                />
              </div>
              <div className="mt-3">
                <AdminField
                  label="Mô tả"
                  value={c.desc}
                  onChange={(v) =>
                    updateContent((p) => {
                      const list = [...p.home.commitments];
                      list[i] = { ...list[i], desc: v };
                      return { ...p, home: { ...p.home, commitments: list } };
                    })
                  }
                  multiline
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Giới thiệu</h3>
        <div className="grid gap-3">
          <AdminField label="Nhãn" value={h.aboutEyebrow} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, aboutEyebrow: v } }))} />
          <AdminField label="Tiêu đề" value={h.aboutTitle} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, aboutTitle: v } }))} />
          <AdminField label="Phụ đề" value={h.aboutSubtitle} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, aboutSubtitle: v } }))} />
          <AdminImageField label="Ảnh giới thiệu" value={h.aboutImage} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, aboutImage: v } }))} />
          {h.aboutParagraphs.map((para, i) => (
            <AdminField
              key={i}
              label={`Đoạn ${i + 1}`}
              value={para}
              onChange={(v) =>
                updateContent((p) => {
                  const paragraphs = [...p.home.aboutParagraphs];
                  paragraphs[i] = v;
                  return { ...p, home: { ...p.home, aboutParagraphs: paragraphs } };
                })
              }
              multiline
            />
          ))}
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Số liệu thống kê</h4>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  updateContent((p) => ({
                    ...p,
                    home: {
                      ...p.home,
                      aboutStats: [...p.home.aboutStats, { value: "0", title: "Tiêu đề", sub: "Mô tả" }],
                    },
                  }))
                }
              >
                + Thêm số liệu
              </Button>
            </div>
            {h.aboutStats.map((stat, i) => (
              <div key={i} className="grid gap-2 rounded-lg border p-3 md:grid-cols-3">
                <AdminField
                  label="Giá trị"
                  value={stat.value}
                  onChange={(v) =>
                    updateContent((p) => {
                      const aboutStats = [...p.home.aboutStats];
                      aboutStats[i] = { ...aboutStats[i], value: v };
                      return { ...p, home: { ...p.home, aboutStats } };
                    })
                  }
                />
                <AdminField
                  label="Tiêu đề"
                  value={stat.title}
                  onChange={(v) =>
                    updateContent((p) => {
                      const aboutStats = [...p.home.aboutStats];
                      aboutStats[i] = { ...aboutStats[i], title: v };
                      return { ...p, home: { ...p.home, aboutStats } };
                    })
                  }
                />
                <AdminField
                  label="Phụ đề"
                  value={stat.sub}
                  onChange={(v) =>
                    updateContent((p) => {
                      const aboutStats = [...p.home.aboutStats];
                      aboutStats[i] = { ...aboutStats[i], sub: v };
                      return { ...p, home: { ...p.home, aboutStats } };
                    })
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="md:col-span-3 md:justify-self-end"
                  onClick={() =>
                    updateContent((p) => ({
                      ...p,
                      home: { ...p.home, aboutStats: p.home.aboutStats.filter((_, idx) => idx !== i) },
                    }))
                  }
                >
                  Xóa
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Đánh giá khách hàng</h3>
        <AdminImageField
          label="Ảnh nền khối đánh giá"
          value={h.testimonialsBackground}
          onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, testimonialsBackground: v } }))}
        />
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">CTA & Footer text</h3>
        <div className="grid gap-3">
          <AdminField label="CTA tiêu đề" value={h.ctaTitle} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, ctaTitle: v } }))} />
          <AdminField label="CTA mô tả" value={h.ctaDescription} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, ctaDescription: v } }))} multiline />
          <AdminImageField label="CTA ảnh (cột trái)" value={h.ctaImage} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, ctaImage: v } }))} />
          <AdminField label="Footer mô tả" value={h.footerDescription} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, footerDescription: v } }))} multiline />
          <AdminImageField label="Ảnh đặt lịch" value={h.bookingImage} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, bookingImage: v } }))} />
        </div>
      </section>
    </div>
  );
}
