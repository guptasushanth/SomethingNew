const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");

// OAuth2 Strategy Configuration
passport.use(
  "dynamic-oauth",
  new OAuth2Strategy(
    {
      authorizationURL: process.env.AUTHORIZATION_URL,
      tokenURL: process.env.TOKEN_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
    },
    (accessToken, refreshToken, profile, done) => {
      // Save the access token and user profile
      done(null, { accessToken, profile });
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
