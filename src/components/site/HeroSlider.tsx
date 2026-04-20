import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Shield, BatteryCharging, Sparkles } from "lucide-react";
import heroBattery from "@/assets/hero-battery.jpg";
import heroBatteriesRack from "@/assets/hero-batteries-rack.jpg";
import heroHouse from "@/assets/hero-house.jpg";

type Slide = {
  eyebrow: string;
  title: string;
  highlight: string;
  desc: string;
  image: string;
  badges: { icon: React.ElementType; label: string; sub: string }[];
  primary: string;
  secondary: string;
  discount?: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Oferte Speciale · Stoc limitat",
    title: "Independență energetică totală cu",
    highlight: "Easyway UNIV-HV 10 kWh",
    desc: "Acumulator High Voltage LiFePO₄ cu 9,7 kWh utili, peste 8000 cicluri și eficiență >90%. BMS avansat, comunicație CAN / RS485.",
    image: heroBattery,
    badges: [
      { icon: BatteryCharging, label: "9,7 kWh", sub: "Capacitate utilă" },
      { icon: Zap, label: ">90%", sub: "Eficiență" },
      { icon: Shield, label: "10 ani", sub: "Garanție" },
    ],
    primary: "Vezi bateria Easyway",
    secondary: "Solicită ofertă",
    discount: "-18%",
  },
  {
    eyebrow: "Nou în stoc",
    title: "Putere și control absolut cu",
    highlight: "Invertor DEYE Hibrid 6 kW",
    desc: "Hibrid monofazic 48V, compatibil cu toate tipurile de baterii LiFePO₄. Monitorizare WiFi, protecții complete, design compact.",
    image: heroBatteriesRack,
    badges: [
      { icon: Zap, label: "6 kW", sub: "Putere nominală" },
      { icon: BatteryCharging, label: "48 V", sub: "DC" },
      { icon: Shield, label: "5 ani", sub: "Garanție" },
    ],
    primary: "Vezi invertorul",
    secondary: "Compară modele",
    discount: "Nou",
  },
  {
    eyebrow: "Sistem complet la cheie",
    title: "Transformă-ți casa într-o",
    highlight: "centrală solară independentă",
    desc: "Panouri Longi premium, invertoare Huawei și baterii LiFePO₄. Proiectare, montaj și suport tehnic — totul într-un singur loc.",
    image: heroHouse,
    badges: [
      { icon: Zap, label: "Turnkey", sub: "Instalare" },
      { icon: Shield, label: "25 ani", sub: "Panouri" },
      { icon: BatteryCharging, label: "0 LEI", sub: "Factură" },
    ],
    primary: "Solicită proiect",
    secondary: "Vezi galerie",
    discount: "Premium",
  },
];

const HeroSlider = () => {
  const [i, setI] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const tickStart = Date.now();
    const DUR = 7000;
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - tickStart) / DUR) * 100);
      setProgress(p);
      if (p >= 100) setI((v) => (v + 1) % slides.length);
    }, 40);
    return () => clearInterval(id);
  }, [i]);

  const s = slides[i];

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        {slides.map((slide, k) => (
          <div
            key={k}
            className={`absolute inset-0 transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.image}
              alt=""
              aria-hidden
              className="w-full h-full object-cover scale-110 animate-float"
              style={{ animationDuration: "20s" }}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Sun glow accent */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-accent/20 blur-3xl animate-sun-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-eco/10 blur-3xl" />

      {/* Animated SVG sun */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-20 h-[500px] w-[500px] text-accent/20 animate-spin-slow hidden lg:block"
        viewBox="0 0 200 200"
        fill="none"
      >
        {Array.from({ length: 24 }).map((_, k) => (
          <line
            key={k}
            x1="100"
            y1="100"
            x2="100"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${k * 15} 100 100)`}
            opacity={k % 2 ? 0.4 : 0.8}
          />
        ))}
      </svg>

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[640px] lg:min-h-[720px] py-16 lg:py-24">
          {/* Text content */}
          <div key={`txt-${i}`} className="lg:col-span-7 animate-fade-in relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold uppercase tracking-wider shadow-glow">
              <Sparkles className="h-4 w-4" />
              {s.eyebrow}
            </span>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight">
              <span className="block text-primary-foreground">{s.title}</span>
              <span className="block mt-2 bg-gradient-to-r from-accent via-accent to-accent/80 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,182,0,0.3)]">
                {s.highlight}
              </span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed font-medium">
              {s.desc}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-glow hover:scale-105 transition-transform"
              >
                {s.primary} <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base bg-primary-foreground/5 backdrop-blur border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold"
              >
                {s.secondary}
              </Button>
            </div>

            {/* Badges */}
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl border-t border-primary-foreground/15 pt-8">
              {s.badges.map((b) => (
                <div key={b.label} className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent border border-accent/30">
                    <b.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="font-extrabold text-xl sm:text-2xl leading-none text-primary-foreground">{b.label}</div>
                    <div className="text-[11px] sm:text-xs text-primary-foreground/60 uppercase tracking-wider mt-1.5 font-semibold">
                      {b.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side: floating product card */}
          <div key={`img-${i}`} className="lg:col-span-5 relative animate-scale-in hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2.5rem] overflow-hidden bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/20 shadow-2xl aspect-square">
                <img
                  src={s.image}
                  alt={s.highlight}
                  className="w-full h-full object-cover animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>

              {/* Floating spec card */}
              <div className="absolute -left-6 bottom-12 bg-background text-foreground border border-border rounded-2xl shadow-2xl p-4 flex items-center gap-3 animate-float" style={{ animationDelay: "1s" }}>
                <div className="h-12 w-12 rounded-xl bg-eco/15 text-eco flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold">Eficiență</div>
                  <div className="font-extrabold text-lg">{">"}90%</div>
                </div>
              </div>

              {/* Discount badge */}
              <div className="absolute -right-4 top-10 bg-accent text-accent-foreground rounded-2xl shadow-2xl px-5 py-4 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="text-[10px] uppercase tracking-wider font-bold opacity-80">Ofertă</div>
                <div className="font-extrabold text-2xl leading-none mt-1">{s.discount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls bar */}
        <div className="relative z-10 pb-10 flex items-center gap-4 sm:gap-6">
          {/* Slide counter */}
          <div className="flex items-baseline gap-2 font-display font-bold">
            <span className="text-3xl sm:text-4xl text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm text-primary-foreground/50">/ {String(slides.length).padStart(2, "0")}</span>
          </div>

          {/* Progress line */}
          <div className="flex-1 h-[2px] bg-primary-foreground/15 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>

          {/* Dots */}
          <div className="hidden sm:flex gap-2">
            {slides.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? "w-10 bg-accent" : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/60"}`}
                aria-label={`Slide ${k + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)}
              className="h-12 w-12 rounded-full border border-primary-foreground/20 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setI((v) => (v + 1) % slides.length)}
              className="h-12 w-12 rounded-full border border-primary-foreground/20 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
              aria-label="Următor"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
