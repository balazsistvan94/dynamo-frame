import { Truck, Package, Clock, MapPin, BadgeCheck, AlertTriangle, Banknote, Gift, Phone, ArrowRight, PackageOpen, Route, CalendarCheck } from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";

const COURIERS = [
  { name: "Sameday", color: "bg-blue-600" },
  { name: "FanCourier", color: "bg-orange-500" },
  { name: "DPD", color: "bg-red-600" },
  { name: "GLS", color: "bg-purple-600" },
];

const TIMELINE = [
  {
    icon: PackageOpen,
    title: "Confirmare comandă",
    desc: "După plasarea comenzii, echipa noastră verifică disponibilitatea produselor și confirmă comanda.",
    time: "În câteva ore",
  },
  {
    icon: Truck,
    title: "Predare către curier",
    desc: "Produsele sunt ambalate profesional și predate firmei de curierat sau flotei proprii.",
    time: "1 – 3 zile lucrătoare",
  },
  {
    icon: Route,
    title: "Transport",
    desc: "Coletul este în tranzit. Comanda poate fi urmărită în secțiunea „Contul meu”.",
    time: "1 – 5 zile lucrătoare",
  },
  {
    icon: CalendarCheck,
    title: "Livrare la ușă",
    desc: "Curierul livrează la adresa menționată. Verifică coletul în prezența curierului!",
    time: "Termen maxim: 15 zile",
  },
];

