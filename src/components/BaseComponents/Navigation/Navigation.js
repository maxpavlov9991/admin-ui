import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';

const Navigation = (props) => (
  <div className='Navigation'>
      {props.links.map(((link) => (
        <NavLink to={link.url} key={link.url}>
            <span>{link.label}</span>
        </NavLink>
      )))}
  </div>
);

Navigation.defaultProps = {
    links: [],
    className: '',
};

export default Navigation;
