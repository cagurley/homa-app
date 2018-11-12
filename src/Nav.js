import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
  return (
    <ul className="nav nav-pills nav-fill">
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/">Gallery</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/Music">Music</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/Museum">Museum</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link disabled" exact to="#">Disabled</NavLink>
      </li>
    </ul>
  );
};

export default Nav;
