const express = require('express')
const router = express.Router()
const Anime = require('../models/Anime')
const Manga = require('../models/Manga')

router.post('/byName', async (req, res) => {
    const name = decodeURI(req.body.value)
    console.log("name", decodeURI(name));
    const animes = await Anime.find({name: {$regex: name, $options: 'i'}}).exec()
    const mangas = await Manga.find({name: {$regex: name, $options: 'i'}}).exec()
    res.json({data: [...animes, ...mangas], totalPage: 1})
})

module.exports = router