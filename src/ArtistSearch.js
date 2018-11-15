import React from 'react';
import PropTypes from 'prop-types';

const ArtistSearch = props =>
  <div>
    <h2>Browse a gallery.</h2>
    <h3>Search for an artist or find works similar to current:</h3>
    <form className="form-inline justify-content-center" action="" method="get" onSubmit={props.handleArtistUpdate}>
      <input id="artist-search" type="search" className="form-control" />
      <button id="artist-submit" type="submit" className="btn">Search</button>
      <button id="similar" className="btn" onClick={props.handleSimilarGallery}>Similar Works</button>
    </form>
  </div>;

ArtistSearch.propTypes = {
  currentArtist: PropTypes.string.isRequired,
  handleArtistUpdate: PropTypes.func.isRequired
}

export default ArtistSearch;
