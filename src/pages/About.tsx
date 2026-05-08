import { useEffect, useRef, useState } from "react";
import {
  Sun,
  Users,
  Award,
  Leaf,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";

const STATS = [
  { end: 15, suffix: "+", label: "Ani de experiență", icon: TrendingUp },
  { end: 500, suffix: "+", label: "Instalări finalizate", icon: Users },
  { end: 98, suffix: "%", label: "Clienți mulțumiți", icon: Award },
  { end: 2.5, suffix: " MW", label: "Putere instalată", icon: Zap, decimals: 1 },
];

const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    title: "Experiență Solidă",
    desc: "Cu peste 15 ani de experiență în industrie, am acumulat cunoștințe profunde și am dezvoltat parteneriate solide pentru a oferi cele mai bune soluții clienților noștri.",
  },
  {
    icon: Sun,
    title: "Gama Variată de Produse",
    desc: "Suntem specializați în comercializarea panourilor fotovoltaice de ultimă generație, adaptate nevoilor specifice ale fiecărui client. Performanță superioară și tehnologie avansată.",
  },
  {
    icon: Wrench,
    title: "Servicii Complete",
    desc: "Nu suntem doar furnizori de panouri fotovoltaice; suntem partenerii tăi în întregul proces, de la consilierea inițială, proiectare și instalare, până la întreținere și servicii post-vânzare.",
  },
  {
    icon: Leaf,
    title: "Sustenabilitate și Economie",
    desc: "Ne concentrăm asupra creării unor soluții care nu doar reduc factura de energie, ci și contribuie la protejarea mediului înconjurător. Energie verde pentru un viitor mai curat!",
  },
  {
    icon: Award,
    title: "Angajament față de Calitate",
    desc: "Fiecare proiect este abordat cu cea mai mare atenție la detalii, asigurându-ne că fiecare sistem solar instalat este optimizat pentru performanță maximă și durabilitate pe termen lung.",
  },
];

const VALUES = [
  "Soluții durabile și eficiente energetic",
  "Inovație și calitate în fiecare proiect",
  "Tranziție către o lume mai curată și sustenabilă",
  "Echipă dedicată de profesioniști calificați",
  "Parteneriate solide cu producători de top",
  "Consultanță gratuită și ofertă personalizată",
];

