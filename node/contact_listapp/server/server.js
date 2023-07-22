const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcryptjs')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require("express-session"); // Add express-session
const Sequelize = require('sequelize');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const port = 4000;
const { User, Contacts } = require('./models');


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return done(null, false, { message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return done(null, false, { message: 'Invalid username or password' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Passport Serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});



// Routes
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

const checkUserNameExist = async (req, res, next) => {
    try {
        const { username } = req.body;
        const existingUser = await User.findOne({ where: { username: username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        next();
    } catch (error) {
        console.error('Error checking username', error);
    }
}
app.post('/register', checkUserNameExist, async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'Registration successful', user: newUser });
    } catch (error) {
        console.error('Error registering user', error);
    }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    const token = jwt.sign({ user_id: req.user.id }, 'secret-key');
    res.status(200).json({ token, message: 'Login successful' });
});


app.post('/newcontact', async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, cellphoneNumber, email, group } = req.body;
        //   const userId = req.user.id;
        const newContact = await Contacts.create({
            // user_id: userId,
            firstname: firstName,
            lastname: lastName,
            phoneNumber: phoneNumber,
            cellphoneNumber: cellphoneNumber,
            email: email,
            group: group,
        });
        res.status(201).json({ message: 'Creation successful' });
    } catch (error) {
        console.error('Error creating contact', error);
    }
});

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contacts.findAll({
            attributes: ['id', 'firstname', 'cellphoneNumber'],
        });
        res.status(200).json({ contacts });
    } catch (error) {
        console.error('Error fetching contacts', error);
    }
});

app.post('/logout', (req, res) => {
    req.logout(() => { });
    res.status(200).json({ message: 'Logout successful' });
});

app.delete('/contacts/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        const deletedContact = await Contacts.destroy({ where: { id: contactId } });
        if (deletedContact) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        console.error('Error deleting contact', error);
    }
});

app.put('/contacts/:id', async (req, res) => {
    try {
        const contactId = parseInt(req.params.id);
        const updatedContact = req.body;
        const existingContact = await Contacts.findByPk(contactId);
        if (!existingContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        existingContact.firstname = updatedContact.firstName || existingContact.firstname;
        existingContact.lastname = updatedContact.lastName || existingContact.lastname;
        existingContact.phoneNumber = updatedContact.phoneNumber || existingContact.phoneNumber;
        existingContact.cellphoneNumber = updatedContact.cellphoneNumber || existingContact.cellphoneNumber;
        existingContact.email = updatedContact.email || existingContact.email;
        existingContact.group = updatedContact.group || existingContact.group;
        await existingContact.save();
        res.status(200).json({ message: 'Contact updated successfully', contact: existingContact });
    } catch (error) {
        console.error('Error updating contact', error);
    }
});
const PORT = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App running on port ${PORT}.`);
});
