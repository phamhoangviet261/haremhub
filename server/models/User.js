const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    firstname: {
        type: String, 
        required: true,
    },
    lastname: {
        type: String, 
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    wishlist: {
        type: Array
    }
})

module.exports = mongoose.model('users', UserSchema)