import { useSiteContent } from "@/context/SiteContentContext";
import { BookingForm } from "@/components/BookingForm";

export function BookingSection() {
  const { content } = useSiteContent();
  const { home } = content;

  return (
    <section id="dat-lich" className="scroll-mt-24 border-t border-border bg-white py-12 md:py-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-white shadow-2xl md:min-h-[480px] md:grid-cols-[minmax(260px,42%)_minmax(0,1fr)] md:rounded-[2rem] lg:grid-cols-[minmax(300px,44%)_minmax(0,1fr)]">
          <div className="relative aspect-[4/5] max-h-[min(72vw,360px)] w-full bg-muted sm:aspect-[3/4] sm:max-h-[min(68vw,400px)] md:aspect-auto md:h-full md:max-h-none md:min-h-[480px]">
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
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
