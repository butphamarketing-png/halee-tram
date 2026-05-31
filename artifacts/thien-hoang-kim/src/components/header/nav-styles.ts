import { cn } from "@/lib/utils";

/** Gạch vàng + nhích lên chỉ khi hover; các mục cùng baseline */
export function navTriggerClass(active: boolean) {
  return cn(
    "inline-flex h-9 shrink-0 items-center gap-0.5 whitespace-nowrap border-b-2 border-transparent px-0.5",
    "text-xs font-semibold tracking-wide transition-all duration-200 xl:text-[13px]",
    active ? "text-primary" : "text-foreground/85",
    "hover:-translate-y-0.5 hover:border-gold hover:text-primary",
  );
}

export function dropdownPanelClass() {
  return cn(
    "pointer-events-none absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3",
    "invisible opacity-0 transition-all duration-200",
    "group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100",
    "group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100",
  );
}
