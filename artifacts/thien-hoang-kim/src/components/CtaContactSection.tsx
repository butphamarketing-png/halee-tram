import type { ComponentType } from "react";
import { ChevronRight, Facebook, Globe, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { MAPS_URL, ZALO_URL } from "@/config/contact";
import { cn } from "@/lib/utils";

function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-[18px] w-[18px]", className)} aria-hidden>
      <rect width="24" height="24" rx="6" fill="currentColor" />
      <path
        fill="#fff"
        d="M6.5 8.2c0-.66.54-1.2 1.2-1.2h8.6c.66 0 1.2.54 1.2 1.2v4.1c0 .66-.54 1.2-1.2 1.2H11.2l-2.4 1.7c-.25.18-.6 0-.38-.3l.65-1.4H7.7c-.66 0-1.2-.54-1.2-1.2V8.2z"
      />
    </svg>
  );
}

type Channel = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

type CtaContactSectionProps = {
  title: string;
  description: string;
  image: string;
  websiteUrl: string;
  websiteLabel: string;
  facebookUrl: string;
  messengerSlug: string;
  phone: string;
};

export function CtaContactSection({
  title,
  description,
  image,
  websiteUrl,
  websiteLabel,
  facebookUrl,
  messengerSlug,
  phone,
}: CtaContactSectionProps) {
  const zaloHref = ZALO_URL.includes(phone.replace(/\D/g, "")) ? ZALO_URL : `https://zalo.me/${phone.replace(/\D/g, "")}`;

  const channels: Channel[] = [
    {
      id: "facebook",
      title: "Fanpage Facebook",
      description: "Theo dõi để cập nhật kiến thức làm đẹp mỗi ngày",
      href: facebookUrl && facebookUrl !== "#" ? facebookUrl : "https://facebook.com",
      icon: Facebook,
    },
    {
      id: "messenger",
      title: "Messenger Tư Vấn",
      description: "Nhắn tin để được chuyên gia hỗ trợ nhanh chóng",
      href: `https://m.me/${messengerSlug}`,
      icon: MessageCircle,
    },
    {
      id: "zalo",
      title: "Zalo",
      description: "Tư vấn nhanh qua Zalo",
      href: zaloHref,
      icon: ZaloIcon,
    },
    {
      id: "maps",
      title: "Google Maps",
      description: "Xem địa chỉ phòng khám",
      href: MAPS_URL,
      icon: MapPin,
    },
    {
      id: "website",
      title: "Website",
      description: websiteLabel,
      href: websiteUrl || "/",
      icon: Globe,
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#f4f8f5] via-background to-[#eef4f0] py-10 md:py-14">
      <div className="container relative z-10 mx-auto w-full max-w-[92rem] px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-5 overflow-x-auto text-center [-ms-overflow-style:none] [scrollbar-width:none] md:mb-7 [&::-webkit-scrollbar]:hidden">
          <motion.h2
            lang="vi"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="font-vietnamese-serif inline-block min-w-full px-1 pb-1 text-[clamp(1.15rem,3.6vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-primary whitespace-nowrap"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              {description}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ y: 12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="w-full overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-[0_20px_50px_-20px_rgba(110,71,59,0.12)] md:rounded-[1.75rem]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch md:min-h-[300px] lg:min-h-[320px]">
            <div className="relative aspect-[16/10] w-full min-w-0 bg-muted sm:aspect-[16/9] md:aspect-auto md:min-h-[300px] lg:min-h-[320px]">
              {image ? (
                <img
                  src={image}
                  alt="Halee Trâm — Nails & Lashes Studio"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-muted-foreground md:min-h-[300px]">
                  Hình ảnh
                </div>
              )}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/20"
                aria-hidden
              />
            </div>

            <div className="flex w-full min-w-0 flex-col justify-center gap-2 p-3 sm:gap-2.5 sm:p-4 md:gap-2.5 md:p-5 lg:p-6">
              {channels.map((ch, i) => {
                const Icon = ch.icon;
                const external = ch.id !== "website";
                return (
                  <motion.a
                    key={ch.id}
                    href={ch.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                    className="cta-channel-card group flex h-11 items-center gap-2.5 rounded-xl border border-primary/10 bg-gradient-to-r from-white to-[#f4ece1] px-2.5 sm:h-12 sm:gap-3 sm:px-3 md:px-3.5"
                  >
                    <span className="cta-channel-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07] text-primary sm:h-10 sm:w-10">
                      <Icon className={ch.id === "zalo" ? "h-[18px] w-[18px]" : "h-[18px] w-[18px] sm:h-5 sm:w-5"} />
                    </span>
                    <span className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden sm:gap-2">
                      <span className="shrink-0 whitespace-nowrap text-[11px] font-bold text-foreground sm:text-xs md:text-sm">
                        {ch.title}
                      </span>
                      <span className="hidden min-w-0 truncate text-[10px] text-muted-foreground sm:inline sm:text-[11px] md:text-xs">
                        · {ch.description}
                      </span>
                    </span>
                    <ChevronRight className="cta-channel-arrow h-4 w-4 shrink-0 text-primary/35 sm:h-[18px] sm:w-[18px]" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
