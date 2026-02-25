import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";

interface BlogPostProps {
  id: number;
  title: string;
  excerpt: string;
  image?: string | null;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogCard({ id, title, excerpt, image, date, readTime, category }: BlogPostProps) {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="glass-card rounded-xl overflow-hidden group" data-testid={`card-blog-${id}`}>
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-indigo-300 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            {category}
          </span>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {readTime}
            </span>
          </div>
        </div>
        <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-3 mb-4">
          {excerpt}
        </p>
        <Link href={`/blog/${id}`} className="text-indigo-400 text-sm font-medium flex items-center gap-2 hover:underline group-hover:gap-3 transition-all" data-testid={`link-read-more-${id}`}>
          {t('common.readMore')} <ArrowIcon className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
