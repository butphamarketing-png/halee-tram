import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { deleteBooking, loadBookingsMerged, updateBookingStatus } from "@/lib/booking-storage";
import type { BookingSubmission } from "@/types/site-content";

const STATUS_LABEL: Record<BookingSubmission["status"], string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  done: "Hoàn tất",
};

export function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setBookings(await loadBookingsMerged());
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-primary">Đơn đặt lịch</h2>
        <Button type="button" variant="outline" onClick={() => void refresh()}>
          Đồng bộ
        </Button>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Đang tải...</p>
      ) : bookings.length === 0 ? (
        <p className="rounded-xl border bg-white p-8 text-center text-muted-foreground shadow-sm">
          Chưa có đơn nào. Đơn từ form trang chủ sẽ hiện tại đây.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="p-3 font-semibold">Thời gian</th>
                <th className="p-3 font-semibold">Khách</th>
                <th className="p-3 font-semibold">SĐT</th>
                <th className="p-3 font-semibold">Dịch vụ</th>
                <th className="p-3 font-semibold">Ngày hẹn</th>
                <th className="p-3 font-semibold">Trạng thái</th>
                <th className="p-3 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b last:border-0">
                  <td className="p-3 text-xs text-muted-foreground">
                    {new Date(b.createdAt).toLocaleString("vi-VN")}
                  </td>
                  <td className="p-3">{b.name}</td>
                  <td className="p-3 font-medium">
                    <a href={`tel:${b.phone}`} className="text-primary hover:underline">
                      {b.phone}
                    </a>
                  </td>
                  <td className="p-3">{b.service}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">{STATUS_LABEL[b.status]}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {(["new", "contacted", "done"] as const).map((st) => (
                        <Button
                          key={st}
                          type="button"
                          size="sm"
                          variant={b.status === st ? "default" : "outline"}
                          onClick={() => {
                            updateBookingStatus(b.id, st);
                            void refresh();
                          }}
                        >
                          {STATUS_LABEL[st]}
                        </Button>
                      ))}
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (confirm("Xóa đơn này?")) {
                            deleteBooking(b.id);
                            void refresh();
                          }
                        }}
                      >
                        Xóa
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
