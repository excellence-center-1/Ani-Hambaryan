const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = 3000;
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/users', (req, res) => {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(data);
    res.end(data);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const users = JSON.parse(data);
    const user = users.find((user) => user.id === userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(user);
  });
});

app.post('/add', (req, res) => {
  const newUser = req.body;
  if (!newUser || Object.keys(newUser).length === 0) {
    res.status(400).send('Bad Request: Invalid user data');
    return;
  }
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(newUser);
    });
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const users = JSON.parse(data);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      res.status(404).send('User not found');
      return;
    }
    const removedUser = users.splice(userIndex, 1);
    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(removedUser[0]);
    });
  });
});

const middlePut = (req, res, next) => {
  console.log(`PUT request received for path: ${req.path}`);
  console.log('bodi', req.body);
  next();
};

app.put('/users/:id', middlePut, (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const users = JSON.parse(data);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      res.status(404).send('User not found');
      return;
    }
    users[userIndex] = {
      ...users[userIndex],
      ...updatedUserData,
    };
    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(users[userIndex]);
    });
  });
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
