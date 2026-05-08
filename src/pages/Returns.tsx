import { useState } from "react";
import {
  RotateCcw,
  ShieldCheck,
  Clock,
  CreditCard,
  PackageCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Send,
  ArrowRight,
  Truck,
  Scale,
} from "lucide-react";
import { toast } from "sonner";
import TopBar from "@/components/site/TopBar";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS = [
  { icon: FileText, title: "Completează formularul", desc: "Trimite cererea de retur cu datele comenzii." },
  { icon: PackageCheck, title: "Pregătește coletul", desc: "Ambalaj, etichete și sigilii intacte, cu factura." },
  { icon: Truck, title: "Expediere prin curier", desc: "Taxa de transport este suportată de cumpărător." },
  { icon: CreditCard, title: "Primește banii înapoi", desc: "În maxim 14 zile după acceptarea returului." },
];

const HIGHLIGHTS = [
  { icon: Clock, label: "14 zile", desc: "drept de retur fără motiv" },
  { icon: ShieldCheck, label: "Fără penalități", desc: "rambursare integrală a produselor" },
  { icon: Scale, label: "OG 34/2014", desc: "conform legislației în vigoare" },
];

const ACCEPTED = [
  "Produse în ambalajul original, cu etichetele intacte",
  "Însoțite de factură, certificat de garanție și manuale",
  "Notificare scrisă în maxim 14 zile de la primire",
  "Stare identică cu cea de la livrare",
];

const NOT_ACCEPTED = [
  "Produse comandate ferm cu plată în avans",
  "Sisteme fotovoltaice complete proiectate, livrate și montate",
  "Produse cu intervenții neautorizate",
  "Acumulatori cu urme de folosire pe borne",
];

