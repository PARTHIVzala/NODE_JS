const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(
        "mongodb+srv://parthiv_1004:Parthiv2026@cluster0.zbxdmbb.mongodb.net/"
    )
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log(err));
};

module.exports = dbConnect;