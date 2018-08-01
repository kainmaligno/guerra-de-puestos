
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {

        // check if user already exists in our own db
      const currentUser = await User.findOne({googleId: profile.id})
        
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                const newUser = await new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    photo_url: profile._json.image.url,
                    birth:    new Date(),
                    password: profile._json.etag,
                    email:    profile.emails[0].value
                }).save()
                
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                }
            }
        )
    )


passport.use(
  new LocalStrategy (
    (username, password, done) => {
      User.findOne({username:username}).then((error,user) => {
        if(error){return done(error);}

        if(!user){
          return done(null, false, {message: 'Icorrect Username.'});
        }

        if(!user.validPassword(password)){
          return done(null, false, {message: 'Incorrect Password.'});
        }

        return done(null, user)
      });
    }//end function callback
  //end of LocalStrategy
//end of passport use
));
