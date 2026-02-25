import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import { DataProvider, useData } from "@/lib/data-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import ProjectDetail from "@/pages/ProjectDetail";
import Resume from "@/pages/Resume";
import Contact from "@/pages/Contact";

// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import Dashboard from "@/pages/admin/Dashboard";
import ManageProjects from "@/pages/admin/ManageProjects";
import ManageBlog from "@/pages/admin/ManageBlog";
import AdminMessages from "@/pages/admin/AdminMessages";
import ManageAbout from "@/pages/admin/ManageAbout";
import AdminSettings from "@/pages/admin/Settings";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated } = useData();
  return isAuthenticated ? <Component {...rest} /> : <Redirect to="/admin" />;
}

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/resume" component={Resume} />
      <Route path="/contact" component={Contact} />

      {/* Admin Routes */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/admin/projects">
        <ProtectedRoute component={ManageProjects} />
      </Route>
      <Route path="/admin/blog">
        <ProtectedRoute component={ManageBlog} />
      </Route>
      <Route path="/admin/messages">
        <ProtectedRoute component={AdminMessages} />
      </Route>
      <Route path="/admin/about">
        <ProtectedRoute component={ManageAbout} />
      </Route>
      <Route path="/admin/settings">
        <ProtectedRoute component={AdminSettings} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </DataProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
