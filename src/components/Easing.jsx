import React, { Component } from 'react';
import Title from './Title';

import { axisBottom, axisLeft, scale } from 'd3-axis';
import { line } from 'd3-shape';
import { range } from 'd3-array';
import { select } from 'd3-selection';
import { timer } from 'd3-timer';
import { easeQuadInOut } from 'd3-ease'

import { 
  MARGIN,
  HEIGHT,
  WIDTH,
  getScale
} from './helpers';

class Easing extends Component {
  constructor(props) {
    super(props);
    
    this.svgWidth = WIDTH + MARGIN.left + MARGIN.right;
    this.svgHeight = HEIGHT + MARGIN.top + MARGIN.bottom;

    this.xScale = getScale('l', [0, WIDTH]);
    this.yScale = getScale('l', [HEIGHT, 0]);

    this.xAxis = axisBottom(this.xScale)
      .tickSize(-HEIGHT)
      .tickPadding(6);
    this.yAxis = axisLeft(this.yScale)
      .tickSize(-WIDTH)
      .tickPadding(6);

    this.range = range(0, 1, 0.002);

    this.state = {
      cx: 0,
      cy: HEIGHT
    };
  }

  componentDidMount() {
    select('#__easing__ svg g #xAxis')
      .attr("transform", "translate(0," + HEIGHT + ")")
      .attr('class', 'axis axis--x')
      .call(this.xAxis);

    select('#__easing__ svg g #yAxis')
      .attr('class', 'axis axis--y')
      .call(this.yAxis);

    // start the animation
    timer((elapsed) => {
      const t = (elapsed % 3000) / 3000;
      this.setState({
        cx: this.xScale(t),
        cy: this.yScale(easeQuadInOut(t))
      });
    });
  }
  
  
  render() {
    const lineProvider = line()
      .x(d => this.xScale(d))
      .y(d => this.yScale(easeQuadInOut(d)));

    return (
      <div id='__easing__'>
        <Title 
          title='The x-axis represents the normalized time t in the range [0, 1]. The y-axis represents the eased time, ease(t).'
        />
        <svg width={this.svgWidth} height={this.svgHeight}>
          <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
            <g id='xAxis'></g>
            <g id='yAxis'></g>
            <g className='line'>
              <path 
                d={lineProvider(this.range)}
              />
            </g>
            <circle
              r='5'
              cy={this.state.cy}
              cx={this.state.cx}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default Easing;