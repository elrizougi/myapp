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
import { Plus, Pencil, Trash2, Upload, Image, Download, Video, UserCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useUpload } from "@/hooks/use-upload";
import { useState, useRef } from "react";
import type { Project } from "@shared/schema";

type ProjectForm = {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  tags: string;
  demoUrl: string;
  repoUrl: string;
  filesUrl: string;
  videoUrl: string;
  authorUrl: string;
  featured: boolean;
};

const emptyForm: ProjectForm = {
  title: "",
  titleEn: "",
  description: "",
  descriptionEn: "",
  image: "",
  tags: "",
  demoUrl: "",
  repoUrl: "",
  filesUrl: "",
  videoUrl: "",
  authorUrl: "",
  featured: false,
};

export default function ManageProjects() {
  const { projects, addProject, updateProject, deleteProject, isLoadingProjects } = useData();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
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

  const openEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      titleEn: project.titleEn,
      description: project.description,
      descriptionEn: project.descriptionEn,
      image: project.image,
      tags: project.tags.join(", "),
      demoUrl: project.demoUrl || "",
      repoUrl: project.repoUrl || "",
      filesUrl: project.filesUrl || "",
      videoUrl: project.videoUrl || "",
      authorUrl: project.authorUrl || "",
      featured: project.featured,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.titleEn || !form.description || !form.descriptionEn || !form.image) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const data = {
        title: form.title,
        titleEn: form.titleEn,
        description: form.description,
        descriptionEn: form.descriptionEn,
        image: form.image,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        demoUrl: form.demoUrl || null,
        repoUrl: form.repoUrl || null,
        filesUrl: form.filesUrl || null,
        videoUrl: form.videoUrl || null,
        authorUrl: form.authorUrl || null,
        featured: form.featured,
      };
      if (editingId !== null) {
        await updateProject(editingId, data);
        toast({ title: "تم التحديث", description: "تم تحديث الخدمة بنجاح" });
      } else {
        await addProject(data as any);
        toast({ title: "تمت الإضافة", description: "تم إضافة الخدمة بنجاح" });
      }
      setDialogOpen(false);
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء الحفظ", variant: "destructive" });
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      await deleteProject(id);
      toast({ title: "تم الحذف", description: "تم حذف الخدمة بنجاح" });
    }
  };

  if (isLoadingProjects) {
    return (
      <AdminLayout title="إدارة الخدمات">
        <div className="text-center py-20 text-muted-foreground">جاري التحميل...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="إدارة الخدمات">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">قم بإدارة الخدمات والمشاريع المعروضة في الموقع</p>
        <Button className="gap-2" onClick={openAdd} data-testid="button-add-project">
          <Plus className="h-4 w-4" /> إضافة خدمة جديدة
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الخدمات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الصورة</TableHead>
                <TableHead className="text-right">العنوان</TableHead>
                <TableHead className="text-right">التصنيف</TableHead>
                <TableHead className="text-right">مميز</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} data-testid={`row-project-${project.id}`}>
                  <TableCell>
                    <img src={project.image} alt={project.title} className="w-12 h-8 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                      {project.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{project.tags.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.featured ? (
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
                        onClick={() => openEdit(project)}
                        data-testid={`button-edit-project-${project.id}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDelete(project.id)}
                        data-testid={`button-delete-project-${project.id}`}
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
              {editingId !== null ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>العنوان (عربي) *</Label>
                <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="عنوان الخدمة بالعربي" data-testid="input-project-title" />
              </div>
              <div className="space-y-2">
                <Label>العنوان (إنجليزي) *</Label>
                <Input value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} placeholder="Service title in English" dir="ltr" data-testid="input-project-title-en" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الوصف (عربي) *</Label>
                <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="وصف الخدمة بالعربي" rows={3} data-testid="input-project-desc" />
              </div>
              <div className="space-y-2">
                <Label>الوصف (إنجليزي) *</Label>
                <Textarea value={form.descriptionEn} onChange={e => setForm({...form, descriptionEn: e.target.value})} placeholder="Service description in English" dir="ltr" rows={3} data-testid="input-project-desc-en" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>الصورة *</Label>
              <div className="flex gap-3 items-start">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="رابط الصورة أو ارفع صورة" dir="ltr" data-testid="input-project-image" className="flex-1" />
                    <Button type="button" variant="outline" size="icon" disabled={uploading} onClick={() => fileInputRef.current?.click()} data-testid="button-upload-project-image">
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
            <div className="space-y-2">
              <Label>التصنيفات (افصل بفاصلة)</Label>
              <Input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Python, تحليل بيانات, Power BI" data-testid="input-project-tags" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>رابط المعاينة</Label>
                <Input value={form.demoUrl} onChange={e => setForm({...form, demoUrl: e.target.value})} placeholder="https://" dir="ltr" data-testid="input-project-demo" />
              </div>
              <div className="space-y-2">
                <Label>رابط الكود</Label>
                <Input value={form.repoUrl} onChange={e => setForm({...form, repoUrl: e.target.value})} placeholder="https://github.com/..." dir="ltr" data-testid="input-project-repo" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1"><Download className="h-3.5 w-3.5" /> رابط تحميل الملفات</Label>
                <Input value={form.filesUrl} onChange={e => setForm({...form, filesUrl: e.target.value})} placeholder="https://drive.google.com/..." dir="ltr" data-testid="input-project-files" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1"><Video className="h-3.5 w-3.5" /> رابط الفيديو التعليمي</Label>
                <Input value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} placeholder="https://youtube.com/..." dir="ltr" data-testid="input-project-video" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1"><UserCircle className="h-3.5 w-3.5" /> رابط عن الكاتب</Label>
                <Input value={form.authorUrl} onChange={e => setForm({...form, authorUrl: e.target.value})} placeholder="https://..." dir="ltr" data-testid="input-project-author" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.featured} onCheckedChange={v => setForm({...form, featured: v})} data-testid="switch-project-featured" />
              <Label>مميز (يظهر في الصفحة الرئيسية)</Label>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>إلغاء</Button>
              <Button onClick={handleSave} disabled={saving} data-testid="button-save-project">
                {saving ? "جاري الحفظ..." : editingId !== null ? "تحديث" : "إضافة"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
