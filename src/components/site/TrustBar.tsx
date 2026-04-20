import { Truck, Headphones, ShieldCheck, Award } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const items = [
  { icon: Truck, title: "Livrare rapidă", sub: "24-72h în toată România" },
  { icon: Headphones, title: "Suport tehnic", sub: "Consultanță dedicată" },
  { icon: ShieldCheck, title: "Plăți securizate", sub: "SSL + 3D Secure" },
  { icon: Award, title: "Produse premium", sub: "Branduri certificate" },
];

const TrustBar = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="border-y border-border bg-surface">
      <div ref={ref} className="container-x reveal py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.title} className="group flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all group-hover:-translate-y-1">
                <it.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold text-sm">{it.title}</div>
                <div className="text-xs text-muted-foreground">{it.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
