const mongoose = require("mongoose");
const {Schema}  = mongoose;

const reviewSchema = new Schema({
    user_id:        { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    foodStand_id:   { type: Schema.Types.ObjectId, ref: 'FoodStand', required: true },
    review:         { type: String, required: true },
    deathLevel:     { type: Number, min: 0, max: 5 },
    spicy:          { type: Number, min: 0, max: 5 },
    pricy:          { type: Number, min: 0, max: 5 },
    fatty:          { type: Number, min: 0, max: 5 },
    fully:          { type: Number, min: 0, max: 5 },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;