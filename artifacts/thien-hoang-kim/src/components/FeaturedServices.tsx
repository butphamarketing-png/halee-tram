import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MAIN_NAV } from "@/config/navigation";
import type { NavMegaColumn, NavLinkItem } from "@/config/navigation";

type FeaturedServicesProps = {
  images: [string, string];
};

function getServiceColumns(): NavMegaColumn[] {
  const services = MAIN_NAV.find((item) => item.href === "/dich-vu");
  return services?.columns ?? [];
}

function cardTitle(column: NavMegaColumn) {
  if (column.title.toUpperCase().includes("SPA")) return "SPA";
  return "THẨM MỸ";
}

function ServiceLink({ item }: { item: NavLinkItem }) {
  return (
    <li className="min-w-0 max-w-full">
      <Link
        href={item.href}
        className="service-menu-link block max-w-full py-1 text-center text-[11px] font-medium leading-[1.45] text-white/88 transition-colors hover:text-[#f5e6b8] sm:text-xs"
      >
        {item.label}
      </Link>
    </li>
  );
}

function ServiceHoverCard({
  column,
  imageSrc,
  href,
  delay,
}: {
  column: NavMegaColumn;
  imageSrc: string;
  href: string;
  delay: number;
}) {
  const title = cardTitle(column);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group/card relative h-[320px] overflow-hidden rounded-[1.25rem] shadow-[0_8px_30px_rgba(15,48,36,0.12)] ring-1 ring-black/[0.06] transition-[box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(15,48,36,0.18)] sm:h-[352px] md:h-[380px] md:rounded-3xl"
    >
      <img
        src={imageSrc}
        alt={column.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover/card:scale-[1.06] group-focus-within/card:scale-[1.06]"
      />

      {/* Idle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)] transition-opacity duration-500 group-hover/card:opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071a14]/90 via-[#071a14]/25 to-transparent transition-opacity duration-500 group-hover/card:opacity-0" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pb-7 transition-all duration-500 group-hover/card:translate-y-2 group-hover/card:opacity-0">
        <h3 className="font-serif text-[1.65rem] font-bold tracking-[0.1em] text-white sm:text-3xl">{title}</h3>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4b86a]/70" />
          <span className="text-[#d4b86a]/80">◆</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4b86a]/70" />
        </div>
      </div>

      {/* Hover */}
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-b from-[#0a261c]/98 via-[#124830]/98 to-[#061810]/98 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-focus-within/card:opacity-100">
        <div
          className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(ellipse_75%_60%_at_50%_35%,rgba(212,184,106,0.2)_0%,transparent_68%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E')]"
          aria-hidden
        />

        <div
          className="relative z-10 mx-auto w-[calc(100%-1.5rem)] min-w-0 max-w-[360px] translate-y-2 scale-[0.98] overflow-visible rounded-2xl border border-[#d4b86a]/20 bg-gradient-to-b from-white/[0.12] to-white/[0.04] px-4 py-5 opacity-0 shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md transition-all duration-500 ease-out group-hover/card:translate-y-0 group-hover/card:scale-100 group-hover/card:opacity-100 group-focus-within/card:translate-y-0 group-focus-within/card:scale-100 group-focus-within/card:opacity-100 sm:px-5 sm:py-6"
        >
          <div className="text-center">
            <p className="mx-auto max-w-full whitespace-normal break-words px-2 text-[10px] font-semibold uppercase leading-snug tracking-[0.2em] text-[#d4b86a] sm:tracking-[0.24em]">
              {column.title}
            </p>
            <h3 className="mt-2 font-serif text-[1.75rem] font-bold leading-none text-white sm:text-[1.9rem]">{title}</h3>
            <div className="mx-auto mt-3 flex w-20 items-center justify-center gap-2">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4b86a]/60" />
              <span className="text-[8px] text-[#d4b86a]/70">✦</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4b86a]/60" />
            </div>
          </div>

          <ul
            className="mx-auto mt-4 grid w-full min-w-0 max-w-[300px] gap-x-2 gap-y-2 sm:mt-5 sm:gap-x-3 sm:gap-y-2.5"
            style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
          >
            {column.items.map((item) => (
              <ServiceLink key={item.href} item={item} />
            ))}
          </ul>

          <div className="mt-4 flex justify-center border-t border-white/10 pt-4 sm:mt-5 sm:pt-5">
            <Button
              asChild
              size="sm"
              className="group/btn bg-gold-gradient h-9 rounded-full border border-[#e8d48b]/50 px-8 text-[11px] font-bold tracking-[0.14em] text-[#0f3024] shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition-all hover:scale-[1.03] hover:brightness-110"
            >
              <Link href={href}>
                KHÁM PHÁ NGAY
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedServices({ images }: FeaturedServicesProps) {
  const columns = getServiceColumns();
  const servicesHref = MAIN_NAV.find((item) => item.href === "/dich-vu")?.href ?? "/dich-vu";

  if (columns.length < 2) return null;

  return (
    <section id="dich-vu" className="scroll-mt-24 bg-gradient-to-b from-secondary/25 via-secondary/15 to-background py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <div className="mb-10 text-center md:mb-12">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-primary/25 sm:block" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary/70">Dịch vụ</span>
            <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-primary/25 sm:block" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-primary md:text-4xl">DỊCH VỤ NỔI BẬT</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
            Giải pháp làm đẹp toàn diện chuẩn y khoa
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-7">
          <ServiceHoverCard column={columns[0]} imageSrc={images[0]} href={servicesHref} delay={0} />
          <ServiceHoverCard column={columns[1]} imageSrc={images[1]} href={servicesHref} delay={0.08} />
        </div>
      </div>
    </section>
  );
}
