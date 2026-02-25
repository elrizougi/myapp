import { db } from "./db";
import { projects, blogPosts } from "@shared/schema";

async function seed() {
  const existingProjects = await db.select().from(projects);
  if (existingProjects.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  console.log("Seeding database...");

  await db.insert(projects).values([
    {
      title: "تمثيل البيانات بصرياً (Data Visualization)",
      titleEn: "Data Visualization",
      description: "تحويل البيانات إلى قصص مرئية جذابة لتحسين الفهم واتخاذ القرارات الاستراتيجية. نساعدك على رؤية الصورة الكاملة.",
      descriptionEn: "Transform data into engaging visual storytelling to improve understanding and strategic decision-making. We help you see the full picture.",
      image: "https://analyzeforce.com/wp-content/uploads/2025/02/data-visualization-150x150.png",
      tags: ["Tableau", "Power BI", "D3.js"],
      demoUrl: "#",
      repoUrl: "#",
      featured: true
    },
    {
      title: "ذكاء الأعمال (Business Intelligence)",
      titleEn: "Business Intelligence",
      description: "إنشاء رؤى ذات مغزى من خلال لوحات معلومات تفاعلية ورسوم بيانية ديناميكية تجمع بين البيانات التاريخية والمعلومات الفورية.",
      descriptionEn: "Create meaningful insights with dynamic charts and dashboards that combine historical data and real-time information.",
      image: "https://analyzeforce.com/wp-content/uploads/2025/02/artificial-intelligence-1-300x300-1-150x150.png",
      tags: ["Analytics", "Reporting", "Dashboards"],
      demoUrl: "#",
      repoUrl: "#",
      featured: true
    },
    {
      title: "التحليلات المتقدمة (Advanced Analytics)",
      titleEn: "Advanced Analytics",
      description: "استخدام أدوات إحصائية معقدة للكشف عن رؤى عميقة، مما يؤدي إلى أحكام أكثر استنارة وإجراءات استراتيجية دقيقة.",
      descriptionEn: "Use complex statistical tools to uncover deep insights, resulting in more informed judgments and precise strategic actions.",
      image: "https://analyzeforce.com/wp-content/uploads/2025/02/data-150x150.png",
      tags: ["Statistics", "Predictive Modeling", "AI"],
      demoUrl: "#",
      repoUrl: "#",
      featured: true
    },
    {
      title: "البيانات الضخمة (Big Data)",
      titleEn: "Big Data",
      description: "إدارة مجموعات البيانات الكبيرة بمرونة، والاستفادة من البيانات الضخمة لإنشاء حلول مؤسسية ذات مغزى وتعتمد على البيانات.",
      descriptionEn: "Manage large datasets with agility, leveraging big data to create meaningful, data-driven enterprise solutions.",
      image: "https://analyzeforce.com/wp-content/uploads/2025/02/big-data-300x300-1-150x150.png",
      tags: ["Hadoop", "Spark", "Cloud Data"],
      demoUrl: "#",
      repoUrl: "#",
      featured: true
    },
    {
      title: "استراتيجية وهيكلة البيانات",
      titleEn: "Data Strategy & Architecture",
      description: "إنشاء أطر بيانات مخصصة تدعم تحليلاتك، وتضمن بنية قابلة للتطوير وفعالة للنمو المستقبلي.",
      descriptionEn: "Create bespoke data frameworks that support your analytics, ensuring a scalable and efficient architecture for future growth.",
      image: "https://analyzeforce.com/wp-content/uploads/2025/02/strategy-150x150.png",
      tags: ["Data Architecture", "Strategy", "Scalability"],
      demoUrl: "#",
      repoUrl: "#",
      featured: false
    },
    {
      title: "حكومة البيانات (Data Governance)",
      titleEn: "Data Governance",
      description: "تطوير وتنفيذ قواعد لضمان أمن البيانات وجودتها والامتثال للوائح طوال دورة حياة البيانات بأكملها.",
      descriptionEn: "Develop and implement rules to guarantee data security, quality, and regulatory compliance throughout the entire data lifecycle.",
      image: "https://analyzeforce.com/wp-content/uploads/2025/02/data-security-150x150.png",
      tags: ["Security", "Compliance", "Quality"],
      demoUrl: "#",
      repoUrl: "#",
      featured: false
    }
  ]);

  await db.insert(blogPosts).values([
    {
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
  ]);

  console.log("Database seeded successfully!");
}

seed().catch(console.error).then(() => process.exit(0));
