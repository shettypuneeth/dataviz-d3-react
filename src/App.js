import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx';
import Easing from './components/Easing.jsx';
import SvgMorph from './components/SvgMorph.jsx';
import BarChart from './components/BarChart.jsx';
import PieChart from './components/PieChart.jsx';
import LineChart from './components/LineChart.jsx';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={() => (
          <Redirect to="/svgmorph" />
        )}/>

        <Header />
        <Tabs />
        
        <div className='content'>
          <Route path='/easing' component={Easing}/>
          <Route path='/svgmorph' render={() => (
            <SvgMorph
              d={[
                'M 1041,450.4 C 1023,547.7 992.8,667.7 905.7,714.5 793.1,775 639,728.7 524.5,671.8 453.3,636.4 382.2,575.4 360.2,499 329.7,393 344.6,249.2 426,174.9 568.6,44.66 851.1,-8.71 1002,111.8 1091,182.7 1061,338.6 1041,450.4 Z',
                'M 1066,436 C 1051,543.8 976.5,664.5 873.6,700.1 761,739.1 636.4,655.8 529.5,603.1 441.6,559.8 325.8,520.1 293.8,427.5 263.1,338.4 294.5,213.4 368.2,154.8 520.7,33.48 790.1,23.76 952.4,131.7 1043,191.7 1081,328.8 1066,436 Z',
                'M 1066,436 C 1053,531.1 930.7,580.1 842.2,617.2 734,662.7 598.4,707.8 492.4,657.4 427.6,626.6 387.5,546.9 376.7,476 360.3,368.3 376.9,227.9 462.5,160.5 567.6,77.69 749.9,37.5 863.8,148.8 947.6,230.7 1082,320.1 1066,436 Z',
                'M 1066,436 C 1051,543.8 973.2,656.2 873.6,700.1 756.6,751.7 600.9,725 492.4,657.4 431.5,619.5 387.5,546.9 376.7,476 360.3,368.3 377.9,229.2 462.5,160.5 589.5,57.34 815.4,42.24 952.4,131.7 1044,190.8 1081,328.8 1066,436 Z'
              ]}
              originalValue='M 1066,436 C 1051,543.8 973.2,656.2 873.6,700.1 756.6,751.7 600.9,725 492.4,657.4 431.5,619.5 387.5,546.9 376.7,476 360.3,368.3 377.9,229.2 462.5,160.5 589.5,57.34 815.4,42.24 952.4,131.7 1044,190.8 1081,328.8 1066,436 Z'
              duration={10000}
            />
          )}/>
        </div>
      </React.Fragment>
    )
  };
}

export default App;
