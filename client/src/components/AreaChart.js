import React, { useState, useEffect } from "react";
import { Chart } from 'react-charts'
import API from "../util/API";
import useChartConfig from "../hooks/useChartConfig";

function AreaChart(props) {
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
        console.log(apiData);
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
        console.log(apiData);
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
        console.log(apiData);
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
    const series = React.useMemo(
        () => ({
            type: 'area'
        }),
        []
    )
    const {
        primaryAxisShow,
        secondaryAxisShow,
      } = useChartConfig({
        show: ['primaryAxisShow', 'secondaryAxisShow']
    })
    const axes = React.useMemo(
        () => [
            { primary: true, type: "utc", position: 'bottom', show: primaryAxisShow },
            { position: 'left', type: 'linear', show: secondaryAxisShow }
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
                }
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
                height: "400px",
                zIndex: 500
            }}
        >
            <Chart data={data} series={series} axes={axes} options={options} tooltip />
        </div>
    )
}
export default AreaChart;