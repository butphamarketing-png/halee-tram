import type { ComponentType } from "react";
import { ChevronRight, Facebook, Globe, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { MAPS_URL, ZALO_URL } from "@/config/contact";
import { cn } from "@/lib/utils";

function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden>
      <rect width="24" height="24" rx="6" fill="currentColor" className="text-primary" />
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f8f5] via-background to-[#eef4f0] pt-14 pb-16 md:pt-16 md:pb-20">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white shadow-[0_20px_50px_-20px_rgba(15,48,36,0.12)]">
          <div className="border-b border-border/50 px-5 py-6 text-center md:px-8 md:py-7">
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-[30px] font-semibold leading-tight text-primary sm:text-[32px] md:text-[42px] lg:text-[52px] lg:leading-[1.15]"
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
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
            className="grid grid-cols-1 md:grid-cols-2"
          >
            <div className="relative min-h-[260px] bg-muted sm:min-h-[300px] md:min-h-[420px]">
              {image ? (
                <img
                  src={image}
                  alt="Thiên Hoàng Kim Aesthetic Clinic"
                  className="absolute inset-0 h-full w-full object-cover object-[top_center]"
                />
              ) : (
                <div className="flex h-full min-h-[inherit] items-center justify-center text-sm text-muted-foreground">
                  Hình ảnh
                </div>
              )}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/25"
                aria-hidden
              />
            </div>

            <div className="flex flex-col justify-center gap-3 p-5 md:gap-3.5 md:p-7 lg:p-8">
              {channels.map((ch) => {
                const Icon = ch.icon;
                const external = ch.id !== "website";
                return (
                  <a
                    key={ch.id}
                    href={ch.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="card-hover-lift group flex items-center gap-4 rounded-2xl border border-border/80 bg-white p-4 shadow-[0_4px_20px_-8px_rgba(15,48,36,0.1)] md:p-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className={ch.id === "zalo" ? "h-5 w-5" : "h-5 w-5"} />
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="block text-sm font-bold text-foreground md:text-base">{ch.title}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground md:text-sm">
                        {ch.description}
                      </span>
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-primary/40 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
