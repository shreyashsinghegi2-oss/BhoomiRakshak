import { motion } from "framer-motion";
import { ArrowRight, Globe2, Shield, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return <main className="grid-radar relative min-h-screen overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,240,255,.10),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(124,58,237,.10),transparent_30%)]"/>
    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-20">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[.2em] text-cyan"><span className="pulse-live h-2 w-2 rounded-full bg-red-500"/> National early-warning prototype · India</motion.div>
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
        <div><motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.12}} className="font-display text-5xl font-bold leading-[.98] sm:text-6xl lg:text-8xl">Bhoomi<br/><span className="text-cyan">Rakshak.</span></motion.h1>
          <motion.p initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.22}} className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">AI-Powered National Landslide Early Warning & Risk Intelligence System for India.</motion.p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to="/dashboard" className="flex items-center gap-2 rounded-xl bg-cyan px-5 py-3 text-sm font-bold text-slate-950">Enter Command Center <ArrowRight size={16}/></Link><Link to="/dashboard#map" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white">View Live Risk Map</Link></div>
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-3">{[["28+","states/UTs in scope"],["24/7","monitoring concept"],["AI","risk intelligence"]].map(x=><div key={x[1]} className="glass rounded-xl p-4"><div className="font-display text-2xl font-bold text-cyan">{x[0]}</div><div className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">{x[1]}</div></div>)}</div>
        </div>
        <motion.div initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:.2}} className="relative mx-auto grid h-[390px] w-[390px] place-items-center rounded-full border border-cyan/10 bg-cyan/[.025] shadow-[0_0_100px_rgba(0,240,255,.08)] sm:h-[480px] sm:w-[480px]">
          <div className="absolute inset-8 rounded-full border border-violet/20"/><div className="absolute inset-20 rounded-full border border-cyan/20"/><div className="absolute h-48 w-32 rotate-12 rounded-[48%] border-2 border-cyan/50 bg-cyan/5 shadow-[0_0_60px_rgba(0,240,255,.12)] sm:h-60 sm:w-40"/>
          <div className="z-10 text-center"><Shield size={44} className="mx-auto text-cyan"/><div className="mt-3 font-display text-lg font-bold">INDIA</div><div className="mt-1 font-mono text-[9px] tracking-[.25em] text-slate-500">RISK INTELLIGENCE GRID</div></div>
          {[["30.4N","79.3E","HIGH"],["27.0N","88.2E","HIGH"],["17.9N","73.6E","MOD"]].map((x,i)=><div key={x[0]} className="absolute rounded-lg border border-white/10 bg-slate-950/80 px-2 py-1 text-[9px]" style={{top:[18,30,68][i]+"%",left:[65,18,70][i]+"%"}}><div className="text-red-300">{x[2]}</div><div className="text-slate-500">{x[0]} · {x[1]}</div></div>)}
        </motion.div>
      </div>
      <div className="mt-12 flex items-center gap-3 overflow-hidden border-y border-white/5 py-3 font-mono text-[10px] text-slate-400"><TriangleAlert size={14} className="shrink-0 text-amber-400"/><div className="whitespace-nowrap">LIVE FEED · HIGH RISK: CHAMOLI NH-7 · RAINFALL 120MM/24H · HIGH RISK: DARJEELING · WEATHER WATCH: WESTERN GHATS ·</div></div>
      <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-slate-600"><Globe2 size={13}/> Prototype for national disaster-management operations</div>
    </div>
  </main>;
}