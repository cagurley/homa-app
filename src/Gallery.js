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
      name: 'edouard-manet',
      id: ''
    },
    collection: {
      uri: '',
      artworks: [],
      currentIndex: 0
    },
    error: ''
  }

  getToken() {
    // console.log(this.state.token, this.state.token.expiration < Date.now());
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
        // console.log('statusCode:', res.status);
        // res.headers.forEach(header => console.log('header:', header));
        return Promise.all([res.status, res.json()]);
      }).catch(
       e => console.error(`problem with request: ${e.message}`)
      ).then(sj => {
        const [status, json] = sj;
        // console.log(status, json);
        if (status === 201) {
          this.setState(prevState => ({
            token: {
              string: json.token,
              expiration: new Date(json.expires_at)
            }
          }));
        }
        // console.log(this.state.token);
        return status;
      });
    } else {
      return Promise.resolve(true);
    }
  }

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
     // console.log('statusCode:', res.status);
     // res.headers.forEach(header => console.log('header:', header));
     return Promise.all([res.status, res.json()]);
    }).catch(
     e => console.error(e)
    ).then(sj => {
      const [status, json] = sj;
      // console.log(json.id);
      // console.log(token);
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
      // console.log('statusCode:', res.status);
      // res.headers.forEach(header => console.log('header:', header));
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
      // console.log('statusCode:', res.status);
      // res.headers.forEach(header => console.log('header:', header));
      return Promise.all([res.status, res.json()]);
    }).catch(
      e => console.error(e)
    ).then(sj => {
      const [status, json] = sj;
      // console.log(json);
      let artworks = [];
      json._embedded.artworks.forEach(artwork => {
        const id = artwork.id;
        const image_version = artwork.image_versions[0];
        const href = artwork._links.image.href.replace('{image_version}', image_version);
        artworks.push({id, href});
      });
      // console.log(artworks);
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

  displayArtistArtworks() {
    const searchSubmit = document.getElementById('search-submit');
    searchSubmit.setAttribute('disabled', '');
    Promise.resolve(setTimeout(() => searchSubmit.removeAttribute('disabled'), 1500));
    this.setState(prevState => ({
      error: ''
    }));
    return this.getToken()
      .then(prevStatus => {
        // console.log('prevStatus:', prevStatus);
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
      // .then(prevStatus => {
      //   if (prevStatus !== 200 && prevStatus !== false && this.state.collection.artworks.length === 0)
      // });
  }

  updateArtist = e => {
    e.preventDefault();
    let artistName = document.getElementById('artist-search').value;
    artistName = artistName.toLowerCase();
    artistName = artistName.replace(/[^\w\s-]+/g, '');
    artistName = artistName.replace(/[\s_]+/g, '-');
    // console.log(artistName);
    this.setState(
      prevState => ({
        artist: {
          name: artistName,
          id: prevState.artist.id
        }
        // collection: {
        //   uri: prevState.collection.uri,
        //   artworks: prevState.collection.artworks,
        //   currentIndex: 0
        // }
      }),
      () => this.displayArtistArtworks()
    );
  }

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
    // console.log(this.state.collection.artworks);
    return (
      <div hidden={this.props.hidden} className="container-fluid">
        <ArtistSearch
          currentArtist={'/' + this.state.artist.name}
          handleArtistUpdate={this.updateArtist} />
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
