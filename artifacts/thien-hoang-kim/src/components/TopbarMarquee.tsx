import type { ReactNode } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { Facebook, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { formatPhoneDisplay } from "@/lib/format-phone";

type TopbarMarqueeProps = {
  address: string;
  hours: string;
  phone: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
};

function MarqueeItem({
  icon: Icon,
  children,
  href,
}: {
  icon: typeof MapPin;
  children: ReactNode;
  href?: string;
}) {
  const inner = (
    <>
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {children}
    </>
  );
  const className = "flex shrink-0 items-center gap-1.5 whitespace-nowrap";
  if (href) {
    return (
      <a href={href} className={`${className} transition hover:text-white`}>
        {inner}
      </a>
    );
  }
  return <span className={className}>{inner}</span>;
}

export function TopbarMarquee({ address, hours, phone, facebookUrl, tiktokUrl, youtubeUrl }: TopbarMarqueeProps) {
  const phoneDisplay = formatPhoneDisplay(phone);
  const ticker = `${address}   •   ${hours}   •   ${phoneDisplay}`;

  const items = (
    <>
      <MarqueeItem icon={MapPin}>{address}</MarqueeItem>
      <MarqueeItem icon={Clock}>{hours}</MarqueeItem>
      <MarqueeItem icon={Phone} href={`tel:${phone}`}>
        {phoneDisplay}
      </MarqueeItem>
    </>
  );

  return (
    <div className="w-full overflow-hidden bg-primary py-2 text-[10px] font-medium text-primary-foreground sm:py-2.5 sm:text-xs">
      <div className="container mx-auto flex items-center gap-2 px-3 sm:gap-3 sm:px-4 md:px-8">
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="topbar-marquee-track flex w-max items-center gap-6 sm:gap-8">
            {items}
            <span aria-hidden className="flex items-center gap-8 opacity-90">
              {items}
            </span>
          </div>
          <span className="sr-only">{ticker}</span>
        </div>
        <div className="hidden shrink-0 items-center gap-1.5 sm:flex sm:gap-2">
          {[
            { Icon: Facebook, href: facebookUrl },
            { Icon: SiTiktok, href: tiktokUrl },
            { Icon: Youtube, href: youtubeUrl },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 transition hover:bg-white/15"
              aria-label="Mạng xã hội"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
