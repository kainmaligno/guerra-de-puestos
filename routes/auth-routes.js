const express = require('express');
const router  = express.Router();
const passport = require('passport');

/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

//auth login
router.get('/login', (req,res)=>{
  res.render('login', {user: req.user});
});

//auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

//callback route for google redirect to
//hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'),(req,res) => {
  res.redirect('/profile');
});
module.exports = router;
