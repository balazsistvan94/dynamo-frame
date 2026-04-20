import { useMemo, useState } from "react";
import { Calculator, Sun, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReveal } from "@/hooks/useReveal";

const SolarCalculator = () => {
  const ref = useReveal<HTMLDivElement>();
  const [kwh, setKwh] = useState(350);
  const [type, setType] = useState<"casa" | "apartament" | "firma">("casa");

  const { kwp, savings, payback } = useMemo(() => {
    const annualKwh = kwh * 12;
    // rough: 1 kWp ≈ 1200 kWh/yr in RO
    const factor = type === "firma" ? 1.1 : type === "apartament" ? 0.9 : 1;
    const kwp = Math.max(1, Math.round((annualKwh / 1200) * factor * 10) / 10);
    const pricePerKwh = 1.3; // lei
    const savings = Math.round(annualKwh * pricePerKwh * 0.85);
    const systemCost = kwp * 4500;
    const payback = Math.max(1, Math.round((systemCost / savings) * 10) / 10);
    return { kwp, savings, payback };
  }, [kwh, type]);

  return (
    <section className="section-y">
      <div ref={ref} className="container-x reveal">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface via-background to-accent/10 border border-border p-8 md:p-12">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                <Calculator className="h-3.5 w-3.5" /> Calculator Solar
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-balance">
                Calculează-ți <span className="text-accent">economia</span> în câteva secunde
              </h2>
              <p className="mt-3 text-muted-foreground">
                Află dimensiunea recomandată a sistemului fotovoltaic, economia anuală estimată și perioada de amortizare.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Consum mediu lunar (kWh)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={100}
                      max={1500}
                      step={10}
                      value={kwh}
                      onChange={(e) => setKwh(+e.target.value)}
                      className="flex-1 accent-[hsl(var(--accent))]"
                    />
                    <Input
                      type="number"
                      value={kwh}
                      onChange={(e) => setKwh(+e.target.value || 0)}
                      className="w-24 text-center font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Tip proprietate</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["casa", "apartament", "firma"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`h-11 rounded-xl text-sm font-semibold border-2 transition-all capitalize ${
                          type === t
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border hover:border-accent"
                        }`}
                      >
                        {t === "casa" ? "Casă" : t === "apartament" ? "Apartament" : "Firmă"}
                      </button>
                    ))}
                  </div>
                </div>
                <Button size="lg" className="h-12 w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Solicită ofertă personalizată
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Sun, label: "Sistem recomandat", value: `${kwp} kWp`, accent: true },
                { icon: TrendingUp, label: "Economie anuală estimată", value: `${savings.toLocaleString("ro-RO")} lei` },
                { icon: Clock, label: "Perioadă amortizare", value: `${payback} ani` },
              ].map((r, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    r.accent
                      ? "bg-primary text-primary-foreground border-primary shadow-glow"
                      : "bg-background border-border"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${r.accent ? "bg-accent text-accent-foreground" : "bg-accent/15 text-accent"}`}>
                      <r.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-xs uppercase tracking-wider ${r.accent ? "text-accent" : "text-muted-foreground"}`}>{r.label}</div>
                      <div className="font-display text-3xl font-extrabold mt-1">{r.value}</div>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground text-center">
                * Estimări orientative bazate pe preț mediu 1.3 lei/kWh și 1200 kWh/kWp/an.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
