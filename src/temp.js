const lib = require('./lib.js');

const artworks = lib.getArtworks();
setTimeout(() => console.log(artworks), 3000);
