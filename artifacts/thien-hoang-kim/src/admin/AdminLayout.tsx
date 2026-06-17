import { Link, useLocation } from "wouter";
import {
  BookOpen,
  CalendarCheck,
  Home,
  Image,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Stethoscope,
  Star,
  Workflow,
  PanelBottom,
  Sparkles,
  Receipt,
  Layers,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { adminPath } from "@/config/admin";
import { logoutAdmin } from "@/lib/admin-auth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: adminPath(), label: "Bảng điều khiển", icon: LayoutDashboard },
  { href: adminPath("settings"), label: "Thiết lập thông tin", icon: Settings },
  { href: adminPath("footer"), label: "Footer & đặt lịch", icon: PanelBottom },
  { href: adminPath("lucky-wheel"), label: "Vòng quay may mắn", icon: Sparkles },
  { href: adminPath("seo"), label: "Quản lý SEO", icon: Search },
  { href: adminPath("media"), label: "Kho ảnh & video", icon: Image },
  { href: adminPath("home"), label: "Trang chủ", icon: Home },
  { href: adminPath("navigation"), label: "Menu điều hướng", icon: Menu },
  { href: adminPath("services"), label: "Dịch vụ & khóa học", icon: Layers },
  { href: adminPath("pages"), label: "Trang nội dung", icon: FileText },
  { href: adminPath("price-list"), label: "Bảng giá", icon: Receipt },
  { href: adminPath("articles"), label: "Bài viết / Cẩm nang", icon: BookOpen },
  { href: adminPath("doctors"), label: "Đội ngũ bác sĩ", icon: Stethoscope },
  { href: adminPath("testimonials"), label: "Đánh giá KH", icon: Star },
  { href: adminPath("customers"), label: "KH thực tế", icon: Image },
  { href: adminPath("process"), label: "Quy trình thăm khám", icon: Workflow },
  { href: adminPath("bookings"), label: "Đơn đặt lịch", icon: CalendarCheck },
  { href: adminPath("account"), label: "Tài khoản", icon: KeyRound },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const [location] = useLocation();
  return (
    <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
      {NAV.map((item) => {
        const active =
          location === item.href ||
          (item.href !== adminPath() && location.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-[#c9a66b] text-[#2b2b2b]" : "text-white/75 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f4ece1]">
      <aside className="hidden w-64 shrink-0 flex-col bg-[#6e473b] text-white md:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#c9a66b]">Halee Trâm</p>
          <h1 className="mt-1 font-serif text-lg font-semibold">Quản trị website</h1>
        </div>
        <SidebarNav />
        <div className="space-y-2 border-t border-white/10 p-3">
          <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10">
            Xem website
          </Link>
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
            onClick={() => {
              logoutAdmin();
              setLocation(adminPath("login"));
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </Button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button type="button" className="flex-1 bg-black/40" aria-label="Đóng menu" onClick={() => setMobileOpen(false)} />
          <aside className="flex w-72 max-w-[85vw] flex-col bg-[#6e473b] text-white shadow-xl">
            <div className="border-b border-white/10 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#c9a66b]">Menu</p>
            </div>
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
            <div className="border-t border-white/10 p-3">
              <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-white/70" onClick={() => setMobileOpen(false)}>
                Xem website
              </Link>
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-white px-4 py-4 shadow-sm md:px-6">
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Xin chào, <span className="font-semibold text-foreground">admin</span>
            </p>
          </div>
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            Xem website →
          </Link>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
