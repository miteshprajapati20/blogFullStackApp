const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    firstName:{
        type:String,
        require:true,
        unique:true,
        maxLength : 50
    },
    lastName:{
        type:String,
        maxLength : 50
    },
    email:{
        type:String,
        require:true,
        unique:true,
        maxLength : 50
    },
    password:{
        type:String,
        require:true,
        
    }

})

module.exports = mongoose.model("User",UserSchema);