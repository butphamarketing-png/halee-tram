import { motion } from "framer-motion";

type LogoLoadingScreenProps = {
  clinicName: string;
  clinicSubtitle: string;
};

export function LogoLoadingScreen({ clinicName, clinicSubtitle }: LogoLoadingScreenProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#f4ece1]"
      role="status"
      aria-live="polite"
      aria-label={`Đang tải ${clinicName}`}
    >
      {/* Nền trang trí */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#c9a66b]/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#6e473b]/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #6e473b 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center px-6"
      >
        {/* Tên thương hiệu */}
        <motion.p
          className="font-['Noto_Serif','Cormorant_Garamond',serif] text-xl font-bold uppercase tracking-[0.18em] text-[#6e473b] sm:text-2xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {clinicName}
        </motion.p>
        <motion.p
          className="mt-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a66b] sm:text-xs"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
        >
          {clinicSubtitle}
        </motion.p>

        {/* Thanh loading */}
        <div className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-[#e5d8ca] sm:w-56">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#6e473b] via-[#c9a66b] to-[#6e473b]"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "45%" }}
          />
        </div>

        <motion.p
          className="mt-4 text-xs tracking-wide text-[#2b2b2b]/55"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          Đang tải trải nghiệm làm đẹp...
        </motion.p>
      </motion.div>
    </div>
  );
}
