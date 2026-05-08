import { CreditCard, Banknote, Building2, ShieldCheck, Lock, Check, Info, Truck, Copy, AlertTriangle, Sparkles } from "lucide-react";
import { useState } from "react";
import TopBar from "@/components/site/TopBar";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import euplatescLogo from "@/assets/euplatesc.svg";

const Payment = () => {
  const [active, setActive] = useState<"card" | "transfer" | "ramburs">("card");

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    toast.success(`${label} copiat în clipboard`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-navy text-primary-foreground">
          <div className="absolute inset-0 bg-sun-glow opacity-60" />
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-sun-pulse" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-eco/20 blur-3xl" />
          <div className="container-x relative py-20 md:py-28">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 text-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider border border-accent/30">
                <ShieldCheck className="h-3.5 w-3.5" /> Tranzacții 100% securizate
              </span>
              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-balance">
                Metode de <span className="text-accent">plată</span>
              </h1>
              <p className="mt-5 text-lg text-primary-foreground/75 max-w-2xl leading-relaxed">
                Oferim multiple modalități de plată pentru a face achiziția produselor noastre cât mai convenabilă pentru dumneavoastră.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Badge icon={Lock} text="3-D Secure" />
                <Badge icon={ShieldCheck} text="SSL 256-bit" />
                <Badge icon={Sparkles} text="0% comision card" />
              </div>
            </div>
          </div>
        </section>

        {/* Method picker */}
        <section className="container-x py-16">
          <div className="grid md:grid-cols-3 gap-5">
            <MethodCard
              active={active === "card"}
              onClick={() => setActive("card")}
              icon={CreditCard}
              title="Card bancar online"
              subtitle="Visa / Mastercard"
              hint="Procesat prin EuPlătesc"
              accent="accent"
            />
            <MethodCard
              active={active === "transfer"}
              onClick={() => setActive("transfer")}
              icon={Building2}
              title="Ordin de plată"
              subtitle="Transfer bancar"
              hint="Factură proformă"
              accent="primary"
            />
            <MethodCard
              active={active === "ramburs"}
              onClick={() => setActive("ramburs")}
              icon={Banknote}
              title="Ramburs"
              subtitle="Numerar la curier"
              hint="Maxim 5.000 lei"
              accent="eco"
            />
          </div>

          {/* Detail panel */}
          <div className="mt-10">
            {active === "card" && (
              <div className="rounded-3xl border border-border bg-card shadow-elev overflow-hidden">
                <div className="grid lg:grid-cols-5">
                  {/* Left: EuPlatesc brand */}
                  <div className="lg:col-span-2 relative bg-gradient-navy text-primary-foreground p-10 flex flex-col justify-between overflow-hidden">
                    <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
                    <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-eco/20 blur-3xl" />
                    <div className="relative">
                      <span className="text-xs uppercase tracking-widest text-accent font-bold">Procesator de plăți</span>
                      <div className="mt-5 inline-flex items-center justify-center bg-background rounded-2xl px-6 py-5 shadow-glow">
                        <img src={euplatescLogo} alt="EuPlătesc" className="h-10 w-auto" />
                      </div>
                      <p className="mt-6 text-sm text-primary-foreground/75 leading-relaxed">
                        Veți fi redirecționat către pagina securizată a procesatorului de plăți EuPlătesc, unde veți completa formularul cu informațiile despre cardul dumneavoastră.
                      </p>
                    </div>
                    <div className="relative mt-10 flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1.5 rounded-md bg-white text-[#1a1f71] text-xs font-extrabold tracking-wider">VISA</span>
                      <span className="px-3 py-1.5 rounded-md bg-white text-[#eb001b] text-xs font-extrabold tracking-wider">MasterCard</span>
                      <span className="px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-xs font-bold">Maestro</span>
                      <span className="px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-xs font-bold">V. Electron</span>
                    </div>
                  </div>

                  {/* Right: details */}
                  <div className="lg:col-span-3 p-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Plată online cu cardul</h2>
                    <p className="mt-2 text-muted-foreground">Online cu card bancar prin EuPlătesc (Visa / Mastercard).</p>

                    <ul className="mt-7 space-y-5">
                      <FeatureRow
                        icon={ShieldCheck}
                        title="Sistem 3-D Secure"
                        text="Plățile cu carduri de credit/debit emise sub sigla Visa și MasterCard se efectuează prin sistemul „3-D Secure” care asigură același nivel de securitate ca tranzacțiile la bancomat."
                      />
                      <FeatureRow
                        icon={Lock}
                        title="Date 100% protejate"
                        text="Nicio informație legată de cardul dumneavoastră nu este transferată sau stocată pe serverele magazinului virtual."
                      />
                      <FeatureRow
                        icon={Sparkles}
                        title="Fără comision"
                        text="Pentru plățile prin card bancar nu este perceput niciun comision de la deținătorul de card."
                        highlight
                      />
                    </ul>

                  </div>
                </div>
              </div>
            )}

            {active === "transfer" && (
              <div className="rounded-3xl border border-border bg-card shadow-elev p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-10">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      <Building2 className="h-3.5 w-3.5" /> Transfer bancar
                    </span>
                    <h2 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight">Ordin de plată</h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      După plasarea comenzii se va emite o factură proformă, transmisă prin e-mail către client. Factura va conține toate datele necesare efectuării plății.
                    </p>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      După confirmarea plății, un reprezentant solarhev.ro va contacta clientul pentru stabilirea detaliilor de livrare.
                    </p>

                    <ol className="mt-8 space-y-4">
                      {[
                        "Plasezi comanda pe site",
                        "Primești factura proformă pe e-mail",
                        "Efectuezi transferul bancar",
                        "Te contactăm pentru livrare",
                      ].map((s, i) => (
                        <li key={s} className="flex items-start gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-solar opacity-20 blur-2xl rounded-3xl" />
                    <div className="relative rounded-2xl bg-gradient-navy text-primary-foreground p-8 shadow-elev">
                      <span className="text-xs uppercase tracking-widest text-accent font-bold">Date bancare</span>
                      <h3 className="mt-2 text-xl font-extrabold">SC SOLAR HEV SRL</h3>
                      <div className="mt-6 space-y-4">
                        <BankRow label="Beneficiar" value="SC SOLAR HEV SRL" onCopy={copy} />
                        <BankRow label="CUI" value="46325914" onCopy={copy} />
                        <BankRow label="Cont IBAN (RON)" value="RO11BTRLRONCRT0649830201" onCopy={copy} mono />
                        <BankRow label="Banca" value="Banca Transilvania" onCopy={copy} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === "ramburs" && (
              <div className="rounded-3xl border border-border bg-card shadow-elev overflow-hidden">
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 relative p-10 bg-gradient-to-br from-eco/15 via-background to-background flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-eco/15 text-eco px-3 py-1 text-xs font-bold uppercase tracking-wider">
                        <Truck className="h-3.5 w-3.5" /> Ramburs
                      </span>
                      <h2 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight">Numerar la curier</h2>
                      <p className="mt-3 text-muted-foreground">Plata se face direct către curier, la primirea coletului.</p>
                    </div>
                    <div className="mt-8 rounded-2xl bg-card border border-border p-5">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Plafon maxim ramburs</div>
                      <div className="mt-1 text-3xl font-extrabold text-foreground">5.000 <span className="text-base text-muted-foreground">lei</span></div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 p-10 space-y-6">
                    <FeatureRow
                      icon={Banknote}
                      title="Plată în numerar"
                      text="Achiți comanda direct către curier la primirea coletului. Curierul va emite o chitanță care constituie dovada plății, valabilă pentru persoane fizice și juridice."
                    />
                    <FeatureRow
                      icon={AlertTriangle}
                      title="Verifică coletul la primire"
                      text="Vă rugăm să verificați coletul la primire, în prezența curierului. După semnarea documentelor de livrare, nu se mai acceptă reclamații referitoare la eventualele daune exterioare ale pachetului."
                      highlight
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-t border-border bg-surface">
          <div className="container-x py-14 grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Tranzacții securizate", text: "Toate plățile sunt criptate end-to-end." },
              { icon: Lock, title: "Confidențialitate", text: "Datele tale nu sunt stocate de magazin." },
              { icon: Info, title: "Suport dedicat", text: "Te ajutăm pentru orice întrebare legată de plată." },
            ].map((t) => (
              <div key={t.title} className="rounded-2xl bg-card p-6 border border-border shadow-card flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <t.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">{t.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Badge = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur">
    <Icon className="h-3.5 w-3.5 text-accent" /> {text}
  </span>
);

const MethodCard = ({
  active, onClick, icon: Icon, title, subtitle, hint,
}: { active: boolean; onClick: () => void; icon: any; title: string; subtitle: string; hint: string; accent?: string }) => (
  <button
    onClick={onClick}
    className={`group text-left rounded-2xl p-6 border-2 transition-all relative overflow-hidden ${
      active
        ? "border-accent bg-card shadow-elev -translate-y-1"
        : "border-border bg-card hover:border-accent/50 hover:-translate-y-0.5"
    }`}
  >
    {active && <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center"><Check className="h-3.5 w-3.5" /></div>}
    <span className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${active ? "bg-accent text-accent-foreground" : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground"}`}>
      <Icon className="h-6 w-6" />
    </span>
    <h3 className="mt-4 font-extrabold text-lg">{title}</h3>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
    <span className="mt-3 inline-block text-xs font-semibold text-accent">{hint}</span>
  </button>
);

const FeatureRow = ({ icon: Icon, title, text, highlight }: { icon: any; title: string; text: string; highlight?: boolean }) => (
  <li className={`flex items-start gap-4 p-4 rounded-xl ${highlight ? "bg-accent/10 border border-accent/30" : ""}`}>
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${highlight ? "bg-accent text-accent-foreground" : "bg-accent/10 text-accent"}`}>
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <div className="font-semibold">{title}</div>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{text}</p>
    </div>
  </li>
);

const BankRow = ({ label, value, onCopy, mono }: { label: string; value: string; onCopy: (v: string, l: string) => void; mono?: boolean }) => (
  <div className="flex items-center justify-between gap-3 rounded-lg bg-white/5 border border-white/10 px-4 py-3">
    <div className="min-w-0">
      <div className="text-[11px] uppercase tracking-wider text-primary-foreground/60">{label}</div>
      <div className={`mt-0.5 font-semibold truncate ${mono ? "font-mono text-sm" : ""}`}>{value}</div>
    </div>
    <button
      onClick={() => onCopy(value, label)}
      className="shrink-0 h-9 w-9 rounded-lg bg-accent/20 hover:bg-accent text-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
      aria-label={`Copiază ${label}`}
    >
      <Copy className="h-4 w-4" />
    </button>
  </div>
);

export default Payment;
