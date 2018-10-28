const https = require('https');
const getArtist = new Promise(function(resolve, reject){
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
          let XAPPToken = body.token;
          console.log(`TOKEN: ${XAPPToken}`);
          console.log(`END BODY: ${JSON.stringify(body)}`);
          console.log('No more data in response.')
          resolve(XAPPToken);
       });
  }).on('error', e => console.error(`problem with request: ${e.message}`));
  req.write(postData);
  req.end();
}).then(token => {
  return new Promise((resolve, reject) => {
    const getOptions = {
      hostname: 'api.artsy.net',
      path: `/api/artists/andy-warhol`,
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
            regex = /.*\/(.*?)$/;
            console.log(regex);
            let location = res.headers.location.match(regex)[1];
            console.log(`TOKEN: ${token}`);
            console.log(`LOCATION_ID: ${location}`);
            console.log(`END BODY: ${JSON.stringify(body)}`);
            console.log('No more data in response.')
            resolve([token, location]);
         });
    }).on('error', (e) => {
      console.error(e);
    });
  })
}).then(tl => {
  const [token, location] = tl;
  console.log(`TOKEN: ${token}`);
  console.log(`LOCATION: ${location}`);
  const getOptions = {
    hostname: 'api.artsy.net',
    path: `/api/artists/${location}`,
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
//          let location = res.headers.location;
//          console.log(`TOKEN: ${token}`);
//          console.log(`LOCATION: ${location}`);
          console.log(`DESIRED BODY: ${JSON.stringify(body)}`);
          console.log('No more data in response.')
//          return token, location;
       });
  }).on('error', (e) => {
    console.error(e);
  });
});
