import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.blog': 'المدونة',
    'nav.about': 'من نحن',
    'nav.contact': 'تواصل معنا',
    
    // Home Hero
    'hero.badge': 'مرحباً بك في موقعي الشخصي 👋',
    'hero.title.prefix': 'تحويل',
    'hero.title.highlight': 'البيانات المعقدة',
    'hero.title.suffix': 'إلى قرارات ذكية.',
    'hero.description': 'نقدم حلولاً مرنة ومبتكرة مصممة خصيصاً لاحتياجات عملك، مما يساعدك على تعزيز الكفاءة، زيادة الإنتاجية، وتحقيق نمو مستدام في سوق تنافسي.',
    'hero.cta.primary': 'تصفح خدماتنا',
    'hero.cta.secondary': 'من نحن',
    
    // Home Sections
    'section.services.title': 'خدماتنا وحلولنا',
    'section.services.subtitle': 'نقدم مجموعة واسعة من خدمات تحليل البيانات وذكاء الأعمال',
    'section.services.viewAll': 'عرض كل الخدمات',
    
    'section.blog.title': 'أحدث المقالات والتحليلات',
    'section.blog.subtitle': 'رؤى معمقة في عالم البيانات والتسويق الرقمي',
    'section.blog.viewAll': 'عرض المدونة',
    
    // Common
    'common.readMore': 'اقرأ المزيد',
    'common.view': 'معاينة',
    'common.code': 'كود',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.description': 'نحن هنا لمساعدتك. سواء كان لديك استفسار، أو ترغب في بدء مشروع جديد، أو تبحث عن فرصة عمل، لا تتردد في التواصل معنا.',
    'contact.info': 'معلومات الاتصال',
    'contact.info.desc': 'يمكنك أيضاً التواصل معنا مباشرة عبر القنوات التالية:',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.desc': 'املأ النموذج أدناه وسنقوم بالرد عليك خلال 24 ساعة عمل.',
    'contact.label.name': 'الاسم الكامل',
    'contact.placeholder.name': 'أدخل اسمك هنا',
    'contact.label.email': 'البريد الإلكتروني',
    'contact.label.purpose': 'غرض التواصل',
    'contact.placeholder.purpose': 'اختر سبب التواصل',
    'contact.label.message': 'الرسالة',
    'contact.placeholder.message': 'اكتب تفاصيل رسالتك هنا...',
    'contact.submit': 'إرسال الرسالة',
    'contact.success': 'تم إرسال رسالتك بنجاح! 🎉',
    'contact.success.desc': 'شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.',
    
    'contact.purpose.project': 'طلب مشروع جديد',
    'contact.purpose.hiring': 'توظيف / فرصة عمل',
    'contact.purpose.consultation': 'استشارة تقنية',
    'contact.purpose.partnership': 'شراكة أعمال',
    'contact.purpose.other': 'استفسار عام',
    
    // Resume / About
    'about.title': 'من نحن',
    'about.description': 'فريق من الخبراء المتمرسين نعمل مع شركات عالمية، نتميز بالشغف والتفاني في كل ما نقوم به.',
    'about.who.title': 'هويتنا',
    'about.who.content': 'نحن لا نخاف التحديات؛ بل نراها فرصاً للنمو والتطور، مما يدفعنا دائماً لتقديم الأفضل. نحن متعلمون مدى الحياة، ملتزمون بتطوير مهاراتنا ومعرفتنا لتقديم أفضل الحلول والاستشارات لعملائنا. بالإضافة إلى ذلك، نمتلك مهارات تقنية متنوعة ولدينا القدرة على التدريب والتصميم وتطوير استراتيجيات فعالة لتحقيق أهداف عملائنا بنجاح.',
    'about.why.title': 'لماذا تختار مجرد تكنيك؟',
    
    'about.card.professionals': 'محترفون ذوو خبرة',
    'about.card.professionals.desc': 'نقدم خدمات عالية الجودة من خلال مستشارين تقنيين ذوي مهارات عالية.',
    'about.card.cost': 'عقلانية التكلفة',
    'about.card.cost.desc': 'نقدم حلولاً فعالة من حيث التكلفة دون المساومة على الجودة.',
    'about.card.targeted': 'حلول مستهدفة',
    'about.card.targeted.desc': 'نصمم حلولاً مخصصة تلبي احتياجاتك الخاصة بدقة.',
    'about.card.deadlines': 'الالتزام بالمواعيد',
    'about.card.deadlines.desc': 'نلتزم بتسليم المشاريع في الوقت المحدد لضمان سير عملك بسلاسة.',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة. تم التصميم والتطوير بشغف.',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    
    // Home Hero
    'hero.badge': 'Welcome to my portfolio 👋',
    'hero.title.prefix': 'Transforming',
    'hero.title.highlight': 'Complex Data',
    'hero.title.suffix': 'into Smart Decisions.',
    'hero.description': 'We provide flexible and innovative solutions tailored to your business needs, helping you enhance efficiency, increase productivity, and achieve sustainable growth in a competitive market.',
    'hero.cta.primary': 'Browse Services',
    'hero.cta.secondary': 'About Us',
    
    // Home Sections
    'section.services.title': 'Our Services & Solutions',
    'section.services.subtitle': 'We offer a wide range of data analytics and business intelligence services',
    'section.services.viewAll': 'View All Services',
    
    'section.blog.title': 'Latest Articles & Insights',
    'section.blog.subtitle': 'Deep insights into the world of data and digital marketing',
    'section.blog.viewAll': 'View Blog',
    
    // Common
    'common.readMore': 'Read More',
    'common.view': 'Preview',
    'common.code': 'Code',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.description': 'We are here to help. Whether you have a question, want to start a new project, or are looking for a job opportunity, feel free to contact us.',
    'contact.info': 'Contact Information',
    'contact.info.desc': 'You can also contact us directly via the following channels:',
    'contact.form.title': 'Send us a message',
    'contact.form.desc': 'Fill out the form below and we will get back to you within 24 business hours.',
    'contact.label.name': 'Full Name',
    'contact.placeholder.name': 'Enter your name here',
    'contact.label.email': 'Email Address',
    'contact.label.purpose': 'Purpose of Contact',
    'contact.placeholder.purpose': 'Select a reason',
    'contact.label.message': 'Message',
    'contact.placeholder.message': 'Write your message details here...',
    'contact.submit': 'Send Message',
    'contact.success': 'Message sent successfully! 🎉',
    'contact.success.desc': 'Thank you for contacting us. We will get back to you as soon as possible.',
    
    'contact.purpose.project': 'New Project Request',
    'contact.purpose.hiring': 'Hiring / Job Opportunity',
    'contact.purpose.consultation': 'Technical Consultation',
    'contact.purpose.partnership': 'Business Partnership',
    'contact.purpose.other': 'General Inquiry',
    
    // Resume / About
    'about.title': 'About Us',
    'about.description': 'A team of seasoned experts working with global companies, characterized by passion and dedication in everything we do.',
    'about.who.title': 'Who We Are',
    'about.who.content': 'We do not fear challenges; rather, we see them as opportunities for growth and development, which always drives us to achieve the best. We are lifelong learners, committed to developing our skills and knowledge to provide the best solutions and consultations to our clients. Additionally, we possess diverse technical skills and have the ability to train, design, and develop effective strategies to successfully achieve our clients’ goals.',
    'about.why.title': 'Why Choose Justtechnic?',
    
    'about.card.professionals': 'Experienced Professionals',
    'about.card.professionals.desc': 'We deliver high quality services through highly skilled technical consultants.',
    'about.card.cost': 'Cost Rationality',
    'about.card.cost.desc': 'We provide cost-effective solutions without compromising on quality.',
    'about.card.targeted': 'Targeted Solutions',
    'about.card.targeted.desc': 'We design custom solutions that precisely meet your specific needs.',
    'about.card.deadlines': 'Meeting Deadlines',
    'about.card.deadlines.desc': 'We commit to delivering projects on time to ensure your workflow runs smoothly.',
    
    // Footer
    'footer.rights': 'All rights reserved. Designed and developed with passion.',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    // Update HTML dir attribute
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
    dir: language === 'ar' ? 'rtl' : 'ltr',
    isRTL: language === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
