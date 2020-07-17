import React from "react";
import { Chart } from "react-charts";
import API from "../util/API";

function MyChart(props) {
  console.log(props.chartData);
  const chartData = props.chartData;
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        // data: props.chartData
        data: [
          { x: 1, y: 7 },
          { x: 2, y: 8 },
          { x: 3, y: 3 },
        ],
      },
      // {
      //   label: 'Series 2',
      //   data: [{ x: 1, y: 7 }, { x: 2, y: 8 }, { x: 3, y: 3 }]
      // },
      // {
      //   label: 'Series 3',
      //   data: [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 9 }]
      // }
    ],
    [props.chartData]
  );
  console.log(data);
  const axes = React.useMemo(
    () => [
      { primary: true, type: "utc", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <div
      style={{
        width: "300px",
        height: "400px",
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  );
}

export default MyChart;
