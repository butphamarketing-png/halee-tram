import { Calendar, Sparkles, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingForm } from "@/components/BookingForm";
import { useBookingDialog } from "@/context/BookingDialogContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { formatPhoneDisplay } from "@/lib/format-phone";

export function BookingDialog() {
  const { open, closeBookingDialog } = useBookingDialog();
  const { settings } = useSiteContent().content;
  const clinicName = settings.clinicName;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeBookingDialog()}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-hidden rounded-2xl border-[#e5d8ca] p-0 sm:max-w-xl">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#6e473b] via-[#5a3a30] to-[#3d2821] px-6 pb-8 pt-6 text-white">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#c9a66b]/20 blur-2xl" />
          <DialogHeader className="relative space-y-2 text-left">
            <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#e8d4b8]">
              <Sparkles className="h-3.5 w-3.5" />
              Ưu đãi đặt lịch online
            </div>
            <DialogTitle className="flex items-center gap-2 font-serif text-2xl font-semibold text-white">
              <Calendar className="h-6 w-6 text-[#c9a66b]" />
              Đặt lịch hẹn ngay
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-white/80">
              {clinicName} sẽ liên hệ xác nhận trong vòng 15 phút. Hoặc gọi hotline{" "}
              <a href={`tel:${settings.phone}`} className="font-semibold text-[#c9a66b] hover:underline">
                {formatPhoneDisplay(settings.phone)}
              </a>
            </DialogDescription>
          </DialogHeader>
          <ul className="relative mt-4 flex flex-wrap gap-2 text-[11px] text-white/75">
            {["Nails & Mi", "Uốn mi", "Đào tạo nghề"].map((tag) => (
              <li key={tag} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="max-h-[58vh] overflow-y-auto bg-white px-6 py-5">
          <BookingForm compact onSuccess={closeBookingDialog} />
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            {settings.address}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
