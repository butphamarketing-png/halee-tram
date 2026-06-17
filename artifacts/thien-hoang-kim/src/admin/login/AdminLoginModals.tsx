import { useState } from "react";
import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyAdminPassword } from "@/lib/admin-auth";
import { toast } from "@/hooks/use-toast";
import type { BpServiceModal } from "@/admin/login/bp-login-data";
import {
  GOOGLE_ADS_PLAN,
  HOSTING_PLANS,
  RENEWAL_INFO,
  WEBSITE_CARE_PLANS,
  WEBSITE_UPGRADE,
  ZALO_URL,
} from "@/admin/login/bp-login-data";

function ZaloButton() {
  return (
    <Button asChild className="w-full bg-[#7c3aed] hover:bg-[#6d28d9]">
      <a href={ZALO_URL} target="_blank" rel="noopener noreferrer">
        Liên hệ kỹ thuật
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
}

function WebsiteCareModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-[#7c3aed]">
            BẢNG GIÁ CHĂM SÓC WEBSITE
          </DialogTitle>
          <DialogDescription>Gói chăm sóc nội dung website theo tháng</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {WEBSITE_CARE_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-4 ${
                plan.popular
                  ? "border-violet-300 bg-violet-50 ring-1 ring-violet-200"
                  : "border-violet-100 bg-violet-50/50"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold text-slate-800">
                  {plan.name}
                  {plan.popular && (
                    <span className="ml-2 text-xs font-semibold text-[#7c3aed]">⭐ Phổ biến</span>
                  )}
                </p>
                <p className="font-extrabold text-[#7c3aed]">{plan.price}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{plan.features}</p>
            </div>
          ))}
        </div>
        <ZaloButton />
      </DialogContent>
    </Dialog>
  );
}

function GoogleAdsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-[#7c3aed]">DỊCH VỤ GOOGLE ADS</DialogTitle>
          <DialogDescription>Quản lý chiến dịch quảng cáo Google</DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b bg-violet-50">
                <td className="px-4 py-3 font-semibold text-slate-700">{GOOGLE_ADS_PLAN.label}</td>
                <td className="px-4 py-3 text-right font-extrabold text-[#7c3aed]">{GOOGLE_ADS_PLAN.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-700">Bao gồm:</p>
          <ul className="space-y-2">
            {GOOGLE_ADS_PLAN.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7c3aed]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ZaloButton />
      </DialogContent>
    </Dialog>
  );
}

function WebsiteUpgradeModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-[#7c3aed]">NÂNG CẤP WEBSITE</DialogTitle>
          <DialogDescription>Báo giá theo yêu cầu — liên hệ kỹ thuật để tư vấn gói phù hợp</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Tính năng hiện có</p>
            <ul className="space-y-1.5 text-sm text-slate-600">
              {WEBSITE_UPGRADE.current.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#7c3aed]">
              Đề xuất nâng cấp
            </p>
            <ul className="space-y-1.5 text-sm text-slate-700">
              {WEBSITE_UPGRADE.proposed.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <ZaloButton />
      </DialogContent>
    </Dialog>
  );
}

function HostingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-[#7c3aed]">BẢNG GIÁ HOSTING</DialogTitle>
          <DialogDescription>Giá hosting theo dung lượng (VNĐ/năm)</DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-violet-50 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold">Dung lượng</th>
                <th className="px-4 py-2 font-semibold text-right">Giá (VNĐ/năm)</th>
              </tr>
            </thead>
            <tbody>
              {HOSTING_PLANS.map((row) => (
                <tr key={row.size} className="border-t">
                  <td className="px-4 py-2 font-medium">{row.size}</td>
                  <td className="px-4 py-2 text-right text-slate-600">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ZaloButton />
      </DialogContent>
    </Dialog>
  );
}

function RenewalModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const rows = [
    { item: "Ngày gia hạn", value: RENEWAL_INFO.expiryDate, price: "—" },
    { item: "Hosting", value: RENEWAL_INFO.hosting.label, price: RENEWAL_INFO.hosting.price },
    { item: "Tên miền", value: RENEWAL_INFO.domain.label, price: RENEWAL_INFO.domain.price },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-[#7c3aed]">THÔNG TIN GIA HẠN WEBSITE</DialogTitle>
          <DialogDescription>Thông tin hợp đồng và tài nguyên website</DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-violet-50 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold">Hạng mục</th>
                <th className="px-4 py-2 font-semibold">Nội dung</th>
                <th className="px-4 py-2 font-semibold text-right">Giá</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.item} className="border-t">
                  <td className="px-4 py-2 text-slate-500">{row.item}</td>
                  <td className="px-4 py-2 font-semibold text-slate-800">{row.value}</td>
                  <td className="px-4 py-2 text-right text-slate-600">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function RenewalAuthDialog({
  open,
  onOpenChange,
  onVerified,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onVerified: () => void;
}) {
  const [password, setPassword] = useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) setPassword("");
        onOpenChange(v);
      }}
    >
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Xác thực quản trị</DialogTitle>
          <DialogDescription>Nhập mật khẩu CMS để xem thông tin gia hạn</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (verifyAdminPassword(password)) {
              setPassword("");
              onOpenChange(false);
              onVerified();
              return;
            }
            toast({ title: "Mật khẩu không đúng", variant: "destructive" });
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="renewal-pass">Mật khẩu quản trị</Label>
            <Input
              id="renewal-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full bg-[#7c3aed] hover:bg-[#6d28d9]">
            Xác nhận
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AdminLoginModals({
  activeModal,
  onModalChange,
  renewalOpen,
  onRenewalChange,
}: {
  activeModal: BpServiceModal | null;
  onModalChange: (modal: BpServiceModal | null) => void;
  renewalOpen: boolean;
  onRenewalChange: (open: boolean) => void;
}) {
  return (
    <>
      <WebsiteCareModal open={activeModal === "website-care"} onOpenChange={(v) => !v && onModalChange(null)} />
      <GoogleAdsModal open={activeModal === "google-ads"} onOpenChange={(v) => !v && onModalChange(null)} />
      <WebsiteUpgradeModal
        open={activeModal === "website-upgrade"}
        onOpenChange={(v) => !v && onModalChange(null)}
      />
      <HostingModal open={activeModal === "hosting"} onOpenChange={(v) => !v && onModalChange(null)} />
      <RenewalModal open={renewalOpen} onOpenChange={onRenewalChange} />
    </>
  );
}
