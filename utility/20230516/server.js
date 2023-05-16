// To test locally hosted site on mobile with HTTPS
// Create certificates with mkcert
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('../../hysysk.local-key.pem'),
  cert: fs.readFileSync('../../hysysk.local.pem')
};

https.createServer(options, (req, res) => {
  fs.readFile('./index.html', 'utf-8', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}).listen(9000);
console.log("Server is listening on port 9000");