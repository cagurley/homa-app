import React from 'react';
import * as lib from './lib.js';

const state = {
  artworks: lib.getArtworks()
};

setTimeout(() => console.log(state.artworks), 3000);

const Collection = () => {state.artworks.forEach(artwork => <img src={artwork} alt='artwork' />)};

export default Collection;
