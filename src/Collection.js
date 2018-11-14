import React from 'react';
import PropTypes from 'prop-types';
import Arrow from './Arrow';
import Artwork from './Artwork';

const Collection = props => {
  if (props.artworks.length !== 0) {
    let displayIndices = [
      props.cursor - 1,
      props.cursor,
      props.cursor + 1
    ];
    const displayClassNames = [
      'previous d-none d-sm-block',
      'focus',
      'next d-none d-sm-block'
    ];
    // console.log(
    //   props.artworks.filter(
    //     (artwork, index) => displayIndices.includes(index)
    //   )
    // );
    let currentArtworks = props.artworks.filter(
      (artwork, index) => displayIndices.includes(index)
    );
    if (displayIndices[0] < 0) {
      currentArtworks.unshift({
        id: 'bookend-left',
        href: null
      });
    }
    if (displayIndices[2] > props.artworks.length - 1) {
      currentArtworks.push({
        id: 'bookend-right',
        href: null
      });
    }
    // console.log(currentArtworks);
    currentArtworks = currentArtworks.map((artwork, index) =>
      <Artwork key={artwork.id} source={artwork.href} className={displayClassNames[index] + (artwork.href ? '' : ' bookend')} />
    );
    // console.log(currentArtworks);
    return (
      <div className="container-fluid row">
        <Arrow
          id="left"
          cursor={props.cursor}
          end={props.artworks.length - 1}
          handleCurrentIndexUpdate={props.updateCurrentIndex} />
        {currentArtworks}
        <Arrow
          id="right"
          cursor={props.cursor}
          end={props.artworks.length - 1}
          handleCurrentIndexUpdate={props.updateCurrentIndex} />
      </div>
    );
  } else {
    return (
      <h3>Search for an artist to create your gallery. Artists with public domain work only, please.</h3>
    );
  }
};

Collection.propTypes = {
  artworks: PropTypes.array.isRequired,
  cursor: PropTypes.number.isRequired
}

export default Collection;
