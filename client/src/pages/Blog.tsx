import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { useLanguage } from "@/lib/i18n";
import { useData } from "@/lib/data-context";

export default function Blog() {
  const { t, language } = useLanguage();
  const { blogPosts } = useData();

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      <main className="py-20">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-heading font-bold mb-4 text-white">{t('nav.blog')}</h1>
            <p className="text-slate-400 text-lg">
              {t('section.blog.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                {...post} 
                title={language === 'ar' ? post.title : post.titleEn}
                excerpt={language === 'ar' ? post.excerpt : post.excerptEn}
                date={language === 'ar' ? post.date : post.dateEn}
                readTime={language === 'ar' ? post.readTime : post.readTimeEn}
                category={language === 'ar' ? post.category : post.categoryEn}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
