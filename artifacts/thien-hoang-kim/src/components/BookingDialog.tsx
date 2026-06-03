import { Calendar, Phone, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingForm } from "@/components/BookingForm";
import { useBookingDialog } from "@/context/BookingDialogContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { formatPhoneDisplay } from "@/lib/format-phone";

export function BookingDialog() {
  const { open, closeBookingDialog } = useBookingDialog();
  const { settings } = useSiteContent().content;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeBookingDialog()}>
      <DialogContent
        className="flex max-h-[min(92dvh,720px)] w-[min(96vw,440px)] flex-col gap-0 overflow-hidden rounded-2xl border-[#e5d8ca] p-0 [&>button]:hidden"
        aria-describedby="booking-dialog-desc"
      >
        {/* Header */}
        <div className="shrink-0 bg-gradient-to-br from-[#6e473b] via-[#5a3a30] to-[#3d2821] px-5 pb-4 pt-5 text-white sm:px-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#e8d4b8]">
                <Sparkles className="h-3 w-3 shrink-0" />
                Ưu đãi đặt lịch online
              </div>
              <DialogTitle className="flex items-center gap-2 font-serif text-xl font-semibold leading-tight text-white sm:text-2xl">
                <Calendar className="h-5 w-5 shrink-0 text-[#c9a66b] sm:h-6 sm:w-6" />
                Đặt lịch hẹn ngay
              </DialogTitle>
            </div>
            <button
              type="button"
              onClick={closeBookingDialog}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Đóng"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <DialogDescription id="booking-dialog-desc" className="text-sm leading-relaxed text-white/85">
            {settings.clinicName} liên hệ xác nhận trong ~15 phút.
          </DialogDescription>

          <a
            href={`tel:${settings.phone}`}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#c9a66b]/20 px-4 py-2.5 text-sm font-semibold text-[#f4ece1] ring-1 ring-[#c9a66b]/40 transition hover:bg-[#c9a66b]/30"
          >
            <Phone className="h-4 w-4 shrink-0 text-[#c9a66b]" />
            Hotline {formatPhoneDisplay(settings.phone)}
          </a>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {["Nails & Mi", "Uốn mi", "Đào tạo"].map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] text-white/80"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Form — cuộn riêng, không bị che */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-5 py-4 sm:px-6 sm:py-5">
          <BookingForm compact onSuccess={closeBookingDialog} />
          <p className="mt-3 border-t border-border/60 pt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            {settings.address}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
