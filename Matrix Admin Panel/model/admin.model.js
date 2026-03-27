const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    contact: String,
    profilePath: String,
})

module.exports = mongoose.model('admin', adminSchema);