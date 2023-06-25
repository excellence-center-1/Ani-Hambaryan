const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser'); //
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); //


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.checkUserExist, db.createUser);
app.post('/login', db.loginUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});