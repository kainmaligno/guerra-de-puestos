const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });
router.get('/',(req,res) => {
  res.render('home');
})
//auth login
router.get('/login', (req, res) => {
  res.render('login', {
    user: req.user
  });
});

//auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]
}));

//callback route for google redirect to
//hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

//passport authenticate local strategy

//signup
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

//signup POST
router.post('/signup', passport.authenticate('localStrategy'), (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    birth,
    gender,
    password
  } = req.body;
  //no link or url added yet of a picture
  if (username === "" || password === "") {
    res.render('/auth/signup', {
      message: 'The Indicate username and password'
    });
    return;
  }

  User.findOne({
    username
  }, "username", (error, user) => {
    if (user !== null) {
      res.render('/auth/signup', {
        message: 'The user already exists'
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      firstName,
      lastName,
      email,
      birth,
      gender
    });

    newUser.save((error) => {
      if (error) {
        res.render('/auth/signup', {
          message: 'Something went wrong'
        })
      } else {
        res.redirect("/");
      }
    })
  })
})

module.exports = router;
