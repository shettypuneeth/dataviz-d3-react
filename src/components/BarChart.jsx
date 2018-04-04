//@ts-check
import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import {
  max
} from 'd3-array';

const DATA = [55, 60, 80, 150, 200];

class BarChart extends Component {
  render() {
    const maxValue = max(DATA);
    const yScale = scaleLinear()
      .domain([0, maxValue])
      .range([0, 100]);

    return (
      <div>
        <svg>
          {
            DATA.map((d, i) => (
              <rect
                key={i}
                x={i * 20}
                y={100 - yScale(d)}
                height={yScale(d)}
                width={15}
                fill='#fe9922'
              />
            ))
          }
        </svg>
      </div>
    );
  }
}

export default BarChart;