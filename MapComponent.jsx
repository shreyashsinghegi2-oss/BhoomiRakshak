import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Layers3, RotateCcw } from "lucide-react";
import { zones } from "../data/mockLandslideData";
import { useApp } from "../context/AppContext";

const riskColor = { Critical: "#EF4444", High: "#F59E0B", Moderate: "#FBBF24", Low: "#10B981" };

function Recenter() { const map = useMap(); return <button onClick={() => map.setView([22.5,79],5)} className="rounded-lg bg-slate-950/90 p-2 text-cyan"><RotateCcw size={15}/></button>; }

export default function MapComponent() {
  const { state, dispatch } = useApp();
  return <div id="map" className="relative h-[590px] overflow-hidden rounded-2xl border border-white/10">
    <MapContainer center={[22.5,79]} zoom={5} minZoom={4} maxZoom={12} className="h-full w-full">
      <TileLayer attribution='&copy; CARTO' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"/>
      {zones.map(z => state.activeLayers.risk && <CircleMarker key={z.id} center={[z.lat,z.lng]} radius={z.risk==="Critical"?16:12} pathOptions={{ color:riskColor[z.risk], fillColor:riskColor[z.risk], fillOpacity:.42, weight:2 }} eventHandlers={{ click: () => dispatch({type:"ZONE",zone:z}) }}>
        <Tooltip direction="top"><b>{z.name}</b><br/>{z.risk} risk · {z.rainfall} mm/24h</Tooltip>
      </CircleMarker>)}
      {state.jio?.locations.map((p,i) => state.activeLayers.jio && <CircleMarker key={`j${i}`} center={[p.lat,p.lng]} radius={5} pathOptions={{ color:p.type==="official"?"#F59E0B":p.type==="safe"?"#10B981":"#00F0FF", fillOpacity:.85, weight:1 }}><Tooltip>{p.label}</Tooltip></CircleMarker>)}
      <div className="absolute left-3 top-3 z-[500] flex gap-2"><div className="glass rounded-xl px-4 py-3"><div className="flex items-center gap-2 font-display text-sm font-semibold">National Landslide Risk Map <span className="pulse-live h-2 w-2 rounded-full bg-red-500"/></div><div className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">Live intelligence · India</div></div><Recenter/></div>
    </MapContainer>
    <div className="absolute bottom-4 left-4 z-[500] glass rounded-xl p-3 text-[11px]">
      <div className="mb-2 flex items-center gap-2 font-semibold"><Layers3 size={14} className="text-cyan"/> Risk legend</div>
      {Object.entries(riskColor).map(([k,c])=><div key={k} className="flex items-center gap-2 py-0.5 text-slate-300"><span className="h-2.5 w-2.5 rounded-full" style={{background:c}}/>{k}</div>)}
    </div>
  </div>;
}