const express = require('express');
const bodyparser = require('body-parser');
const db = require('./queries')
const app = express();
const cors = require('cors');
const port = 3001;


app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(bodyparser.json())
app.use(
    bodyparser.urlencoded({
        extended: true,
    })
)


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  app.get('/users', db.getUsers);
  app.get('/users/:id', db.getUserById);
  app.post('/users', db.createUser);
  app.delete('/usrs/:id', db.deleteUser);


  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })


