const  mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
    uName :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    }
})

const regData = new mongoose.model("regData",regSchema);

module.exports = regData;