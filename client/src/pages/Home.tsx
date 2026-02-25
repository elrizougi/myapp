import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useData } from "@/lib/data-context";

export default function Home() {
  const { t, language, isRTL } = useLanguage();
  const { projects, blogPosts } = useData();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      <main>
        <Hero />
        
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-indigo-600/[0.03] pointer-events-none" />
          <div className="container px-4 md:px-8 relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2 text-white">{t('section.services.title')}</h2>
                <p className="text-slate-400">{t('section.services.subtitle')}</p>
              </div>
              <Link href="/projects" className="hidden sm:flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                {t('section.services.viewAll')} <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  {...project} 
                  demoUrl={project.demoUrl || undefined}
                  repoUrl={project.repoUrl || undefined}
                  title={language === 'ar' ? project.title : project.titleEn}
                  description={language === 'ar' ? project.description : project.descriptionEn}
                />
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link href="/projects" className="inline-flex items-center gap-2 text-indigo-400 border border-indigo-500/30 rounded-lg px-6 py-2.5 hover:bg-indigo-500/10 transition-colors">
                {t('section.services.viewAll')}
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container px-4 md:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2 text-white">{t('section.blog.title')}</h2>
                <p className="text-slate-400">{t('section.blog.subtitle')}</p>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                {t('section.blog.viewAll')} <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
