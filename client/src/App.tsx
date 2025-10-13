import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ActiveWorkoutProvider } from "@/contexts/ActiveWorkoutContext";
import { useAuth } from "@/lib/auth";
import { RoleGuard } from "@/lib/role-guard";
import Dashboard from "@/pages/dashboard";
import PublicSchedule from "@/pages/public-schedule";
import LoginPage from "@/pages/login";
import AdminLoginPage from "@/pages/admin-login";
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

function PupilRoute({ component: Component }: { component: () => JSX.Element }) {
  return (
    <RoleGuard allowedRoles={['pupil']} fallbackPath="/admin/login">
      <Component />
    </RoleGuard>
  );
}

function TrainerRoute({ component: Component }: { component: () => JSX.Element }) {
  return (
    <RoleGuard allowedRoles={['trainer']} fallbackPath="/login">
      <Component />
    </RoleGuard>
  );
}

function Router() {
  return (
    <Switch>
      {/* Публичные маршруты */}
      <Route path="/" component={PublicSchedule} />
      
      {/* Вход для учеников */}
      <Route path="/login" component={LoginPage} />
      
      {/* Скрытый вход для тренеров/админов */}
      <Route path="/admin/login" component={AdminLoginPage} />
      
      {/* Маршруты для учеников */}
      <Route path="/dashboard">
        {() => <PupilRoute component={Dashboard} />}
      </Route>
      
      {/* Маршруты для тренеров/админов */}
      <Route path="/admin/dashboard">
        {() => <TrainerRoute component={Dashboard} />}
      </Route>
      <Route path="/cabinet">
        {() => <TrainerRoute component={Dashboard} />}
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
