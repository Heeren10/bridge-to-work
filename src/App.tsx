
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState, lazy, Suspense } from "react";
import { Loader } from "lucide-react";

// Use lazy loading to split code by route
const Index = lazy(() => import("./pages/Index"));
const SelectType = lazy(() => import("./pages/SelectType"));
const NormalPerson = lazy(() => import("./pages/NormalPerson"));
const Recruiter = lazy(() => import("./pages/Recruiter"));
const ServiceManager = lazy(() => import("./pages/ServiceManager"));
const DirectDonate = lazy(() => import("./pages/DirectDonate"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a context to track whether the prompt has been shown
export const AppContext = createContext<{
  promptShown: boolean;
  setPromptShown: (shown: boolean) => void;
}>({
  promptShown: false,
  setPromptShown: () => {},
});

// Create a persistent queryClient to avoid recreation on re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Improves performance by not refetching on focus
      staleTime: 5 * 60 * 1000, // 5 minutes - reduces unnecessary network requests
    },
  },
});

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center space-y-4">
      <Loader className="animate-spin h-10 w-10 text-primary" />
      <span className="text-muted-foreground">Loading...</span>
    </div>
  </div>
);

const App = () => {
  // Initialize promptShown to false so the welcome prompt appears when clicking Get Started
  const [promptShown, setPromptShown] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ promptShown, setPromptShown }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/select-type" element={<SelectType />} />
                <Route path="/normal-person" element={<NormalPerson />} />
                <Route path="/recruiter" element={<Recruiter />} />
                <Route path="/service-manager" element={<ServiceManager />} />
                <Route path="/direct-donate" element={<DirectDonate />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
