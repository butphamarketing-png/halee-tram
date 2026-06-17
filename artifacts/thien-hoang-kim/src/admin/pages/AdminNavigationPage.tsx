import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";
import type { SiteNavItem, SiteNavLink } from "@/types/site-content";

export function AdminNavigationPage() {
  const { content, updateContent } = useSiteContent();

  const updateItem = (index: number, patch: Partial<SiteNavItem>) => {
    updateContent((p) => {
      const navigation = [...p.navigation];
      navigation[index] = { ...navigation[index], ...patch };
      return { ...p, navigation };
    });
  };

  const updateChild = (itemIndex: number, childIndex: number, patch: Partial<SiteNavLink>) => {
    updateContent((p) => {
      const navigation = [...p.navigation];
      const item = { ...navigation[itemIndex] };
      const children = [...(item.children ?? [])];
      children[childIndex] = { ...children[childIndex], ...patch };
      item.children = children;
      navigation[itemIndex] = item;
      return { ...p, navigation };
    });
  };

  const addChild = (itemIndex: number) => {
    updateContent((p) => {
      const navigation = [...p.navigation];
      const item = { ...navigation[itemIndex] };
      item.children = [...(item.children ?? []), { label: "Mục mới", href: "/" }];
      navigation[itemIndex] = item;
      return { ...p, navigation };
    });
  };

  return (
    <div className="space-y-8">
      <AdminSaveBar />
      <h2 className="font-serif text-2xl font-semibold text-primary">Menu điều hướng</h2>
      <p className="text-sm text-muted-foreground">
        Chỉnh nhãn và link menu header. Mục <strong>Dịch vụ</strong> tự lấy danh sách từ trang Dịch vụ & khóa học.
      </p>

      {content.navigation.map((item, i) => (
        <section key={`${item.href}-${i}`} className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <AdminField label="Nhãn menu" value={item.label} onChange={(v) => updateItem(i, { label: v })} />
            <AdminField label="Đường dẫn" value={item.href} onChange={(v) => updateItem(i, { href: v })} />
          </div>

          {item.children && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Menu con</h4>
                <Button type="button" size="sm" variant="outline" onClick={() => addChild(i)}>
                  + Thêm mục con
                </Button>
              </div>
              {item.children.map((child, ci) => (
                <div key={`${child.href}-${ci}`} className="grid gap-2 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto]">
                  <AdminField label="Nhãn" value={child.label} onChange={(v) => updateChild(i, ci, { label: v })} />
                  <AdminField label="Link" value={child.href} onChange={(v) => updateChild(i, ci, { href: v })} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="self-end"
                    onClick={() =>
                      updateContent((p) => {
                        const navigation = [...p.navigation];
                        const navItem = { ...navigation[i] };
                        navItem.children = navItem.children?.filter((_, idx) => idx !== ci);
                        navigation[i] = navItem;
                        return { ...p, navigation };
                      })
                    }
                  >
                    Xóa
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
