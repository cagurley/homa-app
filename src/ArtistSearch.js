import React from 'react';
import PropTypes from 'prop-types';

const ArtistSearch = props =>
  <form action="" method="get" onSubmit={props.handleArtistUpdate}>
    <input id="artist-search" type="search" />
    <button id="search-submit" type="submit">Search</button>
  </form>;

ArtistSearch.propTypes = {
  currentArtist: PropTypes.string.isRequired,
  handleArtistUpdate: PropTypes.func.isRequired
}

export default ArtistSearch;
