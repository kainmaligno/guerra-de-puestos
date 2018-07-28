const mongoose  = require('mongoose');
const Review    = require('../models/review');

const dbName = require('../package.json').name;
mongoose.connect(`mongodb://localhost/${dbName}`);

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