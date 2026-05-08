import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Building2, FileText, Send, MessageCircle, Facebook, Instagram, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import TopBar from "@/components/site/TopBar";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SCHEDULE = [
  { day: "Luni – Vineri", hours: "08:00 – 17:00", open: true },
  { day: "Sâmbătă", hours: "Închis", open: false },
  { day: "Duminică", hours: "Închis", open: false },
];

const COMPANY = [
  { label: "Denumire", value: "SC. Solar Hev S.R.L", icon: Building2 },
  { label: "CUI", value: "46325914", icon: FileText },
  { label: "Reg. Comerțului", value: "J05/1743/2022", icon: FileText },
];

const Contact = () => {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Te rugăm completează numele, emailul și mesajul.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      toast.success("Mesajul tău a fost trimis. Revenim în maxim 24h!");
    }, 1100);
  };

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-navy text-primary-foreground">
          <div className="absolute inset-0 bg-sun-glow opacity-60" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-sun-pulse" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-eco/20 blur-3xl" />

          <div className="container-x relative py-20 md:py-28">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider">
                  <MessageCircle className="h-3.5 w-3.5" /> Suntem aici pentru tine
                </span>
                <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05]">
                  Hai să discutăm despre <span className="text-accent">proiectul</span> tău solar
                </h1>
                <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl leading-relaxed">
                  Echipa SolarHev îți răspunde rapid pe telefon, email sau direct la magazinul fizic
                  din Salonta. Consultanță gratuită, ofertă personalizată și suport tehnic dedicat.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="tel:+40775311632">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent-glow rounded-full font-semibold shadow-glow">
                      <Phone className="h-4 w-4 mr-2" /> Sună acum
                    </Button>
                  </a>
                  <a href="mailto:office@solarhev.ro">
                    <Button size="lg" variant="outline" className="rounded-full bg-white/5 border-white/20 text-primary-foreground hover:bg-white/10">
                      <Mail className="h-4 w-4 mr-2" /> Trimite email
                    </Button>
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-primary-foreground/70">
                  <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-eco" /> Răspuns în max. 24h</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-eco" /> Consultanță gratuită</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-eco" /> Ofertă personalizată</span>
                </div>
              </div>

              {/* Live status card */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-solar opacity-20 blur-2xl rounded-3xl" />
                <div className="relative rounded-3xl bg-white/8 backdrop-blur-xl border border-white/15 p-7 shadow-elev">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-primary-foreground/60">Status echipă</span>
                    <span className="flex items-center gap-2 text-xs font-semibold text-eco">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-eco opacity-60 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-eco" />
                      </span>
                      ONLINE
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold">Suntem disponibili acum</h3>
                  <p className="mt-1 text-sm text-primary-foreground/70">Timp mediu de răspuns: <span className="text-accent font-semibold">~12 minute</span></p>

                  <div className="mt-6 space-y-3">
                    {SCHEDULE.map((s) => (
                      <div key={s.day} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                        <span className="text-sm font-medium">{s.day}</span>
                        <span className={`text-sm font-semibold ${s.open ? "text-eco" : "text-primary-foreground/50"}`}>
                          {s.hours}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3 pt-5 border-t border-white/10">
                    <span className="text-xs text-primary-foreground/60">Urmărește-ne:</span>
                    <a href="#" className="h-9 w-9 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a href="#" className="h-9 w-9 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                      <Instagram className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK INFO CARDS */}
        <section className="container-x -mt-12 md:-mt-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Phone, label: "Telefon", value: "+40.775.311.632", href: "tel:+40775311632", sub: "Lun–Vin · 08:00–17:00" },
              { icon: Mail, label: "Email", value: "office@solarhev.ro", href: "mailto:office@solarhev.ro", sub: "Răspuns în max. 24h" },
              { icon: MapPin, label: "Magazin fizic", value: "Salonta, Bihor", href: "#harta", sub: "Str. Regele Ferdinand 6" },
            ].map((c) => (
              <a key={c.label} href={c.href}
                 className="group relative rounded-3xl bg-card border border-border p-6 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/10 group-hover:bg-accent/20 blur-2xl transition-colors" />
                <div className="relative flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-solar flex items-center justify-center shadow-glow shrink-0">
                    <c.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{c.label}</div>
                    <div className="mt-1 text-lg font-bold text-foreground truncate">{c.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{c.sub}</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* FORM + COMPANY */}
        <section className="container-x section-y">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
            {/* Form */}
            <div className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-card">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-10 rounded-full bg-accent" />
                <span className="text-xs uppercase tracking-wider font-semibold text-accent">Trimite-ne un mesaj</span>
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Hai să vorbim</h2>
              <p className="mt-2 text-muted-foreground">
                Completează formularul și un consultant SolarHev te va contacta în cel mai scurt timp.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nume complet *</Label>
                    <Input id="name" value={form.name} onChange={upd("name")} placeholder="Ion Popescu"
                           className="rounded-xl h-12 bg-surface border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={upd("email")} placeholder="ion@exemplu.ro"
                           className="rounded-xl h-12 bg-surface border-border" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" value={form.phone} onChange={upd("phone")} placeholder="+40 7xx xxx xxx"
                           className="rounded-xl h-12 bg-surface border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subiect</Label>
                    <Input id="subject" value={form.subject} onChange={upd("subject")} placeholder="Ofertă sistem fotovoltaic"
                           className="rounded-xl h-12 bg-surface border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mesajul tău *</Label>
                  <Textarea id="message" value={form.message} onChange={upd("message")} rows={6}
                            placeholder="Spune-ne câteva detalii despre proiectul tău..."
                            className="rounded-xl bg-surface border-border resize-none" />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted-foreground max-w-md">
                    Prin trimiterea formularului ești de acord cu prelucrarea datelor conform politicii de confidențialitate.
                  </p>
                  <Button type="submit" size="lg" disabled={sending}
                          className="rounded-full bg-gradient-solar text-accent-foreground hover:opacity-90 font-semibold shadow-glow px-8">
                    {sending ? "Se trimite..." : (<><Send className="h-4 w-4 mr-2" /> Trimite mesajul</>)}
                  </Button>
                </div>
              </form>
            </div>

            {/* Company sidebar */}
            <aside className="space-y-5">
              <div className="rounded-3xl bg-gradient-navy text-primary-foreground p-8 shadow-elev relative overflow-hidden">
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                <div className="relative">
                  <Building2 className="h-8 w-8 text-accent" />
                  <h3 className="mt-4 text-xl font-bold">Date companie</h3>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    Site-ul www.solarhev.ro este proprietatea SC. Solar Hev S.R.L
                  </p>

                  <div className="mt-6 space-y-3">
                    {COMPANY.map((c) => (
                      <div key={c.label} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                        <span className="text-xs uppercase tracking-wider text-primary-foreground/60">{c.label}</span>
                        <span className="text-sm font-semibold">{c.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-card border border-border p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-eco/15 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-eco" />
                  </div>
                  <h3 className="text-lg font-bold">Program de lucru</h3>
                </div>
                <div className="mt-5 space-y-2.5">
                  {SCHEDULE.map((s) => (
                    <div key={s.day} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm font-medium text-foreground">{s.day}</span>
                      <span className={`text-sm font-semibold ${s.open ? "text-eco" : "text-muted-foreground"}`}>
                        {s.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-solar p-7 shadow-glow text-accent-foreground">
                <MessageCircle className="h-7 w-7" />
                <h3 className="mt-3 text-lg font-bold">Ai nevoie urgent de ajutor?</h3>
                <p className="mt-1 text-sm opacity-80">Sună-ne direct pentru un răspuns instant.</p>
                <a href="tel:+40775311632" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">
                  <Phone className="h-4 w-4" /> +40.775.311.632
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* MAP */}
        <section id="harta" className="container-x pb-20">
          <div className="rounded-3xl overflow-hidden border border-border shadow-elev bg-card">
            <div className="grid md:grid-cols-[1fr_2fr]">
              <div className="p-8 md:p-10 bg-gradient-navy text-primary-foreground relative overflow-hidden">
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider">
                    <MapPin className="h-3.5 w-3.5" /> Magazin fizic
                  </span>
                  <h3 className="mt-5 text-2xl font-bold">Vino să ne vizitezi</h3>
                  <p className="mt-3 text-primary-foreground/75 leading-relaxed">
                    Strada Regele Ferdinand 6,<br />
                    415500 Salonta, Bihor,<br />
                    România
                  </p>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Strada+Regele+Ferdinand+6+Salonta+Bihor"
                    target="_blank" rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold hover:bg-accent-glow transition-colors shadow-glow"
                  >
                    Deschide în Google Maps <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="min-h-[360px] md:min-h-[460px]">
                <iframe
                  title="SolarHev — Salonta"
                  src="https://www.google.com/maps?q=Strada%20Regele%20Ferdinand%206%2C%20Salonta%2C%20Bihor&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
