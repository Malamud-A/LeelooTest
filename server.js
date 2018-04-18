/* eslint-disable no-console*/
const express = require('express');
  app = express();
  hostname = '0.0.0.0';
  port = parseInt(process.env.PORT, 10) || 8080;
  publicDir = __dirname + '/build';
  path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, '/index.html'));
});

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(publicDir, '/js/main.js'));
});

app.use(express.static(publicDir));

console.log('Listening at' + port);
app.listen(port, hostname);

