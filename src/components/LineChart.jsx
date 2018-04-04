import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

const DATA = [{x: 100, y: 120}, {x: 200, y: 400}, {x: 250, y: 450}];

class componentName extends Component {
  render() {
    const lineProvider = line().x(d => d.x).y(d => d.y)

    return (
      <div style={{ margin: '10px' }}>
        <svg style={{ border: '1px solid grey', width: 500, height: 500 }}>
          <path
           d={lineProvider(DATA)}
           stroke="grey"
           strokeWidth="2" 
           fill='none'
          />
        </svg>   
      </div>
    );
  }
}

export default componentName;