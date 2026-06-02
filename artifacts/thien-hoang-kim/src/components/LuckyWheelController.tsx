import { useState } from "react";
import { LuckyWheelPopup } from "@/components/LuckyWheelPopup";
import { LuckyWheelFloatingIcon } from "@/components/LuckyWheelFloatingIcon";
import { useSiteContent } from "@/context/SiteContentContext";

export function LuckyWheelController() {
  const { content } = useSiteContent();
  const cfg = content.luckyWheel;
  const [open, setOpen] = useState(false);

  if (!cfg?.enabled) return null;

  return (
    <>
      <LuckyWheelPopup externalOpen={open} onExternalClose={() => setOpen(false)} />
      <LuckyWheelFloatingIcon onClick={() => setOpen(true)} />
    </>
  );
}
