import { useEffect, useRef, useState } from "react";
import { Search, ShoppingCart, Menu, X, Phone, User, Heart, ChevronDown, Sun, Zap, Battery, Wrench, Plug, Tag, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const CATEGORIES = [
  { name: "Panouri Fotovoltaice", icon: Sun, slug: "panouri-fotovoltaice", desc: "Mono, bifaciale, premium" },
  { name: "Invertoare", icon: Zap, slug: "invertoare", desc: "Hibrid, on-grid, off-grid" },
  { name: "Baterii Solare", icon: Battery, slug: "baterii-solare", desc: "LiFePO4, High Voltage" },
  { name: "Structuri de montaj", icon: Wrench, slug: "structuri", desc: "Acoperiș, sol, balast" },
  { name: "Stații de încărcare", icon: Plug, slug: "statii-incarcare", desc: "AC, DC, wallbox" },
  { name: "Oferte Speciale", icon: Tag, slug: "oferte", desc: "Reduceri săptămânale" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-background/85 backdrop-blur-xl transition-all ${
        scrolled ? "shadow-md border-b border-border" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="SolarHev logo" className="h-12 w-auto rounded-md" />
        </Link>

        {/* Categorii mega menu trigger */}
        <div
          className="hidden lg:block relative"
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
        >
          <button
            className={`inline-flex items-center gap-2 h-11 px-4 rounded-full font-semibold text-sm transition-all ${
              megaOpen
                ? "bg-accent text-accent-foreground shadow-md"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
            aria-expanded={megaOpen}
          >
            <Menu className="h-4 w-4" />
            Toate categoriile
            <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div className="hidden lg:flex flex-1 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Caută panouri, invertoare, baterii ..."
            className="pl-11 pr-24 h-11 bg-surface border-border/70 focus-visible:ring-accent rounded-full"
          />
          <Button size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full">
            Caută
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <a href="tel:+40775311632" className="hidden xl:flex items-center gap-2 text-sm pr-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Phone className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Sună acum</span>
              <span className="font-semibold text-foreground">+40.775.311.632</span>
            </span>
          </a>

          <IconAction icon={User} label="Cont" sublabel="Contul meu" to="/cont" />
          <IconAction icon={Heart} label="Wishlist" sublabel="Favorite" to="/wishlist" badge={2} />

          <Link
            to="/cos"
            className="relative h-12 inline-flex items-center gap-2 px-3 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-semibold shadow-sm"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden md:inline text-sm">Coș</span>
            <span className="h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              1
            </span>
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-11 w-11 inline-flex items-center justify-center rounded-full bg-surface border border-border"
            aria-label="Meniu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mega menu panel */}
      {megaOpen && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full bg-background border-b border-border shadow-elev animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
        >
          <div className="container-x py-8 grid grid-cols-12 gap-8">
            <ul className="col-span-8 grid grid-cols-2 gap-3">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/categorie/${c.slug}`}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-surface border border-transparent hover:border-border transition-all"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors shrink-0">
                      <c.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-accent transition-colors">{c.name}</div>
                      <div className="text-sm text-muted-foreground">{c.desc}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="col-span-4 rounded-2xl bg-gradient-navy text-primary-foreground p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative">
                <span className="text-xs uppercase tracking-widest text-accent font-bold">Ofertă specială</span>
                <h4 className="mt-2 font-display text-xl font-extrabold">Sisteme complete de la 14.999 lei</h4>
                <p className="mt-2 text-sm text-primary-foreground/70">Kit fotovoltaic 5 kWp cu instalare inclusă în toată țara.</p>
                <Link to="/categorie/oferte" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Vezi ofertele →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Caută produse ..." className="pl-10" />
            </div>
            <ul className="grid gap-1">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to={`/categorie/${c.slug}`} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-surface text-sm font-medium" onClick={() => setOpen(false)}>
                    <c.icon className="h-4 w-4 text-accent" />
                    {c.name}
                  </Link>
                </li>
              ))}
              <li className="border-t border-border my-2" />
              <li><Link to="/cont" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-surface text-sm font-medium"><User className="h-4 w-4" /> Contul meu</Link></li>
              <li><Link to="/wishlist" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-surface text-sm font-medium"><Heart className="h-4 w-4" /> Favorite</Link></li>
              <li><a href="mailto:office@solarhev.ro" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-surface text-sm font-medium"><Mail className="h-4 w-4" /> Contact</a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

const IconAction = ({
  icon: Icon,
  label,
  sublabel,
  to,
  badge,
}: {
  icon: typeof User;
  label: string;
  sublabel: string;
  to: string;
  badge?: number;
}) => (
  <Link
    to={to}
    className="hidden md:flex relative h-12 items-center gap-2 px-2 rounded-full hover:bg-surface transition-colors group"
  >
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface group-hover:bg-accent/10 border border-border group-hover:border-accent/30 transition-colors">
      <Icon className="h-4 w-4 text-foreground group-hover:text-accent transition-colors" />
    </span>
    <span className="hidden xl:flex flex-col leading-tight">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold text-foreground">{sublabel}</span>
    </span>
    {badge ? (
      <span className="absolute top-0 left-7 h-4 min-w-4 px-1 rounded-full bg-accent text-accent-foreground text-[9px] font-bold flex items-center justify-center">
        {badge}
      </span>
    ) : null}
  </Link>
);

export default Header;
