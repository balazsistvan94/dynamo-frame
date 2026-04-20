import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Shield, BatteryCharging } from "lucide-react";
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
};

const slides: Slide[] = [
  {
    eyebrow: "Oferte Speciale · Stoc limitat",
    title: "Maximizează-ți independența energetică cu",
    highlight: "Easyway UNIV-HV 10 kWh",
    desc: "Acumulator High Voltage LiFePO₄ cu 9,7 kWh utili, peste 8000 cicluri și eficiență >90%. BMS avansat, comunicație CAN / RS485.",
    image: heroBattery,
    badges: [
      { icon: BatteryCharging, label: "9,7 kWh", sub: "utili" },
      { icon: Zap, label: ">90%", sub: "eficiență" },
      { icon: Shield, label: "10 ani", sub: "garanție" },
    ],
    primary: "Vezi bateria Easyway",
    secondary: "Solicită ofertă",
  },
  {
    eyebrow: "Nou în stoc",
    title: "Putere și control cu",
    highlight: "Invertor DEYE hibrid 6 kW",
    desc: "Hibrid monofazic 48V, compatibil cu toate tipurile de baterii LiFePO₄. Monitorizare WiFi, protecții complete, design compact.",
    image: heroBatteriesRack,
    badges: [
      { icon: Zap, label: "6 kW", sub: "putere" },
      { icon: BatteryCharging, label: "48 V", sub: "DC" },
      { icon: Shield, label: "5 ani", sub: "garanție" },
    ],
    primary: "Vezi invertorul",
    secondary: "Compară modele",
  },
  {
    eyebrow: "Sistem complet",
    title: "Transformă-ți casa într-o",
    highlight: "centrală solară independentă",
    desc: "Panouri Longi premium, invertoare Huawei și baterii LiFePO₄. Proiectare, montaj și suport tehnic — totul într-un singur loc.",
    image: heroHouse,
    badges: [
      { icon: Zap, label: "Turnkey", sub: "instalare" },
      { icon: Shield, label: "25 ani", sub: "panouri" },
      { icon: BatteryCharging, label: "0 LEI", sub: "factură" },
    ],
    primary: "Solicită proiect",
    secondary: "Vezi galerie",
  },
];

const HeroSlider = () => {
  const [i, setI] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const tickStart = Date.now();
    const DUR = 6000;
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - tickStart) / DUR) * 100);
      setProgress(p);
      if (p >= 100) setI((v) => (v + 1) % slides.length);
    }, 40);
    return () => clearInterval(id);
  }, [i]);

  const s = slides[i];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface via-background to-background">
      {/* Sun glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-sun-glow animate-sun-pulse" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-60" />

      {/* Animated SVG sun */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-20 h-[500px] w-[500px] text-accent/30 animate-spin-slow"
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
        <circle cx="100" cy="100" r="30" fill="currentColor" opacity="0.3" />
      </svg>

      <div className="container-x relative section-y">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[520px]">
          <div key={`txt-${i}`} className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {s.eyebrow}
            </span>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-balance">
              {s.title}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-solar bg-clip-text text-transparent">
                  {s.highlight}
                </span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-accent/25 -z-0" />
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">{s.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="h-12 px-7 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-glow">
                {s.primary} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-7 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                {s.secondary}
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              {s.badges.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-accent">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-bold text-lg leading-none">{b.label}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div key={`img-${i}`} className="relative animate-scale-in">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-solar opacity-20 blur-3xl" />
            <div className="relative rounded-[2rem] overflow-hidden bg-surface shadow-elev border border-border/50">
              <div className="absolute inset-0 bg-sun-glow" />
              <img
                src={s.image}
                alt={s.highlight}
                width={1024}
                height={1024}
                className="relative z-10 w-full h-auto object-cover animate-float"
              />
            </div>
            {/* Floating spec card */}
            <div className="absolute -left-4 bottom-8 bg-background border border-border rounded-2xl shadow-elev p-4 flex items-center gap-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="h-10 w-10 rounded-xl bg-eco/15 text-eco flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Eficiență</div>
                <div className="font-bold">{">"}90%</div>
              </div>
            </div>
            <div className="absolute -right-2 top-8 bg-primary text-primary-foreground rounded-2xl shadow-elev px-4 py-3 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="text-[10px] uppercase tracking-wider text-accent">Ofertă</div>
              <div className="font-bold text-lg">-18%</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-6">
          <div className="flex gap-2">
            {slides.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? "w-10 bg-accent" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
                aria-label={`Slide ${k + 1}`}
              />
            ))}
          </div>
          <div className="flex-1 h-px bg-border relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)}
              className="h-11 w-11 rounded-full border border-border hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setI((v) => (v + 1) % slides.length)}
              className="h-11 w-11 rounded-full border border-border hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
              aria-label="Următor"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
