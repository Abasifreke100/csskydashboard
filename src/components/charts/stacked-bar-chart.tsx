import  { PureComponent} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface BarChartComponentState {
  barSize: number;
}

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

class BarChartComponent extends PureComponent<{}, BarChartComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
        barSize: window.innerWidth >= 1024 ? 60 : window.innerWidth >= 768 ? 30 : 20,
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
      barSize: window.innerWidth >= 1024 ? 60 : window.innerWidth >= 768 ? 30 : 20,
    });
  }
  
  render() {
    const { barSize } = this.state;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={false} />
          <YAxis />
          <Bar dataKey="pv" stackId="a" fill="#FEBA77" barSize={barSize}  />
          <Bar dataKey="pv" stackId="a" fill="#7E5124" barSize={barSize}  />
          <Bar
            dataKey="uv"
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
