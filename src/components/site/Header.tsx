import { useEffect, useState } from "react";
import { Search, ShoppingCart, Menu, X, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const NAV = [
  "Panouri Fotovoltaice",
  "Invertoare",
  "Baterii solare",
  "Structuri",
  "Stații încărcare",
  "Oferte Speciale",
  "Contact",
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background/85 backdrop-blur-xl transition-all ${
        scrolled ? "shadow-md border-b border-border" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center gap-6">
        <a href="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="SolarHev logo" className="h-12 w-auto rounded-md" />
        </a>

        <div className="hidden lg:flex flex-1 max-w-lg relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Caută produse ..."
            className="pl-11 pr-24 h-11 bg-surface border-border/70 focus-visible:ring-accent"
          />
          <Button size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            Search
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <a href="tel:+40775311632" className="hidden xl:flex items-center gap-2 text-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Phone className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Sună acum</span>
              <span className="font-semibold text-foreground">+40.775.311.632</span>
            </span>
          </a>
          <button className="relative h-11 w-11 inline-flex items-center justify-center rounded-full bg-surface hover:bg-accent/10 border border-border transition-colors group">
            <ShoppingCart className="h-5 w-5 text-foreground group-hover:text-accent" />
            <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
              1
            </span>
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-11 w-11 inline-flex items-center justify-center rounded-full bg-surface border border-border"
            aria-label="Meniu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav className="hidden lg:block border-t border-border/60">
        <ul className="container-x flex h-12 items-center gap-8 text-sm font-medium">
          {NAV.map((item) => (
            <li key={item}>
              <a href="#" className="underline-anim text-foreground/80 hover:text-foreground transition-colors">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Caută produse ..." className="pl-10" />
            </div>
            <ul className="grid gap-1">
              {NAV.map((item) => (
                <li key={item}>
                  <a href="#" className="block px-3 py-2.5 rounded-lg hover:bg-surface text-sm font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
