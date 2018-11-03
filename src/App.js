import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ArtistSearch from './ArtistSearch';
import Collection from './Collection';

class App extends Component {
  state = {
    token: {
      string: '',
      expiration: Date.now()
    },
    artist_name: 'edouard-manet',
    artworks: []
  }

  getToken() {console.log(this.state.token.expiration, this.state.token.expiration < Date.now());
    const postData = JSON.stringify({
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET
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
      console.log('statusCode:', res.status);
      res.headers.forEach(header => console.log('header:', header));
      return res.json();
    }).catch(
     e => console.error(`problem with request: ${e.message}`)
    ).then(json => {
      console.log(json);
      this.setState({
        token: {
          string: json.token,
          expiration: new Date(json.expires_at)
        }
      });
      return 'MESSAGE!';
    });
  }

  getArtistId (token, artist_name) {console.log(this.state.token.expiration, this.state.token.expiration < Date.now());
    const getOptions = {
      method: 'GET',
      headers: {
       'X-Xapp-Token': token,
       'Accept': 'application/vnd.artsy-v2+json'
      }
    };

    return fetch(
     `https://api.artsy.net/api/artists/${artist_name}`,
     getOptions
    ).then(res => {
     console.log('statusCode:', res.status);
     res.headers.forEach(header => console.log('header:', header));
     return res.json();
    }).catch(
     e => console.error(e)
    ).then(json => {
     console.log(json.id);
     console.log(token);
     const artist_id = json.id;
     return artist_id;
    });
  }

  getArtworks(token, artist_id) {console.log(this.state.token.expiration, this.state.token.expiration < Date.now());
    const getOptions = {
      method: 'GET',
      headers: {
        'X-Xapp-Token': token,
        'Accept': 'application/vnd.artsy-v2+json'
      }
    };

    return fetch(
      `https://api.artsy.net/api/artists/${artist_id}`,
      getOptions
    ).then(res => {
      console.log('statusCode:', res.status);
      res.headers.forEach(header => console.log('header:', header));
      return res.json();
    }).catch(
      e => console.error(e)
    ).then(json => {
      const regex = /.*\/(.*?)$/;
      const artworks = json._links.artworks.href.match(regex)[1];
      return artworks;
    });
  }

  setArtworks(token, artworks) {console.log(this.state.token.expiration, this.state.token.expiration < Date.now());
    const getOptions = {
      method: 'GET',
      headers: {
        'X-Xapp-Token': token,
        'Accept': 'application/vnd.artsy-v2+json'
      }
    };

    fetch(
      `https://api.artsy.net/api/${artworks}`,
      getOptions
    ).then(res => {
      console.log('statusCode:', res.status);
      res.headers.forEach(header => console.log('header:', header));
      return res.json();
    }).catch(
      e => console.error(e)
    ).then(json => {
      let artworks = [];
      json._embedded.artworks.forEach(artwork => {
        const id = artwork.id;
        const image_version = artwork.image_versions[0];
        const href = artwork._links.image.href.replace('{image_version}', image_version);
        artworks.push({id, href});
      });
      console.log(artworks);
      this.setState({artworks});
    });
  }

  updateArtist = () => {
    let artist_name = document.getElementById('artist-search').value;
    artist_name = artist_name.replace(/[\s_]+/, '-');
    console.log(artist_name);
    this.setState({artist_name});
    this.getToken()
      .then(message => {
        console.log(message);
        return this.getArtistId(this.state.token.string, this.state.artist_name);
      })
      .then(artist_id => {
        console.log("AID:", artist_id);
        return this.getArtworks(this.state.token.string, artist_id)
      })
      .then(artworks => this.setArtworks(this.state.token.string, artworks));
  }

  componentDidMount() {
    const prom = this.getToken()
      .then(message => {
        console.log(message);
        return this.getArtistId(this.state.token.string, this.state.artist_name);
      })
      .then(artist_id => this.getArtworks(this.state.token.string, artist_id))
      .then(artworks => this.setArtworks(this.state.token.string, artworks))
    return prom;
  }

  render() {
    console.log(this.state.artworks);
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>*/}
          <ArtistSearch handleArtistUpdate={this.updateArtist} />
          <Collection artworks={this.state.artworks} />
        </header>
      </div>
    );
  }
}

export default App;
