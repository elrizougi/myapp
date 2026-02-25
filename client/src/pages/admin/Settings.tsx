import AdminLayout from "@/components/admin/AdminLayout";
import { useData } from "@/lib/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Plus, Trash2, Eye, EyeOff, Share2, FileText, Upload, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUpload } from "@/hooks/use-upload";
import { useState, useRef } from "react";

const PLATFORMS = [
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter / X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "snapchat", label: "Snapchat" },
  { value: "email", label: "Email" },
  { value: "website", label: "Website" },
];

export default function Settings() {
  const { changePassword, socialLinks, addSocialLink, updateSocialLink, deleteSocialLink, cvUrl, updateCvUrl } = useData();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [addingLink, setAddingLink] = useState(false);
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const cvFileRef = useRef<HTMLInputElement>(null);
  const { uploadFile: uploadCvFile, isUploading: uploadingCv } = useUpload({
    onSuccess: async (response) => {
      await updateCvUrl(response.objectPath);
      toast({ title: "تم الرفع", description: "تم رفع السيرة الذاتية بنجاح" });
    },
    onError: () => {
      toast({ title: "خطأ", description: "فشل رفع الملف", variant: "destructive" });
    },
  });

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "خطأ", description: "كلمة المرور الجديدة غير متطابقة", variant: "destructive" });
      return;
    }
    if (newPassword.length < 4) {
      toast({ title: "خطأ", description: "كلمة المرور يجب أن تكون 4 أحرف على الأقل", variant: "destructive" });
      return;
    }
    setChangingPassword(true);
    const result = await changePassword(currentPassword, newPassword);
    setChangingPassword(false);
    if (result.success) {
      toast({ title: "تم التغيير", description: "تم تغيير كلمة المرور بنجاح" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast({ title: "خطأ", description: "كلمة المرور الحالية غير صحيحة", variant: "destructive" });
    }
  };

  const handleAddLink = async () => {
    if (!newPlatform || !newUrl) {
      toast({ title: "خطأ", description: "يرجى اختيار المنصة وإدخال الرابط", variant: "destructive" });
      return;
    }
    try {
      await addSocialLink({ platform: newPlatform, url: newUrl, visible: true, sortOrder: socialLinks.length + 1 });
      setNewPlatform("");
      setNewUrl("");
      setAddingLink(false);
      toast({ title: "تمت الإضافة", description: "تم إضافة رابط التواصل بنجاح" });
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء الإضافة", variant: "destructive" });
    }
  };

  const handleToggleVisibility = async (id: number, currentVisible: boolean) => {
    try {
      await updateSocialLink(id, { visible: !currentVisible });
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء التحديث", variant: "destructive" });
    }
  };

  const handleDeleteLink = async (id: number) => {
    try {
      await deleteSocialLink(id);
      toast({ title: "تم الحذف", description: "تم حذف الرابط بنجاح" });
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء الحذف", variant: "destructive" });
    }
  };

  const handleUpdateUrl = async (id: number, url: string) => {
    try {
      await updateSocialLink(id, { url });
    } catch {
      toast({ title: "خطأ", description: "حدث خطأ أثناء التحديث", variant: "destructive" });
    }
  };

  const getPlatformLabel = (value: string) => PLATFORMS.find(p => p.value === value)?.label || value;

  return (
    <AdminLayout title="الإعدادات">
      <div className="space-y-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <FileText className="h-5 w-5" />
              السيرة الذاتية (PDF)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">ارفع ملف PDF للسيرة الذاتية ليظهر زر التحميل في الصفحة الرئيسية</p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="gap-2"
                disabled={uploadingCv}
                onClick={() => cvFileRef.current?.click()}
                data-testid="button-upload-cv"
              >
                {uploadingCv ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploadingCv ? "جاري الرفع..." : "رفع ملف PDF"}
              </Button>
              <input
                ref={cvFileRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) uploadCvFile(f);
                  e.target.value = "";
                }}
              />
              {cvUrl && cvUrl.length > 0 && (
                <div className="flex items-center gap-2">
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:underline flex items-center gap-1" data-testid="link-current-cv">
                    <FileText className="h-3.5 w-3.5" />
                    عرض الملف الحالي
                  </a>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      await updateCvUrl("");
                      toast({ title: "تم الحذف", description: "تم حذف السيرة الذاتية" });
                    }}
                    data-testid="button-remove-cv"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              روابط التواصل الاجتماعي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialLinks.map((link) => (
              <div key={link.id} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30" data-testid={`social-link-${link.id}`}>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium mb-1">{getPlatformLabel(link.platform)}</div>
                  <Input
                    defaultValue={link.url}
                    onBlur={(e) => {
                      if (e.target.value !== link.url) handleUpdateUrl(link.id, e.target.value);
                    }}
                    className="text-sm"
                    dir="ltr"
                    data-testid={`input-social-url-${link.id}`}
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleVisibility(link.id, link.visible)}
                    title={link.visible ? "إخفاء" : "إظهار"}
                    data-testid={`button-toggle-social-${link.id}`}
                  >
                    {link.visible ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteLink(link.id)}
                    data-testid={`button-delete-social-${link.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {socialLinks.length === 0 && !addingLink && (
              <p className="text-sm text-muted-foreground text-center py-4">لا توجد روابط تواصل اجتماعي بعد</p>
            )}

            {addingLink ? (
              <div className="p-4 rounded-lg border border-primary space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>المنصة</Label>
                    <Select value={newPlatform} onValueChange={setNewPlatform}>
                      <SelectTrigger data-testid="select-new-platform">
                        <SelectValue placeholder="اختر المنصة" />
                      </SelectTrigger>
                      <SelectContent>
                        {PLATFORMS.map(p => (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>الرابط</Label>
                    <Input
                      value={newUrl}
                      onChange={e => setNewUrl(e.target.value)}
                      placeholder="https://..."
                      dir="ltr"
                      data-testid="input-new-social-url"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => { setAddingLink(false); setNewPlatform(""); setNewUrl(""); }}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddLink} data-testid="button-save-new-social">
                    <Plus className="h-4 w-4 ml-1" />
                    إضافة
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" className="w-full gap-2" onClick={() => setAddingLink(true)} data-testid="button-add-social">
                <Plus className="h-4 w-4" />
                إضافة رابط جديد
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              تغيير كلمة المرور
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
              <div className="space-y-2">
                <Label>كلمة المرور الحالية</Label>
                <Input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="••••••••" data-testid="input-current-password" />
              </div>
              <div className="space-y-2">
                <Label>كلمة المرور الجديدة</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" data-testid="input-new-password" />
              </div>
              <div className="space-y-2">
                <Label>تأكيد كلمة المرور</Label>
                <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" data-testid="input-confirm-password" />
              </div>
            </div>
            <Button className="mt-4" onClick={handleChangePassword} disabled={changingPassword} data-testid="button-change-password">
              {changingPassword ? "جاري التغيير..." : "تغيير كلمة المرور"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
