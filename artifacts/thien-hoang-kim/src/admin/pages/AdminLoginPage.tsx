import { useState } from "react";
import { Redirect, useLocation } from "wouter";
import { adminPath } from "@/config/admin";
import { isAdminLoggedIn, loginAdmin } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (isAdminLoggedIn()) {
    return <Redirect to={adminPath()} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a3328] px-4">
      <form
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          if (loginAdmin(username, password)) {
            setLocation(adminPath());
            return;
          }
          toast({ title: "Sai tài khoản hoặc mật khẩu", variant: "destructive" });
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Thiên Hoàng Kim</p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-primary">Đăng nhập quản trị</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Đường dẫn: <code className="rounded bg-muted px-1">{adminPath()}</code>
        </p>
        <div className="mt-6 space-y-2">
          <Label htmlFor="username">Tài khoản</Label>
          <Input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-11"
            autoFocus
          />
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
          />
        </div>
        <Button type="submit" className="mt-6 h-11 w-full">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}
