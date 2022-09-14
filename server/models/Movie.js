const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MovieSchema = new Schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    origin_name: {
        type: String,
    },
    content: {
        type: String,
    },
    type: {
        type: String,
    },
    status: {
        type: String,
    },
    thumb_url: {
        type: String,
    },
    poster_url: {
        type: String,
    },
    is_copyright: {
        type: String,
    },
    sub_docquyen: {
        type: String,
    },
    chieurap: {
        type: Boolean,
    },
    trailer_url: {
        type: String,
    },
    time: {
        type: String,
    },
    episode_current: {
        type: String,
    },
    episode_total: {
        type: String,
    },
    quality: {
        type: String,
    },
    lang: {
        type: String,
    },
    notify: {
        type: String,
    },
    showtimes: {
        type: String,
    },
    slug: {
        type: String,
    },
    year: {
        type: Number,
    },
    actor: {
        type: Array,
    },
    director: {
        type: Array,
    },
    category: {
        type: Array,
    },
    country: {
        type: Array,
    },
    episodes: {
        type: Array,
    },
}, { timestamps: true })

module.exports = mongoose.model('movies', MovieSchema)