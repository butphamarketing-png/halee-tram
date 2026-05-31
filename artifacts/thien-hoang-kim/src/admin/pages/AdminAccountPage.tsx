import { useState } from "react";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeAdminPassword } from "@/lib/admin-auth";
import { toast } from "@/hooks/use-toast";

export function AdminAccountPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div>
      <AdminSaveBar />
      <h2 className="mb-6 font-serif text-2xl font-semibold text-primary">Tài khoản admin</h2>
      <form
        className="max-w-md space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          if (next !== confirm) {
            toast({ title: "Mật khẩu xác nhận không khớp", variant: "destructive" });
            return;
          }
          if (changeAdminPassword(current, next)) {
            toast({ title: "Đã đổi mật khẩu" });
            setCurrent("");
            setNext("");
            setConfirm("");
            return;
          }
          toast({ title: "Mật khẩu hiện tại sai hoặc mật khẩu mới quá ngắn (tối thiểu 6 ký tự)", variant: "destructive" });
        }}
      >
        <div className="space-y-2">
          <Label>Mật khẩu hiện tại</Label>
          <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Mật khẩu mới (tối thiểu 6 ký tự)</Label>
          <Input type="password" value={next} onChange={(e) => setNext(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Xác nhận mật khẩu mới</Label>
          <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </div>
        <Button type="submit">Đổi mật khẩu</Button>
      </form>
    </div>
  );
}
