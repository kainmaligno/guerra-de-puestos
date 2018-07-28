const mongoose = require("mongoose");
const {Schema}  = mongoose;
require('mongoose-type-url');

const userSchema = new Schema({
    username:   { type: String, required: true },
    firstName:  String,
    lastName:   String,
    googleId:   String,
    thumbnail:  String,
    email:      { type: String, validate: [isMail, 'Email inválido'] },
    birth:      { type: Date, required: true },
    gender: {
        type: String,
        enum : ['Hombre', 'Mujer', 'N/A'],
        default : 'N/A'
    },
    photo_url:  { type: mongoose.SchemaTypes.Url },
    password:   { type: String, required: true, select: false }
    }, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

function isMail (mail) {
    return (!mail.includes("@"));
};

const User = mongoose.model("User", userSchema);

module.exports = User;
