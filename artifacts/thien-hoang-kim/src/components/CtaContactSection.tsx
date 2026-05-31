import type { ComponentType } from "react";
import { ArrowRight, ChevronRight, Facebook, Globe, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MAPS_URL, ZALO_URL } from "@/config/contact";
import { cn } from "@/lib/utils";

function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden>
      <rect width="24" height="24" rx="6" fill="#0068FF" />
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
  iconBg: string;
};

type CtaContactSectionProps = {
  title: string;
  description: string;
  image: string;
  facebookUrl: string;
  messengerSlug: string;
  phone: string;
  onBook: () => void;
};

export function CtaContactSection({
  title,
  description,
  image,
  facebookUrl,
  messengerSlug,
  phone,
  onBook,
}: CtaContactSectionProps) {
  const zaloHref = ZALO_URL.includes(phone.replace(/\D/g, "")) ? ZALO_URL : `https://zalo.me/${phone.replace(/\D/g, "")}`;

  const channels: Channel[] = [
    {
      id: "facebook",
      title: "Fanpage",
      description: "Theo dõi fanpage",
      href: facebookUrl && facebookUrl !== "#" ? facebookUrl : "https://facebook.com",
      icon: Facebook,
      iconBg: "bg-[#1877F2]/15 text-[#1877F2]",
    },
    {
      id: "messenger",
      title: "Messenger",
      description: "Nhắn tin tư vấn",
      href: `https://m.me/${messengerSlug}`,
      icon: MessageCircle,
      iconBg: "bg-[#0084FF]/15 text-[#0084FF]",
    },
    {
      id: "zalo",
      title: "Zalo",
      description: "Tư vấn nhanh",
      href: zaloHref,
      icon: ZaloIcon,
      iconBg: "bg-[#0068FF]/15 text-[#0068FF]",
    },
    {
      id: "maps",
      title: "Google Maps",
      description: "Xem địa chỉ",
      href: MAPS_URL,
      icon: MapPin,
      iconBg: "bg-[#EA4335]/15 text-[#EA4335]",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f8f5] via-background to-[#e8f0eb] py-14 md:py-20">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-[0_24px_60px_-24px_rgba(15,48,36,0.15)]">
          {/* Tiêu đề */}
          <div className="border-b border-border/60 px-6 py-8 text-center md:px-10 md:py-10">
            <motion.h2
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-2xl font-semibold leading-tight text-primary sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Ảnh trái | Liên hệ phải */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            <div className="relative min-h-[240px] bg-muted sm:min-h-[280px] md:min-h-[360px]">
              {image ? (
                <img
                  src={image}
                  alt="Thiên Hoàng Kim Aesthetic Clinic"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[inherit] items-center justify-center text-sm text-muted-foreground">
                  Hình ảnh
                </div>
              )}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/30"
                aria-hidden
              />
            </div>

            <div className="flex flex-col justify-center divide-y divide-border/70">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <a
                    key={ch.id}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-primary/[0.04] md:px-8 md:py-6"
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                        ch.iconBg,
                      )}
                    >
                      <Icon className={ch.id === "zalo" ? "h-6 w-6" : "h-5 w-5"} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-bold text-foreground md:text-lg">{ch.title}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{ch.description}</span>
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/50 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Website + nút đặt lịch */}
          <div className="border-t border-border/60 bg-[#fafcfb] px-6 py-8 text-center md:px-10 md:py-10">
            <p className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
              <Globe className="h-4 w-4" />
              Website
            </p>
            <Button
              type="button"
              size="lg"
              onClick={onBook}
              className="h-12 w-full max-w-md rounded-full bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg hover:bg-primary/90 sm:h-14 sm:text-base"
            >
              Đặt lịch tư vấn ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
