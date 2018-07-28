const mongoose = require("mongoose");
const {Schema}  = mongoose;

const reviewSchema = new Schema({
    user_id:        { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    foodStand_id:   { type: Schema.Types.ObjectId, ref: 'FoodStand', required: true },
    review:         { type: String, required: true }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;