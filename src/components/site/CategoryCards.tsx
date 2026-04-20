import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import panels from "@/assets/cat-panels-real.jpg";
import inverters from "@/assets/cat-inverters-real.jpg";
import batteries from "@/assets/hero-batteries-rack.jpg";
import structures from "@/assets/cat-structures-real.jpg";
import charging from "@/assets/cat-charging-real.jpg";

const cats = [
  { title: "Panouri Fotovoltaice", slogan: "Transformă Soarele în Energie!", img: panels },
  { title: "Invertoare", slogan: "Eficiență și Fiabilitate!", img: inverters },
  { title: "Baterii Solare", slogan: "Energia Ta, Rezervată!", img: batteries },
  { title: "Structuri", slogan: "Montaj Sigur, Durabil!", img: structures },
  { title: "Stații Încărcare", slogan: "Mobilitate Electrică!", img: charging },
];

const TiltCard = ({ cat, large = false }: { cat: (typeof cats)[0]; large?: boolean }) => {
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateZ(0)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };
  return (
    <a
      href="#"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card group relative overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-card hover:shadow-elev transition-shadow ${large ? "row-span-2 min-h-[420px]" : "min-h-[260px]"}`}
    >
      <img
        src={cat.img}
        alt={cat.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
      <div className="relative h-full p-6 flex flex-col justify-end">
        <div className="text-xs uppercase tracking-widest text-accent font-semibold">{cat.slogan}</div>
        <h3 className={`mt-2 font-display font-bold ${large ? "text-3xl" : "text-xl"}`}>{cat.title}</h3>
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Descoperă
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </a>
  );
};

const CategoryCards = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-y">
      <div ref={ref} className="container-x reveal">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-accent font-bold">Categorii</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold">Soluții complete pentru casa ta</h2>
          </div>
          <a href="#" className="underline-anim text-sm font-semibold">Vezi toate categoriile →</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <TiltCard cat={cats[0]} large />
          <TiltCard cat={cats[1]} />
          <TiltCard cat={cats[2]} />
          <TiltCard cat={cats[3]} />
          <TiltCard cat={cats[4]} />
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
