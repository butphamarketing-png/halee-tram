import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { BookingDialogProvider } from "@/context/BookingDialogContext";
import { AdminApp } from "@/admin/AdminApp";
import { isAdminLocation } from "@/config/admin";
import { getPageContent } from "@/data/pages.defaults";
import ArticlePage from "@/pages/ArticlePage";
import ArticlesListPage from "@/pages/ArticlesListPage";
import ContactPage from "@/pages/ContactPage";
import ContentPage from "@/pages/ContentPage";
import CustomersPage from "@/pages/CustomersPage";
import DoctorsPage from "@/pages/DoctorsPage";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";
import ServicesPage from "@/pages/ServicesPage";

const queryClient = new QueryClient();

function DynamicContentPage() {
  const [location] = useLocation();
  const path = location.split("#")[0];
  if (!getPageContent(path)) return <NotFound />;
  return <ContentPage />;
}

function PublicRouter() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/lien-he" component={ContactPage} />
      <Route path="/khach-hang" component={CustomersPage} />
      <Route path="/dich-vu" component={ServicesPage} />
      <Route path="/gioi-thieu/doi-ngu-bac-si" component={DoctorsPage} />
      <Route path="/tin-tuc/kien-thuc" component={ArticlesListPage} />
      <Route path="/tin-tuc/tin-tuc" component={ArticlesListPage} />
      <Route path="/tin-tuc/:slug" component={ArticlePage} />
      <Route path="/tin-tuc" component={ArticlesListPage} />
      <Route path="/gioi-thieu/:rest*" component={DynamicContentPage} />
      <Route path="/gioi-thieu" component={DynamicContentPage} />
      <Route path="/dich-vu/:slug" component={DynamicContentPage} />
      <Route path="/bang-gia" component={DynamicContentPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppRouter() {
  const [location] = useLocation();
  if (isAdminLocation(location)) {
    return <AdminApp />;
  }
  return <PublicRouter />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SiteContentProvider>
          <BookingDialogProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <AppRouter />
            </WouterRouter>
            <Toaster />
          </BookingDialogProvider>
        </SiteContentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
