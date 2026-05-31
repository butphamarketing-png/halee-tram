import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { MAIN_NAV } from "@/config/navigation";
import { cn } from "@/lib/utils";

type MobileNavMenuProps = {
  onClose: () => void;
  onBook: () => void;
};

export function MobileNavMenu({ onClose, onBook }: MobileNavMenuProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="absolute left-0 top-full z-50 flex max-h-[80vh] w-full flex-col gap-1 overflow-y-auto border-b bg-white px-4 py-4 shadow-lg xl:hidden">
      {MAIN_NAV.map((item) => {
        const hasSub = Boolean(item.children?.length || item.columns?.length);
        const isOpen = openKey === item.label;

        if (!hasSub) {
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="rounded-md p-2.5 text-sm font-semibold tracking-wide hover:bg-muted"
            >
              {item.label}
            </Link>
          );
        }

        return (
          <div key={item.label} className="rounded-md border border-border/60">
            <button
              type="button"
              className="flex w-full items-center justify-between p-2.5 text-left text-sm font-semibold tracking-wide"
              onClick={() => setOpenKey(isOpen ? null : item.label)}
            >
              {item.label}
              <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
            </button>
            {isOpen && (
              <div className="border-t border-border px-2 pb-2">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-md px-2 py-2 text-xs font-semibold text-primary"
                >
                  Xem tất cả {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="block rounded-md px-2 py-2 text-sm hover:bg-muted"
                  >
                    {child.label}
                  </Link>
                ))}
                {item.columns?.map((col) => (
                  <div key={col.title} className="mt-2">
                    <p className="px-2 py-1 text-xs font-bold text-primary">{col.title}</p>
                    {col.items.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className="block rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className="my-2 h-px bg-border" />
      <a href="tel:0938673996" className="flex items-center gap-2 p-2 font-bold text-primary">
        0938 673 996
      </a>
      <button
        type="button"
        onClick={() => {
          onClose();
          onBook();
        }}
        className="mt-2 w-full rounded-md bg-gold-gradient py-2.5 text-sm font-bold text-gold-foreground"
      >
        ĐẶT LỊCH NGAY
      </button>
    </div>
  );
}
