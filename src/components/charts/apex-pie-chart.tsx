import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ApexChartState {
  series: number[];
  options: ApexOptions;
}

class ApexChart extends React.Component<NonNullable<unknown>, ApexChartState> {
  constructor(props: NonNullable<unknown>) {
    super(props);

    this.state = {
      series: [35000, 40000], // Values for Active Users and Expired Users
      options: {
        chart: {
          type: "donut",

        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 1,
            gradientToColors: ["#FF7F00", "#994C00"], // End colors for each segment
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        
        colors: ["#FFD9B4", "#FF7F00"], // Starting colors for each segment
        labels: ["Active Users 35,000", "Expired Users 40,000"], // Custom labels for each segment
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          fontSize: "16px",
          itemMargin: {
            vertical: 5,
          },
          markers: {
            shape: "square", // Change shape from circle to square
          },
          
        },
        dataLabels: {
          enabled: true,
          formatter: function () {
            return ""; // Remove percentage by returning an empty string
          },
        },
        responsive: [
          {
            breakpoint: 1024, // Large screens (desktops)
            options: {
              chart: {
                width: 380,
              },
              legend: {
                position: "bottom",
                fontSize: "24px",
              },
            },
          },
          {
            breakpoint: 768, // Tablets
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
                fontSize: "14px",
              },
            },
          },
          {
            breakpoint: 480, // Small devices (e.g., small tablets, large phones)
            options: {
              chart: {
                width: 220,
              },
              legend: {
                position: "bottom",
                fontSize: "12px",
              },
            },
          },
          {
            breakpoint: 320, // Small phones
            options: {
              chart: {
                width: 180,
              },
              legend: {
                position: "bottom",
                fontSize: "10px",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart" className="apexchart-legend-column">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="donut"
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
