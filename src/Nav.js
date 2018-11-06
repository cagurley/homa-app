import React from 'react';

const Nav = props => {
  return (
    <ul className="nav nav-pills nav-fill">
      <li className="nav-item">
        <a className="nav-link active" href="#">Active</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Longer nav link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  );
};

export default Nav;
