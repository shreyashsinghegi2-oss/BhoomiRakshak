import { motion } from "framer-motion";
export default function KPICard({ icon: Icon, label, value, sub, tone = "cyan" }) {
  const tones = { cyan: "border-cyan/25 text-cyan", red: "border-crimson/30 text-red-400", amber: "border-amber/30 text-amber-400", emerald: "border-emerald/30 text-emerald-400" };
  return <motion.div whileHover={{ y: -3 }} className={`glass rounded-2xl border p-5 ${tones[tone] || tones.cyan}`}>
    <div className="flex items-start justify-between"><div className="text-xs uppercase tracking-widest text-slate-400">{label}</div><Icon size={19}/></div>
    <div className="mt-3 font-display text-4xl font-bold text-white">{value}</div>
    <div className="mt-1 text-xs text-slate-400">{sub}</div>
  </motion.div>;
}