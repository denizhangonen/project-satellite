const express = require('express');

const { body } = require('express-validator/check');

const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/Auth/Auth');

const CLIENT_URL = 'http://localhost:3000/dashboard';
const FAIL_URL = '/login/failed';
const SUCCESS_URL = 'http://localhost:3000/login';

router.post(
  '/login-with-google',
  (req, res, next) => {
    console.log('we have got a req!!!');
    next();
  },
  authController.loginWGoogle
);

router.get(
  '/passport-google',
  (req, res, next) => {
    console.log('/passport-google');
    next();
  },
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
);

router.get(
  '/google/callback',
  (req, res, next) => {
    console.log('/google/callback');
    next();
  },
  passport.authenticate('google', {
    session: false,
    // successRedirect: SUCCESS_URL,
  }),
  (req, res, next) => {
    console.log('hop last stop? req:', req.user);
    const { token, email, name, profilePic } = req.user;
    // res.redirect(SUCCESS_URL);

    const htmlWithEmbeddedJWT = `
    <html>
      <script>
        // Save JWT to localStorage
        window.localStorage.setItem('JWT', '${req.user}');
        // Redirect browser to root of application
        window.location.href = '${SUCCESS_URL}?token=${token}&email=${email}&name=${name}&profilePicture=${profilePic}';
      </script>
    </html>
    `;

    res.send(htmlWithEmbeddedJWT);
    // res.json({
    //   message: 'Signup successful',
    //   user: req.user,
    // });
  }
);

router.get(
  '/passport-github',
  (req, res, next) => {
    console.log('/passport-github');
    next();
  },
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);

router.get(
  '/github/callback',
  (req, res, next) => {
    console.log('/github/callback');
    next();
  },
  passport.authenticate('github', {
    session: false,
    // successRedirect: SUCCESS_URL,
  }),
  (req, res, next) => {
    console.log('Git hop last stop? req:', req.user);
    const { token, email, name, profilePic } = req.user;
    // res.redirect(SUCCESS_URL);

    const htmlWithEmbeddedJWT = `
    <html>
      <script>
        // Save JWT to localStorage
        window.localStorage.setItem('JWT', '${req.user}');
        // Redirect browser to root of application
        window.location.href = '${SUCCESS_URL}?token=${token}&email=${email}&name=${name}&profilePicture=${profilePic}';
      </script>
    </html>
    `;

    res.send(htmlWithEmbeddedJWT);
    // res.json({
    //   message: 'Signup successful',
    //   user: req.user,
    // });
  }
);

router.get(
  '/passport-facebook',
  (req, res, next) => {
    console.log('/passport-facebook');
    next();
  },
  passport.authenticate('facebook', {
    scope: ['user_friends', 'manage_pages'],
  })
);

router.get(
  '/facebook/callback',
  (req, res, next) => {
    console.log('/facebook/callback');
    next();
  },
  passport.authenticate('facebook', {
    session: false,
    // successRedirect: SUCCESS_URL,
  }),
  (req, res, next) => {
    console.log('facebook hop last stop? req.user:', req.user);
    const { token, email, name, profilePic } = req.user;
    // res.redirect(SUCCESS_URL);

    const htmlWithEmbeddedJWT = `
    <html>
      <script>
        // Save JWT to localStorage
        window.localStorage.setItem('JWT', '${req.user}');
        // Redirect browser to root of application
        window.location.href = '${SUCCESS_URL}?token=${token}&email=${email}&name=${name}&profilePicture=${profilePic}';
      </script>
    </html>
    `;

    res.send(htmlWithEmbeddedJWT);
    // res.json({
    //   message: 'Signup successful',
    //   user: req.user,
    // });
  }
);

router.get(SUCCESS_URL, (req, res, next) => {
  console.log('success url');
  if (req.user) {
    res
      .status(200)
      .json({ success: true, message: 'LOGIN SUCCESSFUL', user: req.user });
  }
});

router.get(FAIL_URL, (req, res, next) => {
  console.log('fail url');
  res.status(401).json({ success: false, message: 'OPPS FAILED' });
});

module.exports = router;
