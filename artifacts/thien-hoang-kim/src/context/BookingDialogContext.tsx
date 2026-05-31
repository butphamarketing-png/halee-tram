import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type BookingDialogContextValue = {
  open: boolean;
  openBookingDialog: () => void;
  closeBookingDialog: () => void;
};

const BookingDialogContext = createContext<BookingDialogContextValue | null>(null);

export function BookingDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openBookingDialog = useCallback(() => setOpen(true), []);
  const closeBookingDialog = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openBookingDialog, closeBookingDialog }),
    [open, openBookingDialog, closeBookingDialog],
  );

  return <BookingDialogContext.Provider value={value}>{children}</BookingDialogContext.Provider>;
}

export function useBookingDialog() {
  const ctx = useContext(BookingDialogContext);
  if (!ctx) {
    throw new Error("useBookingDialog must be used within BookingDialogProvider");
  }
  return ctx;
}
