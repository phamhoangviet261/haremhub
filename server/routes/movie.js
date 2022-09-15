const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

function convertViToEn(str, toUpperCase = false) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

    return toUpperCase ? str.toUpperCase() : str;
}
router.get('/', async (req, res, next) => {
    try {
        let {page, limit} = req.query;
        if(page < 0 || page > 100) page = 1;
        if(limit < 0 || limit > 100) limit = 20;
        const movies = await Movie.find({}).skip(page ? (page-1) * (limit ? limit : 20) + 23 : 1 + 23).limit(limit ? limit : 20);    
        // const movies = await Movie.find({})   

        // const movieGenres = new Set()
        // for (let i = 0; i < fakeMovies.length; i++){
        //     for(let j = 0; j < fakeMovies[i].category.length; j++){
        //         movieGenres.add(fakeMovies[i].category[j].name);
        //     }
        // }
        // movies.forEach(item => {
        //     item.category.map(cat => movieGenres.add(cat.name))
        // })
        
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

router.post('/search', async (req, res, next) => {
    try {
        let searchText = decodeURI(req.body.value);
        console.log("searchText ", searchText)
        searchText = convertViToEn(searchText);
        const movies = await Movie.find({})
        let fakeMovies = JSON.parse(JSON.stringify(movies));
        let result = [];
        for (let i = 0; i < fakeMovies.length; i++){   
            console.log("i => ", i)         
            if(fakeMovies[i].unsigned_name.includes(searchText)){
                result.push(fakeMovies[i]);
            }
        }
        
        if(result.length > 0) return res.status(200).json({success: true, data: result});

        return res.status(200).json({success: false, data: movies});
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