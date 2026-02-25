export interface BlogPost {
  id: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  date: string;
  dateEn: string;
  readTime: string;
  readTimeEn: string;
  category: string;
  categoryEn: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "تحليل حملات التسويق متعددة القنوات",
    titleEn: "Multi-Channel Marketing Campaign Analysis",
    excerpt: "أصبح التسويق متعدد القنوات عنصراً حاسماً في استراتيجية التسويق الرقمي الفعالة. في عصر يتفاعل فيه العملاء عبر منصات متعددة، يعد فهم رحلة العميل أمراً ضرورياً.",
    excerptEn: "Multi-channel marketing has become a critical component of effective digital marketing strategy. In an era where customers interact across multiple platforms, understanding the customer journey is essential.",
    date: "10 فبراير 2025",
    dateEn: "February 10, 2025",
    readTime: "5 دقائق",
    readTimeEn: "5 min read",
    category: "التسويق الرقمي",
    categoryEn: "Digital Marketing",
    featured: true
  },
  {
    id: "2",
    title: "لوحة تحكم مناجم الذهب",
    titleEn: "Gold Mining Dashboard",
    excerpt: "في عالم تعدين الذهب سريع الخطى والمكثف بالبيانات، تعد القدرة على مراقبة وتحليل وإعداد التقارير عن أداء المشروع في الوقت الفعلي أمراً حيوياً للنجاح.",
    excerptEn: "In the fast-paced and data-intensive world of gold mining, the ability to monitor, analyze, and report on project performance in real-time is vital for success.",
    date: "5 فبراير 2025",
    dateEn: "February 5, 2025",
    readTime: "8 دقائق",
    readTimeEn: "8 min read",
    category: "تحليل البيانات",
    categoryEn: "Data Analytics",
    featured: true
  },
  {
    id: "3",
    title: "تحليل التقارير المالية",
    titleEn: "Financial Reports Analysis",
    excerpt: "تحليل التقارير المالية باستخدام لوحة المعلومات ليس مجرد أداة للعرض بل هو وسيلة لاكتساب رؤى أعمق حول الصحة المالية للمؤسسة واتخاذ قرارات مدروسة.",
    excerptEn: "Analyzing financial reports using a dashboard is not merely a showcase tool but a method to gain deeper insights into the organization's financial health and make informed decisions.",
    date: "1 فبراير 2025",
    dateEn: "February 1, 2025",
    readTime: "6 دقائق",
    readTimeEn: "6 min read",
    category: "المالية",
    categoryEn: "Finance",
    featured: true
  },
  {
    id: "4",
    title: "استيراد وتصدير الشاي",
    titleEn: "Tea Import and Export",
    excerpt: "الشاي هو ثاني أكثر المشروبات استهلاكاً في العالم بعد الماء، وتختلف طرق تحضيره عبر الثقافات. تحليل بيانات تجارة الشاي يكشف عن اتجاهات عالمية مثيرة.",
    excerptEn: "Tea is the second most consumed beverage in the world after water, and its preparation methods vary across cultures. Analyzing tea trade data reveals exciting global trends.",
    date: "25 يناير 2025",
    dateEn: "January 25, 2025",
    readTime: "7 دقائق",
    readTimeEn: "7 min read",
    category: "التجارة العالمية",
    categoryEn: "Global Trade",
    featured: false
  },
  {
    id: "5",
    title: "تحليل بيانات بنكهة الفلافل",
    titleEn: "Data Analysis Falafel Flavored",
    excerpt: "في عالم الأعمال المعاصر، يعد تصميم لوحات المعلومات أداة أساسية لتتبع وتحليل مؤشرات الأداء الرئيسية بشكل مرئي، حتى لمشاريع الأغذية التقليدية.",
    excerptEn: "In the contemporary business world, dashboard design is an essential tool for visually tracking and analyzing key performance indicators, even for traditional food projects.",
    date: "20 يناير 2025",
    dateEn: "January 20, 2025",
    readTime: "4 دقائق",
    readTimeEn: "4 min read",
    category: "ريادة الأعمال",
    categoryEn: "Entrepreneurship",
    featured: false
  },
  {
    id: "6",
    title: "تحليل إصابات العمل",
    titleEn: "Workplace Injury Analysis",
    excerpt: "في عالم اليوم المعتمد على البيانات، يعد فهم اتجاهات وتكاليف إصابات العمل أمراً بالغ الأهمية لضمان سلامة الموظفين وتحسين بيئة العمل.",
    excerptEn: "In today's data-driven world, understanding workplace injury trends and costs is crucial for ensuring employee safety and improving the work environment.",
    date: "15 يناير 2025",
    dateEn: "January 15, 2025",
    readTime: "6 دقائق",
    readTimeEn: "6 min read",
    category: "الموارد البشرية",
    categoryEn: "HR",
    featured: false
  },
  {
    id: "7",
    title: "تحليل بيانات سوق العمل",
    titleEn: "Labor Market Data Analysis",
    excerpt: "مع ما يقرب من 80,000 استجابة ميدانية من أكثر من 180 دولة، يقدم التحليل السنوي لسوق العمل رؤى قيمة حول الاتجاهات العالمية والرواتب.",
    excerptEn: "With nearly 80,000 fielded responses from over 180 countries, the annual labor market analysis offers valuable insights into global trends and salaries.",
    date: "10 يناير 2025",
    dateEn: "January 10, 2025",
    readTime: "10 دقائق",
    readTimeEn: "10 min read",
    category: "الاقتصاد",
    categoryEn: "Economics",
    featured: false
  },
  {
    id: "8",
    title: "تحليل بيانات زلزال تركيا",
    titleEn: "Turkey Earthquake Data Analysis",
    excerpt: "في 6 فبراير 2023، ضرب تركيا زلزالان من أكثر الزلازل تدميراً في تاريخها. تحليل البيانات الجيولوجية والإنسانية يساعد في فهم حجم الكارثة والاستجابة لها.",
    excerptEn: "On February 6, 2023, Turkey was struck by two of the most devastating earthquakes in its history. Analyzing geological and humanitarian data helps understand the scale of the disaster and the response.",
    date: "5 يناير 2025",
    dateEn: "January 5, 2025",
    readTime: "9 دقائق",
    readTimeEn: "9 min read",
    category: "البيانات الإنسانية",
    categoryEn: "Humanitarian Data",
    featured: false
  },
  {
    id: "9",
    title: "تحليل الوصول إلى الغذاء",
    titleEn: "Food Access Analysis",
    excerpt: "يعد الوصول إلى الغذاء قضية حرجة تؤثر على الملايين. فهم التركيبة السكانية والتوزيع الجغرافي للوصول إلى الغذاء يساعد في توجيه السياسات العامة.",
    excerptEn: "Food access is a critical issue affecting millions. Understanding demographics and geographic distribution of food access helps guide public policies.",
    date: "1 يناير 2025",
    dateEn: "January 1, 2025",
    readTime: "8 دقائق",
    readTimeEn: "8 min read",
    category: "القضايا الاجتماعية",
    categoryEn: "Social Issues",
    featured: false
  }
];
