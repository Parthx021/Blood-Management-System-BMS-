const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/projectRegistration",{

}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(`no connection`);
} )