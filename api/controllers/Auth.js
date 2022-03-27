const { validationResult } = require('express-validator/check');

const AUTH_TOOLS = require('../util/authTools');
const customError = require('../util/customError');

const User = require('../models/User');

const googleOAuth = require('../util/googleOAuth');

exports.loginWGoogle = async (req, res) => {
  console.log('!!! exports.loginWGoogle !!!');
  try {
    const code = req.body.code;
    const profile = await googleOAuth.getProfileInfo(code);
    console.log('profile : ', profile);

    // make sure profile is true-ish
    if (!profile) {
      //TODO:  handle false-ish profile case
      console.log('profile is false-ish');
    }
    let user;

    // check if user is already exists in the DB
    const userDB = await User.findOne({ email: profile.email });
    if (userDB) {
      // If user is already exists user current user info to create JWT
      user = {
        _id: userDB._id,
        googleId: profile.sub,
        name: profile.name,
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        profilePic: profile.picture,
      };

      console.log('userDB : ', userDB);
    } else {
      // If user is not in our DB then create the user with the profile information
      const newUser = new User({
        email: profile.email,
        password: '1', // generate a random password for the new user
        // fill other user details in your model with the data passed by Google
      });

      const savedUser = await newUser.save();

      user = {
        _id: savedUser._id,
        googleId: profile.sub,
        name: profile.name,
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        profilePic: profile.picture,
      };

      console.log('savedUSer : ', savedUser);
    }

    console.log('user : ', user);
    // generate user token and return
    const token = AUTH_TOOLS.generateToken(user.email, user._id);

    // return response
    res.status(200).json({
      token: token,
      ...user,
    });
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
};
