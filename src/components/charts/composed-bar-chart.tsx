import React from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
  Label,
} from 'recharts';
import { CustomLegend } from './legend/custom-legend';

interface DataItem {
  name: string;
  value: number;
}

const data02: DataItem[] = [
  {
    name: 'Group A',
    value: 2400,
  },
  {
    name: 'Group B',
    value: 4567,
  },
  {
    name: 'Group C',
    value: 1398,
  },
];

const totalValue: number = data02.reduce((sum, { value }) => sum + value, 0);
const colors: string[] = ['#FF7F00', '#FFD9B4', '#6A441F'];

const ComposedBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Legend content={<CustomLegend />} />
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          paddingAngle={5} // Padding between segments
          label
        >
          {data02.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          <Label
            position="center"
            content={({ viewBox }) => {
              const { cx, cy } = {
                ...viewBox,
                cx: (viewBox as any).cx ?? 0,
                cy: (viewBox as any).cy ?? 0,
              };
              return (
                <text
                  x={cx}
                  y={cy}
                  fontSize={14}
                  fontWeight=""
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#000"
                >
                  {totalValue}
                  <tspan x={cx} dy="1.2em" fontWeight={500} fontSize={10} textAnchor="middle">
                    Total Registrations
                  </tspan>
                </text>
              );
            }}
          />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ComposedBarChart;