const Counter = ({ end, decimals = 0, suffix }: { end: number; decimals?: number; suffix: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const dur = 1800;
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(end * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const About = () => {
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
                  <Sun className="h-3.5 w-3.5" /> Despre SolarHev
                </span>
                <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05]">
                  Lider în energia <span className="text-accent">solară</span> din România
                </h1>
                <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl leading-relaxed">
                  Bine ai venit pe pagina noastră, dedicată pasiunii noastre pentru energie solară la Solarhev.ro!
                  Cu o prezență solidă de peste 15 ani pe piața energiei regenerabile, suntem mândri să fim lideri
                  în domeniul comercializării și montajului de panouri fotovoltaice.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#misiunea">
                    <Button
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent-glow rounded-full font-semibold shadow-glow"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" /> Descoperă misiunea
                    </Button>
                  </a>
                  <a href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full bg-white/5 border-white/20 text-primary-foreground hover:bg-white/10"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" /> Contactează-ne
                    </Button>
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-primary-foreground/70">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-eco" /> 15+ ani experiență
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-eco" /> 500+ instalări
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-eco" /> Branduri premium
                  </span>
                </div>
              </div>

              {/* Visual card */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-solar opacity-20 blur-2xl rounded-3xl" />
                <div className="relative rounded-3xl bg-white/8 backdrop-blur-xl border border-white/15 p-7 shadow-elev">
                  <span className="text-xs uppercase tracking-wider text-primary-foreground/60">Pe scurt</span>
                  <h3 className="mt-3 text-2xl font-bold">SolarHev în cifre</h3>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    Performanță demonstrată prin rezultate concrete și clienți mulțumiți.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {STATS.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl bg-white/5 border border-white/10 px-4 py-4 text-center"
                      >
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 border border-accent/30 mb-2">
                          <s.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div className="text-xl font-bold text-accent">
                          <Counter end={s.end} decimals={s.decimals} suffix={s.suffix} />
                        </div>
                        <div className="text-xs text-primary-foreground/60 mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="container-x -mt-12 md:-mt-16 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="group relative rounded-3xl bg-card border border-border p-6 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/10 group-hover:bg-accent/20 blur-2xl transition-colors" />
                <div className="relative text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-solar shadow-glow mb-3">
                    <s.icon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    <Counter end={s.end} decimals={s.decimals} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION */}
        <section id="misiunea" className="container-x section-y">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-solar opacity-15 blur-3xl rounded-3xl" />
              <div className="relative rounded-3xl bg-gradient-navy text-primary-foreground p-8 md:p-10 shadow-elev overflow-hidden">
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-eco/20 blur-3xl" />
                <div className="relative">
                  <Sun className="h-10 w-10 text-accent" />
                  <h2 className="mt-5 text-3xl md:text-4xl font-bold">Misiunea noastră</h2>
                  <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                    La Solarhev.ro, misiunea noastră este de a oferi soluții durabile și eficiente energetic,
                    contribuind la tranziția către o lume mai curată și sustenabilă.
                  </p>
                  <p className="mt-4 text-primary-foreground/70 leading-relaxed">
                    Cu o echipă dedicată de profesioniști calificați și cu experiență vastă, ne-am angajat să aducem
                    inovație și calitate în fiecare proiect. Suntem aici pentru a transforma potențialul solar în
                    realitate pentru afacerea sau locuința ta.
                  </p>

                  <div className="mt-8 grid sm:grid-cols-2 gap-3">
                    {VALUES.slice(0, 4).map((v) => (
                      <div key={v} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-eco shrink-0" />
                        <span className="text-primary-foreground/85">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-accent">Ce ne diferențiază</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold">De ce SolarHev?</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Alegerea unui partener pentru sistemul tău fotovoltaic este o decizie importantă. Iată de ce mii de
                  clienți ne-au ales de-a lungul anilor.
                </p>
              </div>

              <div className="space-y-4">
                {DIFFERENTIATORS.map((d) => (
                  <div
                    key={d.title}
                    className="group flex items-start gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-elev hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <d.icon className="h-5 w-5 text-accent group-hover:text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{d.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS / HOW WE WORK */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground section-y">
          <div className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--accent)) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[800px] bg-accent/20 blur-3xl rounded-full" />

          <div className="container-x relative">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-accent font-bold">Cum lucrăm</span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold">
                De la idee la energie verde
              </h2>
              <p className="mt-3 text-primary-foreground/70">
                Procesul nostru simplu și transparent îți oferă liniștea că proiectul tău este pe mâini buni.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4 items-start">
              {[
                { step: "01", title: "Consultare", desc: "Analizăm nevoile tale de energie și spațiul disponibil." },
                { step: "02", title: "Proiectare", desc: "Creăm un sistem personalizat, optimizat pentru randament maxim." },
                { step: "03", title: "Ofertare", desc: "Primești o ofertă transparentă, fără costuri ascunse." },
                { step: "04", title: "Instalare", desc: "Echipa noastră calificată montează sistemul profesional." },
                { step: "05", title: "Monitorizare", desc: "Suport post-vânzare și monitorizare continuă a performanței." },
              ].map((s, i, arr) => (
                <div key={s.step} className="relative text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground font-bold text-lg shadow-glow mb-4 relative z-10">
                    {s.step}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-accent/30" />
                  )}
                  <h3 className="text-base font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-primary-foreground/70 px-2">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BRANDS / TRUST */}
        <section className="container-x section-y">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-semibold text-accent">Parteneri de încredere</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Colaborăm cu branduri de top</h2>
            <p className="mt-3 text-muted-foreground">
              Oferim exclusiv produse certificate și testate de producători de renume mondial.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Longi", "Solar Edge", "LG", "Huawei", "Canadian Solar", "SMA"].map((brand) => (
              <div
                key={brand}
                className="group flex items-center justify-center rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-x pb-20">
          <div className="relative rounded-3xl bg-gradient-navy text-primary-foreground p-10 md:p-14 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-eco/20 blur-3xl" />

            <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  La Solarhev.ro, aducem <span className="text-accent">soarele</span> în viața ta!
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/75 max-w-xl leading-relaxed">
                  Suntem aici pentru a transforma potențialul solar în realitate pentru afacerea sau locuința ta.
                  Pentru mai multe informații și pentru a discuta cum putem începe împreună această călătorie spre
                  energie verde, nu ezita să ne contactezi.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-eco" /> Consultanță gratuită
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-eco" /> Ofertă personalizată
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-eco" /> Suport tehnic dedicat
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+40775311632">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent-glow rounded-full font-semibold shadow-glow"
                  >
                    <Phone className="h-4 w-4 mr-2" /> Sună acum
                  </Button>
                </a>
                <a href="mailto:office@solarhev.ro">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full bg-white/5 border-white/20 text-primary-foreground hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4 mr-2" /> Trimite email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
