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
      'previous',
      'focus',
      'next'
    ];
    console.log(
      props.artworks.filter(
        (artwork, index) => displayIndices.includes(index)
      )
    );
    return (
      <div style={{position: 'relative'}} className="container-fluid row">
        <Arrow
          id="left"
          cursor={props.cursor}
          end={props.artworks.length - 1}
          handleCurrentIndexUpdate={props.updateCurrentIndex} />
        {props.artworks.filter(
          (artwork, index) => displayIndices.includes(index)
        ).map((artwork, index) =>
          <Artwork key={artwork.id} source={artwork.href} className={displayClassNames[index]} />
        )}
        <Arrow
          id="right"
          cursor={props.cursor}
          end={props.artworks.length - 1}
          handleCurrentIndexUpdate={props.updateCurrentIndex} />
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
  cursor: PropTypes.number.isRequired
}

export default Collection;
