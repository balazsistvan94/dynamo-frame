import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const videos = [
  {
    id: 1,
    eyebrow: "Tehnologie",
    title: "Celule N-Type ABC",
    meta: "02:14",
    accent: "de la arhitectură la randament",
  },
  {
    id: 2,
    eyebrow: "Performanță",
    title: "Eficiență de top",
    meta: "01:48",
    accent: "producție stabilă în condiții reale",
  },
  {
    id: 3,
    eyebrow: "Fiabilitate",
    title: "Garanție extinsă",
    meta: "03:02",
    accent: "construit pentru proiecte pe termen lung",
  },
];

const AikoVideos = () => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-navy opacity-70" />
        <div className="absolute -top-24 right-[12%] h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-[8%] h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>

      <div className="container-x relative z-10 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                AIKO Solar
              </span>
            </div>

            <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-[3rem] font-extrabold leading-[1.02] tracking-tight text-balance">
              AIKO, prezentat clar în 3 materiale video.
            </h2>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/72 md:text-lg">
              Tehnologie, randament și fiabilitate — într-un format scurt, premium, ușor de parcurs.
            </p>
          </div>

          <div className="lg:justify-self-end lg:w-full lg:max-w-md">
            <div className="border border-primary-foreground/10 bg-primary-foreground/5 p-5 backdrop-blur-sm md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-primary-foreground/52">
                Colecția AIKO
              </p>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/72">
                Descoperă gama completă de panouri AIKO disponibile acum și mergi direct la produsele brandului.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-5 h-12 w-full rounded-none bg-accent px-6 text-sm font-extrabold uppercase tracking-[0.14em] text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/categorie/aiko">
                  Vezi panourile AIKO
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {videos.map((v, i) => (
            <article
              key={v.id}
              className="group border border-primary-foreground/10 bg-primary-foreground/[0.03] p-4 transition-transform duration-300 hover:-translate-y-1 hover:bg-primary-foreground/[0.05] md:p-5"
            >
              <div className="flex items-center justify-between gap-4 border-b border-primary-foreground/10 pb-3">
                <span className="font-display text-sm font-bold tracking-[0.18em] text-primary-foreground/42">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-medium tracking-[0.18em] text-primary-foreground/42 uppercase">
                  {v.meta}
                </span>
              </div>

              <div className="relative mt-4 aspect-[16/10] overflow-hidden border border-primary-foreground/10 bg-gradient-to-br from-primary-foreground/10 via-primary-foreground/[0.03] to-transparent">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary-foreground)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary-foreground)/0.06)_1px,transparent_1px)] bg-[size:22px_22px] opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2 border border-primary-foreground/12 bg-primary/60 px-3 py-2 backdrop-blur-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/52">
                      Video mockup
                    </p>
                    <p className="text-sm font-medium text-primary-foreground">AIKO Brand</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                    {v.eyebrow}
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-tight text-primary-foreground">
                    {v.accent}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  {v.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold leading-[1.05] tracking-tight text-primary-foreground">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/64">
                  Material video placeholder pregătit pentru conținutul final AIKO.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AikoVideos;
