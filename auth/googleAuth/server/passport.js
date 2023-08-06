require('dotenv').config()
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");


const GOOGLE_CLIENT_ID =process.env.GOOGLE_CLIENT_ID
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  


  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );


//for db
// const user = {
//     username: profile.displayNme,
//     avatar = profile.photos[0],
// };
// user.save()
