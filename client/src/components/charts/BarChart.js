import React, { useState, useEffect } from "react";
import {makeWidthFlexible, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries} from 'react-vis'
import API from "../../util/API";

function BarChart(props) {
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
            xType="ordinal" 
            yDomain={[0, 8]}
            height={400}
        >
            <VerticalGridLines />
            <HorizontalGridLines />
            {props.type === "Week" ? <XAxis
                title="Date" 
                position="end"
                tickFormat={function tickFormat(d){
                    const date = new Date(d)
                    return date.toString().substr(0, 10)
                }}
            /> : props.type === "Month" ? null : props.type === "Year" ? null : null}
            <YAxis 
                title="Rate" 
                position="middle" 
            />
            <VerticalBarSeries 
                data={chartData} 
                barWidth={props.type === "Week" ? 0.8 : props.type === "Month" ? 0.5 : props.type === "Year" ? 0.1 : null} 
            />
        </FlexibleXYPlot>
    )
}

export default BarChart;