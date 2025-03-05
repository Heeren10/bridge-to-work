
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Index from "./pages/Index";
import SelectType from "./pages/SelectType";
import NormalPerson from "./pages/NormalPerson";
import Recruiter from "./pages/Recruiter";
import ServiceManager from "./pages/ServiceManager";
import DirectDonate from "./pages/DirectDonate";
import NotFound from "./pages/NotFound";

// Create a context to track whether the prompt has been shown
export const AppContext = createContext<{
  promptShown: boolean;
  setPromptShown: (shown: boolean) => void;
}>({
  promptShown: false,
  setPromptShown: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  // We're resetting promptShown to false by default so it shows again when clicking Get Started
  const [promptShown, setPromptShown] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ promptShown, setPromptShown }}>
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
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
