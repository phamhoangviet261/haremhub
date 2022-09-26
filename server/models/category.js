const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    slug: {
        type: String
    },
    movies: {
        type: Array
    }
}, { timestamps: true })

module.exports = mongoose.model('categories', CategorySchema)
