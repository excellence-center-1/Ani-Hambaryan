//routes/auth.js
require('dotenv').config()
const router = require('express').Router();
const passport = require('passport')
const CLIENT_URL = "http://localhost:3000/";
router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  });
  
  router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });
  
  router.get('/logout', (req, res) => {
    req.logout(function (err) {
      if (err) {
        // Handle any error that might occur during logout
        return res.status(500).json({
          success: false,
          message: 'Error during logout',
        });
      }
      // If logout is successful, redirect to the CLIENT_URL or any other route
      res.redirect(CLIENT_URL); // Make sure CLIENT_URL is defined in your .env file
    });
  });
  
  router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
  
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    })
  );
  
  
  
  
  module.exports = router