const postData = JSON.stringify({
  client_id: '222bdcb377a9adbe79ef',
  client_secret: '23fe80d083839ae0b4b0b1445673c4a4'
});
const https = require('https');
const tokenOptions = {
  hostname: 'api.artsy.net',
  method: 'POST',
  path: '/api/tokens/xapp_token',
  headers: {
    'Content-Type': 'application/json'
  }
};
let xapptoken;
const req = https.request(tokenOptions, res => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  let body = '';
  res.on('data', chunk => body+=chunk);
  res.on('end', () => {
    body = JSON.parse(body);
    xapptoken = body.token;
    console.log(`TOKEN: ${xapptoken}`);
    console.log(`END BODY: ${JSON.stringify(body)}`);
    console.log('No more data in response.')
  });
});
req.on('error', e => console.error(`problem with request: ${e.message}`));
req.write(postData);
req.end();

// Need to fix below
const getOptions = {
  hostname: 'api.artsy.net',
  path: `/api/artists/andy-warhol`,
  headers: {
    'X-Xapp-Token': xapptoken,
    'Accept': 'application/vnd.artsy-v2+json'
  }
};
https.get(getOptions, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
