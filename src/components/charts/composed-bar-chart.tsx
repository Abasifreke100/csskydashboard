import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
//   Legend,
  Cell,
} from "recharts";

const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  //   {
  //     name: "Group D",
  //     value: 9800,
  //   },
  //   {
  //     name: "Group E",
  //     value: 3908,
  //   },
  //   {
  //     name: "Group F",
  //     value: 4800,
  //   },
];




const colors = ["#FF7F00", "#FFD9B4", "#6A441F"];
export default function ComposedBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        {/* <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
        /> */}
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
        </Pie>
        <Tooltip />
        {/* <Pie
          dataKey="value"
          data={[{ value: 1 }]}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={50}
          fill="#ffffff"
          label={false}
        /> */}
      </PieChart>
    </ResponsiveContainer>
  );
}
