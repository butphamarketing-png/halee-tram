import type { ComponentType } from "react";
import { Calendar, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiZalo } from "react-icons/si";
import { MAPS_URL, ZALO_URL } from "@/config/contact";
import { useSiteContent } from "@/context/SiteContentContext";
import { cn } from "@/lib/utils";

type QuickContactActionsProps = {
  onBook: () => void;
};

type ContactAction = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  highlight?: boolean;
  shakeDelay?: string;
};

function buildActions(messengerSlug: string, phone: string): ContactAction[] {
  return [
    { id: "map", label: "Tìm đường", icon: MapPin, href: MAPS_URL, shakeDelay: "contact-shake-delay-0" },
    { id: "zalo", label: "Chat ZL", icon: SiZalo, href: ZALO_URL, shakeDelay: "contact-shake-delay-1" },
    { id: "book", label: "Đặt lịch", icon: Calendar, highlight: true, shakeDelay: "contact-shake-delay-2" },
    {
      id: "messenger",
      label: "Messenger",
      icon: MessageCircle,
      href: `https://m.me/${messengerSlug}`,
      shakeDelay: "contact-shake-delay-3",
    },
    { id: "call", label: "Gọi ngay", icon: Phone, href: `tel:${phone}`, shakeDelay: "contact-shake-delay-4" },
  ];
}

function ActionLink({
  action,
  onBook,
  variant,
}: {
  action: ContactAction;
  onBook: () => void;
  variant: "mobile" | "desktop";
}) {
  const Icon = action.icon;
  const isBook = action.id === "book";
  const href = isBook ? undefined : action.href;
  const onClick = isBook ? onBook : action.onClick;

  const desktopBtn = (
    <span
      className={cn(
        "contact-shake flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110",
        action.shakeDelay,
      )}
    >
      <Icon className="h-5 w-5" />
    </span>
  );

  const mobileInner = (
    <>
      <span
        className={cn(
          "flex items-center justify-center rounded-full transition-transform active:scale-95",
          action.highlight
            ? "h-14 w-14 bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20"
            : "h-9 w-9 text-primary",
        )}
      >
        <Icon className={cn(action.highlight ? "h-6 w-6" : "h-[1.125rem] w-[1.125rem]")} />
      </span>
      <span
        className={cn(
          "max-w-[4.5rem] text-center leading-tight",
          action.highlight
            ? "text-[10px] font-bold text-primary"
            : "text-[9px] font-semibold text-foreground/85",
        )}
      >
        {action.label}
      </span>
    </>
  );

  if (variant === "desktop") {
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={action.label}
          title={action.label}
        >
          {desktopBtn}
        </a>
      );
    }
    return (
      <button type="button" onClick={onClick} className="block" aria-label={action.label} title={action.label}>
        {desktopBtn}
      </button>
    );
  }

  const mobileClass = cn(
    "flex min-w-0 flex-1 flex-col items-center justify-end gap-0.5 py-2",
    action.highlight && "-mt-4 pb-1",
  );

  if (href) {
    const external = action.id !== "call";
    return (
      <a
        href={href}
        className={mobileClass}
        aria-label={action.label}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {mobileInner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={mobileClass} aria-label={action.label}>
      {mobileInner}
    </button>
  );
}

export function QuickContactActions({ onBook }: QuickContactActionsProps) {
  const { content } = useSiteContent();
  const actions = buildActions(content.settings.messengerSlug, content.settings.phone);
  const desktopOrder = [...actions].reverse();

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(15,48,36,0.12)] backdrop-blur-md md:hidden"
        aria-label="Liên hệ nhanh"
      >
        <div className="mx-auto flex max-w-lg items-end justify-between px-1">
          {actions.map((action) => (
            <ActionLink key={action.id} action={action} onBook={onBook} variant="mobile" />
          ))}
        </div>
      </nav>

      <div
        className="fixed bottom-8 right-4 z-50 hidden flex-col items-center gap-3 md:flex"
        aria-label="Liên hệ nhanh"
      >
        {desktopOrder.map((action) => (
          <ActionLink key={action.id} action={action} onBook={onBook} variant="desktop" />
        ))}
      </div>
    </>
  );
}
