//server/server.js
const express = require("express");
const cors = require("cors");
const db = require("./models");
const Role = db.role;

const app = express();
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Define the routes
app.use('/auth', authRoutes);
app.use('/test', userRoutes);
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Welcome to my applocation"});
});

const PORT = process.env.PORT || 8081;
db.sequelize.sync();

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});

