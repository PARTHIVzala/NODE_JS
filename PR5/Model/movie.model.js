const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    name : String ,
    director : {
        type : String,
    },
    genre:{
        type: String
    },
    year:{
        type : Number
    },
    rating:{
        type : Number   
    },
    image:{
        type : String
    }
})

module.exports = mongoose.model('Movies', movieSchema);