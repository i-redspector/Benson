
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Q1', Public: 4000, Private: 2400, TG4: 2400 },
  { name: 'Q2', Public: 3000, Private: 1398, TG4: 2210 },
  { name: 'Q3', Public: 2000, Private: 9800, TG4: 2290 },
  { name: 'Q4', Public: 2780, Private: 3908, TG4: 2000 },
  { name: 'Q1', Public: 1890, Private: 4800, TG4: 2181 },
  { name: 'Q2', Public: 2390, Private: 3800, TG4: 2500 },
  { name: 'Q3', Public: 3490, Private: 4300, TG4: 2100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-matteBlack/90 backdrop-blur-md border border-bg-gold/30 p-4 rounded-sm shadow-2xl">
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest border-b border-white/10 pb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.stroke }}></div>
            <span className="text-[10px] text-gray-300 uppercase w-16">{entry.name}</span>
            <span className="text-xs font-mono font-bold text-white">{entry.value.toLocaleString()}</span>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-white/5 text-[9px] text-green-400 flex items-center gap-1">
           <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
           <span>Live Data</span>
        </div>
      </div>
    );
  }
  return null;
};

const MarketChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrivate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
            </linearGradient>
             <linearGradient id="colorPublic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#333333" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#333333" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis dataKey="name" stroke="#444" tick={{fill: '#666', fontSize: 10}} tickLine={false} axisLine={false} />
          <YAxis stroke="#444" tick={{fill: '#666', fontSize: 10}} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#D4AF37', strokeWidth: 1, strokeDasharray: '5 5' }} />
          <Area type="monotone" dataKey="Private" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorPrivate)" />
          <Area type="monotone" dataKey="Public" stroke="#666" strokeWidth={1} fillOpacity={1} fill="url(#colorPublic)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;
