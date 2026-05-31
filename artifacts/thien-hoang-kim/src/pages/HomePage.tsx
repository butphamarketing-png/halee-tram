import { MapPin, Clock, Phone, Menu, X, Facebook, Youtube, Calendar, ArrowRight, MessageCircle, Shield, Stethoscope, Sparkles, Heart } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { HeaderBrand } from "@/components/HeaderBrand";
import { DesktopNav } from "@/components/header/DesktopNav";
import { MobileNavMenu } from "@/components/header/MobileNavMenu";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeaturedServices } from "@/components/FeaturedServices";
import { CustomerResultsSection } from "@/components/CustomerResultsSection";
import { DoctorTeamSection } from "@/components/DoctorTeamSection";
import { ExamProcessSection } from "@/components/ExamProcessSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BeautyHandbookSection } from "@/components/BeautyHandbookSection";
import { CtaContactSection } from "@/components/CtaContactSection";
import { QuickContactActions } from "@/components/QuickContactActions";
import { useSiteContent } from "@/context/SiteContentContext";
import { COMMITMENT_ICONS } from "@/lib/commitment-icons";
import { saveBooking } from "@/lib/booking-storage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ và tên"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  service: z.string().min(1, "Vui lòng chọn dịch vụ"),
  date: z.string().min(1, "Vui lòng chọn ngày"),
  notes: z.string().optional(),
  agree: z.boolean().refine(val => val === true, "Bạn cần đồng ý với chính sách bảo mật")
});

function scrollToBooking() {
  document.getElementById("dat-lich")?.scrollIntoView({ behavior: "smooth" });
}

function formatPhoneDisplay(phone: string) {
  const d = phone.replace(/\D/g, "");
  if (d.length === 10) return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return phone;
}

