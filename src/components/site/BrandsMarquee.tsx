const brands = ["LONGi", "SolarEdge", "LG", "HUAWEI", "Canadian Solar", "DEYE", "Dyness", "UHome"];

const BrandsMarquee = () => (
  <section className="py-10 border-y border-border bg-background overflow-hidden">
    <div className="container-x mb-6 text-center">
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
        Branduri oficiale cu care colaborăm
      </span>
    </div>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex animate-marquee" style={{ width: "max-content" }}>
        {[...brands, ...brands].map((b, i) => (
          <div
            key={i}
            className="mx-8 flex items-center shrink-0 font-display text-3xl md:text-4xl font-extrabold text-muted-foreground/40 hover:text-primary transition-colors tracking-tight"
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BrandsMarquee;
