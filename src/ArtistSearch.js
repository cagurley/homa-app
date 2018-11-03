import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ArtistSearch = props =>
  <div>
    <input id="artist-search" type="search" />
    <button onClick={() => props.handleArtistUpdate()}>Search</button>
  </div>;

ArtistSearch.propTypes = {
  handleArtistUpdate: PropTypes.func.isRequired
}

export default ArtistSearch;
