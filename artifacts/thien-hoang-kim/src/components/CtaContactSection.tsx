import type { ComponentType } from "react";
import { ArrowRight, Facebook, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MAPS_URL, ZALO_URL } from "@/config/contact";
import { cn } from "@/lib/utils";

function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-7 w-7", className)} aria-hidden>
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
  iconClass: string;
  ringClass: string;
};

type CtaContactSectionProps = {
  title: string;
  description: string;
  facebookUrl: string;
  messengerSlug: string;
  phone: string;
  onBook: () => void;
};

export function CtaContactSection({
  title,
  description,
  facebookUrl,
  messengerSlug,
  phone,
  onBook,
}: CtaContactSectionProps) {
  const zaloHref = ZALO_URL.includes(phone.replace(/\D/g, "")) ? ZALO_URL : `https://zalo.me/${phone.replace(/\D/g, "")}`;

  const channels: Channel[] = [
    {
      id: "facebook",
      title: "Facebook",
      description: "Theo dõi ưu đãi mới nhất",
      href: facebookUrl && facebookUrl !== "#" ? facebookUrl : "https://facebook.com",
      icon: Facebook,
      iconClass: "text-[#1877F2]",
      ringClass: "bg-[#1877F2]/10 ring-[#1877F2]/20",
    },
    {
      id: "messenger",
      title: "Messenger",
      description: "Nhắn tin tư vấn trực tiếp",
      href: `https://m.me/${messengerSlug}`,
      icon: MessageCircle,
      iconClass: "text-[#0084FF]",
      ringClass: "bg-[#0084FF]/10 ring-[#0084FF]/20",
    },
    {
      id: "zalo",
      title: "Zalo",
      description: "Tư vấn nhanh trong 1 phút",
      href: zaloHref,
      icon: ZaloIcon,
      iconClass: "text-[#0068FF]",
      ringClass: "bg-[#0068FF]/10 ring-[#0068FF]/20",
    },
    {
      id: "maps",
      title: "Google Maps",
      description: "Xem địa chỉ & chỉ đường",
      href: MAPS_URL,
      icon: MapPin,
      iconClass: "text-[#EA4335]",
      ringClass: "bg-[#EA4335]/10 ring-[#EA4335]/20",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f8f5] via-background to-[#e8f0eb] py-16 md:py-24">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#e8d48b]/15 blur-3xl"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-primary/10 bg-white/90 p-6 shadow-[0_24px_60px_-24px_rgba(15,48,36,0.18)] backdrop-blur-sm md:p-10 lg:p-12">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">Liên hệ Thiên Hoàng Kim</p>
            <motion.h2
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mt-3 font-serif text-3xl font-semibold leading-tight text-primary md:text-5xl"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {description}
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
          >
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.id}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg sm:flex-col sm:items-center sm:p-5 sm:text-center"
                >
                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 transition-transform group-hover:scale-105 sm:h-14 sm:w-14",
                      ch.ringClass,
                    )}
                  >
                    <Icon className={cn(ch.id === "zalo" ? "h-7 w-7 sm:h-8 sm:w-8" : "h-6 w-6 sm:h-7 sm:w-7", ch.iconClass)} />
                  </span>
                  <span className="min-w-0 flex-1 sm:flex-none">
                    <span className="block text-sm font-bold text-foreground sm:text-base">{ch.title}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground sm:text-sm">
                      {ch.description}
                    </span>
                  </span>
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
                </a>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex justify-center"
          >
            <Button
              type="button"
              size="lg"
              onClick={onBook}
              className="h-12 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl md:h-14 md:px-10 md:text-lg"
            >
              Đặt lịch tư vấn ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
