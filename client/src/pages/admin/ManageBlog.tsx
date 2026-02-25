import AdminLayout from "@/components/admin/AdminLayout";
import { useData } from "@/lib/data-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Upload, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useUpload } from "@/hooks/use-upload";
import { useState, useRef } from "react";
import type { BlogPost } from "@shared/schema";

type BlogForm = {
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  image: string;
  date: string;
  dateEn: string;
  readTime: string;
  readTimeEn: string;
  category: string;
  categoryEn: string;
  featured: boolean;
};

const emptyForm: BlogForm = {
  title: "",
  titleEn: "",
  excerpt: "",
  excerptEn: "",
  image: "",
  date: "",
  dateEn: "",
  readTime: "",
  readTimeEn: "",
  category: "",
  categoryEn: "",
  featured: false,
};

export default function ManageBlog() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, isLoadingBlogPosts } = useData();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading: uploading } = useUpload({
    onSuccess: (response) => {
      setForm(prev => ({ ...prev, image: response.objectPath }));
      toast({ title: "تم الرفع", description: "تم رفع الصورة بنجاح" });
    },
    onError: () => {
      toast({ title: "خطأ", description: "فشل رفع الصورة", variant: "destructive" });
    },
  });

  const handleImageUpload = async (file: File) => {
    await uploadFile(file);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      titleEn: post.titleEn,
      excerpt: post.excerpt,
      excerptEn: post.excerptEn,
      image: post.image || "",
      date: post.date,
      dateEn: post.dateEn,
      readTime: post.readTime,
      readTimeEn: post.readTimeEn,
      category: post.category,
      categoryEn: post.categoryEn,
      featured: post.featured,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.titleEn || !form.excerpt || !form.excerptEn || !form.date || !form.category) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const data = {
        title: form.title,
        titleEn: form.titleEn,
        excerpt: form.excerpt,
        excerptEn: form.excerptEn,
        image: form.image || null,
        date: form.date,
        dateEn: form.dateEn,
        readTime: form.readTime,
        readTimeEn: form.readTimeEn,
        category: form.category,
        categoryEn: form.categoryEn,
        featured: form.featured,
      };
      if (editingId !== null) {
        await updateBlogPost(editingId, data);
        toast({ title: "تم التحديث", description: "تم تحديث المقال بنجاح" });
      } else {
        await addBlogPost(data as any);
        toast({ title: "تمت الإضافة", description: "تم إضافة المقال بنجاح" });
      }
      setDialogOpen(false);
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء الحفظ", variant: "destructive" });
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا المقال؟")) {
      await deleteBlogPost(id);
      toast({ title: "تم الحذف", description: "تم حذف المقال بنجاح" });
    }
  };

  if (isLoadingBlogPosts) {
    return (
      <AdminLayout title="إدارة المدونة">
        <div className="text-center py-20 text-muted-foreground">جاري التحميل...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="إدارة المدونة">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">قم بإدارة المقالات والمحتوى المنشور في المدونة</p>
        <Button className="gap-2" onClick={openAdd} data-testid="button-add-blog">
          <Plus className="h-4 w-4" /> كتابة مقال جديد
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المقالات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">العنوان</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">القسم</TableHead>
                <TableHead className="text-right">مميز</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => (
                <TableRow key={post.id} data-testid={`row-blog-${post.id}`}>
                  <TableCell className="font-medium max-w-[300px] truncate" title={post.title}>
                    {post.title}
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {post.featured ? (
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">نعم</Badge>
                    ) : (
                      <Badge variant="secondary">لا</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500"
                        onClick={() => openEdit(post)}
                        data-testid={`button-edit-blog-${post.id}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDelete(post.id)}
                        data-testid={`button-delete-blog-${post.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingId !== null ? "تعديل المقال" : "كتابة مقال جديد"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>العنوان (عربي) *</Label>
                <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="عنوان المقال بالعربي" data-testid="input-blog-title" />
              </div>
              <div className="space-y-2">
                <Label>العنوان (إنجليزي) *</Label>
                <Input value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} placeholder="Blog post title in English" dir="ltr" data-testid="input-blog-title-en" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>المقتطف (عربي) *</Label>
                <Textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="ملخص قصير بالعربي" rows={3} data-testid="input-blog-excerpt" />
              </div>
              <div className="space-y-2">
                <Label>المقتطف (إنجليزي) *</Label>
                <Textarea value={form.excerptEn} onChange={e => setForm({...form, excerptEn: e.target.value})} placeholder="Short excerpt in English" dir="ltr" rows={3} data-testid="input-blog-excerpt-en" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>صورة المقال</Label>
              <div className="flex gap-3 items-start">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="رابط الصورة أو ارفع صورة" dir="ltr" data-testid="input-blog-image" className="flex-1" />
                    <Button type="button" variant="outline" size="icon" disabled={uploading} onClick={() => fileInputRef.current?.click()} data-testid="button-upload-blog-image">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); e.target.value = ""; }} />
                  {uploading && <p className="text-xs text-muted-foreground">جاري رفع الصورة...</p>}
                </div>
                {form.image && (
                  <img src={form.image} alt="معاينة" className="w-16 h-16 object-cover rounded border" />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>التاريخ (عربي) *</Label>
                <Input value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="١٥ يناير ٢٠٢٥" data-testid="input-blog-date" />
              </div>
              <div className="space-y-2">
                <Label>التاريخ (إنجليزي)</Label>
                <Input value={form.dateEn} onChange={e => setForm({...form, dateEn: e.target.value})} placeholder="January 15, 2025" dir="ltr" data-testid="input-blog-date-en" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>وقت القراءة (عربي)</Label>
                <Input value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} placeholder="٥ دقائق" data-testid="input-blog-readtime" />
              </div>
              <div className="space-y-2">
                <Label>وقت القراءة (إنجليزي)</Label>
                <Input value={form.readTimeEn} onChange={e => setForm({...form, readTimeEn: e.target.value})} placeholder="5 min read" dir="ltr" data-testid="input-blog-readtime-en" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>القسم (عربي) *</Label>
                <Input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="تحليل بيانات" data-testid="input-blog-category" />
              </div>
              <div className="space-y-2">
                <Label>القسم (إنجليزي)</Label>
                <Input value={form.categoryEn} onChange={e => setForm({...form, categoryEn: e.target.value})} placeholder="Data Analysis" dir="ltr" data-testid="input-blog-category-en" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.featured} onCheckedChange={v => setForm({...form, featured: v})} data-testid="switch-blog-featured" />
              <Label>مميز (يظهر في الصفحة الرئيسية)</Label>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>إلغاء</Button>
              <Button onClick={handleSave} disabled={saving} data-testid="button-save-blog">
                {saving ? "جاري الحفظ..." : editingId !== null ? "تحديث" : "إضافة"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
