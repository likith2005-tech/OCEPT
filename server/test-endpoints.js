const http = require('http');
const urls = [
  'http://localhost:5001/api/courses',
  'http://localhost:5001/api/users',
  'http://localhost:5001/api/contacts'
];

function fetchUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url, status: res.statusCode, body: data }));
    }).on('error', (err) => resolve({ url, error: err.message }));
  });
}

(async () => {
  for (const u of urls) {
    const r = await fetchUrl(u);
    console.log('\n=== ' + u + ' ===');
    if (r.error) console.log('ERROR:', r.error);
    else {
      try {
        const parsed = JSON.parse(r.body);
        console.log('STATUS:', r.status);
        console.log(JSON.stringify(parsed, null, 2));
      } catch (e) {
        console.log('RESPONSE:', r.body);
      }
    }
  }
})();
