import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  /** Dùng trên nền tối (testimonials) */
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.32em] sm:text-[11px]",
            light ? "text-[#c9a66b]/90" : "text-primary/65",
          )}
        >
          {eyebrow}
        </p>
      )}
      <div
        className={cn(
          "mt-3 flex items-center gap-3",
          centered ? "justify-center" : "justify-start",
        )}
      >
        {!centered && <span className={cn("h-px w-10 shrink-0", light ? "bg-[#c9a66b]/50" : "bg-primary/30")} />}
        <h2
          className={cn(
            "font-vietnamese-serif text-[1.65rem] font-semibold leading-tight sm:text-3xl md:text-4xl",
            light ? "text-white" : "text-primary",
          )}
        >
          {title}
        </h2>
        {!centered && <span className={cn("hidden h-px flex-1 max-w-16 sm:block", light ? "bg-[#c9a66b]/30" : "bg-primary/15")} />}
      </div>
      <div className={cn("mt-3 flex items-center gap-2", centered ? "justify-center" : "justify-start")}>
        <span className={cn("h-px w-8", light ? "bg-gradient-to-r from-transparent to-[#c9a66b]/60" : "bg-gradient-to-r from-transparent to-[#c9a66b]/50")} />
        <span className={cn("text-[9px]", light ? "text-[#c9a66b]/80" : "text-[#c9a66b]/70")}>◆</span>
        <span className={cn("h-px w-8", light ? "bg-gradient-to-l from-transparent to-[#c9a66b]/60" : "bg-gradient-to-l from-transparent to-[#c9a66b]/50")} />
      </div>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed md:text-base",
            centered && "mx-auto",
            light ? "text-white/75" : "text-muted-foreground",
            centered ? "max-w-2xl" : "",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
