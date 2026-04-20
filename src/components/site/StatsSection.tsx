import { useEffect, useRef, useState } from "react";
import { Users, ShieldCheck, Zap, Smile } from "lucide-react";

type Stat = { icon: React.ElementType; end: number; suffix: string; label: string; decimals?: number };

const stats: Stat[] = [
  { icon: Users, end: 500, suffix: "+", label: "Instalări finalizate" },
  { icon: ShieldCheck, end: 10, suffix: " ani", label: "Garanție extinsă" },
  { icon: Zap, end: 2.5, suffix: " MW", label: "Putere instalată", decimals: 1 },
  { icon: Smile, end: 98, suffix: "%", label: "Clienți mulțumiți" },
];

const Counter = ({ end, decimals = 0, suffix }: { end: number; decimals?: number; suffix: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.3 });
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

const StatsSection = () => (
  <section className="relative overflow-hidden bg-primary text-primary-foreground section-y">
    <div className="absolute inset-0 opacity-[0.07]" style={{
      backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--accent)) 1px, transparent 0)",
      backgroundSize: "32px 32px",
    }} />
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[800px] bg-accent/20 blur-3xl rounded-full" />
    <div className="container-x relative">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest text-accent font-bold">Cifre care contează</span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold">Încrederea clienților în fiecare kWh</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center p-6 rounded-2xl bg-primary-foreground/[0.03] border border-primary-foreground/10 backdrop-blur">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground mb-4">
              <s.icon className="h-6 w-6" />
            </div>
            <div className="font-display text-4xl sm:text-5xl font-extrabold text-accent leading-none">
              <Counter end={s.end} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-sm text-primary-foreground/70 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
