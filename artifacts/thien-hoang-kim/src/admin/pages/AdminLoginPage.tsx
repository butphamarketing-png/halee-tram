import { useState } from "react";
import { Redirect, useLocation } from "wouter";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAdmin } from "@/lib/admin-auth";
import { toast } from "@/hooks/use-toast";

export function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");

  if (isAdminLoggedIn()) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a3328] px-4">
      <form
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          if (loginAdmin(password)) {
            setLocation("/admin");
            return;
          }
          toast({ title: "Sai mật khẩu", variant: "destructive" });
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Thiên Hoàng Kim</p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-primary">Đăng nhập quản trị</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Mật khẩu mặc định: <code className="rounded bg-muted px-1">admin123</code> (đổi bằng biến{" "}
          <code className="rounded bg-muted px-1">VITE_ADMIN_PASSWORD</code>)
        </p>
        <div className="mt-6 space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
            autoFocus
          />
        </div>
        <Button type="submit" className="mt-6 h-11 w-full">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}
