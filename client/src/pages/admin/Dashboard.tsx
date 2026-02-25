import AdminLayout from "@/components/admin/AdminLayout";
import { useData } from "@/lib/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, FileText, Mail, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { projects, blogPosts, messages } = useData();
  
  const stats = [
    {
      title: "إجمالي الخدمات",
      value: projects.length,
      icon: Code2,
      desc: "خدمة معروضة",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "مقالات المدونة",
      value: blogPosts.length,
      icon: FileText,
      desc: "مقال منشور",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "رسائل جديدة",
      value: messages.filter(m => !m.read).length,
      icon: Mail,
      desc: "رسالة غير مقروءة",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "إجمالي الرسائل",
      value: messages.length,
      icon: TrendingUp,
      desc: "رسالة مستلمة",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <AdminLayout title="نظرة عامة">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} data-testid={`card-stat-${i}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">أحدث الرسائل</CardTitle>
          </CardHeader>
          <CardContent>
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.slice(0, 3).map((msg) => (
                  <div key={msg.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{msg.name}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">{msg.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">لا توجد رسائل بعد</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">آخر المقالات المضافة</CardTitle>
          </CardHeader>
          <CardContent>
            {blogPosts.length > 0 ? (
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{post.category}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">لا توجد مقالات بعد</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
