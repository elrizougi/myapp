import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Download, Video, UserCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";

interface ProjectProps {
  id?: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  filesUrl?: string | null;
  videoUrl?: string | null;
  authorUrl?: string | null;
}

export default function ProjectCard({ id, title, description, image, tags, demoUrl, repoUrl, filesUrl, videoUrl, authorUrl }: ProjectProps) {
  const { t, isRTL } = useLanguage();

  const hasExtraLinks = filesUrl || videoUrl || authorUrl;

  return (
    <div className="glass-card rounded-xl overflow-hidden group">
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#0a0a1a]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {demoUrl && (
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white" asChild>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> {t('common.view')}
              </a>
            </Button>
          )}
          {repoUrl && (
            <Button size="sm" className="bg-slate-700 hover:bg-slate-600 text-white" asChild>
              <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> {t('common.code')}
              </a>
            </Button>
          )}
        </div>
      </div>
      <Link href={id ? `/projects/${id}` : "#"} className="block">
        <div className="p-5 pb-2">
          <h3 className="font-heading text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{title}</h3>
        </div>
        <div className="px-5 pb-4">
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </Link>
      <div className="px-5 pb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {tag}
          </span>
        ))}
      </div>
      {hasExtraLinks && (
        <div className="px-5 pb-5 flex flex-wrap gap-2">
          {filesUrl && (
            <Button size="sm" variant="outline" className="gap-1.5 text-xs border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200" asChild>
              <a href={filesUrl} target="_blank" rel="noopener noreferrer" data-testid="link-project-files">
                <Download className="h-3.5 w-3.5" />
                {isRTL ? "تحميل الملفات" : "Download Files"}
              </a>
            </Button>
          )}
          {videoUrl && (
            <Button size="sm" variant="outline" className="gap-1.5 text-xs border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200" asChild>
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" data-testid="link-project-video">
                <Video className="h-3.5 w-3.5" />
                {isRTL ? "الفيديو التعليمي" : "Tutorial Video"}
              </a>
            </Button>
          )}
          {authorUrl && (
            <Button size="sm" variant="outline" className="gap-1.5 text-xs border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200" asChild>
              <a href={authorUrl} target="_blank" rel="noopener noreferrer" data-testid="link-project-author">
                <UserCircle className="h-3.5 w-3.5" />
                {isRTL ? "عن الكاتب" : "About Author"}
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
