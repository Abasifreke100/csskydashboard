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

interface Props {
  payload?: Payload[]; // Make payload optional
}

interface PieChartProps {
  open: number;
  closed: number;
  pending: number;
  total: number;
}

export default function PieChartComponent({
  open,
  closed,
  pending,
  total,
}: Readonly<PieChartProps>) {
  // Prepare data for the pie chart
  const data02 = [
    { name: "Closed", value: closed },
    { name: "Open", value: open },
    { name: "Pending", value: pending },
  ];

  const colors = ["#34c759", "#fe3b30", "#ff7f01"];

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
                style={{ backgroundColor: entry.color }}
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

  const allPropsAvailable =
    open !== undefined &&
    closed !== undefined &&
    pending !== undefined &&
    total !== undefined;

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
          >
            {data02.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <Label
              value={total?.toString()} // Display total tickets here
              position="centerBottom"
              style={{ fontSize: "12px", fontWeight: "bold", fill: "#000" }}
            />
            <Label
              value="Today's tickets"
              position="centerTop"
              dy={10}
              style={{ fontSize: "10px", fill: "#000" }}
            />
          </Pie>
          <Tooltip />
          {allPropsAvailable && <Legend content={renderLegend} />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
