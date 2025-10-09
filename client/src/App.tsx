import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ActiveWorkoutProvider } from "@/contexts/ActiveWorkoutContext";
import { useAuth } from "@/lib/auth";
import Dashboard from "@/pages/dashboard";
import PublicSchedule from "@/pages/public-schedule";
import LoginPage from "@/pages/login";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component }: { component: () => JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={PublicSchedule} />
      <Route path="/dashboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/cabinet">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ActiveWorkoutProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ActiveWorkoutProvider>
    </QueryClientProvider>
  );
}

export default App;
