import React from 'react';
import PropTypes from 'prop-types';

const ArtistSearch = props =>
  <div>
    <h2>Browse a gallery.</h2>
    <h3>Search for an artist with public domain work:</h3>
    <form className="form-inline justify-content-center" action="" method="get" onSubmit={props.handleArtistUpdate}>
      <input id="artist-search" type="search" className="form-control" />
      <button id="search-submit" type="submit" className="btn">Search</button>
    </form>
  </div>;

ArtistSearch.propTypes = {
  currentArtist: PropTypes.string.isRequired,
  handleArtistUpdate: PropTypes.func.isRequired
}

export default ArtistSearch;
