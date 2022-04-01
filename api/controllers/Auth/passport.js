const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FaceBookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const passport = require('passport');

const AUTH_TOOLS = require('../../util/authTools');
const customError = require('../../util/customError');

const User = require('../../models/User');

const googleOAuth = require('../../util/googleOAuth');

const authManager = async (profile) => {
  // check if user is already exists in the DB
  const { email, sub, name, given_name, family_name, picture } = profile._json;
  const userDB = await User.findOne({ email: email });
  if (userDB) {
    // If user is already exists user current user info to create JWT
    user = {
      _id: userDB._id,
      googleId: profile.id,
      name: name,
      firstName: given_name,
      lastName: family_name,
      email: email,
      profilePic: picture,
    };
  } else {
    // If user is not in our DB then create the user with the profile information
    const newUser = new User({
      email: email ? email : 'email',
      password: '1', // generate a random password for the new user
      // fill other user details in your model with the data passed by Google
    });
    const savedUser = await newUser.save();

    user = {
      _id: savedUser._id,
      googleId: sub,
      name: name,
      firstName: given_name,
      lastName: family_name,
      email: email,
      profilePic: picture,
    };
  }
  // generate user token and return
  const token = AUTH_TOOLS.generateToken(user.email, user._id);
  console.log('user : ', user);
  console.log('token : ', token);
  return {
    ...user,
    token,
  };
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const obj = await authManager(profile);
      return done(null, obj);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const obj = await authManager(profile);
      return done(null, obj);
    }
  )
);

passport.use(
  new FaceBookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const obj = await authManager(profile);
      return done(null, obj);
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      // clientID: process.env.TWITTER_API_KEY,
      // clientSecret: process.env.TWITTER_API_KEY_SECRET,
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: '/auth/twitter/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const obj = await authManager(profile);
      return done(null, obj);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('passport.serializeUser');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('passport.deserializeUser');
  done(null, user);
});
