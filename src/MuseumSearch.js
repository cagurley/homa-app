import React from 'react';
import PropTypes from 'prop-types';

const MuseumSearch = props =>
  <form action="" method="get" onSubmit={props.handleQueryUpdate}>
    <input id="museum-search" type="search" />
    <button id="search-submit" type="submit">Search</button>
  </form>;

MuseumSearch.propTypes = {
  currentQuery: PropTypes.string.isRequired,
  handleQueryUpdate: PropTypes.func.isRequired
}

export default MuseumSearch;
