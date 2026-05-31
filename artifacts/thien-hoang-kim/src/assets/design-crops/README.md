# Assets cắt từ design mockup

Nguồn: file design homepage (1024×682 px) do bạn gửi.

| File | Nội dung |
|------|----------|
| `01-logo-header.png` | Logo + tên trên header |
| `02-hero-full-banner.png` | Toàn bộ vùng hero (có chữ design gốc) |
| `03-hero-visual-right.png` | Model + vòng tròn vàng bên phải |
| `04-hero-banner-right.png` | Hero cắt ~68% bên phải (ít chữ hơn) |
| `04b-hero-banner-center.png` | Hero cắt ~85% (giữa–phải) |
| `05-commitments-section.png` | Cả block cam kết |
| `06–11-commitment-icon-*.png` | Từng ô icon (kèm một phần card) |
| `00-design-full-reference.png` | Bản thu nhỏ toàn trang để đối chiếu |
| `manifest.json` | Tọa độ crop (px) |

Tạo lại crop:

```bash
# Cần Node + sharp (trong thư mục tạm hoặc đã cài)
set DESIGN_SOURCE=đường-dẫn-design.png
set OUT_DIR=src/assets/design-crops
node scripts/crop-from-design.mjs
```

**Lưu ý:** Banner hero cắt từ mockup vẫn có thể còn chữ in sẵn trong ảnh. Hero “chỉ hình” hoàn toàn cần file ảnh riêng từ designer (export không chữ).
