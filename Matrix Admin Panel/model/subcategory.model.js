const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }, // category id
    scname: String, // subcategory name
    categoryCover: String,  
})

module.exports = mongoose.model('subcategory', subCategorySchema);