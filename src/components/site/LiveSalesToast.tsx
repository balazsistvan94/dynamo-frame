import { useEffect } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

const events = [
  { name: "Andrei din Cluj", product: "Invertor DEYE 6 kW", ago: "2 minute" },
  { name: "Maria din București", product: "Baterie UHome 10,24 kW", ago: "8 minute" },
  { name: "Radu din Oradea", product: "Panouri Longi 450W × 18", ago: "14 minute" },
  { name: "Ioana din Timișoara", product: "Easyway UNIV-HV 10 kWh", ago: "21 minute" },
  { name: "Mihai din Sibiu", product: "Invertor Huawei SUN5000-8K", ago: "35 minute" },
  { name: "Alexandra din Brașov", product: "Sistem complet 5 kWp", ago: "42 minute" },
];

const LiveSalesToast = () => {
  useEffect(() => {
    const show = () => {
      const e = events[Math.floor(Math.random() * events.length)];
      toast(
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold">{e.name}</div>
            <div className="text-xs text-muted-foreground truncate">a comandat {e.product}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">acum {e.ago}</div>
          </div>
        </div>,
        { duration: 5500, position: "bottom-left" },
      );
    };
    const first = setTimeout(show, 6000);
    const iv = setInterval(show, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(iv);
    };
  }, []);
  return null;
};

export default LiveSalesToast;
