import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, Code2, FileText, User, Home, Mail, Languages } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/lib/i18n";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const links = [
    { href: "/", label: t('nav.home'), icon: Home },
    { href: "/projects", label: t('nav.services'), icon: Code2 },
    { href: "/blog", label: t('nav.blog'), icon: FileText },
    { href: "/resume", label: t('nav.about'), icon: User },
    { href: "/contact", label: t('nav.contact'), icon: Mail },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700/30 bg-[#0a0a1a]/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="مجرد تكنيك" className="h-8 brightness-0 invert" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn(
              "text-sm font-medium transition-colors hover:text-indigo-400 flex items-center gap-2 cursor-pointer",
              location === link.href
                ? "text-indigo-400"
                : "text-slate-400"
            )}>
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800/50"
          >
            <Languages className="h-4 w-4" />
            <span>{language === 'ar' ? 'English' : 'عربي'}</span>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-400"
          >
            <Languages className="h-4 w-4" />
            <span>{language === 'ar' ? 'En' : 'عربي'}</span>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={language === 'ar' ? "right" : "left"} className="w-[300px] sm:w-[400px] bg-[#0d0d2b] border-slate-700/30">
              <div className="flex flex-col gap-4 mt-8">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className={cn(
                    "text-lg font-medium transition-colors hover:text-indigo-400 flex items-center gap-3 py-2 cursor-pointer",
                    location === link.href
                      ? "text-indigo-400"
                      : "text-slate-400"
                  )} onClick={() => setIsOpen(false)}>
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
