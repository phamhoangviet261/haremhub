const express = require('express')
const router = express.Router()
const Anime = require('../models/Anime')

// @route POST api/Manga
// get anime by page
router.post('/', async (req, res) => {
    const perPage = 20, page = Math.max(0, req.query.page)
    
    const anime = await Anime.find()        
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            name: 'asc'
        })
    const result = {
        data: anime,
        animePerPage: perPage,
        page: page,
        totalAnime: 47, 
        totalPage: 3
    }
    res.json(result)
})

router.post('/animeid/:id', async (req, res) => {
    console.log("id", req.params.id);
    let anime
    try {
        anime = await Anime.findById(req.params.id).exec()
    } catch (error) {
        console.log(error);
    }
    
    res.json(anime)
})

module.exports = router