const mongoose = require('mongoose')

const Schema = mongoose.Schema


const PostSchema = new Schema({
    userId:{
        type: String, 
        required: true, 
        index: true,
        unique: true
    },
    updated: { type: Date, default: Date.now },
    content: {
        type: String, required: true, trim: true
    },
    images: {
        type: Array,
    }, 
    reactions: {
        type: Array,
    },
    comments: {
        type: Array
    }
})

PostSchema.pre('save', () => console.log('Saving post...'))

module.exports = mongoose.model('posts', PostSchema)

