import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingForm } from "@/components/BookingForm";
import { useBookingDialog } from "@/context/BookingDialogContext";

export function BookingDialog() {
  const { open, closeBookingDialog } = useBookingDialog();

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeBookingDialog()}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-2xl text-primary">
            <Calendar className="h-6 w-6" />
            Đặt lịch tư vấn
          </DialogTitle>
          <DialogDescription>
            Điền thông tin bên dưới — đội ngũ Thiên Hoàng Kim sẽ liên hệ xác nhận trong thời gian sớm nhất.
          </DialogDescription>
        </DialogHeader>
        <BookingForm compact onSuccess={closeBookingDialog} />
      </DialogContent>
    </Dialog>
  );
}
