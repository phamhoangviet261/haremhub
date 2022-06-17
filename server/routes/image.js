const express = require('express')
const router = express.Router()
const multer = require('multer');
const fs = require("fs");
const ImageModel = require('../models/Image')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        // cb(null, file.fieldname + '-' + Date.now())
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
  
const upload = multer({ storage: storage });

router.get("/",(req,res)=>{
    // res.render("index");
    return res.json({success: "Image router", data: req.cookies})
})

router.get("/show",async (req,res)=>{
    let imgArr = await ImageModel.find()
    res.json({success: "Image router", data: imgArr})
});

router.post("/uploadphoto",upload.single('myImage'), async (req,res)=>{
    console.log(req.body)
    var img = fs.readFileSync(req.file.path);
    console.log("img: ", img)
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
    let result = await ImageModel.create({
        name: "MeanNghi",
        desc: "MC VETV",
        userId: "test_user",
        postId: "test_post",
        img: {
            contentType: req.file.mimetype,
            data: new Buffer(encode_img,'base64')
        }
    })
    // console.log("encode_img", final_img)
    // console.log("result", result)
    res.contentType(final_img.contentType);
    res.send(final_img.image);
    return;
})

module.exports = router