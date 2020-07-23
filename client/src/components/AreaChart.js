import React, { useState, useEffect } from "react";
import { Chart } from 'react-charts'
import API from "../util/API";

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
    }, []);

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
    const axes = React.useMemo(
        () => [
            { primary: true, type: "utc", position: 'bottom' },
            { position: 'left', type: 'linear' }
        ],
        []
    )
    const options = React.useMemo(
        () => [
          {
            scales: {
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: "day",
                  },
                },
              ],
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
            }}
        >
            <Chart data={data} series={series} axes={axes} options={options} tooltip />
        </div>
    )
}
export default AreaChart;