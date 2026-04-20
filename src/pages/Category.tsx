import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Filter, Grid3x3, LayoutList, SlidersHorizontal, Star, Heart, ShoppingCart, X, Check } from "lucide-react";
import Header from "@/components/site/Header";
import TopBar from "@/components/site/TopBar";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import panels from "@/assets/cat-panels-real.jpg";
import inverters from "@/assets/cat-inverters-real.jpg";
import batteries from "@/assets/hero-batteries-rack.jpg";
import structures from "@/assets/cat-structures-real.jpg";
import charging from "@/assets/cat-charging-real.jpg";

const SLUG_TO_LABEL: Record<string, { title: string; img: string; sub: string }> = {
  "panouri-fotovoltaice": { title: "Panouri Fotovoltaice", img: panels, sub: "Module mono, bifaciale și premium pentru randament maxim" },
  invertoare: { title: "Invertoare", img: inverters, sub: "Hibrid, on-grid și off-grid de la branduri de top" },
  "baterii-solare": { title: "Baterii Solare", img: batteries, sub: "Stocare LiFePO4 și High Voltage" },
  structuri: { title: "Structuri de montaj", img: structures, sub: "Sisteme pentru acoperiș, sol și balast" },
  "statii-incarcare": { title: "Stații de încărcare", img: charging, sub: "AC, DC și wallbox-uri" },
  oferte: { title: "Oferte Speciale", img: panels, sub: "Reduceri săptămânale la produse selecționate" },
};

