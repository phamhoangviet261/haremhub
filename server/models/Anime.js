const mongoose = require('mongoose')

const Schema = mongoose.Schema

let mock = {
    "urls": {
        "en": [],
        "vi": [],
        "raw": []
    },
    "titles": [
        "Kimi no Na wa.",
        "Tên cậu là clgt",
        ""
    ],
    "genres": [
        "romance",
        "comedy",
        "gender bender",
        "school life"
    ],
    "tags": [
        "body swap",
        "bickering love",
        "older female younger male"
    ],
    "staff": [],
    "coverArt": [
        "https://i.imgur.com/ouPLQyN.jpg"
    ],
    "_id": "aa98e7bf-f9f7-488f-a90d-3593effd1f0b",
    "description": "",
    "status": "completed",
    "type": "anime",
    "score": 90,
    "zennomi": {
        "isMyProject": false,
        "review": ""
    },
    "updatedAt": "2022-02-05T16:43:48.640Z",
    "__v": 2,
    "name": "Kimi no Na wa.",
    "altTitle": "Tên cậu là clgt",
    "links": {
        "en": [],
        "vi": [
            {
                "link": "https://www.google.com/search?q=xem anime Kimi%20no%20Na%20wa. vietsub",
                "site": "GOOGLE-SENSEI"
            }
        ],
        "raw": []
    },
    "id": "aa98e7bf-f9f7-488f-a90d-3593effd1f0b"
}

const AnimeSchema = new Schema({
    urls: {
        type: Object,
        required: true
    },
    titles: {
        type: Array,
        required: true
    },
    genres: {
        type: Array,
        required: true
    },
    tags: {
        type: Array        
    },
    staff: {
        type: Array,
        required: true
    },
    coverArt: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    zenomi: {
        type: Object,        
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    updateat: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    },
    altTitle: {
        type: String        
    },
    link: {
        type: Object
    },
    _id: {
        type: String
    }
})

module.exports = mongoose.model('animes', AnimeSchema)
