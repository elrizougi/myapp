export interface Project {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
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
];
