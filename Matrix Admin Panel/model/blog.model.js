const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    title: String,
    author: String,
    description: String,
    coverImage: String,
    category: String,
})

module.exports = mongoose.model('blog', adminSchema);