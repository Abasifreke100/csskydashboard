import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
  Label,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";

const data02 = [
  {
    name: "Closed",
    value: 50,
  },
  {
    name: "Open",
    value: 15,
  },
  {
    name: "Pending",
    value: 35,
  },
];

const colors = ["#34c759", "#fe3b30", "#ff7f01"];

interface Props {
  payload?: Payload[]; // Make payload optional
}

export default function PieChartComponent() {
  const renderLegend = (props: Props) => {
    const { payload } = props;
    if (!payload) return null; // Return null if payload is undefined

    return (
      <div className="flex flex-col items-center justify-items-center gap-y-3">
        <ul className="space-y-2">
          {payload.map((entry) => (
            <div key={entry.id} className="flex items-center text-sm gap-1">
              <div
                className="w-4 h-4 rounded-sm"
                style={{
                  backgroundColor: entry.color,
                }}
              ></div>
              <li className="font-medium">
                <span className="font-normal">{entry.value}</span>{" "}
                {entry.payload?.value ?? ""}
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            paddingAngle={5}
            // label
          >
            {data02.map((entry, index) => (
              <Cell
                key={`${entry.name}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <Label
              value="213,423 "
              position="centerBottom"
              style={{ fontSize: "12px", fontWeight: "bold", fill: "#000" }}
            />
            <Label
              value="Today's tickets"
              position="centerTop" // Adjust y for positioning below the first label
              dy={10} // Adjust this value to set the gap between the labels
              style={{ fontSize: "10px", fill: "#000" }}
            />
          </Pie>
          <Tooltip />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
