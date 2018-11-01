import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Collection from './Collection';



class App extends Component {
  state = {
    artworks: []
  }

  componentDidMount() {
    const https = require('https');
    const postData = JSON.stringify({
      client_id: '222bdcb377a9adbe79ef',
      client_secret: '23fe80d083839ae0b4b0b1445673c4a4'
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
       return new Promise((resolve, reject) => resolve(json.token));
     })
    .then(token => {
      const getOptions = {
        headers: {
          'X-Xapp-Token': token,
          'Accept': 'application/vnd.artsy-v2+json'
        }
      };
      return fetch('https://api.artsy.net/api/artists/edouard-manet', getOptions)
      .then(res => {
        console.log('statusCode:', res.status);
        res.headers.forEach(header => console.log('header:', header));
        return res.json();
      }).catch(
        e => console.error(e)
      ).then(json => {
        console.log(json.id);
        console.log(token);
        const artist_id = json.id;
        return [token, artist_id];
      }).then(tai => {
        const [token, artist_id] = tai;
        const getOptions = {
          headers: {
            'X-Xapp-Token': token,
            'Accept': 'application/vnd.artsy-v2+json'
          }
        };
        fetch(
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
          return [token, artworks];
        })
      })
    })
    // .then(taw => {
    //     const [token, artworks] = taw;
    //     const getOptions = {
    //       hostname: 'api.artsy.net',
    //       path: `/api/${artworks}`,
    //       headers: {
    //         'X-Xapp-Token': token,
    //         'Accept': 'application/vnd.artsy-v2+json'
    //       }
    //     };
    //     https.get(getOptions, (res) => {
    //       console.log('statusCode:', res.statusCode);
    //       console.log('headers:', res.headers);
    //       let body = ''
    //       res.on('data', chunk => body+=chunk)
    //          .on('end', () => {
    //             body = JSON.parse(body);
    //             let artworks = [];
    //             body._embedded.artworks.forEach(artwork => {
    //               const id = artwork.id;
    //               const image_version = artwork.image_versions[0];
    //               const href = artwork._links.image.href.replace('{image_version}', image_version);
    //               artworks.push({id, href});
    //             });
    //             console.log(artworks);
    //             this.setState({artworks});
    //          });
    //     }).on('error', (e) => {
    //       console.error(e);
    //     });
    // });
  }

  render() {
    console.log(this.state.hrefs);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
          </a>
          <Collection artworks={this.state.artworks}/>
        </header>
      </div>
    );
  }
}

export default App;
