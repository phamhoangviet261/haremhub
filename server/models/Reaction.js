const mongoose = require('mongoose')

const Schema = mongoose.Schema


const ReactionSchema = new Schema({
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
    type:{
        type: String,
        required: true,
        enum: {
            values: ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'],
            message: '{VALUE} is not supported'
        }
    },
    createAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('reactions', ReactionSchema)