import React from 'react';
import PropTypes from 'prop-types';
import Artwork from './Artwork';

const Collection = props => {
  if (props.artworks.length !== 0) {
    return (
      <div>
        {props.artworks.map(artwork =>
          <Artwork key={artwork.id} source={artwork.href} />
        )}
      </div>
    );
  } else {
    return (
      <h2>Sorry, there are no available artworks from this artist.</h2>
    );
  }
}

Collection.propTypes = {
  artworks: PropTypes.array.isRequired
}

export default Collection;
