import React from 'react';
import PropTypes from 'prop-types';

const Artwork = props => {
  return (
    <div className="col-4">
      <img src={props.source} alt='artwork' />
    </div>
  );
}

Artwork.propTypes = {
  source: PropTypes.string.isRequired
}

export default Artwork;
