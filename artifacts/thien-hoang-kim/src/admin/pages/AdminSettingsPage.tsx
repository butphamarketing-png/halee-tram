import { AdminField } from "@/admin/components/AdminField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";

export function AdminSettingsPage() {
  const { content, updateContent } = useSiteContent();
  const s = content.settings;

  const set = (key: keyof typeof s, value: string) => {
    updateContent((prev) => ({
      ...prev,
      settings: { ...prev.settings, [key]: value },
    }));
  };

  return (
    <div>
      <AdminSaveBar />
      <h2 className="mb-6 font-serif text-2xl font-semibold text-primary">Thiết lập thông tin</h2>
      <div className="grid max-w-3xl gap-4 rounded-xl border bg-white p-6 shadow-sm">
        <AdminField label="Tên phòng khám" value={s.clinicName} onChange={(v) => set("clinicName", v)} />
        <AdminField label="Phụ đề" value={s.clinicSubtitle} onChange={(v) => set("clinicSubtitle", v)} />
        <AdminField label="Slogan footer" value={s.slogan} onChange={(v) => set("slogan", v)} />
        <AdminField label="Địa chỉ" value={s.address} onChange={(v) => set("address", v)} multiline />
        <AdminField label="Số điện thoại (không dấu cách)" value={s.phone} onChange={(v) => set("phone", v)} />
        <AdminField label="Email" value={s.email} onChange={(v) => set("email", v)} />
        <AdminField label="Giờ làm việc" value={s.hours} onChange={(v) => set("hours", v)} />
        <AdminField label="Topbar — địa chỉ" value={s.topbarAddress} onChange={(v) => set("topbarAddress", v)} />
        <AdminField label="Topbar — giờ" value={s.topbarHours} onChange={(v) => set("topbarHours", v)} />
        <AdminField label="Messenger slug (m.me/...)" value={s.messengerSlug} onChange={(v) => set("messengerSlug", v)} />
        <AdminField label="Facebook URL" value={s.facebookUrl} onChange={(v) => set("facebookUrl", v)} />
        <AdminField label="TikTok URL" value={s.tiktokUrl} onChange={(v) => set("tiktokUrl", v)} />
        <AdminField label="YouTube URL" value={s.youtubeUrl} onChange={(v) => set("youtubeUrl", v)} />
      </div>
    </div>
  );
}
