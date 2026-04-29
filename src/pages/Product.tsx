import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, CreditCard,
  Check, Minus, Plus, Share2, Phone, Zap, Battery, Award, FileText, Info
} from "lucide-react";
import Header from "@/components/site/Header";
import TopBar from "@/components/site/TopBar";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import inverters from "@/assets/cat-inverters-real.jpg";
import inverterProduct from "@/assets/cat-inverter-product.jpg";
import batteries from "@/assets/hero-batteries-rack.jpg";
import battery from "@/assets/hero-battery.jpg";
import panels from "@/assets/cat-panels-real.jpg";
import structures from "@/assets/cat-structures-real.jpg";
import charging from "@/assets/cat-charging-real.jpg";

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: "În stoc" | "Ultimele produse" | "Stoc epuizat";
  sku: string;
  shortDesc: string;
  longDesc: string;
  highlights: string[];
  specs: { group: string; items: { k: string; v: string }[] }[];
  images: string[];
  badges?: { label: string; tone: "hot" | "new" | "eco" }[];
};

const PRODUCT: Product = {
  id: "deye-6kw",
  name: "Invertor DEYE hibrid 6 kW / 48V — monofazic",
  brand: "DEYE",
  category: "Invertoare",
  categorySlug: "invertoare",
  price: 4101.9,
  oldPrice: 4800,
  rating: 5,
  reviews: 142,
  stock: "În stoc",
  sku: "DEYE-SUN-6K-SG03LP1-EU",
  shortDesc:
    "Invertor hibrid monofazic de 6 kW cu eficiență 97.6%, compatibil cu baterii LiFePO4 de înaltă tensiune. Ideal pentru sisteme rezidențiale on-grid și off-grid.",
  longDesc:
    "Seria SUN-SG03LP1-EU de la DEYE este special concepută pentru aplicații rezidențiale moderne. Suportă funcționare paralelă (până la 10 unități), backup automat în caz de pană de curent și management inteligent al consumului prin aplicație. Compatibilitate extinsă cu majoritatea brandurilor de baterii LiFePO4 (Pylontech, Dyness, BYD, Easyway).",
  highlights: [
    "Eficiență maximă 97.6%",
    "Backup automat în <10 ms",
    "Compatibil cu baterii LiFePO4 48V",
    "Monitorizare prin Solarman App",
    "Garanție 10 ani",
    "Certificare CE, G98/G99, EN 50549",
  ],
  specs: [
    {
      group: "Date generale",
      items: [
        { k: "Putere nominală", v: "6 kW" },
        { k: "Tensiune intrare baterie", v: "48 V DC" },
        { k: "Curent maxim încărcare", v: "120 A" },
        { k: "Topologie", v: "Hibrid monofazic" },
      ],
    },
    {
      group: "Intrare PV",
      items: [
        { k: "Putere PV maximă", v: "7800 W" },
        { k: "Tensiune MPPT", v: "125 – 425 V" },
        { k: "Numar MPPT", v: "2" },
        { k: "Tensiune maximă DC", v: "500 V" },
      ],
    },
    {
      group: "Ieșire AC",
      items: [
        { k: "Tensiune nominală", v: "230 V AC" },
        { k: "Frecvență", v: "50/60 Hz" },
        { k: "THD", v: "<3%" },
        { k: "Eficiență", v: "97.6%" },
      ],
    },
    {
      group: "Mecanic & altele",
      items: [
        { k: "Dimensiuni (LxlxA)", v: "418 × 568 × 196 mm" },
        { k: "Greutate", v: "27 kg" },
        { k: "Grad protecție", v: "IP65" },
        { k: "Garanție", v: "10 ani" },
      ],
    },
  ],
  images: [inverterProduct, inverters, panels, batteries],
  badges: [
    { label: "Bestseller", tone: "hot" },
    { label: "Eco-friendly", tone: "eco" },
  ],
};

const RELATED: { id: string; name: string; brand: string; price: number; img: string; rating: number }[] = [
  { id: "easyway", name: "Baterie Easyway UNIV-HV 10 kWh", brand: "Easyway", price: 8499, img: battery, rating: 5 },
  { id: "longi-580", name: "Panou Longi Hi-MO 6 580W", brand: "Longi", price: 879, img: panels, rating: 5 },
  { id: "huawei-10k", name: "Invertor Huawei SUN2000-10K", brand: "Huawei", price: 6499, img: inverters, rating: 5 },
  { id: "wallbox-22", name: "Wallbox AC 22 kW", brand: "Solar Edge", price: 4999, img: charging, rating: 4 },
];

