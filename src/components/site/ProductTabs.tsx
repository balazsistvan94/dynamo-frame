import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";
import img1 from "@/assets/hero-battery.jpg";
import img2 from "@/assets/hero-batteries-rack.jpg";
import img3 from "@/assets/cat-inverter-product.jpg";
import img4 from "@/assets/hero-house.jpg";

type Product = { img: string; name: string; price: number; stock: "in" | "out" | "last"; rating: number; badge?: string };

const popular: Product[] = [
  { img: img2, name: "Baterie Dyness PowerBrick 14.336 kWh 51.2V LiFePO4", price: 7263.64, stock: "out", rating: 5 },
  { img: img1, name: "Baterie de stocare LiFePO4 Uhome LFP 5000B", price: 4200, stock: "in", rating: 5 },
  { img: img3, name: "Invertor hibrid trifazat Huawei SUN2000-10K-MAP0, 10 kW", price: 6499, stock: "last", rating: 5 },
  { img: img3, name: "Invertor on-grid hibrid trifazat Huawei SUN5000-8K-MAP0, 8 kW", price: 4590, stock: "in", rating: 5 },
];

const noi: Product[] = [
  { img: img1, name: "Baterie stocare STELTEC FLEX-L4", price: 7446, stock: "in", rating: 5, badge: "NOU" },
  { img: img2, name: "Easyway UNIV-HV 10 kWh LiFePO₄ High Voltage", price: 11999, stock: "in", rating: 5, badge: "NOU" },
  { img: img3, name: "Invertor DEYE hibrid 6 kW / 48V monofazic", price: 4101.9, stock: "in", rating: 5, badge: "NOU" },
  { img: img4, name: "Sistem complet 10 kWp Longi + Huawei + UHome", price: 28500, stock: "in", rating: 5, badge: "NOU" },
];

const stockLabel = (s: Product["stock"]) =>
  s === "in" ? { t: "În stoc", cls: "bg-eco/15 text-eco" }
  : s === "last" ? { t: "Ultimele produse", cls: "bg-accent/20 text-accent-foreground" }
  : { t: "Stoc epuizat", cls: "bg-muted text-muted-foreground" };

const Card = ({ p }: { p: Product }) => {
  const s = stockLabel(p.stock);
  return (
    <div className="group h-full bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elev hover:-translate-y-1 transition-all">
      <div className="relative aspect-square bg-surface overflow-hidden">
        {p.badge && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-eco text-eco-foreground text-[10px] font-extrabold uppercase tracking-wider">
            {p.badge}
          </span>
        )}
        <span className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold ${s.cls}`}>
          {s.t}
        </span>
        <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-contain p-5 group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 text-accent mb-2">
          {Array.from({ length: p.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">5/5</span>
        </div>
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <div className="font-display text-xl font-extrabold text-primary">
              {p.price.toLocaleString("ro-RO", { minimumFractionDigits: 2 })} <span className="text-xs text-accent">lei</span>
            </div>
            <div className="text-[10px] uppercase text-muted-foreground">+TVA</div>
          </div>
          <Button
            size="sm"
            disabled={p.stock === "out"}
            className="bg-primary hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {p.stock === "out" ? "Indisponibil" : "Adaugă"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductTabs = () => {
  const ref = useReveal<HTMLDivElement>();
  const [tab, setTab] = useState<"pop" | "noi">("pop");
  const list = tab === "pop" ? popular : noi;
  return (
    <section className="section-y">
      <div ref={ref} className="container-x reveal">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-accent font-bold">Produse</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold">Cele mai apreciate</h2>
          </div>
          <div className="inline-flex p-1 bg-surface border border-border rounded-xl">
            {[
              { k: "pop" as const, l: "Produse Populare" },
              { k: "noi" as const, l: "Produse Noi" },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === t.k ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((p, i) => (
            <Card key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
