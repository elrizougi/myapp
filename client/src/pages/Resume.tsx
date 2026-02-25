import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Code2, LineChart, Award, CheckCircle2, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useData } from "@/lib/data-context";

const cardIcons = [Users, LineChart, Code2, Award, Star, CheckCircle2];
const cardColors = ['text-indigo-400', 'text-purple-400', 'text-pink-400', 'text-cyan-400', 'text-emerald-400', 'text-amber-400'];

export default function Resume() {
  const { t, language } = useLanguage();
  const { aboutPage, aboutCards } = useData();
  const isAr = language === 'ar';

  const title = aboutPage ? (isAr ? aboutPage.title : aboutPage.titleEn) : t('about.title');
  const description = aboutPage ? (isAr ? aboutPage.description : aboutPage.descriptionEn) : t('about.description');
  const whoTitle = aboutPage ? (isAr ? aboutPage.whoTitle : aboutPage.whoTitleEn) : t('about.who.title');
  const whoContent = aboutPage ? (isAr ? aboutPage.whoContent : aboutPage.whoContentEn) : t('about.who.content');
  const whyTitle = aboutPage ? (isAr ? aboutPage.whyTitle : aboutPage.whyTitleEn) : t('about.why.title');

  const cards = aboutCards.length > 0
    ? aboutCards.map((card, i) => ({
        icon: cardIcons[i % cardIcons.length],
        title: isAr ? card.title : card.titleEn,
        desc: isAr ? card.description : card.descriptionEn,
        color: cardColors[i % cardColors.length],
      }))
    : [
        { icon: Users, title: t('about.card.professionals'), desc: t('about.card.professionals.desc'), color: 'text-indigo-400' },
        { icon: LineChart, title: t('about.card.cost'), desc: t('about.card.cost.desc'), color: 'text-purple-400' },
        { icon: Code2, title: t('about.card.targeted'), desc: t('about.card.targeted.desc'), color: 'text-pink-400' },
        { icon: Award, title: t('about.card.deadlines'), desc: t('about.card.deadlines.desc'), color: 'text-cyan-400' },
      ];

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      <main className="py-20">
        <div className="container px-4 md:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-heading font-bold mb-4 text-white" data-testid="text-about-title">{title}</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto" data-testid="text-about-desc">
              {description}
            </p>
          </div>
          
          <div className="space-y-16">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <Users className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-white" data-testid="text-who-title">{whoTitle}</h2>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <p className="text-lg leading-relaxed text-slate-400" data-testid="text-who-content">
                  {whoContent}
                </p>
              </div>
            </section>
            
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <CheckCircle2 className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-white" data-testid="text-why-title">{whyTitle}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card, i) => (
                  <div key={i} className="glass-card rounded-xl p-6" data-testid={`card-about-${i}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <card.icon className={`h-5 w-5 ${card.color}`} />
                      <h3 className="text-lg font-heading font-bold text-white">{card.title}</h3>
                    </div>
                    <p className="text-slate-400">{card.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
