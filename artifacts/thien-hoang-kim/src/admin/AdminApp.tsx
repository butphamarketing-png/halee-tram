import { Redirect, Route, Switch } from "wouter";
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

function AdminGuard({ children }: { children: React.ReactNode }) {
  if (!isAdminLoggedIn()) {
    return <Redirect to="/admin/login" />;
  }
  return <AdminLayout>{children}</AdminLayout>;
}

export function AdminApp() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin">
        <AdminGuard>
          <AdminDashboardPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/settings">
        <AdminGuard>
          <AdminSettingsPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/home">
        <AdminGuard>
          <AdminHomePage />
        </AdminGuard>
      </Route>
      <Route path="/admin/articles">
        <AdminGuard>
          <AdminArticlesPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/doctors">
        <AdminGuard>
          <AdminDoctorsPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/testimonials">
        <AdminGuard>
          <AdminTestimonialsPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/customers">
        <AdminGuard>
          <AdminCustomersPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/process">
        <AdminGuard>
          <AdminProcessPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/bookings">
        <AdminGuard>
          <AdminBookingsPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/media">
        <AdminGuard>
          <AdminMediaPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/seo">
        <AdminGuard>
          <AdminSeoPage />
        </AdminGuard>
      </Route>
      <Route path="/admin/account">
        <AdminGuard>
          <AdminAccountPage />
        </AdminGuard>
      </Route>
      <Route>
        <Redirect to="/admin" />
      </Route>
    </Switch>
  );
}
