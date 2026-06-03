import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { BookingSection } from "@/components/BookingSection";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeaturedServices } from "@/components/FeaturedServices";
import { CustomerResultsSection } from "@/components/CustomerResultsSection";
import { DoctorTeamSection } from "@/components/DoctorTeamSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BeautyHandbookSection } from "@/components/BeautyHandbookSection";
import { CtaContactSection } from "@/components/CtaContactSection";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CountUpValue } from "@/components/CountUpValue";
import { useSiteContent } from "@/context/SiteContentContext";
import { COMMITMENT_ICONS } from "@/lib/commitment-icons";
import { motion } from "framer-motion";

export default function HomePage() {
  const { content } = useSiteContent();
  const { settings, home } = content;
  const publishedArticles = content.articles.filter((a) => a.published);

  return (
    <SiteLayout>
      {/* HERO */}
      <HeroCarousel slides={home.heroSlides} />

      {/* COMMITMENTS */}
      <section className="section-surface border-b border-border/60 pt-14 pb-0 md:pt-16">
        <div className="container mx-auto px-4 pb-6 md:px-8 md:pb-8">
          <SectionHeading
            title={home.commitmentsTitle}
            subtitle={home.commitmentsSubtitle}
            className="mb-10 md:mb-12"
          />

          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:gap-6">
            {home.commitments.map((item, i) => {
              const Icon = COMMITMENT_ICONS[item.icon];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="luxury-card card-hover-lift group flex min-w-0 flex-col items-center rounded-2xl p-3 text-center sm:p-4 md:p-5"
                >
                  <div className="commitment-icon-wrap mb-3 flex h-11 w-11 shrink-0 cursor-default items-center justify-center rounded-full border border-[#c9a66b]/30 bg-gradient-to-br from-[#f4ece1] to-[#e5d8ca] text-primary shadow-inner sm:mb-4 sm:h-14 sm:w-14 md:h-16 md:w-16">
                    <Icon className="commitment-icon h-5 w-5 stroke-[1.5] sm:h-6 sm:w-6 md:h-7 md:w-7" />
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
      <section id="gioi-thieu" className="section-surface-alt scroll-mt-24 border-t border-border/40 pb-12 pt-10 md:pb-16 md:pt-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border/50 bg-white shadow-[0_20px_60px_-24px_rgba(15,48,36,0.12)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-stretch"
          >
              <div className="order-2 flex min-w-0 flex-col justify-start px-0 py-8 md:order-1 md:px-10 md:py-12 lg:px-12 lg:py-14">
                <div className="mb-5 flex items-center gap-4 md:mb-6">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary">{home.aboutEyebrow}</span>
                </div>

                <h2 className="font-vietnamese-serif text-3xl font-semibold leading-tight text-primary md:text-4xl lg:text-[2.75rem]">
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
                  <div className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-3 sm:gap-4 sm:py-5 md:py-6">
                    {home.aboutStats.map((stat) => (
                      <div
                        key={stat.title}
                        className="stat-pill flex min-w-0 flex-col items-center rounded-xl px-3 py-4 text-center"
                      >
                        <CountUpValue
                          value={stat.value}
                          className="font-serif text-2xl font-bold text-primary sm:text-3xl md:text-4xl"
                          durationMs={stat.value.includes("5000") ? 2200 : 1600}
                        />
                        <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-foreground sm:whitespace-nowrap sm:text-xs md:text-sm">
                          {stat.title}
                        </div>
                        <div className="mt-1 text-[10px] text-muted-foreground sm:whitespace-nowrap sm:text-[11px] md:text-xs">
                          {stat.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 grid grid-cols-3">
                    <div aria-hidden className="hidden sm:block" />
                    <div className="col-span-3 flex justify-center sm:col-span-1 sm:col-start-2">
                      <Link href="/gioi-thieu">
                        <Button className="group h-12 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                          TÌM HIỂU THÊM
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 relative w-full md:order-2 md:min-h-[480px] lg:min-h-[520px]">
                <img
                  src={home.aboutImage}
                  alt={`${settings.clinicName} — ${settings.clinicSubtitle}`}
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

      <BookingSection />

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
        websiteUrl={settings.websiteUrl || "/"}
        websiteLabel={settings.websiteLabel || "haleetram.studio"}
        facebookUrl={settings.facebookUrl}
        messengerSlug={settings.messengerSlug}
        phone={settings.phone}
      />
    </SiteLayout>
  );
}