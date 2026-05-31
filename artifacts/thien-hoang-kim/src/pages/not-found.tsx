import { Link } from "wouter";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">404</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-primary md:text-4xl">Không tìm thấy trang</h1>
        <p className="mt-3 max-w-md text-muted-foreground">Trang bạn truy cập không tồn tại hoặc đã được di chuyển.</p>
        <Link href="/">
          <Button className="mt-8 rounded-full bg-primary font-bold">Về trang chủ</Button>
        </Link>
      </div>
    </SiteLayout>
  );
}
