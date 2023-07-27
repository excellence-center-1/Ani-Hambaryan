const express = require("express");
const cors = require("cors");
const db = require("./models");
const Role = db.role;

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware to allow CORS for requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the verifySignUp middleware
const verifySignUp = require("./middleware/verifySignUp");

// Import the auth controller
const authController = require("./controllers/auth.controller");

// Define the routes
app.post(
  "/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  authController.signup
);

app.post("/auth/signin", authController.signin);

// Define other routes (if any)
// ...

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});

// Synchronize the database and start the server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
