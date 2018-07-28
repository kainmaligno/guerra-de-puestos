const mongoose = require("mongoose");
const {Schema}  = mongoose;
require('mongoose-type-url');

const userSchema = new Schema({
    username:   String,
    firstName:  String,
    lastName:   String,
    email:      String,
    birth:      Date,
    gender: {
        type: String,
        enum : ['Male', 'Female', 'N/A'],
        default : 'N/A'
    },
    photo_url:  {type: mongoose.SchemaTypes.Url},
    password:   String
    }, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;