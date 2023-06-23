const https = require("https");
const express = require("express");
const fs = require("fs");

const app = express();
app.get('/', (req, res) => {
  res.send("Hello");
});



const options = {
  key: fs.readFileSync('certificates/server.key'),
  cert: fs.readFileSync('certificates/server.cert')
};



https.createServer(options, app).listen(3002);
