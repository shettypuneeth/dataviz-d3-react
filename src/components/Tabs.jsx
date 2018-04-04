import React from 'react';
import { NavLink } from 'react-router-dom';

const Tabs = () => {
  return (
    <div className='tabs'>
      {/* <NavLink className='tab' activeClassName='active' to="/bar">Bar Chart</NavLink> */}
      {/* <NavLink className='tab' activeClassName='active' to="/pie">Pie Chart</NavLink> */}
      {/* <NavLink className='tab' activeClassName='active' to="/line">Line Chart</NavLink> */}
      <NavLink className='tab' activeClassName='active' to="/easing">Easing</NavLink>
      <NavLink className='tab' activeClassName='active' to="/svgmorph">SVG Morph</NavLink>
    </div>
  );
};

export default Tabs;