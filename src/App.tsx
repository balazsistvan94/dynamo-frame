import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Category from "./pages/Category.tsx";
import Product from "./pages/Product.tsx";
import Partner from "./pages/Partner.tsx";
import Contact from "./pages/Contact.tsx";
import Payment from "./pages/Payment.tsx";
import Returns from "./pages/Returns.tsx";
import About from "./pages/About.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categorie/:slug" element={<Category />} />
          <Route path="/produs/:id" element={<Product />} />
          <Route path="/devino-partener" element={<Partner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/metode-de-plata" element={<Payment />} />
          <Route path="/retur-produse" element={<Returns />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
