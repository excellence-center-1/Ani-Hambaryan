require('dotenv').config();
const PORT = process.env.PORT || 6000;
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./passport');
const authRoute = require('./routes/auth');

const app = express();

// Use express-session instead of cookie-session
app.use(
  session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize Passport and use session for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// Use the '/auth' route for authentication
app.use('/auth', authRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
