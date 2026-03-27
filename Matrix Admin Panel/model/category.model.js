const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    cname: String,
    categoryCover: String,
})

module.exports = mongoose.model('category', categorySchema);