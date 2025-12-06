import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BenchmarkData } from '../../types';

interface Props {
  data: BenchmarkData[];
  title: string;
}

export const BenchmarkChart: React.FC<Props> = ({ data, title }) => {
  return (
    <div className="w-full h-[300px] bg-gemini-surface/50 p-4 rounded-xl border border-white/10">
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
          <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
          <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} tick={{fontSize: 12}} />
          <Tooltip 
            cursor={{fill: 'transparent'}}
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', color: '#fff' }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.highlight ? '#9B87F5' : '#475569'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};