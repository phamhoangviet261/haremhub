const express = require('express')
const router = express.Router()
const Anime = require('../models/Anime')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

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

// @route POST /api/animeid/:id
// find anime by name
router.post('/animeid/:id', async (req, res) => {
    
        
    try {
        const anime = await Anime.findById(req.params.id).exec()

        let isComment = false
        let isWishlist = false
        if(req.body.token != ""){
            const { userId } = jwt.decode(req.body.token)    
            const user = await User.findById(userId)
            
            anime.comment.forEach(item => {
                if(item.comment.idUserComment == userId){
                    isComment = true
                }
            })

            if(user.wishlist.includes(req.params.id)) isWishlist = true
        }
        
        return res.json({success: true, data: anime, isCommented: isComment, isWishlist})
    } catch (error) {
        console.log(error);
        return res.json({success: false, data: []})
    }
    
    
})


router.post('/comment', async (req, res) => {
    const { rating, content, token, id } = req.body
    const { userId } = jwt.decode(token)
    const a = await Anime.findById(id)
    
    const user = await User.findById(userId)

    
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
        let result = await Anime.updateOne({
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
    const { userId } = jwt.decode(token)

    // check data
    if(!userId || !id || !token){
        return res.json({success: false, data: {}})
    }
    
    // get user
    const user = await User.findById(userId)
    // check exist in wishlist
    const isExist = user.wishlist.includes(id)
    if(isExist){
        return res.json({success: false, data: {}, isExist})
    }
    // get list wishlist from user
    let wl = [...user.wishlist]
    // push anime/manga id to wishlist
    wl.push(id)
    // update to DB
    const result = await User.updateOne({
        _id: userId
    }, {wishlist: wl}, { upsert: true })
    
    
    return res.json({success: true, data: {}, isExist})
})


router.post('/removeFromWishlist', async (req, res) => {
    const {id, token} = req.body
    const { userId } = jwt.decode(token)

    // check data
    if(!userId || !id || !token){
        return res.json({success: false, data: {}})
    }
    
    // get user
    const user = await User.findById(userId)
    // check exist in wishlist
    const isExist = user.wishlist.includes(id)
    if(!isExist){
        return res.json({success: false, data: {}})
    }
    // get list wishlist from user
    let wl = [...user.wishlist].filter(item => item != id)
    
    // update to DB
    const result = await User.updateOne({
        _id: userId
    }, {wishlist: wl}, { upsert: true })
    
    
    return res.json({success: true, data: {}})
})

module.exports = router