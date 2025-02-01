const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fristName:{
        type:String
    },

    lastName:{
        type:String
    },

    emailId:{
        type:String
    },

    password:{
        type:String
    },

    age:{
        type:Number
    },

    gender:{
        type:String
    }
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;