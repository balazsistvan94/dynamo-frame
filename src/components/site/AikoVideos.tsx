import { useState } from "react";
import { Play, ArrowRight, Award, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const videos = [
  {
    id: 1,
    title: "Tehnologia ABC – Performanță Garantată",
    subtitle: "Descoperă inovația AIKO",
    duration: "2:14",
    icon: Award,
    gradient: "from-[#ffb600]/30 via-[#0b111d]/60 to-[#0b111d]",
    poster:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Eficiență Record – Până la 24%",
    subtitle: "Panourile AIKO Neostar",
    duration: "1:48",
    icon: Zap,
    gradient: "from-emerald-500/30 via-[#0b111d]/60 to-[#0b111d]",
    poster:
      "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "30 Ani Garanție – Calitate Premium",
    subtitle: "De ce să alegi AIKO",
    duration: "3:02",
    icon: ShieldCheck,
    gradient: "from-sky-500/30 via-[#0b111d]/60 to-[#0b111d]",
    poster:
      "https://images.unsplash.com/photo-1566093097221-ac2335b09e70?auto=format&fit=crop&w=1200&q=80",
  },
];

const AikoVideos = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-white text-[#0b111d]">
      {/* subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="container-x relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              Brand Premium · AIKO
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Descoperă tehnologia{" "}
            <span className="text-primary">AIKO Solar</span>
          </h2>
          <p className="mt-3 text-[#5f5f5f] text-base md:text-lg">
            Tehnologie japoneză, eficiență record și până la 30 ani garanție.
            Vezi de ce mii de clienți aleg AIKO.
          </p>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {videos.map((v, i) => {
            const Icon = v.icon;
            const isFeatured = i === 1; // middle one slightly elevated
            return (
              <article
                key={v.id}
                onClick={() => setActive(v.id)}
                className={`group relative cursor-pointer rounded-2xl overflow-hidden border border-[#0b111d]/10 bg-white shadow-sm
                  transition-all duration-500 hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.45)]
                  ${isFeatured ? "md:-translate-y-3" : ""}`}
              >
                {/* Poster */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={v.poster}
                    alt={v.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b111d]/80 via-[#0b111d]/20 to-transparent" />

                  {/* Top row */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#0b111d]">
                        AIKO
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur text-[11px] font-mono text-white">
                      {v.duration}
                    </span>
                  </div>

                  {/* Center play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <span className="absolute inset-0 rounded-full bg-primary/40 blur-xl group-hover:bg-primary/60 transition" />
                      <div className="relative w-16 h-16 rounded-full bg-primary text-[#0b111d] flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-110">
                        <Play className="w-7 h-7 ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-1.5">
                    {v.subtitle}
                  </p>
                  <h3 className="font-display text-lg font-bold leading-snug text-[#0b111d]">
                    {v.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0b111d] group-hover:text-primary transition">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Urmărește video</span>
                  </div>
                </div>
              </article>

        {/* Mobile CTA */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link to="/categorie/aiko">
            <Button
              size="lg"
              className="bg-primary text-[#0b111d] hover:bg-primary/90 font-bold h-12 px-6 rounded-full"
            >
              Vezi produsele AIKO
              <ArrowRight />
            </Button>
          </Link>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-primary mb-1">
                  Ofertă specială AIKO
                </p>
                <h4 className="font-display text-xl md:text-2xl font-bold">
                  Configurează acum sistemul tău cu panouri AIKO
                </h4>
              </div>
            </div>
            <Link to="/categorie/aiko">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary hover:text-[#0b111d] font-bold rounded-full h-12 px-6 bg-transparent"
              >
                Explorează AIKO
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox modal placeholder */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#0b111d] flex items-center justify-center"
          >
            <div className="text-center px-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Play className="w-10 h-10 text-primary fill-current ml-1" />
              </div>
              <p className="text-white/60 text-sm uppercase tracking-widest mb-2">
                Video Mockup
              </p>
              <h3 className="text-white font-display text-2xl font-bold">
                {videos.find((x) => x.id === active)?.title}
              </h3>
              <p className="text-white/50 mt-2 text-sm">
                Videoclipul va fi adăugat în curând.
              </p>
            </div>
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AikoVideos;
