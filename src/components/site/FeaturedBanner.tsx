import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import bg from "@/assets/featured-bg.jpg";
import product from "@/assets/hero-battery.jpg";

const specs = [
  "9,7 kWh capacitate utilă",
  ">8000 cicluri de încărcare",
  "Eficiență > 90%",
  "BMS avansat, CAN / RS485",
  "Garanție 10 ani",
];

const FeaturedBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh && rect.bottom > 0) {
        const p = (vh - rect.top) / (vh + rect.height);
        setY((p - 0.5) * 80);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: `center ${50 + y * 0.3}%`,
          transform: `translateY(${y}px)`,
          willChange: "transform",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />

      <div className="container-x relative py-20 md:py-28 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-extrabold uppercase tracking-wider">
            Ofertă premium · Stoc limitat
          </span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl font-extrabold leading-tight text-balance">
            Maximizează-ți <span className="text-accent">independența energetică</span> cu Easyway UNIV-HV
          </h2>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {specs.map((s) => (
              <li key={s} className="flex items-center gap-2.5 text-sm">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                <span className="text-primary-foreground/85">{s}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="h-12 px-7 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-glow">
              Vezi bateria Easyway <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-7 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent font-semibold">
              Solicită ofertă personalizată
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:flex justify-center">
          <div className="absolute inset-0 bg-sun-glow" />
          <img src={product} alt="Easyway UNIV-HV" loading="lazy" className="relative max-h-[420px] w-auto object-contain animate-float drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanner;