export default function HomePage() {
  const { content, loading } = useSiteContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings, home, footer } = content;
  const publishedArticles = content.articles.filter((a) => a.published);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      date: "",
      notes: "",
      agree: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await saveBooking({
      name: values.name,
      phone: values.phone,
      service: values.service,
      date: values.date,
      notes: values.notes,
    });
    toast({
      title: "Đặt lịch thành công!",
      description: "Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
    });
    form.reset();
  }

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-background pb-[5.25rem] font-sans text-foreground md:pb-0">
      
      {/* TOPBAR */}
      <div className="w-full bg-primary text-primary-foreground py-2.5 px-4 text-[11px] font-medium md:px-8 md:text-xs">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{settings.topbarAddress}</span>
          </div>
          <div className="hidden items-center gap-1.5 md:flex">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span>{settings.topbarHours}</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { Icon: Facebook, href: settings.facebookUrl },
              { Icon: SiTiktok, href: settings.tiktokUrl },
              { Icon: Youtube, href: settings.youtubeUrl },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 text-primary-foreground transition hover:bg-white/15"
                aria-label="Mạng xã hội"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
        <div className="container mx-auto max-w-[1440px] px-3 sm:px-4 md:px-6 xl:px-8">
          <div className="flex min-h-[76px] flex-nowrap items-center gap-2 py-2 md:min-h-[84px] md:gap-3 xl:gap-4">
            <a
              href="#"
              className="flex shrink-0 items-center"
              aria-label="Thiên Hoàng Kim Aesthetic Clinic"
            >
              <HeaderBrand variant="header" />
            </a>

            <DesktopNav />

            <div className="ml-auto hidden shrink-0 flex-nowrap items-center gap-2.5 xl:ml-0 xl:flex 2xl:gap-3">
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border-2 border-primary px-3.5 py-2 text-sm font-semibold leading-none text-primary transition hover:bg-primary/5"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {formatPhoneDisplay(settings.phone)}
              </a>
              <Button
                type="button"
                onClick={scrollToBooking}
                className="inline-flex h-auto shrink-0 whitespace-nowrap rounded-md border-0 bg-gold-gradient px-4 py-2 text-sm font-bold leading-none tracking-wide text-gold-foreground shadow-md hover:opacity-95"
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
          <MobileNavMenu onClose={() => setIsMenuOpen(false)} onBook={scrollToBooking} />
        )}
      </header>

      {/* HERO — banner ảnh từ design (không block chữ HTML) */}
      <HeroCarousel slides={home.heroSlides} />

      {/* COMMITMENTS */}
      <section className="border-b border-border bg-white pt-12 md:pt-14 pb-0">
        <div className="container mx-auto px-4 pb-4 md:px-8 md:pb-6">
          <div className="mb-8 text-center md:mb-10">
            <h2 className="font-serif text-3xl font-semibold text-primary md:text-4xl">
              {home.commitmentsTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {home.commitmentsSubtitle}
            </p>
          </div>

          <div
            className="grid w-full gap-3 md:gap-5 lg:gap-6"
            style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
          >
            {home.commitments.map((item, i) => {
              const Icon = COMMITMENT_ICONS[item.icon];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex min-w-0 flex-col items-center rounded-xl border border-border bg-white p-3 text-center shadow-sm transition-shadow hover:shadow-md sm:p-4 md:p-5"
                >
                  <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary/15 bg-secondary/40 text-primary sm:mb-4 sm:h-14 sm:w-14 md:h-16 md:w-16">
                    <Icon className="h-5 w-5 stroke-[1.5] sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  </div>
                  <h3 className="mb-1.5 w-full text-[10px] font-bold leading-tight text-primary sm:mb-2 sm:text-xs md:text-sm">
                    {item.title}
                  </h3>
                  <p className="w-full text-[10px] leading-snug text-muted-foreground sm:text-[11px] sm:leading-relaxed md:text-xs">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT — desktop: trái chữ | phải ảnh; mobile: ảnh trên, chữ full width */}
      <section id="gioi-thieu" className="scroll-mt-24 border-t border-border/40 bg-white pb-12 pt-8 md:pb-16 md:pt-10">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 overflow-hidden md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-stretch"
          >
              <div className="order-2 flex min-w-0 flex-col justify-start px-0 py-8 md:order-1 md:px-10 md:py-12 lg:px-12 lg:py-14">
                <div className="mb-5 flex items-center gap-4 md:mb-6">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary">{home.aboutEyebrow}</span>
                </div>

                <h2 className="font-serif text-3xl font-semibold leading-tight text-primary md:text-4xl lg:text-[2.75rem]">
                  {home.aboutTitle}
                </h2>
                <p className="mt-2 font-sans text-base uppercase tracking-[0.22em] text-muted-foreground md:text-lg">
                  {home.aboutSubtitle}
                </p>

                <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80 md:mt-8 md:space-y-5 md:text-[17px]">
                  {home.aboutParagraphs.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>

                <div className="mt-8 md:mt-10">
                  <div className="grid grid-cols-3 divide-x divide-border border-y border-border py-5 md:py-6">
                    {home.aboutStats.map((stat) => (
                      <div key={stat.title} className="flex min-w-0 flex-col px-3 first:pl-0 last:pr-0 sm:px-5">
                        <div className="font-serif text-2xl font-bold text-primary sm:text-3xl md:text-4xl">{stat.value}</div>
                        <div className="mt-1.5 text-xs font-bold uppercase tracking-wide text-foreground sm:text-sm">
                          {stat.title}
                        </div>
                        <div className="mt-1 text-[11px] leading-snug text-muted-foreground md:text-xs">{stat.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 grid grid-cols-3">
                    <div aria-hidden className="hidden sm:block" />
                    <div className="col-span-3 flex justify-center sm:col-span-1 sm:col-start-2">
                      <Button className="group h-12 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                        TÌM HIỂU THÊM
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 relative w-full md:order-2 md:min-h-[480px] lg:min-h-[520px]">
                <img
                  src={home.aboutImage}
                  alt="Thiên Hoàng Kim Aesthetic Clinic"
                  className="aspect-[4/3] w-full object-cover object-top md:absolute md:inset-0 md:aspect-auto md:h-full"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent md:inset-y-0 md:left-0 md:h-auto md:w-24 md:bg-gradient-to-r md:from-white md:via-white/80 md:to-transparent lg:w-32"
                  aria-hidden
                />
              </div>
          </motion.div>
        </div>
      </section>

      <FeaturedServices images={home.featuredServiceImages} />

      <CustomerResultsSection cases={content.customerCases} />

      <DoctorTeamSection doctors={content.doctors} />

      {/* ĐẶT LỊCH TƯ VẤN MIỄN PHÍ (Booking) */}
      <section id="dat-lich" className="scroll-mt-24 border-t border-border bg-white py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-white shadow-2xl md:min-h-[480px] md:grid-cols-[minmax(260px,42%)_minmax(0,1fr)] md:rounded-[2rem] lg:grid-cols-[minmax(300px,44%)_minmax(0,1fr)]">
            {/* Ảnh: mobile full width + tỉ lệ cố định; desktop cột trái cao full */}
            <div className="relative w-full bg-muted aspect-[4/5] max-h-[min(72vw,360px)] sm:aspect-[3/4] sm:max-h-[min(68vw,400px)] md:aspect-auto md:max-h-none md:min-h-[480px] md:h-full">
              <img
                src={home.bookingImage}
                alt="Đặt lịch tư vấn Thiên Hoàng Kim"
                className="absolute inset-0 h-full w-full object-cover object-[center_20%] md:object-center"
              />
            </div>

            <div className="flex min-w-0 flex-col justify-center overflow-y-auto p-4 sm:p-6 md:p-10 lg:p-12">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold sm:mb-5 sm:text-lg md:mb-6 md:text-xl">
                THÔNG TIN ĐẶT LỊCH
                <div className="ml-1 h-px flex-grow bg-border sm:ml-2" />
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-foreground/80 sm:text-sm">Họ và tên *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập họ tên" className="h-9 border-border bg-secondary/10 text-sm focus-visible:ring-primary/50 sm:h-10 md:h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-foreground/80 sm:text-sm">Số điện thoại *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập SĐT" className="h-9 border-border bg-secondary/10 text-sm focus-visible:ring-primary/50 sm:h-10 md:h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-foreground/80 sm:text-sm">Dịch vụ *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-9 border-border bg-secondary/10 text-sm focus:ring-primary/50 sm:h-10 md:h-11">
                                <SelectValue placeholder="Chọn dịch vụ" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {content.bookingServices.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-foreground/80 sm:text-sm">Ngày hẹn *</FormLabel>
                          <FormControl>
                            <Input type="date" className="h-9 border-border bg-secondary/10 text-sm focus-visible:ring-primary/50 sm:h-10 md:h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-foreground/80 sm:text-sm">Ghi chú</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Mong muốn của bạn..." 
                            className="min-h-[72px] resize-none border-border bg-secondary/10 text-sm focus-visible:ring-primary/50 sm:min-h-[88px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agree"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-lg border border-border bg-secondary/20 p-2.5 sm:space-x-3 sm:rounded-xl sm:p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 border-primary/50 data-[state=checked]:bg-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer text-[10px] font-medium leading-snug text-foreground/80 transition-colors hover:text-primary sm:text-xs">
                            Tôi đồng ý chính sách bảo mật của Thiên Hoàng Kim
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="h-10 w-full rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl sm:h-11 md:h-12 md:text-base"
                  >
                    ĐẶT LỊCH NGAY <ArrowRight className="ml-1.5 h-4 w-4 sm:ml-2 sm:h-5 sm:w-5" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <ExamProcessSection steps={content.processSteps} />

      <TestimonialsSection
        backgroundImage={home.testimonialsBackground}
        items={content.testimonials}
      />

      <BeautyHandbookSection
        articles={publishedArticles}
        title={content.handbook.title}
        viewAllLabel={content.handbook.viewAllLabel}
        viewAllHref={content.handbook.viewAllHref}
      />

      <CtaContactSection
        title={home.ctaTitle}
        description={home.ctaDescription}
        image={home.ctaImage}
        facebookUrl={settings.facebookUrl}
        messengerSlug={settings.messengerSlug}
        phone={settings.phone}
        onBook={scrollToBooking}
      />

      {/* FOOTER */}
      <footer className="bg-[#0f2e1f] pb-10 pt-24 text-white/80 md:pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="space-y-6">
              <HeaderBrand variant="footer" />
              <p className="font-serif italic text-2xl text-white/90">{settings.slogan}</p>
              <p className="text-sm leading-relaxed text-white/70">{home.footerDescription}</p>
              <div className="flex gap-4 pt-2">
                 <Shield className="w-5 h-5 text-white/40" />
                 <Stethoscope className="w-5 h-5 text-white/40" />
                 <Sparkles className="w-5 h-5 text-white/40" />
                 <Heart className="w-5 h-5 text-white/40" />
              </div>
            </div>

            <div className="lg:pl-8">
              <h4 className="mb-8 text-sm font-bold uppercase tracking-widest text-white">{footer.featuredTitle}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                {footer.featuredServices.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="inline-block transition-all hover:translate-x-1 hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pl-8">
              <h4 className="mb-8 text-sm font-bold uppercase tracking-widest text-white">{footer.quickLinksTitle}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                {footer.quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="inline-block transition-all hover:translate-x-1 hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 tracking-widest text-sm uppercase">THÔNG TIN LIÊN HỆ</h4>
              <ul className="space-y-5 text-sm text-white/70">
                <li className="flex gap-4">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-white/50" />
                  <span className="leading-relaxed">{settings.address}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <Phone className="w-5 h-5 flex-shrink-0 text-white/50" />
                  <span className="font-semibold text-white/90">{formatPhoneDisplay(settings.phone)}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <MessageCircle className="w-5 h-5 flex-shrink-0 text-white/50" />
                  <span>{settings.email}</span>
                </li>
                <li className="flex gap-4">
                  <Clock className="w-5 h-5 flex-shrink-0 text-white/50" />
                  <span>{settings.hours}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/50">
            <p>{footer.copyright}</p>
            <div className="flex gap-6">
              <a href={settings.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-1 hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href={settings.tiktokUrl || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-1 hover:text-white"><SiTiktok className="mt-0.5 h-4 w-4" /></a>
              <a href={settings.youtubeUrl || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-1 hover:text-white"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>

      <QuickContactActions onBook={scrollToBooking} />
    </div>
  );
}