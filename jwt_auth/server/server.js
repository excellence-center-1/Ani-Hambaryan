const express = require("express");
const cors = require("cors");
const db = require("./models");
const { authJwt } = require("./middleware");
const Role = db.role;

const app = express();
const PORT = process.env.PORT || 8081;


app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const verifySignUp = require("./middleware/verifySignUp");

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

app.get("/test/all", (req, res) => {
    res.send({ message: "Public route: All users can access this." });
  });
  
  app.get("/test/user", [verifySignUp.checkRolesExisted], (req, res) => {
    res.send({ message: "User route: Only authenticated users can access this." });
  });
  
  app.get("/test/mod", [verifySignUp.checkRolesExisted, authJwt.isModerator], (req, res) => {
    res.send({ message: "Moderator route: Only moderators can access this." });
  });
  
  app.get("/test/admin", [verifySignUp.checkRolesExisted, authJwt.isAdmin], (req, res) => {
    res.json({ message: "Admin route: Only administrators can access this." });
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
