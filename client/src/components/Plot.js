import React, { useState, useEffect } from "react";
import { Chart } from "react-charts";
import API from "../util/API";
import useChartConfig from "../hooks/useChartConfig";

function MyChart(props) {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (props.type === "Week") {
      API.getByWeek({ user: props.user }).then((res) => {
        const apiData = res.data.map((point) => {
          return {
            x: new Date(point.createdAt.slice(0, 10)),
            y: parseInt(point.emotion),
          };
        });
        setChartData(apiData);
      });
    } else if (props.type === "Month") {
      API.getByMonth({ user: props.user }).then((res) => {
        const apiData = res.data.map((point) => {
          return {
            x: new Date(point.createdAt.slice(0, 10)),
            y: parseInt(point.emotion),
          };
        });
        setChartData(apiData);
      });
    } else if (props.type === "Year") {
      API.getByYear({ user: props.user }).then((res) => {
        const apiData = res.data.map((point) => {
          return {
            x: new Date(point.createdAt.slice(0, 10)),
            y: parseInt(point.emotion),
          };
        });
        setChartData(apiData);
      });
    }
  }, [props.type, props.user]);
  const data = React.useMemo(
    () => [
    {
        label: "DayR8",
        data: chartData,
    },
    ],
    [chartData]
  );
  const {
    primaryAxisShow,
    secondaryAxisShow,
  } = useChartConfig({
    series: 10,
    show: ['primaryAxisShow', 'secondaryAxisShow']
  })
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'utc', position: 'bottom', show: primaryAxisShow },
      { type: 'linear', position: 'left', show: secondaryAxisShow }
    ],
    [primaryAxisShow, secondaryAxisShow]
  )
  const options = React.useMemo(
    () => [
      {
        show: ['primaryAxisShow', 'secondaryAxisShow'],
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day",
              },
            },
          ],
          yAxes: [{
            ticks: {
                beginAtZero:true
            },
          }]
        },
      },
    ],
    []
  );
  return (
    <div
      style={{
        width: "auto",
        height: "400px"
      }}
    >
      <Chart data={data} axes={axes} options={options} tooltip />
    </div>
  );
}
export default MyChart;
