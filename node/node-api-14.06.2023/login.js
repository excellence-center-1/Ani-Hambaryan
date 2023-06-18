const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Middleware 
const processRequestBodyMiddleware = (req, res, next) => {
  const { username, password } = req.body;
 
  if (!username || !password) {
    res.status(400).send('Գրեք բոլոր դաշտերը');
    return;
  }

 
  req.processedData = {
    username, //եթե բանալին ու արժեքը նույնն են, կարող ենք գրել մեկը։
    password,
  };
  console.log(req.body)
  next();
};


app.post('/login', processRequestBodyMiddleware, (req, res) => {

  const { username, password } = req.processedData;

  if (username === 'your_username' && password === 'your_password') {
    
    res.send('Authentication successful');
  } else {
    res.send('Authentication failed');
  }
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
