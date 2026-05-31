import { MapPin, Clock, Phone, Menu, X, Facebook, Youtube, Shield, Stethoscope, TestTube, Heart, Sparkles, FileText, Calendar, Check, ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Crown, Navigation } from "lucide-react";
import { SiTiktok, SiZalo } from "react-icons/si";
import { Button } from "@/components/ui/button";
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

// Assets
import heroImg from "@assets/image_1780222008689.png";
import introImg from "@assets/image_1780222584456.png";
import beforeAfterImg from "@assets/image_1780222973517.png";
import bookingImg from "@assets/image_1780223381308.png";
import processImg from "@assets/954a405a-aa3d-400e-a3a4-faf9064f7cdb_1780223749515.png";
import doctor1 from "@/assets/images/doctor-1.png";
import doctor2 from "@/assets/images/doctor-2.png";
import doctor3 from "@/assets/images/doctor-3.png";
import blog1 from "@/assets/images/blog-1.png";
import blog2 from "@/assets/images/blog-2.png";
import blog3 from "@/assets/images/blog-3.png";
import before1 from "@/assets/images/before-1.png";
import after1 from "@/assets/images/after-1.png";
import before2 from "@/assets/images/before-2.png";
import after2 from "@/assets/images/after-2.png";

const formSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ và tên"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  service: z.string().min(1, "Vui lòng chọn dịch vụ"),
  date: z.string().min(1, "Vui lòng chọn ngày"),
  notes: z.string().optional(),
  agree: z.boolean().refine(val => val === true, "Bạn cần đồng ý với chính sách bảo mật")
});

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Đặt lịch thành công!",
      description: "Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
    });
    form.reset();
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
    <div className="min-h-[100dvh] w-full font-sans bg-background text-foreground overflow-x-hidden">
      
      {/* TOPBAR */}
      <div className="w-full bg-primary text-primary-foreground py-2 px-4 md:px-8 text-xs font-medium flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>323-325 Hùng Vương, Phường An Đông, TP Hồ Chí Minh</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Thứ 2 - Chủ nhật: 08:00 - 20:00</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-secondary transition-colors"><Facebook className="w-4 h-4" /></a>
          <a href="#" className="hover:text-secondary transition-colors"><SiTiktok className="w-3.5 h-3.5" /></a>
          <a href="#" className="hover:text-secondary transition-colors"><Youtube className="w-4 h-4" /></a>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-primary font-serif font-bold text-xl md:text-2xl leading-none tracking-wide flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              <div className="flex flex-col">
                <span>THIÊN HOÀNG KIM</span>
                <span className="text-[10px] tracking-[0.2em] font-sans text-muted-foreground uppercase">Aesthetic Clinic</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">Trang Chủ</a>
            <a href="#" className="hover:text-primary transition-colors">Giới Thiệu</a>
            <div className="group relative cursor-pointer">
              <span className="hover:text-primary transition-colors flex items-center gap-1">Dịch Vụ <ChevronRight className="w-3 h-3 rotate-90" /></span>
            </div>
            <a href="#" className="hover:text-primary transition-colors">Khách Hàng</a>
            <a href="#" className="hover:text-primary transition-colors">Bảng Giá</a>
            <div className="group relative cursor-pointer">
              <span className="hover:text-primary transition-colors flex items-center gap-1">Tin Tức <ChevronRight className="w-3 h-3 rotate-90" /></span>
            </div>
            <a href="#" className="hover:text-primary transition-colors">Liên Hệ</a>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Phone className="w-4 h-4" />
              <span>0938 673 996</span>
            </div>
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6">ĐẶT LỊCH NGAY</Button>
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b shadow-lg py-4 px-4 flex flex-col gap-4">
            <a href="#" className="font-medium p-2 hover:bg-muted rounded-md text-primary">Trang Chủ</a>
            <a href="#" className="font-medium p-2 hover:bg-muted rounded-md">Giới Thiệu</a>
            <a href="#" className="font-medium p-2 hover:bg-muted rounded-md">Dịch Vụ</a>
            <a href="#" className="font-medium p-2 hover:bg-muted rounded-md">Khách Hàng</a>
            <a href="#" className="font-medium p-2 hover:bg-muted rounded-md">Liên Hệ</a>
            <div className="h-px bg-border my-2"></div>
            <div className="flex items-center gap-2 p-2 text-primary font-bold">
              <Phone className="w-4 h-4" /> 0938 673 996
            </div>
            <Button className="w-full rounded-full mt-2">ĐẶT LỊCH NGAY</Button>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-secondary/30 overflow-hidden">
        {/* Abstract decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/80 to-transparent pointer-events-none"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[80%] rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-xl py-12 lg:py-0"
          >
            <motion.div variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-white text-primary text-xs font-semibold tracking-wider mb-6 shadow-sm border border-primary/10">
              PHÒNG KHÁM CHUYÊN KHOA THẨM MỸ
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] mb-2">
              THIÊN HOÀNG KIM
            </motion.h1>
            <motion.p variants={fadeIn} className="font-sans text-xl md:text-2xl text-muted-foreground tracking-widest uppercase mb-4">
              Aesthetic Clinic
            </motion.p>
            
            <motion.h2 variants={fadeIn} className="font-serif italic text-3xl md:text-4xl text-primary mb-6 font-light">
              Nâng Tầm Nhan Sắc
            </motion.h2>
            
            <motion.p variants={fadeIn} className="text-lg font-medium text-foreground mb-4">
              Chuẩn Y Khoa – Chuẩn An Toàn – Chuẩn Đẳng Cấp
            </motion.p>
            
            <motion.p variants={fadeIn} className="text-muted-foreground mb-8 leading-relaxed">
              Đội ngũ bác sĩ giàu kinh nghiệm cùng công nghệ hiện đại mang đến vẻ đẹp tự nhiên, an toàn và bền vững cho khách hàng.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base">
                ĐẶT LỊCH NGAY
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5 px-8 h-14 text-base">
                TƯ VẤN MIỄN PHÍ
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block h-[80vh] w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 bottom-0 h-32"></div>
            <img 
              src={heroImg} 
              alt="Vietnamese beauty model" 
              className="w-full h-full object-cover rounded-t-full rounded-bl-full shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">CAM KẾT TỪ THIÊN HOÀNG KIM</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Chúng tôi cam kết mang đến dịch vụ thẩm mỹ an toàn – chất lượng – tận tâm nhất</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "AN TOÀN LÀ ƯU TIÊN", desc: "Quy trình chuẩn y khoa, đảm bảo an toàn tuyệt đối cho khách hàng" },
              { icon: Stethoscope, title: "BÁC SĨ CHUYÊN MÔN CAO", desc: "Đội ngũ bác sĩ giàu kinh nghiệm, chuyên môn sâu và tận tâm" },
              { icon: TestTube, title: "CÔNG NGHỆ HIỆN ĐẠI", desc: "Ứng dụng công nghệ tiên tiến, thiết bị nhập khẩu chính hãng" },
              { icon: Heart, title: "DỊCH VỤ TẬN TÂM", desc: "Chăm sóc khách hàng chu đáo, trước, trong và sau khi làm đẹp" },
              { icon: Sparkles, title: "KẾT QUẢ TỰ NHIÊN", desc: "Mang đến vẻ đẹp hài hòa, tự nhiên và bền vững theo thời gian" },
              { icon: FileText, title: "BẢO HÀNH RÕ RÀNG", desc: "Chính sách bảo hành minh bạch, đảm bảo quyền lợi khách hàng" },
            ].map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-secondary/30 transition-colors duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-secondary text-primary flex items-center justify-center mb-4">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary"></div>
                <span className="text-primary font-semibold tracking-wider text-sm uppercase">GIỚI THIỆU</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-2">THIÊN HOÀNG KIM</h2>
              <p className="font-sans text-xl text-muted-foreground tracking-widest uppercase mb-8">Aesthetic Clinic</p>
              
              <p className="text-foreground/80 text-lg leading-relaxed mb-10">
                Thiên Hoàng Kim Aesthetic Clinic là phòng khám thẩm mỹ chuẩn y khoa, tiên phong ứng dụng công nghệ hiện đại và quy tụ đội ngũ bác sĩ chuyên môn cao, giàu kinh nghiệm. Chúng tôi cam kết mang đến những giải pháp làm đẹp an toàn, hiệu quả và phù hợp với từng cá nhân, kiến tạo vẻ đẹp tự nhiên, hài hòa và bền vững theo thời gian.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="text-center md:text-left">
                  <div className="text-4xl font-serif text-primary font-bold mb-2">15+</div>
                  <div className="font-semibold text-sm mb-1">Năm kinh nghiệm</div>
                  <div className="text-xs text-muted-foreground">Trong lĩnh vực thẩm mỹ</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-4xl font-serif text-primary font-bold mb-2">5000+</div>
                  <div className="font-semibold text-sm mb-1">Khách hàng</div>
                  <div className="text-xs text-muted-foreground">Đã tin tưởng lựa chọn</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-4xl font-serif text-primary font-bold mb-2">98%</div>
                  <div className="font-semibold text-sm mb-1">Khách hàng hài lòng</div>
                  <div className="text-xs text-muted-foreground">Về chất lượng dịch vụ</div>
                </div>
              </div>

              <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 group">
                TÌM HIỂU THÊM <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={introImg} 
                alt="Luxury clinic interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-white/20 rounded-3xl m-4 pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">DỊCH VỤ NỔI BẬT</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Giải pháp làm đẹp toàn diện chuẩn y khoa</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Thẩm mỹ card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col cursor-pointer"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={beforeAfterImg} alt="Thẩm mỹ" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-6 left-8 font-serif text-4xl font-bold text-white tracking-wider">THẨM MỸ</h3>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <ul className="space-y-4 mb-8">
                  {["Nâng mũi", "Cắt mí", "Filler – Botox", "Trẻ hóa da", "Tạo hình thẩm mỹ"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="font-medium text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:shadow-lg transition-all">
                  KHÁM PHÁ NGAY <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* Spa card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-primary text-primary-foreground rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col relative cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="h-64 overflow-hidden relative">
                <img src={bookingImg} alt="Spa" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent"></div>
                <h3 className="absolute bottom-6 left-8 font-serif text-4xl font-bold text-white tracking-wider">SPA</h3>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between relative z-10">
                <ul className="space-y-4 mb-8">
                  {["Gội đầu dưỡng sinh", "Massage thư giãn", "Chăm sóc da chuyên sâu", "Body Therapy", "Liệu trình thư giãn – phục hồi"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-medium text-primary-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full rounded-full bg-white text-primary hover:bg-gray-100 group-hover:shadow-lg transition-all">
                  KHÁM PHÁ NGAY <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KHÁCH HÀNG THỰC TẾ (Before/After Gallery) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">KHÁCH HÀNG THỰC TẾ</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Hàng nghìn khách hàng đã thay đổi diện mạo và tự tin hơn cùng Thiên Hoàng Kim.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Nâng Mũi Cấu Trúc", before: before1, after: after1 },
              { label: "Cắt Mí Tự Nhiên", before: before2, after: after2 },
              { label: "Filler – Trẻ Hóa", before: heroImg, after: introImg }, // Fallback images for the 3rd pair
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-secondary/10 rounded-3xl p-6 border border-border hover:shadow-xl transition-shadow group"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold tracking-wider text-muted-foreground bg-white px-3 py-1 rounded-full shadow-sm">TRƯỚC</span>
                  <ArrowRight className="w-5 h-5 text-primary" />
                  <span className="text-xs font-bold tracking-wider text-primary bg-white px-3 py-1 rounded-full shadow-sm border border-primary/20">SAU</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <img src={item.before} className="w-full aspect-[4/5] object-cover rounded-xl shadow-sm" alt="Before" />
                  <img src={item.after} className="w-full aspect-[4/5] object-cover rounded-xl shadow-sm" alt="After" />
                </div>
                <h3 className="font-serif font-bold text-center text-xl group-hover:text-primary transition-colors">{item.label}</h3>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-lg">XEM THÊM KẾT QUẢ THỰC TẾ <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        </div>
      </section>

      {/* ĐỘI NGŨ BÁC SĨ (Doctor Team) */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">ĐỘI NGŨ BÁC SĨ</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Đội ngũ bác sĩ giàu kinh nghiệm, chuyên môn cao và tận tâm với khách hàng.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: doctor1, name: "TS.BS NGUYỄN VĂN ANH", spec: "Chuyên khoa Phẫu thuật thẩm mỹ", exp: "15 NĂM KINH NGHIỆM", bio: "Hơn 15 năm gắn bó với nghề, kiến tạo vẻ đẹp hoàn mỹ cho hàng ngàn khách hàng bằng chữ Tâm." },
              { img: doctor2, name: "BS.CKII TRẦN QUỐC BẢO", spec: "Chuyên khoa Thẩm mỹ nội khoa", exp: "12 NĂM KINH NGHIỆM", bio: "Chuyên gia hàng đầu về trẻ hóa da công nghệ cao và các liệu trình thẩm mỹ không xâm lấn." },
              { img: doctor3, name: "BS.CKI LÊ THỊ HÀ MY", spec: "Chuyên khoa Da liễu thẩm mỹ", exp: "10 NĂM KINH NGHIỆM", bio: "Luôn cập nhật những xu hướng và công nghệ điều trị da tiên tiến nhất trên thế giới." },
            ].map((doc, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border p-8 flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                   <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                   <img src={doc.img} className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md relative z-10" alt={doc.name} />
                </div>
                <h3 className="font-serif font-bold text-2xl text-foreground mb-1">{doc.name}</h3>
                <p className="text-primary font-medium text-sm mb-4">{doc.spec}</p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4 bg-secondary/40 px-4 py-2 rounded-full w-full">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span className="font-bold text-foreground/80">{doc.exp}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed flex-grow">"{doc.bio}"</p>
                <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground group-hover:shadow-md transition-all">
                  XEM HỒ SƠ <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ĐẶT LỊCH TƯ VẤN MIỄN PHÍ (Booking) */}
      <section className="py-24 bg-white border-t border-border relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-secondary/30 to-transparent"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl grid lg:grid-cols-2 border border-border">
            <div className="relative p-10 lg:p-16 bg-primary text-primary-foreground flex flex-col justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                 <img src={bookingImg} alt="Booking background" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-wider mb-6 border border-white/20">
                  TƯ VẤN 1:1 CÙNG CHUYÊN GIA
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">ĐẶT LỊCH TƯ VẤN MIỄN PHÍ</h2>
                <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                  Thiên Hoàng Kim luôn sẵn sàng đồng hành cùng bạn trên hành trình nâng tầm nhan sắc.
                </p>
                <ul className="space-y-5">
                  {[
                    "Thăm khám và tư vấn 1:1 với bác sĩ chuyên môn cao",
                    "Phân tích tình trạng, đề xuất phác đồ phù hợp",
                    "Bảo mật thông tin tuyệt đối",
                    "Ưu đãi đặc biệt dành riêng cho khách đặt lịch online"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-primary-foreground/90 leading-relaxed text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-10 lg:p-16 bg-white">
              <h3 className="font-bold text-2xl mb-8 flex items-center gap-3">
                THÔNG TIN ĐẶT LỊCH 
                <div className="h-px bg-border flex-grow ml-4"></div>
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80 font-semibold">Họ và tên *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập họ tên" className="bg-secondary/10 border-border h-12 focus-visible:ring-primary/50" {...field} />
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
                          <FormLabel className="text-foreground/80 font-semibold">Số điện thoại *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập số điện thoại" className="bg-secondary/10 border-border h-12 focus-visible:ring-primary/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80 font-semibold">Dịch vụ quan tâm *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-secondary/10 border-border h-12 focus:ring-primary/50">
                                <SelectValue placeholder="Chọn dịch vụ" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nangmui">Nâng mũi cấu trúc</SelectItem>
                              <SelectItem value="catmi">Cắt mí tự nhiên</SelectItem>
                              <SelectItem value="filler">Tiêm Filler/Botox</SelectItem>
                              <SelectItem value="trehoa">Trẻ hóa da công nghệ cao</SelectItem>
                              <SelectItem value="spa">Chăm sóc da (Spa)</SelectItem>
                              <SelectItem value="khac">Khác</SelectItem>
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
                          <FormLabel className="text-foreground/80 font-semibold">Ngày hẹn mong muốn *</FormLabel>
                          <FormControl>
                            <Input type="date" className="bg-secondary/10 border-border h-12 focus-visible:ring-primary/50" {...field} />
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
                        <FormLabel className="text-foreground/80 font-semibold">Ghi chú thêm (nếu có)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tình trạng hiện tại hoặc mong muốn của bạn..." 
                            className="bg-secondary/10 border-border resize-none min-h-[100px] focus-visible:ring-primary/50" 
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
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl p-4 bg-secondary/20 border border-border">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 border-primary/50 data-[state=checked]:bg-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium text-foreground/80 cursor-pointer hover:text-primary transition-colors">
                            Tôi đồng ý với chính sách bảo mật thông tin của Thiên Hoàng Kim
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all">
                    ĐẶT LỊCH NGAY <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* QUY TRÌNH THĂM KHÁM (Process) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">QUY TRÌNH THĂM KHÁM</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Chuẩn Y Khoa – An Toàn – Cá Nhân Hóa – Hiệu Quả</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative mt-20">
            {/* Desktop connector line */}
            <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-0.5 bg-secondary z-0"></div>

            {[
              { title: "TIẾP NHẬN & TƯ VẤN", desc: "Đội ngũ tiếp nhận thông tin và tư vấn sơ bộ" },
              { title: "THĂM KHÁM & SOI DA", desc: "Bác sĩ trực tiếp thăm khám và phân tích tình trạng" },
              { title: "LÊN PHÁC ĐỒ CÁ NHÂN", desc: "Đề xuất liệu trình phù hợp với nhu cầu" },
              { title: "TIẾN HÀNH ĐIỀU TRỊ", desc: "Thực hiện theo đúng quy trình chuẩn Y khoa" },
              { title: "HƯỚNG DẪN CHĂM SÓC", desc: "Hướng dẫn chăm sóc tại nhà để duy trì kết quả" },
              { title: "TÁI KHÁM & THEO DÕI", desc: "Theo dõi tiến trình để đạt kết quả tối ưu nhất" },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-white border-4 border-background shadow-[0_0_0_2px_hsl(var(--primary)/0.2)] rounded-full flex items-center justify-center text-primary font-bold text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-lg group-hover:scale-110">
                  {i+1}
                </div>
                <h3 className="font-bold mb-3 text-sm lg:text-base leading-tight group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 text-center">
             <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-base font-bold shadow-xl">
               ĐẶT LỊCH THĂM KHÁM NGAY
             </Button>
          </div>
        </div>
      </section>

      {/* KHÁCH HÀNG NÓI GÌ (Testimonials) */}
      <section className="py-24 relative overflow-hidden bg-primary/5">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <img src={processImg} className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">KHÁCH HÀNG NÓI GÌ VỀ THIÊN HOÀNG KIM</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Hơn 10.000 khách hàng đã tin tưởng và lựa chọn</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Minh Anh", initials: "MA", txt: "Mình đã điều trị mụn tại Thiên Hoàng Kim được 3 tháng, da sáng mịn và đều màu hơn rất nhiều. Bác sĩ tư vấn tận tâm, liệu trình hiệu quả rõ rệt!" },
              { name: "Thanh Huyền", initials: "TH", txt: "Dịch vụ ở đây rất chuyên nghiệp, cơ sở vật chất hiện đại. Mỗi lần đến điều trị đều được chăm sóc chu đáo, cảm thấy rất yên tâm và thoải mái." },
              { name: "Kim Ngân", initials: "KN", txt: "Sau liệu trình trị mụn và sẹo rỗ, da mình cải thiện hơn 80%. Cảm ơn đội ngũ bác sĩ và chuyên viên tại Thiên Hoàng Kim rất nhiều!" },
              { name: "Hoài Phương", initials: "HP", txt: "Tôi rất hài lòng với kết quả căng bóng và trẻ hóa da. Da căng mượt, mịn màng hơn hẳn. Chắc chắn sẽ tiếp tục đồng hành cùng Thiên Hoàng Kim!" },
            ].map((t, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-xl transition-all"
               >
                 <div className="flex items-center gap-1 mb-6 text-yellow-400">
                    {"★★★★★"}
                 </div>
                 <p className="text-foreground/80 text-sm leading-relaxed mb-8 italic min-h-[100px]">"{t.txt}"</p>
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-secondary/50 text-primary flex items-center justify-center font-bold text-sm shadow-inner">
                     {t.initials}
                   </div>
                   <div>
                     <span className="font-bold text-sm block text-foreground">{t.name}</span>
                     <span className="text-xs text-muted-foreground">Khách hàng VIP</span>
                   </div>
                 </div>
               </motion.div>
            ))}
          </div>
          <div className="mt-16 flex justify-center items-center gap-4">
             <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
               <ChevronLeft className="w-5 h-5"/>
             </Button>
             <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 font-bold shadow-lg">
               XEM THÊM ĐÁNH GIÁ KHÁCH HÀNG <ArrowRight className="w-4 h-4 ml-2"/>
             </Button>
             <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
               <ChevronRight className="w-5 h-5"/>
             </Button>
          </div>
        </div>
      </section>

      {/* CẨM NANG LÀM ĐẸP (Blog) */}
      <section className="py-24 bg-white border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-8 bg-primary"></div>
                <span className="text-primary font-semibold tracking-wider text-sm uppercase">KIẾN THỨC THẨM MỸ</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">CẨM NANG LÀM ĐẸP</h2>
              <p className="text-muted-foreground text-lg">Cập nhật xu hướng và kiến thức thẩm mỹ mới nhất từ chuyên gia.</p>
            </div>
            <Button variant="ghost" className="text-primary hover:bg-primary/5 hover:text-primary rounded-full group font-semibold">
               XEM TẤT CẢ BÀI VIẾT <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: blog1, title: "Nâng mũi bao lâu thì đẹp tự nhiên?", date: "20/05/2024", desc: "Tìm hiểu thời gian hồi phục và các yếu tố giúp dáng mũi vào form chuẩn đẹp, tự nhiên nhất." },
              { img: blog2, title: "Cắt mí có để lại sẹo không?", date: "18/05/2024", desc: "Giải đáp chi tiết về kỹ thuật cắt mí hiện đại và cách lưu ý để giúp mí đẹp tự nhiên." },
              { img: blog3, title: "Tiêm filler giữ được bao lâu?", date: "15/05/2024", desc: "Filler duy trì được bao lâu còn phụ thuộc vào loại filler, vị trí tiêm và cách chăm sóc sau tiêm." },
            ].map((blog, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="group cursor-pointer flex flex-col h-full"
               >
                 <div className="overflow-hidden rounded-3xl mb-6 relative shadow-md">
                   <img src={blog.img} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title} />
                   <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-primary shadow-sm">
                     KIẾN THỨC
                   </div>
                 </div>
                 <div className="flex-grow flex flex-col">
                   <div className="text-xs text-muted-foreground font-semibold mb-3 flex items-center gap-2 tracking-wider">
                     <Calendar className="w-3.5 h-3.5 text-primary" /> {blog.date}
                   </div>
                   <h3 className="font-serif font-bold text-2xl mb-3 group-hover:text-primary transition-colors leading-tight">{blog.title}</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{blog.desc}</p>
                   <span className="text-sm font-bold text-primary flex items-center group-hover:underline w-max">
                     XEM CHI TIẾT <ArrowRight className="w-4 h-4 ml-1.5" />
                   </span>
                 </div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SẴN SÀNG NÂNG TẦM NHAN SẮC? (CTA Section) */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Soft elegant background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-md border border-border"
            >
               <Crown className="w-10 h-10 text-primary" />
            </motion.div>
            
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight"
            >
              SẴN SÀNG NÂNG TẦM NHAN SẮC?
            </motion.h2>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              Liên hệ ngay để được đội ngũ chuyên gia tư vấn miễn phí và đặt lịch nhanh chóng.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              <div className="bg-white p-6 rounded-3xl text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-border group cursor-pointer hover:-translate-y-1">
                <Facebook className="w-10 h-10 text-[#1877F2] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm mb-1 tracking-wider">FACEBOOK</h4>
                <p className="text-xs text-muted-foreground">Theo dõi ưu đãi mới nhất</p>
              </div>
              <div className="bg-white p-6 rounded-3xl text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-border group cursor-pointer hover:-translate-y-1">
                <MessageCircle className="w-10 h-10 text-[#00B2FF] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm mb-1 tracking-wider">MESSENGER</h4>
                <p className="text-xs text-muted-foreground">Nhắn tin tư vấn trực tiếp</p>
              </div>
              <div className="bg-white p-6 rounded-3xl text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-border group cursor-pointer hover:-translate-y-1">
                <SiZalo className="w-10 h-10 text-[#0068FF] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm mb-1 tracking-wider">ZALO</h4>
                <p className="text-xs text-muted-foreground">Tư vấn nhanh trong 1 phút</p>
              </div>
              <div className="bg-white p-6 rounded-3xl text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-border group cursor-pointer hover:-translate-y-1">
                <MapPin className="w-10 h-10 text-[#EA4335] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-sm mb-1 tracking-wider">GOOGLE MAPS</h4>
                <p className="text-xs text-muted-foreground">Xem địa chỉ và chỉ đường</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-8 text-lg font-bold shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(11,76,47,0.5)] transition-all hover:-translate-y-1 group">
                ĐẶT LỊCH TƯ VẤN NGAY <Navigation className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f2e1f] text-white/80 pt-24 pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="space-y-6">
              <div className="text-white font-serif font-bold text-2xl leading-none tracking-wide flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-white" />
                <div className="flex flex-col">
                  <span>THIÊN HOÀNG KIM</span>
                  <span className="text-[10px] tracking-[0.2em] font-sans text-white/60 uppercase mt-1">Aesthetic Clinic</span>
                </div>
              </div>
              <p className="font-serif italic text-2xl text-white/90">Nâng Tầm Nhan Sắc</p>
              <p className="text-sm leading-relaxed text-white/70">Phòng khám chuyên khoa thẩm mỹ uy tín, chất lượng với đội ngũ bác sĩ chuyên gia hàng đầu. Kiến tạo vẻ đẹp tự nhiên, an toàn và bền vững.</p>
              <div className="flex gap-4 pt-2">
                 <Shield className="w-5 h-5 text-white/40" />
                 <Stethoscope className="w-5 h-5 text-white/40" />
                 <Sparkles className="w-5 h-5 text-white/40" />
                 <Heart className="w-5 h-5 text-white/40" />
              </div>
            </div>

            <div className="lg:pl-8">
              <h4 className="text-white font-bold mb-8 tracking-widest text-sm uppercase">DỊCH VỤ NỔI BẬT</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Nâng mũi cấu trúc</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Cắt mí tự nhiên</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Tiêm filler - Botox</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Điều trị da chuyên sâu</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Trẻ hóa công nghệ cao</a></li>
              </ul>
            </div>

            <div className="lg:pl-8">
              <h4 className="text-white font-bold mb-8 tracking-widest text-sm uppercase">LIÊN KẾT NHANH</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Trang chủ</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Giới thiệu</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Khách hàng thực tế</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Bảng giá tham khảo</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">Tin tức & Cẩm nang</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 tracking-widest text-sm uppercase">THÔNG TIN LIÊN HỆ</h4>
              <ul className="space-y-5 text-sm text-white/70">
                <li className="flex gap-4">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-white/50" />
                  <span className="leading-relaxed">323-325 Hùng Vương, Phường An Đông, TP Hồ Chí Minh</span>
                </li>
                <li className="flex gap-4 items-center">
                  <Phone className="w-5 h-5 flex-shrink-0 text-white/50" />
                  <span className="font-semibold text-white/90">0938 673 996</span>
                </li>
                <li className="flex gap-4 items-center">
                  <MessageCircle className="w-5 h-5 flex-shrink-0 text-white/50" />
                  <span>contact@thienhoangkim.vn</span>
                </li>
                <li className="flex gap-4">
                  <Clock className="w-5 h-5 flex-shrink-0 text-white/50" />
                  <span>08:00 - 20:00 (Thứ 2 - Chủ Nhật)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/50">
            <p>© 2026 Thiên Hoàng Kim Aesthetic Clinic. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white hover:-translate-y-1 transition-all"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white hover:-translate-y-1 transition-all"><SiTiktok className="w-4 h-4 mt-0.5" /></a>
              <a href="#" className="hover:text-white hover:-translate-y-1 transition-all"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}