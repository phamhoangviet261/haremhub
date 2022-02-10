const express = require('express')
const router = express.Router()
const Manga = require('../models/Manga')

// @route POST api/Manga
router.post('/', async (req, res) => {
    const perPage = 24, page = Math.max(0, req.query.page)
    
    const manga = await Manga.find()        
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            name: 'asc'
        })
    const result = {
        data: manga,
        mangaPerPage: perPage,
        page: page,
        totalMangas: 1194,
        totalPage: 50
    }
    res.json(result)
})

router.post('/mangaid/:id', async (req, res) => {
    
    let manga
    try {
        manga = await Manga.findById(req.params.id).exec()
    } catch (error) {
        console.log(error);
    }
    
    res.json({success: true, data: manga})
})

router.post('/update', async (req, res) => {
    
    const u = await Manga.updateMany({},{$set:{comment: []}});
    console.log(u);
    const manga = await Manga.find().limit(2)
    res.json(manga)
})

module.exports = router