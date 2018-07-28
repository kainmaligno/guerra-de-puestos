require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require('passport');
const cookieSession= require('cookie-session');
const authRoutes   = require('./routes/auth-routes');
const profileRoutes= require('./routes/profile-routes');
const passportSetup= require('./config/passport-setup');
const keys         = require('./config/keys');
const app = express();
const dbName = require('./package.json').name;

mongoose.Promise = Promise;
mongoose
  .connect(`mongodb://localhost/${dbName}`, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//set up session cookies
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes prefix
app.use('auth/', authRoutes);
app.use('/profile',profileRoutes);

//create home route
app.use('/',(req, res) => {
  res.render('home', {user: req.user});
})

// default value for title local
app.locals.title = 'Express - Guerra de Puestos!';



const index = require('./routes/index');
app.use('/', index);


module.exports = app;
