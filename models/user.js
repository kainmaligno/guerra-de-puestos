const mongoose  = require("mongoose");
const {Schema}  = mongoose;
const validator = require("validator");
require('mongoose-type-url');

const userSchema = new Schema({
    username:   { type: String, required: true },
    firstName:  String,
    lastName:   String,
    googleId:   String,
    thumbnail:  String,
    email:      { type: String, validate: {
                                    validator:  validator.isEmail,
                                    message:    '{VALUE} no es un email válido',
                                    isAsync:    false
                                } 
            },
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

const User = mongoose.model("User", userSchema);

module.exports = User;
