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
2. **Root Directory**: `artifacts/thien-hoang-kim` (**bắt buộc** — API serverless và middleware nằm trong thư mục này)
3. **Framework**: Vite
4. **Build Command**: để trống (dùng `vercel.json` trong artifact: `cd ../.. && pnpm --filter @workspace/thien-hoang-kim build`)
5. **Output Directory**: `dist/public` (tương đối Root Directory)
6. Nếu lỗi install monorepo, thử **Root Directory** = `.` (repo root) và build:
   - Build: `pnpm install && pnpm --filter @workspace/thien-hoang-kim build`
   - Output: `artifacts/thien-hoang-kim/dist/public`
   - Lưu ý: khi đó **API sẽ không chạy** trừ khi copy `api/` + `server/` lên root hoặc đổi lại Root Directory.

### Biến môi trường (Vercel → Settings → Environment Variables)

| Biến | Mô tả |
|------|--------|
| `SITE_URL` | Domain production (vd. `https://www.haleetram.com`) — sitemap, robots.txt API |
| `VITE_SITE_URL` | Cùng domain — fallback client SEO khi chưa có CMS |
| `VITE_SUPABASE_URL` | Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_ADMIN_BASE_PATH` | Đường dẫn admin (mặc định `/adminbp`) |
| `VITE_ADMIN_USERNAME` | Tài khoản đăng nhập admin |
| `VITE_ADMIN_PASSWORD` | Mật khẩu admin panel |
| `SUPABASE_URL` | Giống Project URL (cho API serverless) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key |
| `ADMIN_USERNAME` | Cùng tài khoản admin (cho API serverless) |
| `ADMIN_TOKEN` | Cùng mật khẩu admin (cho API PUT) |
| `INDEXNOW_KEY` | Key IndexNow — tự gửi URL lập chỉ mục Bing khi Xuất bản CMS |
| `R2_ACCOUNT_ID` | Cloudflare Account ID |
| `R2_ACCESS_KEY_ID` | R2 API token — Access Key ID |
| `R2_SECRET_ACCESS_KEY` | R2 API token — Secret Access Key |
| `R2_BUCKET_NAME` | Tên bucket R2 (vd. `halee-tram-media`) |
| `R2_PUBLIC_URL` | URL public bucket (`https://pub-xxx.r2.dev` hoặc custom domain) |
| `R2_KEY_PREFIX` | Thư mục trong bucket (mặc định `media`) |
| `BASE_PATH` | `/` |
| `PORT` | `5173` (cho build script) |

## 4. Sau khi deploy

- Website: `https://your-app.vercel.app`
- Admin: `https://your-app.vercel.app/adminbp` (đăng nhập: `/adminbp/login`)
- Form đặt lịch → bảng `bookings` trên Supabase
- Admin **Xuất bản website** → lưu vào `site_content` qua API Vercel, đồng thời **tự gửi URL thay đổi qua IndexNow** (Bing) nếu đã cấu hình `INDEXNOW_KEY`
- **Thư viện ảnh** → upload lên **Cloudflare R2** (khi đã cấu hình biến `R2_*`); nếu chưa có R2 thì fallback Supabase Storage bucket `media`
- API serverless và middleware: **một nguồn** tại `artifacts/thien-hoang-kim/api/` + `middleware.ts`
- Deploy **repo root** (Root Directory trống): `vercel.json` gốc tự chạy `scripts/sync-vercel-api.mjs` trước build để copy API lên root
- Deploy **artifact root** (Root Directory = `artifacts/thien-hoang-kim`): dùng `artifacts/thien-hoang-kim/vercel.json` — API đã có sẵn trong thư mục

### IndexNow (tự gửi lập chỉ mục Bing)

1. Vào [Bing Webmaster Tools](https://www.bing.com/webmasters) → thêm site `https://www.haleetram.com`
2. Lấy hoặc tạo **IndexNow key** (chuỗi ngẫu nhiên, vd. UUID)
3. Vercel → thêm biến `INDEXNOW_KEY`
4. Redeploy
5. Kiểm tra key: `https://www.haleetram.com/api/indexnow-verify`
6. Mỗi lần admin bấm **Xuất bản website**, hệ thống gửi các URL thay đổi tới IndexNow

Google Search Console vẫn cần submit sitemap **một lần thủ công**: `https://www.haleetram.com/sitemap.xml`

### Bot preview (Facebook / Zalo / Twitter)

Website là React SPA — meta tag cập nhật bằng JavaScript sau khi load. **Edge Middleware** tự phát hiện bot/crawler và trả HTML có meta đúng theo từng URL (đọc từ CMS Supabase).

- Bot (Facebook, Zalo, Googlebot, Bingbot, …) → `/api/bot-render` inject meta vào `index.html`
- Người dùng thật → SPA bình thường
- Kiểm tra: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) hoặc `curl -A "facebookexternalhit/1.1" https://www.haleetram.com/lam-dep/noi-mi`

## 5. Cloudflare R2 (kho ảnh — khuyến nghị)

Giúp giảm băng thông Supabase. Ảnh/video admin upload qua `/api/admin/upload` sẽ lên R2 khi đủ 5 biến `R2_*`.

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **R2** → **Create bucket** (vd. `halee-tram-media`)
2. Bucket → **Settings** → bật **Public access** (hoặc gắn custom domain `media.haleetram.com`)
3. **Manage R2 API Tokens** → Create token (Object Read & Write) → lấy Access Key + Secret
4. **Account ID** ở sidebar Cloudflare → copy vào `R2_ACCOUNT_ID`
5. Thêm biến trên **Vercel** (xem bảng trên) → **Redeploy**

Ảnh cũ trên Supabase vẫn hiển thị nếu URL trong CMS trỏ Supabase — upload mới sẽ dùng URL R2.

## 6. Local dev

```bash
cd artifacts/thien-hoang-kim
cp .env.example .env
# điền Supabase keys
pnpm install
pnpm dev
```