const Returns = () => {
  const [sending, setSending] = useState(false);
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    productLink: "",
    iban: "",
    notes: "",
  });

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.email || !form.productLink || !form.iban) {
      toast.error("Te rugăm completează toate câmpurile obligatorii.");
      return;
    }
    if (!agree) {
      toast.error("Trebuie să accepți prelucrarea datelor personale.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", phone: "", address: "", email: "", productLink: "", iban: "", notes: "" });
      setAgree(false);
      toast.success("Cererea de retur a fost trimisă. Revenim în maxim 24h!");
    }, 1100);
  };

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
                  <RotateCcw className="h-3.5 w-3.5" /> Retur produse
                </span>
                <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05]">
                  Returnare <span className="text-accent">simplă</span> și rapidă
                </h1>
                <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl leading-relaxed">
                  Ai cumpărat sigur de pe www.solarhev.ro, iar procesul de retur este la fel de simplu.
                  Ai 14 zile la dispoziție pentru a returna produsele, fără a fi nevoie să furnizezi un motiv.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#formular">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent-glow rounded-full font-semibold shadow-glow">
                      <Send className="h-4 w-4 mr-2" /> Completează formularul
                    </Button>
                  </a>
                  <a href="#politica">
                    <Button size="lg" variant="outline" className="rounded-full bg-white/5 border-white/20 text-primary-foreground hover:bg-white/10">
                      <FileText className="h-4 w-4 mr-2" /> Politica de retur
                    </Button>
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-primary-foreground/70">
                  <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-eco" /> Fără penalități</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-eco" /> Rambursare în 14 zile</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-eco" /> Conform OG 34/2014</span>
                </div>
              </div>

              {/* Highlights card */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-solar opacity-20 blur-2xl rounded-3xl" />
                <div className="relative rounded-3xl bg-white/8 backdrop-blur-xl border border-white/15 p-7 shadow-elev">
                  <span className="text-xs uppercase tracking-wider text-primary-foreground/60">Pe scurt</span>
                  <h3 className="mt-3 text-2xl font-bold">Drepturile tale ca cumpărător</h3>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    Reglementat de OG 34/2014 și OG 38/2015 privind drepturile consumatorilor.
                  </p>

                  <div className="mt-6 space-y-3">
                    {HIGHLIGHTS.map((h) => (
                      <div key={h.label} className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                        <div className="h-10 w-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                          <h.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold">{h.label}</div>
                          <div className="text-xs text-primary-foreground/65">{h.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="container-x -mt-12 md:-mt-16 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.title}
                   className="group relative rounded-3xl bg-card border border-border p-6 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/10 group-hover:bg-accent/20 blur-2xl transition-colors" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-solar flex items-center justify-center shadow-glow">
                      <s.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <span className="text-3xl font-bold text-muted-foreground/30">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* POLICY */}
        <section id="politica" className="container-x section-y">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
            {/* Accepted vs Not accepted */}
            <div className="space-y-5">
              <div className="rounded-3xl bg-card border border-border p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-eco/15 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-eco" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Condiții acceptate la retur</h3>
                    <p className="text-xs text-muted-foreground">Produsele trebuie să respecte cerințele de mai jos</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {ACCEPTED.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-eco mt-0.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-card border border-border p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Produse care NU se acceptă</h3>
                    <p className="text-xs text-muted-foreground">Excepții conform politicii de retur</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {NOT_ACCEPTED.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-foreground">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-gradient-navy text-primary-foreground p-7 shadow-elev relative overflow-hidden">
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                <div className="relative">
                  <CreditCard className="h-8 w-8 text-accent" />
                  <h3 className="mt-4 text-xl font-bold">Rambursare</h3>
                  <p className="mt-2 text-sm text-primary-foreground/75 leading-relaxed">
                    Pentru plățile cu cardul, suma este returnată pe același card în <span className="text-accent font-semibold">1–30 de zile</span>.
                    În cazul transferului bancar, banii ajung în maxim <span className="text-accent font-semibold">14 zile</span> de la acceptarea returului.
                  </p>
                </div>
              </div>
            </div>

            {/* Long-form info */}
            <div className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-card">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-10 rounded-full bg-accent" />
                <span className="text-xs uppercase tracking-wider font-semibold text-accent">Politica de retur</span>
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Ce trebuie să știi</h2>

              <div className="mt-7 space-y-6 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                <p>
                  Ai achiziționat în mod sigur, simplu și rapid pe <span className="font-semibold text-foreground">www.solarhev.ro</span>,
                  iar procesul de returnare este la fel de simplu și rapid.
                </p>

                <div className="rounded-2xl bg-surface border border-border p-5">
                  <p className="text-foreground font-semibold mb-2 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-accent" /> Cadrul legal
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• <span className="text-foreground font-medium">OG 34/2014</span> — drepturile consumatorilor în contractele cu profesioniștii.</li>
                    <li>• <span className="text-foreground font-medium">OG 38/2015</span> — soluționarea alternativă a litigiilor între consumatori și comercianți.</li>
                  </ul>
                </div>

                <p>
                  Cumpărătorul are dreptul să notifice în scris comerciantul despre intenția de a returna produsele
                  în <span className="text-foreground font-semibold">14 zile</span> de la primirea acestora,
                  fără a fi nevoie să furnizeze un motiv și fără penalități.
                </p>

                <div className="flex gap-3 rounded-2xl bg-accent/5 border border-accent/20 p-5">
                  <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    Taxa de livrare a produselor returnate este suportată exclusiv de către clientul final.
                    Se va returna doar suma corespunzătoare produselor, nu și costul transportului.
                  </p>
                </div>

                <p>
                  Produsele returnate trebuie să fie în aceeași stare în care au fost livrate, cu ambalajul,
                  etichetele și sigiliile intacte, și să fie însoțite de factura fiscală, dovada plății,
                  certificatul de garanție, manualul și documentația tehnică.
                </p>

                <p>
                  În cazul achiziționării a mai multor produse identice, acestea pot fi returnate doar dacă unul
                  dintre ele a fost desigilat. Cumpărătorul este responsabil pentru orice diminuare a valorii
                  produselor cauzată de manipularea necorespunzătoare.
                </p>

                <p>
                  Anularea unei tranzacții este posibilă dacă comanda nu a fost încă livrată, iar banca emitentă
                  va debloca suma blocată în contul cumpărătorului în 1–30 de zile, în funcție de politica acesteia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FORM */}
        <section id="formular" className="container-x pb-20">
          <div className="rounded-3xl overflow-hidden border border-border shadow-elev bg-card">
            <div className="grid lg:grid-cols-[1fr_1.6fr]">
              {/* Side */}
              <div className="p-8 md:p-10 bg-gradient-navy text-primary-foreground relative overflow-hidden">
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-eco/20 blur-3xl" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider">
                    <Send className="h-3.5 w-3.5" /> Formular retur
                  </span>
                  <h3 className="mt-5 text-2xl md:text-3xl font-bold">Completează cererea de retur</h3>
                  <p className="mt-3 text-primary-foreground/75 leading-relaxed">
                    Echipa noastră îți va răspunde prin email după evaluarea solicitării.
                    În caz de acceptare, vei primi suma datorată în maxim 14 zile.
                  </p>

                  <div className="mt-8 space-y-3">
                    <a href="tel:+40775311632" className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 transition-colors">
                      <Phone className="h-4 w-4 text-accent" />
                      <span className="text-sm font-semibold">+40.775.311.632</span>
                    </a>
                    <a href="mailto:office@solarhev.ro" className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 transition-colors">
                      <Mail className="h-4 w-4 text-accent" />
                      <span className="text-sm font-semibold">office@solarhev.ro</span>
                    </a>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-eco shrink-0 mt-0.5" />
                    <p className="text-xs text-primary-foreground/70">
                      Datele tale sunt protejate și folosite exclusiv pentru procesarea returului,
                      conform Politicii de confidențialitate.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="p-8 md:p-10 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="r-name">Nume / Prenume *</Label>
                    <Input id="r-name" value={form.name} onChange={upd("name")} placeholder="Ion Popescu"
                           className="rounded-xl h-12 bg-surface border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-phone">Nr. telefon *</Label>
                    <Input id="r-phone" value={form.phone} onChange={upd("phone")} placeholder="+40 7xx xxx xxx"
                           className="rounded-xl h-12 bg-surface border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="r-address">Adresă ridicare retur *</Label>
                  <Input id="r-address" value={form.address} onChange={upd("address")} placeholder="Str., nr., oraș, județ, cod poștal"
                         className="rounded-xl h-12 bg-surface border-border" />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="r-email">Email *</Label>
                    <Input id="r-email" type="email" value={form.email} onChange={upd("email")} placeholder="ion@exemplu.ro"
                           className="rounded-xl h-12 bg-surface border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-link">Link produs *</Label>
                    <Input id="r-link" value={form.productLink} onChange={upd("productLink")} placeholder="https://solarhev.ro/produs/..."
                           className="rounded-xl h-12 bg-surface border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="r-iban">Cont bancar (IBAN) pentru returnare contravaloare comandă *</Label>
                  <Input id="r-iban" value={form.iban} onChange={upd("iban")} placeholder="RO00 XXXX 0000 0000 0000 0000"
                         className="rounded-xl h-12 bg-surface border-border font-mono" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="r-notes">Mențiuni (opțional)</Label>
                  <Textarea id="r-notes" value={form.notes} onChange={upd("notes")} rows={4}
                            placeholder="Detalii suplimentare despre retur..."
                            className="rounded-xl bg-surface border-border resize-none" />
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-surface border border-border p-4">
                  <Checkbox id="r-agree" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} className="mt-0.5" />
                  <Label htmlFor="r-agree" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    Sunt de acord cu prelucrarea datelor personale conform{" "}
                    <span className="text-accent font-semibold underline-offset-2 hover:underline">
                      Politicii de confidențialitate
                    </span>{" "}
                    a magazinului.
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted-foreground">
                    Câmpurile marcate cu * sunt obligatorii.
                  </p>
                  <Button type="submit" size="lg" disabled={sending}
                          className="rounded-full bg-gradient-solar text-accent-foreground hover:opacity-90 font-semibold shadow-glow px-8">
                    {sending ? "Se trimite..." : (<><Send className="h-4 w-4 mr-2" /> Trimite cererea</>)}
                    {!sending && <ArrowRight className="h-4 w-4 ml-1" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Returns;
