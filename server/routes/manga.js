const express = require('express')
const router = express.Router()
const Manga = require('../models/Manga')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

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
    
    try {
        const anime = await Manga.findById(req.params.id).exec()

        let isComment = false
        if(req.body.token != ""){
            const { userId } = jwt.decode(req.body.token)    
            const user = await User.findById(userId)
            
            anime.comment.forEach(item => {
                if(item.comment.idUserComment == userId){
                    isComment = true
                }
            })
        }
        
        return res.json({success: true, data: anime, isCommented: isComment})
    } catch (error) {
        console.log(error);
        return res.json({success: false, data: []})
    }
})

router.post('/comment', async (req, res) => {
    const { rating, content, token, id } = req.body
    const { userId } = jwt.decode(token)
    const a = await Manga.findById(id)
    
    const user = await User.findById(userId)

    console.log("content", content);
    const comment = {
        "idUserComment": user._id,
        "nameUserComment": user.firstname+user.lastname,
        "content": content,
        "createAt": new Date()
    }
    const data = {
        "rating": rating,
        comment
    }
    try {        
        let avgRating = a.avgRating
        let quantityRatingBefor = a.comment.length
        let avgRatingAfter = ((quantityRatingBefor * avgRating) + rating)/(quantityRatingBefor + 1)
        console.log("avgRatingAfter", avgRatingAfter);
        
        a.comment.push(data)
        let result = await Manga.updateOne({
            _id: id
        }, { comment: a.comment, avgRating: avgRatingAfter }, { upsert: true });
        if(result.acknowledged)
            return res.json({success: true})
        else return res.json({success: false})
    } catch (error) {
        console.log(error)
        return res.json({success: false})
    }
    
})

router.post('/addToWishlist', async (req, res) => {
    const {id, token} = req.body
    return res.json({id, token})
})

module.exports = router