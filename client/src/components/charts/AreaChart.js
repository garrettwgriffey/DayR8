import React, { useState, useEffect } from "react";
import {makeWidthFlexible, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, AreaSeries} from 'react-vis'
import API from "../../util/API";

function AreaChart(props) {
    const [chartData, setChartData] = useState([]);
    const [xAxisArrayState, setXAxisArray] = useState([]);

    const FlexibleXYPlot = makeWidthFlexible(XYPlot); 

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
            for (let i=0;i<chartData.length;i++) {
                let xAxisArray = xAxisArrayState;
                xAxisArray.push(chartData[i].x);
                setXAxisArray(xAxisArray);
            }
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
            for (let i=0;i<chartData.length;i++) {
                let xAxisArray = xAxisArrayState;
                xAxisArray.push(chartData[i].x);
                setXAxisArray(xAxisArray);
            }
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
            for (let i=0;i<chartData.length;i++) {
                let xAxisArray = xAxisArrayState;
                xAxisArray.push(chartData[i].x);
                setXAxisArray(xAxisArray);
            }
            });
        }
    }, [props.type, props.user]);

    return (
        <FlexibleXYPlot 
            xType="time" 
            yDomain={[0, 8]} 
            height={400}
        >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis 
                axisDomain={xAxisArrayState} 
                tickTotal={props.type === "Week" ? 7 : props.type === "Month" ? 15 : props.type === "Year" ? 12 : null} 
                title="Date" 
                position="end" 
            />
            <YAxis 
                title="Rate" 
                position="middle" 
            />
            <AreaSeries 
                data={chartData} 
            />
        </FlexibleXYPlot>
    )
}

export default AreaChart;