const Delivery = () => {
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
                  <Truck className="h-3.5 w-3.5" /> Livrare rapidă
                </span>
                <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05]">
                  Metode de <span className="text-accent">livrare</span>
                </h1>
                <p className="mt-6 text-lg text-primary-foreground/75 max-w-2xl leading-relaxed">
                  Livrăm produsele comandate prin curier sau flota proprie, direct la adresa menționată.
                  Taxa de livrare este calculată după plasarea comenzii și comunicată la confirmare.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#detalii">
                    <Button
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent-glow rounded-full font-semibold shadow-glow"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" /> Vezi detalii
                    </Button>
                  </a>
                  <a href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full bg-white/5 border-white/20 text-primary-foreground hover:bg-white/10"
                    >
                      <Phone className="h-4 w-4 mr-2" /> Contactează-ne
                    </Button>
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-primary-foreground/70">
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-eco" /> 4 curieri parteneri
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-eco" /> Transport gratuit &gt;15.000 lei
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-eco" /> Urmărire comandă online
                  </span>
                </div>
              </div>

              {/* Status card */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-solar opacity-20 blur-2xl rounded-3xl" />
                <div className="relative rounded-3xl bg-white/8 backdrop-blur-xl border border-white/15 p-7 shadow-elev">
                  <span className="text-xs uppercase tracking-wider text-primary-foreground/60">Curieri parteneri</span>
                  <h3 className="mt-3 text-2xl font-bold">Livrăm cu încredere</h3>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    Colaborăm cu cele mai mari firme de curierat din România pentru a asigura livrarea în siguranță.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {COURIERS.map((c) => (
                      <div
                        key={c.name}
                        className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3"
                      >
                        <div className={`h-3 w-3 rounded-full ${c.color} shrink-0`} />
                        <span className="text-sm font-semibold">{c.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl bg-accent/15 border border-accent/30 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-primary-foreground/60">Taxă minimă livrare</span>
                      <span className="text-sm font-bold text-accent">20 lei</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK CARDS */}
        <section className="container-x -mt-12 md:-mt-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Gift,
                label: "Transport gratuit",
                value: "> 15.000 lei",
                sub: "Pentru persoane fizice",
                color: "eco",
              },
              {
                icon: Clock,
                label: "Termen maxim livrare",
                value: "15 zile",
                sub: "Zile lucrătoare",
                color: "accent",
              },
              {
                icon: Banknote,
                label: "Taxă minimă",
                value: "20 lei",
                sub: "Calculată după comandă",
                color: "primary",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="group relative rounded-3xl bg-card border border-border p-6 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/10 group-hover:bg-accent/20 blur-2xl transition-colors" />
                <div className="relative flex items-start gap-4">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-glow shrink-0 ${c.color === 'eco' ? 'bg-eco/15 text-eco' : c.color === 'accent' ? 'bg-accent/15 text-accent' : 'bg-primary/10 text-primary'}`}>
                    <c.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{c.label}</div>
                    <div className="mt-1 text-2xl font-extrabold text-foreground">{c.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{c.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section id="detalii" className="container-x section-y">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider font-semibold text-accent">Cum funcționează</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Procesul de livrare</h2>
            <p className="mt-3 text-muted-foreground">
              De la confirmarea comenzii până la primirea produselor — transparent și rapid.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIMELINE.map((step, i) => (
              <div
                key={step.title}
                className="group relative rounded-3xl bg-card border border-border p-6 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/10 group-hover:bg-accent/20 blur-2xl transition-colors" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-solar flex items-center justify-center shadow-glow">
                      <step.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <span className="text-3xl font-bold text-muted-foreground/30">0{i + 1}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                    <Clock className="h-3 w-3" /> {step.time}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DETAILS GRID */}
        <section className="relative overflow-hidden bg-surface">
          <div className="container-x section-y">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10">
              {/* Left column */}
              <div className="space-y-6">
                <div className="rounded-3xl bg-card border border-border p-7 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-accent/15 flex items-center justify-center">
                      <Banknote className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Costul livrării</h3>
                      <p className="text-xs text-muted-foreground">Calculat individual pentru fiecare comandă</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Taxa de livrare este calculată după plasarea comenzii, în funcție de dimensiunea, greutatea, distanța și particularitățile de transport (produse fragile). Aceasta va fi comunicată cumpărătorului la confirmarea comenzii și se va regăsi distinct pe factura fiscală.
                    </p>
                    <div className="flex items-center gap-3 rounded-2xl bg-accent/5 border border-accent/20 px-4 py-3">
                      <div className="text-2xl font-extrabold text-accent">20</div>
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">lei</span>
                        <span className="text-muted-foreground"> — taxă minimă de livrare</span>
                      </div>
                    </div>
                    <p>
                      Termenul de predare a produselor către curier este de aproximativ <span className="font-semibold text-foreground">1 – 3 zile lucrătoare</span>, în funcție de cantitatea, dimensiunea și greutatea produselor comandate.
                    </p>
                    <p>
                      Termenul de livrare de către curier variază de la <span className="font-semibold text-foreground">1 la 5 zile lucrătoare</span>, în funcție de cantitatea, dimensiunea, greutatea și adresa de livrare.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl bg-card border border-border p-7 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-eco/15 flex items-center justify-center">
                      <Gift className="h-5 w-5 text-eco" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Transport gratuit</h3>
                      <p className="text-xs text-muted-foreground">Pentru comenzile de valoare mare</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Persoanele fizice beneficiază de <span className="font-semibold text-foreground">reducere 100% la taxa de livrare</span> pentru comenzile cu valoare mai mare de <span className="font-semibold text-foreground">15.000 lei</span> (fără taxă de livrare), expediate prin curier.
                    </p>
                    <div className="flex items-start gap-3 rounded-2xl bg-eco/5 border border-eco/20 px-4 py-3">
                      <BadgeCheck className="h-5 w-5 text-eco shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">
                        Acest beneficiu se aplică doar persoanelor fizice și <strong>nu se poate cumula</strong> cu alte reduceri (de exemplu, nu se acordă pentru produsele aflate în campanii de reducere preț).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <div className="rounded-3xl bg-card border border-border p-7 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Zone de livrare</h3>
                      <p className="text-xs text-muted-foreground">Național, cu excepții locale</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      După stabilirea detaliilor de livrare, produsele achiziționate vor fi transportate de curier sau de flota proprie la adresa menționată în momentul plasării comenzii.
                    </p>
                    <div className="flex items-start gap-3 rounded-2xl bg-surface border border-border px-4 py-3">
                      <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">
                        Anumite localități <strong>nu sunt acoperite</strong> de serviciile de curierat „livrare door to door". În aceste cazuri, produsele pot fi ridicate din cel mai apropiat <strong>centru logistic</strong> al firmei de curierat prin care a fost efectuată livrarea.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-gradient-navy text-primary-foreground p-7 shadow-elev relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                  <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-eco/20 blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                        <Package className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Termen maxim</h3>
                        <p className="text-xs text-primary-foreground/60">Garanție de livrare</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-4 text-sm text-primary-foreground/75 leading-relaxed">
                      <p>
                        Termenul maxim în care clientul intră în posesia bunurilor comandate este de <span className="text-accent font-semibold">15 zile lucrătoare</span>.
                      </p>
                      <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                        <p className="text-sm text-primary-foreground">
                          Această perioadă <strong>nu include</strong> perioada sărbătorilor de Paște, iarnă și Black Friday.
                        </p>
                      </div>
                      <p>
                        Depășirea acestui termen duce la posibilitatea <span className="text-accent font-semibold">anulării comenzii</span> fără alte explicații.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPECIAL TRANSPORT */}
        <section className="container-x pb-20">
          <div className="rounded-3xl overflow-hidden border border-border shadow-elev bg-card">
            <div className="grid lg:grid-cols-[1fr_1.6fr]">
              {/* Left visual */}
              <div className="p-8 md:p-10 bg-gradient-navy text-primary-foreground relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-eco/20 blur-3xl" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider">
                    <AlertTriangle className="h-3.5 w-3.5" /> Atenție
                  </span>
                  <h3 className="mt-5 text-2xl md:text-3xl font-bold">Transport special</h3>
                  <p className="mt-3 text-primary-foreground/75 leading-relaxed">
                    Unele produse necesită metode alternative de transport datorită dimensiunilor, greutății sau riscului de deteriorare.
                  </p>
                </div>
                <div className="relative mt-8">
                  <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                    <div className="text-xs uppercase tracking-wider text-primary-foreground/60">Termen livrare</div>
                    <div className="mt-1 text-3xl font-extrabold text-accent">Mai lung</div>
                    <div className="text-xs text-primary-foreground/60">Decât la firmele de curierat standard</div>
                  </div>
                </div>
              </div>

              {/* Right content */}
              <div className="p-8 md:p-10 space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  O serie de produse comercializate care depășesc în greutate, lungime, volum sau prezintă risc major de deteriorare pe timpul transportului vor fi livrate prin <span className="font-semibold text-foreground">metode alternative de transport</span>:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Panouri fotovoltaice", reason: "Dimensiuni mari, fragilitate" },
                    { label: "Bare fixare > 3 m", reason: "Lungime depășită" },
                    { label: "Produse > 100 kg", reason: "Greutate brută mare" },
                    { label: "Baterii/acumulatori", reason: "Risc de deteriorare" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 rounded-2xl bg-surface border border-border p-4">
                      <Package className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-surface border border-border p-5">
                  <p className="text-sm font-semibold text-foreground mb-2">Soluții de transport alternative:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="h-4 w-4 text-eco shrink-0 mt-0.5" />
                      <span>Bursa de transport — pentru expedii mari și grele</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="h-4 w-4 text-eco shrink-0 mt-0.5" />
                      <span>Soluții de transport paletizat — siguranță maximă</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="h-4 w-4 text-eco shrink-0 mt-0.5" />
                      <span>Transport dedicat cu flota proprie — pentru zone speciale</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-accent/5 border border-accent/20 px-4 py-3">
                  <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    În cazul transportului special, <strong>termenul de livrare este mai mare</strong> decât cel standard de la firmele de curierat. Vei fi contactat telefonic pentru stabilirea detaliilor.
                  </p>
                </div>
              </div>
            </div>
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
                  Ai întrebări despre <span className="text-accent">livrare</span>?
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/75 max-w-xl leading-relaxed">
                  Echipa noastră îți răspunde rapid. Sună-ne sau trimite un mesaj pentru detalii despre transportul comenzii tale.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+40775311632">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent-glow rounded-full font-semibold shadow-glow"
                  >
                    <Phone className="h-4 w-4 mr-2" /> Sună acum
                  </Button>
                </a>
                <a href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full bg-white/5 border-white/20 text-primary-foreground hover:bg-white/10"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> Contact
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

export default Delivery;
