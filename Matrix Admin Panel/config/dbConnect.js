const mongoose = require('mongoose');

async function dbConnect(){
    try {
        await mongoose.connect("mongodb+srv://parthiv_1004:Parthiv123@cluster0.zbxdmbb.mongodb.net/matrixAdmin");
        console.log("Database Connected");
    } catch (error) {
        console.log("Error:", error.message);
    }
}

module.exports = dbConnect;