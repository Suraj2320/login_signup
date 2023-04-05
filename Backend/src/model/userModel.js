const { Schema, model } = require("mongoose")
const UserSchema = new Schema({


    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    image:{
        type:String,
required:false,
    }
}, { timestamps: true });

const UserModel = model("user", UserSchema)


module.exports = UserModel