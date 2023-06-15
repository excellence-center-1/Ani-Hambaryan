

const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users', (req, res) => {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data);
    res.end(data);
  })
})

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const users = JSON.parse(data);
    const user = users.find(user => user.id === userId);
    user ? res.json(user) : res.sendStatus(404).send('User not found')
  });
});
app.post('/add', (req, res) => {
  const newUser = {

    "id": "5",
    "name": "admin5",
    "actualName": null,
    "displayName": "admin5"

  };

  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
      if (err) {
        console.error(err)
        return
      }
      res.json(newUser);
    })
  })
})

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const users = JSON.parse(data);
    const userIndex = users.findIndex(user => user.id === userId);
    if (!userIndex) {
      res.sendStatus(404).send('User not found');
    }
    const removedUser = users.splice(userIndex, 1);
    fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
      if (err) {
        console.error(err)
        return
      }
      res.json(removedUser[0]);
    })
  })
});


app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const users = JSON.parse(data);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      res.status(404).send('User not found');
      return;
    }
    users[userIndex] = {
      ...users[userIndex],
      ...updatedUserData
    };
    fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
      if (err) {
        console.error(err);
        return;
      }
      res.json(users[userIndex]);
    });
  });
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});