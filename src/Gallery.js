import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import ErrorMessage from './ErrorMessage';
import ArtistSearch from './ArtistSearch';
import Collection from './Collection';

class Gallery extends Component {
  state = {
    token: {
      string: '',
      expiration: Date.now()
    },
    artist: {
      name: 'claude-monet',
      id: ''
    },
    collection: {
      uri: '',
      artworks: [],
      currentIndex: 0
    },
    error: ''
  }

  // Posts to .../tokens/xapptoken endpoint to authenticate
  getToken() {
    // Below prevents unnecessary posts as tokens are valid for about a week
    if (this.state.token.expiration - Date.now() < 86400000) {
      const postData = JSON.stringify({
        client_id: process.env.REACT_APP_ARTSY_CLIENT_ID,
        client_secret: process.env.REACT_APP_ARTSY_CLIENT_SECRET
      });
      const tokenOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: postData
      };

      return fetch(
        'https://api.artsy.net/api/tokens/xapp_token',
        tokenOptions
      ).then(res => {
        return Promise.all([res.status, res.json()]);
      }).catch(
       e => console.error(`problem with request: ${e.message}`)
      ).then(sj => {
        const [status, json] = sj;
        if (status === 201) {
          this.setState(prevState => ({
            token: {
              string: json.token,
              expiration: new Date(json.expires_at)
            }
          }));
        }
        return status;
      });
    } else {
      return Promise.resolve(true);
    }
  }

  // Gets from .../artists/ endpoint with English name string, e.g. 'claude-monet'
  // Will return an id for the artist as a pseudo-redirect
  getArtistId (token, artistName) {
    const getOptions = {
      method: 'GET',
      headers: {
       'X-Xapp-Token': token,
       'Accept': 'application/vnd.artsy-v2+json'
      }
    };

    return fetch(
     `https://api.artsy.net/api/artists/${artistName}`,
     getOptions
    ).then(res => {
     return Promise.all([res.status, res.json()]);
    }).catch(
     e => console.error(e)
    ).then(sj => {
      const [status, json] = sj;
      if (status === 200) {
        this.setState(prevState => ({
          artist: {
            name: prevState.artist.name,
            id: json.id
          }
        }));
      }
      return status;
    });
  }

  // Gets from .../artists/ endpoint now with the id string, e.g. '4d8b92774eb68a1b2c000134'
  getArtworks(token, artistId) {
    const getOptions = {
      method: 'GET',
      headers: {
        'X-Xapp-Token': token,
        'Accept': 'application/vnd.artsy-v2+json'
      }
    };

    return fetch(
      `https://api.artsy.net/api/artists/${artistId}`,
      getOptions
    ).then(res => {
      return Promise.all([res.status, res.json()]);
    }).catch(
      e => console.error(e)
    ).then(sj => {
      const [status, json] = sj;
      const regex = /.*\/(.*?)$/;
      const uri = json._links.artworks.href.match(regex)[1];
      if (status === 200) {
        this.setState(prevState => ({
          collection: {
            uri,
            artworks: prevState.collection.artworks,
            currentIndex: prevState.collection.currentIndex
          }
        }));
      }
      return status;
    });
  }

  // Gets from /artworks/ endpoint with a query string for the artist id
  // e.g. 'artworks?artist_id=4d8b92774eb68a1b2c000134'
  setArtworks(token, artworksUri) {
    const getOptions = {
      method: 'GET',
      headers: {
        'X-Xapp-Token': token,
        'Accept': 'application/vnd.artsy-v2+json'
      }
    };

    fetch(
      `https://api.artsy.net/api/${artworksUri}`,
      getOptions
    ).then(res => {
      return Promise.all([res.status, res.json()]);
    }).catch(
      e => console.error(e)
    ).then(sj => {
      const [status, json] = sj;
      let artworks = [];
      json._embedded.artworks.forEach(artwork => {
        const id = artwork.id;
        const title = artwork.title;
        const image_version = artwork.image_versions[0];
        const href = artwork._links.image.href.replace('{image_version}', image_version);
        const similar = artwork._links.similar_artworks.href;
        artworks.push({id, title, href, similar});
      });
      if (status === 200 && artworks.length > 0) {
        this.setState(prevState => ({
          collection: {
            uri: prevState.uri,
            artworks,
            currentIndex: 0
          }
        }));
      } else if (status === 200 && artworks.length === 0) {
        this.setState(prevState => ({
          error: 'artworks'
        }));
      }
      return status;
    });
  }

  // Disables ArtistSearch buttons to prevent spam and executes above functions to update state
  displayArtistArtworks() {
    const searchSubmit = document.getElementById('artist-submit');
    const similar = document.getElementById('similar');
    searchSubmit.setAttribute('disabled', '');
    similar.setAttribute('disabled', '');
    Promise.resolve(setTimeout(() => {
      searchSubmit.removeAttribute('disabled');
      similar.removeAttribute('disabled');
    }, 1500));
    this.setState(prevState => ({
      error: ''
    }));
    return this.getToken()
      .then(prevStatus => {
        if (prevStatus === 201 || prevStatus === true) {
          return this.getArtistId(this.state.token.string, this.state.artist.name);
        } else if (prevStatus === 429) {
          this.setState(prevState => ({
            error: 'spam'
          }));
        } else {
          this.setState({
            error: 'token'
          });
        }
        return false;
      })
      .then(prevStatus => {
        if (prevStatus === 200) {
          return this.getArtworks(this.state.token.string, this.state.artist.id);
        } else if (prevStatus === 429) {
          this.setState(prevState => ({
            error: 'spam'
          }));
        } else if (prevStatus !== false) {
          this.setState({
            error: 'artist'
          });
        }
        return false;
      })
      .then(prevStatus => {
        if (prevStatus === 200) {
          return this.setArtworks(this.state.token.string, this.state.collection.uri);
        } else if (prevStatus === 429) {
          this.setState(prevState => ({
            error: 'spam'
          }));
        } else if (prevStatus !== false) {
          this.setState({
            error: 'collection'
          });
        }
        return false;
      });
  }

  // Disables ArtistSearch buttons to prevent spam and executes above functions to update state
  displayRelatedArtworks() {
    const searchSubmit = document.getElementById('artist-submit');
    const similar = document.getElementById('similar');
    searchSubmit.setAttribute('disabled', '');
    similar.setAttribute('disabled', '');
    Promise.resolve(setTimeout(() => {
      searchSubmit.removeAttribute('disabled');
      similar.removeAttribute('disabled');
    }, 1500));
    this.setState(prevState => ({
      error: ''
    }));

    let uri = this.state.collection.artworks[this.state.collection.currentIndex].similar;
    const regex = /.*\/(.*?)$/;
    uri = uri.match(regex)[1];

    return this.getToken()
      .then(prevStatus => {
        if (prevStatus === 201 || prevStatus === true) {
          return this.setArtworks(this.state.token.string, uri);
        } else if (prevStatus === 429) {
          this.setState(prevState => ({
            error: 'spam'
          }));
        } else {
          this.setState({
            error: 'token'
          });
        }
        return false;
      });
  }

  // Handler to ultimately govern the behavior of ArtistSearch.
  // Regex replacement coerces a search into something recognizable
  // by the API.
  updateArtist = e => {
    e.preventDefault();
    let artistName = document.getElementById('artist-search').value;
    artistName = artistName.toLowerCase();
    artistName = artistName.replace(/[^\w\s-]+/g, '');
    artistName = artistName.replace(/[\s_]+/g, '-');
    this.setState(
      prevState => ({
        artist: {
          name: artistName,
          id: prevState.artist.id
        }
      }),
      () => this.displayArtistArtworks()
    );
  }

  showSimilarGallery = e => {
    e.preventDefault();
    this.displayRelatedArtworks();
  }

  // Handler for updating the current artwork being displayed based on Arrow clicks.
  updateCurrentIndex = lr => {
    if (lr === 'left') {
      this.setState(prevState => ({
        collection: {
          uri: prevState.collection.uri,
          artworks: prevState.collection.artworks,
          currentIndex: prevState.collection.currentIndex - 1
        }
      }));
    } else if (lr === 'right') {
      this.setState(prevState => ({
        collection: {
          uri: prevState.collection.uri,
          artworks: prevState.collection.artworks,
          currentIndex: prevState.collection.currentIndex + 1
        }
      }));
    }
  }

  componentDidMount() {
    this.displayArtistArtworks();
  }

  render() {
    return (
      <div hidden={this.props.hidden} className="container-fluid">
        <ArtistSearch
          currentArtist={'/' + this.state.artist.name}
          handleArtistUpdate={this.updateArtist}
          handleSimilarGallery={this.showSimilarGallery} />
        <ErrorMessage
          error={this.state.error} />
        <Collection
          artworks={this.state.collection.artworks}
          cursor={this.state.collection.currentIndex}
          updateCurrentIndex={this.updateCurrentIndex} />
      </div>
    );
  }
}

Gallery.propTypes = {
  hidden: PropTypes.bool.isRequired
}

export default Gallery;
