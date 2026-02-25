import AdminLayout from "@/components/admin/AdminLayout";
import { useData } from "@/lib/data-context";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Clock, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AdminMessages() {
  const { messages, markMessageAsRead, deleteMessage, isLoadingMessages } = useData();
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      await deleteMessage(id);
      toast({ title: "تم الحذف", description: "تم حذف الرسالة بنجاح" });
    }
  };

  if (isLoadingMessages) {
    return (
      <AdminLayout title="الرسائل المستلمة">
        <div className="text-center py-20 text-muted-foreground">جاري التحميل...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="الرسائل المستلمة">
      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-card rounded-lg border border-dashed">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>لا توجد رسائل جديدة</p>
          </div>
        ) : (
          messages.map((msg) => (
            <Card key={msg.id} className={`${msg.read ? 'bg-card/50' : 'bg-card border-l-4 border-l-primary'}`} data-testid={`card-message-${msg.id}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg" data-testid={`text-message-name-${msg.id}`}>{msg.name}</h3>
                      <Badge variant={msg.read ? "secondary" : "default"}>
                        {msg.read ? "مقروءة" : "جديدة"}
                      </Badge>
                      <Badge variant="outline">{msg.purpose}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 
                      {new Date(msg.createdAt).toLocaleString('ar-EG')}
                    </p>
                    <div className="pt-2">
                      <p className="leading-relaxed bg-muted/30 p-4 rounded-md text-sm">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {!msg.read && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => markMessageAsRead(msg.id)}
                        data-testid={`button-read-message-${msg.id}`}
                      >
                        <CheckCircle className="h-4 w-4" />
                        تحديد كمقروءة
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-2 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(msg.id)}
                      data-testid={`button-delete-message-${msg.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
