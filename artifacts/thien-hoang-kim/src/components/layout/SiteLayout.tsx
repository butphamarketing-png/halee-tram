import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  Calendar,
  Clock,
  Facebook,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Stethoscope,
  X,
  Youtube,
} from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { HeaderBrand } from "@/components/HeaderBrand";
import { DesktopNav } from "@/components/header/DesktopNav";
import { MobileNavMenu } from "@/components/header/MobileNavMenu";
import { QuickContactActions } from "@/components/QuickContactActions";
import { TopbarMarquee } from "@/components/TopbarMarquee";
import { BookingDialog } from "@/components/BookingDialog";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/SiteContentContext";
import { useBookingDialog } from "@/context/BookingDialogContext";
import { formatPhoneDisplay } from "@/lib/format-phone";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { content, loading } = useSiteContent();
  const { openBookingDialog } = useBookingDialog();
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings, home, footer } = content;

  useEffect(() => {
    if (location.includes("#dat-lich")) {
      setTimeout(() => document.getElementById("dat-lich")?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-background pb-[5.25rem] font-sans text-foreground md:pb-0">
      <TopbarMarquee
        address={settings.topbarAddress}
        hours={settings.topbarHours}
        facebookUrl={settings.facebookUrl}
        tiktokUrl={settings.tiktokUrl}
        youtubeUrl={settings.youtubeUrl}
      />

      <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
        <div className="container mx-auto max-w-[1440px] px-3 sm:px-4 md:px-6 xl:px-8">
          <div className="flex min-h-[76px] flex-nowrap items-center gap-2 py-2 md:min-h-[84px] md:gap-3 xl:gap-4">
            <Link href="/" className="flex shrink-0 items-center" aria-label="Trang chủ">
              <HeaderBrand variant="header" />
            </Link>
            <DesktopNav />
            <div className="ml-auto hidden shrink-0 flex-nowrap items-center gap-2.5 xl:ml-0 xl:flex 2xl:gap-3">
              <a
                href={`tel:${settings.phone}`}
                className="phone-btn-pulse inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border-2 border-primary px-3.5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {formatPhoneDisplay(settings.phone)}
              </a>
              <Button
                type="button"
                onClick={openBookingDialog}
                className="btn-shake-after-5s inline-flex h-auto shrink-0 whitespace-nowrap rounded-md border-0 bg-gold-gradient px-4 py-2 text-sm font-bold tracking-wide text-gold-foreground shadow-md hover:opacity-95"
              >
                <Calendar className="mr-2 h-4 w-4 shrink-0" />
                ĐẶT LỊCH NGAY
              </Button>
            </div>
            <button
              type="button"
              className="ml-auto shrink-0 p-2 text-foreground xl:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <MobileNavMenu onClose={() => setIsMenuOpen(false)} onBook={openBookingDialog} />
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-[#0f2e1f] pb-10 pt-24 text-white/80 md:pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="space-y-6">
              <HeaderBrand variant="footer" />
              <p className="font-serif text-2xl italic text-white/90">{settings.slogan}</p>
              <p className="text-sm leading-relaxed text-white/70">{home.footerDescription}</p>
              <div className="flex gap-4 pt-2">
                <Shield className="h-5 w-5 text-white/40" />
                <Stethoscope className="h-5 w-5 text-white/40" />
                <Sparkles className="h-5 w-5 text-white/40" />
                <Heart className="h-5 w-5 text-white/40" />
              </div>
            </div>
            <div className="lg:pl-8">
              <h4 className="mb-8 text-sm font-bold uppercase tracking-widest text-white">THÔNG TIN LIÊN HỆ</h4>
              <ul className="space-y-5 text-sm text-white/70">
                <li className="flex gap-4">
                  <MapPin className="h-5 w-5 shrink-0 text-white/50" />
                  <span className="leading-relaxed">{settings.address}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-white/50" />
                  <span className="font-semibold text-white/90">{formatPhoneDisplay(settings.phone)}</span>
                </li>
                <li className="flex items-center gap-4">
                  <MessageCircle className="h-5 w-5 shrink-0 text-white/50" />
                  <span>{settings.email}</span>
                </li>
                <li className="flex gap-4">
                  <Clock className="h-5 w-5 shrink-0 text-white/50" />
                  <span>{settings.hours}</span>
                </li>
              </ul>
            </div>
            <div className="lg:pl-8">
              <h4 className="mb-8 text-sm font-bold uppercase tracking-widest text-white">{footer.featuredTitle}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                {footer.featuredServices.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="inline-block transition-all hover:translate-x-1 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-sm font-bold uppercase tracking-widest text-white">{footer.quickLinksTitle}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                {footer.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="inline-block transition-all hover:translate-x-1 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row">
            <p>{footer.copyright}</p>
            <div className="flex gap-6">
              <a href={settings.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-1 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={settings.tiktokUrl || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-1 hover:text-white">
                <SiTiktok className="h-4 w-4" />
              </a>
              <a href={settings.youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-1 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <QuickContactActions onBook={openBookingDialog} />
      <BookingDialog />
    </div>
  );
}
