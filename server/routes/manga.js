const express = require('express')
const router = express.Router()
const Manga = require('../models/Manga')

// @route POST api/Manga
router.post('/', async (req, res) => {
    const perPage = 24, page = Math.max(0, req.query.page)
    
    const anime = await Manga.find()        
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            name: 'asc'
        })
    const result = {
        data: anime,
        mangaPerPage: perPage,
        page: page,
        totalMangas: 1194
    }
    res.json(result)
})

router.post('/mangaid/:id', async (req, res) => {
    console.log("id", req.params.id);
    let anime
    try {
        anime = await Manga.findById(req.params.id).exec()
    } catch (error) {
        console.log(error);
    }
    console.log(anime);
    res.json(anime)
})

module.exports = router