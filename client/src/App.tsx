import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ActiveWorkoutProvider } from "@/contexts/ActiveWorkoutContext";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/cabinet" component={Dashboard} />
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
