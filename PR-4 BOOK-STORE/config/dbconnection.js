const mongoose = require('mongoose');
const dbconnect = () => {
    mongoose.connect("mongodb://localhost:27017/Node-PR")
        .then(() => console.log('DB is Connected !!'))
        .catch((err) => console.log(err))
}
module.exports = dbconnect;