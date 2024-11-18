import { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class SharedLineChart extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
        //   width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7e5124" />
              <stop offset="100%" stopColor="#fef2e7" />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff5ec" />
              <stop offset="100%" stopColor="#ff7f01" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3"  vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="url(#colorPv)"
            strokeWidth={6}
            dot={false}
          />{" "}
          <Line  type="monotone"
            dataKey="uv"
            stroke="url(#colorUv)"
            strokeWidth={6}
            // activeDot={{ r: 8 }}
            dot={false}
            />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
