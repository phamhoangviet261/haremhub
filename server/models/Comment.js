const mongoose = require('mongoose')

const Schema = mongoose.Schema


const CommentsSchema = new Schema({
    postId: {
        type: String, 
        required: true,
    },
    userId: {
        type: String, 
        required: true,
    },
    userName: {
        type: String, 
        required: true,
    },
    createAt: { type: Date, default: Date.now },
    content: {
        type: String, 
        trim: true,
        required: true,
    }
})

module.exports = mongoose.model('comments', CommentsSchema)