import { scaleLinear } from 'd3-scale';

export const MARGIN = {top: 20, right: 50, bottom: 50, left: 50};

export const WIDTH = 650 - MARGIN.left - MARGIN.right;

export const HEIGHT = 650 - MARGIN.top - MARGIN.bottom;

export function getScale(type, range) {
  switch (type) {
    case 'l':
      return scaleLinear().range(range);
  }
}
