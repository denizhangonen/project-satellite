const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FaceBookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

const AUTH_TOOLS = require('../../util/authTools');
const customError = require('../../util/customError');

const User = require('../../models/User');

const googleOAuth = require('../../util/googleOAuth');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('after success things to do profile : ', profile);
      // done(null, profile);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });

      // check if user is already exists in the DB
      console.log('normally I would done this however, lets move on shall we?');
      const { email, sub, name, given_name, family_name, picture } =
        profile._json;
      const userDB = await User.findOne({ email: email });
      if (userDB) {
        // If user is already exists user current user info to create JWT
        console.log('yes user');
        user = {
          _id: userDB._id,
          googleId: profile.id,
          name: name,
          firstName: given_name,
          lastName: family_name,
          email: email,
          profilePic: picture,
        };

        console.log('userDB : ', userDB);
      } else {
        // If user is not in our DB then create the user with the profile information
        console.log('no user');
        const newUser = new User({
          email: email,
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

        console.log('savedUSer : ', savedUser);
      }

      console.log('user : ', user);
      // generate user token and return
      const token = AUTH_TOOLS.generateToken(user.email, user._id);

      // return response
      // res.status(200).json({
      //   token: token,
      //   ...user,
      // });
      return done(null, { ...user, token });
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
      console.log('Git after success things to do profile : ', profile);
      // done(null, profile);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });

      // check if user is already exists in the DB
      console.log(
        'Git normally I would done this however, lets move on shall we?'
      );
      const { email, sub, name, given_name, family_name, picture } =
        profile._json;
      console.log('email :', email ? email : 'no email');
      const userDB = await User.findOne({ email: email });
      if (userDB) {
        // If user is already exists user current user info to create JWT
        console.log('Git yes user');
        user = {
          _id: userDB._id,
          googleId: profile.id,
          name: name,
          firstName: given_name,
          lastName: family_name,
          email: email,
          profilePic: picture,
        };

        console.log('Git userDB : ', userDB);
      } else {
        // If user is not in our DB then create the user with the profile information
        console.log('Git no user');
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

        console.log('savedUSer : ', savedUser);
      }

      console.log('user : ', user);
      // generate user token and return
      const token = AUTH_TOOLS.generateToken(user.email, user._id);

      // return response
      // res.status(200).json({
      //   token: token,
      //   ...user,
      // });
      return done(null, { ...user, token });
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
      console.log('FACEBOOK after success things to do profile : ', profile);
      // done(null, profile);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });

      // check if user is already exists in the DB
      console.log(
        'FACEBOOK normally I would done this however, lets move on shall we?'
      );
      const { email, sub, name, given_name, family_name, picture } =
        profile._json;
      console.log('FACEBOOK email :', email ? email : 'no email');
      const userDB = await User.findOne({ email: email });
      if (userDB) {
        // If user is already exists user current user info to create JWT
        console.log('FACEBOOK yes user');
        user = {
          _id: userDB._id,
          googleId: profile.id,
          name: name,
          firstName: given_name,
          lastName: family_name,
          email: email,
          profilePic: picture,
        };

        console.log('Facebook userDB : ', userDB);
      } else {
        // If user is not in our DB then create the user with the profile information
        console.log('Facebook no user');
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

        console.log('facebook savedUSer : ', savedUser);
      }

      console.log('facebook user : ', user);
      // generate user token and return
      const token = AUTH_TOOLS.generateToken(user.email, user._id);

      // return response
      // res.status(200).json({
      //   token: token,
      //   ...user,
      // });
      return done(null, { ...user, token });
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
