
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SelectType from "./pages/SelectType";
import NormalPerson from "./pages/NormalPerson";
import Recruiter from "./pages/Recruiter";
import ServiceManager from "./pages/ServiceManager";
import DirectDonate from "./pages/DirectDonate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/select-type" element={<SelectType />} />
          <Route path="/normal-person" element={<NormalPerson />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/service-manager" element={<ServiceManager />} />
          <Route path="/direct-donate" element={<DirectDonate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
