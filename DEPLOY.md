# Deploy Thiên Hoàng Kim — Vercel + Supabase

## 1. Supabase

1. Tạo project tại [supabase.com](https://supabase.com)
2. **SQL Editor** → chạy file `supabase/schema.sql`
3. **Settings → API** → copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (chỉ dùng trên Vercel, không đưa vào client)

4. (Khuyến nghị) **Table Editor → site_content** → Insert row:
   - `id`: `1`
   - `payload`: dán nội dung JSON xuất từ admin (lần đầu có thể để `{}` rồi **Xuất bản** từ admin)

## 2. GitHub

Repo: https://github.com/butphammarketing-png/thienhoangkim

## 3. Vercel

1. [vercel.com](https://vercel.com) → **Add New Project** → import repo GitHub
2. **Root Directory**: `artifacts/thien-hoang-kim`
3. **Framework**: Vite
4. **Build Command**: `pnpm build` (hoặc để mặc định nếu Vercel detect)
5. **Output Directory**: `dist/public`
6. **Install Command** (monorepo): tại root project Vercel vẫn là `artifacts/thien-hoang-kim` — set **Root Directory** như trên; nếu lỗi install, dùng:
   - Root Directory: `.` (repo root)
   - Build: `pnpm install && pnpm --filter @workspace/thien-hoang-kim build`
   - Output: `artifacts/thien-hoang-kim/dist/public`

### Biến môi trường (Vercel → Settings → Environment Variables)

| Biến | Mô tả |
|------|--------|
| `VITE_SUPABASE_URL` | Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_ADMIN_BASE_PATH` | Đường dẫn admin (mặc định `/adminbp`) |
| `VITE_ADMIN_USERNAME` | Tài khoản đăng nhập admin |
| `VITE_ADMIN_PASSWORD` | Mật khẩu admin panel |
| `SUPABASE_URL` | Giống Project URL (cho API serverless) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key |
| `ADMIN_USERNAME` | Cùng tài khoản admin (cho API serverless) |
| `ADMIN_TOKEN` | Cùng mật khẩu admin (cho API PUT) |
| `BASE_PATH` | `/` |
| `PORT` | `5173` (cho build script) |

## 4. Sau khi deploy

- Website: `https://your-app.vercel.app`
- Admin: `https://your-app.vercel.app/adminbp` (đăng nhập: `/adminbp/login`)
- Form đặt lịch → bảng `bookings` trên Supabase
- Admin **Xuất bản website** → lưu vào `site_content` qua API Vercel
- **Thư viện ảnh** → upload vào Supabase Storage bucket `media` (chạy `supabase/schema.sql` để tạo bucket)
- API serverless nằm ở thư mục `api/` **gốc repo** (cùng cấp `vercel.json`) — bắt buộc để upload ảnh hoạt động trên Vercel

## 5. Local dev

```bash
cd artifacts/thien-hoang-kim
cp .env.example .env
# điền Supabase keys
pnpm install
pnpm dev
```
