import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useData } from "@/lib/data-context";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  purpose: z.string(),
  message: z.string().min(10),
});

export default function Contact() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { addMessage } = useData();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addMessage(values);
    toast({
      title: t('contact.success'),
      description: t('contact.success.desc'),
    });
    form.reset();
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      <main className="py-20">
        <div className="container px-4 md:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4 text-white">{t('contact.title')}</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-xl p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                <h3 className="text-xl font-heading font-bold mb-2">{t('contact.info')}</h3>
                <p className="text-white/70 text-sm mb-6">{t('contact.info.desc')}</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-80">{t('contact.label.email')}</p>
                      <p className="font-semibold">elrizougi@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-80">Phone</p>
                      <p className="font-semibold" dir="ltr">+966 550 593 554</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-80">Location</p>
                      <p className="font-semibold">Riyadh, Saudi Arabia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-heading font-bold text-white mb-1">{t('contact.form.title')}</h3>
                <p className="text-slate-500 text-sm mb-6">{t('contact.form.desc')}</p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">{t('contact.label.name')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('contact.placeholder.name')} {...field} className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-600 focus:border-indigo-500/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">{t('contact.label.email')}</FormLabel>
                            <FormControl>
                              <Input placeholder="name@example.com" {...field} className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-600 focus:border-indigo-500/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="purpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">{t('contact.label.purpose')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-white">
                                <SelectValue placeholder={t('contact.placeholder.purpose')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#111132] border-slate-700/50">
                              <SelectItem value="project">{t('contact.purpose.project')}</SelectItem>
                              <SelectItem value="hiring">{t('contact.purpose.hiring')}</SelectItem>
                              <SelectItem value="consultation">{t('contact.purpose.consultation')}</SelectItem>
                              <SelectItem value="partnership">{t('contact.purpose.partnership')}</SelectItem>
                              <SelectItem value="other">{t('contact.purpose.other')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">{t('contact.label.message')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={t('contact.placeholder.message')} 
                              className="min-h-[150px] resize-none bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-600 focus:border-indigo-500/50" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-l from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25">
                      {t('contact.submit')} <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
