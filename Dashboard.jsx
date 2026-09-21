import { CloudRain, FileWarning, Route, TriangleAlert } from "lucide-react";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import KPICard from "../components/KPICard";
import MapComponent from "../components/MapComponent";
import RiskChart from "../components/RiskChart";
import AIPanel from "../components/AIPanel";
import JioIntelligence from "../components/JioIntelligence";
import RoadStatusTable from "../components/RoadStatusTable";
import EmergencyPriority from "../components/EmergencyPriority";
import CitizenReports from "../components/CitizenReports";
import { Link } from "react-router-dom";

export default function Dashboard(){
  const { state } = useApp();
  return <div className="min-h-screen bg-command"><Navbar/><main className="mx-auto max-w-[1600px] space-y-5 p-4 lg:p-6">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><div className="font-mono text-[10px] uppercase tracking-[.25em] text-cyan">Command Center / Overview</div><h1 className="mt-1 font-display text-3xl font-bold">National Situation Picture</h1></div><div className="text-right text-xs text-slate-500">21 Sep 2026 · IST · Demo telemetry</div></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><KPICard icon={TriangleAlert} label="High Risk Zones" value="127" sub="↑ 12 from yesterday" tone="red"/><KPICard icon={CloudRain} label="Active Weather Alerts" value="43" sub="Heavy rainfall in 8 states" tone="amber"/><KPICard icon={Route} label="Road Disruptions" value="89" sub="23 critical" tone="amber"/><KPICard icon={FileWarning} label="Citizen Reports" value="312" sub="Awaiting verification" tone="cyan"/></div>
    <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]"><MapComponent/><div className="space-y-5"><section className="glass rounded-2xl p-5"><div className="flex items-center justify-between"><div><div className="font-display font-bold">Current Situation</div><div className="mt-1 text-xs text-slate-500">Chamoli focus zone</div></div><span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] text-red-300">HIGH RISK</span></div><div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-white/[.03] p-3"><span className="text-xs text-slate-500">Rainfall 24h</span><div className="mt-1 font-display text-xl font-bold">{state.weather.rainfall24h} mm</div></div><div className="rounded-xl bg-white/[.03] p-3"><span className="text-xs text-slate-500">Soil moisture</span><div className="mt-1 font-display text-xl font-bold">{state.weather.soilMoisture}%</div></div><div className="rounded-xl bg-white/[.03] p-3"><span className="text-xs text-slate-500">Weather</span><div className="mt-1 text-xs text-amber-300">{state.weather.weatherAlert}</div></div><div className="rounded-xl bg-white/[.03] p-3"><span className="text-xs text-slate-500">Critical slopes</span><div className="mt-1 text-xs text-red-300">18 identified</div></div></div></section><section className="glass rounded-2xl p-5"><div className="font-display font-bold">72-Hour Risk Forecast</div><p className="mt-1 text-xs text-slate-500">Forecast rainfall vs predicted landslide risk</p><RiskChart data={state.weather.forecast}/><div className="rounded-xl border border-amber/15 bg-amber/5 p-3 text-xs text-amber-200">⚠️ High landslide probability expected during the next 12 hours.</div></section><AIPanel zone={state.selectedZone}/><JioIntelligence/></div></div>
    <div className="grid gap-5 lg:grid-cols-2"><RoadStatusTable/><EmergencyPriority/></div><CitizenReports/>
    <footer className="flex flex-wrap justify-between gap-3 border-t border-white/5 py-6 text-[10px] text-slate-600"><span>BHOOOMI RAKSHAK · National Landslide Monitoring Prototype</span><span><Link to="/about" className="hover:text-cyan">Architecture & Impact</Link> · <Link to="/analytics" className="hover:text-cyan">Analytics</Link> · <Link to="/alerts" className="hover:text-cyan">Alerts</Link></span></footer>
  </main></div>
}