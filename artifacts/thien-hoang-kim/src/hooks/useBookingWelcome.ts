import { isAdminLocation } from "@/config/admin";
import { useBookingDialog } from "@/context/BookingDialogContext";
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const SESSION_KEY = "ht_booking_welcome_v1";

/** Tự mở popup đặt lịch lần đầu vào site (mỗi phiên trình duyệt). */
export function useBookingWelcome(openWhenReady: boolean) {
  const [location] = useLocation();
  const { openBookingDialog } = useBookingDialog();
  const fired = useRef(false);

  useEffect(() => {
    if (!openWhenReady || fired.current) return;
    if (isAdminLocation(location)) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      fired.current = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      openBookingDialog();
    }, 1800);

    return () => clearTimeout(timer);
  }, [openWhenReady, location, openBookingDialog]);
}
