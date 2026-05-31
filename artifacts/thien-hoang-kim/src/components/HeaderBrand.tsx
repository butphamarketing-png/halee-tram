const publicAsset = (file: string) =>
  `${import.meta.env.BASE_URL}${file}`.replace(/([^:]\/)\/+/g, "$1");

const LOGO_ICON_SRC = publicAsset("logo.tachnen.png");

type HeaderBrandProps = {
  /** Header trắng = dark text; footer xanh = light text */
  variant?: "header" | "footer";
  className?: string;
};

/** Logo design: icon tách nền + chữ bên cạnh */
export function HeaderBrand({ variant = "header", className = "" }: HeaderBrandProps) {
  const isFooter = variant === "footer";

  return (
    <div className={`flex items-center gap-3 md:gap-3.5 ${className}`}>
      <img
        src={LOGO_ICON_SRC}
        alt=""
        className={`shrink-0 object-contain object-center ${
          isFooter ? "h-11 w-auto md:h-12" : "h-12 w-auto md:h-14"
        }`}
        aria-hidden
      />
      <div className="flex min-w-0 flex-col justify-center leading-none">
        <span
          className={`whitespace-nowrap font-serif font-bold uppercase tracking-wide ${
            isFooter ? "text-base md:text-lg" : "text-sm md:text-base"
          } ${isFooter ? "text-[#e8d48b]" : "text-gold-gradient"}`}
        >
          THIÊN HOÀNG KIM
        </span>
        <span
          className={`mt-0.5 whitespace-nowrap font-serif font-semibold uppercase tracking-[0.16em] ${
            isFooter ? "text-[9px] md:text-[10px]" : "text-[9px] md:text-[10px]"
          } ${isFooter ? "text-white/65" : "text-primary"}`}
        >
          Aesthetic Clinic
        </span>
      </div>
    </div>
  );
}
