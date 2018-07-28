const mongoose = require("mongoose");
const {Schema}  = mongoose;

const reviewSchema = new Schema({
    user_id:        {type: Schema.Types.ObjectId, ref: 'User_id', required: true}, 
    foodStand_id:   {type: Schema.Types.ObjectId, ref: 'FoodStand_id', required: true},
    review:         String
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;