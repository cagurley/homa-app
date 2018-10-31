import React from 'react';
import PropTypes from 'prop-types';
import Artwork from './Artwork';

const Collection = props => {

  return (
    <div>
      {props.artworks.map(artwork =>
        <Artwork key={artwork.id} source={artwork.href} />
      )}
    </div>
  );
}

Collection.propTypes = {
  artworks: PropTypes.array.isRequired
}

export default Collection;
