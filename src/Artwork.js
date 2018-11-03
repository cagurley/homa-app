import React from 'react';
import PropTypes from 'prop-types';

const Artwork = props =>
  <img src={props.source} alt='artwork' />;

Artwork.propTypes = {
  source: PropTypes.string.isRequired
}

export default Artwork;
