import React from 'react';
import PropTypes from 'prop-types';
import Artwork from './Artwork';

const Collection = props => {
  if (props.artworks.length !== 0) {
    let displayIndices = [
      props.currentIndex - 1,
      props.currentIndex,
      props.currentIndex + 1
    ];
    console.log(
      props.artworks.filter(
        (artwork, index) => displayIndices.includes(index)
      )
    );
    return (
      <div>
        {props.artworks.filter(
          (artwork, index) => displayIndices.includes(index)
        ).map(artwork =>
          <Artwork key={artwork.id} source={artwork.href} />
        )}
      </div>
    );
  } else {
    return (
      <h2>Search for an artist to create your gallery. Artist with public domain work only, please.</h2>
    );
  }
};

Collection.propTypes = {
  artworks: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired
}

export default Collection;
