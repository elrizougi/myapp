import AdminLayout from "@/components/admin/AdminLayout";
import { useData } from "@/lib/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import type { AboutCard } from "@shared/schema";

export default function ManageAbout() {
  const { aboutPage, aboutCards, isLoadingAbout, updateAboutPage, addAboutCard, updateAboutCard, deleteAboutCard } = useData();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [editingCards, setEditingCards] = useState<Record<number, Partial<AboutCard>>>({});
  const [addingCard, setAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({ title: "", titleEn: "", description: "", descriptionEn: "", sortOrder: 0 });

  const [form, setForm] = useState({
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    whoTitle: "",
    whoTitleEn: "",
    whoContent: "",
    whoContentEn: "",
    whyTitle: "",
    whyTitleEn: "",
  });

  useEffect(() => {
    if (aboutPage) {
      setForm({
        title: aboutPage.title,
        titleEn: aboutPage.titleEn,
        description: aboutPage.description,
        descriptionEn: aboutPage.descriptionEn,
        whoTitle: aboutPage.whoTitle,
        whoTitleEn: aboutPage.whoTitleEn,
        whoContent: aboutPage.whoContent,
        whoContentEn: aboutPage.whoContentEn,
        whyTitle: aboutPage.whyTitle,
        whyTitleEn: aboutPage.whyTitleEn,
      });
    }
  }, [aboutPage]);

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.title || !form.titleEn) {
      toast({ title: "خطأ", description: "يرجى ملء العنوان بالعربية والإنجليزية", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await updateAboutPage(form);
      toast({ title: "تم الحفظ", description: "تم تحديث صفحة من نحن بنجاح" });
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء الحفظ", variant: "destructive" });
    }
    setSaving(false);
  };

  const handleAddCard = async () => {
    if (!newCard.title || !newCard.titleEn) {
      toast({ title: "خطأ", description: "يرجى ملء عنوان البطاقة بالعربية والإنجليزية", variant: "destructive" });
      return;
    }
    try {
      await addAboutCard({ ...newCard, sortOrder: aboutCards.length + 1 });
      setNewCard({ title: "", titleEn: "", description: "", descriptionEn: "", sortOrder: 0 });
      setAddingCard(false);
      toast({ title: "تمت الإضافة", description: "تم إضافة البطاقة بنجاح" });
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء الإضافة", variant: "destructive" });
    }
  };

  const handleUpdateCard = async (id: number) => {
    const changes = editingCards[id];
    if (!changes) return;
    try {
      await updateAboutCard(id, changes);
      setEditingCards(prev => { const next = { ...prev }; delete next[id]; return next; });
      toast({ title: "تم التحديث", description: "تم تحديث البطاقة بنجاح" });
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء التحديث", variant: "destructive" });
    }
  };

  const handleDeleteCard = async (id: number) => {
    try {
      await deleteAboutCard(id);
      toast({ title: "تم الحذف", description: "تم حذف البطاقة بنجاح" });
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء الحذف", variant: "destructive" });
    }
  };

  const getCardValue = (card: AboutCard, field: keyof AboutCard) => {
    return editingCards[card.id]?.[field] !== undefined ? editingCards[card.id][field] : card[field];
  };

  const setCardField = (cardId: number, field: string, value: string) => {
    setEditingCards(prev => ({
      ...prev,
      [cardId]: { ...prev[cardId], [field]: value }
    }));
  };

  if (isLoadingAbout) {
    return (
      <AdminLayout title="إدارة صفحة من نحن">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="إدارة صفحة من نحن">
      <div className="space-y-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">العنوان والوصف الرئيسي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>العنوان (عربي)</Label>
                <Input value={form.title} onChange={e => update("title", e.target.value)} placeholder="من نحن" data-testid="input-about-title" />
              </div>
              <div className="space-y-2">
                <Label>العنوان (إنجليزي)</Label>
                <Input value={form.titleEn} onChange={e => update("titleEn", e.target.value)} placeholder="About Us" data-testid="input-about-title-en" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الوصف (عربي)</Label>
                <Textarea value={form.description} onChange={e => update("description", e.target.value)} rows={3} data-testid="input-about-desc" />
              </div>
              <div className="space-y-2">
                <Label>الوصف (إنجليزي)</Label>
                <Textarea value={form.descriptionEn} onChange={e => update("descriptionEn", e.target.value)} rows={3} data-testid="input-about-desc-en" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">قسم الهوية (من نحن)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>عنوان القسم (عربي)</Label>
                <Input value={form.whoTitle} onChange={e => update("whoTitle", e.target.value)} data-testid="input-who-title" />
              </div>
              <div className="space-y-2">
                <Label>عنوان القسم (إنجليزي)</Label>
                <Input value={form.whoTitleEn} onChange={e => update("whoTitleEn", e.target.value)} data-testid="input-who-title-en" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>المحتوى (عربي)</Label>
                <Textarea value={form.whoContent} onChange={e => update("whoContent", e.target.value)} rows={5} data-testid="input-who-content" />
              </div>
              <div className="space-y-2">
                <Label>المحتوى (إنجليزي)</Label>
                <Textarea value={form.whoContentEn} onChange={e => update("whoContentEn", e.target.value)} rows={5} data-testid="input-who-content-en" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">قسم لماذا تختارنا</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>عنوان القسم (عربي)</Label>
                <Input value={form.whyTitle} onChange={e => update("whyTitle", e.target.value)} data-testid="input-why-title" />
              </div>
              <div className="space-y-2">
                <Label>عنوان القسم (إنجليزي)</Label>
                <Input value={form.whyTitleEn} onChange={e => update("whyTitleEn", e.target.value)} data-testid="input-why-title-en" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg" className="gap-2" data-testid="button-save-about">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "جاري الحفظ..." : "حفظ المعلومات الأساسية"}
          </Button>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold">البطاقات ({aboutCards.length})</h2>
            <Button onClick={() => setAddingCard(true)} className="gap-2" data-testid="button-add-card">
              <Plus className="h-4 w-4" />
              إضافة بطاقة
            </Button>
          </div>

          {addingCard && (
            <Card className="mb-6 border-primary">
              <CardHeader>
                <CardTitle className="font-heading text-lg">بطاقة جديدة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>العنوان (عربي)</Label>
                    <Input value={newCard.title} onChange={e => setNewCard(p => ({ ...p, title: e.target.value }))} data-testid="input-new-card-title" />
                  </div>
                  <div className="space-y-2">
                    <Label>العنوان (إنجليزي)</Label>
                    <Input value={newCard.titleEn} onChange={e => setNewCard(p => ({ ...p, titleEn: e.target.value }))} data-testid="input-new-card-title-en" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الوصف (عربي)</Label>
                    <Textarea value={newCard.description} onChange={e => setNewCard(p => ({ ...p, description: e.target.value }))} rows={3} data-testid="input-new-card-desc" />
                  </div>
                  <div className="space-y-2">
                    <Label>الوصف (إنجليزي)</Label>
                    <Textarea value={newCard.descriptionEn} onChange={e => setNewCard(p => ({ ...p, descriptionEn: e.target.value }))} rows={3} data-testid="input-new-card-desc-en" />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => { setAddingCard(false); setNewCard({ title: "", titleEn: "", description: "", descriptionEn: "", sortOrder: 0 }); }}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddCard} data-testid="button-save-new-card">
                    <Plus className="h-4 w-4 ml-1" />
                    إضافة
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {aboutCards.map((card) => (
              <Card key={card.id} data-testid={`card-about-${card.id}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="font-heading text-lg">
                    {card.title}
                  </CardTitle>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteCard(card.id)} data-testid={`button-delete-card-${card.id}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>العنوان (عربي)</Label>
                      <Input
                        value={getCardValue(card, 'title') as string}
                        onChange={e => setCardField(card.id, 'title', e.target.value)}
                        data-testid={`input-card-title-${card.id}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>العنوان (إنجليزي)</Label>
                      <Input
                        value={getCardValue(card, 'titleEn') as string}
                        onChange={e => setCardField(card.id, 'titleEn', e.target.value)}
                        data-testid={`input-card-title-en-${card.id}`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>الوصف (عربي)</Label>
                      <Textarea
                        value={getCardValue(card, 'description') as string}
                        onChange={e => setCardField(card.id, 'description', e.target.value)}
                        rows={3}
                        data-testid={`input-card-desc-${card.id}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>الوصف (إنجليزي)</Label>
                      <Textarea
                        value={getCardValue(card, 'descriptionEn') as string}
                        onChange={e => setCardField(card.id, 'descriptionEn', e.target.value)}
                        rows={3}
                        data-testid={`input-card-desc-en-${card.id}`}
                      />
                    </div>
                  </div>
                  {editingCards[card.id] && (
                    <div className="flex justify-end">
                      <Button onClick={() => handleUpdateCard(card.id)} className="gap-2" data-testid={`button-save-card-${card.id}`}>
                        <Save className="h-4 w-4" />
                        حفظ التغييرات
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="pb-8" />
      </div>
    </AdminLayout>
  );
}
