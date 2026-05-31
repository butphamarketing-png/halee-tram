import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { AdminApp } from "@/admin/AdminApp";
import { isAdminLocation } from "@/config/admin";
import ArticlePage from "@/pages/ArticlePage";
import ArticlesListPage from "@/pages/ArticlesListPage";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";

const queryClient = new QueryClient();

function PublicRouter() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/tin-tuc" component={ArticlesListPage} />
      <Route path="/tin-tuc/:slug" component={ArticlePage} />
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
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppRouter />
          </WouterRouter>
          <Toaster />
        </SiteContentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
