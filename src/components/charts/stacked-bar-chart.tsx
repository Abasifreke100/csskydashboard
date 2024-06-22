import  { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface BarChartComponentProps {
  data: Array<{ month: number; count: number }>;
}

interface BarChartComponentState {
  barSize: number;
}

class BarChartComponent extends PureComponent<
  BarChartComponentProps,
  BarChartComponentState
> {
  static defaultProps = {
    data: [],
  };

  constructor(props: BarChartComponentProps) {
    super(props);
    this.state = {
      barSize:
        window.innerWidth >= 1024
          ? 60
          : window.innerWidth >= 768
          ? 30
          : 20,
    };

    this.updateBarSize = this.updateBarSize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateBarSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateBarSize);
  }

  updateBarSize() {
    this.setState({
      barSize:
        window.innerWidth >= 1024
          ? 60
          : window.innerWidth >= 768
          ? 30
          : 20,
    });
  }

  render() {
    const { barSize } = this.state;
    const { data } = this.props;

    // Function to divide count into three parts
    const transformedData = data.map((entry) => ({
      ...entry,
      count1: entry.count / 3,
      count2: entry.count / 3,
      count3: entry.count / 3,
    }));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 0, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            // tick={{ fontSize: 12, fill: "#555" }}
            // label={{
            //   value: "Month",
            //   position: "insideBottom",
            //   offset: -5,
            // }}
          />
          <YAxis
            // tick={{ fontSize: 12, fill: "#555" }}
            // label={{
            //   value: "Count",
            //   angle: -90,
            //   position: "insideLeft",
            //   style: { textAnchor: "middle" },
            // }}
            domain={[0, "auto"]} // Let Recharts determine the Y axis domain automatically
          />
          <Bar dataKey="count1" stackId="a" fill="#FEBA77" barSize={barSize} />
          <Bar dataKey="count2" stackId="a" fill="#7E5124" barSize={barSize} />
          <Bar
            dataKey="count3"
            stackId="a"
            fill="#FF7F00"
            barSize={barSize}
            radius={[15, 15, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default BarChartComponent;
