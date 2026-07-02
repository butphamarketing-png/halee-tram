import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Sparkles,
} from "lucide-react";
import { Redirect, useLocation } from "wouter";
import { AdminLoginBrandingPanel } from "@/admin/login/AdminLoginBrandingPanel";
import type { BpServiceCard } from "@/admin/login/bp-login-data";
import { adminPath } from "@/config/admin";
import { isAdminLoggedIn, loginAdmin } from "@/lib/admin-auth";
import { toast } from "@/hooks/use-toast";

function BpmLogo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/bpm-logo.png"
        alt="Bứt Phá Marketing"
        className="h-11 w-11 shrink-0 rounded-xl object-cover shadow-lg shadow-violet-500/30"
      />
      <div>
        <p className="text-sm font-extrabold tracking-wide text-[#1e1b4b]">BỨT PHÁ MARKETING</p>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7c3aed]">CMS Khách hàng</p>
      </div>
    </div>
  );
}

export function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (isAdminLoggedIn()) {
    return <Redirect to={adminPath()} />;
  }

  const onServiceClick = (card: BpServiceCard) => {
    window.open(card.href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-white lg:flex-row">
        {/* Left — login form */}
        <div className="flex w-full flex-col justify-between px-6 py-8 sm:px-10 lg:w-[42%] lg:px-14 lg:py-10">
          <div>
            <BpmLogo />

            <div className="mt-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7c3aed]">
              <Sparkles className="h-3.5 w-3.5" />
              Khu vực quản trị hệ thống
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
              Đăng nhập CMS
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
              Quản lý website <span className="font-semibold text-slate-700">Halee Trâm</span> — nội dung,
              marketing và dịch vụ Bứt Phá.
            </p>

            <form
              className="mt-8 max-w-md space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (loginAdmin(username, password)) {
                  setLocation(adminPath());
                  return;
                }
                toast({ title: "Sai tài khoản hoặc mật khẩu", variant: "destructive" });
              }}
            >
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-semibold text-slate-700">
                  Email quản trị
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="admin@haleetram.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#7c3aed] focus:ring-2 focus:ring-violet-100"
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-800 outline-none transition focus:border-[#7c3aed] focus:ring-2 focus:ring-violet-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:from-[#6d28d9] hover:to-[#5b21b6]"
              >
                Đăng nhập CMS
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <p className="mt-10 hidden items-center gap-2 text-xs text-slate-400 lg:flex">
            <Shield className="h-3.5 w-3.5" />
            © Bứt Phá Marketing · Halee Trâm
          </p>
        </div>

        {/* Desktop — right panel */}
        <AdminLoginBrandingPanel
          className="hidden lg:flex lg:w-[58%] lg:flex-col"
          onServiceClick={onServiceClick}
        />

        {/* Mobile — services below form */}
        <AdminLoginBrandingPanel
          className="lg:hidden"
          compact
          onServiceClick={onServiceClick}
        />
      </div>
    </>
  );
}
