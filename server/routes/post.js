const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const PostModel = require('../models/Post')
const ImageModel = require('../models/Image')
const ReactionModel = require('../models/Reaction')
const CommentModel = require('../models/Comment')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] || req.cookies['access_token']
    console.log('authHeader', authHeader)
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err, user)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
}


router.post('/', authenticateToken,  async (req, res, next) => {
    console.log(req.body)
    return res.json({data: req.cookies})
})

module.exports = router