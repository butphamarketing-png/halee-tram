import { Clock, MapPin } from "lucide-react";
import { Facebook, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";

type TopbarMarqueeProps = {
  address: string;
  hours: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
};

export function TopbarMarquee({ address, hours, facebookUrl, tiktokUrl, youtubeUrl }: TopbarMarqueeProps) {
  const ticker = `${address}   •   ${hours}`;

  return (
    <div className="w-full overflow-hidden bg-primary py-2.5 text-[11px] font-medium text-primary-foreground md:text-xs">
      <div className="container mx-auto flex items-center gap-3 px-4 md:px-8">
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="topbar-marquee-track flex w-max items-center gap-8">
            <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {address}
            </span>
            <span className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap md:flex">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {hours}
            </span>
            <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap md:hidden">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {hours}
            </span>
            <span aria-hidden className="flex shrink-0 items-center gap-1.5 whitespace-nowrap opacity-90">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {address}
            </span>
            <span aria-hidden className="flex shrink-0 items-center gap-1.5 whitespace-nowrap opacity-90">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {hours}
            </span>
          </div>
          <span className="sr-only">{ticker}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
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
