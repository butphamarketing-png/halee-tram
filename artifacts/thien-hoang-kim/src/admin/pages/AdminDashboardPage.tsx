import { Link } from "wouter";
import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  Image,
  KeyRound,
  Search,
  Settings,
  Stethoscope,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { adminPath } from "@/config/admin";
import { useSiteContent } from "@/context/SiteContentContext";
import { loadBookings } from "@/lib/booking-storage";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";

const VISIT_MOCK = [
  { day: "01", views: 120 },
  { day: "05", views: 198 },
  { day: "10", views: 240 },
  { day: "15", views: 310 },
  { day: "20", views: 280 },
  { day: "25", views: 360 },
  { day: "30", views: 420 },
];

const CARDS = [
  { href: adminPath("settings"), title: "Cấu hình website", desc: "Liên hệ & mạng xã hội", color: "bg-blue-600", icon: Settings },
  { href: adminPath("media"), title: "Thư viện ảnh", desc: "Upload & copy URL", color: "bg-violet-600", icon: Image },
  { href: adminPath("seo"), title: "SEO trang", desc: "Title, mô tả, OG", color: "bg-rose-600", icon: Search },
  { href: adminPath("bookings"), title: "Đơn đặt lịch", desc: "Yêu cầu tư vấn", color: "bg-teal-600", icon: CalendarCheck },
  { href: adminPath("articles"), title: "Bài viết", desc: "Cẩm nang làm đẹp", color: "bg-emerald-700", icon: BookOpen },
  { href: adminPath("doctors"), title: "Bác sĩ", desc: "Đội ngũ", color: "bg-emerald-600", icon: Stethoscope },
  { href: adminPath("account"), title: "Đổi tài khoản", desc: "Bảo mật admin", color: "bg-slate-600", icon: KeyRound },
];

export function AdminDashboardPage() {
  const { content } = useSiteContent();
  const bookings = loadBookings();
  const newBookings = bookings.filter((b) => b.status === "new").length;
  const recent = bookings.slice(0, 5);

  return (
    <div>
      <AdminSaveBar />
      <h2 className="mb-6 font-serif text-2xl font-semibold text-primary">Bảng điều khiển</h2>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.slice(0, 4).map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className={`${card.color} group rounded-xl p-5 text-white shadow-md transition-transform hover:-translate-y-0.5`}
            >
              <Icon className="mb-4 h-8 w-8 opacity-90" />
              <h3 className="font-bold">{card.title}</h3>
              <p className="mt-1 text-sm text-white/85">{card.desc}</p>
            </Link>
          );
        })}
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Bài viết</p>
          <p className="mt-1 text-3xl font-bold text-primary">{content.articles.length}</p>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Bác sĩ</p>
          <p className="mt-1 text-3xl font-bold text-primary">{content.doctors.length}</p>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Đánh giá</p>
          <p className="mt-1 text-3xl font-bold text-primary">{content.testimonials.length}</p>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Đơn mới</p>
          <p className="mt-1 text-3xl font-bold text-primary">{newBookings}</p>
        </div>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 font-semibold">
            <BarChart3 className="h-4 w-4 text-primary" />
            Thống kê truy cập (mẫu)
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VISIT_MOCK}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="hsl(158 60% 28%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">Đơn đặt lịch gần đây</h3>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có đơn.</p>
          ) : (
            <ul className="space-y-3">
              {recent.map((b) => (
                <li key={b.id} className="flex justify-between border-b pb-2 text-sm last:border-0">
                  <span className="font-medium">{b.name}</span>
                  <span className="text-muted-foreground">{b.phone}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href={adminPath("bookings")} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            Xem tất cả →
          </Link>
        </div>
      </div>
    </div>
  );
}
