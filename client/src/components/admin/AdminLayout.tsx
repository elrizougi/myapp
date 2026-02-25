import { Link, useLocation } from "wouter";
import { useData } from "@/lib/data-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Code2, Mail, LogOut, Menu, Settings, Info } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const { logout } = useData();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    { href: "/admin/dashboard", label: "نظرة عامة", icon: LayoutDashboard },
    { href: "/admin/projects", label: "إدارة الخدمات", icon: Code2 },
    { href: "/admin/blog", label: "إدارة المدونة", icon: FileText },
    { href: "/admin/messages", label: "الرسائل", icon: Mail },
    { href: "/admin/about", label: "صفحة من نحن", icon: Info },
    { href: "/admin/settings", label: "الإعدادات", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    setLocation("/admin");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="font-heading text-xl font-bold text-primary">لوحة التحكم</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-md transition-colors cursor-pointer",
              location === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setIsOpen(false)}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20 flex" dir="rtl">
      <aside className="hidden md:block w-64 bg-background border-l fixed inset-y-0 right-0 z-30">
        <SidebarContent />
      </aside>

      <main className="flex-1 md:mr-64 min-h-screen flex flex-col">
        <header className="h-16 border-b bg-background flex items-center justify-between px-4 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-64">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold font-heading">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
              العودة للموقع
            </Button>
          </div>
        </header>
        <div className="p-4 md:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
