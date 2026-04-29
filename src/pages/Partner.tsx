import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Handshake,
  Crown,
  Gem,
  CheckCircle2,
  TrendingUp,
  Headphones,
  Truck,
  Sparkles,
  ShieldCheck,
  Rocket,
  Users,
  BadgePercent,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  User as UserIcon,
  Lock,
  Globe,
  MapPin,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const TIERS = [
  {
    id: "partner",
    name: "Partner",
    discount: "12%",
    range: "15.000 — 50.000 RON / lună",
    icon: Handshake,
    tone: "from-sky-50 to-sky-100/60 border-sky-200/70",
    iconBg: "bg-sky-500/10 text-sky-600",
    rangeBg: "bg-sky-100 text-sky-700",
    perks: [
      "Prețuri preferențiale la întreg catalogul",
      "Suport tehnic dedicat prin email",
      "Acces la materiale de marketing",
      "Plată la 14 zile după livrare",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    discount: "17%",
    range: "50.000 — 100.000 RON / lună",
    icon: Crown,
    featured: true,
    tone: "from-accent/15 to-accent/5 border-accent/40",
    iconBg: "bg-accent/20 text-accent-foreground",
    rangeBg: "bg-accent/20 text-foreground",
    perks: [
      "Toate beneficiile Partner",
      "Manager de cont dedicat",
      "Livrare prioritară națională",
      "Training tehnic gratuit lunar",
      "Plată la 30 zile după livrare",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    discount: "21%",
    range: "100.000+ RON / lună",
    icon: Gem,
    tone: "from-violet-50 to-violet-100/60 border-violet-200/70",
    iconBg: "bg-violet-500/10 text-violet-600",
    rangeBg: "bg-violet-100 text-violet-700",
    badge: "BEST VALUE",
    perks: [
      "Toate beneficiile Premium",
      "Acces anticipat la produse noi",
      "Stoc rezervat pentru proiecte mari",
      "Co-branding pe campanii naționale",
      "Linie de credit comercială extinsă",
    ],
  },
];

const REASONS = [
  {
    icon: BadgePercent,
    title: "Marje de până la 21%",
    desc: "Reduceri progresive în funcție de volum, aplicate automat lunar pe întreg catalogul.",
  },
  {
    icon: Truck,
    title: "Livrare rapidă, gratuită",
    desc: "Stoc real în depozite proprii. Livrare în 24-72h în toată România, fără costuri ascunse.",
  },
  {
    icon: ShieldCheck,
    title: "Branduri premium",
    desc: "AIKO, Huawei, Deye, Sungrow și alte branduri TIER 1, cu garanție extinsă până la 30 ani.",
  },
  {
    icon: Headphones,
    title: "Suport tehnic 7/7",
    desc: "Echipă de ingineri dedicată parteneri. Răspuns în maxim 2 ore în orele de program.",
  },
  {
    icon: Rocket,
    title: "Onboarding rapid",
    desc: "Activarea contului de partener în mai puțin de 24h de la aprobare. Fără birocrație.",
  },
  {
    icon: TrendingUp,
    title: "Creștere predictibilă",
    desc: "Discount-urile cresc automat când treci la nivelul următor. Fără negocieri lunare.",
  },
];

const STEPS = [
  { n: "01", title: "Aplici online", desc: "Completezi formularul de mai jos cu datele firmei. Durează ~3 minute." },
  { n: "02", title: "Verificare în 24h", desc: "Echipa noastră îți verifică datele și te contactează telefonic." },
  { n: "03", title: "Activare cont", desc: "Primești credențialele și începi să comanzi cu prețuri preferențiale." },
  { n: "04", title: "Crești nivelul", desc: "Cu cât comanzi mai mult, cu atât discount-ul tău crește automat." },
];

const FAQ = [
  {
    q: "Cine poate deveni partener Devino?",
    a: "Orice firmă activă în România cu CUI valid: instalatori, magazine de bricolaj, integratori solari, electricieni autorizați ANRE și companii de construcții.",
  },
  {
    q: "Există un volum minim de comandă?",
    a: "Nu există un minim per comandă, dar nivelul de partener se actualizează lunar pe baza volumului total. Minimul pentru tier Partner este 15.000 RON / lună.",
  },
  {
    q: "Cât durează aprobarea contului?",
    a: "În maxim 24h lucrătoare de la trimiterea formularului primești un răspuns. Activarea efectivă a contului durează încă 24h după acceptare.",
  },
  {
    q: "Pot urca de la Partner la Premium sau Elite?",
    a: "Da, automat. Sistemul nostru evaluează volumul ultimelor 3 luni și te promovează la nivelul superior fără să fie nevoie să soliciți acest lucru.",
  },
  {
    q: "Ce condiții de plată am?",
    a: "Partner: 14 zile. Premium: 30 zile. Elite: 30-60 zile, în funcție de istoricul de plată și volum.",
  },
];

const Partner = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <Reasons />
        <Tiers />
        <HowItWorks />
        <RegisterForm />
        <Faq openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

/* ---------------- HERO ---------------- */
const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-navy text-primary-foreground">
    <div className="absolute inset-0 bg-sun-glow opacity-60" />
    <div
      className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-accent/30 blur-[120px] animate-sun-pulse"
      aria-hidden
    />
    <div
      className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]"
      aria-hidden
    />
    <div className="container-x relative section-y grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Program partener Devino
        </span>
        <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-balance">
          Construiește un <span className="text-accent">business solar</span> alături de noi.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/75 max-w-2xl leading-relaxed">
          Devino partener oficial Devino și beneficiază de prețuri preferențiale, suport tehnic dedicat și acces la cele
          mai puternice branduri din industrie. Trei niveluri, marje de până la 21%, fără birocrație.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#aplica"
            className="group inline-flex h-14 items-center gap-3 px-8 rounded-full bg-accent text-accent-foreground font-bold text-base shadow-glow hover:shadow-[0_25px_70px_-10px_hsl(43_100%_50%/0.6)] transition-all hover:-translate-y-0.5"
          >
            Aplică acum
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#niveluri"
            className="inline-flex h-14 items-center gap-3 px-8 rounded-full border border-primary-foreground/25 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
          >
            Vezi nivelurile
          </a>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl">
          {[
            { v: "850+", l: "Parteneri activi" },
            { v: "21%", l: "Discount maxim" },
            { v: "24h", l: "Aprobare cont" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl md:text-4xl font-extrabold text-accent">{s.v}</div>
              <div className="text-xs uppercase tracking-wider text-primary-foreground/60 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5 relative">
        <div className="relative rounded-3xl bg-primary-foreground/[0.04] border border-primary-foreground/10 backdrop-blur-xl p-8 shadow-2xl">
          <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest">
            Live
          </div>
          <div className="space-y-4">
            {[
              { name: "Electro Instal SRL", tier: "Elite", amount: "+ 142.500 RON" },
              { name: "Solar Pro Group", tier: "Premium", amount: "+ 78.200 RON" },
              { name: "EcoMontaj 2020", tier: "Partner", amount: "+ 23.900 RON" },
            ].map((p, i) => (
              <div
                key={p.name}
                className="flex items-center gap-4 p-4 rounded-2xl bg-primary-foreground/[0.04] border border-primary-foreground/10"
                style={{ animation: `fade-in 0.6s ease-out ${i * 0.15}s both` }}
              >
                <div className="h-11 w-11 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  {p.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{p.name}</div>
                  <div className="text-xs text-primary-foreground/60">Nivel {p.tier}</div>
                </div>
                <div className="text-sm font-bold text-accent">{p.amount}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-accent/10 border border-accent/30">
            <div className="text-xs uppercase tracking-widest text-accent font-bold">Total comandat luna aceasta</div>
            <div className="font-display text-3xl font-extrabold mt-1">12.4M RON</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- REASONS ---------------- */
const Reasons = () => (
  <section className="section-y bg-background">
    <div className="container-x">
      <div className="max-w-3xl">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">
          De ce să devii revânzător?
        </span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
          Mai mult decât un furnizor — un <span className="text-accent">partener de creștere</span>.
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Lucrăm cu instalatori, integratori și magazine specializate care vor să ofere clienților lor doar branduri
          premium, la prețuri imbatabile.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REASONS.map((r, i) => (
          <div
            key={r.title}
            className="group relative p-8 rounded-3xl bg-card border border-border hover:border-accent/40 hover:shadow-elev transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <r.icon className="h-7 w-7" />
              </div>
              <div className="mt-6 text-xs font-bold text-muted-foreground/70">0{i + 1}</div>
              <h3 className="mt-1 font-display text-xl font-bold">{r.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- TIERS ---------------- */
const Tiers = () => (
  <section id="niveluri" className="section-y bg-surface">
    <div className="container-x">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">
          Niveluri de parteneriat
        </span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
          Cu cât comanzi mai mult, cu atât <span className="text-accent">câștigi mai mult</span>.
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Nivelul tău se actualizează automat lunar, în funcție de volumul comandat în ultimele 3 luni.
        </p>
      </div>

      <div className="mt-14 grid lg:grid-cols-3 gap-6 lg:gap-8">
        {TIERS.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className={`relative rounded-3xl border-2 bg-gradient-to-br ${t.tone} p-8 transition-all hover:-translate-y-2 ${
                t.featured ? "lg:scale-105 shadow-glow" : "hover:shadow-elev"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow-md">
                  Cel mai popular
                </div>
              )}
              {t.badge && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-violet-600 text-white text-[10px] font-bold uppercase tracking-widest">
                  {t.badge}
                </div>
              )}

              <div className={`h-16 w-16 rounded-2xl ${t.iconBg} flex items-center justify-center`}>
                <Icon className="h-8 w-8" />
              </div>

              <h3 className="mt-6 font-display text-2xl font-extrabold">{t.name}</h3>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-6xl font-extrabold text-primary">-{t.discount}</span>
              </div>
              <div className="text-sm text-muted-foreground">pe toate produsele</div>

              <div className={`mt-5 inline-block px-4 py-2 rounded-full text-sm font-semibold ${t.rangeBg}`}>
                {t.range}
              </div>

              <ul className="mt-8 space-y-3">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-eco shrink-0 mt-0.5" />
                    <span className="text-foreground/85">{p}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#aplica"
                className={`mt-8 inline-flex w-full h-12 items-center justify-center gap-2 rounded-full font-bold transition-all ${
                  t.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                    : "bg-card border border-border hover:border-accent/50 text-foreground"
                }`}
              >
                Aplică pentru {t.name}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------- HOW IT WORKS ---------------- */
const HowItWorks = () => (
  <section className="section-y bg-background">
    <div className="container-x">
      <div className="max-w-3xl">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">Cum funcționează</span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
          De la aplicație la prima comandă în <span className="text-accent">48h</span>.
        </h2>
      </div>

      <div className="mt-14 relative">
        <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="relative">
              <div className="relative h-24 w-24 mx-auto">
                <div className="absolute inset-0 rounded-full bg-accent/10 animate-sun-pulse" />
                <div className="relative h-24 w-24 rounded-full bg-card border-2 border-accent flex items-center justify-center font-display text-2xl font-extrabold text-accent shadow-md">
                  {s.n}
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- REGISTER FORM ---------------- */
const RegisterForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Cererea a fost trimisă!", {
        description: "Te contactăm telefonic în următoarele 24 de ore.",
      });
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <section id="aplica" className="section-y bg-surface">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">Aplică acum</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
                Completează formularul.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Echipa noastră îți răspunde în maxim 24 de ore lucrătoare. Toate datele sunt confidențiale și folosite
                doar pentru evaluarea cererii.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  { i: ShieldCheck, t: "Date 100% confidențiale" },
                  { i: Users, t: "Manager dedicat din ziua 1" },
                  { i: Sparkles, t: "Fără costuri de înscriere" },
                ].map((b) => (
                  <li key={b.t} className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                      <b.i className="h-5 w-5" />
                    </span>
                    <span className="font-medium">{b.t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 p-6 rounded-3xl bg-gradient-navy text-primary-foreground relative overflow-hidden">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/30 blur-2xl" />
                <div className="relative">
                  <div className="text-xs uppercase tracking-widest text-accent font-bold">Ai întrebări?</div>
                  <div className="mt-2 font-display text-xl font-bold">Sună un consultant</div>
                  <a
                    href="tel:+40775311632"
                    className="mt-3 inline-flex items-center gap-2 text-accent font-bold text-lg"
                  >
                    <Phone className="h-5 w-5" />
                    +40.775.311.632
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 rounded-3xl bg-card border border-border shadow-card p-8 md:p-10 space-y-10"
          >
            {/* Personal */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                  <UserIcon className="h-4 w-4" />
                </span>
                <h3 className="font-display text-xl font-bold">Date de contact</h3>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-5">
                <Field label="Nume" required>
                  <Input required placeholder="Popescu" className="h-12 rounded-xl" />
                </Field>
                <Field label="Prenume" required>
                  <Input required placeholder="Ion" className="h-12 rounded-xl" />
                </Field>
                <Field label="Email" required icon={Mail}>
                  <Input required type="email" placeholder="email@firma.ro" className="h-12 rounded-xl pl-11" />
                </Field>
                <Field label="Telefon" required icon={Phone}>
                  <Input required type="tel" placeholder="07XX XXX XXX" className="h-12 rounded-xl pl-11" />
                </Field>
                <Field label="Parolă" required icon={Lock} className="md:col-span-2">
                  <Input required type="password" placeholder="Minim 8 caractere" className="h-12 rounded-xl pl-11" />
                </Field>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Company */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                  <Building2 className="h-4 w-4" />
                </span>
                <h3 className="font-display text-xl font-bold">Date firmă</h3>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-5">
                <Field label="Nume firmă" required className="md:col-span-2">
                  <Input required placeholder="SC Firma SRL" className="h-12 rounded-xl" />
                </Field>
                <Field label="CUI" required>
                  <Input required placeholder="RO12345678" className="h-12 rounded-xl" />
                </Field>
                <Field label="Nr. Reg. Com.">
                  <Input placeholder="J40/1234/2020" className="h-12 rounded-xl" />
                </Field>
                <Field label="Tip activitate" required className="md:col-span-2">
                  <div className="relative">
                    <select
                      required
                      className="h-12 w-full rounded-xl border border-input bg-background px-4 pr-10 text-sm appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selectează tipul activității
                      </option>
                      <option>Instalator fotovoltaic</option>
                      <option>Magazin specializat</option>
                      <option>Integrator EPC</option>
                      <option>Electrician autorizat ANRE</option>
                      <option>Construcții / Bricolaj</option>
                      <option>Altă activitate</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </Field>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Address */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </span>
                <h3 className="font-display text-xl font-bold">Adresă firmă</h3>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-5">
                <Field label="Țară">
                  <Input defaultValue="România" disabled className="h-12 rounded-xl bg-muted" />
                </Field>
                <Field label="Județ" required>
                  <div className="relative">
                    <select
                      required
                      className="h-12 w-full rounded-xl border border-input bg-background px-4 pr-10 text-sm appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selectează județul
                      </option>
                      {["București", "Cluj", "Timiș", "Iași", "Brașov", "Constanța", "Sibiu", "Mureș"].map((j) => (
                        <option key={j}>{j}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </Field>
                <Field label="Oraș / Localitate" required>
                  <Input required placeholder="Ex: Cluj-Napoca" className="h-12 rounded-xl" />
                </Field>
                <Field label="Cod poștal">
                  <Input placeholder="Ex: 010101" className="h-12 rounded-xl" />
                </Field>
                <Field label="Adresă completă" required className="md:col-span-2">
                  <Input
                    required
                    placeholder="Str. Principală nr. 1, bl. A, sc. 2, ap. 10"
                    className="h-12 rounded-xl"
                  />
                </Field>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Motivation */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </span>
                <h3 className="font-display text-xl font-bold">Despre planul tău</h3>
              </div>
              <div className="mt-6 grid gap-5">
                <Field label="De ce dorești să devii revânzător?">
                  <Textarea
                    placeholder="Descrie pe scurt activitatea ta și planul de vânzare..."
                    className="min-h-32 rounded-xl"
                  />
                </Field>
                <Field label="Website (opțional)" icon={Globe}>
                  <Input placeholder="https://www.firma-ta.ro" className="h-12 rounded-xl pl-11" />
                </Field>
              </div>

              <label className="mt-6 flex items-start gap-3 cursor-pointer text-sm">
                <input
                  required
                  type="checkbox"
                  className="mt-0.5 h-5 w-5 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-muted-foreground">
                  Sunt de acord cu{" "}
                  <Link to="/termeni" className="text-accent font-semibold hover:underline">
                    Termenii și Condițiile
                  </Link>{" "}
                  programului de parteneriat și cu prelucrarea datelor conform GDPR.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base shadow-glow hover:shadow-[0_25px_70px_-10px_hsl(43_100%_50%/0.6)] transition-all hover:-translate-y-0.5"
            >
              {submitting ? "Se trimite..." : "Trimite cererea"}
              {!submitting && <ArrowRight className="h-5 w-5" />}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  children,
  required,
  className,
  icon: Icon,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) => (
  <div className={className}>
    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <div className="mt-2 relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />}
      {children}
    </div>
  </div>
);

/* ---------------- FAQ ---------------- */
const Faq = ({
  openFaq,
  setOpenFaq,
}: {
  openFaq: number | null;
  setOpenFaq: (n: number | null) => void;
}) => (
  <section className="section-y bg-background">
    <div className="container-x grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">Întrebări frecvente</span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
          Răspunsuri rapide la ce te interesează.
        </h2>
        <p className="mt-5 text-muted-foreground">
          Nu găsești răspunsul? Scrie-ne la{" "}
          <a href="mailto:parteneri@solarhev.ro" className="text-accent font-semibold hover:underline">
            parteneri@solarhev.ro
          </a>
        </p>
      </div>
      <div className="lg:col-span-8 space-y-3">
        {FAQ.map((f, i) => {
          const open = openFaq === i;
          return (
            <div
              key={f.q}
              className={`rounded-2xl border transition-all ${
                open ? "border-accent/40 bg-surface shadow-card" : "border-border bg-card hover:border-border/80"
              }`}
            >
              <button
                onClick={() => setOpenFaq(open ? null : i)}
                className="w-full flex items-center gap-4 p-6 text-left"
              >
                <span className="flex-1 font-display text-lg font-bold">{f.q}</span>
                <span
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    open ? "bg-accent text-accent-foreground" : "bg-surface text-foreground"
                  }`}
                >
                  {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              {open && <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------- CTA STRIP ---------------- */
const CtaStrip = () => (
  <section className="pb-24">
    <div className="container-x">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-navy p-10 md:p-16 text-primary-foreground">
        <div className="absolute inset-0 bg-sun-glow opacity-50" />
        <div
          className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/40 blur-[100px] animate-sun-pulse"
          aria-hidden
        />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight text-balance">
              Gata să crești alături de cel mai mare distribuitor solar din România?
            </h2>
            <p className="mt-4 text-primary-foreground/75">
              Aplică acum și activează contul de partener în mai puțin de 48 de ore.
            </p>
          </div>
          <div className="md:justify-self-end flex flex-wrap gap-4">
            <a
              href="#aplica"
              className="inline-flex h-14 items-center gap-3 px-8 rounded-full bg-accent text-accent-foreground font-bold shadow-glow hover:-translate-y-0.5 transition-all"
            >
              Aplică acum
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="tel:+40775311632"
              className="inline-flex h-14 items-center gap-3 px-8 rounded-full border border-primary-foreground/25 hover:bg-primary-foreground/10 font-semibold transition-colors"
            >
              <Phone className="h-5 w-5" />
              Sună consultant
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Partner;
