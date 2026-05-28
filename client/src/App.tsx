import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DssLandingPage } from "@/pages/DssLandingPage";
import GuidePage from "@/pages/GuidePage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <WouterRouter base="/DSS-Website-Portfolio">
      <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#efefef" }}>
        <Navbar />
        <div className="flex-1">
          <Switch>
            <Route path="/" component={DssLandingPage} />
            <Route path="/guide" component={GuidePage} />
            <Route path="/contact" component={ContactPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
