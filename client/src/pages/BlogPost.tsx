import { useRoute } from "wouter";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { useData } from "@/lib/data-context";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";

export default function BlogPost() {
  const { t, language, isRTL } = useLanguage();
  const { blogPosts, isLoadingBlogPosts } = useData();
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id ? Number(params.id) : null;

  const post = blogPosts.find((p) => p.id === postId);
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (isLoadingBlogPosts) {
    return (
      <div className="min-h-screen font-sans">
        <Navbar />
        <main className="py-20">
          <div className="container px-4 md:px-8 text-center">
            <p className="text-slate-400 text-lg">{t('common.loading') || "جاري التحميل..."}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen font-sans">
        <Navbar />
        <main className="py-20">
          <div className="container px-4 md:px-8 text-center">
            <h1 className="text-3xl font-heading font-bold text-white mb-4">
              {language === "ar" ? "المقال غير موجود" : "Post Not Found"}
            </h1>
            <p className="text-slate-400 mb-8">
              {language === "ar" ? "عذراً، لم يتم العثور على المقال المطلوب." : "Sorry, the requested blog post was not found."}
            </p>
            <Link href="/blog" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 justify-center" data-testid="link-back-to-blog">
              <BackArrow className="h-4 w-4" />
              {language === "ar" ? "العودة إلى المدونة" : "Back to Blog"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = language === "ar" ? post.title : post.titleEn;
  const content = language === "ar" ? post.excerpt : post.excerptEn;
  const date = language === "ar" ? post.date : post.dateEn;
  const readTime = language === "ar" ? post.readTime : post.readTimeEn;
  const category = language === "ar" ? post.category : post.categoryEn;

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main className="py-20">
        <article className="container px-4 md:px-8 max-w-4xl mx-auto">
          <Link href="/blog" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 mb-8 text-sm" data-testid="link-back-to-blog">
            <BackArrow className="h-4 w-4" />
            {language === "ar" ? "العودة إلى المدونة" : "Back to Blog"}
          </Link>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-medium text-indigo-300 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="h-3 w-3" /> {date}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3" /> {readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8" data-testid="text-blog-title">
            {title}
          </h1>

          {post.image && (
            <div className="w-full rounded-xl overflow-hidden mb-8">
              <img src={post.image} alt={title} className="w-full h-auto max-h-[400px] object-cover" />
            </div>
          )}

          <div className="glass-card rounded-xl p-6 md:p-10">
            <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed whitespace-pre-line text-base" data-testid="text-blog-content">
              {content}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
