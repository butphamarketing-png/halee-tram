type ClinicLogoProps = {
  className?: string;
  variant?: "gold" | "light";
};

/** Logo silhouette — woman with crown (brand mark from design) */
export function ClinicLogo({ className = "h-12 w-10 shrink-0", variant = "gold" }: ClinicLogoProps) {
  const fill = variant === "light" ? "#F5E6B8" : "url(#logoGold)";
  const stroke = variant === "light" ? "#F5E6B8" : "url(#logoGold)";
  const gradId = variant === "gold" ? "logoGold" : "logoGoldLight";

  return (
    <svg
      viewBox="0 0 48 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {variant === "gold" && (
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8D48B" />
            <stop offset="45%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M24 4L28 10H32L29 14L30 20L24 17L18 20L19 14L16 10H20L24 4Z"
        fill={fill}
      />
      <ellipse cx="24" cy="22" rx="9" ry="10" fill={fill} />
      <path
        d="M12 34C12 28 17 24 24 24C31 24 36 28 36 34V58C36 60 34 62 32 62H16C14 62 12 60 12 58V34Z"
        fill={fill}
      />
      <path
        d="M8 40C8 36 11 33 15 33M40 33C44 33 47 36 47 40"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ClinicLogoText({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span className="font-serif text-lg font-bold tracking-wide text-gold-gradient md:text-xl">
        THIÊN HOÀNG KIM
      </span>
      <span className="mt-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-primary md:text-[10px]">
        Aesthetic Clinic
      </span>
    </div>
  );
}
