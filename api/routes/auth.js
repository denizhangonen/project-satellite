const express = require('express');

const { body } = require('express-validator/check');

const router = express.Router();

const authController = require('../controllers/Auth');

router.post(
  '/login-with-google',
  (req, res, next) => {
    console.log('we have got a req!!!');
    next();
  },
  authController.loginWGoogle
);

module.exports = router;
