export type CommitmentIconKey =
  | "Shield"
  | "Stethoscope"
  | "TestTube"
  | "Heart"
  | "Sparkles"
  | "FileText";

export type SiteCommitment = {
  id: string;
  icon: CommitmentIconKey;
  title: string;
  desc: string;
};

export type SiteStat = {
  value: string;
  title: string;
  sub: string;
};

export type SiteHeroSlide = {
  id: string;
  src: string;
  alt: string;
};

export type SiteDoctor = {
  id: string;
  img: string;
  name: string;
  spec: string;
  exp: string;
  bio: string;
};

export type ArticleSeo = {
  /** Tiêu đề SEO (tab trình duyệt / Google). Để trống = dùng tiêu đề bài viết */
  metaTitle: string;
  /** Mô tả meta. Để trống = dùng mô tả ngắn bài viết */
  metaDescription: string;
  /** Từ khóa chính — phân tích SEO (giống Yoast focus keyphrase) */
  focusKeyphrase: string;
  keywords: string;
  /** URL canonical tùy chỉnh (để trống = URL bài viết) */
  canonicalUrl: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  robots: string;
  noindex: boolean;
  nofollow: boolean;
};

export type SiteArticle = {
  id: string;
  slug: string;
  category: string;
  image: string;
  title: string;
  date: string;
  description: string;
  body: string;
  published: boolean;
  seo: ArticleSeo;
};

export type SiteLink = {
  label: string;
  href: string;
};

export type SiteBookingService = {
  value: string;
  label: string;
};

export type SiteFooter = {
  featuredTitle: string;
  featuredServices: SiteLink[];
  quickLinksTitle: string;
  quickLinks: SiteLink[];
  copyright: string;
  designCreditLabel: string;
  designCreditUrl: string;
};

export type SiteHandbook = {
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
};

export type SitePriceListImage = {
  id: string;
  title: string;
  category?: string;
  src: string;
  alt: string;
};

export type SitePriceList = {
  title: string;
  description: string;
  note: string;
  images: SitePriceListImage[];
};

export type SiteTestimonial = {
  id: string;
  name: string;
  initials: string;
  avatar: string;
  text: string;
  /** Ảnh trong album khi bấm vào ô đánh giá */
  albumImages: string[];
};

export type SiteCustomerCase = {
  id: string;
  label: string;
  cover: string;
  images: string[];
};

export type SiteProcessStep = {
  id: string;
  title: string;
  desc: string;
  image: string;
};

export type SiteSeo = {
  siteName: string;
  /** URL gốc website (https://domain.com) — dùng canonical & sitemap */
  siteUrl: string;
  title: string;
  description: string;
  keywords: string;
  /** Ký tự ngăn cách title | site name */
  titleSeparator: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: "summary" | "summary_large_image";
  robots: string;
  locale: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
  facebookAppId: string;
  schemaEnabled: boolean;
  breadcrumbsEnabled: boolean;
  organizationType: string;
  organizationLogo: string;
  priceRange: string;
  robotsTxtExtra: string;
};

export type SiteSettings = {
  clinicName: string;
  clinicSubtitle: string;
  slogan: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  messengerSlug: string;
  topbarAddress: string;
  topbarHours: string;
  websiteUrl: string;
  websiteLabel: string;
  facebookUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  seo: SiteSeo;
};

export type SiteHomeSections = {
  heroSlides: SiteHeroSlide[];
  commitmentsTitle: string;
  commitmentsSubtitle: string;
  commitments: SiteCommitment[];
  aboutEyebrow: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutParagraphs: string[];
  aboutStats: SiteStat[];
  aboutImage: string;
  featuredServiceImages: [string, string];
  bookingImage: string;
  testimonialsBackground: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaImage: string;
  footerDescription: string;
};

export type SiteContent = {
  version: number;
  settings: SiteSettings;
  home: SiteHomeSections;
  footer: SiteFooter;
  handbook: SiteHandbook;
  priceList: SitePriceList;
  bookingServices: SiteBookingService[];
  doctors: SiteDoctor[];
  articles: SiteArticle[];
  testimonials: SiteTestimonial[];
  customerCases: SiteCustomerCase[];
  processSteps: SiteProcessStep[];
  luckyWheel: LuckyWheelConfig;
};

export type LuckyWheelSegment = {
  id: string;
  label: string;
  color: string;
  /** Tỷ lệ trúng (0–100, tổng các segment = 100) */
  weight: number;
};

export type LuckyWheelConfig = {
  enabled: boolean;
  /** Tiêu đề hiển thị trên popup */
  title: string;
  subtitle: string;
  /** Tự động hiện popup sau X giây (0 = không tự hiện) */
  autoShowDelay: number;
  segments: LuckyWheelSegment[];
  /** Văn bản nút quay */
  spinButtonLabel: string;
  /** Văn bản sau khi quay xong trước khi hiện form */
  resultHeading: string;
  resultDescription: string;
};

export type BookingSubmission = {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  notes?: string;
  createdAt: string;
  status: "new" | "contacted" | "done";
};
