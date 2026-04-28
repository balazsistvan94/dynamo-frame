import { useState } from "react";
import { Play, ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";

const videos = [
  {
    id: 1,
    eyebrow: "Episodul 01",
    title: "Tehnologia ABC",
    meta: "Inovație · 2:14",
    poster:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    eyebrow: "Episodul 02",
    title: "Eficiență 24%",
    meta: "Performanță · 1:48",
    poster:
      "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    eyebrow: "Episodul 03",
    title: "30 Ani Garanție",
    meta: "Calitate · 3:02",
    poster:
      "https://images.unsplash.com/photo-1566093097221-ac2335b09e70?auto=format&fit=crop&w=1400&q=80",
  },
];

const AikoVideos = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-28 bg-[#0b111d] text-white overflow-hidden">
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="container-x relative z-10">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-8 mb-14 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">
                AIKO Solar
              </span>
            </div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/40">
              Serie video · 2026
            </p>
          </div>

          <div className="col-span-12 md:col-span-9 md:border-l md:border-white/10 md:pl-10">
            <h2 className="font-display text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-tight font-semibold max-w-3xl">
              O privire în interiorul tehnologiei{" "}
              <span className="italic font-normal text-white/50">
                care redefinește energia solară.
              </span>
            </h2>
          </div>
        </div>

        {/* Videos */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {videos.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={`group relative text-left col-span-12 md:col-span-4 ${
                i === 1 ? "md:mt-12" : ""
              }`}
            >
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-display text-xs tracking-[0.25em] uppercase text-white/40">
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">
                  {v.meta}
                </span>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={v.poster}
                  alt={v.title}
                  className="w-full h-full object-cover opacity-80 transition-all duration-[1200ms] ease-out group-hover:opacity-100 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

                <div className="absolute inset-0 flex items-end p-6">
                  <div className="flex items-center gap-3 text-white">
                    <span className="w-11 h-11 rounded-full bg-primary text-[#0b111d] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    </span>
                    <span className="text-[11px] tracking-[0.2em] uppercase font-semibold">
                      Watch
                    </span>
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <div className="w-6 h-6 border-l border-t border-white/60" />
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 border-r border-t border-white/60" />
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[10px] tracking-[0.25em] uppercase text-primary font-bold mb-2">
                  {v.eyebrow}
                </p>
                <h3 className="font-display text-2xl md:text-[1.6rem] leading-tight font-medium tracking-tight text-white">
                  {v.title}
                </h3>
                <div className="mt-4 h-px w-10 bg-primary transition-all duration-500 group-hover:w-24" />
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 md:mt-24 grid grid-cols-12 gap-8 items-end border-t border-white/10 pt-10">
          <div className="col-span-12 md:col-span-7">
            <p className="text-[10px] tracking-[0.25em] uppercase text-primary font-bold mb-3">
              — Colecția AIKO
            </p>
            <h3 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-tight font-semibold max-w-xl text-white">
              Vezi toate panourile AIKO disponibile în stoc.
            </h3>
          </div>

          <div className="col-span-12 md:col-span-5 flex md:justify-end">
            <Link
              to="/categorie/aiko"
              className="group inline-flex items-center gap-4 bg-primary text-[#0b111d] pl-7 pr-3 py-3 rounded-full hover:bg-white transition-colors duration-300"
            >
              <span className="text-sm font-bold tracking-wider uppercase">
                Vezi produsele AIKO
              </span>
              <span className="w-11 h-11 rounded-full bg-[#0b111d] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-[#0b111d] transition-colors duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video bg-[#0b111d] border border-white/10 flex items-center justify-center"
          >
            <div className="text-center px-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">
                Video Mockup
              </p>
              <h3 className="text-white font-display text-2xl md:text-3xl font-medium tracking-tight">
                {videos.find((x) => x.id === active)?.title}
              </h3>
              <p className="text-white/40 mt-3 text-sm">
                Videoclipul va fi adăugat în curând.
              </p>
            </div>
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 w-10 h-10 text-white/70 hover:text-white flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AikoVideos;
