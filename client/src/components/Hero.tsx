import { ArrowLeft, ArrowRight, BarChart3, Database, TrendingUp, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { useData } from "@/lib/data-context";
import { useEffect, useRef } from "react";
import profileImg from "@assets/DSC04282_1770699506280.png";

export default function Hero() {
  const { t, language, isRTL } = useLanguage();
  const { cvUrl } = useData();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className="absolute top-20 right-[10%] w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex flex-col gap-6 text-right" dir="rtl">
            <div className="inline-flex items-center self-start rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm">
              {t('hero.badge')}
            </div>

            <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-tight">
              <span className="text-white">{t('hero.title.prefix')}</span>{' '}
              <span className="bg-gradient-to-l from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{t('hero.title.highlight')}</span>
              <br />
              <span className="text-white">{t('hero.title.suffix')}</span>
            </h1>

            <p className="max-w-[600px] text-slate-400 text-lg leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-l from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
              >
                {t('hero.cta.primary')} <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 font-semibold text-slate-300 transition-all duration-300 border border-slate-600/50 hover:border-indigo-500/50 hover:text-white hover:bg-white/5 backdrop-blur-sm"
              >
                {t('hero.cta.secondary')}
              </Link>
              {cvUrl && cvUrl.length > 0 && (
                <a
                  href={cvUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 font-semibold text-slate-300 transition-all duration-300 border border-emerald-600/50 hover:border-emerald-500/50 hover:text-white hover:bg-emerald-500/10 backdrop-blur-sm"
                  data-testid="button-download-cv"
                >
                  <Download className="h-4 w-4" />
                  {isRTL ? 'تحميل السيرة الذاتية' : 'Download CV'}
                </a>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full p-1 relative hero-glow-ring">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-800 relative z-10">
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 md:top-0 md:right-0 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2.5 shadow-lg animate-float-slow z-20">
                <BarChart3 className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="absolute top-1/2 -left-6 md:-left-8 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2.5 shadow-lg animate-float-medium z-20">
                <Database className="h-5 w-5 text-purple-400" />
              </div>
              <div className="absolute -bottom-2 right-8 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2.5 shadow-lg animate-float-fast z-20">
                <TrendingUp className="h-5 w-5 text-pink-400" />
              </div>

              <div className="absolute top-10 -right-12 w-3 h-3 rounded-full bg-cyan-400/60 animate-ping-slow" />
              <div className="absolute bottom-20 -left-10 w-2 h-2 rounded-full bg-pink-400/60 animate-ping-slow" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/3 -left-16 w-2 h-2 rounded-full bg-indigo-400/60 animate-ping-slow" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto">
          {[
            { icon: BarChart3, value: '+50', label: isRTL ? 'مشروع منجز' : 'Completed Projects', color: 'text-indigo-400' },
            { icon: Database, value: '+15', label: isRTL ? 'سنوات خبرة' : 'Years Experience', color: 'text-purple-400' },
            { icon: TrendingUp, value: '+30', label: isRTL ? 'عميل راضٍ' : 'Happy Clients', color: 'text-pink-400' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2 bg-slate-800/40 backdrop-blur-sm border border-slate-700/40 rounded-xl px-6 py-4 hover:border-indigo-500/30 transition-colors" data-testid={`stat-card-${i}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
