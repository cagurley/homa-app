import React from 'react';
import PropTypes from 'prop-types';

const MusicSearch = props =>
  <div>
    <h2>Set the ambience.</h2>
    <h3>Search for a musical genre:</h3>
    <form className="form-inline justify-content-center" action="" method="get" onSubmit={props.handleQueryUpdate}>
      <input id="music-search" type="search" className="form-control" />
      <button id="search-submit" type="submit" className="btn">Search</button>
    </form>
  </div>;

MusicSearch.propTypes = {
  currentQuery: PropTypes.string.isRequired,
  handleQueryUpdate: PropTypes.func.isRequired
}

export default MusicSearch;
