const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        let {page, limit} = req.query;
        if(page < 0 || page > 100) page = 1;
        if(limit < 0 || limit > 100) limit = 20;
        const movies = await Movie.find({}).skip(page ? (page-1) * (limit ? limit : 20) + 23 : 1 + 23).limit(limit ? limit : 20);        
        return res.status(200).json({success: true, page: page ? page : 1, limitPerPage: limit ? limit : 20, totalAnime: 4062, 
            totalPage: 204, data: movies});

    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.get('/:slug', async (req, res, next) => {
    try {
        const movie = await Movie.findOne({slug: req.params.slug});
        let fakemovie = JSON.parse(JSON.stringify(movie));
        fakemovie.score = 10;
        return res.status(200).json({success: true, data: fakemovie});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.get('/category/:slug', async (req, res, next) => {
    try {
        let option = '';
        switch (req.params.slug) {
            case 'animes':
                option = 'hoathinh'
                break;
        
            default:
                break;
        }
        let {page, limit} = req.query;
        if(page < 0 || page > 100 || page == undefined) page = 1;
        if(limit < 0 || limit > 100) limit = 20;
        const movies = await Movie.find({type: option}).skip(page ? (page-1) * (limit ? limit : 20) + 23 : 1 + 23).limit(limit ? limit : 20);
        // const movies = await Movie.find({});
        // for(let i = 0; i < movies.length; i++) {
        //     console.log("_> ", i);
        //     await Movie.findOneAndUpdate({_id: movies[i]._id}, {id: `movie-${uuidv4()}`});
        // }
        return res.status(200).json({success: true, page: page, limitPerPage: limit ? limit : 20, data: movies});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
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