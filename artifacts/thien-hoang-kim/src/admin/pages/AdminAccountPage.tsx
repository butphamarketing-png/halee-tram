import { useState } from "react";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeAdminCredentials } from "@/lib/admin-auth";
import { toast } from "@/hooks/use-toast";

export function AdminAccountPage() {
  const [currentUser, setCurrentUser] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [nextUser, setNextUser] = useState("");
  const [nextPass, setNextPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <div>
      <AdminSaveBar />
      <h2 className="mb-6 font-serif text-2xl font-semibold text-primary">Tài khoản admin</h2>
      <form
        className="max-w-md space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          if (nextPass !== confirmPass) {
            toast({ title: "Mật khẩu xác nhận không khớp", variant: "destructive" });
            return;
          }
          if (changeAdminCredentials(currentUser, currentPass, nextUser, nextPass)) {
            toast({ title: "Đã cập nhật tài khoản" });
            setCurrentUser("");
            setCurrentPass("");
            setNextUser("");
            setNextPass("");
            setConfirmPass("");
            return;
          }
          toast({
            title: "Không đổi được",
            description: "Kiểm tra tài khoản/mật khẩu hiện tại. Tài khoản mới ≥2 ký tự, mật khẩu mới ≥6 ký tự.",
            variant: "destructive",
          });
        }}
      >
        <div className="space-y-2">
          <Label>Tài khoản hiện tại</Label>
          <Input value={currentUser} onChange={(e) => setCurrentUser(e.target.value)} autoComplete="username" />
        </div>
        <div className="space-y-2">
          <Label>Mật khẩu hiện tại</Label>
          <Input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Tài khoản mới</Label>
          <Input value={nextUser} onChange={(e) => setNextUser(e.target.value)} autoComplete="username" />
        </div>
        <div className="space-y-2">
          <Label>Mật khẩu mới (tối thiểu 6 ký tự)</Label>
          <Input type="password" value={nextPass} onChange={(e) => setNextPass(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Xác nhận mật khẩu mới</Label>
          <Input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
        </div>
        <Button type="submit">Lưu tài khoản</Button>
      </form>
    </div>
  );
}
