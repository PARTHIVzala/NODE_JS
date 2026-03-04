const mongoose = require('mongoose');

const dbconnect = () => {
    mongoose.connect("mongodb+srv://parthiv_1004:Parthiv2026@cluster0.zbxdmbb.mongodb.net/?appName=Cluster0")
        .then(() => console.log('DB is Connected !!'))
        .catch((err) => console.log(err))
}

module.exports = dbconnect;