//@ts-check

import React, { Component } from 'react';
import { scaleOrdinal, schemeCategory20 } from 'd3-scale';
import { pie, arc } from 'd3-shape';
import { Motion, spring } from 'react-motion';

const DATA = [5, 10, 15, 18];
const RADIUS = 150;

class PieChart extends Component {
  componentDidMount() {
    setTimeout(() => this.setState({data: DATA}), 500);
    setTimeout(() => this.setState({data: [10, 15, 25, 8]}), 3000);
  }
  state = { data: [0, 0, 0, 0] };
  render() {
    const colors = scaleOrdinal(schemeCategory20)
    const pieShape = pie()(this.state.data);
    const arcShape = arc()
      .innerRadius(RADIUS - 100)
      .outerRadius(RADIUS - 20);

    return (
      <div>
        <svg width='640' height='300'>
          <g transform='translate(320, 150)'>
            {
              pieShape.map((slice, i) =>(
                <Motion
                  key={i}
                  defaultStyle={{
                    startAngle: slice.startAngle,
                	  endAngle: slice.endAngle,
                	  padAngle: slice.padAngle,
                  }}
                  style={{
                    startAngle: spring(slice.startAngle),
                    endAngle: spring(slice.endAngle),
                    padAngle: spring(slice.padAngle)
                  }}
                >
                  {
                    value => (
                      <path
                        key={i}
                        fill={colors(`${i}`)}
                        d={arcShape(value)}
                      />
                    )
                  }
                </Motion>
              ))
            }
          </g>
        </svg>
      </div>
    );
  }
}

export default PieChart;
