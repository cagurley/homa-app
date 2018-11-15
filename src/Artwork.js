import React from 'react';
import PropTypes from 'prop-types';

const Artwork = props => {
  return (
    <div className={'col-12 ' + props.className}>
      <img
        src={props.source}
        alt="artwork"
        className="artwork" />
      <div className={'card mx-auto' + ((props.className === 'focus') ? '' : ' disabled')}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
        </div>
      </div>
    </div>
  );
}

Artwork.propTypes = {
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default Artwork;
