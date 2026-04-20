import { Star, ShoppingCart, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useReveal } from "@/hooks/useReveal";
import img1 from "@/assets/cat-inverter-product.jpg";
import img2 from "@/assets/hero-battery.jpg";
import img3 from "@/assets/hero-batteries-rack.jpg";

const offers = [
  { img: img1, name: "Baterie UHome 10,24 kW LiFePO4", spec: "51.2V LiFePO4, garanție 10 ani, stingere integrată", price: 4999, old: 5400, rating: 5 },
  { img: img2, name: "Baterie LiFePO4 RS-R51100A Ecosolex", spec: "51.2V, 100Ah, 5.12 kWh, energie nominală premium", price: 2799, old: 4583, rating: 5 },
  { img: img3, name: "Baterie Dyness PowerBrick 14.336 kWh", spec: "51.2V LiFePO4, sistem stingere integrat", price: 7263, old: 8999, rating: 5 },
  { img: img1, name: "Invertor DEYE Hibrid 6 kW", spec: "48V monofazic, WiFi inclus, battery-ready", price: 4101, old: 4799, rating: 5 },
  { img: img2, name: "Easyway UNIV-HV 10 kWh", spec: "High Voltage LiFePO4, 9,7 kWh utili, >8000 cicluri", price: 11999, old: 13500, rating: 5 },
  { img: img3, name: "Baterie STELTEC FLEX-L4", spec: "Modular, scalabil, BMS integrat", price: 7446, old: 8200, rating: 5 },
];

const OfferCard = ({ o }: { o: (typeof offers)[0] }) => (
  <div className="group h-full bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elev hover:-translate-y-1 transition-all">
    <div className="relative aspect-[4/3] bg-surface overflow-hidden">
      <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-wider">
        <Flame className="h-3 w-3" /> Ofertă limitată
      </span>
      <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-extrabold">
        -{Math.round(((o.old - o.price) / o.old) * 100)}%
      </span>
      <img src={o.img} alt={o.name} loading="lazy" className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="p-5">
      <div className="flex items-center gap-1 text-accent mb-2">
        {Array.from({ length: o.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
        <span className="text-xs text-muted-foreground ml-1">5/5</span>
      </div>
      <h3 className="font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">{o.name}</h3>
      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">{o.spec}</p>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-xs text-muted-foreground line-through">{o.old.toLocaleString("ro-RO")} RON</div>
          <div className="text-2xl font-extrabold text-primary leading-none">
            {o.price.toLocaleString("ro-RO")} <span className="text-sm font-semibold text-accent">RON</span>
          </div>
          <div className="text-[10px] uppercase text-muted-foreground mt-0.5">+TVA / buc</div>
        </div>
        <Button size="icon" className="h-10 w-10 rounded-full bg-primary hover:bg-accent hover:text-accent-foreground">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

const OffersCarousel = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-y bg-surface">
      <div ref={ref} className="container-x reveal">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-destructive font-bold">
              <Flame className="h-3.5 w-3.5" /> Hot Deals
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold">Oferte Speciale</h2>
            <p className="mt-2 text-muted-foreground">Prețuri reduse pentru perioadă limitată. Stoc disponibil.</p>
          </div>
          <a href="#" className="underline-anim text-sm font-semibold">Toate ofertele →</a>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="relative">
          <CarouselContent className="-ml-4">
            {offers.map((o, i) => (
              <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <OfferCard o={o} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-5 bg-background border-border hover:bg-accent hover:text-accent-foreground hover:border-accent" />
          <CarouselNext className="hidden md:flex -right-5 bg-background border-border hover:bg-accent hover:text-accent-foreground hover:border-accent" />
        </Carousel>
      </div>
    </section>
  );
};

export default OffersCarousel;
