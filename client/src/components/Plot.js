import React from "react";
import { Chart } from "react-charts";

function MyChart() {
    const data = React.useMemo(
      () => [
        {
          label: 'Series 1',
          data: [{ x: new Date(2020,7,13), y: 1 }, { x: new Date(2020,7,14), y: 5 }, { x: new Date(2020,7,15), y: 10 }]
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
      []
    )
   
    const axes = React.useMemo(
      () => [
        { primary: true, type: 'utc', position: 'bottom' },
        { type: 'linear', position: 'left' }
      ],
      []
    )
   
    return (
      <div
        style={{
          width: '400px',
          height: '300px'
        }}
      >
        <Chart data={data} axes={axes} />
      </div>
    )
  }

export default MyChart;
