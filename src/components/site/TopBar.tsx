import { Phone, Mail, MapPin, Globe } from "lucide-react";

const TopBar = () => (
  <div className="hidden md:block bg-primary text-primary-foreground text-xs">
    <div className="container-x flex h-10 items-center justify-between">
      <div className="flex items-center gap-6 opacity-90">
        <span className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          Salonta, Bihor, România
        </span>
        <span className="hidden lg:flex items-center gap-2 opacity-75">
          Livrare în toată țara · Suport tehnic dedicat
        </span>
      </div>
      <div className="flex items-center gap-5">
        <a href="tel:+40775311632" className="flex items-center gap-2 hover:text-accent transition-colors">
          <Phone className="h-3.5 w-3.5" /> +40.775.311.632
        </a>
        <a href="mailto:office@solarhev.ro" className="flex items-center gap-2 hover:text-accent transition-colors">
          <Mail className="h-3.5 w-3.5" /> office@solarhev.ro
        </a>
        <a href="#" className="hover:text-accent transition-colors">Despre noi</a>
        <a href="#" className="hover:text-accent transition-colors">Contact</a>
        <span className="flex items-center gap-1.5 opacity-90">
          <Globe className="h-3.5 w-3.5" /> RO
        </span>
      </div>
    </div>
  </div>
);

export default TopBar;
