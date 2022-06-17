const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = new Schema({
    name: String,
    desc: String,
    userId: {
        type: String, 
        // required: true, 
    },
    postid: {
        type: String, 
        // required: true, 
    },
    img: {
        data: Buffer,
        contentType: String,
    },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('images', ImageSchema)