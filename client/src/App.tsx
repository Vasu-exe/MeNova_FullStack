import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import WaitlistPage from "./pages/WaitlistPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CookiePolicy from "./pages/CookiePolicy";
import Accessibility from "./pages/Accessibility";
import ScheduleFollowup from "./pages/ScheduleFollowup";
import AdminDashboard from "./pages/AdminDashboard";
import PortalAuth from "./pages/PortalAuth";
import PatientPortal from "./pages/PatientPortal";
import NPPortal from "./pages/NPPortal";
import UTMTracker from "./components/UTMTracker";
import { useAuth } from "@/_core/hooks/useAuth";


// Protected route wrapper - completely inaccessible (404) unless explicitly enabled
function ProtectedRoute({ path, component: Component }: { path: string; component: any }) {
  // These routes are completely disabled and will show 404
  return <Route path={path} component={NotFound} />;
}

function Router() {
  return (
    <Switch>
      {/* FULL SITE: Home is active. Waitlist form embedded in hero. */}
      <Route path={"/"} component={Home} />
      <Route path={"/waitlist"} component={WaitlistPage} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/terms-and-conditions"} component={TermsAndConditions} />
      <Route path={"/cookie-policy"} component={CookiePolicy} />
      <Route path={"/accessibility"} component={Accessibility} />
      <Route path={"/schedule-followup"} component={ScheduleFollowup} />
      {/* Protected routes - only accessible if authenticated */}
      <ProtectedRoute path={"/admin"} component={AdminDashboard} />
      <ProtectedRoute path={"/portal"} component={PortalAuth} />
      <ProtectedRoute path={"/patient-portal"} component={PatientPortal} />
      <ProtectedRoute path={"/np-portal"} component={NPPortal} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <UTMTracker />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