const Product = () => {
  const { id } = useParams();
  const p = PRODUCT; // demo: same product for any id
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });

  const totalPrice = useMemo(() => p.price * qty, [qty, p.price]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      {/* Breadcrumb */}
      <div className="container-x py-5">
        <nav className="flex items-center text-xs text-muted-foreground gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-accent">Acasă</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/categorie/${p.categorySlug}`} className="hover:text-accent">{p.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium line-clamp-1">{p.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="container-x grid grid-cols-12 gap-8 pb-12">
        {/* Gallery */}
        <div className="col-span-12 lg:col-span-7">
          <div className="grid grid-cols-12 gap-4">
            {/* Thumbs */}
            <div className="col-span-12 sm:col-span-2 order-2 sm:order-1">
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
                {p.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                      active === i ? "border-accent shadow-md" : "border-border hover:border-accent/50"
                    }`}
                    aria-label={`Imagine ${i + 1}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Main image with zoom */}
            <div className="col-span-12 sm:col-span-10 order-1 sm:order-2">
              <div
                className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-surface group"
                onMouseMove={onMove}
                onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
              >
                <img
                  src={p.images[active]}
                  alt={p.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
                  style={zoom.on ? { transform: `scale(2)`, transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {p.badges?.map((b) => (
                    <Badge
                      key={b.label}
                      className={
                        b.tone === "hot"
                          ? "bg-destructive text-destructive-foreground hover:bg-destructive"
                          : b.tone === "eco"
                          ? "bg-eco text-eco-foreground hover:bg-eco"
                          : "bg-accent text-accent-foreground hover:bg-accent"
                      }
                    >
                      {b.label}
                    </Badge>
                  ))}
                  {p.oldPrice && (
                    <Badge className="bg-accent text-accent-foreground hover:bg-accent">
                      -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                    </Badge>
                  )}
                </div>
                <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Partajează">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="col-span-12 lg:col-span-5">
          <div className="text-[11px] uppercase tracking-widest text-accent font-bold">{p.brand}</div>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold leading-tight">{p.name}</h1>

          <div className="mt-3 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < p.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
              ))}
              <span className="ml-1 text-sm font-semibold">{p.rating}.0</span>
              <span className="text-sm text-muted-foreground">({p.reviews} recenzii)</span>
            </div>
            <span className="text-xs text-muted-foreground">SKU: {p.sku}</span>
          </div>

          <p className="mt-5 text-muted-foreground leading-relaxed">{p.shortDesc}</p>

          {/* Highlights */}
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-eco mt-0.5 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* B2B Partner pricing card */}
          <div className="mt-6 relative overflow-hidden rounded-3xl border border-[hsl(158_55%_45%/0.25)] bg-gradient-to-br from-[hsl(158_60%_97%)] via-card to-[hsl(168_55%_96%)] p-5 shadow-card">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[hsl(158_64%_42%/0.18)] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[hsl(168_70%_45%/0.12)] blur-3xl" />

            {/* Header strip */}
            <div className="relative flex items-center justify-between gap-3 rounded-2xl border border-[hsl(158_55%_45%/0.22)] bg-white/70 backdrop-blur px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(158_64%_42%)] text-white shadow-sm">
                  <Award className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(158_64%_30%)]">Cont partener activ</div>
                  <div className="text-sm font-bold text-foreground">Prețul tău B2B exclusiv</div>
                </div>
              </div>
              <span className="inline-flex items-center rounded-full bg-[hsl(158_64%_42%)] px-2.5 py-1 text-[11px] font-extrabold text-white shadow-sm">
                −18%
              </span>
            </div>

            {/* B2B price row */}
            <div className="relative mt-4 px-1">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Preț B2B fără TVA</div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-extrabold text-foreground tabular-nums">
                      {p.price.toLocaleString("ro-RO", { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-base font-bold text-muted-foreground">Lei</span>
                  </div>
                </div>
                {p.oldPrice && (
                  <div className="text-right">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Preț retail fără TVA</div>
                    <div className="mt-1 text-base font-semibold text-muted-foreground line-through tabular-nums">
                      {p.oldPrice.toLocaleString("ro-RO", { minimumFractionDigits: 2 })} Lei
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3 text-center text-[11px] font-medium text-muted-foreground">
                + TVA 21% · {(p.price * 0.21).toLocaleString("ro-RO", { minimumFractionDigits: 2 })} Lei
              </div>
            </div>

            {/* Total with TVA */}
            <div className="relative mt-3 rounded-2xl bg-gradient-to-br from-[hsl(158_64%_42%)] to-[hsl(168_70%_38%)] p-4 text-white shadow-md">
              <div className="flex items-end justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">Total cu TVA</div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-3xl font-extrabold tabular-nums">
                      {(p.price * 1.21).toLocaleString("ro-RO", { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-sm font-bold text-white/85">Lei</span>
                  </div>
                </div>
                {p.oldPrice && (
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-sm font-semibold text-white/60 line-through tabular-nums">
                      {(p.oldPrice * 1.21).toLocaleString("ro-RO", { minimumFractionDigits: 2 })} Lei
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white ring-1 ring-white/25 backdrop-blur">
                      <Check className="h-3 w-3" /> Economisești {((p.oldPrice - p.price) * 1.21).toLocaleString("ro-RO", { minimumFractionDigits: 2 })} Lei
                    </span>
                  </div>
                )}
              </div>
            </div>

            {p.oldPrice && (
              <div className="relative mt-3 flex items-center gap-2 rounded-xl border border-[hsl(43_100%_50%/0.35)] bg-[hsl(43_100%_50%/0.08)] px-3 py-2">
                <Info className="h-4 w-4 text-[hsl(38_90%_40%)] shrink-0" />
                <span className="text-xs text-foreground/80">
                  Preț retail: <span className="line-through font-semibold">{(p.oldPrice * 1.21).toLocaleString("ro-RO", { minimumFractionDigits: 2 })} Lei cu TVA</span>
                </span>
              </div>
            )}

            {p.oldPrice && (
              <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-eco">
                <Award className="h-3 w-3" /> Economisești {(p.oldPrice - p.price).toLocaleString("ro-RO", { minimumFractionDigits: 2 })} lei
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-eco animate-pulse" />
              <span className="font-semibold text-eco">{p.stock}</span>
              <span className="text-muted-foreground">· Livrare estimată 2–4 zile</span>
            </div>

            {/* Qty + CTA */}
            <div className="mt-5 flex items-stretch gap-3">
              <div className="flex items-center border border-border rounded-full overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 flex items-center justify-center hover:bg-surface" aria-label="Scade"><Minus className="h-4 w-4" /></button>
                <span className="w-12 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-12 w-12 flex items-center justify-center hover:bg-surface" aria-label="Crește"><Plus className="h-4 w-4" /></button>
              </div>
              <Button
                onClick={() => toast.success("Adăugat în coș", { description: `${qty} × ${p.name}` })}
                className="flex-1 h-12 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow"
              >
                <ShoppingCart className="h-5 w-5" /> Adaugă în coș · {totalPrice.toLocaleString("ro-RO", { minimumFractionDigits: 2 })} lei
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" aria-label="Wishlist">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" className="mt-3 w-full h-11 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
              <Phone className="h-4 w-4" /> Solicită ofertă personalizată
            </Button>
          </div>

          {/* Trust */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { i: Truck, t: "Livrare gratuită", s: "Comenzi peste 5.000 lei" },
              { i: Shield, t: "Garanție 10 ani", s: "Service autorizat" },
              { i: RotateCcw, t: "Retur 14 zile", s: "Fără întrebări" },
              { i: CreditCard, t: "Plată în rate", s: "Până la 24 luni" },
            ].map((x) => (
              <div key={x.t} className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-border">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                  <x.i className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="text-xs text-muted-foreground">{x.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container-x pb-16">
        <Tabs defaultValue="desc" className="w-full">
          <TabsList className="w-full justify-start bg-surface h-auto p-1 rounded-full overflow-x-auto flex-nowrap">
            <TabsTrigger value="desc" className="rounded-full data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"><Info className="h-4 w-4" /> Descriere</TabsTrigger>
            <TabsTrigger value="specs" className="rounded-full data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"><Zap className="h-4 w-4" /> Specificații</TabsTrigger>
            <TabsTrigger value="docs" className="rounded-full data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"><FileText className="h-4 w-4" /> Documente</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"><Star className="h-4 w-4" /> Recenzii ({p.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="desc" className="mt-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-8 prose prose-sm max-w-none">
                <p className="text-base text-foreground leading-relaxed">{p.longDesc}</p>
                <p className="text-base text-muted-foreground leading-relaxed mt-4">
                  Configurabil rapid prin interfață locală sau cloud, invertorul oferă rapoarte detaliate asupra producției, consumului și stării bateriei. Funcția de Time-of-Use permite optimizarea costului energiei conform tarifului orar al furnizorului.
                </p>
              </div>
              <aside className="col-span-12 md:col-span-4 rounded-2xl bg-gradient-navy text-primary-foreground p-6">
                <Battery className="h-8 w-8 text-accent mb-3" />
                <h4 className="font-display font-bold text-lg">Pachet complet?</h4>
                <p className="text-sm text-primary-foreground/70 mt-1">Combină acest invertor cu o baterie Easyway pentru independență energetică totală.</p>
                <Link to="/categorie/baterii-solare" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">Vezi bateriile compatibile →</Link>
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {p.specs.map((g) => (
                <div key={g.group} className="rounded-2xl border border-border overflow-hidden">
                  <div className="bg-primary text-primary-foreground px-5 py-3 font-display font-bold text-sm uppercase tracking-wider">{g.group}</div>
                  <table className="w-full text-sm">
                    <tbody>
                      {g.items.map((it, i) => (
                        <tr key={it.k} className={i % 2 ? "bg-surface" : ""}>
                          <td className="px-5 py-3 text-muted-foreground w-1/2">{it.k}</td>
                          <td className="px-5 py-3 font-semibold text-foreground">{it.v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="docs" className="mt-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["Fișa tehnică (PDF)", "Manual instalare (PDF)", "Certificat CE (PDF)", "Declarație de conformitate (PDF)"].map((d) => (
                <li key={d}>
                  <a href="#" className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent hover:bg-surface transition-all group">
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent"><FileText className="h-5 w-5" /></span>
                      <span className="font-semibold">{d}</span>
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground group-hover:text-accent">Descarcă →</span>
                  </a>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-4 rounded-2xl border border-border p-6 text-center">
                <div className="text-5xl font-extrabold">{p.rating}.0</div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < p.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mt-2">Bazat pe {p.reviews} recenzii</div>
                <Button className="mt-5 w-full bg-primary hover:bg-primary/90 text-primary-foreground">Scrie o recenzie</Button>
              </div>
              <div className="col-span-12 md:col-span-8 space-y-4">
                {[
                  { n: "Andrei P.", c: "Cluj-Napoca", t: "Funcționează impecabil de 8 luni. Aplicația Solarman e foarte intuitivă.", r: 5, d: "acum 2 săptămâni" },
                  { n: "Maria S.", c: "Timișoara", t: "Instalare rapidă, suport tehnic excelent din partea Solarhev. Recomand!", r: 5, d: "acum 1 lună" },
                  { n: "Ovidiu D.", c: "Oradea", t: "Eficiența anunțată este reală. Backup-ul s-a activat instant la o pană.", r: 5, d: "acum 2 luni" },
                ].map((r, i) => (
                  <div key={i} className="rounded-2xl border border-border p-5">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span className="h-10 w-10 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center">{r.n[0]}</span>
                        <div>
                          <div className="font-semibold">{r.n} <span className="text-xs text-muted-foreground font-normal">· {r.c}</span></div>
                          <div className="flex items-center gap-1 mt-0.5">
                            {Array.from({ length: 5 }).map((_, k) => <Star key={k} className={`h-3 w-3 ${k < r.r ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />)}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{r.d}</span>
                    </div>
                    <p className="mt-3 text-sm text-foreground/90">{r.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related */}
      <section className="bg-surface section-y">
        <div className="container-x">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-accent font-bold">Recomandate</span>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-extrabold">Produse asemănătoare</h2>
            </div>
            <Link to={`/categorie/${p.categorySlug}`} className="underline-anim text-sm font-semibold">Vezi categoria →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {RELATED.map((r) => (
              <Link key={r.id} to={`/produs/${r.id}`} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elev transition-all">
                <div className="aspect-square overflow-hidden bg-surface">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{r.brand}</div>
                  <div className="mt-1 font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{r.name}</div>
                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />)}
                  </div>
                  <div className="mt-2 text-lg font-extrabold">{r.price.toLocaleString()} <span className="text-xs font-semibold text-muted-foreground">lei</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-background/95 backdrop-blur border-t border-border p-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="text-[10px] text-muted-foreground">Preț</div>
          <div className="text-lg font-extrabold leading-none">{p.price.toLocaleString("ro-RO")} <span className="text-xs">lei</span></div>
        </div>
        <Button onClick={() => toast.success("Adăugat în coș")} className="flex-1 h-12 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
          <ShoppingCart className="h-4 w-4" /> Adaugă în coș
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
