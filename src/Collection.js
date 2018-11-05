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
      <h2>Search for an artist to create your gallery. Artist with public domain work only, please.</h2>
    );
  }
}

Collection.propTypes = {
  artworks: PropTypes.array.isRequired
}

export default Collection;
