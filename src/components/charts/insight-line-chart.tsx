import  { PureComponent, ReactNode } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define types for props
interface InsightLineChartProps {
  corporateData?: { month: number; count: number }[]; // Make the props optional
  individualData?: { month: number; count: number }[]; // Make the props optional
}

class InsightLineChart extends PureComponent<InsightLineChartProps> {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952";

  render(): ReactNode {
    const { corporateData = [], individualData = [] } = this.props;

    // Validate if corporateData and individualData have elements
    if (corporateData.length === 0 || individualData.length === 0) {
      return null; // or handle loading state or error message as per your application logic
    }

    // Prepare data assuming corporateData and individualData are arrays with objects
    const preparedData = corporateData.map((item, index) => ({
      name: `${item.month}`, // Assuming month corresponds to a numeric value
      corporate: item.count || 0, // Default to 0 if count is undefined/null
      individual: individualData[index]?.count || 0, // Access count safely with optional chaining (?.)
    }));

    const screenWidth = window.innerWidth;
    let strokeWidth = 6; // Default to 6 for large screens

    if (screenWidth <= 768) {
      // Adjust strokeWidth for medium and smaller screens
      strokeWidth = Math.max(Math.min(Math.floor(screenWidth / 100), 8), 2);
    }


    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={preparedData}
          //   width={500}
          // height={600}
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
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="individual"
            stroke="url(#colorPv)"
            strokeWidth={strokeWidth}
            dot={false}
            // activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="corporate"
            stroke="url(#colorUv)"
            strokeWidth={strokeWidth}
            dot={false}
            // activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default InsightLineChart;

