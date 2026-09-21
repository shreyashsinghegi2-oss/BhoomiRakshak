import { Activity, Globe2, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  ["Overview", "/dashboard"], ["Risk Map", "/dashboard#map"], ["AI Analysis", "/dashboard#ai"],
  ["Weather", "/analytics"], ["Infrastructure", "/alerts"], ["Citizen Reports", "/reports"], ["Emergency Response", "/alerts"]
];

export default function Navbar() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-[1000] border-b border-white/10 bg-[#070B14]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-3">
        <Link to="/" className="flex min-w-fit items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan shadow-[0_0_20px_rgba(0,240,255,.12)]">
            <ShieldCheck size={23}/>
          </div>
          <div className="hidden lg:block">
            <div className="font-display font-bold">Bhoomi Rakshak</div>
            <div className="font-mono text-[9px] uppercase tracking-[.2em] text-slate-400">National Landslide Monitoring</div>
          </div>
        </Link>
        <nav className="hidden flex-1 justify-center gap-1 xl:flex">
          {tabs.map(([label, href]) => <Link key={label} to={href} className={`rounded-lg px-2 py-2 text-[11px] font-medium ${location.pathname === href.split("#")[0] ? "bg-cyan/10 text-cyan" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>{label}</Link>)}
        </nav>
        <div className="ml-auto flex items-center gap-2 text-xs">
          <div className="hidden items-center gap-2 rounded-lg border border-emerald/20 bg-emerald/10 px-3 py-2 text-emerald sm:flex"><Activity size={13}/> OPERATIONAL</div>
          <div className="hidden items-center gap-2 text-slate-400 md:flex"><Globe2 size={14}/> IST</div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-violet/30 font-semibold text-violet-200">NA</div>
        </div>
      </div>
    </header>
  );
}