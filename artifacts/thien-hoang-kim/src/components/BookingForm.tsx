import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSiteContent } from "@/context/SiteContentContext";
import { saveBooking } from "@/lib/booking-storage";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ và tên"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  service: z.string().min(1, "Vui lòng chọn dịch vụ"),
  date: z.string().min(1, "Vui lòng chọn ngày"),
  notes: z.string().optional(),
  agree: z.boolean().refine((val) => val === true, "Bạn cần đồng ý với chính sách bảo mật"),
});

type BookingFormProps = {
  compact?: boolean;
  prefill?: Partial<Pick<z.infer<typeof formSchema>, "name" | "phone">>;
  lockPrefill?: boolean;
  onSuccess?: () => void;
  className?: string;
};

export function BookingForm({ compact, prefill, lockPrefill, onSuccess, className }: BookingFormProps) {
  const { content } = useSiteContent();
  const { bookingServices } = content;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: prefill?.name ?? "",
      phone: prefill?.phone ?? "",
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
    onSuccess?.();
  }

  const inputClass = compact ? "h-10 bg-secondary/10" : "h-9 bg-secondary/10 sm:h-10 md:h-11";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-3 sm:space-y-4", className)}>
        <div className={cn("grid grid-cols-1 gap-3", !compact && "sm:gap-4 md:grid-cols-2 md:gap-5")}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold sm:text-sm">Họ và tên *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập họ tên"
                    className={inputClass}
                    disabled={lockPrefill && Boolean(prefill?.name)}
                    {...field}
                  />
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
                <FormLabel className="text-xs font-semibold sm:text-sm">Số điện thoại *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập SĐT"
                    className={inputClass}
                    disabled={lockPrefill && Boolean(prefill?.phone)}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={cn("grid grid-cols-1 gap-3", !compact && "sm:gap-4 md:grid-cols-2 md:gap-5")}>
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold sm:text-sm">Dịch vụ *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Chọn dịch vụ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bookingServices.map((s) => (
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
                <FormLabel className="text-xs font-semibold sm:text-sm">Ngày hẹn *</FormLabel>
                <FormControl>
                  <Input type="date" className={inputClass} {...field} />
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
              <FormLabel className="text-xs font-semibold sm:text-sm">Ghi chú</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mong muốn của bạn..."
                  className={cn("resize-none bg-secondary/10", compact ? "min-h-[72px]" : "min-h-[72px] sm:min-h-[88px]")}
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
            <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-lg border bg-secondary/20 p-2.5 sm:p-3">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="cursor-pointer text-[10px] font-medium leading-snug sm:text-xs">
                Tôi đồng ý chính sách bảo mật của {content.settings.clinicName}
              </FormLabel>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className={cn("w-full rounded-full bg-primary font-bold", compact ? "h-11" : "h-10 sm:h-11 md:h-12")}
        >
          ĐẶT LỊCH NGAY <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
