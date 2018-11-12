import React from 'react';
import PropTypes from 'prop-types';

const MusicSearch = props =>
  <form action="" method="get" onSubmit={props.handleQueryUpdate}>
    <input id="music-search" type="search" />
    <button id="search-submit" type="submit">Search</button>
  </form>;

MusicSearch.propTypes = {
  currentQuery: PropTypes.string.isRequired,
  handleQueryUpdate: PropTypes.func.isRequired
}

export default MusicSearch;
