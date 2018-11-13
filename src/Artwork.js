import React from 'react';
import PropTypes from 'prop-types';

const Artwork = props => {
  return (
    <div className={'col-12 ' + props.className}>
      <img
        src={props.source}
        alt="artwork"
        className="artwork" />
    </div>
  );
}

Artwork.propTypes = {
  source: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default Artwork;
