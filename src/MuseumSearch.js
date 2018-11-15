import React from 'react';
import PropTypes from 'prop-types';

const MuseumSearch = props =>
  <div>
    <h2>Set the scene.</h2>
    <h3>Search for the name of an art museum:</h3>
    <form className="form-inline justify-content-center" action="" method="get" onSubmit={props.handleQueryUpdate}>
      <input id="museum-search" type="search" className="form-control" />
      <button id="museum-submit" type="submit" className="btn">Search</button>
    </form>
  </div>;

MuseumSearch.propTypes = {
  currentQuery: PropTypes.string.isRequired,
  handleQueryUpdate: PropTypes.func.isRequired
}

export default MuseumSearch;
