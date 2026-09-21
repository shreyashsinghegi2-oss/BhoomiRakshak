import { Radio, Users, BellRing } from "lucide-react";
import { useApp } from "../context/AppContext";
export default function JioIntelligence() {
  const { state } = useApp(); const d = state.jio;
  if (!d) return null;
  return <section className="glass rounded-2xl p-5"><div className="flex items-center gap-2 font-display font-bold"><Radio className="text-cyan" size={19}/> Jio Network Intelligence</div><p className="mt-1 text-xs text-slate-400">Simulated integration · demo telemetry</p><div className="mt-4 grid grid-cols-3 gap-2">{[[Users,d.activeDevices,"Active devices"],[BellRing,d.alertsDelivered,"Alerts delivered"],[Radio,d.fieldOfficials,"Officials online"]].map(([I,v,l])=><div key={l} className="rounded-xl bg-white/[.03] p-3"><I size={15} className="text-cyan"/><div className="mt-2 font-display text-xl font-bold">{v.toLocaleString()}</div><div className="text-[10px] text-slate-500">{l}</div></div>)}</div></section>;
}