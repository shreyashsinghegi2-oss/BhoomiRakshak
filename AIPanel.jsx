import { useState } from "react";
import { BrainCircuit, CheckCircle2, Download, Send, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { runMistralAnalysis } from "../services/mistralService";
import LoadingSpinner from "./LoadingSpinner";

export default function AIPanel({ zone }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const run = async () => {
    if (!zone) return;
    setLoading(true); setResult(null);
    const r = await runMistralAnalysis(zone);
    setResult(r); setLoading(false);
  };
  const exportReport = () => {
    const text = `BHOOMI RAKSHAK\nAI RISK REPORT\n\nLocation: ${zone?.name}\nRisk: ${result?.risk_level}\nConfidence: ${Math.round((result?.confidence || 0) * 100)}%\nPriority: ${result?.evacuation_priority}\n\nFactors:\n- ${(result?.key_factors || []).join("\n- ")}\n\nRecommendation:\n${result?.recommendation}`;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "bhoomi-rakshak-ai-report.txt"; a.click(); URL.revokeObjectURL(a.href);
  };
  return <section id="ai" className="glass rounded-2xl p-5">
    <div className="flex items-center justify-between">
      <div><div className="flex items-center gap-2 font-display font-bold"><BrainCircuit className="text-violet-400" size={20}/> AI Risk Analysis</div><p className="mt-1 text-xs text-slate-400">Mistral-assisted decision support</p></div>
      <button onClick={run} disabled={!zone || loading} className="rounded-xl bg-violet px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,.25)] disabled:opacity-40">⚡ Run Analysis</button>
    </div>
    {!zone && <div className="mt-5 rounded-xl border border-dashed border-white/10 p-5 text-center text-sm text-slate-500">Select a risk zone on the map to analyze it.</div>}
    {loading && <div className="mt-5 rounded-xl bg-black/20 p-5"><LoadingSpinner label="Mistral AI is analyzing 47 data points…"/></div>}
    {result && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><ShieldAlert className="text-red-400"/><span className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-300">{result.risk_level}</span></div><div className="font-mono text-sm text-cyan">{Math.round(result.confidence * 100)}% confidence</div></div>
      <div className="grid gap-2">{result.key_factors.map((x,i)=><div key={i} className="flex gap-2 rounded-lg bg-white/[.03] p-3 text-sm text-slate-300"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400"/>{x}</div>)}</div>
      <div className="rounded-xl border border-cyan/15 bg-cyan/[.04] p-4 text-sm leading-6 text-slate-200"><b className="text-cyan">Recommended action:</b> {result.recommendation}</div>
      <div className="flex flex-wrap gap-2"><button onClick={exportReport} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs"><Download size={14}/> Export Report</button><button className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs"><Send size={14}/> Share to NDMA</button></div>
    </motion.div>}
  </section>;
}