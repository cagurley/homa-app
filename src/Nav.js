import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" exact to="/Gallery">HOMA</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/Gallery">Gallery</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/Music">Music</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/Museum">Museum</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
