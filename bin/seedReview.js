const mongoose  = require('mongoose');
const User          = require('../models/user');
const FoodStand     = require('../models/foodStand');
const Review    = require('../models/review');

const dbName = require('../package.json').name;
mongoose.connect(`mongodb://localhost/${dbName}`);

User.find()
    .then( user =>{
        const users = user;
        FoodStand.find()
            .then( food =>{
                const foodStands = food;
                const reviews = [
                    {
                        user_id:        users[0]._id, 
                        foodStand_id:   foodStands[0]._id,
                        review:         "Muy buenos tacos, super grasosos",
                        deathLevel:     4,
                        spicy:          4,
                        pricy:          4,
                        fatty:          4,
                        fully:          4
                    },
                    {
                        user_id:        users[1]._id, 
                        foodStand_id:   foodStands[0]._id,
                        review:         "Me han hecho daño estos tacos, pero no puedo dejar de comerlos. Los recomiendo si quieren sufrir muerte lenta, jajaja...",
                        deathLevel:     4,
                        spicy:          4,
                        pricy:          4,
                        fatty:          4,
                        fully:          4
                    },
                    {
                        user_id:        users[0]._id, 
                        foodStand_id:   foodStands[1]._id,
                        review:         "Muy nice todo aqui, las quesadillas son comunes, nada especial",
                        deathLevel:     4,
                        spicy:          4,
                        pricy:          4,
                        fatty:          4,
                        fully:          4
                    },
                    {
                        user_id:        users[0]._id, 
                        foodStand_id:   foodStands[1]._id,
                        review:         "Unas quesadillas de otro nivel :) Recomendadas 100%",
                        deathLevel:     4,
                        spicy:          4,
                        pricy:          4,
                        fatty:          4,
                        fully:          4
                    }
                ];
                Review.create(reviews, (err) => {
                    if (err) { throw(err) }
                    console.log(`Created ${reviews.length} reviews`)
                    mongoose.connection.close()
                });
            })
            .catch(err => {
                console.log(err);
            })
    })
    .catch(err => {
        console.log(err);
    });