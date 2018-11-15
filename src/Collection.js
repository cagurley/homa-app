import React from 'react';
import PropTypes from 'prop-types';
import Arrow from './Arrow';
import Artwork from './Artwork';

const Collection = props => {
  // Three artworks are rendered at any given time.
  if (props.artworks.length !== 0) {
    let displayIndices = [
      props.cursor - 1,
      props.cursor,
      props.cursor + 1
    ];
    const displayClassNames = [
      'previous d-none d-lg-block',
      'focus',
      'next d-none d-lg-block'
    ];

    let currentArtworks = props.artworks.filter(
      (artwork, index) => displayIndices.includes(index)
    );
    // Below inserts empty dummies for proper display when viewing the first or last work.
    if (displayIndices[0] < 0) {
      currentArtworks.unshift({
        id: 'bookend-left',
        title: 'N/A',
        href: null
      });
    }
    if (displayIndices[2] > props.artworks.length - 1) {
      currentArtworks.push({
        id: 'bookend-right',
        title: 'N/A',
        href: null
      });
    }

    currentArtworks = currentArtworks.map((artwork, index) =>
      <Artwork key={artwork.id} title={artwork.title} source={artwork.href} className={displayClassNames[index] + (artwork.href ? '' : ' bookend')} />
    );

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
    // As is, should only appear between app launch and the fetch resolution
    // after Gallery mounts.
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
