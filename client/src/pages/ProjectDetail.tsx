import { useRoute, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { useData } from "@/lib/data-context";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Download, Video, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectDetail() {
  const { language, isRTL } = useLanguage();
  const { projects, isLoadingProjects } = useData();
  const [, params] = useRoute("/projects/:id");
  const projectId = params?.id ? Number(params.id) : null;

  const project = projects.find((p) => p.id === projectId);
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (isLoadingProjects) {
    return (
      <div className="min-h-screen font-sans">
        <Navbar />
        <main className="py-20">
          <div className="container px-4 md:px-8 text-center">
            <p className="text-slate-400 text-lg">{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen font-sans">
        <Navbar />
        <main className="py-20">
          <div className="container px-4 md:px-8 text-center">
            <h1 className="text-3xl font-heading font-bold text-white mb-4">
              {language === "ar" ? "المشروع غير موجود" : "Project Not Found"}
            </h1>
            <p className="text-slate-400 mb-8">
              {language === "ar" ? "عذراً، لم يتم العثور على المشروع المطلوب." : "Sorry, the requested project was not found."}
            </p>
            <Link href="/projects" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 justify-center" data-testid="link-back-to-projects">
              <BackArrow className="h-4 w-4" />
              {language === "ar" ? "العودة إلى الخدمات" : "Back to Services"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = language === "ar" ? project.title : project.titleEn;
  const description = language === "ar" ? project.description : project.descriptionEn;

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main className="py-20">
        <div className="container px-4 md:px-8 max-w-4xl mx-auto">
          <Link href="/projects" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 mb-8 text-sm" data-testid="link-back-to-projects">
            <BackArrow className="h-4 w-4" />
            {language === "ar" ? "العودة إلى الخدمات" : "Back to Services"}
          </Link>

          <div className="w-full rounded-xl overflow-hidden mb-8">
            <img src={project.image} alt={title} className="w-full h-auto max-h-[400px] object-cover" />
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6" data-testid="text-project-title">
            {title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {tag}
              </span>
            ))}
          </div>

          <div className="glass-card rounded-xl p-6 md:p-10 mb-8">
            <div className="text-slate-300 leading-relaxed whitespace-pre-line text-base" data-testid="text-project-description">
              {description}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.demoUrl && (
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" data-testid="link-project-demo">
                  <ExternalLink className="h-4 w-4" />
                  {isRTL ? "معاينة المشروع" : "View Demo"}
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outline" className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" data-testid="link-project-repo">
                  <Github className="h-4 w-4" />
                  {isRTL ? "الكود المصدري" : "Source Code"}
                </a>
              </Button>
            )}
            {project.filesUrl && (
              <Button variant="outline" className="gap-2 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10" asChild>
                <a href={project.filesUrl} target="_blank" rel="noopener noreferrer" data-testid="link-project-files-detail">
                  <Download className="h-4 w-4" />
                  {isRTL ? "تحميل الملفات" : "Download Files"}
                </a>
              </Button>
            )}
            {project.videoUrl && (
              <Button variant="outline" className="gap-2 border-purple-500/30 text-purple-300 hover:bg-purple-500/10" asChild>
                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" data-testid="link-project-video-detail">
                  <Video className="h-4 w-4" />
                  {isRTL ? "الفيديو التعليمي" : "Tutorial Video"}
                </a>
              </Button>
            )}
            {project.authorUrl && (
              <Button variant="outline" className="gap-2 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10" asChild>
                <a href={project.authorUrl} target="_blank" rel="noopener noreferrer" data-testid="link-project-author-detail">
                  <UserCircle className="h-4 w-4" />
                  {isRTL ? "عن الكاتب" : "About Author"}
                </a>
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
