const mongoose = require('mongoose');

require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("database connected successfully")
    })
    .catch((error)=>{
       console.log("connection error");
       process.exit(1);
    })

} 

module.exports = dbConnect;
