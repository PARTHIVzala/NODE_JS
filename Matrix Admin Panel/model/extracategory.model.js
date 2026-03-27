const mongoose = require('mongoose');

const extraCategorySchema = mongoose.Schema({
    scid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    }, // subcategory id
    ecname: String, // extracategory name
    extraCategoryCover: String,
})

module.exports = mongoose.model('extracategory', extraCategorySchema);