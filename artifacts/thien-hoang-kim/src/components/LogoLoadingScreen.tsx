import { motion } from "framer-motion";
import { LOGO_ICON_SRC } from "@/lib/brand-assets";

export function LogoLoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#f4f8f5] via-white to-[#eef4f0]"
      role="status"
      aria-live="polite"
      aria-label="Đang tải Thiên Hoàng Kim"
    >
      <div className="relative flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
        <div className="logo-loading-ring pointer-events-none absolute inset-0 rounded-full" aria-hidden />
        <div className="logo-loading-ring logo-loading-ring-delay pointer-events-none absolute inset-2 rounded-full opacity-70" aria-hidden />
        <motion.img
          src={LOGO_ICON_SRC}
          alt="Thiên Hoàng Kim"
          className="logo-loading-float relative z-10 h-20 w-auto object-contain sm:h-24"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.div
        className="mt-5 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        <p className="font-['Noto_Serif','Cormorant_Garamond',serif] text-lg font-bold uppercase tracking-wide text-gold-gradient sm:text-xl">
          THIÊN HOÀNG KIM
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/75 sm:text-xs">
          Aesthetic Clinic
        </p>
      </motion.div>

      <div className="logo-loading-bar mt-8 h-1 w-36 overflow-hidden rounded-full bg-primary/10 sm:w-44">
        <div className="logo-loading-bar-fill h-full w-2/5 rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">Đang tải...</p>
    </div>
  );
}
