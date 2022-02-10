const mongoose = require('mongoose')

const Schema = mongoose.Schema

let mock = {
    "urls": {
        "en": [
            "https://myanimelist.net/manga/141784",
            "https://mangadex.org/title/e76f1a4f-d21a-4f50-9472-45737f7f1480"
        ],
        "vi": [
            "https://blogtruyen.vn/28853/kokoro-no-program"
        ],
        "raw": [
            "https://shonenjumpplus.com/episode/3269754496567812827"
        ]
    },
    "titles": [
        "Kokoro no Program",
        "",
        "",
        "ココロのプログラム",
        "Heart's Program",
        "Program of the Heart"
    ],
    "genres": [
        "romance",
        "drama",
        "school life",
        "slice of life",
        "shounen"
    ],
    "tags": [],
    "staff": [
        "Nakamura Hinata"
    ],
    "coverArt": [
        "https://uploads.mangadex.org/covers/e76f1a4f-d21a-4f50-9472-45737f7f1480/e59c65fe-074f-4b23-86b7-ff5893e165be.jpg"
    ],
    "_id": "e76f1a4f-d21a-4f50-9472-45737f7f1480",
    "type": "manga",
    "zennomi": {
        "status": "reading",
        "review": "",
        "isMyProject": false
    },
    "description": "<p>An elemantary schooler, Usami Kyuu encounter Ichiko, a female robot trying to learn about [heart]. What awaits the two that start to live together… Boy X Robot Girl, Begin!</p>",
    "originalLanguage": "ja",
    "status": "ongoing",
    "score": 100,
    "updatedAt": "2022-02-05T16:43:48.640Z",
    "__v": 2,
    "year": 2021,
    "isLisensed": false,
    "name": "Kokoro no Program",
    "altTitle": "ココロのプログラム",
    "links": {
        "en": [
            {
                "link": "https://myanimelist.net/manga/141784",
                "site": "MYANIMELIST.NET"
            },
            {
                "link": "https://mangadex.org/title/e76f1a4f-d21a-4f50-9472-45737f7f1480",
                "site": "MANGADEX.ORG"
            }
        ],
        "vi": [
            {
                "link": "https://blogtruyen.vn/28853/kokoro-no-program",
                "site": "BLOGTRUYEN.VN"
            },
            {
                "link": "https://www.google.com/search?q=đọc manga Kokoro%20no%20Program blogtruyen.vn",
                "site": "GOOGLE-SENSEI"
            }
        ],
        "raw": [
            {
                "link": "https://shonenjumpplus.com/episode/3269754496567812827",
                "site": "SHONENJUMPPLUS.COM"
            }
        ]
    },
    "id": "e76f1a4f-d21a-4f50-9472-45737f7f1480"
}

const MangaSchema = new Schema({
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
    originalLanguage: {
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
    year: {
        type: Number,
        required: true
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
    },
    avgRating: {
        type: Number
    },
    comment: {
        type: Array
    }
})

module.exports = mongoose.model('mangas', MangaSchema)