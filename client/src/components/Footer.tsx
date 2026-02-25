import { Github, Twitter, Linkedin, Mail, Instagram, Facebook, Youtube, MessageCircle, Send, Globe, Camera } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useData } from "@/lib/data-context";

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  whatsapp: MessageCircle,
  telegram: Send,
  website: Globe,
  tiktok: Camera,
  snapchat: Camera,
};

export default function Footer() {
  const { t } = useLanguage();
  const { socialLinks } = useData();

  const visibleLinks = socialLinks.filter(link => link.visible);

  const getHref = (platform: string, url: string) => {
    if (platform === 'email' && !url.startsWith('mailto:')) return `mailto:${url}`;
    if (platform === 'whatsapp' && !url.startsWith('http')) return `https://wa.me/${url.replace(/\D/g, '')}`;
    return url;
  };

  return (
    <footer className="border-t border-slate-700/30 py-12">
      <div className="container px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <img src="/logo.png" alt="مجرد تكنيك" className="h-8 brightness-0 invert" />
            <p className="text-sm text-slate-500 text-center md:text-right">
              © {new Date().getFullYear()} {t('footer.rights')}
            </p>
          </div>
          
          {visibleLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {visibleLinks.map((link) => {
                const Icon = platformIcons[link.platform] || Globe;
                return (
                  <a
                    key={link.id}
                    href={getHref(link.platform, link.url)}
                    target={link.platform === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-800/60 border border-slate-700/30 hover:border-indigo-500/40 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-all"
                    data-testid={`link-social-${link.platform}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
