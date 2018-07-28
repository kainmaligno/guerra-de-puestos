const mongoose      = require('mongoose');
const User          = require('../models/user');
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;
const password      = "admin";
const salt          = bcrypt.genSaltSync(bcryptSalt);
const hashPass      = bcrypt.hashSync(password, salt);

const dbName = require('./package.json').name;
mongoose.connect(`mongodb://localhost/${dbName}`);

const users = [
    {
        username:   "Maligno",
        firstName:  "Emma",
        lastName:   "Nuel",
        email:      "emma@hotmail.com",
        birth:      new Date("01/01/1985"),
        gender:     "Hombre",
        photo_url:  "https://vignette.wikia.nocookie.net/devilmaycry/images/9/93/DMC-Dantes.png/revision/latest?cb=20130729203537",
        password: hashPass
    },
    {
        username:   "Huguin",
        firstName:  "Hugo",
        lastName:   "Iván",
        email:      "hugo@hotmail.com",
        birth:      new Date("01/01/1988"),
        gender:     "Hombre",
        photo_url:  "https://vignette.wikia.nocookie.net/zelda/images/9/9d/Link_Artwork_1_%28Twilight_Princess%29.png/revision/latest?cb=20160110211830",
        password: hashPass
        }
  ];
  
User.create(users, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${users.length} users`)
    mongoose.connection.close()
});