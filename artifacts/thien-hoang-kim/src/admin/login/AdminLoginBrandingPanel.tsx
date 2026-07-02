import type { LucideIcon } from "lucide-react";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BP_CONTACTS,
  BP_SERVICE_CARDS,
  type BpServiceCard,
} from "@/admin/login/bp-login-data";

function BpmLogoLight({ subtitle }: { subtitle: string }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/bpm-logo.png"
        alt="Bứt Phá Marketing"
        className="h-11 w-11 shrink-0 rounded-xl object-cover shadow-lg shadow-violet-900/40"
      />
      <div>
        <p className="text-sm font-extrabold tracking-wide text-white">BỨT PHÁ MARKETING</p>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-300">{subtitle}</p>
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, label, value, href }: (typeof BP_CONTACTS)[number]) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-[rgba(255,255,255,0.04)] px-3 py-2.5 backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 hover:shadow-lg hover:shadow-violet-500/20"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7c3aed]/30 text-violet-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-purple-600 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.4)]">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-wider text-violet-400">{label}</p>
        <p className="truncate text-xs font-semibold text-white transition-colors duration-300 group-hover:text-violet-100">
          {value}
        </p>
      </div>
    </a>
  );
}

function ServiceCardButton({
  icon: Icon,
  title,
  desc,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 text-left backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/20"
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#7c3aed]/25 text-violet-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-purple-600 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.4)]">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-violet-100">
        {title}
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/55">
        {desc}
      </p>
    </button>
  );
}

export function ServiceCardGrid({ onServiceClick }: { onServiceClick: (card: BpServiceCard) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {BP_SERVICE_CARDS.map((card) => (
        <ServiceCardButton
          key={card.id}
          icon={card.icon}
          title={card.title}
          desc={card.desc}
          onClick={() => onServiceClick(card)}
        />
      ))}
    </div>
  );
}

type AdminLoginBrandingPanelProps = {
  className?: string;
  compact?: boolean;
  onServiceClick: (card: BpServiceCard) => void;
};

export function AdminLoginBrandingPanel({
  className,
  compact = false,
  onServiceClick,
}: AdminLoginBrandingPanelProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0f0a1f]", className)}>
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl" />

      <div className="relative flex h-full flex-col justify-between px-6 py-8 sm:px-10 lg:px-10 lg:py-10 xl:px-14">
        <div>
          {!compact && <BpmLogoLight subtitle="Dành cho khách hàng" />}

          {!compact && (
            <>
              <h2 className="mt-10 text-3xl font-extrabold leading-tight tracking-tight text-white xl:text-4xl">
                QUẢN LÝ
                <br />
                MARKETING &amp; WEBSITE
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-violet-200/80">
                Dành riêng cho khách hàng Bứt Phá Marketing —{" "}
                <span className="font-semibold text-white">Halee Trâm</span>.
              </p>
            </>
          )}

          {compact && (
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
              Dịch vụ Bứt Phá Marketing
            </p>
          )}

          <div className={cn("grid grid-cols-2 gap-3 xl:grid-cols-4", compact ? "mt-0" : "mt-8")}>
            {BP_CONTACTS.map((contact) => (
              <ContactCard key={contact.label} {...contact} />
            ))}
          </div>
        </div>

        <div className={cn("relative", compact ? "mt-6" : "mt-8")}>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
            Dịch vụ của chúng tôi
          </p>
          <ServiceCardGrid onServiceClick={onServiceClick} />

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            <p className="flex items-center gap-2 text-xs text-violet-300/80">
              <Shield className="h-3.5 w-3.5" />
              Powered by Bứt Phá Marketing
            </p>
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-300">
              Phiên bản v2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
