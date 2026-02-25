import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/lib/i18n";
import { useData } from "@/lib/data-context";

export default function Projects() {
  const { t, language } = useLanguage();
  const { projects } = useData();

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      <main className="py-20">
        <div className="container px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-heading font-bold mb-4 text-white">{t('section.services.title')}</h1>
            <p className="text-slate-400 text-lg">
              {t('section.services.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