const BRANDS = ["Longi", "Huawei", "Deye", "Canadian Solar", "Dyness", "Solar Edge", "LG", "Easyway"];
const POWER_RANGES = ["< 5 kW", "5–10 kW", "10–20 kW", "> 20 kW"];
const STOCK_OPTS = ["În stoc", "Ultimele produse", "Stoc epuizat"];

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  stock: "În stoc" | "Ultimele produse" | "Stoc epuizat";
  power: number; // kW
  isNew?: boolean;
  isHot?: boolean;
  img: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Invertor Deye hibrid 6 kW monofazic", brand: "Deye", price: 4101, oldPrice: 4800, rating: 5, stock: "În stoc", power: 6, isHot: true, img: inverters },
  { id: 2, name: "Baterie Easyway UNIV-HV 10 kWh LiFePO4", brand: "Easyway", price: 8499, rating: 5, stock: "În stoc", power: 10, isNew: true, img: batteries },
  { id: 3, name: "Panou Longi Hi-MO 6 580W", brand: "Longi", price: 879, oldPrice: 1050, rating: 4, stock: "În stoc", power: 0.58, isHot: true, img: panels },
  { id: 4, name: "Invertor Huawei SUN2000-10K-MAP0", brand: "Huawei", price: 6499, rating: 5, stock: "Ultimele produse", power: 10, img: inverters },
  { id: 5, name: "Baterie Dyness PowerBrick 14.3 kWh", brand: "Dyness", price: 7263, rating: 5, stock: "Stoc epuizat", power: 14.3, img: batteries },
  { id: 6, name: "Stație încărcare AC 22 kW wallbox", brand: "Solar Edge", price: 4999, rating: 4, stock: "În stoc", power: 22, isNew: true, img: charging },
  { id: 7, name: "Structură montaj acoperiș țiglă 8 panouri", brand: "Canadian Solar", price: 1899, rating: 4, stock: "În stoc", power: 0, img: structures },
  { id: 8, name: "Panou Canadian Solar BiKu 540W", brand: "Canadian Solar", price: 829, rating: 5, stock: "În stoc", power: 0.54, img: panels },
  { id: 9, name: "Invertor Huawei SUN5000-8K-MAP0", brand: "Huawei", price: 4590, rating: 5, stock: "În stoc", power: 8, img: inverters },
  { id: 10, name: "Baterie LG RESU 10H Prime", brand: "LG", price: 12500, oldPrice: 13900, rating: 5, stock: "În stoc", power: 9.6, isHot: true, img: batteries },
  { id: 11, name: "Panou Longi Hi-MO X6 605W bifacial", brand: "Longi", price: 999, rating: 5, stock: "În stoc", power: 0.6, isNew: true, img: panels },
  { id: 12, name: "Stație DC 60 kW comercial", brand: "Solar Edge", price: 38900, rating: 4, stock: "Ultimele produse", power: 60, img: charging },
];

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const meta = SLUG_TO_LABEL[slug ?? ""] ?? { title: "Produse", img: panels, sub: "Toate produsele disponibile" };

  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("popular");
  const [price, setPrice] = useState<[number, number]>([0, 40000]);
  const [brands, setBrands] = useState<string[]>([]);
  const [stocks, setStocks] = useState<string[]>([]);
  const [powers, setPowers] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const toggle = (list: string[], setter: (v: string[]) => void, val: string) =>
    setter(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  const filtered = useMemo(() => {
    let res = PRODUCTS.filter((p) => p.price >= price[0] && p.price <= price[1]);
    if (brands.length) res = res.filter((p) => brands.includes(p.brand));
    if (stocks.length) res = res.filter((p) => stocks.includes(p.stock));
    if (search) res = res.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (powers.length) {
      res = res.filter((p) => {
        return powers.some((r) => {
          if (r === "< 5 kW") return p.power < 5;
          if (r === "5–10 kW") return p.power >= 5 && p.power <= 10;
          if (r === "10–20 kW") return p.power > 10 && p.power <= 20;
          if (r === "> 20 kW") return p.power > 20;
          return true;
        });
      });
    }
    if (sort === "price-asc") res = [...res].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") res = [...res].sort((a, b) => b.price - a.price);
    if (sort === "rating") res = [...res].sort((a, b) => b.rating - a.rating);
    if (sort === "new") res = [...res].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return res;
  }, [price, brands, stocks, powers, sort, search]);

  const activeCount = brands.length + stocks.length + powers.length + (price[0] !== 0 || price[1] !== 40000 ? 1 : 0);

  const clearAll = () => {
    setBrands([]); setStocks([]); setPowers([]); setPrice([0, 40000]); setSearch("");
  };

  const Filters = (
    <div className="space-y-7">
      <div>
        <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3">Caută în categorie</h4>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nume produs..." />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-display font-bold text-sm uppercase tracking-wider">Preț (lei)</h4>
          <span className="text-xs text-muted-foreground">{price[0].toLocaleString()} – {price[1].toLocaleString()}</span>
        </div>
        <Slider
          value={price}
          onValueChange={(v) => setPrice(v as [number, number])}
          min={0}
          max={40000}
          step={100}
          className="mt-2"
        />
      </div>

      <FilterGroup title="Brand" items={BRANDS} selected={brands} onToggle={(v) => toggle(brands, setBrands, v)} />
      <FilterGroup title="Putere" items={POWER_RANGES} selected={powers} onToggle={(v) => toggle(powers, setPowers, v)} />
      <FilterGroup title="Disponibilitate" items={STOCK_OPTS} selected={stocks} onToggle={(v) => toggle(stocks, setStocks, v)} />

      {activeCount > 0 && (
        <Button variant="outline" onClick={clearAll} className="w-full">
          <X className="h-4 w-4" /> Resetează filtrele ({activeCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      {/* Hero / breadcrumb */}
      <section className="relative overflow-hidden bg-gradient-navy text-primary-foreground">
        <div className="absolute inset-0 opacity-30">
          <img src={meta.img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/40" />
        <div className="container-x relative py-14 md:py-20">
          <nav className="flex items-center text-xs text-primary-foreground/70 gap-2 mb-4">
            <Link to="/" className="hover:text-accent">Acasă</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-accent">{meta.title}</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold">{meta.title}</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">{meta.sub}</p>
          <div className="mt-5 flex items-center gap-3 text-sm">
            <Badge className="bg-accent text-accent-foreground hover:bg-accent">{filtered.length} produse</Badge>
            <span className="text-primary-foreground/60">Livrare în toată România · Garanție extinsă</span>
          </div>
        </div>
      </section>

      <div className="container-x py-10 grid grid-cols-12 gap-8">
        {/* Sidebar filters desktop */}
        <aside className="hidden lg:block col-span-3">
          <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="h-4 w-4 text-accent" />
              <h3 className="font-display font-extrabold">Filtre</h3>
            </div>
            {Filters}
          </div>
        </aside>

        {/* Main content */}
        <main className="col-span-12 lg:col-span-9">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 justify-between mb-6 p-3 rounded-xl border border-border bg-card shadow-card">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4" /> Filtre {activeCount > 0 && `(${activeCount})`}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] overflow-y-auto">
                  <SheetHeader className="mb-6"><SheetTitle>Filtre</SheetTitle></SheetHeader>
                  {Filters}
                </SheetContent>
              </Sheet>
              <span className="text-sm text-muted-foreground hidden sm:inline">{filtered.length} rezultate</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[180px] h-10"><SelectValue placeholder="Sortează" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Cele mai populare</SelectItem>
                  <SelectItem value="new">Noutăți</SelectItem>
                  <SelectItem value="price-asc">Preț crescător</SelectItem>
                  <SelectItem value="price-desc">Preț descrescător</SelectItem>
                  <SelectItem value="rating">Cele mai apreciate</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden sm:flex border border-border rounded-md overflow-hidden">
                <button onClick={() => setView("grid")} className={`h-10 w-10 flex items-center justify-center ${view === "grid" ? "bg-accent text-accent-foreground" : "hover:bg-surface"}`} aria-label="Grilă"><Grid3x3 className="h-4 w-4" /></button>
                <button onClick={() => setView("list")} className={`h-10 w-10 flex items-center justify-center ${view === "list" ? "bg-accent text-accent-foreground" : "hover:bg-surface"}`} aria-label="Listă"><LayoutList className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {/* Active chips */}
          {activeCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {brands.map((b) => <Chip key={b} label={b} onRemove={() => toggle(brands, setBrands, b)} />)}
              {powers.map((p) => <Chip key={p} label={p} onRemove={() => toggle(powers, setPowers, p)} />)}
              {stocks.map((s) => <Chip key={s} label={s} onRemove={() => toggle(stocks, setStocks, s)} />)}
              {(price[0] !== 0 || price[1] !== 40000) && <Chip label={`${price[0]}–${price[1]} lei`} onRemove={() => setPrice([0, 40000])} />}
            </div>
          )}

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-2xl">
              <p className="text-lg font-semibold">Niciun produs găsit</p>
              <p className="text-sm text-muted-foreground mt-1">Încearcă să ajustezi filtrele.</p>
              <Button onClick={clearAll} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Resetează filtrele</Button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p) => <ProductRow key={p.id} p={p} />)}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {[1, 2, 3, "...", 6].map((n, i) => (
              <button key={i} className={`h-10 w-10 rounded-md border border-border text-sm font-semibold ${n === 1 ? "bg-accent text-accent-foreground border-accent" : "hover:bg-surface"}`}>{n}</button>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

const FilterGroup = ({ title, items, selected, onToggle }: { title: string; items: string[]; selected: string[]; onToggle: (v: string) => void }) => (
  <div>
    <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-3">{title}</h4>
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it}>
          <label className="flex items-center gap-3 text-sm cursor-pointer group">
            <Checkbox checked={selected.includes(it)} onCheckedChange={() => onToggle(it)} />
            <span className="group-hover:text-accent transition-colors">{it}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <button onClick={onRemove} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-accent/10 text-foreground border border-accent/30 text-xs font-semibold hover:bg-accent/20">
    {label}
    <X className="h-3 w-3" />
  </button>
);

const Stars = ({ n }: { n: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i < n ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
    ))}
  </div>
);

const ProductCard = ({ p }: { p: Product }) => (
  <article className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elev transition-all">
    <Link to={`/produs/${p.id}`} className="block relative aspect-[4/3] overflow-hidden bg-surface">
      <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
        {p.isHot && <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive">Ofertă</Badge>}
        {p.isNew && <Badge className="bg-eco text-eco-foreground hover:bg-eco">Nou</Badge>}
        {p.stock === "Stoc epuizat" && <Badge variant="outline" className="bg-background/80">Stoc epuizat</Badge>}
      </div>
      <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Wishlist">
        <Heart className="h-4 w-4" />
      </button>
    </Link>
    <div className="p-5">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{p.brand}</div>
      <Link to={`/produs/${p.id}`} className="mt-1 block font-semibold text-foreground line-clamp-2 min-h-[3rem] hover:text-accent transition-colors">{p.name}</Link>
      <div className="mt-2 flex items-center gap-2"><Stars n={p.rating} /><span className="text-xs text-muted-foreground">({p.rating}.0)</span></div>
      <div className="mt-3 flex items-end gap-2">
        {p.oldPrice && <span className="text-sm line-through text-muted-foreground">{p.oldPrice.toLocaleString()} lei</span>}
        <span className="text-2xl font-extrabold text-foreground">{p.price.toLocaleString()}<span className="text-sm font-semibold text-muted-foreground"> lei</span></span>
      </div>
      <div className="text-[11px] text-muted-foreground">+TVA · {p.stock}</div>
      <Button disabled={p.stock === "Stoc epuizat"} className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
        <ShoppingCart className="h-4 w-4" /> Adaugă în coș
      </Button>
    </div>
  </article>
);

const ProductRow = ({ p }: { p: Product }) => (
  <article className="group flex flex-col sm:flex-row gap-5 p-4 rounded-2xl border border-border bg-card shadow-card hover:shadow-elev transition-all">
    <div className="relative sm:w-56 aspect-[4/3] overflow-hidden rounded-xl bg-surface shrink-0">
      <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      {p.isHot && <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground hover:bg-destructive">Ofertă</Badge>}
    </div>
    <div className="flex-1 flex flex-col">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{p.brand}</div>
      <h3 className="mt-1 font-semibold text-foreground text-lg">{p.name}</h3>
      <div className="mt-2 flex items-center gap-2"><Stars n={p.rating} /><span className="text-xs text-muted-foreground">({p.rating}.0)</span></div>
      <ul className="mt-3 grid grid-cols-2 gap-1.5 text-xs text-muted-foreground max-w-md">
        <li className="flex items-center gap-1.5"><Check className="h-3 w-3 text-eco" /> Garanție extinsă</li>
        <li className="flex items-center gap-1.5"><Check className="h-3 w-3 text-eco" /> Livrare gratuită</li>
        <li className="flex items-center gap-1.5"><Check className="h-3 w-3 text-eco" /> Suport tehnic</li>
        <li className="flex items-center gap-1.5"><Check className="h-3 w-3 text-eco" /> Plată în rate</li>
      </ul>
      <div className="mt-auto pt-4 flex items-end justify-between gap-4 flex-wrap">
        <div>
          {p.oldPrice && <div className="text-sm line-through text-muted-foreground">{p.oldPrice.toLocaleString()} lei</div>}
          <div className="text-2xl font-extrabold text-foreground">{p.price.toLocaleString()}<span className="text-sm font-semibold text-muted-foreground"> lei</span></div>
          <div className="text-[11px] text-muted-foreground">+TVA · {p.stock}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" aria-label="Wishlist"><Heart className="h-4 w-4" /></Button>
          <Button disabled={p.stock === "Stoc epuizat"} className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <ShoppingCart className="h-4 w-4" /> Adaugă în coș
          </Button>
        </div>
      </div>
    </div>
  </article>
);

export default Category;
