


const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcryptjs')
const cors = require('cors');
const cookieParser = require('cookie-parser'); //
const port = 4000;

const Sequelize = require('sequelize');

const { User, Question } = require('./models');
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); //


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});


const checkExistingUserName = async (req, res, next) => {
    try {
        const {name} = req.body;
        const existingUser = await User.findOne({where: {name} });
        if(existingUser){
            return res.status(400).json({message: 'UserName already exist'});
        }
        next()
    } catch(error){
        console.error('UserName already exist', error);
        res.status(500).json({message: 'Server error'});

    }
};

app.post('/users', checkExistingUserName, async (req, res) => {
    try {
        const {name, password} = req.body;
        const newUser = await User.create({name, password});

        res.status(201).json({message: 'Registration successful', user: newUser});
    } catch (error){
        console.error('Error registration user', error)
        res.status(500).json({ message: 'UserName already exist' });
    }
});


app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { name: username } });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, 'secret-key');
        return res.status(200).json({ token });
      }
      res.status(401).json({ message: 'Invalid username or password' });
    } catch (error) {
      console.error('Error during login', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
app.get('/questions', async (req, res) => {
    try{
const questions = await Question.findAll();
res.status(200).json({ questions });
    } catch (error) {
        console.error('Error getting questions', error);
        res.status(500).json({ message: 'Server error' });
    }
})

app.get('/random-word', async (req, res) => {
    try{
        const question = await Question.findOne({order: Sequelize.literal('random()')});
        res.json({ question });
            } catch (error) {
                console.error('Error retrieving random word', error);
    res.status(500).json({ message: 'Server error' });
            }
})
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
   
});

