import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Calendar,
  Globe,
  Headphones,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Monitor,
  Phone,
  Rocket,
  Server,
} from "lucide-react";

export const ZALO_URL = "https://zalo.me/0937417982";
export const HOTLINE = "093.741.7982";

export const WEBSITE_CARE_PLANS = [
  {
    name: "10 bài viết/tháng",
    price: "1.000.000đ/tháng",
    features: "Viết bài SEO · Tối ưu Onpage cơ bản · Cập nhật hình ảnh · Báo cáo tháng",
    popular: false,
  },
  {
    name: "20 bài viết/tháng",
    price: "2.000.000đ/tháng",
    features: "Viết bài SEO chuyên sâu · Tối ưu từ khóa · Internal Link · Báo cáo & đề xuất cải thiện",
    popular: true,
  },
  {
    name: "30 bài viết/tháng",
    price: "2.500.000đ/tháng",
    features: "Chiến lược Content · SEO + CTA · Tối ưu tốc độ · Hỗ trợ ưu tiên",
    popular: false,
  },
] as const;

export const GOOGLE_ADS_PLAN = {
  label: "Chi phí quản lý",
  price: "1.000.000đ/tháng",
  includes: [
    "Thiết lập chiến dịch",
    "Tối ưu từ khóa",
    "Theo dõi chuyển đổi",
    "Báo cáo hàng tháng",
    "Hỗ trợ kỹ thuật",
  ],
} as const;

export const WEBSITE_UPGRADE = {
  current: [
    "Trang chủ",
    "Dịch vụ",
    "Tin tức",
    "Liên hệ",
    "Form liên hệ",
    "Responsive mobile",
  ],
  proposed: [
    "AI Chat hỗ trợ khách hàng",
    "Landing Page chuyển đổi",
    "Tích hợp CRM",
    "Theo dõi chuyển đổi",
    "Tối ưu tốc độ nâng cao",
    "Bộ lọc nâng cao",
    "Tích hợp Marketing Automation",
    "Dashboard báo cáo",
  ],
} as const;

export const HOSTING_PLANS = [
  { size: "3GB", price: "3.348.000đ" },
  { size: "5GB", price: "4.872.000đ" },
  { size: "7GB", price: "6.000.000đ" },
  { size: "8GB", price: "6.504.000đ" },
  { size: "10GB", price: "7.200.000đ" },
  { size: "16GB", price: "10.080.000đ" },
  { size: "20GB", price: "12.000.000đ" },
  { size: "30GB", price: "16.080.000đ" },
  { size: "50GB", price: "24.000.000đ" },
  { size: "60GB", price: "28.008.000đ" },
  { size: "70GB", price: "32.040.000đ" },
  { size: "80GB", price: "36.000.000đ" },
  { size: "90GB", price: "39.960.000đ" },
  { size: "100GB", price: "43.200.000đ" },
] as const;

export const RENEWAL_INFO = {
  expiryDate: "01/06/2027",
  hosting: { label: "3GB", price: "3.348.000đ/năm" },
  domain: { label: "haleetram.com", price: "346.500đ" },
} as const;

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
    value: "haleetram@gmail.com",
    href: "mailto:haleetram@gmail.com",
  },
  { icon: MessageCircle, label: "ZALO", value: "093.741.7982", href: ZALO_URL },
];

export type BpServiceModal = "website-care" | "google-ads" | "website-upgrade" | "hosting";

export type BpServiceCard = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  action?: "renewal";
  href?: string;
  modal?: BpServiceModal;
};

export const BP_SERVICE_CARDS: BpServiceCard[] = [
  {
    id: "website-care",
    icon: Monitor,
    title: "Chăm Sóc Website",
    desc: "Cập nhật nội dung, hình ảnh, backup định kỳ.",
    modal: "website-care",
  },
  {
    id: "google-ads",
    icon: BarChart3,
    title: "Google Ads",
    desc: "Quản lý chiến dịch, ngân sách, chuyển đổi.",
    modal: "google-ads",
  },
  {
    id: "website-upgrade",
    icon: Rocket,
    title: "Nâng Cấp Website",
    desc: "Tính năng mới, cải thiện UI/UX.",
    modal: "website-upgrade",
  },
  {
    id: "hosting",
    icon: Server,
    title: "Nâng Cấp Hosting",
    desc: "Quản lý hosting, SSL, tốc độ.",
    modal: "hosting",
  },
  {
    id: "fanpage",
    icon: Megaphone,
    title: "Marketing Fanpage",
    desc: "Lịch đăng bài, quản lý nội dung.",
    href: "https://www.butphamarketing.com/facebook",
  },
  {
    id: "maps",
    icon: MapPin,
    title: "Marketing Maps",
    desc: "Google Business Profile, SEO Maps.",
    href: "https://www.butphamarketing.com/google-maps",
  },
  {
    id: "support",
    icon: Headphones,
    title: "Liên Hệ Kỹ Thuật",
    desc: "Hỗ trợ kỹ thuật chuyên nghiệp, tận tâm.",
    href: ZALO_URL,
  },
  {
    id: "renewal",
    icon: Calendar,
    title: "Thông Tin Gia Hạn",
    desc: "Ngày gia hạn, hosting và tên miền.",
    action: "renewal",
  },
];
