import { createRoot } from "react-dom/client";
import { Router as WouterRouter } from "wouter";
import App from "./App";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { BookingDialogProvider } from "@/context/BookingDialogContext";
import "./index.css";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(document.getElementById("root")!).render(
  <WouterRouter base={base}>
    <SiteContentProvider>
      <BookingDialogProvider>
        <App />
      </BookingDialogProvider>
    </SiteContentProvider>
  </WouterRouter>,
);
