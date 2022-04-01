// require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 8080;
const passport = require('passport');

const passportSetup = require('./controllers/Auth/passport');

// const session = require('express-session');
// const passportLocalMongoose = require('passport-local-mongoose');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');

const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

// set headers to prevent cors errors on client side
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, HEAD'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;

  res.status(status).json({ message: message });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASS}@cluster0-8gblk.mongodb.net/${process.env.MONGO_DB}`
  )
  .then((result) => {
    app.listen(process.env.PORT || port);
    console.log('listening port : ', process.env.PORT || port);
  })
  .catch((err) => {
    console.log(
      '----------------------------------Mongo Connection Error--------------------------------'
    );
    console.log('process.env.MONGO_USER : ', process.env.MONGO_USER);
    console.log('process.env.MONGO_USER_PASS : ', process.env.MONGO_USER_PASS);
    console.log('process.env.MONGO_USER_PASS : ', process.env.MONGO_DB);
    console.log(err);
  });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
