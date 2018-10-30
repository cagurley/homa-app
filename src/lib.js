export function getArtworks() {
  const https = require('https');
  return new Promise(function(resolve, reject){
    const postData = JSON.stringify({
      client_id: '222bdcb377a9adbe79ef',
      client_secret: '23fe80d083839ae0b4b0b1445673c4a4'
    });
    const tokenOptions = {
      hostname: 'api.artsy.net',
      method: 'POST',
      path: '/api/tokens/xapp_token',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(tokenOptions, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);
      let body = '';
      res.on('data', chunk => body+=chunk)
         .on('end', () => {
            body = JSON.parse(body);
            const XAPPToken = body.token;
            resolve(XAPPToken);
         });
    }).on('error', e => console.error(`problem with request: ${e.message}`));
    req.write(postData);
    req.end();
  }).then(token => {
    return new Promise((resolve, reject) => {
      const getOptions = {
        hostname: 'api.artsy.net',
        path: `/api/artists/edouard-manet`,
        headers: {
          'X-Xapp-Token': token,
          'Accept': 'application/vnd.artsy-v2+json'
        }
      };
      console.log(getOptions.headers["X-Xapp-Token"]);
      https.get(getOptions, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        let body = ''
        res.on('data', chunk => body+=chunk)
           .on('end', () => {
              body = JSON.parse(body);
              const artist_id = body.id;
              resolve([token, artist_id]);
           });
      }).on('error', (e) => {
        console.error(e);
      });
    })
  }).then(tai => {
    return new Promise((resolve, reject) => {
      const [token, artist_id] = tai;
      const getOptions = {
        hostname: 'api.artsy.net',
        path: `/api/artists/${artist_id}`,
        headers: {
          'X-Xapp-Token': token,
          'Accept': 'application/vnd.artsy-v2+json'
        }
      };
      https.get(getOptions, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        let body = ''
        res.on('data', chunk => body+=chunk)
           .on('end', () => {
              body = JSON.parse(body);
              const regex = /.*\/(.*?)$/;
              const artworks = body._links.artworks.href.match(regex)[1];
             resolve([token, artworks]);
           });
      }).on('error', (e) => {
        console.error(e);
      });
    })
  }).then(taw => {
    // return new Promise((resolve, reject) => {
      const [token, artworks] = taw;
      const getOptions = {
        hostname: 'api.artsy.net',
        path: `/api/${artworks}`,
        headers: {
          'X-Xapp-Token': token,
          'Accept': 'application/vnd.artsy-v2+json'
        }
      };
      https.get(getOptions, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        let body = ''
        res.on('data', chunk => body+=chunk)
           .on('end', () => {
              body = JSON.parse(body);
              let hrefs = [];
              body._embedded.artworks.forEach(artwork => {
                const image_version = artwork.image_versions[0];
                const href = artwork._links.image.href.replace('{image_version}', image_version);
                hrefs.push(href);
              });
              console.log(hrefs);
              return hrefs;
           });
      }).on('error', (e) => {
        console.error(e);
      });
    // });
  })
}
