import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const list = [
  {
    name: "Andrei Popescu",
    city: "Cluj-Napoca",
    text: "Instalare impecabilă, echipă profesionistă. Am scăzut factura cu 85% în prima lună. Recomand cu încredere!",
    initials: "AP",
  },
  {
    name: "Maria Ionescu",
    city: "București",
    text: "Consultanță tehnică excelentă. M-au ajutat să aleg exact ce aveam nevoie pentru casa noastră de 180 mp.",
    initials: "MI",
  },
  {
    name: "Radu Georgescu",
    city: "Oradea",
    text: "Produse premium la prețuri corecte, livrare rapidă și garanție extinsă. Clar cea mai bună alegere pe piață.",
    initials: "RG",
  },
];

const Testimonials = () => {
  const ref = useReveal<HTMLDivElement>();
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % list.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="section-y bg-surface">
      <div ref={ref} className="container-x reveal">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-accent font-bold">Testimoniale</span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold">Ce spun clienții noștri</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card overflow-hidden">
            <Quote className="absolute top-6 right-6 h-16 w-16 text-accent/15" />
            <div key={i} className="animate-fade-in">
              <div className="flex items-center gap-1 text-accent mb-5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="font-display text-xl md:text-2xl leading-relaxed text-balance">"{list[i].text}"</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-solar text-accent-foreground font-extrabold flex items-center justify-center">
                  {list[i].initials}
                </div>
                <div>
                  <div className="font-semibold">{list[i].name}</div>
                  <div className="text-sm text-muted-foreground">{list[i].city}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {list.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-2 bg-muted-foreground/30"}`}
                aria-label={`Testimonial ${k + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
