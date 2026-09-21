import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export default function RiskChart({ data }) {
  return <div className="h-[290px] w-full">
    <ResponsiveContainer>
      <LineChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(148,163,184,.1)" vertical={false}/>
        <XAxis dataKey="time" stroke="#64748b" fontSize={11}/>
        <YAxis yAxisId="risk" stroke="#64748b" fontSize={11}/>
        <YAxis yAxisId="rain" orientation="right" stroke="#64748b" fontSize={11}/>
        <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid rgba(148,163,184,.2)", borderRadius: 12 }}/>
        <Legend/>
        <Bar yAxisId="rain" dataKey="rain" name="Rainfall mm" fill="#7C3AED" radius={[4,4,0,0]}/>
        <Line yAxisId="risk" type="monotone" dataKey="risk" name="Risk %" stroke="#00F0FF" strokeWidth={3} dot={{ r: 3 }}/>
      </LineChart>
    </ResponsiveContainer>
  </div>;
}