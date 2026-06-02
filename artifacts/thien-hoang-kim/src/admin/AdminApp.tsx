import { Redirect, Route, Switch } from "wouter";
import { adminPath } from "@/config/admin";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import { AdminLayout } from "@/admin/AdminLayout";
import { AdminLoginPage } from "@/admin/pages/AdminLoginPage";
import { AdminDashboardPage } from "@/admin/pages/AdminDashboardPage";
import { AdminSettingsPage } from "@/admin/pages/AdminSettingsPage";
import { AdminHomePage } from "@/admin/pages/AdminHomePage";
import { AdminArticlesPage } from "@/admin/pages/AdminArticlesPage";
import { AdminDoctorsPage } from "@/admin/pages/AdminDoctorsPage";
import { AdminTestimonialsPage } from "@/admin/pages/AdminTestimonialsPage";
import { AdminCustomersPage } from "@/admin/pages/AdminCustomersPage";
import { AdminProcessPage } from "@/admin/pages/AdminProcessPage";
import { AdminBookingsPage } from "@/admin/pages/AdminBookingsPage";
import { AdminMediaPage } from "@/admin/pages/AdminMediaPage";
import { AdminSeoPage } from "@/admin/pages/AdminSeoPage";
import { AdminAccountPage } from "@/admin/pages/AdminAccountPage";
import { AdminFooterPage } from "@/admin/pages/AdminFooterPage";
import { AdminLuckyWheelPage } from "@/admin/pages/AdminLuckyWheelPage";

function AdminGuard({ children }: { children: React.ReactNode }) {
  if (!isAdminLoggedIn()) {
    return <Redirect to={adminPath("login")} />;
  }
  return <AdminLayout>{children}</AdminLayout>;
}

export function AdminApp() {
  return (
    <Switch>
      <Route path={adminPath("login")} component={AdminLoginPage} />
      <Route path={adminPath()}>
        <AdminGuard>
          <AdminDashboardPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("settings")}>
        <AdminGuard>
          <AdminSettingsPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("home")}>
        <AdminGuard>
          <AdminHomePage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("articles")}>
        <AdminGuard>
          <AdminArticlesPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("doctors")}>
        <AdminGuard>
          <AdminDoctorsPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("testimonials")}>
        <AdminGuard>
          <AdminTestimonialsPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("customers")}>
        <AdminGuard>
          <AdminCustomersPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("process")}>
        <AdminGuard>
          <AdminProcessPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("bookings")}>
        <AdminGuard>
          <AdminBookingsPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("media")}>
        <AdminGuard>
          <AdminMediaPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("footer")}>
        <AdminGuard>
          <AdminFooterPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("seo")}>
        <AdminGuard>
          <AdminSeoPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("account")}>
        <AdminGuard>
          <AdminAccountPage />
        </AdminGuard>
      </Route>
      <Route path={adminPath("lucky-wheel")}>
        <AdminGuard>
          <AdminLuckyWheelPage />
        </AdminGuard>
      </Route>
      <Route>
        <Redirect to={adminPath()} />
      </Route>
    </Switch>
  );
}
