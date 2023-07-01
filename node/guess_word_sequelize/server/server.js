
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcryptjs')
const cors = require('cors');
const cookieParser = require('cookie-parser'); //
const Sequelize = require('sequelize');
const port = 4000;
const { User, Question, User_Level, Level } = require('./models');
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
    const { name } = req.body;
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ message: 'UserName already exist' });
    }
    next()
  } catch (error) {
    console.error('UserName already exist', error);
    res.status(500).json({ message: 'Server error' });

  }
};

app.post('/users', checkExistingUserName, async (req, res) => {
  try {
    const { name, password } = req.body;
    const newUser = await User.create({ name, password });

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Error registration user', error)
    res.status(500).json({ message: 'UserName already exist' });
  }
});
let userId

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { name: username } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user_id: user.id }, 'secret-key');
      let userLevel = await User_Level.findOne({ where: { user_id: user.id } });
      if (!userLevel) {
        const defaultLevel = await Level.findOne({ where: { level_name: 'beginner' } });
        userLevel = await User_Level.create({ user_id: user.id, level_id: defaultLevel.id, score: 1 });
      }
      const currentScore = req.currentScore || 0;
      userId = user.id;
      const levelId = userLevel.level_id;

      return res.status(200).json({ token, levelId, user_id: user.id, score: currentScore });
    }
    res.status(401).json({ message: 'Invalid username or password' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// const preserveLastScore = async (req, res, next) => {
//     try {
//       // Check if the user is already logged in
//       if (req.cookies.token) {
//         // Retrieve the user ID from the token
//         const decoded = jwt.verify(req.cookies.token, 'secret-key');
//         const userId = decoded.user_id;

//         // Set the userId property on the req object
//         req.userId = userId;

//         // Check if the user has an existing level record
//         const userLevel = await User_Level.findOne({ where: { user_id: userId } });
//         if (userLevel) {
//           // Store the user's current score
//           req.currentScore = userLevel.score;
//         }
//       }
//       next();
//     } catch (error) {
//       console.error('Error preserving last score', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };

//   app.use(preserveLastScore);

app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json({ questions });
  } catch (error) {
    console.error('Error getting questions', error);
    res.status(500).json({ message: 'Server error' });
  }
})



const filterByLevel = async (req, res, next) => {
  try {
    const { level_id } = req.query;
    const { exclude } = req.body;
    const question = await Question.findOne({
      where: {
        level_id,
        id: { [Sequelize.Op.notIn]: exclude } // այս այդիները բացառում է հարցման մեջ
      },
      order: Sequelize.literal('random()')
    });

    req.question = question;
    next();
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
};


app.post('/random-word', filterByLevel, (req, res) => {
  try {
    const { question } = req;
    res.json({ question });
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
});



app.post('/users_levels', async (req, res) => {
  try {
    const { level_id, score } = req.body;
    const userLevel = await User_Level.create({
      user_id: userId,
      level_id,
      score
    });
    res.status(201).json({ message: 'Data inserted', userLevel });
  } catch (error) {
    console.error('Error inserting data into users_levels', error);
    res.status(500).json({ message: 'Server error' });
  }
});




app.listen(port, () => {
  console.log(`App running on port ${port}.`);

});

