import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useReveal } from "@/hooks/useReveal";

const Newsletter = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-y">
      <div ref={ref} className="container-x reveal">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-solar p-10 md:p-14">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }} />
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent-foreground/10 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-accent-foreground">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-balance">
                Abonează-te la newsletter
              </h2>
              <p className="mt-2 text-accent-foreground/80 max-w-md">
                Te anunțăm imediat ce avem reduceri speciale pentru tine — produse premium la cele mai bune prețuri.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Te-ai abonat cu succes!", { description: "Îți vom trimite ofertele pe email." });
              }}
              className="flex flex-col sm:flex-row gap-3 bg-background/95 backdrop-blur p-2 rounded-2xl shadow-elev"
            >
              <Input
                type="email"
                required
                placeholder="Adresa ta de email"
                className="h-12 border-0 bg-transparent focus-visible:ring-0 text-base flex-1"
              />
              <Button type="submit" size="lg" className="h-12 px-7 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Trimite <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
