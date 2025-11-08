const http = require('http');

const data = JSON.stringify({
  name: 'AutoTest User',
  email: `autotest_${Date.now()}@example.com`,
  password: 'testpass'
});

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    try { console.log('BODY:', JSON.parse(body)); }
    catch (e) { console.log('BODY (raw):', body); }
  });
});

req.on('error', (err) => console.error('REQUEST ERROR', err));
req.write(data);
req.end();
