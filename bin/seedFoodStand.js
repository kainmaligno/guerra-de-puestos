const mongoose      = require('mongoose');
const FoodStand     = require('../models/foodStand');

const dbName = require('../package.json').name;
mongoose.connect(`mongodb://localhost/${dbName}`);

let location = {
    type: 'Point',
    coordinates: [-99.1695243, 19.4201223]
};

const foodStands = [
    {
        name:           "Muerte lenta",
        description:    "Tacos super grasosos",
        category:       "Tacos",
        location:       location
    },
    {
        name:           "Lady Queca",
        description:    "Quesadillas de primera",
        category:       "Quesadillas",
        location:       location
    }
  ];
  
FoodStand.create(foodStands, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${foodStands.length} food stands`)
    mongoose.connection.close()
});