const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/admin_panel");

const adminSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const Admin = mongoose.model("admin",adminSchema);

async function insertAdmin(){

    await Admin.create({
        name:"John",
        email:"john@test.in",
        password:"123456"
    });

    console.log("Admin Inserted Successfully");

    mongoose.connection.close();
}

insertAdmin();