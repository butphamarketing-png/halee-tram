import { cn } from "@/lib/utils";
import { useSiteContent } from "@/context/SiteContentContext";

type HeaderBrandProps = {
  /** Header trắng = dark text; footer xanh = light text */
  variant?: "header" | "footer";
  className?: string;
};

/** Tên thương hiệu — không dùng icon logo */
export function HeaderBrand({ variant = "header", className = "" }: HeaderBrandProps) {
  const { clinicName, clinicSubtitle } = useSiteContent().content.settings;
  const isFooter = variant === "footer";

  return (
    <div className={cn("flex min-w-0 flex-col justify-center leading-none", className)}>
      <span
        className={cn(
          "font-serif font-bold uppercase tracking-wide",
          isFooter ? "text-base md:text-lg" : "text-xs sm:text-sm md:text-base",
          isFooter ? "text-[#c9a66b]" : "text-gold-gradient",
          !isFooter && "max-w-[9.5rem] truncate sm:max-w-none sm:whitespace-nowrap",
        )}
      >
        {clinicName}
      </span>
      <span
        className={cn(
          "mt-0.5 font-serif font-semibold uppercase tracking-[0.1em] text-[8px] sm:tracking-[0.14em] sm:text-[9px] md:text-[10px]",
          isFooter ? "text-white/65" : "text-primary",
          !isFooter && "max-w-[9.5rem] truncate sm:max-w-none sm:whitespace-nowrap",
        )}
      >
        {clinicSubtitle}
      </span>
    </div>
  );
}
