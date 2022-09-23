const express = require('express')
const router = express.Router()
const Anime = require('../models/anime')
const Manga = require('../models/manga')

router.post('/byName', async (req, res) => {
    const name = decodeURI(req.body.value)
    console.log("Search content: ", decodeURI(name));
    const animes = await Anime.find({name: {$regex: name, $options: 'i'}}).exec()
    const mangas = await Manga.find({name: {$regex: name, $options: 'i'}}).exec()
    res.json({data: [...animes, ...mangas], totalPage: 1})
});

router.get('/tags', async (req, res) => {
    const anime = await Anime.find({}).select('tags')
    const t = []
    for(let i = 0; i < anime.length; i++){        
        for(let j = 0; j < anime[i].tags.length; j++){
            t.push(anime[i].tags[j])
        }
    }
    const tags = [...new Set(t)]
    return res.json({tags})
});

router.get('/genres', async (req, res) => {
    const anime = await Anime.find({}).select('genres')
    const t = []
    for(let i = 0; i < anime.length; i++){        
        for(let j = 0; j < anime[i].genres.length; j++){
            t.push(anime[i].genres[j])
        }
    }
    const genres = [...new Set(t)]
    return res.json({genres})
});

router.get('/404', async (req, res, next) => {
    try {
        console.log('errors')
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

module.exports = router