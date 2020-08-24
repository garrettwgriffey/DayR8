import React, { useState, useEffect } from "react";
import {makeWidthFlexible, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries} from 'react-vis'
import API from "../util/API";

function BarChart(props) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
    if (props.type === "Week") {
        API.getByWeek({ user: props.user }).then((res) => {
        const apiData = res.data.map((point) => {
            return {
            x: new Date(point.createdAt.slice(0, 10)).toString(),
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
            x: new Date(point.createdAt.slice(0, 10)).toString(),
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
            x: new Date(point.createdAt.slice(0, 10)).toString(),
            y: parseInt(point.emotion),
            };
        });
        console.log(apiData);
        setChartData(apiData);
        });
    }
    }, [props.type, props.user]);

    const FlexibleXYPlot = makeWidthFlexible(XYPlot); 

    return (
        <FlexibleXYPlot xType="ordinal" yDomain={[0, 8]} height={400}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickTotal={props.type === "Week" ? 7 : props.type === "Month" ? 15 : props.type === "Year" ? 12 : null} title="Date" position="end" />
            <YAxis title="Rate" position="middle" />
            <VerticalBarSeries data={chartData} barWidth={0.1} />
        </FlexibleXYPlot>
    )
}
export default BarChart;