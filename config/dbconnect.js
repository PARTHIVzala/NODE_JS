const mongoose = require("mongoose")
const dbconnect= async(req,res)=>{
    await mongoose.connect("mongodb+srv://parthiv_1004:Parthiv2026@cluster0.zbxdmbb.mongodb.net/matrix")
    .then(()=>{
        console.log("database connected");
    })
    .catch((eroor)=>{console.log(eroor);
    })
} 
module.exports = dbconnect