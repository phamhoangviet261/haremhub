require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-shirobooking.wq7xs.mongodb.net/shirobooking?retryWrites=true&w=majority`)

        console.log(`CONNECTED DATABASE: ${process.env.MONGODB_DATABSE_NAME}`);
    } catch (error) {
        console.log("ERROR when connect to MongoDB.", error);
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors()) 
app.use(morgan('dev'))
app.use(helmet());
app.use(cookieParser());
//enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

const authRoute =  require('./routes/auth')
app.use('/api/auth', authRoute)
app.use('/api/manga', require('./routes/manga'))
app.use('/api/anime', require('./routes/anime'))
app.use('/api/movie', require('./routes/movie'))
app.use('/api/search', require('./routes/search'))
app.use('/api/post', require('./routes/post'))
app.use('/api/image', require('./routes/image'))
app.get('/', (req, res) => {
    return res.json({success: false, message: "SHIRO'S SERVER"})
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})