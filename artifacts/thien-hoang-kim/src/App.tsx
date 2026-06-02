import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { BookingDialogProvider } from "@/context/BookingDialogContext";
import { AdminApp } from "@/admin/AdminApp";
import { isAdminLocation } from "@/config/admin";
import { getPageContent } from "@/data/pages.defaults";
import { resolveLegacyServicePath } from "@/data/services-catalog";
import ArticlePage from "@/pages/ArticlePage";
import ArticlesListPage from "@/pages/ArticlesListPage";
import ContactPage from "@/pages/ContactPage";
import ContentPage from "@/pages/ContentPage";
import CustomersPage from "@/pages/CustomersPage";
import DoctorsPage from "@/pages/DoctorsPage";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";
import ServicesPage from "@/pages/ServicesPage";
import ServiceCategoryPage from "@/pages/ServiceCategoryPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RouteSeo } from "@/components/RouteSeo";
import { LuckyWheelController } from "@/components/LuckyWheelController";

const queryClient = new QueryClient();

function DynamicContentPage() {
  const [location] = useLocation();
  const path = location.split("#")[0];
  if (!getPageContent(path)) return <NotFound />;
  return <ContentPage />;
}

function LegacyServiceRedirect() {
  const [location] = useLocation();
  const path = location.split("#")[0];
  const target = resolveLegacyServicePath(path);
  if (target) return <Redirect to={target} />;
  return <DynamicContentPage />;
}

function ThamMyCategoryPage() {
  return <ServiceCategoryPage categoryId="tham-my" />;
}

function SpaCategoryPage() {
  return <ServiceCategoryPage categoryId="spa" />;
}

function ThamMyDetailPage() {
  return <ServiceDetailPage categoryId="tham-my" />;
}

function SpaDetailPage() {
  return <ServiceDetailPage categoryId="spa" />;
}

function PublicRouter() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/lien-he" component={ContactPage} />
      <Route path="/khach-hang" component={CustomersPage} />
      <Route path="/dich-vu" component={ServicesPage} />
      <Route path="/tham-my" component={ThamMyCategoryPage} />
      <Route path="/tham-my/:slug" component={ThamMyDetailPage} />
      <Route path="/spa" component={SpaCategoryPage} />
      <Route path="/spa/:slug" component={SpaDetailPage} />
      <Route path="/gioi-thieu/doi-ngu-bac-si" component={DoctorsPage} />
      <Route path="/tin-tuc/kien-thuc" component={ArticlesListPage} />
      <Route path="/tin-tuc/tin-tuc" component={ArticlesListPage} />
      <Route path="/tin-tuc/:slug" component={ArticlePage} />
      <Route path="/tin-tuc" component={ArticlesListPage} />
      <Route path="/gioi-thieu/:rest*" component={DynamicContentPage} />
      <Route path="/gioi-thieu" component={DynamicContentPage} />
      <Route path="/dich-vu/:slug" component={LegacyServiceRedirect} />
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
              <ScrollToTop />
              <RouteSeo />
              <AppRouter />
            </WouterRouter>
            <LuckyWheelController />
            <Toaster />
          </BookingDialogProvider>
        </SiteContentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
