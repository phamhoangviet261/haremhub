const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

// @route POST /api/auth/register
// @desc register new user
// @access public
router.post('/register', async (req, res) => {   
    console.log("reg", req.body); 
    const {email, password, firstname, lastname} = req.body;
    
    // Validation
    if(!email || !password) return res.status(400).json({success: false, message: 'Missing email or password'})
    try {
        // check existing user
        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({success: false, message: 'Email already taken'})
        }
        
        // fine
        const hashedPassword = await argon2.hash(password)
        // console.log("hashedPassword", hashedPassword);
        const newUser = new User({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname
        })
        // console.log(newUser);
        await newUser.save()

        //return token 
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        console.log("accessToken", accessToken);
        return res.json({success: true, message: 'User created successfully', accessToken})
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
})

// @route POST /api/auth/login
// @desc login user
// @access public
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);
    // Validation
    if(!email || !password) return res.status(400).json({success: false, message: 'Missing email or password'})

    try {
        // check existing user
        
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success: false, message: 'Incorrect email or password'})
        }

        // found user
        const passwordValid = argon2.verify(user.password, password)
        if(!passwordValid){
            return res.status(400).json({success: false, message: 'Incorrect email or password'})
        }

        //return token 
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        console.log("accessToken", accessToken);
        return res.json({success: true, message: 'Login successfully', name: user.firstname, email:user.email, accessToken})
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
})

router.get('/', (req, res) => {
    res.send('smt')
})

module.exports = router