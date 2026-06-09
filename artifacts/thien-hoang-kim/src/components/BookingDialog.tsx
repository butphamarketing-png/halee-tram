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
        className="fixed left-1/2 top-[50%] flex max-h-[min(88dvh,580px)] w-[min(94vw,420px)] -translate-x-1/2 -translate-y-1/2 flex-col gap-0 overflow-hidden rounded-2xl border-[#e5d8ca] p-0 sm:w-[min(92vw,440px)] [&>button]:hidden"
        aria-describedby="booking-dialog-desc"
      >
        {/* Header — gọn hơn để vừa màn laptop */}
        <div className="shrink-0 bg-gradient-to-br from-[#6e473b] via-[#5a3a30] to-[#3d2821] px-4 pb-3 pt-4 text-white sm:px-5 sm:pb-3.5 sm:pt-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <DialogTitle className="flex items-center gap-1.5 font-serif text-lg font-semibold leading-tight text-white sm:text-xl">
                <Calendar className="h-4 w-4 shrink-0 text-[#c9a66b] sm:h-5 sm:w-5" />
                Đặt lịch hẹn ngay
              </DialogTitle>
              <DialogDescription id="booking-dialog-desc" className="mt-1 text-xs leading-snug text-white/80 sm:text-sm">
                {settings.clinicName} liên hệ xác nhận trong ~15 phút.
              </DialogDescription>
            </div>
            <button
              type="button"
              onClick={closeBookingDialog}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Đóng"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#c9a66b]/20 px-3 py-1.5 text-xs font-semibold text-[#f4ece1] ring-1 ring-[#c9a66b]/40 transition hover:bg-[#c9a66b]/30 sm:text-sm"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-[#c9a66b]" />
              {formatPhoneDisplay(settings.phone)}
            </a>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/75">
              <Sparkles className="h-2.5 w-2.5 shrink-0 text-[#e8d4b8]" />
              Ưu đãi online
            </span>
          </div>
        </div>

        {/* Form — cuộn riêng, không bị che */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white px-4 py-3.5 sm:px-5 sm:py-4">
          <BookingForm compact onSuccess={closeBookingDialog} />
          <p className="mt-3 border-t border-border/60 pt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            {settings.address}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
