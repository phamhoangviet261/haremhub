const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie')
const Category = require('../models/Category')

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
        if(page < 0 || page > 204) page = 1;
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
        
        // let fakeMovies = JSON.parse(JSON.stringify(movies));
        // for (let i = 0; i < fakeMovies.length; i++){
        //     console.log(i, " >> ", i, fakeMovies[i].name);
        //     let newName = convertViToEn(fakeMovies[i].name) + ' ' + convertViToEn(fakeMovies[i].origin_name);
        //     await Movie.findOneAndUpdate({id: fakeMovies[i].id}, {unsigned_name: newName})
        // }
        
        return res.status(200).json({success: true, page: page ? page : 1, limitPerPage: limit ? limit : 20, totalAnime: 17568, 
            totalPage: 879, data: movies});

    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.get('/:slug', async (req, res, next) => {
    try {
        const movie = await Movie.findOne({slug: req.params.slug});
        let fakemovie = JSON.parse(JSON.stringify(movie));
        if(movie) {
            fakemovie.score = 10;
            return res.status(200).json({success: true, data: fakemovie});
        }
        return res.status(200).json({success: false, data: []});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.get('/category/split-slug', async (req, res, next) => {
    try {
        
        const movies = await Movie.find({});        

        // for(let i = 0; i < movieGenres.length; i++) {
        //     let idGen = Math.floor(100000000 + Math.random() * 900000000);
        //     let newCategory = new Category({
        //         id: 'cat-'+idGen,
        //         name: movieGenres[i],
        //         slug: '/movie/category/'+convertViToEn(movieGenres[i].toLocaleLowerCase().split(' ').join('-')),
        //         movies: []
        //     })
        //     await newCategory.save();
        // }

        let cate = {
            "tam-ly": [],
            "tai-lieu": [],
            "hanh-dong": [],
            "phieu-luu": [],
            "tinh-cam": [],
            "chinh-kich": [],
            "bi-an": [],
            "vien-tuong": [],
            "hai-huoc": [],
            "co-trang": [],
            "kinh-di": [],
            "hoc-duong": [],
            "hinh-su": [],
            "chien-tranh": [],
            "am-nhac": [],
            "gia-dinh": [],
            "khoa-hoc": [],
            "vo-thuat": [],
            "than-thoai": [],
            "the-thao": [],
            "phim-18+": [],
            "kinh-dien": []
        };

        // movieGenres.forEach(item => {
        //     const convertSlug = convertViToEn(item.toLocaleLowerCase().split(' ').join('-'));
        //     console.log(convertSlug)
        //     cate[`${convertSlug}`] = []
        // })

        for(let i = 0; i < movies.length; i++) {
           
            for(let j = 0; j < movies[i].category.length; j++) {
                if(movies[i].category[j].name){
                    console.log(i, " > ", movies[i].slug)
                    let convertSlug = convertViToEn(movies[i].category[j].name.trim().toLocaleLowerCase().split(' ').join('-'));
                    cate[`${convertSlug}`].push({id: movies[i]._id, slug: movies[i].slug})
                }
                
            }
        }
        return res.status(200).json({success: true, data: cate});
    } catch (errors) {
        console.log(errors);
        return res.status(400).json({success: false, message: errors.message});
    }
});

router.get('/category/:slug', async (req, res, next) => {
    try {     
        const slug = req.params.slug;
        let {page, limit} = req.query;
        if(!page || page < 0 ) page = 1;
        if(!limit || limit < 0 || limit > 60) limit = 20;
        
        if(!slug) return res.status(400).json({success: false, message: '', data: []});
        
        const categories = await Category.findOne({slug: `/movie/category/${slug}`});

        if(!categories) return res.status(400).json({success: false, message: '', data: [], slug});

        const fakeCate = JSON.parse(JSON.stringify(categories));
        let listMovieIds = fakeCate.movies;
        const movieIdsCut = listMovieIds.slice(limit*(page-1), limit*page);

        let movies = [];
        for(let i = 0; i < movieIdsCut.length; i++) {
            let movie = await Movie.findOne({slug: `${movieIdsCut[i].slug}`});
            movies.push(movie)
        }

        return res.status(200).json({success: true, page, limit, data: movies, slug, genre: categories.name, totalPage: Math.round(listMovieIds.length/limit)});
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
            if(fakeMovies[i]?.unsigned_name.includes(searchText)){
                result.push(fakeMovies[i]);
                console.log("i => ", i, " ", fakeMovies[i].slug)                      
            }
            // let newName = convertViToEn(fakeMovies[i].name) + " " + convertViToEn(fakeMovies[i].origin_name)
            // await Movie.findOneAndUpdate({_id: fakeMovies[i]._id}, {unsigned_name: newName})
            // console.log(i, " => ", newName)    
            
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