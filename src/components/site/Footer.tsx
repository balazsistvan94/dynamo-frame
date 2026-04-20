import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, CreditCard } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container-x py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
      <div className="col-span-2 md:col-span-1">
        <img src={logo} alt="SolarHev" className="h-14 w-auto rounded-md bg-background p-1" />
        <p className="mt-5 text-sm text-primary-foreground/70 leading-relaxed">
          Soluții complete de energie solară pentru casa și afacerea ta. Produse premium cu garanție extinsă și suport tehnic dedicat.
        </p>
        <div className="mt-5 flex gap-2">
          {[Facebook, Instagram, Youtube].map((Icon, i) => (
            <a key={i} href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-accent text-sm uppercase tracking-wider mb-4">Informații companie</h4>
        <ul className="space-y-2.5 text-sm text-primary-foreground/75">
          <li>SC. Solar Hev S.R.L</li>
          <li>CUI: 46325914</li>
          <li className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
            <span>Str. Octavian Goga 25, Salonta, Bihor, România</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-accent" />
            <a href="tel:+40775311632" className="hover:text-accent">+40.775.311.632</a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-accent" />
            <a href="mailto:office@solarhev.ro" className="hover:text-accent">office@solarhev.ro</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-accent text-sm uppercase tracking-wider mb-4">Informații utile</h4>
        <ul className="space-y-2.5 text-sm text-primary-foreground/75">
          {["Garanții și servicii", "Metode de livrare", "Cum comand?", "Metode de plată", "Retur produse"].map((l) => (
            <li key={l}><a href="#" className="hover:text-accent transition-colors">{l}</a></li>
          ))}
        </ul>
        <h4 className="font-semibold text-accent text-sm uppercase tracking-wider mt-6 mb-4">Branduri</h4>
        <ul className="space-y-2.5 text-sm text-primary-foreground/75">
          {["Longi", "Solar Edge", "LG", "Huawei", "Canadian Solar"].map((l) => (
            <li key={l}><a href="#" className="hover:text-accent transition-colors">{l}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-accent text-sm uppercase tracking-wider mb-4">Informații legale</h4>
        <ul className="space-y-2.5 text-sm text-primary-foreground/75">
          {["Termeni și condiții", "Politică de confidențialitate", "Timbrul Verde / DEEE", "A.N.P.C.", "S.O.L. (U.E.)"].map((l) => (
            <li key={l}><a href="#" className="hover:text-accent transition-colors">{l}</a></li>
          ))}
        </ul>
        <h4 className="font-semibold text-accent text-sm uppercase tracking-wider mt-6 mb-3">Plăți online prin</h4>
        <div className="flex flex-wrap gap-2">
          {["VISA", "MC", "PayPal", "Netopia"].map((p) => (
            <span key={p} className="px-3 py-1.5 rounded-md bg-primary-foreground/10 text-xs font-semibold flex items-center gap-1.5">
              <CreditCard className="h-3 w-3 text-accent" /> {p}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="border-t border-primary-foreground/10">
      <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
        <span>© Solarhev — 2026 · Toate drepturile rezervate</span>
        <span>Site realizat cu pasiune pentru energia verde ⚡</span>
      </div>
    </div>
  </footer>
);

export default Footer;
