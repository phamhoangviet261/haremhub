const express = require('express')
const router = express.Router()
const fs = require('fs');


const axios = require('axios');
router.get('/phim-moi-cap-nhat/:page', async (req, res) => {
    let final = [];
    const pageCurrent = parseInt(req.params.page);
    const pageMax = pageCurrent-55;
    let isBreak = false;
    for(let index = pageCurrent; index > pageMax; index--){
        console.log(`CRAWL FROM: https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${index}/${pageMax}`);
        const data = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${index}`);
        const fakeData = JSON.parse(JSON.stringify(data.data));    
        for(let i = 0; i < fakeData.items.length; i++) {
            try {
                console.log(`> ${i} `, fakeData.items[i].slug);  
                let temp = await axios.get(`https://ophim1.com/phim/${fakeData.items[i].slug}`);
                if(temp.data.movie._id == '62cd1dd8a862e5da38370e15'){
                    isBreak = true;
                    break;
                }
                let obj = {
                    ...temp.data.movie, episodes: temp.data.episodes
                }
                delete obj._id;
                delete obj.modified;
                final.push(obj);
            } catch (errors) {
                console.log("ERROR: ", errors);
            }
        }
        if(isBreak){
            break;
        }
    }


    let date = new Date();
    let name = date.getTime();
    fs.writeFile (`crawl-${pageCurrent}-${pageMax-1}-${name}.json`, JSON.stringify(final), function(err) {
        if (err) throw err;
        console.log('Crawl completed');
        }
    );
    return res.status(200).json({data: final});
})

router.get('/hoat-hinh', async (req, res) => {
    let final = [];
    const pageCurrent = 81;
    const step = 20;
    for(let index = pageCurrent; index < pageCurrent + step; index++){
        console.log(`CRAWL FROM: https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/danh-sach/hoat-hinh.json?page=${index}&slug=hoat-hinh`);
        const data = await axios.get(`https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/danh-sach/hoat-hinh.json?page=${index}&slug=hoat-hinh`);
        const fakeData = JSON.parse(JSON.stringify(data.data.pageProps.data)); 
        for(let i = 0; i < fakeData.items.length; i++) {
            try {
                console.log(`> ${i} `, fakeData.items[i].slug); 
                let temp = await axios.get(`https://ophim1.com/phim/${fakeData.items[i].slug}`);
                let obj = {
                    ...temp.data.movie, episodes: temp.data.episodes
                }
                delete obj._id;
                delete obj.modified;
                final.push(obj);
            } catch (errors) {
                console.log("ERROR: ", errors);
            }
        }
    }
    return res.status(200).json({data: final});
})

router.get('/phim-le', async (req, res) => {
    let final = [];
    const pageCurrent = 1;
    const step = 50;
    for(let index = pageCurrent; index < pageCurrent + step; index++){
        console.log(`CRAWL FROM: https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/danh-sach/phim-le.json?page=${index}&slug=hoat-hinh`);
        const data = await axios.get(`https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/danh-sach/phim-le.json?page=${index}&slug=hoat-hinh`);
        const fakeData = JSON.parse(JSON.stringify(data.data.pageProps.data)); 
        for(let i = 0; i < fakeData.items.length; i++) {
            try {
                console.log(`fakeData.items[${i}].slug `, fakeData.items[i].slug);  
                let temp = await axios.get(`https://ophim1.com/phim/${fakeData.items[i].slug}`);
                let obj = {
                    ...temp.data.movie, episodes: temp.data.episodes
                }
                delete obj._id;
                delete obj.modified;
                final.push(obj);
            } catch (errors) {
                console.log("ERROR: ", errors);
            }
        }
    }
    return res.status(200).json({data: final});
})


router.get('/phim-moi', async (req, res, next) => {
    try {
        console.log('CRAWL: https://ophim.tv/_next/data/jMo1r8lC0F6IGwkz0ayh-/danh-sach/phim-moi.json?page=page&slug=phim-moi')
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