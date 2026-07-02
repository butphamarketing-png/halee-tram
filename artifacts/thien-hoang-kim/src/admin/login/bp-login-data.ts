import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  Tags,
} from "lucide-react";

export const ZALO_URL = "https://zalo.me/0937417982";
export const HOTLINE = "093.741.7982";

export type BpContact = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
};

export const BP_CONTACTS: BpContact[] = [
  { icon: Phone, label: "HOTLINE", value: "093.741.7982", href: "tel:0937417982" },
  {
    icon: Globe,
    label: "WEBSITE",
    value: "butphamarketing.com",
    href: "https://butphamarketing.com",
  },
  {
    icon: Mail,
    label: "EMAIL",
    value: "butphamarketing@gmail.com",
    href: "mailto:butphamarketing@gmail.com",
  },
  { icon: MessageCircle, label: "ZALO", value: "093.741.7982", href: ZALO_URL },
];

export type BpServiceCard = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
};

export const BP_SERVICE_CARDS: BpServiceCard[] = [
  {
    id: "pricing",
    icon: Tags,
    title: "Bảng giá dịch vụ",
    desc: "Website, Facebook, Google Maps — giá minh bạch.",
    href: "https://www.butphamarketing.com/banggia",
  },
  {
    id: "support",
    icon: Headphones,
    title: "Liên Hệ Kỹ Thuật",
    desc: "Hỗ trợ kỹ thuật chuyên nghiệp, tận tâm.",
    href: ZALO_URL,
  },
];
